import { Octokit } from '@octokit/rest';
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Options for GitHub automation operations
 */
export interface GitHubDeployOptions {
  /** GitHub Personal Access Token (PAT) or OAuth token with repo scope */
  token: string;
  /** Target repository name to create / push */
  repoName: string;
  /** GitHub user or organization account. Defaults to the authenticated user */
  owner?: string;
  /** Whether the repository should be private (default: false) */
  isPrivate?: boolean;
  /** Absolute or relative path to the tailored website workspace */
  workspaceDir: string;
  /** Commit message for the initial launch */
  commitMessage?: string;
  /** Target branch name (default: 'main') */
  branch?: string;
  /** Optional author information */
  author?: {
    name?: string;
    email?: string;
  };
  /** Whether to force push to remote (default: true) */
  forcePush?: boolean;
  /** Description for GitHub repository */
  description?: string;
  /** Optional log callback for streaming UI/terminal feedback */
  onLog?: (message: string, level?: 'info' | 'warn' | 'error' | 'success') => void;
}

/**
 * Result returned by the GitHub automation engine
 */
export interface GitHubDeployResult {
  success: boolean;
  repoUrl: string;
  cloneUrl: string;
  htmlUrl: string;
  defaultBranch: string;
  owner: string;
  repoName: string;
  commitHash?: string;
  isNewRepo?: boolean;
  error?: string;
}

/** Alias interface for standard automation options */
export type GitHubAutomationOptions = GitHubDeployOptions;
/** Alias interface for standard automation results */
export type GitHubAutomationResult = GitHubDeployResult;

/**
 * Error stage classification for robust error diagnostics
 */
export type GitHubErrorStage =
  | 'VALIDATION'
  | 'AUTHENTICATION'
  | 'REPO_CREATION'
  | 'GIT_INIT'
  | 'GIT_CONFIG'
  | 'GIT_STAGE'
  | 'GIT_COMMIT'
  | 'GIT_REMOTE'
  | 'GIT_PUSH'
  | 'CLEANUP';

/**
 * Custom error class for GitHub automation operations with token redaction
 */
export class GitHubAutomationError extends Error {
  public readonly stage: GitHubErrorStage;
  public readonly originalError?: unknown;
  public readonly sanitizedMessage: string;

  constructor(stage: GitHubErrorStage, message: string, originalError?: unknown) {
    const sanitized = GitHubAutomationError.sanitize(message);
    super(`[GitHubAutomation:${stage}] ${sanitized}`);
    this.name = 'GitHubAutomationError';
    this.stage = stage;
    this.sanitizedMessage = sanitized;
    this.originalError = originalError;
  }

  /**
   * Sanitizes strings to prevent access tokens from leaking into logs or stack traces
   */
  public static sanitize(input: string): string {
    if (!input) return '';
    return input
      .replace(/x-access-token:[^@]+@/gi, 'x-access-token:***@')
      .replace(/(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{30,255}/g, 'gh*_[REDACTED]')
      .replace(/bearer\s+[A-Za-z0-9_.-]+/gi, 'Bearer [REDACTED]')
      .replace(/token\s+[A-Za-z0-9_.-]+/gi, 'token [REDACTED]');
  }
}

/**
 * Utility to sanitize URLs with embedded credentials
 */
export function sanitizeUrl(url: string): string {
  return GitHubAutomationError.sanitize(url);
}

/**
 * Verifies GitHub token and returns authenticated user info and scopes
 */
export async function testGitHubConnection(token: string): Promise<{
  success: boolean;
  username: string;
  name?: string;
  scopes?: string[];
  rateLimitRemaining?: number;
  error?: string;
}> {
  try {
    if (!token || typeof token !== 'string' || token.trim() === '') {
      throw new Error('GitHub token is required and cannot be empty.');
    }

    const octokit = new Octokit({ auth: token.trim() });
    const { data: user, headers } = await octokit.rest.users.getAuthenticated();

    const scopesHeader = (headers['x-oauth-scopes'] as string) || '';
    const scopes = scopesHeader ? scopesHeader.split(',').map((s) => s.trim()) : [];
    const rateLimitHeader = headers['x-ratelimit-remaining'] as string;
    const rateLimitRemaining = rateLimitHeader ? parseInt(rateLimitHeader, 10) : undefined;

    return {
      success: true,
      username: user.login,
      name: user.name || user.login,
      scopes,
      rateLimitRemaining,
    };
  } catch (err: any) {
    const sanitized = GitHubAutomationError.sanitize(err?.message || String(err));
    return {
      success: false,
      username: '',
      error: sanitized,
    };
  }
}

/**
 * Creates or retrieves a GitHub repository under the specified owner (user or organization)
 */
export async function createGitHubRepository(
  octokit: Octokit,
  options: {
    repoName: string;
    owner?: string;
    isPrivate?: boolean;
    description?: string;
    allowExisting?: boolean;
    onLog?: (msg: string, level?: 'info' | 'warn' | 'error' | 'success') => void;
  }
): Promise<{
  owner: string;
  repoName: string;
  repoUrl: string;
  cloneUrl: string;
  defaultBranch: string;
  isNew: boolean;
}> {
  const {
    repoName,
    owner: targetOwner,
    isPrivate = false,
    description = 'Bespoke Untitled UI enterprise website with Airwallex compliance',
    allowExisting = true,
    onLog = () => {},
  } = options;

  // 1. Get authenticated user
  onLog('Authenticating with GitHub API...', 'info');
  let authenticatedUser: string;
  try {
    const { data: authUser } = await octokit.rest.users.getAuthenticated();
    authenticatedUser = authUser.login;
    onLog(`Authenticated as GitHub user: @${authenticatedUser}`, 'success');
  } catch (err: any) {
    const msg = `GitHub authentication failed: ${err?.message || 'Invalid or expired token'}`;
    onLog(msg, 'error');
    throw new GitHubAutomationError('AUTHENTICATION', msg, err);
  }

  const effectiveOwner = (targetOwner && targetOwner.trim()) || authenticatedUser;
  let isOrg = false;

  // Check if effectiveOwner is an Organization
  if (effectiveOwner.toLowerCase() !== authenticatedUser.toLowerCase()) {
    try {
      const { data: orgData } = await octokit.rest.orgs.get({ org: effectiveOwner });
      if (orgData && orgData.login) {
        isOrg = true;
      }
    } catch {
      isOrg = false;
    }
  }

  onLog(`Provisioning remote repository '${effectiveOwner}/${repoName}'...`, 'info');

  try {
    let repoData: any;

    if (isOrg) {
      const res = await octokit.rest.repos.createInOrg({
        org: effectiveOwner,
        name: repoName,
        description,
        private: isPrivate,
        auto_init: false,
        has_issues: true,
        has_projects: false,
        has_wiki: false,
      });
      repoData = res.data;
    } else {
      const res = await octokit.rest.repos.createForAuthenticatedUser({
        name: repoName,
        description,
        private: isPrivate,
        auto_init: false,
        has_issues: true,
        has_projects: false,
        has_wiki: false,
      });
      repoData = res.data;
    }

    onLog(`Repository created: ${repoData.html_url}`, 'success');

    return {
      owner: repoData.owner.login,
      repoName: repoData.name,
      repoUrl: repoData.html_url,
      cloneUrl: repoData.clone_url,
      defaultBranch: repoData.default_branch || 'main',
      isNew: true,
    };
  } catch (err: any) {
    const isAlreadyExists =
      err?.status === 422 &&
      (JSON.stringify(err.response?.data || '').includes('already exists') ||
        err.message?.includes('already exists'));

    if (isAlreadyExists && allowExisting) {
      onLog(`Repository '${effectiveOwner}/${repoName}' already exists. Reusing remote...`, 'warn');
      try {
        const { data: existingRepo } = await octokit.rest.repos.get({
          owner: effectiveOwner,
          repo: repoName,
        });

        return {
          owner: existingRepo.owner.login,
          repoName: existingRepo.name,
          repoUrl: existingRepo.html_url,
          cloneUrl: existingRepo.clone_url,
          defaultBranch: existingRepo.default_branch || 'main',
          isNew: false,
        };
      } catch (fetchErr: any) {
        const msg = `Repository '${effectiveOwner}/${repoName}' already exists, but failed to fetch details: ${fetchErr?.message || fetchErr}`;
        onLog(msg, 'error');
        throw new GitHubAutomationError('REPO_CREATION', msg, fetchErr);
      }
    }

    const msg = `Failed to create repository '${effectiveOwner}/${repoName}': ${err?.message || err}`;
    onLog(msg, 'error');
    throw new GitHubAutomationError('REPO_CREATION', msg, err);
  }
}

/**
 * Initializes Git in a tailored workspace, stages all files, commits with a clean message,
 * and pushes to 'main' using 'https://x-access-token:${token}@github.com/owner/repo.git'.
 */
export async function pushWorkspaceToGitHub(options: {
  workspaceDir: string;
  token: string;
  owner: string;
  repoName: string;
  commitMessage?: string;
  branch?: string;
  author?: { name?: string; email?: string };
  forcePush?: boolean;
  onLog?: (msg: string, level?: 'info' | 'warn' | 'error' | 'success') => void;
}): Promise<{ defaultBranch: string; commitHash?: string }> {
  const {
    workspaceDir,
    token,
    owner,
    repoName,
    commitMessage = 'feat: initial launch on Untitled UI design system with Airwallex compliance',
    branch = 'main',
    author = {},
    forcePush = true,
    onLog = () => {},
  } = options;

  // 1. Validate workspace path
  const resolvedPath = path.resolve(workspaceDir);
  if (!fs.existsSync(resolvedPath)) {
    throw new GitHubAutomationError(
      'VALIDATION',
      `Workspace directory does not exist: '${resolvedPath}'`
    );
  }

  const stat = fs.statSync(resolvedPath);
  if (!stat.isDirectory()) {
    throw new GitHubAutomationError(
      'VALIDATION',
      `Workspace path is not a directory: '${resolvedPath}'`
    );
  }

  onLog(`Initializing local Git workspace at: ${resolvedPath}...`, 'info');

  const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: resolvedPath,
    binary: 'git',
    maxConcurrentProcesses: 4,
    trimmed: true,
  };

  const git: SimpleGit = simpleGit(gitOptions);

  // 2. Initialize Git
  try {
    const gitDir = path.join(resolvedPath, '.git');
    if (!fs.existsSync(gitDir)) {
      await git.init();
      onLog('Git repository initialized.', 'info');
    }
  } catch (err: any) {
    throw new GitHubAutomationError(
      'GIT_INIT',
      `Failed to initialize git repository: ${err?.message || err}`,
      err
    );
  }

  // 3. Configure local identity
  try {
    const authorName = author.name || 'Airwallex Site Builder Studio';
    const authorEmail = author.email || 'studio@airwallex-cloner.local';

    await git.addConfig('user.name', authorName, false, 'local');
    await git.addConfig('user.email', authorEmail, false, 'local');
    await git.addConfig('core.quotepath', 'false', false, 'local');
  } catch (err: any) {
    throw new GitHubAutomationError(
      'GIT_CONFIG',
      `Failed to configure git user: ${err?.message || err}`,
      err
    );
  }

  // 4. Stage all files
  try {
    onLog('Staging customized template files...', 'info');
    await git.add(['-A']);
  } catch (err: any) {
    throw new GitHubAutomationError(
      'GIT_STAGE',
      `Failed to stage files: ${err?.message || err}`,
      err
    );
  }

  // 5. Commit
  let commitHash: string | undefined;
  try {
    const status = await git.status();
    const hasChanges =
      status.staged.length > 0 ||
      status.created.length > 0 ||
      status.modified.length > 0 ||
      status.deleted.length > 0;

    let hasExistingCommit = false;
    try {
      const log = await git.log({ maxCount: 1 });
      if (log && log.latest) {
        hasExistingCommit = true;
        commitHash = log.latest.hash;
      }
    } catch {
      hasExistingCommit = false;
    }

    if (hasChanges || !hasExistingCommit) {
      const commitRes = await git.commit(commitMessage);
      commitHash = commitRes.commit || commitHash;
      onLog(
        `Committed ${status.staged.length + status.created.length} files to ${branch} branch.`,
        'success'
      );
    } else {
      onLog('Workspace is clean, using existing commit history.', 'info');
    }
  } catch (err: any) {
    throw new GitHubAutomationError(
      'GIT_COMMIT',
      `Failed to commit changes: ${err?.message || err}`,
      err
    );
  }

  // 6. Branch setup
  try {
    await git.branch(['-M', branch]);
  } catch (err: any) {
    throw new GitHubAutomationError(
      'GIT_CONFIG',
      `Failed to switch branch to '${branch}': ${err?.message || err}`,
      err
    );
  }

  // 7. Authenticated remote URL: https://x-access-token:${token}@github.com/owner/repo.git
  const authRemoteUrl = `https://x-access-token:${token.trim()}@github.com/${owner}/${repoName}.git`;

  try {
    const remotes = await git.getRemotes();
    const hasOrigin = remotes.some((r) => r.name === 'origin');

    if (hasOrigin) {
      await git.remote(['set-url', 'origin', authRemoteUrl]);
    } else {
      await git.addRemote('origin', authRemoteUrl);
    }
  } catch (err: any) {
    throw new GitHubAutomationError(
      'GIT_REMOTE',
      `Failed to configure origin remote: ${err?.message || err}`,
      err
    );
  }

  // 8. Push
  try {
    onLog(`Pushing source code to remote 'origin/${branch}'...`, 'info');
    const pushArgs = ['-u', 'origin', branch];
    if (forcePush) {
      pushArgs.push('--force');
    }

    await git.push(pushArgs);
    onLog('Pushed source code to GitHub main branch successfully!', 'success');

    if (!commitHash) {
      try {
        const log = await git.log({ maxCount: 1 });
        commitHash = log.latest?.hash;
      } catch {
        // Non-critical
      }
    }

    return {
      defaultBranch: branch,
      commitHash,
    };
  } catch (err: any) {
    const sanitized = GitHubAutomationError.sanitize(err?.message || String(err));
    onLog(`Git push failed: ${sanitized}`, 'error');
    throw new GitHubAutomationError(
      'GIT_PUSH',
      `Failed to push workspace to 'origin/${branch}': ${sanitized}`,
      err
    );
  }
}

/**
 * Master GitHub Automation Engine
 *
 * 1. Creates a new GitHub repository under the configured owner/org.
 * 2. Initializes Git in a tailored workspace, stages all files, commits with a clean message,
 *    and pushes to 'main' using 'https://x-access-token:${token}@github.com/owner/repo.git'.
 * 3. Returns { repoUrl, cloneUrl, defaultBranch, ... }.
 */
export async function automateGitHubPush(
  options: GitHubAutomationOptions
): Promise<GitHubAutomationResult> {
  const {
    token,
    repoName,
    owner,
    isPrivate = false,
    workspaceDir,
    commitMessage = 'feat: initial launch on Untitled UI design system with Airwallex compliance',
    branch = 'main',
    author,
    forcePush = true,
    description = 'Bespoke Untitled UI enterprise website with Airwallex compliance',
    onLog = () => {},
  } = options;

  if (!token || typeof token !== 'string' || token.trim() === '') {
    throw new GitHubAutomationError('VALIDATION', 'GitHub Personal Access Token is required.');
  }

  if (!repoName || typeof repoName !== 'string' || repoName.trim() === '') {
    throw new GitHubAutomationError('VALIDATION', 'Repository name is required.');
  }

  if (!workspaceDir || typeof workspaceDir !== 'string' || workspaceDir.trim() === '') {
    throw new GitHubAutomationError('VALIDATION', 'Workspace directory path is required.');
  }

  const cleanToken = token.trim();
  const cleanRepoName = repoName.trim();
  const octokit = new Octokit({ auth: cleanToken });

  // 1. Create / Verify repository
  const repoResult = await createGitHubRepository(octokit, {
    repoName: cleanRepoName,
    owner,
    isPrivate,
    description,
    allowExisting: true,
    onLog,
  });

  // 2. Initialize Git, stage, commit, and push
  const pushResult = await pushWorkspaceToGitHub({
    workspaceDir,
    token: cleanToken,
    owner: repoResult.owner,
    repoName: repoResult.repoName,
    commitMessage,
    branch,
    author,
    forcePush,
    onLog,
  });

  return {
    success: true,
    repoUrl: repoResult.repoUrl,
    cloneUrl: repoResult.cloneUrl,
    htmlUrl: repoResult.repoUrl,
    defaultBranch: pushResult.defaultBranch || repoResult.defaultBranch || 'main',
    owner: repoResult.owner,
    repoName: repoResult.repoName,
    commitHash: pushResult.commitHash,
    isNewRepo: repoResult.isNew,
  };
}

/**
 * Standard alias for the GitHub automation entrypoint
 */
export const createAndPushGitHubRepo = automateGitHubPush;

/**
 * Deletes a repository on GitHub (useful for test teardown)
 */
export async function deleteGitHubRepository(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<boolean> {
  try {
    await octokit.rest.repos.delete({
      owner,
      repo,
    });
    return true;
  } catch (err: any) {
    throw new GitHubAutomationError(
      'CLEANUP',
      `Failed to delete repository '${owner}/${repo}': ${err?.message || err}`,
      err
    );
  }
}

/**
 * Unit & Smoke Test Suite for GitHub Automation Engine
 */
export async function smokeTestGitHubAutomation(options: {
  token: string;
  owner?: string;
  testRepoPrefix?: string;
  cleanup?: boolean;
}): Promise<{
  passed: boolean;
  user: string;
  diagnostics: Array<{ step: string; status: 'SUCCESS' | 'FAILED' | 'SKIPPED'; message?: string }>;
  createdRepoUrl?: string;
}> {
  const {
    token,
    owner,
    testRepoPrefix = 'airwallex-smoke-test',
    cleanup = true,
  } = options;

  const diagnostics: Array<{ step: string; status: 'SUCCESS' | 'FAILED' | 'SKIPPED'; message?: string }> = [];
  let testRepoName = '';
  let resolvedOwner = '';
  let createdRepoUrl = '';
  const octokit = new Octokit({ auth: token });
  let tempTestDir = '';

  try {
    // 1. Authenticate
    const conn = await testGitHubConnection(token);
    if (!conn.success) {
      diagnostics.push({
        step: 'Authentication',
        status: 'FAILED',
        message: conn.error || 'Token authentication failed',
      });
      return { passed: false, user: '', diagnostics };
    }

    resolvedOwner = owner || conn.username;
    diagnostics.push({
      step: 'Authentication',
      status: 'SUCCESS',
      message: `Authenticated as ${conn.username} (Target owner: ${resolvedOwner})`,
    });

    // 2. Create temporary test workspace
    const timestamp = Date.now();
    testRepoName = `${testRepoPrefix}-${timestamp}`;
    const tmpBase = path.join(process.cwd(), '.tmp-test');
    if (!fs.existsSync(tmpBase)) {
      fs.mkdirSync(tmpBase, { recursive: true });
    }
    tempTestDir = path.join(tmpBase, `workspace-${timestamp}`);
    fs.mkdirSync(tempTestDir, { recursive: true });

    fs.writeFileSync(
      path.join(tempTestDir, 'README.md'),
      `# Smoke Test Repository\n\nGenerated by Airwallex Cloner Automation Test at ${new Date().toISOString()}`
    );
    fs.writeFileSync(
      path.join(tempTestDir, 'package.json'),
      JSON.stringify({ name: testRepoName, version: '1.0.0', private: true }, null, 2)
    );

    diagnostics.push({
      step: 'Workspace Creation',
      status: 'SUCCESS',
      message: `Created temporary test workspace at ${tempTestDir}`,
    });

    // 3. Run Automation Engine
    const result = await automateGitHubPush({
      token,
      repoName: testRepoName,
      owner: resolvedOwner,
      workspaceDir: tempTestDir,
      isPrivate: true,
      description: 'Automated smoke test repository for Airwallex Cloner',
      commitMessage: 'test: automated smoke test push',
      branch: 'main',
      forcePush: true,
    });

    createdRepoUrl = result.repoUrl;
    diagnostics.push({
      step: 'Automation Engine Execution',
      status: 'SUCCESS',
      message: `Successfully created and pushed to ${result.repoUrl} (commit: ${result.commitHash || 'latest'})`,
    });

    // 4. Verify branch via GitHub API
    const { data: branchData } = await octokit.rest.repos.getBranch({
      owner: result.owner,
      repo: result.repoName,
      branch: result.defaultBranch,
    });

    diagnostics.push({
      step: 'Remote Verification',
      status: 'SUCCESS',
      message: `Verified branch '${branchData.name}' exists on remote (HEAD SHA: ${branchData.commit.sha.substring(0, 7)})`,
    });

    // 5. Cleanup
    if (cleanup) {
      await deleteGitHubRepository(octokit, result.owner, result.repoName);
      diagnostics.push({
        step: 'Repository Cleanup',
        status: 'SUCCESS',
        message: `Deleted temporary repository ${result.owner}/${result.repoName}`,
      });
    } else {
      diagnostics.push({
        step: 'Repository Cleanup',
        status: 'SKIPPED',
        message: `Skipped cleanup as requested. Repo available at: ${result.repoUrl}`,
      });
    }

    return {
      passed: true,
      user: conn.username,
      diagnostics,
      createdRepoUrl,
    };
  } catch (err: any) {
    diagnostics.push({
      step: 'Execution Failure',
      status: 'FAILED',
      message: GitHubAutomationError.sanitize(err?.message || String(err)),
    });

    return {
      passed: false,
      user: resolvedOwner,
      diagnostics,
      createdRepoUrl,
    };
  } finally {
    if (tempTestDir && fs.existsSync(tempTestDir)) {
      try {
        fs.rmSync(tempTestDir, { recursive: true, force: true });
      } catch {
        // Ignore
      }
    }
  }
}

export default automateGitHubPush;

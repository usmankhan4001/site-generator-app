import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import {
  GitHubAutomationError,
  sanitizeUrl,
  testGitHubConnection,
  pushWorkspaceToGitHub,
  smokeTestGitHubAutomation,
  createAndPushGitHubRepo,
} from './github';
import simpleGit from 'simple-git';

async function runTests() {
  console.log('🧪 Starting GitHub Automation Engine Unit Tests...\n');
  let passedCount = 0;
  let failedCount = 0;

  // Test 1: Token sanitization in error messages
  try {
    const fakeToken = 'ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const rawMessage = `Failed connecting with token ${fakeToken} at https://x-access-token:${fakeToken}@github.com/test/repo.git`;
    const sanitized = GitHubAutomationError.sanitize(rawMessage);

    assert.ok(!sanitized.includes(fakeToken), 'Sanitized string must not include raw token');
    assert.ok(sanitized.includes('x-access-token:***@'), 'Sanitized URL must have masked token');
    assert.ok(sanitized.includes('[REDACTED]'), 'Token must be replaced with [REDACTED]');
    console.log('✅ Test 1: Token sanitization passed');
    passedCount++;
  } catch (err: any) {
    console.error('❌ Test 1 Failed:', err.message);
    failedCount++;
  }

  // Test 2: URL Sanitizer helper
  try {
    const urlWithSecret = 'https://x-access-token:ghp_secretToken1234567890abcdefghij@github.com/my-org/my-repo.git';
    const cleanUrl = sanitizeUrl(urlWithSecret);
    assert.ok(!cleanUrl.includes('ghp_secretToken'), 'sanitizeUrl should mask credentials');
    assert.strictEqual(cleanUrl, 'https://x-access-token:***@github.com/my-org/my-repo.git');
    console.log('✅ Test 2: URL Sanitizer helper passed');
    passedCount++;
  } catch (err: any) {
    console.error('❌ Test 2 Failed:', err.message);
    failedCount++;
  }

  // Test 3: Validation errors on missing parameters
  try {
    const connResult = await testGitHubConnection('');
    assert.strictEqual(connResult.success, false);
    assert.ok(connResult.error?.includes('required'), 'Empty token should return error');
    console.log('✅ Test 3: Empty token validation passed');
    passedCount++;
  } catch (err: any) {
    console.error('❌ Test 3 Failed:', err.message);
    failedCount++;
  }

  // Test 4: Workspace validation for non-existent directories
  try {
    const nonExistentPath = path.join(os.tmpdir(), `non-existent-dir-${Date.now()}`);
    let errorThrown = false;
    try {
      await pushWorkspaceToGitHub({
        workspaceDir: nonExistentPath,
        token: 'test-token',
        owner: 'test-owner',
        repoName: 'test-repo',
      });
    } catch (e: any) {
      errorThrown = true;
      assert.strictEqual(e.name, 'GitHubAutomationError');
      assert.strictEqual(e.stage, 'VALIDATION');
    }
    assert.ok(errorThrown, 'Should throw GitHubAutomationError for missing workspace');
    console.log('✅ Test 4: Workspace existence validation passed');
    passedCount++;
  } catch (err: any) {
    console.error('❌ Test 4 Failed:', err.message);
    failedCount++;
  }

  // Test 5: Local Git Workspace initialization, staging, and commit
  const tempTestDir = path.join(os.tmpdir(), `airwallex-unit-test-${Date.now()}`);
  try {
    fs.mkdirSync(tempTestDir, { recursive: true });
    fs.writeFileSync(path.join(tempTestDir, 'index.html'), '<h1>Test Website</h1>');
    fs.writeFileSync(path.join(tempTestDir, 'style.css'), 'body { background: #000; }');

    const git = simpleGit(tempTestDir);
    await git.init();
    await git.addConfig('user.name', 'Airwallex Builder Test', false, 'local');
    await git.addConfig('user.email', 'test@airwallex.test', false, 'local');
    await git.add(['-A']);
    const commitRes = await git.commit('feat: initial test commit');
    await git.branch(['-M', 'main']);

    const status = await git.status();
    const branchSummary = await git.branch();

    assert.strictEqual(branchSummary.current, 'main', 'Default branch should be main');
    assert.strictEqual(status.isClean(), true, 'Workspace should be clean after commit');
    assert.ok(commitRes.commit.length > 0, 'Commit hash should be generated');

    console.log('✅ Test 5: Local Git initialization, staging, and commit passed');
    passedCount++;
  } catch (err: any) {
    console.error('❌ Test 5 Failed:', err.message);
    failedCount++;
  } finally {
    if (fs.existsSync(tempTestDir)) {
      try {
        fs.rmSync(tempTestDir, { recursive: true, force: true });
      } catch {
        // ignore
      }
    }
  }

  // Test 6: Verify exports and function aliases
  try {
    assert.strictEqual(typeof createAndPushGitHubRepo, 'function');
    assert.strictEqual(typeof smokeTestGitHubAutomation, 'function');
    assert.strictEqual(typeof testGitHubConnection, 'function');
    console.log('✅ Test 6: Module exports and interface functions verified');
    passedCount++;
  } catch (err: any) {
    console.error('❌ Test 6 Failed:', err.message);
    failedCount++;
  }

  console.log(`\n========================================`);
  console.log(`Test Summary: ${passedCount} passed, ${failedCount} failed`);
  console.log(`========================================\n`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Unhandled test failure:', err);
  process.exit(1);
});

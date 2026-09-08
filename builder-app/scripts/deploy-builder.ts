/**
 * One-off: provision + deploy the builder app to Dokploy.
 * Run: DOKPLOY_API_KEY=... DOKPLOY_BASE_URL=... npx tsx scripts/deploy-builder.ts
 */
import { DokployClient } from '../src/lib/dokploy';

const GIT_URL = 'https://github.com/usmankhan4001/site-generator-app.git';
const BRANCH = 'main';
const PROJECT_NAME = 'Site Generator';
const APP_NAME = 'site-generator-app';

async function main() {
  const client = new DokployClient({
    apiKey: process.env.DOKPLOY_API_KEY,
    baseUrl: process.env.DOKPLOY_BASE_URL || 'https://paas.usmankhan.xyz',
  });

  console.log('[1/6] creating project…');
  const project = await client.createProject({
    name: PROJECT_NAME,
    description: 'Airwallex-ready site builder studio',
  });
  console.log('      projectId:', project.projectId);

  console.log('[2/6] resolving environment…');
  const env = await client.getDefaultEnvironment(project.projectId);
  console.log('      environmentId:', env.environmentId);

  console.log('[3/6] creating application…');
  const app = await client.createApplication({
    name: APP_NAME,
    environmentId: env.environmentId,
    sourceType: 'git',
  });
  console.log('      applicationId:', app.applicationId);

  console.log('[4/6] linking git repo…');
  await client.saveGitProvider({
    applicationId: app.applicationId,
    customGitUrl: GIT_URL,
    customGitBranch: BRANCH,
    customGitBuildPath: '/',
  });

  console.log('[5/6] setting dockerfile build…');
  await client.saveBuildType({
    applicationId: app.applicationId,
    buildType: 'dockerfile',
    dockerfile: 'Dockerfile',
    dockerContextPath: '.',
  });

  console.log('[6/6] triggering deploy…');
  const deployment = await (client as any).deployApplication
    ? await (client as any).deployApplication({ applicationId: app.applicationId })
    : await (client as any).deploy({ applicationId: app.applicationId });
  console.log('      deploymentId:', deployment?.deploymentId ?? JSON.stringify(deployment));

  console.log('\nDONE');
  console.log('projectId     :', project.projectId);
  console.log('applicationId :', app.applicationId);
}

main().catch((err) => {
  console.error('DEPLOY FAILED:', err?.message || err);
  process.exit(1);
});

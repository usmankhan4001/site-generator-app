import { assembleTemplate } from './assembler';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

async function runTest() {
  console.log('🧪 Testing assembleTemplate with full multi-page suite & Puck tree...');

  const testDir = path.join(os.tmpdir(), `test-assembler-multipage-${Date.now()}`);

  const workspaceDir = await assembleTemplate({
    business: {
      companyName: 'Test Enterprise Technologies LLC',
      shortName: 'TestTech',
      registrationNumber: 'CR-12345678',
      address: '100 Cyberport Road, Telegraph Bay, Hong Kong',
      email: 'contact@testtech.io',
      phone: '+852 3000 1234',
      domain: 'testtech.io',
      governingLaw: 'Hong Kong SAR',
      currency: 'USD',
      githubRepo: 'testtech-site',
    },
    archetypeId: 'tech-cloud-devops',
    themeId: 'indigo-enterprise',
    outputDir: testDir,
    puckData: {
      '/': {
        content: [
          {
            type: 'Hero',
            props: {
              badge: 'Custom Puck Badge',
              headline: 'Mission-Critical Multi-Cloud Scalability',
              accentText: 'Engineered for Performance',
              subtitle: 'Tailored by Puck editor.',
            },
          },
        ],
      },
    },
    onLog: (msg, lvl) => console.log(`[${lvl || 'info'}] ${msg}`),
  });

  console.log(`\nVerifying assembled codebase at: ${workspaceDir}`);

  const requiredFiles = [
    'src/app/page.tsx',
    'src/app/about/page.tsx',
    'src/app/services/page.tsx',
    'src/app/catalog/page.tsx',
    'src/app/contact/page.tsx',
    'src/app/policies/privacy/page.tsx',
    'src/app/policies/terms/page.tsx',
    'src/app/policies/refund/page.tsx',
    'src/app/policies/shipping/page.tsx',
    'src/app/api/contact/route.ts',
    'prisma/schema.prisma',
    'src/lib/db.ts',
    'src/lib/constants.ts',
    'src/app/globals.css',
    'Dockerfile',
    '.dockerignore',
    '.env',
  ];

  let allExist = true;
  for (const rel of requiredFiles) {
    const fullPath = path.join(workspaceDir, rel);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
      console.error(`❌ Missing file: ${rel}`);
      allExist = false;
    } else {
      const stat = fs.statSync(fullPath);
      console.log(`✅ [${stat.size} bytes] ${rel}`);
    }
  }

  // Check Dockerfile contents for dumb-init and prisma generate
  const dockerfileContent = fs.readFileSync(path.join(workspaceDir, 'Dockerfile'), 'utf8');
  if (!dockerfileContent.includes('dumb-init')) {
    console.error('❌ Dockerfile missing dumb-init!');
    allExist = false;
  } else {
    console.log('✅ Dockerfile contains dumb-init');
  }

  if (!dockerfileContent.includes('prisma generate')) {
    console.error('❌ Dockerfile missing prisma generate!');
    allExist = false;
  } else {
    console.log('✅ Dockerfile contains prisma generate');
  }

  // Check constants.ts for Puck hero override
  const constantsContent = fs.readFileSync(path.join(workspaceDir, 'src/lib/constants.ts'), 'utf8');
  if (!constantsContent.includes('Custom Puck Badge')) {
    console.error('❌ constants.ts missing custom Puck badge override!');
    allExist = false;
  } else {
    console.log('✅ constants.ts contains custom Puck badge override');
  }

  if (allExist) {
    console.log('\n🎉 ALL MULTI-PAGE ASSEMBLER ASSERTIONS PASSED!');
  } else {
    process.exit(1);
  }

  // Clean up test directory
  fs.rmSync(workspaceDir, { recursive: true, force: true });
}

runTest().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

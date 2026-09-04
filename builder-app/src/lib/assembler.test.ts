import { assembleSite } from './assembler';
import { zipDir } from './zipDir';
import { mkdtemp, rm } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { NORMALIZED_TEMPLATES } from './normalizeTemplates';

async function testAssembler() {
  console.log('🧪 Testing assembleSite standalone package generation...');
  const tempDir = await mkdtemp(join(tmpdir(), 'test-assemble-'));
  try {
    const sampleContent = NORMALIZED_TEMPLATES[0];
    await assembleSite(sampleContent, tempDir);

    const requiredFiles = [
      'package.json',
      'Dockerfile',
      '.dockerignore',
      'DEPLOY.md',
      'src/content/site.ts',
      'src/site/schema.ts',
      'src/site/themes.ts',
      'src/app/globals.css',
      'src/app/layout.tsx',
    ];

    for (const f of requiredFiles) {
      if (!existsSync(join(tempDir, f))) {
        throw new Error('Missing required file in assembled site: ' + f);
      }
      console.log('  ✓ ' + f + ' verified');
    }

    const deployMd = readFileSync(join(tempDir, 'DEPLOY.md'), 'utf8');
    if (!deployMd.includes('Deployment Guide') || !deployMd.includes('Dockerfile')) {
      throw new Error('DEPLOY.md contents malformed');
    }
    console.log('  ✓ DEPLOY.md contents verified');

    const dockerfile = readFileSync(join(tempDir, 'Dockerfile'), 'utf8');
    if (!dockerfile.includes('FROM node:20-alpine') || !dockerfile.includes('CMD ["node", "server.js"]')) {
      throw new Error('Dockerfile contents malformed');
    }
    console.log('  ✓ Dockerfile contents verified');

    const zip = await zipDir(tempDir);
    console.log('  ✓ Zip compression generated ' + zip.length + ' bytes');

    console.log('🎉 STANDALONE EXPORT & ASSEMBLER TEST PASSED!');
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

testAssembler().catch((err) => {
  console.error('❌ Assembler test failed:', err);
  process.exit(1);
});
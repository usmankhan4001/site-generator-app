/**
 * assembleSite(content, destDir) — writes a full, standalone copy of the
 * `template/` Next.js project into `destDir`, baked with `content` as its
 * site data (mirrors what `scripts/write-template-sample.ts` does for the
 * checked-in sample, and what `template/scripts/sync-site-kit.mjs` does for
 * the site kit). Used by the export-to-zip route so an operator can
 * self-host the generated site without our GitHub/Dokploy pipeline.
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  copyFileSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import type { SiteContent } from '@/site/schema';
import { siteContentToModule } from './serializeSite';
import { getTheme, themeToRootBlock } from '@/site/themes';

export interface AssembleSiteOptions {
  templateRoot?: string;
  siteKitSrc?: string;
}

function resolveTemplateRoot(): string {
  const candidates = [
    resolve(process.cwd(), '../template'),
    resolve(process.cwd(), 'template'),
    resolve(process.cwd(), '../../template'),
    resolve(__dirname, '../../../template'),
    resolve(__dirname, '../../template'),
    resolve(__dirname, '../template'),
  ];
  for (const c of candidates) {
    if (existsSync(c) && existsSync(join(c, 'package.json'))) {
      return c;
    }
  }
  return resolve(process.cwd(), '../template');
}

function resolveSiteKitSrc(): string {
  const candidates = [
    resolve(process.cwd(), 'src/site'),
    resolve(process.cwd(), 'builder-app/src/site'),
    resolve(__dirname, '../site'),
    resolve(__dirname, '../../site'),
    resolve(__dirname, '../../src/site'),
  ];
  for (const c of candidates) {
    if (existsSync(c) && existsSync(join(c, 'schema.ts'))) {
      return c;
    }
  }
  return resolve(process.cwd(), 'src/site');
}

// Same junk this repo already knows to keep out of a packaged template copy —
// see `template/.dockerignore`, curated by the Phase-0 audit.
const EXCLUDE_DIR_NAMES = new Set([
  'node_modules',
  '.next',
  '.git',
  'db',
  'tests',
  'examples',
  'mini-services',
  '.zscripts',
  'tool-results',
  'download',
]);
const EXCLUDE_FILE_NAMES = new Set([
  'Caddyfile',
  'worklog.md',
  'airwallex.json',
  'ref1.json',
  'ref2.json',
  'bun.lock',
  'README.md',
]);

function shouldSkip(name: string, isDir: boolean): boolean {
  if (isDir) return EXCLUDE_DIR_NAMES.has(name);
  if (EXCLUDE_FILE_NAMES.has(name)) return true;
  if (name.includes('.db')) return true; // *.db, *.db-journal, *.db-shm, *.db-wal
  if (name.endsWith('.tsbuildinfo')) return true;
  if (name.endsWith('.log')) return true;
  return false;
}

function copyDir(from: string, to: string): void {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    const s = join(from, entry);
    const isDir = statSync(s).isDirectory();
    if (shouldSkip(entry, isDir)) continue;
    const d = join(to, entry);
    if (isDir) copyDir(s, d);
    else copyFileSync(s, d);
  }
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'exported-site'
  );
}

export async function assembleSite(
  content: SiteContent,
  destDir: string,
  options?: AssembleSiteOptions,
): Promise<void> {
  const templateRoot = options?.templateRoot || resolveTemplateRoot();
  const siteKitSrc = options?.siteKitSrc || resolveSiteKitSrc();

  if (!existsSync(templateRoot)) {
    throw new Error(`template/ source directory not found at ${templateRoot}`);
  }
  if (!existsSync(siteKitSrc)) {
    throw new Error(`site kit source directory not found at ${siteKitSrc}`);
  }

  copyDir(templateRoot, destDir);
  copyDir(siteKitSrc, join(destDir, 'src/site'));

  const contentDir = join(destDir, 'src/content');
  mkdirSync(contentDir, { recursive: true });
  writeFileSync(join(contentDir, 'site.ts'), siteContentToModule(content), 'utf8');

  const cssPath = join(destDir, 'src/app/globals.css');
  if (existsSync(cssPath)) {
    const css = readFileSync(cssPath, 'utf8');
    const theme = getTheme(content.themeId);
    const block = themeToRootBlock(theme, content.accent);
    const next = css.replace(/:root\s*\{[^}]*\}/, block);
    if (next !== css) writeFileSync(cssPath, next, 'utf8');
  }

  const pkgPath = join(destDir, 'package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    pkg.name = slugify(content.business?.name ?? 'exported-site');
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  }

  // Include production Dockerfile
  const dockerfilePath = join(destDir, 'Dockerfile');
  if (!existsSync(dockerfilePath)) {
    writeFileSync(
      dockerfilePath,
      `# Multi-stage production build for Next.js App Router standalone
FROM node:20-alpine AS base

# Stage 1: Dependencies installer
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Application Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client if schema exists
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Stage 3: Minimal Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
`,
      'utf8',
    );
  }

  // Include .dockerignore
  const dockerignorePath = join(destDir, '.dockerignore');
  if (!existsSync(dockerignorePath)) {
    writeFileSync(
      dockerignorePath,
      `node_modules
.next
.git
.env*.local
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
`,
      'utf8',
    );
  }

  // Include comprehensive DEPLOY.md
  const deployMdPath = join(destDir, 'DEPLOY.md');
  const businessName = content.business?.name || 'Your Website';
  const deployMdContent = `# Deployment Guide — ${businessName}

This package contains the full, production-ready Next.js source code for **${businessName}**, pre-configured with all custom content, typography, colors, and layout tokens.

---

## Quick Start (Local Development)

### 1. Requirements
- Node.js 20.x or higher
- npm (included with Node.js)

### 2. Run Locally
\`\`\`bash
# Install dependencies
npm install

# Start development server (hot reload on http://localhost:3000)
npm run dev

# Or test a production build
npm run build
npm start
\`\`\`

---

## 1-Click & Cloud Platform Deployments

### 1. Deploying to Vercel (Recommended)
Vercel is the official platform for Next.js and requires zero extra configuration.

1. Create a Git repository (GitHub, GitLab, or Bitbucket) and push this folder to it.
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your Git repository.
4. Framework preset will automatically be set to **Next.js**.
5. Click **Deploy**.
6. (Optional) In Vercel Project Settings > Domains, attach your custom apex or subdomain.

---

### 2. Deploying to Netlify
Netlify runs Next.js using the official @netlify/plugin-nextjs package.

1. Push this project to GitHub or GitLab.
2. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site > Import an existing project**.
3. Select your repository.
4. Ensure the build configuration is set to:
   - **Build command**: \`npm run build\`
   - **Publish directory**: \`.next\`
5. Click **Deploy site**.

---

### 3. Deploying to Cloudflare Pages
Cloudflare Pages provides global edge distribution with fast TTFB.

1. Push your repository to GitHub / GitLab.
2. Open the Cloudflare Dashboard and navigate to **Workers & Pages > Create application > Pages > Connect to Git**.
3. Select this repository.
4. In Build Settings:
   - **Framework preset**: \`Next.js\`
   - **Build command**: \`npm run build\`
   - **Build output directory**: \`.next\`
5. In Environment Variables, specify:
   - \`NODE_VERSION\` = \`20\`
6. Click **Save and Deploy**.

---

### 4. Deploying with Docker & VPS (Dokploy / Coolify / CapRover / VPS)
This project includes a multi-stage, hardened \`Dockerfile\` that produces a minimal standalone container.

#### Local / Self-Managed Docker Run
\`\`\`bash
# Build the Docker image
docker build -t my-website .

# Run container on port 3000
docker run -d -p 3000:3000 --name my-website --restart unless-stopped my-website
\`\`\`

#### Dokploy / Coolify Deployment
1. Create a new Application in your Dokploy or Coolify dashboard.
2. Select your Git repository or upload this source zip archive.
3. Choose **Dockerfile** as the build method.
4. Set the internal port to **3000**.
5. Configure your domain name and SSL certificate in the domains tab.
6. Click **Deploy**.

---

## Environment Variables & Custom Integrations

| Variable | Description |
| :--- | :--- |
| \`FORMSPREE_ID\` | *(Optional)* Formspree endpoint key for contact form inquiries. |
| \`NEXT_PUBLIC_APP_URL\` | *(Optional)* The live public URL for canonical and OpenGraph links. |

---

*Generated by Airwallex Site Builder Studio.*
`;

  writeFileSync(deployMdPath, deployMdContent, 'utf8');
}

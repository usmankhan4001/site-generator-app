import type { Metadata } from 'next';
import {
  GuideShell,
  StepSection,
  GuideParagraph,
  CodeBlock,
  Callout,
  Checklist,
  ExternalLinkText,
} from '@/components/guides/GuideShell';

export const metadata: Metadata = {
  title: 'Deploy to Vercel — Site Studio',
  description:
    'Step-by-step guide to deploying your exported Next.js site to Vercel and attaching a custom domain.',
};

export default function VercelGuidePage() {
  return (
    <GuideShell
      eyebrow="Deployment guide"
      title="Deploy to Vercel"
      description="Vercel is the fastest path for a Next.js site. Import your repository (or push with the CLI), set the framework to Next.js, and attach your own domain in Project Settings."
    >
      <StepSection step={1} title="Get the exported site">
        <GuideParagraph>
          In the studio, open the <strong>Publish panel</strong> and click{' '}
          <strong>Export source (.zip)</strong>. Unzip it into a folder. The package is a
          production-ready Next.js App Router build with a{' '}
          <code>Dockerfile</code> and <code>DEPLOY.md</code>.
        </GuideParagraph>
        <GuideParagraph>
          Vercel deploys best from a Git repository. Create a repo on{' '}
          <ExternalLinkText href="https://github.com">GitHub</ExternalLinkText>, then push the
          exported folder:
        </GuideParagraph>
        <CodeBlock
          title="Push the exported site to GitHub"
          code={`cd path/to/exported-site
git init
git add .
git commit -m "Initial site export"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main`}
        />
        <Callout variant="info" title="No GitHub? Use the Vercel CLI">
          You can deploy directly from your machine without a repo — see step 2.
        </Callout>
      </StepSection>

      <StepSection step={2} title="Import the project into Vercel">
        <GuideParagraph>
          <strong>Option A — Import from Git:</strong> go to{' '}
          <ExternalLinkText href="https://vercel.com/new">vercel.com/new</ExternalLinkText>, connect
          your GitHub account, and select the repository you just pushed. Vercel auto-detects
          Next.js.
        </GuideParagraph>
        <GuideParagraph>
          <strong>Option B — Vercel CLI:</strong> install the CLI and run{' '}
          <code>vercel</code> from the exported folder. It will ask you to log in and link a
          project.
        </GuideParagraph>
        <CodeBlock
          title="Deploy with the Vercel CLI"
          code={`npm i -g vercel
cd path/to/exported-site
vercel        # first run: log in, link a project, deploy
vercel --prod # promote to production`}
        />
      </StepSection>

      <StepSection step={3} title="Set the build configuration">
        <GuideParagraph>
          In <strong>Project Settings → General</strong>, confirm the framework preset is{' '}
          <strong>Next.js</strong>. The default build settings are correct for this export:
        </GuideParagraph>
        <CodeBlock
          title="Vercel build settings"
          code={`Framework Preset   Next.js
Build Command      npm run build
Output Directory   .next
Install Command    npm install`}
        />
        <GuideParagraph>
          Vercel runs <code>npm install</code> and <code>npm run build</code> automatically on every
          push, so no manual build is required — the settings above are just what Vercel uses
          internally.
        </GuideParagraph>
      </StepSection>

      <StepSection step={4} title="Set environment variables (if needed)">
        <GuideParagraph>
          If your site uses a contact form or a canonical URL, add these in{' '}
          <strong>Project Settings → Environment Variables</strong>:
        </GuideParagraph>
        <CodeBlock
          title="Optional env vars"
          code={`FORMSPREE_ID=<your-formspree-form-id>
NEXT_PUBLIC_APP_URL=https://yourdomain.com`}
        />
        <GuideParagraph>
          After adding them, trigger a redeploy (push a commit or click{' '}
          <strong>Redeploy</strong>) so the new build picks them up.
        </GuideParagraph>
      </StepSection>

      <StepSection step={5} title="Connect your domain">
        <GuideParagraph>
          In <strong>Project Settings → Domains</strong>, enter your apex domain (e.g.{' '}
          <code>acme.com</code>). Vercel will show the DNS records to add at your registrar:
        </GuideParagraph>
        <CodeBlock
          title="DNS records to add at your registrar"
          code={`A      @      76.76.21.21      (apex)
CNAME  www    cname.vercel-dns.com   (www)`}
        />
        <GuideParagraph>
          Add both records, then click <strong>Verify</strong> in Vercel. Vercel provisions a
          managed TLS certificate automatically once DNS propagates (usually a few minutes).
        </GuideParagraph>
        <Callout variant="domain" title="Apex + www">
          Add both the apex (<code>acme.com</code>) and the <code>www</code> subdomain so visitors
          reach you either way. Vercel redirects one to the other automatically.
        </Callout>
      </StepSection>

      <StepSection step={6} title="Go live">
        <Checklist
          title="Launch checklist"
          items={[
            'Deployment shows "Ready" in the Vercel dashboard.',
            'Custom domain shows "Valid Configuration" in Project Settings → Domains.',
            'HTTPS is active (padlock in the browser).',
            'Form submissions work (if FORMSPREE_ID is set).',
            'Pages load on both apex and www.',
          ]}
        />
        <GuideParagraph>
          That&apos;s it — your site is live on your own domain. Every future push to the
          repository redeploys automatically.
        </GuideParagraph>
      </StepSection>
    </GuideShell>
  );
}

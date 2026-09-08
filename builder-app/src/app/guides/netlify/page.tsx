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
  title: 'Deploy to Netlify — Site Studio',
  description:
    'Step-by-step guide to deploying your exported Next.js site to Netlify and attaching a custom domain.',
};

export default function NetlifyGuidePage() {
  return (
    <GuideShell
      eyebrow="Deployment guide"
      title="Deploy to Netlify"
      description="Netlify handles the build and hosting for you — import from Git, point it at the Next.js build, and attach your own domain with a managed HTTPS certificate."
    >
      <StepSection step={1} title="Get the exported site">
        <GuideParagraph>
          In the studio, open the <strong>Publish panel</strong> and click{' '}
          <strong>Export source (.zip)</strong>. Unzip it into a folder. The package is a
          production-ready Next.js App Router build with a{' '}
          <code>Dockerfile</code> and <code>DEPLOY.md</code>.
        </GuideParagraph>
        <GuideParagraph>
          <strong>Option A — Import from Git (recommended):</strong> push the folder to a repo on{' '}
          <ExternalLinkText href="https://github.com">GitHub</ExternalLinkText>,{' '}
          <ExternalLinkText href="https://gitlab.com">GitLab</ExternalLinkText>, or
          Bitbucket, then import it on Netlify.
        </GuideParagraph>
        <GuideParagraph>
          <strong>Option B — Drag-and-drop:</strong> go to{' '}
          <ExternalLinkText href="https://app.netlify.com/drop">app.netlify.com/drop</ExternalLinkText>{' '}
          and drop the folder. This works for a quick preview, but Git import is better for custom
          domains and redeploys.
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
      </StepSection>

      <StepSection step={2} title="Import the project on Netlify">
        <GuideParagraph>
          In the Netlify dashboard click <strong>Add new site → Import an existing project</strong>.
          Choose your Git provider, authorize access, and pick the repository.
        </GuideParagraph>
        <GuideParagraph>
          Set the build options below. Publish directory for a Next.js App Router build is{' '}
          <code>.next</code>:
        </GuideParagraph>
        <CodeBlock
          title="Netlify build settings"
          code={`Build command       npm run build
Publish directory   .next
Base directory      (keep empty — repository root)`}
        />
        <GuideParagraph>
          Click <strong>Deploy site</strong>. Netlify installs dependencies and runs the build, then
          serves the result at a <code>*.netlify.app</code> URL.
        </GuideParagraph>
      </StepSection>

      <StepSection step={3} title="Set environment variables (if needed)">
        <GuideParagraph>
          If your site uses a contact form or a canonical URL, add these in{' '}
          <strong>Site settings → Environment variables</strong>, then trigger a redeploy:
        </GuideParagraph>
        <CodeBlock
          title="Optional env vars"
          code={`FORMSPREE_ID=<your-formspree-form-id>
NEXT_PUBLIC_APP_URL=https://yourdomain.com`}
        />
      </StepSection>

      <StepSection step={4} title="Connect your domain">
        <GuideParagraph>
          Go to <strong>Site settings → Domain management → Add a domain</strong> and enter your
          apex domain (e.g. <code>acme.com</code>). Netlify walks you through adding{' '}
          <strong>Domain management</strong> and setting your registrar&apos;s DNS:
        </GuideParagraph>
        <CodeBlock
          title="DNS records to add at your registrar"
          code={`A      @      <shown by Netlify>   (apex — an IP or ALIAS)
CNAME  www    <your-site>.netlify.app   (www)`}
        />
        <GuideParagraph>
          The exact <code>A</code> value Netlify wants is shown when you add the domain — it may be
          an IP address, an <code>ALIAS</code> record, or Netlify&apos;s DNS management. Follow what
          the dashboard displays.
        </GuideParagraph>
        <Callout variant="domain" title="Automatic HTTPS">
          Once DNS resolves (a few minutes to a few hours), Netlify provisions a managed cert from
          Let&apos;s Encrypt and enables HTTPS automatically. No manual cert setup needed.
        </Callout>
      </StepSection>

      <StepSection step={5} title="Go live">
        <Checklist
          title="Launch checklist"
          items={[
            'Deploy status shows "Published" in the Netlify dashboard.',
            'Custom domain shows "Primary domain" and the HTTPS is active.',
            'Padlock appears in the browser on your domain.',
            'Form submissions work (if FORMSPREE_ID is set).',
            'Visitors reach the site on both apex and www.',
            'New pushes to the repo auto-deploy and retain your domain.',
          ]}
        />
      </StepSection>
    </GuideShell>
  );
}
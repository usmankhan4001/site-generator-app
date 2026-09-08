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
  title: 'Deploy to Hostinger — Site Studio',
  description:
    'Step-by-step guide to running your exported Next.js site on a Hostinger VPS with Docker or Node + PM2, and pointing your domain at it.',
};

export default function HostingerGuidePage() {
  return (
    <GuideShell
      eyebrow="Deployment guide"
      title="Deploy to Hostinger"
      description="Hostinger gives you a VPS you control. Run the exported site with Docker (the included Dockerfile) or with Node + PM2, then point your domain at the server and serve HTTPS."
    >
      <StepSection step={1} title="Get the exported site">
        <GuideParagraph>
          In the studio, open the <strong>Publish panel</strong> and click{' '}
          <strong>Export source (.zip)</strong>. Unzip it into a folder. The package includes a{' '}
          <code>Dockerfile</code> and a <code>DEPLOY.md</code>.
        </GuideParagraph>
        <GuideParagraph>
          Copy the folder to your VPS. From your local machine:
        </GuideParagraph>
        <CodeBlock
          title="Copy the exported site to your VPS"
          code={`scp -r path/to/exported-site root@<your-vps-ip>:/opt/mysite`}
        />
        <GuideParagraph>
          Then SSH in and move into the folder for the rest of this guide:
        </GuideParagraph>
        <CodeBlock
          title="SSH into the VPS"
          code={`ssh root@<your-vps-ip>
cd /opt/mysite`}
        />
      </StepSection>

      <StepSection step={2} title="Choose your runtime">
        <GuideParagraph>
          You have two good options. <strong>Docker</strong> is the most reproducible (the export
          ships a <code>Dockerfile</code>). <strong>Node + PM2</strong> is simpler if you prefer
          running the process directly. Pick one and follow its steps.
        </GuideParagraph>
      </StepSection>

      <StepSection step={3} title="Route A — Run with Docker">
        <GuideParagraph>
          Install Docker on the VPS, then build and run the image. The image listens on port{' '}
          <code>3000</code>:
        </GuideParagraph>
        <CodeBlock
          title="Build and run the Docker image"
          code={`# install Docker (Debian/Ubuntu)
curl -fsSL https://get.docker.com | sh

# build and run
cd /opt/mysite
docker build -t mysite .
docker run -d --name mysite -p 3000:3000 --restart unless-stopped mysite`}
        />
        <GuideParagraph>
          Verify it is serving locally:
        </GuideParagraph>
        <CodeBlock
          title="Check the container"
          code={`curl -I http://localhost:3000
docker logs mysite`}
        />
        <Callout variant="info" title="Rebuild after updates">
          To ship new content, copy the new export over, then{' '}
          <code>docker build -t mysite . && docker rm -f mysite && docker run -d --name mysite -p 3000:3000 --restart unless-stopped mysite</code>.
        </Callout>
      </StepSection>

      <StepSection step={4} title="Route B — Run with Node + PM2">
        <GuideParagraph>
          Install Node.js 20, install dependencies, build, and run the production server with PM2 so
          it stays alive across restarts:
        </GuideParagraph>
        <CodeBlock
          title="Node 20 + PM2 setup"
          code={`# install Node 20 (Debian/Ubuntu)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# install PM2 globally
npm i -g pm2

# install deps and build
cd /opt/mysite
npm ci
npm run build

# start with PM2 on port 3000
PORT=3000 pm2 start npm --name mysite -- start
pm2 save
pm2 startup   # follow the printed command to enable boot persistence`}
        />
        <GuideParagraph>
          Verify it is serving locally:
        </GuideParagraph>
        <CodeBlock
          title="Check the process"
          code={`curl -I http://localhost:3000
pm2 status`}
        />
        <Callout variant="info" title="Rebuild after updates">
          Copy the new export over, then{' '}
          <code>npm ci && npm run build && pm2 restart mysite</code>.
        </Callout>
      </StepSection>

      <StepSection step={5} title="Point your domain at the VPS">
        <GuideParagraph>
          At your DNS provider (or Hostinger&apos;s DNS zone), point your domain at the VPS&apos;s
          public IP. The site runs on port <code>3000</code> internally, so you&apos;ll expose it
          over HTTPS in the next step.
        </GuideParagraph>
        <CodeBlock
          title="DNS records to add"
          code={`A      @      <your-vps-ip>   (apex)
A      www    <your-vps-ip>   (www)`}
        />
        <GuideParagraph>
          If your provider supports it, you can use an <code>ALIAS</code> record for the apex
          instead of an <code>A</code> record. DNS changes can take a few minutes to a few hours to
          propagate.
        </GuideParagraph>
      </StepSection>

      <StepSection step={6} title="Serve HTTPS on port 443">
        <GuideParagraph>
          Your site listens on <code>localhost:3000</code>. To serve it on the standard HTTPS port
          with a real certificate, use Nginx as a reverse proxy plus Certbot. Install Nginx and
          create a site config:
        </GuideParagraph>
        <CodeBlock
          title="Nginx reverse proxy config"
          code={`# /etc/nginx/sites-available/mysite
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`}
        />
        <CodeBlock
          title="Enable the site and get a cert"
          code={`ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# install certbot and issue a certificate
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com`}
        />
        <GuideParagraph>
          Certbot edits the Nginx config to serve HTTPS and sets up automatic renewal. Your site is
          now reachable at <code>https://yourdomain.com</code>.
        </GuideParagraph>
        <Callout variant="domain" title="Firewall / security group">
          Make sure your VPS firewall allows ports <code>80</code> and <code>443</code> (and{' '}
          <code>22</code> for SSH). Port <code>3000</code> can stay closed to the public since Nginx
          proxies to it locally.
        </Callout>
      </StepSection>

      <StepSection step={7} title="Set environment variables (if needed)">
        <GuideParagraph>
          If your site uses a contact form or a canonical URL, set these before building/starting.
          With Docker, pass them to <code>docker run</code>:
        </GuideParagraph>
        <CodeBlock
          title="Env vars with Docker"
          code={`docker run -d --name mysite -p 3000:3000 --restart unless-stopped \\
  -e FORMSPREE_ID=<your-formspree-form-id> \\
  -e NEXT_PUBLIC_APP_URL=https://yourdomain.com \\
  mysite`}
        />
        <GuideParagraph>
          With Node + PM2, export them before starting:
        </GuideParagraph>
        <CodeBlock
          title="Env vars with PM2"
          code={`export FORMSPREE_ID=<your-formspree-form-id>
export NEXT_PUBLIC_APP_URL=https://yourdomain.com
pm2 restart mysite --update-env`}
        />
      </StepSection>

      <StepSection step={8} title="Go live">
        <Checklist
          title="Launch checklist"
          items={[
            'Site responds on http://localhost:3000 on the VPS.',
            'DNS for apex and www resolves to your VPS IP.',
            'Nginx serves HTTPS with a valid Certbot certificate.',
            'Padlock appears in the browser on your domain.',
            'Form submissions work (if FORMSPREE_ID is set).',
            'Process/container restarts automatically (PM2 or --restart unless-stopped).',
          ]}
        />
      </StepSection>
    </GuideShell>
  );
}
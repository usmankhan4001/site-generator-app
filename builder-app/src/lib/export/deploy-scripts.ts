/**
 * Terminal deployment scripts and cloud platform manifests bundled into exported ZIPs.
 * Provides frictionless 1-command deployment workflows across multiple clouds.
 */

function sanitizeProjectName(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'my-site'
  );
}

/**
 * Generates an interactive, cross-platform Bash deployment script for macOS/Linux.
 */
export function generateDeploySh(projectName: string): string {
  const cleanName = sanitizeProjectName(projectName);

  return `#!/usr/bin/env bash
set -e

# ==============================================================================
# 🚀 Universal Multi-Cloud Deployment Script for ${cleanName}
# ==============================================================================

# ANSI Color Codes
CYAN='\\033[0;36m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
RED='\\033[0;31m'
BOLD='\\033[1m'
NC='\\033[0m' # No Color

echo -e "\${CYAN}\${BOLD}"
echo "=========================================================="
echo "  🚀 Deploying ${cleanName}"
echo "  Universal Multi-Cloud 1-Command Deployment Script"
echo "=========================================================="
echo -e "\${NC}"

# 1. Check Node.js and npm dependencies
if ! command -v node >/dev/null 2>&1; then
  echo -e "\${RED}Error: Node.js is not installed. Please install Node.js 18+ to proceed.\${NC}"
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo -e "\${RED}Error: npm is not installed or not in PATH.\${NC}"
  exit 1
fi

echo -e "\${YELLOW}Select target:\${NC}"
echo "1) Cloudflare Pages (npx wrangler pages deploy out)"
echo "2) Vercel (npx vercel --prod)"
echo "3) Netlify (npx netlify deploy --prod --dir=out)"
echo "4) Docker container"
echo ""
read -p "Enter choice [1-4]: " choice

# 2. Check and install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
  echo -e "\n\${YELLOW}📦 Installing project dependencies (npm install)...\${NC}"
  npm install
fi

# 3. Execute chosen deployment pipeline
case "$choice" in
  1)
    echo -e "\n\${GREEN}⚡ Building static export for Cloudflare Pages...\${NC}"
    npm run build
    echo -e "\n\${GREEN}🚀 Deploying to Cloudflare Pages...\${NC}"
    npx --yes wrangler pages deploy out --project-name="${cleanName}"
    ;;
  2)
    echo -e "\n\${GREEN}🚀 Deploying directly to Vercel (Edge Cloud)...\${NC}"
    npx --yes vercel --prod
    ;;
  3)
    echo -e "\n\${GREEN}⚡ Building static export for Netlify...\${NC}"
    npm run build
    echo -e "\n\${GREEN}🚀 Deploying to Netlify...\${NC}"
    npx --yes netlify deploy --prod --dir=out
    ;;
  4)
    if ! command -v docker >/dev/null 2>&1; then
      echo -e "\${RED}Error: Docker is not installed or not running.\${NC}"
      exit 1
    fi
    echo -e "\n\${GREEN}🐳 Building Docker container image...\${NC}"
    docker build -t "${cleanName}:latest" .
    echo -e "\n\${GREEN}✅ Docker image built successfully: ${cleanName}:latest\${NC}"
    echo -e "Run container with: \${BOLD}docker run -d -p 3000:3000 ${cleanName}:latest\${NC}"
    ;;
  *)
    echo -e "\${RED}Invalid selection. Exiting.\${NC}"
    exit 1
    ;;
esac

echo -e "\n\${GREEN}\${BOLD}🎉 Deployment process finished!\${NC}\n"
`;
}

/**
 * Generates an interactive PowerShell deployment script for Windows.
 */
export function generateDeployPs1(projectName: string): string {
  const cleanName = sanitizeProjectName(projectName);

  return `# ==============================================================================
# 🚀 Universal Multi-Cloud Deployment Script for ${cleanName} (PowerShell)
# ==============================================================================

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  🚀 Deploying ${cleanName}" -ForegroundColor Cyan
Write-Host "  Universal Multi-Cloud 1-Command Deployment Script" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Node.js requirement
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Node.js is not installed. Please install Node.js 18+ to proceed." -ForegroundColor Red
    Exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Error: npm is not installed or not in PATH." -ForegroundColor Red
    Exit 1
}

Write-Host "Select target:" -ForegroundColor Yellow
Write-Host "1) Cloudflare Pages (npx wrangler pages deploy out)"
Write-Host "2) Vercel (npx vercel --prod)"
Write-Host "3) Netlify (npx netlify deploy --prod --dir=out)"
Write-Host "4) Docker container"
Write-Host ""
$choice = Read-Host "Enter choice [1-4]"

# 2. Check node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "📦 Installing project dependencies (npm install)..." -ForegroundColor Yellow
    npm install
}

# 3. Execute chosen deployment target
switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "⚡ Building static export for Cloudflare Pages..." -ForegroundColor Green
        npm run build
        Write-Host ""
        Write-Host "🚀 Deploying to Cloudflare Pages..." -ForegroundColor Green
        npx --yes wrangler pages deploy out --project-name="${cleanName}"
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Deploying directly to Vercel (Edge Cloud)..." -ForegroundColor Green
        npx --yes vercel --prod
    }
    "3" {
        Write-Host ""
        Write-Host "⚡ Building static export for Netlify..." -ForegroundColor Green
        npm run build
        Write-Host ""
        Write-Host "🚀 Deploying to Netlify..." -ForegroundColor Green
        npx --yes netlify deploy --prod --dir=out
    }
    "4" {
        if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
            Write-Host "Error: Docker is not installed or not in PATH." -ForegroundColor Red
            Exit 1
        }
        Write-Host ""
        Write-Host "🐳 Building Docker container image..." -ForegroundColor Green
        docker build -t "${cleanName}:latest" .
        Write-Host ""
        Write-Host "✅ Docker image built successfully: ${cleanName}:latest" -ForegroundColor Green
        Write-Host "Run container with: docker run -d -p 3000:3000 ${cleanName}:latest" -ForegroundColor Cyan
    }
    Default {
        Write-Host "Invalid selection. Exiting." -ForegroundColor Red
        Exit 1
    }
}

Write-Host ""
Write-Host "🎉 Deployment process finished!" -ForegroundColor Green
Write-Host ""
`;
}

/**
 * Generates standard Cloudflare Pages wrangler.toml pre-configured for Next.js static output.
 */
export function generateWranglerToml(projectName: string): string {
  const cleanName = sanitizeProjectName(projectName);
  return `name = "${cleanName}"
compatibility_date = "2024-01-01"
pages_build_output_dir = "out"
`;
}

/**
 * Generates standard vercel.json with Next.js framework configuration.
 */
export function generateVercelJson(_projectName: string): string {
  return JSON.stringify(
    {
      $schema: 'https://openapi.vercel.sh/vercel.json',
      framework: 'nextjs',
    },
    null,
    2,
  ) + '\n';
}

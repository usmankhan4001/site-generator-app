# Base image with Alpine and libc6-compat for native dependency compatibility
FROM node:20-alpine AS base

# Stage 1: Dependencies installer
FROM base AS deps
# libc6-compat is required for some native packages/binaries (e.g. sharp, turbo) on Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the lockfile detected (npm, yarn, pnpm, bun binary or text lockfile)
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* bun.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f bun.lockb ] || [ -f bun.lock ]; then corepack enable bun && bun install --frozen-lockfile; \
  else echo "Lockfile not found." && npm install; \
  fi

# Stage 2: Application Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Disable Next.js telemetry & set production environment for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js application
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  elif [ -f bun.lockb ] || [ -f bun.lock ]; then corepack enable bun && bun run build; \
  else npm run build; \
  fi

# Stage 3: Minimal Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install dumb-init for proper signal handling and PID 1 init process
RUN apk add --no-cache dumb-init

# Create a non-root system user and group for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and public directory
COPY --from=builder /app/public ./public

# Set permissions for Next.js prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Leverage Next.js standalone output traces to keep image size minimal (~100MB)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Container healthcheck on port 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]

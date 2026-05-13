# DropAI Deployment Guide

This guide covers deployment options for DropAI, from local development to production hosting.

---

## Table of Contents

- [Quick Deploy (Vercel)](#-quick-deploy-vercel)
- [Prerequisites](#-prerequisites)
- [Environment Configuration](#-environment-configuration)
- [Database Setup](#-database-setup)
- [Deploying to Vercel](#-deploying-to-vercel)
- [Deploying to Other Platforms](#-deploying-to-other-platforms)
  - [Docker Deployment](#docker-deployment)
  - [Manual Linux Server](#manual-linux-server)
- [Production Checklist](#-production-checklist)
- [Post-Deployment](#-post-deployment)

---

## 🚀 Quick Deploy (Vercel)

The fastest way to get DropAI running in production:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdropai%2Fdropai-store)

Click the button above, connect your GitHub repo, and Vercel handles the rest.

---

## 📋 Prerequisites

### For All Deployments

| Requirement | Version | Notes |
|------------|---------|-------|
| Node.js | 18.17+ (20.x recommended) | Required for build |
| npm / yarn / pnpm | Latest | Package manager |
| Git | Latest | Version control |
| Turso account | Free tier | For database |

### Database: Turso (SQLite)

DropAI uses Turso for its database — a distributed SQLite platform. Every team member has `team-db` pre-installed, but in production you'll need a Turso account.

1. **Create a Turso account** at [turso.tech](https://turso.tech)
2. **Install the Turso CLI**:
   ```bash
   curl -sSfL https://get.turso.tech/install.sh | bash
   ```
3. **Create a database**:
   ```bash
   turso db create dropai-production
   ```
4. **Get the database URL and auth token**:
   ```bash
   turso db show dropai-production --url
   turso db tokens create dropai-production
   ```

---

## 🔧 Environment Configuration

### Required Variables

Create a `.env.production` file:

```env
# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=DropAI

# Database (Turso)
TURSO_DB_URL=libsql://your-db.turso.io
TURSO_DB_AUTH_TOKEN=your-auth-token

# AI (Optional - for real AI features)
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...

# Email (Optional - for email sending)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG....
EMAIL_FROM=noreply@dropai.store
```

> **Note:** In the current version, AI features use mock responses. Set API keys only when you're ready to integrate real LLM APIs.

---

## 🗄 Database Setup

### Seeding the Production Database

After connecting to your Turso database, seed it with initial data:

```bash
# Using the seed script against your production DB
# (Update the TEAM_DB path or TURSO credentials in the script first)

# Option 1: Shell script
bash scripts/seed.sh

# Option 2: Node.js script
npx tsx scripts/seed.ts
```

Or execute manually for a fresh empty database — the app will gracefully show empty states.

---

## 🚄 Deploying to Vercel

### Option A: Vercel Dashboard (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New → Project**
   - Import your `dropai-store` repository
   - Framework preset: **Next.js** (auto-detected)

3. **Configure environment variables**:
   - Add all variables from `.env.production`
   - Set `NEXT_PUBLIC_APP_URL` to your production domain

4. **Deploy**:
   - Click **Deploy**
   - Vercel will build and deploy automatically
   - Every push to `main` triggers a new deployment

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add TURSO_DB_URL production
# ... repeat for all variables
```

### Build Configuration

The default Next.js configuration in `next.config.ts` works out of the box with Vercel. No additional configuration needed.

---

## 🐳 Deploying to Other Platforms

### Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

**docker-compose.yml:**

```yaml
version: '3.8'
services:
  dropai:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
      - TURSO_DB_URL=${TURSO_DB_URL}
      - TURSO_DB_AUTH_TOKEN=${TURSO_DB_AUTH_TOKEN}
    restart: unless-stopped
```

**Build and run:**

```bash
docker build -t dropai .
docker run -p 3000:3000 \
  -e TURSO_DB_URL=... \
  -e TURSO_DB_AUTH_TOKEN=... \
  dropai
```

### Manual Linux Server

**1. Install Node.js:**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**2. Clone and build:**

```bash
git clone https://github.com/dropai/dropai-store.git
cd dropai-store
npm ci
npm run build
```

**3. Set up environment:**

```bash
cp .env.example .env.local
# Edit .env.local with production values
```

**4. Start with PM2:**

```bash
npm install -g pm2
pm2 start npm --name "dropai" -- start
pm2 save
pm2 startup
```

**5. Reverse proxy with nginx:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ✅ Production Checklist

### Before Going Live

- [ ] **Set `NEXT_PUBLIC_APP_URL`** to your actual domain
- [ ] **Seed the database** with initial products (or add them through the app)
- [ ] **Configure email SMTP** — set up SendGrid, AWS SES, or similar
- [ ] **Add AI API keys** — for production AI features (or keep mock responses)
- [ ] **Set up custom domain** — configure DNS to point to your hosting provider
- [ ] **Enable HTTPS** — Vercel does this automatically; for manual servers, use Let's Encrypt
- [ ] **Configure analytics** — connect Google Analytics or similar for visitor tracking
- [ ] **Test all pages** — visit every section to ensure data loads correctly
- [ ] **Test the AI chat** — verify the AI assistant responds properly
- [ ] **Send a test email** — verify SMTP configuration works
- [ ] **Test on mobile** — ensure responsive design works on various screen sizes

### Performance Optimizations

- **Enable ISR** — for product pages that don't change frequently
- **Configure caching** — use Vercel's Edge Cache or a CDN
- **Optimize images** — use Next.js Image component
- **Enable compression** — gzip/Brotli (Vercel does this automatically)

### Security Checklist

- [ ] **Environment variables** — never commit `.env.local` or API keys
- [ ] **HTTPS only** — redirect all HTTP traffic
- [ ] **Rate limiting** — protect API routes from abuse
- [ ] **Input validation** — validate all user inputs server-side
- [ ] **CORS headers** — restrict API access to your domain
- [ ] **Dependencies** — regularly run `npm audit` and update

---

## 📊 Post-Deployment

### Monitoring

- **Vercel Analytics** — built-in analytics for page views and performance
- **Vercel Logs** — view build and runtime logs in the dashboard
- **Sentry** (optional) — error tracking for production issues

### Updating

```bash
# Make changes locally
git add .
git commit -m "fix: description of fix"
git push origin main

# Vercel auto-deploys on push to main
# For manual servers:
git pull origin main
npm ci
npm run build
pm2 restart dropai
```

### Rollback

On Vercel: go to the Deployment section and promote a previous deployment.
On manual servers: use git to revert and redeploy.

```bash
git revert HEAD
git push origin main
# Then rebuild and restart
```

---

## 🆘 Troubleshooting

### Build Fails

- **TypeScript errors**: Run `npx tsc --noEmit` locally to check for type errors
- **Module not found**: Run `npm ci` to clean install dependencies
- **Memory issues**: Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096" npm run build`

### Database Connection Issues

- Verify TURSO_DB_URL and TURSO_DB_AUTH_TOKEN are correct
- Check that your Turso database exists and is active
- Ensure network allows outbound connections to Turso

### Blank Pages

- Check browser console for JavaScript errors
- Verify API routes return data (visit `/api/dashboard` directly)
- Clear browser cache and hard reload

### Email Not Sending

- Verify SMTP credentials
- Check spam folder
- Test with a simple email tool like `swaks` or curl
- Check email provider send limits

---

## 📚 Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments)
- [Turso Documentation](https://docs.turso.tech/)
- [PM2 Process Manager](https://pm2.keymetrics.io/)

---

<p align="center">Need help? Open an issue or contact the DropAI team.</p>
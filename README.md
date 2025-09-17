# FinBotPro — Unified Website + SaaS (Netlify + Apple Sign-In)

**Tech:** Next.js 14 (App Router), Tailwind (futuristic theme), Prisma + Postgres (Neon-ready), NextAuth (Apple), Stripe webhook (stub).

## Quickstart (local)
```bash
cp .env.example .env
# Set DATABASE_URL to local Postgres or Neon
docker compose up -d   # optional: local DB
npm i
npm run db:push
npm run dev
# open http://localhost:3000
```

## Deploy on Netlify
1) Push this folder to a new GitHub repo.
2) Netlify → Add new site → Import an existing project → pick the repo.
3) Build settings:
   - Build: `npm run build`
   - Publish: `.next`
   - Functions: `netlify/functions`
4) Environment variables (Site → Settings → Environment):
```
NEXTAUTH_URL = https://YOUR_SITE.netlify.app   # or https://www.finbotpro.com
NEXTAUTH_SECRET = <long random string>

DATABASE_URL = <your Neon pooled connection string>

# Apple Sign-In (pre-generated client secret JWT)
APPLE_CLIENT_ID = com.finbotpro.app
APPLE_CLIENT_SECRET = <JWT you generate from your Apple key>

# Stripe (optional until you wire checkout)
STRIPE_SECRET_KEY =
STRIPE_WEBHOOK_SECRET =
STRIPE_PRICE_PRO_MONTH = price_123
```
5) Apply DB schema once (locally or via CI): `npm run db:push`

## Apple Sign-In notes
- Create a **Services ID** (e.g., `com.finbotpro.app`) and enable Sign in with Apple.
- Allowed return URLs:
  - Preview: `https://YOUR_SITE.netlify.app/api/auth/callback/apple`
  - Prod: `https://www.finbotpro.com/api/auth/callback/apple`
- Generate `APPLE_CLIENT_SECRET` (JWT) from your `AuthKey_XXXX.p8`. You can rotate it every ~6 months.

## Pages
- `/` Landing (marketing) • `/about` • `/pricing`
- `/onboarding` (creates Org + Project) → `/dashboard`
- `/api/auth/[...nextauth]` (Apple) • `/api/ai/memo` (stub) • `/api/projects` • `/api/stripe/webhook` (local)
- Netlify production webhook is at `netlify/functions/stripe-webhook.ts` (raw-body verification).

## Customize
- Replace AI stub in `app/api/ai/memo/route.ts` with your LLM call.
- Swap local “freeRuns” with server-side quotas tied to `Subscription` model.
- Add file uploads (S3) + queues for long jobs if needed.

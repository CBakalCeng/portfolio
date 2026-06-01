# Chetan Bakal — Executive Portfolio

> CEng · PMP® · ITIL® v4 · LSS GB  
> Global PMO Lead · Portfolio Governance · Turner & Townsend at bp

A premium executive portfolio built with Vue 3, Tailwind CSS, Supabase, and EmailJS.  
Live site: **`https://<your-github-username>.github.io/<repo-name>/`**

---

## Quick Start (Local Development)

```bash
# 1 — Clone the repo
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2 — Install dependencies
cd portfolio
npm install

# 3 — Create your local env file
cp .env.example .env.local
# Fill in your keys (see Keys section below)

# 4 — Start dev server
npm run dev
# → http://localhost:5173
```

---

## Deploying to GitHub Pages (step-by-step)

### Step 1 — Set the base URL in vite.config.js

Open `portfolio/vite.config.js` and uncomment + set your repo name:

```js
export default defineConfig({
  plugins: [vue()],
  base: '/<your-repo-name>/',   // ← e.g. '/portfolio/' or '/chetan-bakal/'
})
```

> **Why this matters:** GitHub Pages serves your site at `https://user.github.io/repo-name/`.  
> Without `base`, all asset paths will be broken (blank page).

### Step 2 — Add GitHub Secrets

Go to your repository on GitHub:  
**Settings → Secrets and variables → Actions → New repository secret**

Add all five secrets:

| Secret Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://wfdqpfaypyjkrbmcufwt.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | *(your Supabase anon key from keys.md)* |
| `VITE_EMAILJS_SERVICE_ID` | `service_3ke4h5e` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_8c9aj16` |
| `VITE_EMAILJS_PUBLIC_KEY` | `z6gBQM-0dEb3ahCSb` |

### Step 3 — Enable GitHub Pages

In your repository:  
**Settings → Pages → Source → Deploy from a branch**  
- Branch: **`main`**  
- Folder: **`/docs`**  
- Click **Save**

### Step 4 — Push to main

The workflow triggers automatically on every push to `main`:

```bash
git add .
git commit -m "feat: initial portfolio deploy"
git push origin main
```

The GitHub Action will:
1. Install dependencies
2. Build the Vite app with your secrets
3. Copy `portfolio/dist/` → `docs/`
4. Commit `docs/` back to `main` with `[skip ci]`

Your site will be live at `https://<username>.github.io/<repo-name>/` within ~2 minutes.

---

## Content Editing

All portfolio text, experience, certifications, and skills are in one file:

```
portfolio/src/data/portfolioContent.js
```

Open it in any text editor — it's fully commented and non-developer friendly. Change any text, add/remove jobs, update links, swap images. Then push to main and the site redeploys automatically.

---

## API Keys Reference

All keys are stored in `portfolio/keys.md` and `portfolio/.env.local` (git-ignored).

| Key | Used For |
|---|---|
| Supabase URL + Anon Key | Contact form backup, Recommendations DB |
| EmailJS Service/Template/Public Key | Contact form email delivery |
| Resend API Key | Server-side email via Supabase Edge Function |

---

## Supabase Database Setup

Run this once in **Supabase Dashboard → SQL Editor**  
(full SQL is in `portfolio/supabase/schema.sql`):

```sql
-- Creates contact_messages and portfolio_recommendations tables
-- with correct Row Level Security policies
```

**To approve a recommendation:**  
Supabase Dashboard → Table Editor → `portfolio_recommendations` → flip `is_approved` to `true`

---

## Supabase Edge Function (Resend email notifications)

```bash
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase login
supabase link --project-ref wfdqpfaypyjkrbmcufwt

# Deploy the function
cd portfolio
supabase functions deploy contact-handler

# Set server-side secrets
supabase secrets set RESEND_API_KEY=re_REosaKzy_MUL4bt2JnqNR6wX1tCQLMXUG
supabase secrets set NOTIFY_TO=chetanbakal@hotmail.com
supabase secrets set NOTIFY_FROM=onboarding@resend.dev
```

Then in **Supabase Dashboard → Database → Webhooks**:  
Create a webhook on `contact_messages` → Event: `INSERT` → Target: `contact-handler`

---

## Project Structure

```
/
├── .github/workflows/deploy.yml   ← CI/CD: auto-build and deploy on push to main
├── docs/                          ← Built site (auto-generated, served by GitHub Pages)
├── portfolio/                     ← Vite project root
│   ├── src/
│   │   ├── data/portfolioContent.js   ← ★ Edit this to change all content
│   │   ├── components/                ← All Vue components
│   │   ├── stores/ui.js               ← Dark/light mode + nav state
│   │   └── services/supabase.js       ← Null-safe Supabase client
│   ├── supabase/
│   │   ├── schema.sql                 ← Run once in Supabase SQL Editor
│   │   └── functions/contact-handler/ ← Resend email Edge Function
│   ├── .env.local                     ← Local keys (git-ignored)
│   └── vite.config.js                 ← Set base: '/<repo-name>/' before deploy
└── README.md                          ← This file
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 + Composition API + Pinia |
| Styling | Tailwind CSS v3 (dark mode: class) |
| Charts | Chart.js 4 + vue-chartjs 5 |
| Database | Supabase (PostgreSQL + RLS) |
| Email delivery | EmailJS (client) + Resend via Supabase Edge Function (server) |
| Fonts | Inter · Playfair Display · JetBrains Mono |
| Icons | Font Awesome 6 Free |
| Build | Vite 8 |
| Deployment | GitHub Pages (main branch /docs) |

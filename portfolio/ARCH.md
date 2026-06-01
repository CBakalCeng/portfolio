# ARCH.md — MBA Portfolio System: Complete Architectural Blueprint

> **Purpose.** This is the single self-contained reconstruction document for the
> full-stack MBA portfolio system built for Shambhu Patil. Any engineer (or AI agent)
> reading only this file must be able to recreate the entire system for a different
> client by replacing content in `src/stores/portfolio.js → DEFAULTS` and swapping
> the profile photo at `public/profile.jpg`.
>
> **Scope.** This document supersedes all prior ARCH.md versions. It reflects the
> production-shipped system including every design decision, every bug that was found
> and fixed, all API key locations and sources, and the complete deployment pipeline.

---

## § 0 — What This System Is

A **production-ready, full-stack MBA executive portfolio** that deliberately avoids
the "software engineer terminal" aesthetic in favour of a **corporate executive
management cockpit** — think Bloomberg terminal meets McKinsey slide deck.

The client is **Shambhu Patil**, MBA candidate at SCMHRD Pune (Infrastructure
Development & Management, 2025–2027), with an undergraduate background in Artificial
Intelligence & Data Science (VESIT Mumbai, 2020–2024). National Winner at Ecovate
2025 and National Finalist at V-Guard Big Idea Competition 2025.

Design tokens: **Luxury Corporate Noir** — deep navy-black base (`#08090f`,
`#0f1117`), gold/amber accents (`#c9922a`, `#e8b84b`), emerald for live/online
status (`#10B981`), with a full light-mode toggle that renders as a financial
prospectus (cream/off-white, high-contrast slate text).

---

## § 1 — Complete Technology Stack

| Layer | Choice | Version | Why This, Not Something Else |
|-------|--------|---------|------------------------------|
| Build / dev server | **Vite** | 5 | Sub-second HMR; native ESM in dev; `@tailwindcss/vite` plugin eliminates PostCSS config entirely. Webpack would have added 3+ config files. |
| UI framework | **Vue 3** Composition API + `<script setup>` | 3.x | Reactivity primitives compose 1:1 with Pinia stores; `:contenteditable` binding for admin editing is native HTML — no wrapper components needed. |
| State management | **Pinia** Setup Store pattern | latest | Zero boilerplate; Setup Store = plain `ref()` + functions; cross-store imports work without circular-dep issues. Vuex would have required mutations/actions verbosity. |
| Styling | **Tailwind CSS v4** + scoped `<style>` blocks + global CSS custom properties | 4.x | v4 ships as a Vite plugin — one line in `vite.config.js`, no `tailwind.config.js` needed. `@theme {}` block replaces `theme.extend` entirely. |
| Animation | **Motion One** (`motion`) | ^11 | 4 KB; `inView()` triggers entrance animations per-section on scroll. Alternatives (GSAP) were 10× the bundle size for this use case. |
| Charts | **Chart.js 4** + **vue-chartjs 5** | 4 / 5 | Radar chart for competency profiling. vue-chartjs wraps Chart.js as Vue components with reactive `data`/`options` props. |
| Database / Auth | **Supabase** (`@supabase/supabase-js`) | ^2 | PostgreSQL + Row Level Security + Edge Functions + free tier; JS client is 1 import. Downscoped to two operational tables only (see § 3). |
| Email delivery | **Resend** via Supabase Deno Edge Function | N/A | Single HTTPS POST from serverless Deno runtime; no server to maintain. |
| Email fallback | **EmailJS** (`@emailjs/browser`) | latest | Client-side fallback; fires only when Supabase is not configured. |
| Fonts | JetBrains Mono (data/numbers) + Inter (body) | CDN | JetBrains Mono for KPIs and monospaced accents; Inter as the dominant UI typeface. Loaded from Google Fonts CDN in `index.html`. |
| Icons | Font Awesome 6 Free | CDN | Loaded via CDN in `index.html`. No npm package needed. |

### Directory Map

```
project-root/                          ← git repository root
│
├── ARCH.md                            ← THIS document
├── README.md                          ← GitHub Pages deployment guide
├── .github/
│   └── workflows/
│       └── deploy.yml                 ← CI/CD: build + push to gh-pages on every push to main
│
└── portfolio/                         ← Vite project root (npm run dev / build)
    │
    ├── .env.local                     ← git-ignored; Supabase + EmailJS keys (never commit)
    ├── .env.example                   ← safe-to-commit template showing required var names
    ├── vite.config.js                 ← Vite + @tailwindcss/vite plugin; add base:'/<repo>/' for GH Pages
    ├── index.html                     ← SPA shell; loads Font Awesome + Google Fonts from CDN
    ├── package.json
    │
    ├── public/
    │   ├── profile.jpg                ← ★ client profile photo (drop file here; auto-detected)
    │   ├── resume.pdf                 ← downloadable resume (linked from NavBar)
    │   └── favicon.svg
    │
    ├── supabase/
    │   ├── schema.sql                 ← idempotent DDL + RLS + GRANTs; run once in SQL Editor
    │   └── functions/
    │       └── contact-handler/
    │           └── index.ts           ← Deno Edge Function: receives DB webhook → calls Resend
    │
    └── src/
        ├── main.js                    ← createApp + Pinia install + CSS import
        ├── App.vue                    ← root; mounts all ExecPanel-wrapped sections;
        │                                Ctrl+Shift+A keybind; portfolioStore.bootstrap()
        │
        ├── assets/styles/
        │   └── main.css               ← @import tailwindcss; @theme {} tokens; all global
        │                                utility classes: .exec-panel, .metric-card,
        │                                .data-row, .tag-pill, .progress-track, .reveal, etc.
        │
        ├── services/
        │   └── supabase.js            ← createClient singleton; returns null if env vars missing
        │
        ├── stores/
        │   ├── portfolio.js           ← ★★ MASTER CONTENT STORE — edit DEFAULTS to change all text
        │   ├── auth.js                ← isAdmin flag; Supabase signInWithPassword; dev bypass
        │   └── ui.js                  ← isDark toggle; adminModalOpen; systemLogs ring buffer
        │
        └── components/
            ├── OsWindow.vue           ← Executive panel card wrapper (replaces terminal chrome)
            ├── NavBar.vue             ← Sticky; SP monogram; MBA Candidate subtitle; theme toggle
            ├── FooterSection.vue
            │
            ├── HeroSection.vue        ← Full-width hero; profile photo with monogram fallback;
            │                            executive profile card; quick KPI grid; CTA buttons
            ├── ExperienceSection.vue  ← Gradient timeline rail; KONE → SCMHRD → VESIT cards
            ├── ProjectsSection.vue    ← "Strategic Case Studies" grid
            ├── ProjectCard.vue        ← per-project card with highlights 2×2 grid
            │
            ├── StackSection.vue       ← "Core Competencies" — skill groups + radar chart
            ├── SkillsChart.vue        ← Chart.js Radar; gold proficiency polygon; dashed benchmark
            │
            ├── MetricsDashboard.vue   ← "Performance Dashboard" — KPI tiles + competition cards
            ├── AlgoSection.vue        ← "Business Analytics Toolkit" — proficiency bars + domains
            ├── GithubSection.vue      ← "Awards & Recognitions" — achievement card grid
            ├── CertsSection.vue       ← 8 verified certification cards
            ├── RecommendationsSection.vue ← Public guestbook: approved recs + submission form
            ├── ContactSection.vue     ← Contact form → Supabase (primary) / EmailJS (fallback)
            ├── DbStatusBadge.vue      ← Live / Offline / Connecting… pill
            ├── AdminModal.vue         ← Teleport overlay; Supabase auth; dev bypass (admin/admin)
            └── AdminCommandBar.vue    ← Slide-up bar when isAdmin; Discard / Commit buttons
```

---

## § 2 — The Single Source of Truth

**The only file you need to edit to change all portfolio content:**

```
portfolio/src/stores/portfolio.js  →  const DEFAULTS = { ... }
```

`DEFAULTS` is a plain JavaScript object. Every `ref()` in the store is initialized
from a deep clone of this object at store creation time — before any network call,
before `onMounted`, before the first Vue render tick. This guarantees:

- **Zero blank-screen window** even on first cold load.
- **Network failure = no visible change** — refs already have content.
- **Supabase down = site still works** — content served from bundle.

### DEFAULTS Structure

```js
const DEFAULTS = {
  hero: {
    name, title, tagline, summary, status, location, email, linkedin,
    badges: [{ text, color, icon }]
  },
  experience: [{ id, company, role, period, location, type, bullets[], tags[] }],
  projects:   [{ id, name, tagline, affiliation, description, stack[], github, live,
                 highlights: [{ icon, color, title, desc }] }],
  skills: {
    radarLabels: string[],    // ← must be same length as radarValues
    radarValues: number[],    // ← 0–100 per axis
    benchmarkValue: number,
    groups: [{ id, name, icon, color, skills: string[] }]
  },
  analytics_data: {
    totalCompetitions, nationalWins, nationalFinalist, certifications, projects,
    hscGrade, sscGrade, primaryDomain,
    patterns: [{ name, icon, color, pct }]  // ← powers the proficiency bars
  },
  github_showcase: [{ id, name, description, language, stars, forks, url, topics[] }],
  metrics: {
    nationalWins, nationalFinalist, certifications, universities,
    hscGrade, sscGrade, internshipCompany, mbaCollege, undergrad
  }
}
```

### Why deepClone?

```js
function deepClone(obj) { return JSON.parse(JSON.stringify(obj)) }

const hero = ref(deepClone(DEFAULTS.hero))
```

Without deep cloning, admin mutations to `hero.value` would mutate `DEFAULTS.hero`
too (same object reference). The Discard action calls `bootstrap()` which re-reads
`DEFAULTS` — a polluted `DEFAULTS` would make Discard a no-op. Deep clone prevents
this entirely.

---

## § 3 — Database Architecture (Downscoped)

> **Critical design decision.** Earlier ARCH.md versions described a full
> `portfolio_content` / `portfolio_projects` / `portfolio_experience` DB-driven
> content system. **This was abandoned.** The final system uses the database only
> for two operational write-tables. All portfolio text is static in `DEFAULTS`.

### Why the DB was downscoped

The full DB-hydration approach caused three categories of production failure:

1. **Cold start blank renders.** Even on Supabase edge, the first `SELECT` takes
   200–600 ms. Components bound directly to DB results rendered zero cards during
   that window.
2. **RLS misconfiguration cascades.** A single missing `GRANT SELECT … TO anon`
   silently collapsed every section to empty — with no error visible in the UI.
3. **Empty tables on fresh deploy.** A clean DB returns `[]` for every table.
   `projects.value = res.data` then painted a blank grid.

**Fix:** Content lives in `DEFAULTS` in the bundle. The DB is only for data that
must be written by external users at runtime.

### Tables in Production

```sql
-- Append-only inbox for contact form submissions.
-- Anon can INSERT; only authenticated admin can SELECT.
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  from_name  text        NOT NULL,
  from_email text        NOT NULL,
  subject    text,
  message    text        NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Public guestbook. Visitors submit; owner approves via Dashboard toggle.
-- Approved rows (is_approved = true) are fetched and rendered on the site.
CREATE TABLE IF NOT EXISTS public.portfolio_recommendations (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name      text        NOT NULL,
  author_title     text        NOT NULL,
  company          text,
  relationship     text,
  testimonial_text text        NOT NULL,
  is_approved      boolean     DEFAULT false,
  created_at       timestamptz DEFAULT now()
);
```

### Row Level Security (RLS)

```sql
-- contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert_contact"
  ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_read_contact"
  ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');

-- portfolio_recommendations
ALTER TABLE public.portfolio_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert_recommendations"
  ON public.portfolio_recommendations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public_read_approved_recommendations"
  ON public.portfolio_recommendations FOR SELECT USING (is_approved = true);
CREATE POLICY "auth_manage_recommendations"
  ON public.portfolio_recommendations FOR ALL USING (auth.role() = 'authenticated');
```

### Grants

```sql
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT ON public.portfolio_recommendations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.contact_messages, public.portfolio_recommendations TO authenticated;
```

**Full schema lives at:** `portfolio/supabase/schema.sql` — run once in Supabase
SQL Editor. It is fully idempotent (`IF NOT EXISTS`, `IF NOT EXISTS` on policies).

---

## § 4 — Fail-Safe Architecture

Every layer degrades gracefully. The system never shows a broken state to a visitor.

### 4.1 Supabase client — null-safe singleton

```js
// src/services/supabase.js
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null
```

If either env var is missing (local dev without `.env.local`, or a GitHub Pages
deploy missing its secrets), `supabase` is `null`. Every consumer checks:

```js
if (!supabase) {
  dbStatus.value = 'local_fallback'
  // stop — DEFAULTS already painted; nothing to do
  return
}
```

### 4.2 bootstrap() — non-blocking overlay

`App.vue` calls `portfolioStore.bootstrap()` from `onMounted()` — **after** the
first paint. The overlay is purely additive:

- **Fetches** approved recommendations (`portfolio_recommendations`).
- **Never** assigns `null`, `[]`, or an error object to any content ref.
- On any error, only status flags (`dbStatus`, `dbError`) are touched; all content
  refs retain their `DEFAULTS` values.

```
dbStatus values:
  'pending'        → bootstrap not yet started
  'hydrated'       → Supabase responded and data was applied
  'local_fallback' → Supabase unavailable or returned nothing; DEFAULTS in use
```

`DbStatusBadge.vue` renders this as a coloured pill in the panel headers:
`● Live` (green) / `● Offline` (amber) / `● Connecting…` (grey).

### 4.3 Contact form — dual transport

```
Primary:   supabase.from('contact_messages').insert(payload)
           ↓ triggers DB webhook → Deno Edge Function → Resend API → your inbox

Fallback:  emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, { publicKey })
           ↑ fires only when supabase === null (env vars not configured)
```

Neither path throws to the user. Both return `{ ok: boolean, msg?: string }`.
The form shows a success or error message inline.

### 4.4 Profile photo — monogram fallback

```js
// HeroSection.vue
const photoLoaded = ref(false)
onMounted(() => {
  const img = new Image()
  img.onload  = () => { photoLoaded.value = true }
  img.onerror = () => { photoLoaded.value = false }
  img.src = '/profile.jpg'
})
```

If `public/profile.jpg` is absent, the hero displays an `SP` monogram in the gold
gradient instead. No broken img tag, no layout shift.

### 4.5 Recommendations — no `reveal` on async data

**Bug found and fixed:** Recommendation cards had the `.reveal` CSS class
(`opacity: 0; transform: translateY(16px)`) combined with an `IntersectionObserver`
that adds `.visible` on scroll. The observer was set up in `onMounted()` — before
the async `fetchRecommendations()` resolved. Approved records from Supabase
rendered as invisible blank space even though the data was present.

**Fix:** Remove `.reveal` from `v-for` recommendation cards entirely. Async-loaded
content must not depend on mount-time observers. Static content rendered on first
paint can safely use `.reveal`.

---

## § 5 — All API Keys: What, Where, How to Get

### 5.1 Frontend environment variables (`.env.local` / GitHub Secrets)

These are injected into the Vite bundle at build time via `import.meta.env.*`.
They are visible in the compiled JS bundle — that is safe for the anon/public keys
listed here. Never put service-role keys or private API keys here.

| Variable | Used In | Purpose | Where to Find It |
|----------|---------|---------|-----------------|
| `VITE_SUPABASE_URL` | `src/services/supabase.js` | Supabase project endpoint | Supabase Dashboard → Project Settings → API → **Project URL** |
| `VITE_SUPABASE_ANON_KEY` | `src/services/supabase.js` | Public JWT for RLS-gated queries | Supabase Dashboard → Project Settings → API → **anon** / **public** key |
| `VITE_EMAILJS_SERVICE_ID` | `src/stores/portfolio.js` (fallback) | Identifies your EmailJS email service | EmailJS Dashboard → **Email Services** → your service → Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | `src/stores/portfolio.js` (fallback) | EmailJS email template to render | EmailJS Dashboard → **Email Templates** → your template → Template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | `src/stores/portfolio.js` (fallback) | Authenticates client-side EmailJS calls | EmailJS Dashboard → **Account** → General → **Public Key** |

**Current project values** (already in `.env.local`):
```
VITE_SUPABASE_URL      = https://uaysqqiusqfzluvgiacv.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_EMAILJS_SERVICE_ID  = service_mb1rrgf
VITE_EMAILJS_TEMPLATE_ID = template_59d824o
VITE_EMAILJS_PUBLIC_KEY  = <not yet set — get from EmailJS dashboard>
```

### 5.2 Supabase Edge Function secrets (server-side only)

These live in Supabase's encrypted secrets vault. They are **never** in the frontend
bundle. Set them once via the Supabase CLI:

```bash
supabase secrets set RESEND_API_KEY=<value>
supabase secrets set NOTIFY_TO=<value>
supabase secrets set NOTIFY_FROM=<value>
```

| Secret | Used In | Purpose | Where to Find It |
|--------|---------|---------|-----------------|
| `RESEND_API_KEY` | `supabase/functions/contact-handler/index.ts` | Authenticates calls to Resend email API | [Resend Dashboard](https://resend.com) → API Keys → Create API Key |
| `NOTIFY_TO` | Edge function | Your inbox address for contact alerts | Your own email address |
| `NOTIFY_FROM` | Edge function | Sender address in outgoing emails | A domain verified in Resend, or `onboarding@resend.dev` for testing |

**Current Resend API key** (for this project):
```
RESEND_API_KEY = re_eUiPWXUB_VU4L5HEDtaHGnGeThT9eKqp1
```

### 5.3 GitHub Actions secrets (CI/CD only)

Set in: Repository → Settings → Secrets and variables → Actions → New repository secret

The workflow in `.github/workflows/deploy.yml` passes these as `env:` to `npm run
build`. They become `import.meta.env.*` inside the compiled bundle.

| GitHub Secret | Maps to Vite Variable |
|--------------|----------------------|
| `VITE_SUPABASE_URL` | `VITE_SUPABASE_URL` |
| `VITE_SUPABASE_ANON_KEY` | `VITE_SUPABASE_ANON_KEY` |
| `VITE_EMAILJS_SERVICE_ID` | `VITE_EMAILJS_SERVICE_ID` |
| `VITE_EMAILJS_TEMPLATE_ID` | `VITE_EMAILJS_TEMPLATE_ID` |
| `VITE_EMAILJS_PUBLIC_KEY` | `VITE_EMAILJS_PUBLIC_KEY` |

`GITHUB_TOKEN` is injected automatically by Actions — do not add it manually.

---

## § 6 — Design System

### 6.1 Color Tokens (`src/assets/styles/main.css → @theme {}`)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-base` | `#08090f` | Page background (dark) |
| `--color-surface` | `#0f1117` | Panel / card background |
| `--color-panel` | `#161b27` | Metric card background |
| `--color-border` | `#1e2a3a` | All borders |
| `--color-gold` | `#c9922a` | Primary accent (title underline, CTAs, awards) |
| `--color-gold-lt` | `#e8b84b` | Gradient end for gold elements |
| `--color-emerald` | `#10B981` | Live status, education type, success states |
| `--color-blue` | `#3B82F6` | Internship type, finalist badge, data analytics |
| `--color-purple` | `#8B5CF6` | AI/ML domain, recommendation section |
| `--color-amber` | `#F59E0B` | Awards section accent |
| `--color-text` | `#dde3ee` | Primary body text |
| `--color-muted` | `#5a6a82` | Secondary / label text |

Light mode uses cream/off-white backgrounds (`#f7f5f0`, `#ffffff`) with high-contrast
slate typography — overridden via `html:not(.dark)` selectors.

### 6.2 Typography

- **Headings / names:** Inter, bold, `tracking-tight`
- **Labels / section eyebrows:** Inter, `font-semibold`, `uppercase`, `tracking-wider`, `text-[10px]`
- **KPI numbers / data values:** JetBrains Mono (gives the Bloomberg terminal number feel)
- **Tag pills / code accents:** JetBrains Mono

### 6.3 Key Utility Classes

| Class | What It Does |
|-------|-------------|
| `.exec-panel` | Rounded dark card with border, box-shadow, `opacity:0` start for Motion One entrance |
| `.panel-header` | Flex row at top of every panel: left accent bar + title + right badge slot |
| `.metric-card` | Inner card with `#161b27` background, hover border-gold and lift |
| `.data-row` | Flex row with `justify-between` for key:value pairs; bottom border |
| `.section-eyebrow` | `text-[10px] uppercase tracking-wider` label flanked by HR lines |
| `.tag-pill` | Small rounded chip for skill/stack tags |
| `.progress-track` / `.progress-fill` | 5px height bar; `transition: width 1.6s` for sweep animation |
| `.reveal` | `opacity:0 translateY(16px)` → `.visible` via IntersectionObserver (static content only) |
| `.btn-primary` | Gold gradient CTA button |
| `.btn-outline` | Bordered outline button; hover → gold |
| `.pulse-dot` | CSS keyframe ring-pulse for the "Online" status indicator |
| `.ce-edit` | Admin contenteditable affordance: gold dashed border on focus |

### 6.4 Entrance Animations

`OsWindow.vue` (the `ExecPanel` wrapper) uses Motion One's `inView()`:

```js
inView(panelEl.value, () => {
  animate(panelEl.value,
    { opacity: [0, 1], y: [20, 0] },
    { duration: 0.5, easing: [0.22, 1, 0.36, 1] }
  )
}, { amount: 0.06 })
```

Each panel fades up as it enters the viewport — staggered naturally by scroll
position. The `0.06` threshold fires almost as soon as 6% of the panel is visible,
giving an immediate response feel.

---

## § 7 — Admin Editing Mode

Admin mode is a **client-side UI flag** only. It never grants DB access — that is
handled entirely by Supabase RLS on the authenticated session.

### Activation

| Trigger | Implementation |
|---------|---------------|
| **Ctrl + Shift + A** anywhere | Global `keydown` listener in `App.vue onMounted()` |
| Triple-click the "Open to Opportunities" pill | `clickCount` counter with 600ms reset in `HeroSection.vue` |

Both open `AdminModal.vue` (a `<Teleport to="body">` overlay).

### Authentication flow

1. User enters email + password in `AdminModal`.
2. `authStore.login()` calls `supabase.auth.signInWithPassword()`.
3. On success: `authStore.isAdmin = true` → modal closes.
4. **Dev offline bypass:** If `supabase === null` and credentials are `admin / admin`,
   `isAdmin` is set to `true` without a network call.

### What becomes editable

When `isAdmin === true`:
- `AdminCommandBar.vue` slides up from the bottom.
- Any element with `:contenteditable="isAdmin"` becomes an inline text editor.
- `@blur` handlers call `portfolioStore.onEdit()`, `onEditNumber()`, or `onEditList()`.

### Commit / Discard

- **Discard:** Calls `portfolioStore.bootstrap()`, which re-initialises all refs from
  `DEFAULTS` (Supabase overlay runs again if available). All unsaved edits are wiped.
- **Commit:** In the current downscoped architecture (static content), `isDirty` is
  cleared but no DB write occurs. If full DB persistence is re-enabled, the commit
  pipeline does sequential upserts into Supabase tables.

---

## § 8 — Deployment Pipeline

### Local build

```bash
cd portfolio
npm install
npm run dev       # → http://localhost:5173
npm run build     # → portfolio/dist/  (production SPA)
```

### GitHub Pages (automated)

`.github/workflows/deploy.yml` triggers on every push to `main`:

1. Checkout → Setup Node 20 → `npm ci`
2. `npm run build` with all `VITE_*` secrets injected as env vars
3. `peaceiris/actions-gh-pages@v4` pushes `portfolio/dist/` to the `gh-pages` branch
4. GitHub Pages serves the `gh-pages` branch at `https://<user>.github.io/<repo>/`

**Required before first deploy:**
- Add `base: '/<repo-name>/'` to `vite.config.js`
- Add all 5 `VITE_*` secrets to GitHub repository secrets
- Enable Pages on the `gh-pages` branch in repository settings

### Supabase Edge Function deployment

```bash
supabase login
supabase link --project-ref uaysqqiusqfzluvgiacv
supabase functions deploy contact-handler
supabase secrets set RESEND_API_KEY=re_eUiPWXUB_...
supabase secrets set NOTIFY_TO=your@email.com
supabase secrets set NOTIFY_FROM=portfolio@resend.dev
```

Wire the webhook: Supabase Dashboard → Database → Webhooks → New →
Table: `contact_messages`, Event: `INSERT`, Type: Edge Function, Target: `contact-handler`.

---

## § 9 — Bugs Found and Fixed

| # | Bug | Root Cause | Fix Applied |
|---|-----|------------|-------------|
| 1 | **Blank recommendation cards after Supabase approval** | Cards had `.reveal` class (`opacity:0`). The `IntersectionObserver` to add `.visible` runs at `onMounted()` — before async `fetchRecommendations()` resolves. Approved rows rendered invisible. | Removed `.reveal` from all `v-for` recommendation cards. Async-loaded content must not rely on mount-time observers. |
| 2 | **Wrong aesthetic — looked like a backend developer's site** | Initial design used macOS traffic-light window chrome, terminal path breadcrumbs (`shambhu@cockpit:~/career $ render()`), and a GitHub showcase section — all inappropriate for an MBA profile. | Full redesign: replaced `OsWindow` terminal chrome with clean executive `ExecPanel` with coloured accent bars; replaced GitHub section with "Awards & Recognitions"; changed section names to business language; switched Inter as dominant typeface; gold+navy corporate colour palette. |
| 3 | **Cold start blank screens** (prior architecture) | Store refs initialised from DB fetch results. DB returns `[]` on empty tables or slow first response. | Moved all content to `DEFAULTS` in bundle. DB is overlay-only, never the initial render source. |
| 4 | **Monogram shown instead of photo** | `public/profile.jpg` not present at build time. | `Image().onload/onerror` probe in `HeroSection.vue onMounted()`. Gold `SP` monogram shown as fallback; no broken image tag or layout shift. |
| 5 | **Tailwind classes not applying** | Vite config still used old Vue scaffold without `@tailwindcss/vite` plugin. | Added `import tailwindcss from '@tailwindcss/vite'` and `tailwindcss()` to `plugins[]` in `vite.config.js`. |

---

## § 10 — How to Recreate for a New Client

1. **Scaffold:** `npm create vite@latest my-portfolio -- --template vue`
2. **Install:** `npm i pinia @supabase/supabase-js motion chart.js vue-chartjs @emailjs/browser`
3. **Install dev:** `npm i -D tailwindcss @tailwindcss/vite`
4. **Copy** `vite.config.js` (add `tailwindcss()` plugin).
5. **Copy** `src/assets/styles/main.css` verbatim — all design tokens and utility classes live here.
6. **Copy** `src/services/supabase.js` verbatim — null-safe singleton.
7. **Copy** `src/stores/auth.js` and `src/stores/ui.js` verbatim.
8. **Copy** `src/stores/portfolio.js` — then **replace only the `DEFAULTS` block** with the new client's data. Keep `bootstrap()`, `submitContact()`, `submitRecommendation()`, `onEdit()`, `deepClone()` unchanged.
9. **Copy all components** verbatim — they read from the store, not hardcoded values.
10. **Replace** `public/profile.jpg` with the new client's photo.
11. **Update** the real email address in `ContactSection.vue → contactLinks[]` and LinkedIn URL.
12. **Run** `supabase/schema.sql` in the new Supabase project's SQL Editor.
13. **Fill** `.env.local` with the new project's Supabase URL + anon key.
14. **Run** `npm run dev` → full site renders immediately from `DEFAULTS`.
15. **Deploy** following `README.md § 4`.

**Total content edits required for a new client: 1 file** (`DEFAULTS` in `portfolio.js`) + 1 photo + 2 contact strings.

---

*End of ARCH.md. If anything in the running code drifts from the contracts documented
here — especially § 4 (fail-safe invariants) and § 3 (RLS policies) — the code is
wrong. Fix the code to match this document, not the other way around.*

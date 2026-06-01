-- ═══════════════════════════════════════════════════════════════════
--  Chetan Bakal Portfolio — Supabase Schema
--  Run this ONCE in Supabase Dashboard → SQL Editor
--  Project: wfdqpfaypyjkrbmcufwt
--  Fully idempotent (safe to run multiple times).
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. Contact form inbox ──────────────────────────────────────────
-- Anyone can insert (anon); only authenticated admin can read.
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  from_name  text        NOT NULL,
  from_email text        NOT NULL,
  subject    text,
  message    text        NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'anon_insert_contact'
  ) THEN
    CREATE POLICY "anon_insert_contact"
      ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'auth_read_contact'
  ) THEN
    CREATE POLICY "auth_read_contact"
      ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
END $$;

GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;


-- ── 2. Recommendations / Testimonials ─────────────────────────────
-- Visitors can submit; only is_approved = true rows are publicly visible.
-- Toggle is_approved in Supabase Dashboard → Table Editor to publish.
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

ALTER TABLE public.portfolio_recommendations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_recommendations' AND policyname = 'anon_insert_recommendations'
  ) THEN
    CREATE POLICY "anon_insert_recommendations"
      ON public.portfolio_recommendations FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_recommendations' AND policyname = 'public_read_approved'
  ) THEN
    CREATE POLICY "public_read_approved"
      ON public.portfolio_recommendations FOR SELECT USING (is_approved = true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_recommendations' AND policyname = 'auth_manage_recommendations'
  ) THEN
    CREATE POLICY "auth_manage_recommendations"
      ON public.portfolio_recommendations FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

GRANT SELECT, INSERT ON public.portfolio_recommendations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_recommendations TO authenticated;


-- ═══════════════════════════════════════════════════════════════════
--  AFTER running this SQL, complete the Edge Function + Webhook setup:
--
--  STEP 1 — Install Supabase CLI (if not already):
--    npm install -g supabase
--
--  STEP 2 — Login and link project:
--    supabase login
--    supabase link --project-ref wfdqpfaypyjkrbmcufwt
--
--  STEP 3 — Deploy the Edge Function:
--    supabase functions deploy contact-handler
--
--  STEP 4 — Set server-side secrets:
--    supabase secrets set RESEND_API_KEY=re_REosaKzy_MUL4bt2JnqNR6wX1tCQLMXUG
--    supabase secrets set NOTIFY_TO=chetanbakal@hotmail.com
--    supabase secrets set NOTIFY_FROM=onboarding@resend.dev
--
--  STEP 5 — Wire the DB Webhook (in Supabase Dashboard):
--    Dashboard → Database → Webhooks → Create a new webhook
--    ┌─────────────────────────────────────────────────────┐
--    │  Name:   contact-email-trigger                      │
--    │  Table:  public.contact_messages                    │
--    │  Events: INSERT                                     │
--    │  Type:   Supabase Edge Function                     │
--    │  Target: contact-handler                            │
--    └─────────────────────────────────────────────────────┘
--
--  EMAIL FLOW after setup:
--    Form submit → EmailJS (instant, client-side) → your inbox
--                → Supabase INSERT → DB Webhook → Edge Function → Resend → your inbox
--    (Two independent paths — double redundancy)
-- ═══════════════════════════════════════════════════════════════════

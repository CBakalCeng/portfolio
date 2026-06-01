// Supabase Deno Edge Function — contact-handler
// Triggered by a DB webhook on INSERT into contact_messages.
// Sends a rich HTML email via Resend API.
//
// Deploy:
//   supabase login
//   supabase link --project-ref wfdqpfaypyjkrbmcufwt
//   supabase functions deploy contact-handler
//   supabase secrets set RESEND_API_KEY=re_REosaKzy_MUL4bt2JnqNR6wX1tCQLMXUG
//   supabase secrets set NOTIFY_TO=chetanbakal@hotmail.com
//   supabase secrets set NOTIFY_FROM=onboarding@resend.dev
//
// Wire the webhook:
//   Supabase Dashboard → Database → Webhooks → Create Webhook
//   Table: contact_messages  |  Event: INSERT  |  Type: Edge Function  |  Target: contact-handler

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_KEY  = Deno.env.get('RESEND_API_KEY')!
const NOTIFY_TO   = Deno.env.get('NOTIFY_TO')   || 'chetanbakal@hotmail.com'
const NOTIFY_FROM = Deno.env.get('NOTIFY_FROM') || 'onboarding@resend.dev'

serve(async (req: Request) => {
  try {
    const payload = await req.json()
    const r = payload.record   // the newly inserted row

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, Arial, sans-serif; background: #f7f5f0; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header  { background: linear-gradient(135deg, #c9922a, #e8b84b); padding: 28px 32px; }
    .header h1 { color: #08090f; font-size: 20px; margin: 0; font-weight: 700; }
    .header p  { color: #3a2800; font-size: 13px; margin: 4px 0 0; opacity: 0.75; }
    .body    { padding: 28px 32px; }
    .field   { margin-bottom: 20px; }
    .label   { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #6b7280; font-weight: 600; margin-bottom: 4px; }
    .value   { font-size: 15px; color: #1a2332; font-weight: 500; }
    .message { background: #f7f5f0; border-radius: 8px; padding: 16px; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap; }
    .footer  { border-top: 1px solid #ede9e0; padding: 16px 32px; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📩 New Portfolio Contact</h1>
      <p>Chetan Bakal · Executive Portfolio</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${escHtml(r.from_name)}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escHtml(r.from_email)}" style="color:#c9922a;">${escHtml(r.from_email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${escHtml(r.subject || '(no subject)')}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message">${escHtml(r.message)}</div>
      </div>
    </div>
    <div class="footer">
      Received ${new Date(r.created_at).toUTCString()} · via portfolio contact form
    </div>
  </div>
</body>
</html>`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    NOTIFY_FROM,
        to:      NOTIFY_TO,
        subject: `Portfolio enquiry from ${r.from_name} — ${r.subject || 'New message'}`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return new Response(JSON.stringify({ error: err }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})

function escHtml(str: string): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

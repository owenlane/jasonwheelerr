import { NextResponse } from "next/server";
import { person, type InquiryIntent } from "@/lib/site";
import { EMAIL_RE, INTENT_LABEL, MAX_FIELD_LENGTH, MAX_PAYLOAD_BYTES, REPLY_PREFERENCES } from "@/lib/inquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Inquiry delivery. Submits on-site and emails the submission to Jason.
 * No CRM, no database, no portal — a single delivery call and nothing else.
 *
 * Required environment variable: RESEND_API_KEY (server scope only).
 * Optional: INQUIRY_FROM_ADDRESS (defaults to Resend's onboarding sender).
 * No submitted value is ever logged. Do not add logging that changes this.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clean(v: unknown): string {
  return typeof v === "string"
    ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").slice(0, MAX_FIELD_LENGTH).trim()
    : "";
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many submissions. Wait a minute and try again." }, { status: 429 });
  }
  if (Number(request.headers.get("content-length") ?? "0") > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ error: "That submission is too large." }, { status: 413 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "The submission could not be read." }, { status: 400 });
  }

  // Honeypot: silently accept without delivering.
  if (clean(payload.company)) return NextResponse.json({ ok: true });

  const intent = clean(payload.intent) as InquiryIntent;
  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const replyPreference = clean(payload.replyPreference);
  const message = clean(payload.message);

  if (!(intent in INTENT_LABEL) || !name || !email) {
    return NextResponse.json({ error: "Some required answers are missing." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address is not valid." }, { status: 400 });
  }
  if (replyPreference && !REPLY_PREFERENCES.includes(replyPreference as never)) {
    return NextResponse.json({ error: "The submission could not be read." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Messages cannot be sent from the site right now.", contactFallback: true },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Intent", INTENT_LABEL[intent]],
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Reply preference", replyPreference || "Not specified"],
    ["Message", message || "Not provided"],
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_ADDRESS ?? "Website <onboarding@resend.dev>",
        to: [person.email],
        reply_to: email,
        subject: `${INTENT_LABEL[intent]} inquiry from ${name}`,
        html: rows
          .map(([k, v]) => `<p style="margin:0 0 10px"><strong>${esc(k)}:</strong><br>${esc(v).replace(/\n/g, "<br>")}</p>`)
          .join(""),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(String(res.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "The message could not be delivered.", contactFallback: true },
      { status: 502 },
    );
  }
}

"use client";

import { useRef, useState } from "react";
import { inquiryIntents, person, type InquiryIntent } from "@/lib/site";
import { EMAIL_RE, MAX_FIELD_LENGTH, REPLY_PREFERENCES } from "@/lib/inquiry";

type Errors = Partial<Record<string, string>>;

/**
 * Submits on-site and shows an on-site confirmation state. The submission is
 * delivered to Jason by email server-side. There is no mail-client handoff.
 */
export default function InquiryForm({ initialIntent = "general" }: { initialIntent?: InquiryIntent }) {
  const [intent, setIntent] = useState<InquiryIntent>(initialIntent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [replyPreference, setReplyPreference] = useState<string>("Email");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [failure, setFailure] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  function validate(): Errors {
    const e: Errors = {};
    if (!name.trim()) e.name = "Your name is needed.";
    if (!email.trim()) e.email = "An email address is needed.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "That email address does not look complete.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setFailure("");
    if (honeypot.current?.value) return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ intent, name, email, phone, replyPreference, message }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "");
      }
      setStatus("sent");
      window.setTimeout(() => doneRef.current?.focus(), 100);
    } catch (err) {
      setStatus("error");
      setFailure(
        (err as Error).message ||
          "The message could not be sent.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="mt-10 border border-ink p-8 sm:p-10">
        <p className="microlabel">Received</p>
        <h3 className="mt-4 font-display text-xl">Your message is with Jason.</h3>
        <p className="measure mt-5 text-[0.9375rem] leading-relaxed quiet">
          He answers inquiries himself, usually by your preferred method. If it is urgent, call{" "}
          <a href={person.phoneHref} className="link-line text-ink">{person.phone}</a>.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
          }}
          className="mt-8 border-b border-ink pb-1 text-[0.75rem] font-semibold uppercase tracking-[0.14em]"
        >
          Send another
        </button>
      </div>
    );
  }

  const field =
    "mt-3 min-h-12 w-full border bg-field px-4 py-3 text-[1rem] transition-colors focus:border-ink focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="mt-10 max-w-3xl">
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="company">Leave this empty</label>
        <input id="company" name="company" ref={honeypot} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className="microlabel">What is this about?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {inquiryIntents.map((opt) => (
            <span key={opt.id}>
              <input
                type="radio"
                id={`intent-${opt.id}`}
                name="intent"
                value={opt.id}
                checked={intent === opt.id}
                onChange={() => setIntent(opt.id)}
                className="peer sr-only"
              />
              <label
                htmlFor={`intent-${opt.id}`}
                className={`flex min-h-11 cursor-pointer items-center border px-5 text-[0.8125rem] font-medium transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
                  intent === opt.id ? "border-ink bg-ink text-field" : "border-accent hover:border-ink"
                }`}
              >
                {opt.label}
              </label>
            </span>
          ))}
        </div>
      </fieldset>

      <div className="mt-9 grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="microlabel">Name</label>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            maxLength={MAX_FIELD_LENGTH}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "e-name" : undefined}
            className={`${field} ${errors.name ? "border-support" : "border-accent hover:border-ink"}`}
          />
          {errors.name && <p id="e-name" role="alert" className="mt-2 text-[0.8125rem] text-support">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="f-email" className="microlabel">Email</label>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            maxLength={MAX_FIELD_LENGTH}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "e-email" : undefined}
            className={`${field} ${errors.email ? "border-support" : "border-accent hover:border-ink"}`}
          />
          {errors.email && <p id="e-email" role="alert" className="mt-2 text-[0.8125rem] text-support">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="f-phone" className="microlabel">Phone — optional</label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            maxLength={MAX_FIELD_LENGTH}
            onChange={(e) => setPhone(e.target.value)}
            className={`${field} border-accent hover:border-ink`}
          />
        </div>

        <fieldset>
          <legend className="microlabel">Reply preference</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {REPLY_PREFERENCES.map((opt) => (
              <span key={opt}>
                <input
                  type="radio"
                  id={`reply-${opt}`}
                  name="replyPreference"
                  value={opt}
                  checked={replyPreference === opt}
                  onChange={() => setReplyPreference(opt)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`reply-${opt}`}
                  className={`flex min-h-11 cursor-pointer items-center border px-4 text-[0.8125rem] transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
                    replyPreference === opt ? "border-ink bg-ink text-field" : "border-accent hover:border-ink"
                  }`}
                >
                  {opt}
                </label>
              </span>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-7">
        <label htmlFor="f-message" className="microlabel">Message — optional</label>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          value={message}
          maxLength={MAX_FIELD_LENGTH}
          onChange={(e) => setMessage(e.target.value)}
          className={`${field} resize-y border-accent hover:border-ink`}
        />
      </div>

      {status === "error" && (
        <div role="alert" className="mt-8 border-l border-support pl-5">
          <p className="measure text-[0.9375rem] leading-relaxed">{failure}</p>
          <p className="measure mt-2 text-[0.9375rem] leading-relaxed quiet">
            Reach Jason directly:{" "}
            <a href={person.phoneHref} className="link-line text-ink">{person.phone}</a> or{" "}
            <a href={`mailto:${person.email}`} className="link-line text-ink">{person.email}</a>.
          </p>
        </div>
      )}

      <div className="mt-9">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center bg-ink px-8 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-field transition-colors hover:bg-support disabled:opacity-60"
        >
          {status === "sending" ? "Sending" : "Send to Jason"}
        </button>
      </div>
    </form>
  );
}

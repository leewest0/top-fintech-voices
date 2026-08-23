"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import type { Nomination } from "@/lib/nomination";
import { site } from "@/lib/site";

type FieldErrors = Partial<Record<keyof Nomination, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; message: string; fallbackEmail?: string };

const NOMINEE_FIELDS = [
  { name: "nomineeName", label: "Their name", type: "text", autoComplete: "off", required: true },
  {
    name: "nomineeRole",
    label: "What they do",
    type: "text",
    autoComplete: "off",
    required: true,
  },
  { name: "nomineeOrg", label: "Organisation", type: "text", autoComplete: "off" },
  { name: "nomineeLink", label: "LinkedIn or website", type: "url", autoComplete: "off" },
] as const;

export function NominationForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus({ kind: "sending" });
    setErrors({});

    try {
      const response = await fetch("/api/nominate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({ kind: "sent" });
        return;
      }

      setErrors(result.fields ?? {});
      setStatus({
        kind: "failed",
        message: result.error ?? "Something went wrong sending that.",
        fallbackEmail: result.fallbackEmail,
      });
    } catch {
      setStatus({
        kind: "failed",
        message: "We couldn't reach the server. Check your connection and try again.",
        fallbackEmail: site.email,
      });
    }
  }

  const field = {
    background: "var(--bg)",
    border: "1px solid var(--line)",
    color: "var(--text)",
  } as const;

  if (status.kind === "sent") {
    return (
      <div className="py-6 text-center" role="status">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
        >
          <Check size={22} aria-hidden="true" />
        </span>
        <h3 className="font-display mt-5 text-xl font-bold tracking-[-0.02em]">
          Thank you — that&rsquo;s with the editorial desk.
        </h3>
        <p
          className="mx-auto mt-3 max-w-sm text-sm leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          We read every nomination. If yours moves forward, we&rsquo;ll reach out to you and to
          them directly.
        </p>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {NOMINEE_FIELDS.map((f) => {
          const error = errors[f.name as keyof Nomination];
          return (
            <label key={f.name} className="block">
              <span className="mb-2 block text-sm font-semibold">
                {f.label}
                {!("required" in f && f.required) && (
                  <span style={{ color: "var(--muted)" }}> (optional)</span>
                )}
              </span>
              <input
                name={f.name}
                type={f.type}
                autoComplete={f.autoComplete}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${f.name}-error` : undefined}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ ...field, borderColor: error ? "var(--accent)" : "var(--line)" }}
              />
              {error && (
                <span
                  id={`${f.name}-error`}
                  className="mt-1.5 block text-xs"
                  style={{ color: "var(--accent)" }}
                >
                  {error}
                </span>
              )}
            </label>
          );
        })}
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Why do they deserve to be featured?</span>
        <textarea
          name="reason"
          rows={5}
          placeholder="What are they building, and why does it matter?"
          aria-invalid={errors.reason ? true : undefined}
          aria-describedby={errors.reason ? "reason-error" : undefined}
          className="w-full resize-y rounded-xl px-4 py-3 text-sm outline-none"
          style={{ ...field, borderColor: errors.reason ? "var(--accent)" : "var(--line)" }}
        />
        {errors.reason && (
          <span id="reason-error" className="mt-1.5 block text-xs" style={{ color: "var(--accent)" }}>
            {errors.reason}
          </span>
        )}
      </label>

      <div className="grid gap-5 sm:grid-cols-2" style={{ borderTop: "1px solid var(--line)", paddingTop: "1.25rem" }}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Your name</span>
          <input
            name="yourName"
            type="text"
            autoComplete="name"
            aria-invalid={errors.yourName ? true : undefined}
            aria-describedby={errors.yourName ? "yourName-error" : undefined}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{ ...field, borderColor: errors.yourName ? "var(--accent)" : "var(--line)" }}
          />
          {errors.yourName && (
            <span id="yourName-error" className="mt-1.5 block text-xs" style={{ color: "var(--accent)" }}>
              {errors.yourName}
            </span>
          )}
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Your email</span>
          <input
            name="yourEmail"
            type="email"
            autoComplete="email"
            aria-invalid={errors.yourEmail ? true : undefined}
            aria-describedby={errors.yourEmail ? "yourEmail-error" : undefined}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{ ...field, borderColor: errors.yourEmail ? "var(--accent)" : "var(--line)" }}
          />
          {errors.yourEmail && (
            <span id="yourEmail-error" className="mt-1.5 block text-xs" style={{ color: "var(--accent)" }}>
              {errors.yourEmail}
            </span>
          )}
        </label>
      </div>

      {/* Hidden from people, catnip for bots. Not display:none — some bots skip
          those — and never focusable or announced. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="nominate-website">Leave this empty</label>
        <input id="nominate-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "failed" && (
        <p
          role="alert"
          className="rounded-xl px-4 py-3 text-sm"
          style={{ border: "1px solid var(--accent)", color: "var(--text)" }}
        >
          {status.message}{" "}
          {status.fallbackEmail && (
            <>
              You can nominate someone by email in the meantime:{" "}
              <a href={`mailto:${status.fallbackEmail}`} className="navlink">
                {status.fallbackEmail}
              </a>
              .
            </>
          )}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm disabled:opacity-70"
        >
          {sending ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Submit the nomination <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

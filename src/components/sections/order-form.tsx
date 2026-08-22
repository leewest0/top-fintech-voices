"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { MAX_COPIES, type Order } from "@/lib/order";
import { site } from "@/lib/site";

type FieldErrors = Partial<Record<keyof Order, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; message: string; fallbackEmail?: string };

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "country", label: "Country", type: "text", autoComplete: "country-name", required: true },
] as const;

export function OrderForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus({ kind: "sending" });
    setErrors({});

    try {
      const response = await fetch("/api/order", {
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
          Order received.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          We&rsquo;ll confirm the details and payment by email. If you don&rsquo;t hear back within
          two working days, write to{" "}
          <a href={`mailto:${site.email}`} className="navlink">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
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
              aria-invalid={errors[f.name as keyof Order] ? true : undefined}
              aria-describedby={errors[f.name as keyof Order] ? `${f.name}-error` : undefined}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{
                ...field,
                borderColor: errors[f.name as keyof Order] ? "var(--accent)" : "var(--line)",
              }}
            />
            {errors[f.name as keyof Order] && (
              <span
                id={`${f.name}-error`}
                className="mt-1.5 block text-xs"
                style={{ color: "var(--accent)" }}
              >
                {errors[f.name as keyof Order]}
              </span>
            )}
          </label>
        ))}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Number of copies</span>
          <input
            name="copies"
            type="number"
            min={1}
            max={MAX_COPIES}
            defaultValue={1}
            inputMode="numeric"
            aria-invalid={errors.copies ? true : undefined}
            aria-describedby={errors.copies ? "copies-error" : undefined}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{ ...field, borderColor: errors.copies ? "var(--accent)" : "var(--line)" }}
          />
          {errors.copies && (
            <span id="copies-error" className="mt-1.5 block text-xs" style={{ color: "var(--accent)" }}>
              {errors.copies}
            </span>
          )}
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">
          Anything else? <span style={{ color: "var(--muted)" }}>(optional)</span>
        </span>
        <textarea
          name="message"
          rows={5}
          placeholder="Delivery address, invoicing details, a deadline…"
          className="w-full resize-y rounded-xl px-4 py-3 text-sm outline-none"
          style={field}
        />
      </label>

      {/* Hidden from people, catnip for bots. Not display:none — some bots skip
          those — and never focusable or announced. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
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
              You can order by email in the meantime:{" "}
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
              Place the order <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          We&rsquo;ll confirm payment and delivery by email.
        </p>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { buildMailto } from "@/lib/mailto";

const TOPICS = ["A story pitch", "Sponsorship", "Press", "Something else"] as const;

/**
 * There is no form backend yet, so rather than fake a submission that quietly
 * goes nowhere, this composes the message and hands it to the visitor's mail
 * client. The page says so plainly, and the address is on screen either way.
 *
 * Swapping in a real handler later means replacing `onSubmit` — the fields and
 * validation stay as they are.
 */
export function ContactForm() {
  const [topic, setTopic] = useState<string>(TOPICS[0]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    window.location.href = buildMailto({
      to: site.email,
      topic,
      name,
      email: from,
      message,
    });
  }

  const field = {
    background: "var(--bg)",
    border: "1px solid var(--line)",
    color: "var(--text)",
  } as const;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <fieldset>
        <legend
          className="mb-3 font-mono text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "var(--muted)" }}
        >
          What&rsquo;s it about?
        </legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((option) => {
            const active = option === topic;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setTopic(option)}
                aria-pressed={active}
                className="btn inline-flex px-4 py-2 text-sm"
                style={
                  active
                    ? { background: "var(--accent)", color: "var(--accent-ink)" }
                    : { border: "1px solid var(--line)", color: "var(--text)" }
                }
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Your name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={field}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Your email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={field}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Message</span>
        <textarea
          name="message"
          rows={6}
          required
          className="w-full resize-y rounded-xl px-4 py-3 text-sm outline-none"
          style={field}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
        >
          Compose the email <ArrowUpRight size={15} />
        </button>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Opens in your mail app, addressed to {site.email}.
        </p>
      </div>
    </form>
  );
}

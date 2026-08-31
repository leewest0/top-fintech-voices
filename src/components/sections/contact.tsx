import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { contactDetails, site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
      <Reveal className="panel grid items-center gap-10 rounded-3xl p-8 md:grid-cols-[1.2fr_1fr] md:p-14">
        <div>
          <h2 className="font-display text-2xl leading-tight font-bold tracking-[-0.03em] md:text-4xl">
            Got a story, a sponsorship, or a voice we&rsquo;ve missed?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            For pitches, partnerships and press, write to the editorial desk in Accra and
            we&rsquo;ll come back to you.
          </p>
          <a href={`mailto:${site.email}`} className="btn btn-solid mt-8 inline-flex items-center gap-2 px-6 py-3.5 text-sm">
            Start a conversation <ArrowUpRight size={15} />
          </a>
        </div>

        <dl className="space-y-5 font-mono text-sm">
          {contactDetails.map((detail) => (
            <div key={detail.label}>
              <dt
                className="mb-1 text-[11px] tracking-widest uppercase"
                style={{ color: "var(--accent)" }}
              >
                {detail.label}
              </dt>
              <dd style={{ color: "var(--text)" }}>
                {detail.items.map((item) => (
                  <span key={item.value} className="block">
                    {item.href ? (
                      <a href={item.href} className="hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

import type { Metadata } from "next";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { contactDetails, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Pitches, partnerships and press for ${site.name} — reach the editorial desk in Accra.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: "Pitches, partnerships and press.",
    url: `${site.url}/contact`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${site.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: site.name,
    email: site.email,
    telephone: site.phones.map((p) => p.display),
    address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
    sameAs: site.socials.map((s) => s.href),
  },
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Get in touch"
      title="Got a story, a sponsorship, or a voice we've missed?"
      intro={
        <p>
          Pitches, partnerships and press all reach the editorial desk in Accra. Tell us what
          you&rsquo;re working on and we&rsquo;ll come back to you.
        </p>
      }
      aside={
        <dl className="panel space-y-6 rounded-2xl p-8 font-mono text-sm">
          {contactDetails.map((detail) => (
            <div key={detail.label}>
              <dt
                className="mb-1.5 text-[11px] tracking-widest uppercase"
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

          <div>
            <dt
              className="mb-1.5 text-[11px] tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Follow
            </dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-1">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="navlink"
                >
                  {social.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      }
    >
      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
        <Reveal className="panel mx-auto max-w-3xl rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
            Send us a note.
          </h2>
          <p className="mt-3 mb-8 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Prefer to write directly?{" "}
            <a href={`mailto:${site.email}`} className="navlink">
              {site.email}
            </a>
          </p>
          <ContactForm />
        </Reveal>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PageShell>
  );
}

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1240px] px-5 py-12 md:px-10">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div>
          <Link href="/" aria-label={`${site.name} — home`}>
            <Logo className="h-8 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Welcome to Top Fintech Voices Magazine — celebrating fintech excellence, and
            spotlighting the industry trailblazers shaping the future of finance.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="navlink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
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
        </div>
      </div>

      <div
        className="mt-10 flex flex-wrap items-center justify-between gap-3 pt-6 font-mono text-[11px]"
        style={{ color: "var(--muted)", borderTop: "1px solid var(--line)" }}
      >
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p>{site.tagline}</p>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Download, Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useTheme } from "@/components/theme-provider";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't leave a menu hanging open behind a desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg) 88%, transparent)" : "var(--bg)",
        backdropFilter: scrolled ? "blur(10px)" : undefined,
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
        transition: "background-color .4s var(--ease-loom), border-color .4s var(--ease-loom)",
      }}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-5 px-5 py-4 md:px-10">
        <Link href="/" aria-label={`${site.name} — home`}>
          <Logo className="h-8 w-auto md:h-10" priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="navlink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="btn inline-flex rounded-full p-2.5"
            style={{ border: "1px solid var(--line)", color: "var(--text)" }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href={site.downloadUrl}
            className="btn btn-ghost hidden items-center gap-2 px-5 py-2.5 text-sm lg:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            <Download size={14} /> Download
          </a>

          <a
            href={site.orderUrl}
            className="btn btn-solid hidden items-center gap-2 px-5 py-2.5 text-sm sm:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            Order the magazine <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            className="rounded-full p-2.5 lg:hidden"
            style={{ border: "1px solid var(--line)", color: "var(--text)" }}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="flex flex-col px-5 pb-5 lg:hidden"
          style={{ borderTop: "1px solid var(--line)", background: "var(--bg)" }}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-base font-medium"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.orderUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn btn-solid mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm"
          >
            Order the magazine <ArrowUpRight size={14} />
          </a>
          <a
            href={site.downloadUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn btn-ghost mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm"
          >
            <Download size={14} /> Download the magazine
          </a>
        </div>
      )}
    </header>
  );
}

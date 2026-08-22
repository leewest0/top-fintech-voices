# Top Fintech Voices — landing page

A revamped landing page for [topfintechvoices.com](https://topfintechvoices.com), the
magazine celebrating fintech excellence across Ghana and Africa. Built with Next.js
(App Router) and Tailwind CSS.

The design concept is **"The Loom"**: a kente-inspired weave motif carried through the
hero panel, the section dividers and the mission/vision cards — one strip per voice.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

## What's real

Every name, role, bio, logo and photograph on the page comes from the live site — the
Spotlight page, the News Hub and the About page. Bios are the publication's own copy,
trimmed to one sentence for the index. Nothing is attributed to these people that they
did not actually say, and no placeholder copy is left anywhere.

Contact details, mission and vision statements are likewise taken verbatim from the
existing site.

## Brand

The palette is sampled directly from the official wordmark:

| Token  | Value     | Use                                |
| ------ | --------- | ---------------------------------- |
| Coral  | `#EE5D47` | Accent, calls to action, the weave |
| Navy   | `#0F456A` | Light-mode text, the dark ground   |

Both themes clear WCAG AA (4.5:1) for all text. Dark is the default; the toggle
persists to `localStorage` and is applied before first paint, so there's no flash.

### Logo handling

The official wordmark (`public/brand/logo-wordmark.png`) is white glyphs on
transparency, so it disappears on light backgrounds. Rather than dropping it onto a
black plaque, `scripts/make-brand-assets.py` derives a navy version for light mode, plus
the favicon and app icon, from the wordmark's arrow-in-capsule glyph:

```bash
python3 scripts/make-brand-assets.py   # needs Pillow
```

`scripts/trim-logos.py` does the same job for the sponsor and partner logos, which
arrive from WordPress padded out with dead space on a light grey backdrop. It lifts each
logo off its backdrop and crops to the ink so they sit properly in their tiles.

Both scripts are one-shot asset generators — their output is committed, so you only need
to re-run them if the source artwork changes.

## Structure

```
src/
  app/
    layout.tsx        fonts, metadata, theme bootstrap
    page.tsx          composes the sections, emits JSON-LD
    globals.css       design tokens, animations, component classes
  components/
    site-header.tsx   sticky nav, theme toggle, mobile menu
    site-footer.tsx
    theme-provider.tsx
    sections/         hero, ticker, spotlight, about, magazine, stories, backers, contact
    ui/               logo, weave motif, reveal-on-scroll
  lib/
    site.ts           site-wide config: contact details, nav, social links
    content.ts        the voices, stories, team, sponsors and partners
public/
  brand/ voices/ team/ stories/ magazine/ sponsors/ partners/
```

To change what's on the page, edit `src/lib/content.ts` — the sections render from it.

## Notes on behaviour

- **No JavaScript?** The page still renders in full. The reveal-on-scroll animation is
  scoped to `html.js`, which the bootstrap script sets, so a failed bundle degrades to
  static content rather than a blank page.
- **Touch devices** get the voice bios expanded by default, since there's no hover to
  reveal them with.
- **Reduced motion** is respected: the weave, marquees and reveals all stop.
- All imagery is self-hosted under `public/`, so the page has no runtime dependency on
  the old WordPress installation.

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

Both themes clear WCAG AA (4.5:1) for all text. Light is the default; the toggle
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

## The current edition

`src/lib/magazine.ts` holds the edition facts — volume, date, page count, cover,
cover story, contents and masthead. Everything in it was read off the edition
itself (its cover, contents pages and masthead), not from the WordPress site, which
still describes the maiden edition.

Vol. 2 — Second Edition, November 2025, 78 pages, Adoma Owusu on the cover.

When a new edition ships: update `currentEdition`, `features` and `masthead`, move the
outgoing one into `firstEdition`, and drop the new cover into `public/magazine/`. The
hero, the magazine section, the stats, `/magazine` and `/stories` all read from there.

## Reading the edition

`/read` turns the edition page by page in the browser.

The source PDF is ~84MB, so it is never sent to a visitor. `scripts/render-magazine.py`
rasterises it once into web-sized WebP pages, which are committed:

```bash
python3 scripts/render-magazine.py path/to/edition.pdf --slug vol2   # needs pymupdf
```

That writes `public/magazine/vol2/page-NN.webp` (1400px, for reading) and
`thumb/page-NN.webp` (200px, for the page index), then prints the page aspect
ratio to put in `currentEdition.reader`. Volume 2 is 78 pages, 13.7MB in total.

The reader loads only the pages on screen — about 0.14MB to open, ~90KB a turn —
and pages are laid out like the printed magazine: the cover alone on the right,
then even-left/odd-right spreads. Below 900px it reads one page at a time, since a
spread at phone width puts body text below anything legible. Arrow keys, Home/End,
swipe, click the outer quarter of a page, a thumbnail index, fullscreen, and
`/read#page-30` deep links all work.

The contents list under the reader talks to it through a `tfv:read-page` window
event rather than a hash link. The two sit in different sections of a
server-rendered page, and next/link navigates with `history.pushState`, which
changes the URL *without* firing `hashchange` — so a hash link moved the address
bar and nothing else.

## The three magazine actions

They are different things and go to different places:

- **Order the magazine** → `/order`, the form in this app. It posts to
  `/api/order`, which emails the desk through Resend.
- **Read it online** → the page-turning reader. Linked absolutely from
  `DEPLOYED_URL` at the top of `src/lib/site.ts` — change that one line when the
  custom domain replaces the Vercel one.
- **Download the PDF** → the file on the client's Google Drive.

Both live in `src/lib/site.ts` (`orderUrl`, `downloadUrl`) and appear in the header,
the mobile menu, the magazine section and the page CTAs.

### Orders

`/order` collects the same fields the old WordPress form did — name, company,
copies, country, email, phone, message.

Configure it with the variables in `.env.example`:

```
RESEND_API_KEY=       # https://resend.com/api-keys
ORDER_FROM_EMAIL=     # an address on a domain verified in Resend
ORDER_TO_EMAIL=       # where orders land; defaults to site.email
```

Without those set, `/api/order` answers **503** and the form tells the visitor to
email instead. It never accepts an order it cannot deliver — a form that silently
swallows a sale is worse than one that admits it is off.

`src/lib/order.ts` holds the validation and the message rendering, so the rules are
stated once and tested without a browser or a Resend key (`npm test`). The route
re-validates everything server-side regardless of what the form did, escapes user
text before it goes into the HTML email, and sets `reply-to` to the customer so a
reply reaches them directly. A honeypot field answers bots with a cheerful 200 and
sends nothing.

## Pages

Every menu item is its own page.

| Route | What it is |
| --- | --- |
| `/` | The landing page |
| `/spotlight` | All 28 profiles, filterable by name, role or company |
| `/spotlight/[slug]` | One profile — 28 statically generated pages |
| `/magazine` | The current edition: cover, contents, the first edition, backers |
| `/stories` | The features running in the current edition |
| `/about` | Mission, vision, the story so far |
| `/team` | The masthead, with the full credits |
| `/contact` | Details and a message form |
| `/order` | Order print copies; emails via Resend |
| `/read` | The edition, page by page |
| 404 | Any unknown path |

Inner pages share `PageShell`, which supplies the header, the intro band, the loom
rail and the footer, so they read as one site.

### There is no separate articles section

The live site's News Hub and Spotlight are the same content: all 28 posts sit in
both categories, and there is no third category with anything in it. So the profile
pages *are* the articles, and the landing page's "From the News Hub" cards link to
three of them rather than back out to WordPress. Nothing on the site links to
`/category/news-hub/` any more.

## Structure

```
src/
  app/
    layout.tsx        fonts, metadata, theme bootstrap
    page.tsx          landing page — composes the sections, emits JSON-LD
    spotlight/        the full roster
    globals.css       design tokens, animations, component classes
  components/
    site-header.tsx   sticky nav, theme toggle, mobile menu
    site-footer.tsx
    theme-provider.tsx
    sections/         hero, ticker, spotlight, about, magazine, stories, backers, contact
    ui/               logo, weave motif, reveal-on-scroll
  lib/
    site.ts           site-wide config: contact details, nav, social links
    voices.ts         GENERATED — all 28 Spotlight profiles
    content.ts        stories, team, sponsors, partners, featured voices
public/
  brand/ voices/ team/ stories/ magazine/ sponsors/ partners/
```

To change what's on the landing page, edit `src/lib/content.ts` — the sections render
from it, and `FEATURED_SLUGS` picks which voices it carries.

`src/lib/voices.ts` is generated, so don't hand-edit it:

```bash
python3 scripts/fetch-voices.py   # needs no dependencies beyond the stdlib
```

It reads the Spotlight page for each portrait, name, role line and LinkedIn URL, and
the WordPress REST API (`/wp-json/wp/v2/posts`) for the full profile copy, matches the
two by name, downloads the portraits into `public/voices/` and writes the TypeScript.
Re-run it when the client publishes new profiles. A short `OVERRIDES` table at the top
of the script carries the handful of corrections to the live card text — a typo, an
abbreviated name, two spellings of one company.

## Notes on behaviour

- **No JavaScript?** The page still renders in full. The reveal-on-scroll animation is
  scoped to `html.js`, which the bootstrap script sets, so a failed bundle degrades to
  static content rather than a blank page.
- **Touch devices** get the voice bios expanded by default, since there's no hover to
  reveal them with.
- **Reduced motion** is respected: the weave, marquees and reveals all stop.
- **The contact form has no backend.** It composes the message and hands it to the
  visitor's mail client, and the page says so rather than faking a submission that
  goes nowhere. `src/lib/mailto.ts` builds the URL and is unit-testable on its own —
  a browser will not let a test observe a `mailto:` navigation. To wire a real
  handler later, replace `onSubmit` in `contact-form.tsx`; the fields and validation
  stay as they are.
- All imagery is self-hosted under `public/`, so the page has no runtime dependency on
  the old WordPress installation.

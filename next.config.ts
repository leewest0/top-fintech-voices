import type { NextConfig } from "next";
import { voices } from "./src/lib/voices";

/**
 * The old WordPress URLs.
 *
 * Every profile lived at the site root — /archie-hesse-ceo-ghipss/ — while this
 * app serves them under /platform/<slug>. So the moment the domain stops
 * pointing at WordPress, every one of those addresses lands on this app and
 * 404s: search results, the links in the client's own posts, anything anyone
 * bookmarked. These redirects catch them.
 *
 * The 28 profile mappings are derived from `voices.ts` rather than typed out,
 * because that file already records both halves — `article` is the URL the copy
 * came from, `slug` is where it lives now — and a hand-kept second copy would
 * drift the next time the roster is regenerated.
 */
const legacyPaths: Record<string, string> = {
  // The roster, under each of the names WordPress gave it.
  "/spotlight-page": "/platform",
  "/category/spotlight-page": "/platform",
  // The News Hub was the same 28 posts in a second category, so it lands there too.
  "/news-hub": "/platform",
  "/category/news-hub": "/platform",
  "/about-us": "/about",
  "/about-us-2": "/about",
  "/order-magazine": "/order",
};

/**
 * Routes this app used to serve itself.
 *
 * /stories listed the same features /magazine already lists in full, down to
 * the same standfirsts, so it went. /read/vol2 would be the current edition on
 * a second URL — it lives at the bare /read, and one magazine wants one address.
 * /sponsor is now /partners — the page outgrew "sponsor" once it started
 * talking about the organisations backing the magazine, not just ad space.
 * /spotlight is now /platform — the same shift, on the roster page: it had
 * already been talking about "the Platform" for a few edits before the URL
 * caught up. Every one of the 28 profile URLs moves with it, not just the
 * directory — those were live under /spotlight/<slug> for real, so each one
 * gets its own redirect below rather than relying on the directory's alone.
 */
const supersededPaths: Record<string, string> = {
  "/stories": "/magazine",
  "/read/vol2": "/read",
  "/sponsor": "/partners",
  "/spotlight": "/platform",
};

/**
 * Deliberately not redirected: /works, /services, /sample-page, /skt-karate,
 * /project/*, /service/*, /service-category/* and /matias-blocks/*. Those are
 * demo pages that shipped with the purchased WordPress theme and never held any
 * of this publication's content. A 404 is the honest answer for a page that
 * genuinely never existed — sweeping them to the homepage instead would just
 * make them soft 404s.
 */

const nextConfig: NextConfig = {
  async redirects() {
    const profiles = voices.map((voice) => ({
      source: new URL(voice.article).pathname.replace(/\/+$/, ""),
      destination: `/platform/${voice.slug}`,
      permanent: true,
    }));

    // This app's own former URLs for each profile — live under /spotlight/
    // for real, not just a WordPress-era address, so they need the same
    // redirect the legacy ones get.
    const ownProfiles = voices.map((voice) => ({
      source: `/spotlight/${voice.slug}`,
      destination: `/platform/${voice.slug}`,
      permanent: true,
    }));

    const sections = Object.entries({ ...legacyPaths, ...supersededPaths }).map(
      ([source, destination]) => ({ source, destination, permanent: true }),
    );

    return [...profiles, ...ownProfiles, ...sections];
  },
};

export default nextConfig;

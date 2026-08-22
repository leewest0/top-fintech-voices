import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";

/**
 * "Where this site lives" is one fact. It used to be two — a hard-coded
 * canonical host and a separate hard-coded deployment host — which is how the
 * canonicals came to point at a WordPress install that 404s on every route this
 * app serves. These assertions keep it single.
 */

const load = async (env) => {
  const before = { ...process.env };
  Object.assign(process.env, env);
  // A fresh query string forces a re-evaluation; the URL is read at module load.
  const mod = await import(`../src/lib/site.ts?${Math.random()}`);
  process.env = before;
  return mod;
};

// 1. An explicit variable wins, and a trailing slash never doubles up.
{
  const { site } = await load({ NEXT_PUBLIC_SITE_URL: "https://topfintechvoices.com/" });
  assert.equal(site.url, "https://topfintechvoices.com");
}

// 2. On Vercel production, the project's production domain — which becomes the
//    custom domain on its own once one is attached.
{
  const { site } = await load({
    NEXT_PUBLIC_SITE_URL: "",
    NEXT_PUBLIC_VERCEL_ENV: "production",
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: "topfintechvoices.com",
    NEXT_PUBLIC_VERCEL_URL: "tfv-abc123.vercel.app",
  });
  assert.equal(site.url, "https://topfintechvoices.com");
}

// 3. A preview build names itself, so it cannot claim production's canonical.
{
  const { site } = await load({
    NEXT_PUBLIC_SITE_URL: "",
    NEXT_PUBLIC_VERCEL_ENV: "preview",
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: "topfintechvoices.com",
    NEXT_PUBLIC_VERCEL_URL: "tfv-abc123.vercel.app",
  });
  assert.equal(site.url, "https://tfv-abc123.vercel.app");
}

// 4. With nothing set, localhost — the only case left is `next dev`, since
//    Vercel always supplies its own values.
{
  const { site } = await load({
    NEXT_PUBLIC_SITE_URL: "",
    NEXT_PUBLIC_VERCEL_ENV: "",
    NEXT_PUBLIC_VERCEL_URL: "",
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: "",
  });
  assert.equal(site.url, "http://localhost:3000");
}

// 5. Whatever it resolves to, it is a usable base — layout.tsx does
//    `new URL(site.url)` for metadataBase and a bad value fails every build.
{
  const { site } = await load({ NEXT_PUBLIC_SITE_URL: "" });
  assert.doesNotThrow(() => new URL(site.url));
  assert.doesNotMatch(site.url, /\/$/, "no trailing slash — everything appends a path to it");
}

// 6. The reader is a route in this app, so it is linked as one. An absolute URL
//    here would name a host, and naming a host is the thing being removed.
{
  const { site } = await load({ NEXT_PUBLIC_SITE_URL: "https://topfintechvoices.com" });
  assert.equal(site.readUrl, "/read");
  assert.ok(site.orderUrl.startsWith("/"), "the order form is in-app too");
}

// 7. Nothing anywhere hard-codes a host of this site's own — site.ts included.
//    The point of resolving it is lost the moment a copy is written down.
{
  const walk = async (dir) => {
    const out = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) out.push(...(await walk(path)));
      else if (/\.tsx?$/.test(entry.name)) out.push(path);
    }
    return out;
  };

  const root = new URL("../src", import.meta.url).pathname;
  const offenders = [];
  for (const file of await walk(root)) {
    // voices.ts is generated, and its `article` links point at the original
    // WordPress posts on purpose — those are citations of another site, not
    // this one addressing itself.
    if (file.endsWith("/lib/voices.ts")) continue;
    const hits = readFileSync(file, "utf8").match(
      /https?:\/\/(?:[a-z0-9-]+\.)*(?:topfintechvoices\.com|top-fintech-voices\.vercel\.app)[^"'`\s)]*/gi,
    );
    if (hits) offenders.push(`${file.slice(root.length + 1)}: ${[...new Set(hits)].join(", ")}`);
  }

  assert.deepEqual(
    offenders,
    [],
    `these hard-code the site's own host instead of using site.url:\n  ${offenders.join("\n  ")}`,
  );
}

console.log("site url: resolves from one source, and nothing hard-codes the host");

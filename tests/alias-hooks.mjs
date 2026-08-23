/**
 * Resolves the `@/` path alias for the test runner.
 *
 * Tests import the real modules rather than parsing them as text, so they
 * assert on the data the app actually renders. Node's type stripping honours
 * tsconfig for syntax but not for `paths`, so `@/lib/content` has to be mapped
 * back to `src/lib/content` here — the same mapping tsconfig.json declares.
 */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SRC = new URL("../src/", import.meta.url);

/**
 * TypeScript imports are extensionless; node needs the extension. Try the ones
 * this project actually uses, in the order tsc would.
 */
function withExtension(url) {
  if (existsSync(fileURLToPath(url))) return url;
  for (const suffix of [".ts", ".tsx", "/index.ts", "/index.tsx"]) {
    const candidate = new URL(url.href + suffix);
    if (existsSync(fileURLToPath(candidate))) return candidate;
  }
  return url; // Let node report it, with its own message.
}

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const target = withExtension(new URL(specifier.slice(2), SRC));
    return nextResolve(target.href, context);
  }
  return nextResolve(specifier, context);
}

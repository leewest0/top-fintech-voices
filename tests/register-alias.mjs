/** Installs the `@/` resolver. Used via `node --import ./tests/register-alias.mjs`. */
import { register } from "node:module";

register("./alias-hooks.mjs", import.meta.url);

"""
Rebuilds the Spotlight dataset from the live site.

Reads two sources and merges them by name:
  * the Spotlight page  — portrait, display name, role line, LinkedIn URL
  * the WordPress REST API (/wp-json/wp/v2/posts) — the full profile copy

Writes `src/lib/voices.ts` and downloads each portrait to `public/voices/<slug>`.
Everything it produces is committed, so this only needs re-running when the
client publishes new profiles.

Run with: python3 scripts/fetch-voices.py
"""

import html
import json
import os
import re
import unicodedata
import urllib.request

SITE = "https://topfintechvoices.com"
SPOTLIGHT = f"{SITE}/spotlight/"
POSTS = f"{SITE}/wp-json/wp/v2/posts?per_page=100&_fields=slug,link,title,content"

OUT_TS = "src/lib/voices.ts"
OUT_IMAGES = "public/voices"

# Corrections to the live site's card text. Keep this list short and only for
# plain errors or abbreviations that read badly out of context — the copy is
# the client's, not ours to rewrite.
OVERRIDES = {
    "kwame-oppong": {
        "name": "Kwame Oppong",
        "role": "Director, Fintech and Innovation Office",  # site card reads "Innvation"
        "org": "Bank of Ghana",
    },
    "nancy-a-imadi": {
        "slug": "nancy-imadi",
        "name": "Nancy Arhinfuwaa Imadi",  # the card abbreviates; the article does not
        "role": "Head of Licensing and Product Approvals",
        "org": "Fintech and Innovation Office, Bank of Ghana",
    },
    "charles-kollo": {"role": "Seasoned Franco-American executive", "org": ""},
    # The company styles itself eTranzact; the cards shout it two different ways.
    "john-apea": {"org": "eTranzact Ghana"},
    "george-babafemi": {"org": "eTranzact Ghana"},
    "ebenezer-ghanney": {"role": "Chief Executive Officer", "org": "Wewire Africa"},
    "darryl-k-m-abraham": {"slug": "darryl-abraham", "name": "Darryl K. Mawutor Abraham"},
    "thomas-akwasi-baafi": {"slug": "thomas-baafi"},
    "martin-kwame-awagah": {"slug": "martin-awagah"},
}

# Roles are stored title-cased on the site ("CEO – GhIPSS"); expand the ones
# that are just abbreviations so the index reads as prose.
ROLE_EXPANSIONS = {
    "CEO": "Chief Executive Officer",
    "Founder/CEO": "Founder & Chief Executive Officer",
    "MD": "Managing Director",
}


def get(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "top-fintech-voices-build"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace")


def slugify(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower())).strip("-")


def words(s: str) -> set[str]:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return set(re.sub(r"[^a-z ]", " ", s.lower()).split())


def strip_tags(s: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s))).strip()


def scrape_cards(page: str) -> list[dict]:
    """Pull portrait / name / role / LinkedIn out of the Spotlight grid."""
    m_img, m_li = "@@IMG@@", "@@LI@@"
    page = re.sub(r"<script.*?</script>", "", page, flags=re.S)
    flat = re.sub(r'<img[^>]*?src="([^"]+)"[^>]*>', "\n" + m_img + r"\1" + "\n", page)
    flat = re.sub(
        r'<a[^>]*?href="(https://[^"]*linkedin[^"]*)"[^>]*>', "\n" + m_li + r"\1" + "\n", flat
    )
    flat = re.sub(r"<[^>]+>", "\n", flat)

    cards: list[dict] = []
    cur: dict | None = None

    def flush():
        # A real card has all four fields; the lightbox markup has none.
        if cur and cur.get("name") and cur.get("role") and cur.get("linkedin"):
            cards.append(cur)

    for raw in flat.split("\n"):
        line = html.unescape(raw).strip()
        if not line:
            continue
        if line.startswith(m_img):
            url = line[len(m_img) :]
            if "/uploads/" not in url or "logo" in url.lower():
                continue
            flush()
            # Drop WordPress's resize suffix to get the full-size original.
            cur = {"image": re.sub(r"-\d+x\d+(\.\w+)$", r"\1", url)}
        elif line.startswith(m_li):
            if cur is not None and "linkedin" not in cur:
                cur["linkedin"] = line[len(m_li) :].split("?")[0]
        elif cur is not None and "name" not in cur:
            cur["name"] = line
        elif cur is not None and "role" not in cur:
            cur["role"] = line

    flush()
    return cards


def paragraphs(rendered: str) -> list[str]:
    rendered = re.sub(r"<(script|style).*?</\1>", "", rendered, flags=re.S)
    out = []
    for block in re.split(r"</p>|<br\s*/?>", rendered):
        text = strip_tags(block).replace("\xa0", " ").strip()
        # Some paragraphs run sentences together ("…diplomacy.Presently, Mr…").
        # Restricting to lowercase-before / uppercase-after leaves initials and
        # abbreviations ("K.M.", "e.g.") alone.
        text = re.sub(r"(?<=[a-z])([.!?])(?=[A-Z])", r"\1 ", text)
        if len(text) > 40:
            out.append(text)
    return out


# Full stops that do not end a sentence. Without these, "Mr. John Apea is a
# well-respected professional…" summarises down to "Mr. Presently, Mr."
ABBREVIATIONS = {
    "mr", "mrs", "ms", "dr", "prof", "st", "ltd", "inc", "co", "plc",
    "jr", "sr", "no", "vs", "etc", "e.g", "i.e",
}


def sentences(text: str) -> list[str]:
    out, buf = [], ""
    for chunk in re.findall(r"[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$", text):
        buf += chunk
        tail = buf.rstrip()
        if not tail.endswith("."):
            out.append(buf)
            buf = ""
            continue
        last = re.split(r"[\s(]", tail[:-1])[-1].lower()
        # A single capital is an initial ("Darryl K. M. Abraham"), not an end.
        if last in ABBREVIATIONS or len(last) == 1:
            continue
        out.append(buf)
        buf = ""
    if buf.strip():
        out.append(buf)
    return out


def summarise(body: list[str], limit: int = 190) -> str:
    """First sentence or two of the site's own copy, cut on a sentence boundary."""
    if not body:
        return ""
    text = body[0]
    picked = ""
    for sentence in sentences(text) or [text]:
        if picked and len(picked) + len(sentence) > limit:
            break
        picked += sentence
        if len(picked) > limit * 0.55:
            break
    return picked.strip() or text[:limit].rsplit(" ", 1)[0] + "…"


# The site title-cases every word ("Director For Growth", "Payments And
# Systems"). Lowercase the joining words so roles read as prose.
MINOR_WORDS = {"and", "for", "of", "the", "at", "in", "on", "to", "a", "an", "or", "with"}


def tidy_case(s: str) -> str:
    def fix(i: int, word: str) -> str:
        bare = word.strip("(),.")
        if not bare:
            return word
        # Keep short all-caps as acronyms (BoG, PRUC, CEO, FX); title-case the
        # long ones, which are shouted words rather than initialisms.
        if bare.isupper():
            return word if len(bare) <= 5 else word.replace(bare, bare.title())
        if i and bare.lower() in MINOR_WORDS:
            return word.replace(bare, bare.lower())
        return word

    return " ".join(fix(i, w) for i, w in enumerate(s.split()))


def split_role(role: str) -> tuple[str, str]:
    parts = re.split(r"\s*[–—]\s*|\s+-\s*|\s*,\s*", role, maxsplit=1)
    head = parts[0].strip()
    head = ROLE_EXPANSIONS.get(head, head)
    return tidy_case(head), tidy_case(parts[1].strip()) if len(parts) > 1 else ""


def download(url: str, slug: str) -> str:
    ext = os.path.splitext(url.split("?")[0])[1].lower() or ".jpg"
    if ext == ".jpeg":
        ext = ".jpg"
    path = f"{OUT_IMAGES}/{slug}{ext}"
    req = urllib.request.Request(url, headers={"User-Agent": "top-fintech-voices-build"})
    with urllib.request.urlopen(req, timeout=120) as r, open(path, "wb") as f:
        f.write(r.read())
    return f"/voices/{slug}{ext}"


def ts_string(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def main() -> None:
    os.makedirs(OUT_IMAGES, exist_ok=True)
    cards = scrape_cards(get(SPOTLIGHT))
    posts = json.loads(get(POSTS))
    print(f"{len(cards)} spotlight cards, {len(posts)} posts")

    voices, unmatched, keep = [], [], set()
    for card in cards:
        keys = words(card["name"])
        best, score = None, 0
        for post in posts:
            hits = len(keys & words(strip_tags(post["title"]["rendered"])))
            if hits > score:
                best, score = post, hits
        if not best or score < 2:
            unmatched.append(card["name"])
            continue

        slug = slugify(card["name"])
        role, org = split_role(card["role"])
        override = OVERRIDES.get(slug, {})
        slug = override.get("slug", slug)

        body = paragraphs(best["content"]["rendered"])
        image = download(card["image"], slug)
        keep.add(os.path.basename(image))

        voices.append(
            {
                "slug": slug,
                "name": override.get("name", card["name"]),
                "role": override.get("role", role),
                "org": override.get("org", org),
                "image": image,
                "linkedin": card["linkedin"],
                "article": best["link"],
                "summary": summarise(body),
                "bio": body,
            }
        )

    if unmatched:
        print(f"  WARNING unmatched: {unmatched}")

    for stale in sorted(set(os.listdir(OUT_IMAGES)) - keep):
        os.remove(f"{OUT_IMAGES}/{stale}")
        print(f"  removed stale portrait {stale}")

    lines = [
        "// GENERATED by scripts/fetch-voices.py — do not edit by hand.",
        "//",
        "// Every field is the publication's own copy, taken from the Spotlight page",
        "// and the matching News Hub article on topfintechvoices.com. These are real",
        "// people: nothing here is invented or paraphrased into a claim they did not",
        "// make. Re-run the script to pick up newly published profiles.",
        "",
        "export type Voice = {",
        "  slug: string;",
        "  name: string;",
        "  role: string;",
        "  /** Empty for the few profiles the site lists without an organisation. */",
        "  org: string;",
        "  image: string;",
        "  linkedin: string;",
        "  article: string;",
        "  /** One or two sentences for the index card. */",
        "  summary: string;",
        "  /** The full profile, paragraph by paragraph. */",
        "  bio: string[];",
        "};",
        "",
        "export const voices: Voice[] = [",
    ]
    for v in voices:
        lines.append("  {")
        for key in ("slug", "name", "role", "org", "image", "linkedin", "article", "summary"):
            lines.append(f"    {key}: {ts_string(v[key])},")
        lines.append("    bio: [")
        for para in v["bio"]:
            lines.append(f"      {ts_string(para)},")
        lines.append("    ],")
        lines.append("  },")
    lines += [
        "];",
        "",
        "export const voicesBySlug = new Map(voices.map((v) => [v.slug, v]));",
        "",
    ]

    with open(OUT_TS, "w") as f:
        f.write("\n".join(lines))
    print(f"wrote {OUT_TS} with {len(voices)} voices")


if __name__ == "__main__":
    main()

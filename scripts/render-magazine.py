"""
Rasterises an edition PDF into the page images the on-site reader flips through.

The source PDF is ~84MB — far too heavy to hand a browser — so each page is
rendered once, here, into a web-sized WebP. The reader then loads only the two
or three pages actually on screen.

    python3 scripts/render-magazine.py path/to/edition.pdf [--slug vol2]

Writes:
    public/magazine/<slug>/page-01.webp        the reading image (1400px wide)
    public/magazine/<slug>/thumb/page-01.webp  for the page strip (200px wide)

The output is committed; the PDF is not. Re-run it when a new edition ships,
then update `currentEdition.reader.pages` in src/lib/magazine.ts.
"""

import argparse
import os
import shutil
import sys

try:
    import pymupdf
except ImportError:
    sys.exit("pymupdf is needed to rasterise the PDF:  pip install pymupdf")

PAGE_WIDTH = 1400
PAGE_QUALITY = 78
THUMB_WIDTH = 200
THUMB_QUALITY = 70


def render(pdf_path: str, slug: str) -> None:
    out = os.path.join("public", "magazine", slug)
    thumbs = os.path.join(out, "thumb")
    # Start clean so a shorter edition cannot leave stale pages behind.
    shutil.rmtree(out, ignore_errors=True)
    os.makedirs(thumbs, exist_ok=True)

    doc = pymupdf.open(pdf_path)
    total = 0

    for index, page in enumerate(doc, start=1):
        name = f"page-{index:02d}.webp"

        for width, quality, folder in (
            (PAGE_WIDTH, PAGE_QUALITY, out),
            (THUMB_WIDTH, THUMB_QUALITY, thumbs),
        ):
            zoom = width / page.rect.width
            pixmap = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom))
            path = os.path.join(folder, name)
            pixmap.pil_save(path, quality=quality, method=6)
            total += os.path.getsize(path)

        if index % 10 == 0 or index == doc.page_count:
            print(f"  {index}/{doc.page_count} pages")

    aspect = doc[0].rect.height / doc[0].rect.width
    print(
        f"\n{doc.page_count} pages -> {out}"
        f"\n  {total / 1024 / 1024:.1f} MB total"
        f"\n  aspect ratio {aspect:.4f}  (set reader.aspect in src/lib/magazine.ts)"
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", help="path to the edition PDF")
    parser.add_argument("--slug", default="vol2", help="folder under public/magazine")
    args = parser.parse_args()
    render(args.pdf, args.slug)

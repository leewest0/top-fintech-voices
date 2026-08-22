"""
Derives the brand assets the landing page needs from the official Top Fintech
Voices wordmark (public/brand/logo-wordmark.png, white glyphs + coral accents).

  logo-wordmark-dark.png  white glyphs recoloured to brand navy, for light mode
  icon.png / icon-512.png the arrow-capsule glyph as a square app icon
  favicon.ico             multi-size icon derived from the same glyph

Run with: python3 scripts/make-brand-assets.py
"""
from PIL import Image

CORAL = (238, 93, 71)   # #EE5D47
NAVY = (15, 69, 106)    # #0F456A
WHITE = (255, 255, 255)

SRC = "public/brand/logo-wordmark.png"
OUT = "public/brand"


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def recolour(src, target):
    """Map the white glyphs to `target`, leaving coral accents untouched.

    Every opaque pixel in the wordmark sits on the white->coral line, so we
    project onto it and re-interpolate from `target` instead of white. That
    keeps antialiased edges clean rather than fringing them pink.
    """
    im = Image.open(src).convert("RGBA")
    axis = [c - w for c, w in zip(CORAL, WHITE)]
    denom = sum(a * a for a in axis)
    out = []
    for r, g, b, a in im.getdata():
        if a == 0:
            out.append((0, 0, 0, 0))
            continue
        t = sum((v - w) * ax for v, w, ax in zip((r, g, b), WHITE, axis)) / denom
        t = min(1.0, max(0.0, t))
        out.append(lerp(target, CORAL, t) + (a,))
    im.putdata(out)
    return im


def capsule_glyph(src):
    """Crop the arrow-in-capsule 'O' of TOP — the mark's standalone symbol.

    Coral appears in three bands of the wordmark (the waveform above, the
    capsule on the wordmark line, the tagline below), so we scan only the
    wordmark line and take its first coral run.
    """
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()
    band = range(round(h * 0.31), round(h * 0.74))

    def is_coral(x, y):
        r, g, b, a = px[x, y]
        return a > 128 and r > 180 and g < 140 and b < 130

    left = next(x for x in range(w) if any(is_coral(x, y) for y in band))
    right = left
    while right + 1 < w and any(is_coral(right + 1, y) for y in band):
        right += 1

    top, bottom = band.start, band.stop
    strip = im.crop((left, top, right + 1, bottom))
    box = strip.getbbox()
    glyph = strip.crop(box)
    # Centre it on a padded square so it survives being rendered small.
    side = round(max(glyph.size) * 1.34)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(glyph, ((side - glyph.width) // 2, (side - glyph.height) // 2))
    return canvas


if __name__ == "__main__":
    recolour(SRC, NAVY).save(f"{OUT}/logo-wordmark-dark.png")

    glyph = capsule_glyph(SRC)
    glyph.resize((512, 512), Image.LANCZOS).save(f"{OUT}/icon-512.png")
    glyph.resize((180, 180), Image.LANCZOS).save(f"{OUT}/apple-icon.png")
    glyph.resize((64, 64), Image.LANCZOS).save(
        "src/app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )
    print("brand assets written")

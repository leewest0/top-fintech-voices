"""
Sponsor and partner logos come off the WordPress site padded out with dead
space — the JPEGs sit on a light grey gradient rather than flat white — so in a
tile they render tiny, on a visible grey rectangle. This lifts each logo off
its backdrop, crops to the ink and re-pads evenly on a transparent canvas.

Run with: python3 scripts/trim-logos.py
"""

import glob
import os

from PIL import Image

TARGETS = ("public/sponsors/*", "public/partners/*")
PAD_RATIO = 0.05

# How far a pixel must sit from the backdrop colour to count as fully opaque
# ink. Anything closer fades out, which keeps antialiased edges smooth instead
# of stair-stepping them.
KNOCKOUT_DISTANCE = 34


def backdrop(rgb: Image.Image) -> tuple[int, int, int]:
    """Estimate the flat backdrop from the image's corners."""
    w, h = rgb.size
    corners = [rgb.getpixel(p) for p in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]
    return tuple(round(sum(c[i] for c in corners) / len(corners)) for i in range(3))


def knockout(im: Image.Image) -> Image.Image:
    """Return the image with its flat backdrop turned transparent."""
    if im.mode in ("RGBA", "LA") or "transparency" in im.info:
        return im.convert("RGBA")

    rgb = im.convert("RGB")
    bg = backdrop(rgb)
    alpha = Image.new("L", rgb.size)
    alpha.putdata(
        [
            min(255, round(max(abs(v - b) for v, b in zip(px, bg)) * 255 / KNOCKOUT_DISTANCE))
            for px in rgb.getdata()
        ]
    )
    out = rgb.convert("RGBA")
    out.putalpha(alpha)
    return out


def trim(path: str):
    im = Image.open(path)
    lifted = knockout(im)
    # A low bar here would catch the JPEG backdrops’ gradient, which drifts a
    # few levels away from the corner estimate; only real ink clears 140.
    box = lifted.getchannel("A").point(lambda a: 255 if a > 140 else 0).getbbox()
    if not box:
        return None

    cropped = lifted.crop(box)
    pad = round(max(cropped.size) * PAD_RATIO)
    canvas = Image.new(
        "RGBA", (cropped.width + pad * 2, cropped.height + pad * 2), (255, 255, 255, 0)
    )
    canvas.paste(cropped, (pad, pad))

    # Written back as PNG so the transparency survives.
    out = os.path.splitext(path)[0] + ".png"
    canvas.save(out)
    if out != path:
        os.remove(path)
    return im.size, canvas.size, out


if __name__ == "__main__":
    for pattern in TARGETS:
        for path in sorted(glob.glob(pattern)):
            result = trim(path)
            if result:
                before, after, out = result
                print(f"{os.path.basename(out):38} {before} -> {after}")

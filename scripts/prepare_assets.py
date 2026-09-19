from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "figures"
OUTPUT = ROOT / "public" / "assets"

CROPS = {
    "me-art.png": ("ME-1.png", (125, 510, 1120, 1330)),
    "hf-art.png": ("HF-1.png", (220, 500, 1030, 1330)),
    "ch-art.png": ("CH-1.png", (250, 500, 965, 1330)),
}


def remove_background(image: Image.Image, background: tuple[int, int, int]) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = []
    for red, green, blue, alpha in rgba.getdata():
        distance = ((red - background[0]) ** 2 + (green - background[1]) ** 2 + (blue - background[2]) ** 2) ** 0.5
        if distance < 12:
            pixels.append((red, green, blue, 0))
        elif distance < 42:
            pixels.append((red, green, blue, int(alpha * (distance - 12) / 30)))
        else:
            pixels.append((red, green, blue, alpha))
    rgba.putdata(pixels)
    return rgba


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SOURCE / "拓客logo.jpg", OUTPUT / "tecc-logo.jpg")
    shutil.copy2(SOURCE / "TECC招新问卷.jpg", OUTPUT / "recruitment-qr.jpg")

    for output_name, (source_name, box) in CROPS.items():
        with Image.open(SOURCE / source_name) as source:
            background = source.convert("RGB").getpixel((0, 0))
            cropped = source.crop(box)
            remove_background(cropped, background).save(OUTPUT / output_name, optimize=True)


if __name__ == "__main__":
    main()

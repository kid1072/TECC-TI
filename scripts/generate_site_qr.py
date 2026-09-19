from pathlib import Path
import sys

import qrcode
import qrcode.image.svg


SITE_URL = "https://kid1072.github.io/TECC-TI/"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "figures"
PNG_PATH = OUTPUT_DIR / "TECC-TI-网址二维码.png"
SVG_PATH = OUTPUT_DIR / "TECC-TI-网址二维码.svg"


def build_qr() -> qrcode.QRCode:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=40,
        border=4,
    )
    qr.add_data(SITE_URL)
    qr.make(fit=True)
    return qr


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    qr = build_qr()

    png = qr.make_image(fill_color="#1f2918", back_color="#ffffff")
    png.save(PNG_PATH)

    svg = qr.make_image(
        image_factory=qrcode.image.svg.SvgPathFillImage,
        fill_color="#1f2918",
        back_color="#ffffff",
    )
    svg.save(SVG_PATH)
    SVG_PATH.write_text(
        SVG_PATH.read_text(encoding="utf-8").replace('fill="#000000"', 'fill="#1f2918"'),
        encoding="utf-8",
    )

    print(f"PNG: {PNG_PATH}")
    print(f"SVG: {SVG_PATH}")
    print(f"URL: {SITE_URL}")


if __name__ == "__main__":
    sys.exit(main())

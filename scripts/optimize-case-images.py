"""Build responsive website copies; retain source photos unchanged. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "outputs/public/assets/cases"
DEST = SOURCE / "web"


def main():
    DEST.mkdir(exist_ok=True)
    # The trusted company originals include one 100-megapixel photograph.
    Image.MAX_IMAGE_PIXELS = 120_000_000
    for source in sorted(SOURCE.iterdir()):
        if source.suffix.lower() not in {".jpg", ".png"}:
            continue
        with Image.open(source) as original:
            photo = ImageOps.exif_transpose(original).convert("RGB")
            for width in (640, 1280, 1920):
                target = DEST / f"{source.stem}-{width}.webp"
                size = (min(width, photo.width), round(photo.height * min(width, photo.width) / photo.width))
                photo.resize(size, Image.Resampling.LANCZOS).save(target, "WEBP", quality=82, method=6)
        print(source.name, flush=True)


if __name__ == "__main__":
    main()

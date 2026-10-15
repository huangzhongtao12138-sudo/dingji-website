"""Create square list-card images matching the existing center cover crop."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1] / "outputs/public/assets/cases"
SOURCES = ["bixiangju-xingcheng-storefront-cover.png", "shidingxiang-06.jpg", "xiangyuan-05.jpg", "grid-coffee-01.jpg"]
HEROES = ["bixiangju-01.jpg", "shidingxiang-06.jpg", "xiangyuan-05.jpg", "grid-coffee-01.jpg"]

if __name__ == "__main__":
    dest = ROOT / "cards-v2"
    dest.mkdir(exist_ok=True)
    for name in SOURCES:
        with Image.open(ROOT / name) as original:
            photo = ImageOps.exif_transpose(original).convert("RGB")
            for width in (480, 960):
                card = ImageOps.fit(photo, (width, width), Image.Resampling.LANCZOS)
                stem = dest / f"{Path(name).stem}-{width}"
                card.save(stem.with_suffix(".webp"), quality=80, method=6)
                card.save(stem.with_suffix(".avif"), quality=55, speed=6)
        print(name)
    heroes = ROOT / "heroes-v2"
    heroes.mkdir(exist_ok=True)
    for name in HEROES:
        with Image.open(ROOT / name) as original:
            photo = ImageOps.exif_transpose(original).convert("RGB")
            for width in (640, 1280, 1920):
                size = (min(width, photo.width), round(photo.height * min(width, photo.width) / photo.width))
                photo.resize(size, Image.Resampling.LANCZOS).save(
                    heroes / f"{Path(name).stem}-{width}.avif", quality=60, speed=6)
        print(name, "hero")

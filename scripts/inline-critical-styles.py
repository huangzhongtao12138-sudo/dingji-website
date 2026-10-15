"""Refresh embedded shared CSS on the home/case browsing path, without network requests."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1] / "outputs"
PAGES = [ROOT / "index.html", ROOT / "dingji-cases.html", *sorted((ROOT / "cases").glob("*.html"))]


def render(text):
    for name in ("site-nav.css", "phone.css"):
        css = (ROOT / "site-assets" / name).read_text().strip()
        block = f'<!-- critical-style:{name} -->\n  <style>\n{css}\n  </style>\n  <!-- /critical-style:{name} -->'
        pattern = rf'<!-- critical-style:{re.escape(name)} -->.*?<!-- /critical-style:{re.escape(name)} -->'
        if re.search(pattern, text, re.S):
            text = re.sub(pattern, lambda _: block, text, flags=re.S)
        else:
            link = rf'<link rel="stylesheet" href="/site-assets/{re.escape(name)}[^\"]*">'
            text = re.sub(link, lambda _: block, text)
    return text


if __name__ == "__main__":
    stale = []
    for page in PAGES:
        before = page.read_text()
        after = render(before)
        expected = ["phone.css"]
        if page.name in ("index.html", "dingji-cases.html"):
            expected.append("site-nav.css")
        for name in expected:
            if f"<!-- critical-style:{name} -->" not in after:
                raise SystemExit(f"Missing shared style in {page}: {name}")
        if "--check" in sys.argv:
            if after != before:
                stale.append(str(page.relative_to(ROOT)))
        else:
            page.write_text(after)
    if stale:
        raise SystemExit("Refresh critical CSS: " + ", ".join(stale))

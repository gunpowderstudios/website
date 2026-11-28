#!/usr/bin/env python3
"""Run once, on launch day only, after Tim has given permission to go live.
Usage (from the repository folder):  python3 launch/prepare_launch.py --go
It removes noindex from the public pages, adds canonical addresses and removes the version bar.
It changes files only. It does not publish anything or touch DNS."""
import pathlib, re, sys
if "--go" not in sys.argv:
    sys.exit(__doc__)
root = pathlib.Path(__file__).resolve().parent.parent
site = "https://www.gunpowderstudios.co.uk/"
paths = re.findall(r"<loc>(.*?)</loc>", (root / "sitemap.xml").read_text(encoding="utf-8"))
# Stop before changing anything if a public page is unfinished.
unfinished = []
for url in paths:
    page = root / url.replace(site, "") / "index.html"
    text = page.read_text(encoding="utf-8")
    visible = re.sub(r"<section[^>]*data-gs-hidden.*?</section>", "", text, flags=re.S)
    if 'name="gs-draft"' in text:
        unfinished.append(f"{url} : wording still marked as draft")
    if "section-placeholder.svg" in visible:
        unfinished.append(f"{url} : still has 'Your picture here' boxes")
if unfinished:
    sys.exit("Stopped, nothing changed. Finish these first:\n" + "\n".join(unfinished))
for url in paths:
    page = root / url.replace(site, "") / "index.html"
    text = page.read_bytes().decode("utf-8")
    text, found = re.subn(r'<meta name="robots" content="noindex,\s*nofollow">\n?', "", text)
    if found != 1 or 'rel="canonical"' in text:
        sys.exit(f"Stopped: {page} is not in the expected pre-launch state.")
    text = text.replace('<meta property="og:type"', f'<link rel="canonical" href="{url}">\n<meta property="og:url" content="{url}">\n<meta property="og:type"', 1)
    if 'rel="canonical"' not in text:
        sys.exit(f"Stopped: could not add the canonical address to {page}.")
    page.write_bytes(text.encode("utf-8"))
for page in root.rglob("*.html"):
    text = page.read_bytes().decode("utf-8")
    new = re.sub(r'[ \t]*<script[^>]*src="[^"]*dev-tools\.js"[^>]*></script>\n?', "", text)
    if new != text:
        page.write_bytes(new.encode("utf-8"))
(root / "dev-tools.js").unlink(missing_ok=True)
print(f"Ready: {len(paths)} public pages. Check the changes, then commit and publish.")

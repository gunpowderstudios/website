# Launch checklist

Nothing here happens without Tim's explicit permission. The WordPress site stays live until then.

## Before launch day
- [ ] Coming Soon pictures copied into this repository (they still load from WordPress)
- [ ] Confirm whether privacy, cookies and product safety pages are really being retired
- [ ] Check story and miniature wording against the WordPress export, and add the pictures
- [ ] Save any pictures you still need from the WordPress Media Library
- [ ] Optional: check the Google Search Console top pages against the redirects
- [ ] Move DNS into Tim's own Cloudflare account and check website and email still work
- [ ] Keep a WordPress backup

## Launch day, in this order
1. `python3 launch/prepare_launch.py --go`, check, publish.
2. GitHub > Settings > Pages: set the custom domain `www.gunpowderstudios.co.uk`.
3. Cloudflare: point the apex and `www` records to GitHub Pages, DNS only (grey).
   Do not touch any email record (MX, SPF, DKIM, DMARC).
4. When GitHub shows the certificate is ready, turn on Enforce HTTPS.
5. Turn the Cloudflare proxy on (orange). Needed for Amazon country detection and redirects.
   SSL mode: Full or Full (strict), never Flexible.
6. Add the redirects below. Test every shop button, email, and the old addresses.
7. Submit `https://www.gunpowderstudios.co.uk/sitemap.xml` in Google Search Console.

## Old addresses
Same address on the new site: `/`, `/bag-of-dungeon/`, `/book-of-dungeon/`, `/bag-of-dungeon-2/`,
`/bag-of-dungeon-legends/`, `/bodfigures/`, `/7moons/`, `/storytokens/`,
`/the-first-chronicle-secrets-of-the-ancients/`, `/the-second-chronicle-the-darkness/`, `/the-third-chronicle-might-of-the-shadow-army/`, `/the-fourth-chronicle-a-cure-for-the-king/`,
`/kastles-card-game/`, `/rabbito/`, `/cheese/`, `/coming-soon/`, `/about-us/`, `/contact-us/`, `/shop/`, `/apps/`.

Everything else is being retired. Add these as 301 redirects in Cloudflare:

| Old address | Redirect to |
|---|---|
| `/the-wasted-wizard/` and its articles | `/` |
| `/wholesale-board-games/` | `/contact-us/` |
| `/bod3d/` | `/apps/` |
| `/product/...` and `/brand/...` | The matching game page |
| `/basket/`, `/my-account/` | `/shop/` |
| `/category/7-moons-story-tokens/` | `/storytokens/` |
| `/privacy-policy/`, `/cookies-policy/` | **Confirm with Tim before retiring** |
| `/gunpowder-studios-ltd-board-games-product-safety-compliance/` | **Confirm with Tim before retiring** |

Any other old address shows the "page not found" page.

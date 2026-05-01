# BrandSetu Digital — SEO Next Steps

_Last updated: 2026-05-01_
_Companion to: [`SEO_AUDIT.md`](./SEO_AUDIT.md)_

The audit is largely shipped. PRs #1–#5 covered metadata, prerendering, headings, image hygiene, and structured data. This doc lists what's left, in the order you should tackle it. Each item is tagged:

- **[YOU]** — only you can do it (account access, real-world data, hosting).
- **[CODE]** — I can ship it in a PR; needs your go-ahead.
- **[ASK]** — I need a single answer from you to unblock a code change.

---

## 1. After deploying the current branch to production

Do these in order. They take ~30 minutes total and they're the difference between "code looks good" and "actually showing up in Google."

### 1a. Validate structured data **[YOU]**
- [ ] Paste each URL into [Google's Rich Results Test](https://search.google.com/test/rich-results) and confirm zero errors:
  - `https://brandsetudigital.com/`
  - `https://brandsetudigital.com/services`
  - `https://brandsetudigital.com/about`
  - `https://brandsetudigital.com/work`
  - `https://brandsetudigital.com/career`
  - `https://brandsetudigital.com/contact`
- [ ] Repeat with the [Schema.org Validator](https://validator.schema.org/) for stricter syntax checks.
- [ ] Test OG previews at the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), [Twitter Card Validator](https://cards-dev.twitter.com/validator), and [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

### 1b. Force Google to re-crawl with rendered content **[YOU]**
- [ ] In **Google Search Console** → URL Inspection, paste each of the 6 URLs above.
- [ ] Click **"Test Live URL"** → **"View Tested Page"** → **"Screenshot"** tab. The page must render with text, images, and headings visible. _If it's blank, the prerender step didn't ship — flag it._
- [ ] For each URL that renders correctly, click **"Request Indexing."**
- [ ] Re-check indexed-page count in 1–4 weeks (target: at least 6 indexed, up from the previous 1–2).

### 1c. Submit the sitemap **[YOU]**
- [ ] Google Search Console → **Sitemaps** → submit `https://brandsetudigital.com/sitemap.xml`.
- [ ] Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters/).

### 1d. Verify the favicon now appears in SERP **[YOU]**
- [ ] After deploy, search `brandsetudigital` on Google. The logo should now render next to the result (Google previously couldn't fetch it because of the `fevicon` typo). Allow up to 4 weeks for cache refresh; in GSC you can request re-crawl of `/favicon.ico` directly.

### 1e. Hostinger deploy config ✅
- [x] `Frontend/public/.htaccess` ships an Apache/LiteSpeed config tuned for Hostinger shared hosting. CRA copies it into `build/.htaccess` on every build.
- [x] Real files/dirs serve as-is — `/services` resolves to the prerendered `services/index.html` automatically. Unknown URLs return HTTP 404 with the prerendered 404 page via `ErrorDocument 404 /404/index.html` (no soft 404s).
- [x] Bonus: HTTPS forced, trailing slash canonicalized, immutable cache for hashed CRA bundles, no-cache for HTML, gzip enabled, basic security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`), and sensitive files (`.env`, `.git`, `package.json`) blocked from public read.
- [ ] **When you upload the new build:** make sure no _existing_ `.htaccess` in `public_html/` overrides this one. If you previously had a CRA-style `RewriteRule ^ index.html [L]` line, **delete it** — it would defeat react-snap by serving the home `index.html` for every URL. The `.htaccess` from `build/.htaccess` should be the only one in `public_html/`.
- [ ] **Upload procedure:** delete the old contents of `public_html/`, then upload the entire `Frontend/build/` contents (including the `.htaccess` and the per-route folders like `services/`, `about/`, `404/`). After upload, hard-refresh the browser (Ctrl+Shift+R) to bust your local CDN/browser cache.

---

## 2. Open data questions that improve the schema **[ASK]**

The LocalBusiness schema in `Frontend/public/index.html` ships with assumed/empty values. Each one I update will improve local SEO and rich-result eligibility. Send me the answers and I'll do all five updates in one PR:

1. **Street address.** Currently empty (only city/region/country). Need: full street, locality, postal code. From `storymain.jsx:165` it looks like `Office No.103, Orange Business Park, Bhawarkua, Indore – 452014` — confirm?
2. **Geo coordinates.** Currently set to Indore city centre (22.7196, 75.8577). Need the office's actual coordinates (right-click the office on Google Maps → "What's here" gives you decimal coords).
3. **Opening hours.** Currently Mon-Sat 10:00–19:00. Confirm or correct.
4. **Real LinkedIn URL** for the BrandSetu company page. Currently `https://www.linkedin.com` (a placeholder, in `Footer.jsx:114` and `index.html` `sameAs` array).
5. **Founder LinkedIn URLs** for Soumitra Bajpai and Devesh Jain. Adding these to the `Person` schema on `/about` boosts E-E-A-T signals.

---

## 3. PR #6 — Analytics, Search Console, Bing Webmaster wiring **[CODE]**

Once you give the go-ahead, I'll ship:

### Analytics
**[ASK]** Pick one:
- **Google Analytics 4** (free, integrates with GSC, more historical comparison data, but cookie banner required in EU).
- **Plausible** (paid ~$9/mo for this size, privacy-first, no cookie banner needed, lighter weight, simpler dashboard).
- **Both** (GA4 for historical depth, Plausible for daily decisions).

I'll add the snippet via `react-helmet-async` so it lives in `<head>` and survives prerender. For GA4 I'll also wire `react-router` page-view events on every navigation (CRA needs this manually since URL changes don't trigger reloads).

### Google Search Console verification
Two ways:
- **Meta tag** (easy — paste the token from GSC into a new env var, I add it to `index.html`).
- **DNS TXT record** (preferred — survives across hosting changes; you do this at the registrar).

**[ASK]** Which method? If meta tag, paste the GSC verification string here.

### Bing Webmaster Tools verification
Same pattern. Bing also lets you import GSC verification, which is the easiest path.

### Cookie banner (only if you pick GA4 or any cookie-setting analytics)
Required by GDPR/India DPDP Act for visitors from EU/India. I'd recommend:
- **Cookiebot / OneTrust** if you need full compliance dashboards.
- **A simple in-house banner** (50 lines of React) that defers GA4 loading until consent — adequate for a marketing site.

**[ASK]** Which? If you're not sure, the in-house banner is the right default for now.

---

## 4. Image compression — the remaining performance win **[YOU + CODE]**

Image **dimensions** are now correct everywhere (no more CLS warnings), but the source files themselves are still heavy. The worst offenders:

- `Frontend/src/assets/Best-digital-marketing-agency.jpg`
- `Frontend/src/assets/Performance-marketing-agency.jpg`
- `Frontend/src/assets/Brandsetu-digital-agency-about-us.jpg`
- `Frontend/src/assets/digital-marketing-services.jpg`
- `Frontend/src/assets/digital-marketing-agency.mp4` (Hero video)
- `Frontend/src/assets/Top-digital-marketing-company.mov` (works in Chrome but not Safari)
- `Frontend/src/assets/Brandsetu-company-values.mp4`

### Recommended approach (do once, save 50–80% on image bytes)

**Option A — Quick batch [YOU, ~30 min]:**
1. Open [Squoosh](https://squoosh.app) in your browser.
2. Drop each `.jpg` → re-encode as **WebP** at quality 75–80 → download.
3. For the `.mov` and `.mp4` files, use [HandBrake](https://handbrake.fr/) or `ffmpeg` to re-encode at H.264, target bitrate 1500–2500 kbps:
   ```
   ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4
   ```
4. Replace the files in `Frontend/src/assets/` with the new versions (keep the same filenames so the `import` statements still work).

**Option B — CDN-based [CODE, longer payoff]:**
Move all images to **Cloudinary** (free tier covers a marketing site). Cloudinary auto-serves WebP/AVIF based on browser support, auto-resizes per device, auto-compresses. The `<img src>` becomes a Cloudinary URL with transform params. Bigger upfront change; smaller ongoing maintenance.

**[ASK]** Option A or Option B?

### Lighthouse target after compression
- **Performance: ≥90** (currently probably 50–70 due to image weight).
- **LCP: ≤2.5s.**
- **CLS: ≤0.1** (already there with the dimension fix).

Test at [PageSpeed Insights](https://pagespeed.web.dev/) — both Mobile and Desktop tabs.

---

## 5. Things to do once, then forget

### 5a. Real `favicon.ico` **[YOU, optional]**
Current setup uses PNGs only (which Google accepts). For maximum browser compatibility (some old Outlook clients, RSS readers), generate a real multi-size `.ico` at [favicon.io](https://favicon.io/) from `logo512.png` and drop it at `Frontend/public/favicon.ico`. I'll add the `<link rel="icon" href="/favicon.ico">` ref in `index.html`.

### 5b. Dedicated 1200×630 OG image **[YOU + CODE]**
Right now OG previews use `logo512.png` (512×512). LinkedIn/Twitter/Facebook prefer wide (1.91:1) hero images. Design a 1200×630 PNG/JPG with the BrandSetu logo + tagline + Indore + a brand colour background. Drop it at `Frontend/public/og-image.png` and I'll wire it in `index.html` and `Seo.jsx`.

### 5c. Performance-marketing footer microdata **[CODE, optional]**
If you want service-area cities to surface in local results (Indore, Bhopal, Mumbai…), add an `areaServed` array to the LocalBusiness schema. Send me the list and I'll add it.

---

## 6. Ongoing — monthly cadence

Set a recurring calendar item (or schedule a Claude `/loop` agent) for the first Monday of each month:

- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on `/`, `/services`, `/contact`. Note the scores in a tracking sheet.
- [ ] Check **GSC → Performance**: total clicks, impressions, average position, top queries. Note month-over-month delta.
- [ ] Check **GSC → Pages → Indexed**. Should grow from 6 → 10+ as Google discovers internal anchors / future blog pages.
- [ ] Check **GSC → Core Web Vitals**. Any URL flagged "Poor" needs attention.
- [ ] Re-validate one schema block at random in the [Rich Results Test](https://search.google.com/test/rich-results) — this catches drift if a future PR changes a `Service.name`, etc.
- [ ] Check `robots.txt` is still served and the AI-crawler `Allow` rules are intact.

---

## 7. The big-picture decision: when to migrate to Next.js

`react-snap` is shipping today, and for a 6-route static marketing site it's adequate. **Move to Next.js when one of these triggers fires:**

- You add a **blog or news section.** `react-snap` only snapshots routes that exist at build time — it can't ISR new posts.
- You hit **Core Web Vitals issues** that need fine-grained control over images and fonts (Next.js has `next/image` and `next/font` baked in).
- You want **i18n** (Hindi-language site for local SEO leverage).
- `react-snap` becomes a maintenance burden (it's lightly maintained as of 2026; if a CRA or React update breaks it, migration becomes the cheaper option).

**Don't migrate just because Next.js is fashionable.** The existing setup is working. The biggest unlock from Next.js for this specific site would be `next/image` for automatic WebP/AVIF + responsive sizing — but Cloudinary (Option B in §4) gives you the same outcome without a framework rewrite.

When you do migrate, budget 1.5–3 days:
- Half a day: scaffold Next.js project, wire CSS imports, port routes (file-based routing matches the current 6 files almost 1:1).
- Half a day: port `<Seo>` to Next.js `metadata` API (less code; you can throw away `react-helmet-async`).
- Half a day: port `react-snap` config away — Next.js handles SSG natively via `output: 'export'` or `app/` with static generation.
- Buffer for: replacing `<img>` with `next/image`, replacing `react-router` `<Link>` with `next/link`, fixing any `framer-motion` SSR edge cases.

---

## 8. Things explicitly NOT in scope (and why)

- **Backlink building / outreach.** Out of scope for a code repo. This is a content/PR job — guest posts on Indian marketing publications, partnerships with local Indore businesses, listing in directories like Justdial / Sulekha / Clutch.
- **Content marketing / blog.** A blog at `/blog` would dramatically expand crawlable surface area, but it's a content investment, not a code task. When you're ready, see §7 — that's the right time to migrate to Next.js.
- **Paid SEO tools (Ahrefs, Semrush, Moz).** Worth subscribing to one once organic traffic is ≥500 sessions/month and you need keyword research data. Free GSC + Bing Webmaster covers the first 6 months.
- **Local citation building** (NAP consistency across directories). High-leverage for local SEO in Indore, but again — a manual outreach task.

---

## What I need from you to unblock the next PR

If you want PR #6 to land soon, the minimum I need is:

1. **Hosting platform** (for the 404 status fix).
2. **Analytics choice** (GA4 / Plausible / both).
3. **GSC verification method** (meta tag + token, or DNS).
4. **Cookie banner approach** (in-house lightweight, or commercial tool).

Optionally (also valuable, can be a separate small PR):

5. **Real street address + geo + hours.**
6. **Real LinkedIn URLs** (company + 2 founders).
7. **Image compression preference** (Squoosh batch / Cloudinary / skip for now).

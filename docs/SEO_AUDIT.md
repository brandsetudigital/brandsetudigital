# BrandSetu Digital — SEO Audit & Action List

_Audit date: 2026-05-01 (updated with live-site evidence)_
_Scope: full site audit (Frontend + Backend) on branch `master`._

This document is the working punch list for the SEO pass. Items are grouped by priority. Every finding is cited with `path:line` so the fix is unambiguous. Check items off as they ship.

---

## TL;DR

The site is a Create React App marketing site for a digital agency in **Indore, Madhya Pradesh, India**. It has **no SEO infrastructure today**: every route returns the same `<title>`, the same CRA-default `<meta description>`, no Open Graph / Twitter cards, no canonical, no JSON-LD, no sitemap, a CRA-template `manifest.json`, and a favicon path that 404s. On top of that, the rendering model (CRA, client-side only) means crawlers other than Googlebot see an empty `<div id="root">`.

### Live evidence (external audit, 2026-05-01)

Confirmed via an external SEO audit run against the live `brandsetudigital.com`:
- **Only 1–2 pages from the entire domain are indexed in Google.** Direct evidence the rendering issue is biting.
- **Both the homepage and the `/about` page return near-empty HTML when crawled** — Googlebot sees `<div id="root">` with no content. This is the single biggest blocker.
- **The currently live homepage and About page ship duplicate `<title>` and `<meta description>`**, including a grammar error ("a best" instead of "the best") in the description. This is fixed automatically once PR #1 (per-route Helmet metadata) ships.
- `llms.txt` returns 403 (file does not exist) — fixed in PR #1.
- No JSON-LD, no LocalBusiness schema — agency listings can't surface rich results in SERP — fixed in PR #1.

**The biggest single decision to make is now urgently the rendering strategy (P2 below).** Everything else helps, but until Googlebot can actually see content, the rest is upside on a foundation that isn't yet indexed.

---

## P0 — Quick wins (ship first, no architecture change)

### 1. Fix favicon 404 ✅
- [x] Files renamed `fevicon-*.png` → `favicon-*.png`. `index.html` and `manifest.json` now reference real files. Also added 192×192 + 512×512 `<link rel="icon">` so Google SERP can render a logo for the brand.

### 2. Replace CRA-default metadata in `Frontend/public/index.html` ✅
- [x] Real title (with "Indore" keyword), description, keywords, author, robots directive, canonical, full Open Graph + Twitter card tags, and a sitewide **LocalBusiness** JSON-LD block (with address, geo, opening hours, hasOfferCatalog) now live in `index.html`.
- [x] Production domain confirmed as `https://brandsetudigital.com` (live-audit evidence). No URL changes needed.
- [ ] Optional follow-up: ship a dedicated 1200×630 OG image (currently using `logo512.png` 512×512 — works, but a wide social preview image converts better).
- [ ] Optional: add `<link rel="preconnect">` for EmailJS / fonts / analytics origins once those are in use.
- [ ] **Confirm the LocalBusiness fields** I assumed: `streetAddress` is empty (only city/region/country), `geo` uses Indore city centre coordinates (22.7196, 75.8577), opening hours are Mon-Sat 10:00–19:00. Update `Frontend/public/index.html` with the real address + accurate hours when known.

### 3. Clean up `Frontend/public/manifest.json` ✅
- [x] Replaced CRA defaults with real brand identity, dropped the missing `favicon.ico` entry, added 16/32/192/512 PNG icons (192 & 512 marked `purpose: "any maskable"` for Android install banners), set `theme_color` to `#0d0d0d`.

### 4. Per-route metadata via `react-helmet-async` ✅
- [x] `react-helmet-async` installed; `HelmetProvider` wraps `<App />` in `Frontend/src/index.js`.
- [x] `Frontend/src/components/Seo.jsx` emits `<title>`, `<meta description>`, canonical, robots, and full OG + Twitter card tags from a single prop set; supports `noindex` and per-route `jsonLd`.
- [x] Wired into all six routes: Home (`Hero.jsx`), `/services`, `/contact`, `/about`, `/work`, `/career` — each with a unique title (≤60 chars) and description (≤160 chars).
- [ ] Future: extend each route's `<Seo>` call with a `jsonLd` prop for per-page schema (e.g. `Service` on `/services`, `BreadcrumbList` on inner pages) — see P3.

### 5. `robots.txt` + `sitemap.xml` + `llms.txt` ✅
- [x] `robots.txt` updated with `Allow: /`, `Disallow: /api/`, explicit `Allow` rules for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, anthropic-ai), and a `Sitemap:` directive pointing at the production URL.
- [x] `Frontend/public/sitemap.xml` created with all 6 routes, each with `<lastmod>`, `<changefreq>`, and `<priority>`.
- [x] `Frontend/public/llms.txt` created — plain-text summary of pages, services, and contact info for AI search tools.
- [ ] After go-live: submit the sitemap in Google Search Console + Bing Webmaster Tools (P5).

### 6. Fix broken internal links ✅
- [x] `Hero.jsx:122` updated to `/work#work-section`.
- [x] `Footer.jsx` quick-links converted from `<a href>` to `<Link to>`; the broken `/testimonials` is now `/work`.
- [ ] Verify `#work-section` / `#team-section` IDs exist in the rendered DOM of `whowe.jsx` (untested in browser yet).

### 7. Add a 404 catch-all route ✅
- [x] `Frontend/src/components/NotFound.jsx` ships a real 404 page with `noindex` Seo and a "Back to Home" Link.
- [x] `Routes/route.jsx` now wraps the route table in `<main>` and adds the catch-all `<Route path="*" element={<NotFound />} />`.
- [ ] At the host level (Netlify/Vercel/Nginx), configure unknown URLs to return HTTP **404** (not 200) — otherwise Google sees soft-404s. CRA's static deploys typically serve the SPA with 200 by default; needs a host-specific rewrite/status rule.

---

## P1 — Semantic HTML & content structure ✅ (mostly done)

### 8. Heading hierarchy — one H1 per page, no skipped levels ✅

Verified in the prerendered build: every route has exactly **one H1**, no skipped levels.

Final per-route distribution:

| Route | H1 | H2 | H3 | H4 |
|---|---|---|---|---|
| `/` | 1 | 9 | 18 | 0 |
| `/services` | 1 | 6 | 15 | 0 |
| `/about` | 1 | 7 | 10 | 4 |
| `/work` | 1 | 7 | 17 | 6 |
| `/career` | 1 | 6 | 13 | 0 |
| `/contact` | 1 | 4 | 5 | 0 |

Original problems fixed (each entry below was found and corrected):

- [ ] `Frontend/src/components/Home/Hero.jsx:89-91` — three separate `<h1>` for "BUILD / YOUR / BRAND". Replace with a single descriptive H1 (e.g. `<h1>Build Your Brand With BrandSetu Digital</h1>`); keep the visual treatment via spans + CSS.
- [ ] `Frontend/src/components/Home/HomeServices.jsx:167` — H1 inside a Home subsection ("Powerful Digital Solutions"); demote to H2.
- [ ] `Frontend/src/components/Home/HomeServices.jsx:226` — H4 for service titles where there's no H2/H3 above; demote/promote to fix the chain.
- [ ] `Frontend/src/components/Home/whyus.jsx:48-50` — H1 split with nested spans; collapse into one H2 (Hero already owns the page H1).
- [ ] `Frontend/src/components/Home/founder.jsx:63` — founder names as H3 inside a Home subsection; this is fine if the section starts with an H2 — verify and adjust.
- [ ] `Frontend/src/components/Home/mission.jsx:39,72` — H2 then H5; insert H3 or use H3 for the second.
- [ ] `Frontend/src/components/Home/review.jsx:164,167` — H1 ("What Our Clients Say") on Home; demote to H2. H5 subtitle is fine.
- [ ] `Frontend/src/components/Servive/servicepage.jsx:75` — page H1 OK; lines 92, 102, 112, 122 use H1 for stats numbers ("500+", "98%"…). Replace with `<span class="stat-value">` or H3.
- [ ] `Frontend/src/components/Servive/detailedservices.jsx:260` — second H1 on `/services`; demote to H2. Line 263 H5 subtitle → H3 or `<p class="subtitle">`. Line 299 H4 service titles → H3.
- [ ] `Frontend/src/components/Servive/BrandSays.jsx:100,149` — H2 inside loop for brand names is questionable; brand names are not section headings — use `<p class="brand-name">`. Line 149 H1 → H2.
- [ ] `Frontend/src/components/contact/contact.jsx:183,211` — two H1s on `/contact`; pick one (e.g. "Contact BrandSetu Digital") and demote the other to H2. Lines 368, 385, 404, 417 use H6 for "Email / Phone / Location" — too low; use H3.
- [ ] `Frontend/src/components/OurStory/storymain.jsx:175,214` — `/about` is missing a clear page H1; line 175 H3 should be H1 (or add a new H1 above). Line 214 H2 OK if H1 exists.
- [ ] `Frontend/src/components/OurStory/ceo.jsx:30` — H2 on a page that may have no H1; verify after `storymain.jsx` is fixed.
- [ ] `Frontend/src/components/OurStory/prblmsol.jsx:18,43,106,119` — H1 used multiple times; only the topmost should be H1.
- [ ] `Frontend/src/components/Career/careerHero.jsx:36-40` — H1 split with `d-block` spans; collapse to one H1 string + spans for styling.
- [ ] `Frontend/src/components/Testimonials/Testimonialmain.jsx:23` — H1 fine; ensure it's the only H1 on `/work`.
- [ ] `Frontend/src/components/Testimonials/whowe.jsx:73,93,147` — three H1s on the same page ("Who Are We?", "Why We Exist!!!", and another). Pick one page H1 (probably "Who We Are"); demote the rest. Lines 160 (H3), 193 (H4) — fix the chain.

**Rule of thumb:** one H1 per route, set inside the route's top-level component (or via the Helmet wrapper). Subsections use H2 → H3 → H4 in order; never skip levels.

### 9. Image `loading="lazy"` and dimensions ✅

Every `<img>` across all six routes now has explicit `width`, `height`, `loading`, and `decoding` attributes. The Navbar logo (LCP candidate) uses `loading="eager"` + `fetchpriority="high"`; everything else is `loading="lazy"` + `decoding="async"`. The Hero `<motion.video>` got `preload="metadata"` and dimensions.

Coverage in the prerendered build: 100% of `<img>` tags have `width`+`height`; react-snap no longer logs CLS warnings.

Original list (now all done):

- [ ] `Frontend/src/common/Navbar.jsx:67` — logo (use `loading="eager"` + `fetchpriority="high"` since it's above-the-fold; explicit width/height).
- [ ] `Frontend/src/common/Footer.jsx:43` — footer logo (`loading="lazy"`; `height="70"` is set, add `width`).
- [ ] `Frontend/src/components/Home/HomeServices.jsx:187` — lazy.
- [ ] `Frontend/src/components/Home/brands.jsx:132,155` — lazy.
- [ ] `Frontend/src/components/Home/founder.jsx:55` — lazy.
- [ ] `Frontend/src/components/Home/mission.jsx:64` — lazy.
- [ ] `Frontend/src/components/Home/review.jsx:194` — lazy.
- [ ] `Frontend/src/components/Servive/detailedservices.jsx:289` — lazy.
- [ ] `Frontend/src/components/Servive/servicemodals.jsx:31` — lazy (modal-only; lazy is correct).
- [ ] `Frontend/src/components/Servive/BrandSays.jsx:109` — lazy (line 99 already has it).
- [ ] `Frontend/src/components/contact/contact.jsx:194` (iframe maps), `:430` (image) — `loading="lazy"`.
- [ ] `Frontend/src/components/OurStory/storymain.jsx:170,231` — lazy + width/height.
- [ ] `Frontend/src/components/OurStory/ceo.jsx:52,81` — lazy.
- [ ] `Frontend/src/components/OurStory/prblmsol.jsx:36,141` — lazy.
- [ ] `Frontend/src/components/Career/culture.jsx:58,71` — lazy.
- [ ] `Frontend/src/components/Testimonials/whowe.jsx:86,128,177,222,356` — lazy.

**LCP image** (the hero video poster + first paint image) should NOT be lazy — it should be eager-loaded. Identify it (`Hero.jsx:181` uses a `<motion.video>`) and ensure no lazy attr.

### 10. Image alt-text quality ✅
- [x] All previously-flagged generic alts upgraded with descriptive, keyword-aware text:
  - `culture.jsx`: "Team work" → "BrandSetu team collaborating in a modern Indore office"; "Office culture" → "BrandSetu office culture and creative workspace".
  - `storymain.jsx`: "BrandSetu" → "BrandSetu Digital — building digital brands in Indore".
  - `whowe.jsx`: "About Us" → "The BrandSetu Digital team at our agency office in Indore"; portfolio cards now include the brand tag; team photos include name + role.
  - `ceo.jsx`: fixed two **wrong-name alt bugs** (photos of Soumitra/Devesh were labeled "Vaibhav Singh Baghel" / "Mansi Gupta"); now correct + role-tagged.
  - All dynamic alts (`brand.name`, `item.title`, `member.name`) now embed the role/context, not just a bare name.
- [x] Hero floating shapes are pure `<motion.div>` (no `<img>`) and the parent has `aria-hidden="true"` already.
- [x] Bonus: every `<img>` got `decoding="async"` for non-blocking decode.

### 11. Internal links — use `<Link>`, not `<a>` ✅
- [x] All Footer internal route links converted from `<a href>` to `<Link to>` (both Quick Links and Services hash links).
- [x] External links already use `target="_blank" rel="noopener noreferrer"` — verified.

### 12. Semantic HTML upgrades ✅
- [x] Contact info wrapped in `<address className="not-italic">`.
- [x] `contact.jsx` `<section role="region" aria-label>` redundancy resolved — now uses `aria-labelledby` pointing at the page H1's id.
- [x] `<main>` wrapper added in `Routes/route.jsx` (PR #1).
- [x] `<footer>` and `<nav>` already in place.
- [x] Bonus: Footer section headings upgraded from `<h6>` to `<h2>` with visual styling preserved via `fs-6`.

---

## P2 — Rendering strategy ✅ (Option A: `react-snap` shipped)

**Root cause addressed.** Previously, CRA served an empty `<div id="root">` and only 1–2 pages were indexed in Google.

What shipped:
- [x] `react-snap` installed as a devDependency.
- [x] `Frontend/src/index.js` now uses `hydrateRoot` when the root has prerendered children, falling back to `createRoot` for fully client-rendered scenarios.
- [x] `Frontend/package.json` adds a `postbuild: react-snap` script and a `reactSnap` config block listing all 6 routes + `/404`.
- [x] `npm run build` now produces static HTML per route: `build/index.html`, `build/services/index.html`, `build/about/index.html`, `build/work/index.html`, `build/career/index.html`, `build/contact/index.html`, `build/404/index.html` — each between 29–67 KB of indexable HTML.
- [x] Per-route Helmet metadata (title, canonical, OG, Twitter, description, robots) is baked into each static file — verified by inspecting `build/services/index.html` etc. for `data-rh="true"` tags.
- [x] LocalBusiness JSON-LD survives in every prerendered HTML head.
- [x] 404 page renders with `noindex, nofollow` correctly.

### Validation steps after deploy
- [ ] Open Google Search Console → URL Inspection → paste `https://brandsetudigital.com/` → "Test Live URL" → "View Tested Page" → "Screenshot" — the page must render with text content visible.
- [ ] Repeat for `/services`, `/about`, `/work`, `/career`, `/contact`.
- [ ] Click "Request Indexing" on each page after the rendered preview looks correct.
- [ ] Verify rendered HTML by running `curl -A "Googlebot" https://brandsetudigital.com/ | grep -c BrandSetu` — should be much higher than 1.
- [ ] Re-run an external SEO audit (e.g. ahrefs, Mavek, semrush) after ~1 week to confirm indexed-page count increases.

### Known limitations of react-snap (worth documenting)
- Hero `Math.random()` floating shapes (`Hero.jsx:27-33`) generate different output during prerender vs hydration → React 18 logs a hydration mismatch warning and re-renders that subtree on the client. SEO is unaffected; console shows a warning. Future fix: move the randomization into `useEffect` so prerender outputs nothing.
- Third-party requests (Google Maps iframe, fonts) are skipped during prerender via `skipThirdPartyRequests: true`. Expected.
- AOS animations and `framer-motion` `whileInView` triggers don't run during prerender — they activate on the client after hydration. No SEO impact (content is in the DOM regardless).
- If you add a route, remember to also add it to `package.json` `reactSnap.include` AND to `Frontend/public/sitemap.xml`.

### When to upgrade to Next.js (Option B, deferred)
- When adding a blog or dynamic CMS content (`react-snap` only does static snapshots at build time).
- When `react-snap`'s memory or stability becomes a problem (it is lightly maintained as of 2026).
- When `next/image` would meaningfully improve Core Web Vitals.

---

## P3 — Structured data (JSON-LD) ✅

- [x] **Sitewide LocalBusiness** with `name`, `url`, `logo`, `image`, `description`, `email`, `telephone`, `priceRange`, `address` (Indore, MP, IN), `geo`, `openingHoursSpecification`, `hasOfferCatalog`, and `sameAs` lives in `Frontend/public/index.html` and is inherited by every prerendered route.
- [x] **`Seo` component** now accepts an array of JSON-LD objects via the `jsonLd` prop.
- [x] **`/services`:** `BreadcrumbList` + `CollectionPage` whose `mainEntity` is an `ItemList` of 6 `Service` entries (SEO, Branding, Social, Web, Performance Marketing, Content/Shoots).
- [x] **`/about`:** `BreadcrumbList` + `AboutPage` linking to the LocalBusiness, plus 2 `Person` entries (Soumitra Bajpai, Devesh Jain) with `worksFor` references.
- [x] **`/work`:** `BreadcrumbList` + `CollectionPage` with `ItemList` of 6 portfolio brands (URLs included where known).
- [x] **`/career`:** `BreadcrumbList`. `JobPosting` schema deliberately skipped — the listed roles look like placeholders, and Google penalizes fake or expired job postings. Add `JobPosting` only when real openings have a posted date and an explicit close date.
- [x] **`/contact`:** `BreadcrumbList` + `ContactPage` whose `mainEntity` is the LocalBusiness with a structured `ContactPoint` (phone, email, languages: English+Hindi).
- [ ] Skipped: `WebSite` with `SearchAction` — the site has no internal search box; adding `potentialAction` would describe a feature that doesn't exist (Google may flag).

Final per-route schema count (verified in prerendered build):

| Route | JSON-LD blocks | Schemas |
|---|---|---|
| `/` | 1 | LocalBusiness |
| `/services` | 3 | LocalBusiness, BreadcrumbList, CollectionPage (+ ItemList of 6 Services) |
| `/about` | 5 | LocalBusiness, BreadcrumbList, AboutPage, 2× Person |
| `/work` | 3 | LocalBusiness, BreadcrumbList, CollectionPage (+ ItemList of 6 portfolio items) |
| `/career` | 2 | LocalBusiness, BreadcrumbList |
| `/contact` | 3 | LocalBusiness, BreadcrumbList, ContactPage (+ ContactPoint) |

- [ ] **Validate before merging to production:** paste each route's URL into [Google's Rich Results Test](https://search.google.com/test/rich-results) and the [Schema.org Validator](https://validator.schema.org/) — both should report zero errors.

---

## P4 — Performance & Core Web Vitals

- [ ] Compress + convert hero/banner images to WebP/AVIF. Largest current offenders by extension: `.jpg`, `.png` over ~300KB. Especially:
  - `Frontend/src/assets/Best-digital-marketing-agency.jpg`
  - `Frontend/src/assets/Performance-marketing-agency.jpg`
  - `Frontend/src/assets/Brandsetu-digital-agency-about-us.jpg`
- [ ] Re-encode `Frontend/src/assets/Brandsetu-company-values.mp4` and `Top-digital-marketing-company.mov` to web-optimized H.264 MP4; add `preload="metadata"` and `poster="..."` so first paint isn't the video frame fetch.
- [ ] Set explicit `width`/`height` on every `<img>` to eliminate CLS.
- [ ] In `Frontend/src/components/Home/Hero.jsx:27-33`, the page generates 30 random floating shapes on every render. Cheap but adds ~30 absolutely-positioned elements + framer-motion animations. Consider reducing count or `prefers-reduced-motion`.
- [ ] Bootstrap CSS is loaded globally (`App.js:7`). Tree-shake by importing only the components you use, or replace with Tailwind/CSS modules over time.
- [ ] Add `Cache-Control: public, max-age=31536000, immutable` for hashed assets at the host/CDN level.
- [ ] Lighthouse-test each route after the above; target ≥90 on Performance, SEO, Accessibility, Best Practices.

---

## P5 — Measurement & ongoing

- [ ] Add Google Analytics 4 (or Plausible — privacy-friendly, no cookie banner needed in EU).
- [ ] Add Google Search Console verification meta tag (or DNS) and submit `sitemap.xml`.
- [ ] Add Bing Webmaster Tools verification + sitemap.
- [ ] Set up monthly Lighthouse CI run (or just a calendar reminder) and track Core Web Vitals in GSC.
- [ ] Once live, re-test all OG previews via the LinkedIn Post Inspector, Twitter Card Validator, and Facebook Sharing Debugger.

---

## Suggested PR breakdown

1. **PR #1 — P0 metadata foundation + Helmet + LocalBusiness + AI crawlers + llms.txt:** ✅ shipped.
2. **PR #2 — Rendering strategy (P2):** ✅ shipped via `react-snap`. All 6 routes now prerender to static HTML at build time.
3. **PR #3 — Heading hierarchy & semantic HTML:** ✅ shipped. Items 8, 11, 12.
4. **PR #4 — Image hygiene (loading, dimensions, alt text):** ✅ shipped. Items 9, 10. Image *compression* (re-encoding hero JPGs to WebP/AVIF, MOV→MP4) is still a follow-up — see P4.
5. **PR #5 — Per-page structured data (Service, BreadcrumbList, ItemList, AboutPage, ContactPage):** ✅ shipped.
6. **PR #6 — Analytics + Search Console + Bing Webmaster:** P5. _Next._

After deploying PR #1 + PR #2 to production, run the GSC URL Inspection live test on each route and click "Request Indexing." Expect indexing recovery over 1–4 weeks.

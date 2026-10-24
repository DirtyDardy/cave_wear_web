# CLAUDE.md – Cave Wear

Project memory for Claude. Read fully at the start of every session. Updated 24 Oct 2026.
If this file and the code disagree, say so and ask – don't guess which one is right.

## 1. Project

Cave Wear is a fictional premium outdoor/everyday clothing brand by **Dardan Ademi**. The site is
his portfolio piece for a **Brand & Content Designer** role at **Linro** (cybersecurity).
**Deadline 11 Nov 2026:** one-hour presentation of the site, its design/UX, the code and his
decisions. Goal: a small site that feels exceptionally well considered, works reliably, and that
Dardan can fully explain. Linro's references: linear.app, vercel.com.

- Brand language: **Rugged. Functional. Refined.** Outdoor capability that also looks right in the
  city, at a bar, at a family dinner. Dark, minimal, premium, subtle military influence. Strength
  without aggression, premium without flashy luxury.
- The **Cave Bear** is the symbol (strength, endurance, resilience) – use it with intent, never as
  decoration everywhere.
- Tagline: **"Built for the wild. Made for anywhere."** Footer line: "Not released yet – follow the journey."
- **Demo only:** nothing can be bought. Visitors can follow on social media, email, sign up for the newsletter.
- Concept disclaimer (exact text): *"Cave Wear is a concept brand for a design portfolio. Products
  are concept mock-ups – some are based on existing garments and edited. Nothing is for sale."*

## 2. Who you are working with

- Dardan is the **creative director and decision-maker**. Claude is the technical partner.
  Design is his call – Claude may suggest, but focuses on design only when asked.
- Background: Medientechnologe Digitaldruck, production management; strong in CorelDRAW, GIMP,
  Photoshop. Not a formally trained media designer.
- HTML/CSS: The Odin Project foundations, modern CSS (logical properties, Grid, Flexbox, nesting,
  range media queries). Explain new CSS concepts briefly.
- JavaScript: **beginner**. Explain every JS feature step by step. Never dump large JS files.
- Git/Astro: new. Guide through commands.
- Communication: direct, practical, clear next steps, simple English (German background).
  No long theory, no lists of optional technologies.

## 3. Working rules (non-negotiable)

1. **Ask before anything that changes how the brand looks** (layout, colours, type, imagery, copy
   tone). Purely technical improvements are fine – say what and why.
2. **Never build ahead.** Only what Dardan asked for. No unrequested pages, features or files.
3. **Small steps, each explained:** what changed, why, how to test it.
4. **Copy Dardan's designs (PDF, mockup) 1:1.** Ask about every difference – never decide it.
5. For design choices, **show comparison versions** instead of changing things directly.
6. **Localhost first.** Push to Netlify only when Dardan says it's final.
7. After every major step, recommend and offer 3 options: **Commit / Commit + push / Don't commit**.
   **Always show the full commit message (and the files it includes) right above the options.**
   Commits split by topic; the message explains the why. Write commit messages in Dardan's
   voice ("my notes", not "Dardan's notes"), as if he wrote them.
   **Before removing anything from this file, give Dardan a copy of it first.**
8. **Presentation notes:** Dardan keeps them outside this repo. When a decision is worth
   presenting, point it out with a short ready-to-copy note. **Never write notes files yourself.**
9. Not every problem needs code. If it belongs in Corel/Photoshop, say so.
10. **No invented facts:** no fake certifications, partnerships, sustainability claims, material
    claims (organic, GSM …) or specs presented as real. Donations are *planned*. bearbiology.org
    = a normal link, never a partnership, never their logo. Never name Carinthia or copy its specs.
11. When replacing something, remove the old version. Project-wide cleanups only when asked.
12. Hosting/DNS/accounts: click-by-click numbered steps. Dardan sends a screenshot before every
    final confirm button; Claude checks it first. Claude never handles passwords.
13. **Desktop first.** Mobile polish is a later phase.
14. Claude can't generate images: Claude writes prompts and checks results; Dardan generates in
    Gemini and finishes in Photoshop.

## 4. Tech stack

| Choice | Reason |
|---|---|
| **Astro 7** (minimal) | Finished HTML at build time, zero JS by default, components. In Linro's tech list. |
| **No React** | Interactive parts are small; plain JS is enough and is what Dardan is learning. |
| **Own CSS, no Tailwind** | Own design system (CSS variables) shows design craft. |
| **Plain JavaScript** | Menu, bag, forms, weather – each explained. |
| **Netlify** + **Netlify Forms** | Free, HTTPS. Forms sent via `fetch` (no reload). |
| **Open-Meteo** | Free weather API, no key. Covers fetch / REST / JSON. |
| **English only** | Built so German could be added later. |
| **No accounts, no cookie banner** | Data minimisation; no tracking cookies. |
| **Dark mode only** | Never a light mode. |

Separation: structure in `pages`/`components`, design in `styles`, behaviour in `scripts`,
content in `content`/`data`. Content stays in HTML/Markdown, not in JS.

## 5. Workflow, deployment, domain, email

- Project `D:\project\cave_wear_web`. Design files outside the repo in `cave-wear-design/`.
- `npm run dev` → http://localhost:4321. Git: one branch **`main`**, repo `DirtyDardy/cave_wear_web` (public).
- Netlify project `cave-wear-concept`; every push to `main` goes live (~1 min). Build
  `npm run build`, publish `dist`, `NODE_VERSION=24`. Form detection on.
- **Only what is in Git reaches Netlify.** Never import from git-ignored folders
  (e.g. `src/assets/test/`). Risky push → test with a fresh clone (`git clone`, `npm ci`, `npm run build`).
- Replaced image with the same file name → hard reload (Ctrl + F5); the dev server caches images.
- Claude settings: `.claude/settings.json` (allow/ask lists) + Stop hook `.claude/hooks/check-build.sh`
  (test-builds the site when site files changed).
- New Netlify form works only after a deploy (check: `data-netlify="true"` gone from live HTML).
- **Domain https://cavewear.de** (netcup Webhosting 1000). Main address without www; `www` and
  `http://` redirect to it. DNS: netcup CCP → Domains → cavewear.de → CloudDNS. Netlify = web
  host only; netcup = domain, DNS, email. Don't use Netlify DNS.
- **Mailbox info@cavewear.de** → forwarded to info.cave.wear@gmail.com (copy kept), spam filter,
  virus scan. Gmail "Send mail as" via `mx2f26.netcup.net`, 465, SSL. SPF, DKIM, DMARC `p=quarantine`.
- Planned: confirmation emails via a **Netlify Function** through this mailbox (password only as a
  Netlify environment variable, never in code).

## 6. Pages & status

- **Global header + footer** – built (see 7 and 8).
- **Home** – hero built (see 9). Placeholder "Call to action" button under the hero → `/products`.
  Planned: featured products, short conservation overview, journey teaser, weather strip.
- **Products** – overview, detail pages, bag (see 10). Not built.
- **Brand** – story & origin, identity & purpose, conservation, donation approach, journey
  timeline, bearbiology.org link. Dardan has started the About/Brand content.
- **Contact** – contact info, contact form, FAQ. Not built.
- **Impressum, Privacy Policy** – built (see 13). **404** – not built.
- **`/styleguide`** – hidden (no links, noindex), public by URL. **Delete before final launch.**

## 7. Features

- **Mobile menu** – built. Brand submenu becomes an accordion inside it.
- **Shopping bag** – add/remove, quantities, total, optional planned donation, saved in
  localStorage. Ends in **Reserve** (name + email + bag via Netlify Forms), confirmation:
  *"Your items are reserved. No payment now. We'll notify you at launch."* Honest: no payment.
  OPEN: Reserve looks like a real pre-order – short disclaimer there, or rethink.
- **Newsletter** – built (footer): email only, Netlify Forms via fetch (`src/scripts/newsletter.js`),
  test-mode message locally. Note: "We'll only email you when there's real news – the launch, a
  vote on the next product or a big announcement. No spam." Privacy Policy states the same purpose – keep in sync.
- **Contact form** – Netlify Forms via fetch, client-side validation, clear feedback.
- **Weather strip** ("Field conditions", Open-Meteo) – soft ask first: *"Show today's conditions
  for your location?"* [Use my location] [Show Regensburg]. Browser permission only after the
  click; declined → Regensburg. Shows weather + a product suggestion (mapping OPEN).
- **Follow the journey** – timeline of real milestones only (small data file) + social links.
  Main place Brand page, teaser on Home, one line near Reserve. Links only, no embedded feeds.
- **Animations** basic only, always respecting `prefers-reduced-motion`.
- **Scroll snap** CSS only, `proximity` never `mandatory`: hero, main CTA, max. one more.
  Also for the product gallery and the mobile product row.

## 8. Header & footer

- Semantic `header` > `nav aria-label="Main navigation"` > `ul` > `li`. Nav: Products · Brand ·
  Contact · Bag. Logo → Home.
- Background Dark Obsidian, Charcoal bottom line. **Home:** 5% → solid over the first 200px of
  scrolling (`--header-fade-distance`); only the background fades. Other pages: solid.
- **Hides on scroll down, shows on scroll up** (threshold, no jitter) – built. Never hides while
  the menu/submenu is open or focus is in the header. No slide with reduced motion.
- **Product detail pages: never hide** (Bag stays visible) – decided, not built yet.
- Height 92px from 768px, 72px mobile (temporary). Logo 44px / 32px mobile.
- Nav: Geist 500, 16px, uppercase, `--tracking-nav` 0.04em. Inactive Weathered Bone; active
  **bold Egret**, no layout shift, no marker; hover Wild Honey. "Products" active on `/products/*`.
- Bag button: 44px high, 24px backpack icon (Dardan's drawing), "Bag" label, 12px corners,
  Flint outline, Obsidian fill, Weathered Bone; hover Egret fill + Dark Obsidian. Fades in with
  the header on Home. OPEN: Dardan to confirm the hover state.
- **Brand submenu** (only submenu, chevron, disclosure pattern with `aria-expanded`, not
  `role="menu"`; hover opens on hover devices; Escape/click outside closes) + **jump links**
  (`/brand#…`, smooth scroll, `scroll-margin-top`, JS for cross-page jumps) – **postponed until
  the pages have content**. Placeholder items: Brand overview · The Idea · The Cave Bear ·
  Conservation · The Journey (one list in the code).
- **Footer** – built: Obsidian + hairline. Small logo · tagline · journey line · Instagram,
  Threads, YouTube · newsletter. Bottom: © year Cave Wear · A concept brand by Dardan Ademi ·
  Impressum · Privacy Policy. No email icon, no pop-up, no bearbiology.org link.

## 9. Home hero (`src/components/HeroSplit.astro`)

- Split screen *Built for the wild / Made for anywhere*: forest left, city right, cut along the
  bear logo's diagonal. Bear centred on the cut, 50% of hero height, **smoked glass**.
- Hover a side → other side goes black, that bear half becomes outline, headline + short text
  appear (headline max 112px, 26ch column, small text Muted Stone). No button. Hidden H1
  "Built for the wild. Made for anywhere." Soft dark gradient on top for header readability.
- Height `min(45rem, 90svh)`; everything inside scales with it.
- OPEN: text overlaps the bear at 1280px; mobile/touch version; Safari (Mac) check; larger
  downloads of the hero photos (then re-check header readability + top gradient over them); final CTA text (direction "Discover the collection") + position –
  always visible, never hover-only.

## 10. Products & product images

Six products: **T-shirt · Hoodie · Half-zip (male + female version, same product) · Rain jacket
· Beanie · Buff**. Products live as Markdown in `src/content/products/` (not built yet).

- **Real** (bought and photographed by Dardan): hoodie, half-zip, beanie, rain jacket.
  **AI** (Gemini): T-shirt, buff.
- Rain jacket = Dardan's own Carinthia jacket, Carinthia logo removed, Cave Wear logo added.
- Some garments get an embroidered logo with visible stitch texture (OPEN: which ones).
- OPEN: names, prices, sizes, colourways, descriptions, donation amount – **ask Dardan**.
  Some real products still to order.
- **Image recipe** (one shoot look): 4:5, front + back + side + 3–5 close-ups. Background soft
  dark gradient (lighter charcoal centre → `#0D0D0E` edges), no texture. Ghost mannequin (beanie on
  invisible head, buff on a form or rolled), no model. Soft diffused light + gentle rim light,
  straight-on eye level, 85mm look. No logos/text except Dardan's own logo in its exact shape.
- Real photos first, then they are the AI reference. Shop photos only as temporary shape
  reference – never on the site. Every AI logo is checked against the logo file; fix in Photoshop.
- No image generation until Dardan writes "Start generating". OPEN: review Gemini's updated recipe.
- Product sheet layout (views, detail strip, labels) = HTML/CSS with real text, not baked into images.

## 11. Design system

### Colours (final – only these, via CSS variables; components use role variables)

| Role | Name | Hex |
|---|---|---|
| Background | Dark Obsidian | `#0D0D0E` |
| Surface (header, footer, bag) | Obsidian | `#131314` |
| Line / divider | Charcoal | `#1E1E1E` |
| Input border | Flint | `#6B655E` |
| Main text | Egret | `#F3EBE0` |
| Secondary text | Weathered Bone | `#C4B9AC` |
| Quiet text (only on Dark Obsidian/Obsidian) | Muted Stone | `#8C857B` |
| Accent (main action, links, focus, bag count) | Wild Honey | `#C39132` |
| Accent hover | Amber Gold | `#D4A54A` |
| Brand support (large surfaces only) | Irr Olive | `#4B573E` |
| Success / Error (icon or border only) | Forest Fern / Terracotta | `#5B7553` / `#B86B43` |
| Logo dark brown | Moule | `#382D2B` |
| Reserve (no role yet) | Tobacco Brown / Alpine Oak / Mossy Elm | `#9A7354` / `#AE946B` / `#5E6D4E` |

- Status messages: colour only on icon/left border; text Egret. On Irr Olive: Egret text only.
- Form fields on Dark Obsidian or Obsidian, never on Charcoal. Text on accent: Dark Obsidian.

### Spacing – 4-point grid
Every size, space and line height is a multiple of 4px, only from `--space-*`: 1=4 · 2=8 · 3=12 ·
4=16 · 6=24 · 8=32 · 12=48 · 16=64 · 24=96px. Measure from the box. Exceptions: 1px lines,
`clamp()` font sizes, spacing that results inside a component. Break the grid only deliberately.

### Corners
Default **sharp (0)**. Rounding only where Dardan decides. Scale only: `--radius-sm` 4 (inputs,
tags, style guide boxes) · `--radius-md` 8 · `--radius-button` 12 (**every button**) ·
`--radius-lg` 16 · `--radius-full` (real circles only). Same element type = same radius.
Nested: inner radius = outer − gap. No squircles/chamfers. OPEN: card radius.

### Buttons (shared classes in `src/styles/global.css` – never restyle per component)
- `.button` + `.button-primary` (Wild Honey filled, hover Amber Gold – **one per section**) ·
  `.button-glass` (on photos, Egret text) · `.button-outline` (Wild Honey outline, on plain dark) ·
  `.text-link` (tertiary, "Learn more ›") · `.icon-button` (round, Flint border, `aria-label`).
- Never outline on a photo, never glass on flat dark. Sentence case, 16px medium, 48px high;
  `.button-compact` 40px / 14px. Pressed 97% (off with reduced motion). Reference: `/styleguide`.

### Cards & glass
Every card = the hero bear's **smoked glass**: blur 12px, saturate 1.2, brightness 0.9 + Dark
Obsidian 45% tint + fading Egret edge + soft shadow. No coloured cards. Text must pass WCAG.
Exception: a whole section may be Irr Olive (conservation); cards inside stay glass.

### Typography
- **Geist** (variable) – body, UI, nav. **Barlow Condensed Bold 700** – H1/display only,
  uppercase, line height 0.9, 48–128px `clamp`, max 12ch. Never another weight.
- WOFF2 self-hosted in `public/fonts/` (no Google requests). Both SIL OFL.
- Scale: H2 32/40→48/56 · Lead 24/32→32/40 · H3 24/32 · Body 16/24→18/28 · Small 14/20 ·
  Label 14/20 uppercase `--tracking-wide`; H4–H6 = Label. Headlines must never clip on mobile.

### Logo & icons
- `src/assets/logo-horizontal.svg` (`currentColor`, inlined in header/footer) and
  `public/logo/bear-light.svg` (hero glass mask). Other versions in Git history / design folder.
- Two-tone bear (Moule head) only on cream or at large size – 1.5:1 on Dark Obsidian.
- Favicon set done (`public/`, linked in `BaseLayout.astro`). Icons: 30-unit artboard, 2-unit lines.
- Corel SVG export preset: px, page = artboard, presentation attributes, hex, text as curves.

## 12. Quality requirements

- Semantic HTML; one `<h1>` per page; no skipped levels; header/main/footer in `<body>`.
- Mobile, tablet, desktop, ultrawide. No horizontal overflow.
- Keyboard accessible, visible focus (`a:focus-visible`). Icon-only links/buttons need `aria-label`.
  Meaningful `alt` texts. Respect `prefers-reduced-motion`. Forms give clear feedback.
- All links work, no placeholder links in the final site.
- Optimised images (Astro image handling), no oversized assets or unneeded scripts. Video: short
  loop, no audio, small, poster. Product images 4:5, wide images 16:9.
- Stock photos need licence check + a credit line in the Impressum.

## 13. Legal

- **Impressum** + **Privacy Policy** built (English), details in `src/data/owner.js`, layout
  `src/layouts/LegalLayout.astro`. Two emails, no phone, no contact form yet.
- Impressum has the concept disclaimer and "Photo credits +" (`<details>`): forest = chickenbunny
  (Pexels), alley = Andreas Rasmussen (Unsplash). Every new stock photo gets a line.
- Privacy: no cookies/tracking, Netlify hosting, newsletter (consent), social links, GDPR rights.
  **Extend before** contact form, bag/Reserve (localStorage), weather (location → Open-Meteo) or
  confirmation emails go live.
- netcup AVV agreed (PDF with home address stays outside the repo). OPEN: check Netlify's DPA.
- Trademark check done 21 Oct (TMview, class 25): no hits in DE/EU. A website "CAVEWEAR –
  Underground Tech Fashion" exists (not registered). Real launch → register at DPMA.
- OPEN: short disclaimer on product/Bag/Reserve; note that some product images are AI (+ which
  tool, check its terms); Gewerbe/VAT question.

## 14. Still open (ask, don't assume)

- **2FA on the Cave Wear Gmail and netcup** (most important).
- Netlify form notifications → info@cavewear.de.
- Newsletter double opt-in + Reserve confirmation email (Netlify Function).
- Product details, donation model, weather → product mapping.
- Home sections + final CTA; Brand page sections, then submenu + jump links.
- Hero at 1280px, mobile version, Safari check. Card radius. Bag hover check.
- Delete `/styleguide` before launch. DNSSEC at the very end.

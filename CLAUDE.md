# CLAUDE.md – Cave Wear

Project memory for Claude. Read fully at the start of every session. Updated 25 Oct 2026.
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
- First collection: the **Base Collection** (not "Basic", decided 25 Oct) – minimal essentials made to last. The idea: no
  fast fashion, no loud graphics; you only need one or two pieces and they stay with you
  (longer life = better for the environment and cheaper in the long run). Brand-page material.
- **Vision vs. fact:** production plans (material, print method, dyeing, where it's made) are
  Dardan's *vision* and are always called that ("our vision", "planned", "what I'm working on"),
  never stated as facts. Design intent (fit, look, why) can be shown freely. Never "Made in
  Germany", "100% cotton", "military-grade", "environmentally friendly" or brand names of
  production methods as claims.
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
- **Home** – hero built (see 9). Under it two buttons: "Discover the collection" (filled
  → `/products`) + "Explore more ↓" (outline, smooth scroll to `#explore`); labels are placeholders.
  Last section "Questions?" with FAQ (filled → `/contact#faq`) + "Contact us" (outline →
  `/contact#contact-form`). `id="explore"` sits on it until the first real Home section exists.
  Planned: featured products, short conservation overview, journey teaser, weather strip.
- **Products** – overview, detail pages, bag (see 10). Not built.
- **Brand** – story & origin, identity & purpose, conservation, donation approach, journey
  timeline, bearbiology.org link. Dardan has started the About/Brand content.
- **Contact** – contact info, contact form, FAQ. Not built. The FAQ must have its own jump
  target (`id`) on each question, at least **pricing** ("Learn more" next to the price) and
  **size chart / fit** ("Size chart and fit guide" on the product page) – both links then point there.
  **REMINDER (Dardan asked, 25 Oct): as soon as the FAQ is finished, remind Dardan and connect
  both links** (`src/pages/products/[id].astro`, search for "TODO: link to").
- **Impressum, Privacy Policy** – built (see 13). **404** – not built.
- **`/styleguide`** – noindex, public by URL. Temporary "Style guide" link in the footer bottom
  row (before Impressum) while building. **Delete page + link before final launch.**

## 7. Features

- **Mobile menu** – built. Brand submenu becomes an accordion inside it.
- **Shopping bag** – add/remove, quantities, total, optional planned donation, saved in
  localStorage. Ends in **Reserve** (name + email + bag via Netlify Forms), confirmation:
  *"Your items are reserved. No payment now. We'll notify you at launch."* Honest: no payment.
  **Concept (decided 24 Oct):** Reserve = saving your place in the queue for the launch, not a
  purchase – no money, no commitment, said clearly. After reserving, items can be removed but
  not added. OPEN: how removing works later (link in the confirmation email?), whether a second
  reservation is allowed, whether a queue number is shown.
  **Wording (decided 25 Oct):** product button "Add to pack" (the bag is a backpack), under it
  "No payment – reserve your place for the launch." Header label "Pack".
- **Newsletter** – built (footer): email only, Netlify Forms via fetch (`src/scripts/newsletter.js`),
  test-mode message locally. Note: "We'll only email you when there's real news – the launch, a
  vote on the next product or a big announcement. No spam." Privacy Policy states the same purpose – keep in sync.
- **Contact form** – Netlify Forms via fetch, client-side validation, clear feedback.
- **Weather strip** ("Field conditions", Open-Meteo) – soft ask first: *"Show today's conditions
  for your location?"* [Use my location] [Show Regensburg]. Browser permission only after the
  click; declined → Regensburg. Shows weather + a product suggestion. Wanted, build later
  (remind Dardan). Decided 24 Oct: ask first (no IP lookup). Shape: try strip and card side by
  side, then Dardan picks. Place: Home recommended (on Products the visitor already sees all
  six) – confirm when building. Draft mapping: rain/snow → rain jacket · below 5 °C → hoodie +
  beanie + buff · 5–15 °C → half-zip · above 15 °C → T-shirt (final once products are defined).
- **Follow the journey** – timeline of real milestones only (small data file) + social links.
  Main place Brand page, teaser on Home, one line near Reserve. Links only, no embedded feeds.
- **Animations** basic only, always respecting `prefers-reduced-motion`.
- **Scroll snap** CSS only, `proximity` never `mandatory`: hero, main CTA, max. one more.
  Also for the product gallery and the mobile product row.

### Ideas – wanted, build later (remind Dardan when we work on that part)

- **Page transitions** – site-wide soft fade (~200ms) with CSS cross-document view transitions
  (`@view-transition`). Not Astro's `<ClientRouter />` (JS, would break the header and newsletter
  scripts). Off with reduced motion. Could be done any time – Dardan picks when.
- **Flying product photo** – the photo moves from the products overview into the detail page
  (shared element, `view-transition-name`). Build together with the product pages. Demo moment.
- **Logo story section** (sticky scroll) – left: short text blocks that explain the company,
  scrolling normally. Right: the logo stays in place (`position: sticky`); the logo part the
  current text talks about lights up, the rest dims (small JS, `IntersectionObserver`). After the
  last block, normal scrolling. Only one such section on the site. OPEN: what each logo part
  means (Dardan), bear only or bear + wordmark, Brand page or Home (teaser?). Needs the logo
  split into separate shapes in Corel – today `logo-horizontal.svg` = 1 shape, `bear-light.svg` = 4.
- **Pre-launch pieces** – one extra T-shirt and one extra hoodie, only reservable before the
  launch, separate from the Base Collection. Idea only – discuss before anything is built.
- Discussed 24 Oct, not planned: ripple on button press (Material/Google look; the 97% press is
  enough), search bar and filter on Products (only 6 products; a filter maybe later as 2–3
  category buttons).

## 8. Header & footer

- Semantic `header` > `nav aria-label="Main navigation"` > `ul` > `li`. Nav: Products · Brand ·
  Contact · Pack. Logo → Home.
- Background Dark Obsidian, Charcoal bottom line. **Photo pages** (see next point): 5% → solid
  over the first 200px of scrolling (`--header-fade-distance`); only the background fades.
  Pages without a top photo: solid.
- **Photo header rule (decided 24 Oct): every page that starts with a photo** has the same top
  as Home – full width, height `--hero-height` (`min(45rem, 90svh)`, in `global.css`), photo
  under the transparent header (5% → solid), dark fade on top (`.top-fade`). The page goes into
  `photoHeaderPages` in `Header.astro`. Photo focus per photo (Products: `center 70%` – between
  centre and bottom, the forest always shows, the skyline is optional). The split screen stays Home only.
- **Hides on scroll down, shows on scroll up** (threshold, no jitter) – built. Never hides while
  the menu/submenu is open or focus is in the header. No slide with reduced motion.
- **Product detail pages: never hide** (Pack stays visible) – decided, not built yet.
- Height 64px on all screens, logo 32px (decided 24 Oct – the code is the standard; the larger
  sizes from the design file looked too big on real screens).
- Nav: Geist 500, 16px, uppercase, `--tracking-nav` 0.04em. Inactive Weathered Bone; active
  **bold Egret**, no layout shift, no marker; hover Wild Honey. "Products" active on `/products/*`.
- Bag button: 40px high, 24px backpack icon (Dardan's drawing), "Pack" label (was "Bag" until
  25 Oct; the page is still `/bag`), 12px corners,
  Flint outline, Obsidian fill, Weathered Bone. Fades in with the header on Home. Hover (decided
  24 Oct): smoked glass like the bear – blur, 45% Dark Obsidian tint, Egret 25% edge, Egret text,
  only a tiny shadow (must stay inside the header, never reach the hero). Normal state unchanged.
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
- Height `--hero-height` (`min(45rem, 90svh)`, same as every photo header); everything inside scales with it.
- OPEN: text overlaps the bear at 1280px; mobile/touch version; Safari (Mac) check; larger
  downloads of the hero photos (then re-check header readability + top gradient over them); final CTA text (direction "Discover the collection") + position –
  always visible, never hover-only.

## 10. Products & product images

Six products: **T-shirt · Hoodie · Half-zip (male + female version, same product) · Rain jacket
· Beanie · Buff**. Products live in `src/content/products/` – see "Product folder system" below (not built yet).

- **Real** (bought and photographed by Dardan): hoodie, half-zip, beanie, rain jacket.
  **AI** (Gemini): T-shirt, buff.
- Rain jacket = Dardan's own Carinthia jacket, Carinthia logo removed, Cave Wear logo added.

### Product concept (design intent, decided 24 Oct)

- **Fit:** drop shoulder, longer body – worn loose or tucked in ("military tuck") for a sharper look.
- **Chest logo:** the normal bear logo, standard size, on the wearer's left chest (right side in
  the photo). Tone on tone: a little lighter than the fabric (decided 24 Oct; on black a
  darker logo disappears), matte, subtle – you notice it, it doesn't shout.
  **Hoodie exception (decided 25 Oct):** the bear sits centred on the chest, between the
  drawstrings.
- **Sleeve:** "CAVE·WEAR" wordmark (with the centre dot, as in the stacked logo: bear on top,
  wordmark, "Rugged. Functional. Refined.") near the end of the right sleeve. OPEN: exact
  position – Dardan shows it; stacked logo file still to send (not in the repo).
- **Decoration (vision):** T-shirt printed · hoodie embroidered · rain jacket thin silicone 3D
  heat transfer (only slightly raised, so nothing can get pulled off; no embroidery – it would
  pierce the waterproof fabric) · beanie in the style of a beanie Dardan loves (TAC VRK), picture
  follows. OPEN: half-zip front logo (embroidered?), buff, what goes on the rain jacket's back.
- **Seams (T-shirt, decided 24 Oct):** flatlock (flat band of zigzag stitching, from military base
  layers) on shoulder, armhole, side and underarm seams – the shoulders because backpack straps sit
  there. Black thread, tone on tone, only visible up close. Hem, sleeve ends, collar: normal clean stitch.
- **Neck labels:** pieces worn on bare skin (T-shirt, hoodie, half-zip) get a printed, tagless
  label with only size · Cave Bear logo · cavewear.de (so people always know where to get one).
  Dardan redoes the label file. Rain jacket: a normal sewn-in neck label, in black.
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

### Product folder system (decided 25 Oct)

- **Built 25 Oct (no page uses it yet):** `src/content/products/` with `README.md` (guide for
  anyone adding a product), `_template/` (blank, skipped by the build) and `core-tee/` (example).
  Rules + error messages in `src/content.config.ts`; colour list `src/data/product-colours.js`.
  Photo names: `shot_0_<product>` and `shot_<1–5>_<product>_<colour>_<fit>` (proposed by Claude,
  used in the README – Dardan to confirm). Dardan's originals stay outside the repo; Claude
  crops them to exact 4:5 and converts to webp.

- One folder per product: `src/content/products/<id>/` = one text file + the photos. Folder name =
  web address (`/products/<id>`) + favorite id – never rename. Card, product page and breadcrumb
  all read from this one file; nothing is typed twice. Presentation point: workflow for
  repetitive maintenance (change a price in one file → the whole site follows).
- Text file fields: name (typed normally – the product page shows it uppercase via CSS) ·
  tagline · description · price (number only) · collection ("Base Collection" / "Supporter
  Collection") · sizes · fits (unisex / female / male) · colours · shot descriptions shot 0–5
  (alt texts; name, colour and fit are added automatically) · Design & Purpose · Fit &
  Silhouette · Materials (Dardan always writes these as vision).
- Photos, all 4:5: **shot 0** = real photoshoot picture, any one colour – never changes.
  **Shots 1–5** = mock-ups, one set per colour (and per fit if the product has more than one):
  1 always front, 2 always back, 3–5 close-ups (vary per product, described in the text file).
- Product colours: one shared list (name → hex) in `src/data/`; text files use the names only.
- Build safety net: missing field or unknown colour/collection → build stops and names the file.
  Missing photo → placeholder + warning (photos are still being made).

### Product card (decided 25 Oct)

- The card stays exactly as it is. Only additions: **fit icons** top left – same smoked glass
  as the heart but smaller and more subtle. Default photo shot 0, hover photo always shot 1
  (first colour).
- **Clicking (decided 25 Oct, replaces "fit icons not clickable"):** the **whole card** opens the
  product page (default colour + fit). A **colour dot** opens it with that colour selected, a
  **fit icon** with that fit selected. The heart stays a button (saves the favorite, no page change).
  Built as a "stretched link" (the name link covers the card; dots, fit icons and heart sit above
  it) – a link inside a link isn't allowed in HTML.
- Fit icons: Dardan's three SVGs (circle + symbol). Circle and colours via CSS; the symbol keeps
  its place inside his circle's box, so the ring – not the whole symbol – is centred.

### Product page (Dardan's "System Integration" mockup, decided 25 Oct)

- **Step 1 built 25 Oct:** `src/pages/products/[id].astro` (one page per folder) + reader
  `src/data/products.ts`. Layout, photos, texts, sticky column, heart (shared `.favorite-button`
  in `global.css`), header pinned (`data-pinned`). Gallery 1 front | 3 / 4 | 2 back, 5 big.
  Content max 960px wide (as in the mockup). Selected states are TEMPORARY.
  **Step 2 built 25 Oct:** colour/fit switching (`src/scripts/product-options.js`, reads
  `?colour=` / `?fit=` from the address). Products page cards now come from the folders
  (placeholders only for products without a folder, not clickable); card = stretched link.
- **Selected look (decided 25 Oct, from 3 versions):** chosen size and fit = Weathered Bone
  fill + Egret outline + dark text/symbol; chosen colour dot = Egret ring (1px, 2px gap).
  Not Wild Honey – that stays for actions, links and the focus ring.
- **Quantity (decided 25 Oct, version A of two):** compact [ − | number | + ] (3 × 38px) left
  of "Add to pack", which fills the rest of the line; 1–10 (`src/scripts/quantity.js`).
  − and + Weathered Bone, number Egret, no fill. Label "Quantity:" only for screen readers.
  Lines exactly like the size boxes: Flint background through 1px gaps + 1px frame (each line
  drawn once). A version on the size grid with the "chosen" fill was tried and rejected.
- **Photo viewer (Dardan's mockup, built 25 Oct, untested by Dardan):** click any gallery
  photo → full-screen `<dialog>`, Dark Obsidian; product name on top; big photo 70% of the
  screen height, neighbours 82% and a tiny bit dimmed (brightness 0.9), peeking in at the
  edges; ‹ › glass tabs on the photo edges; close = style-guide `.icon-button` on the bottom
  edge. Shows shot 0 + shots 1–5 of the chosen colour/fit, loops. ← → keys, Escape, click on
  the dark area closes. **Zoom:** click the big photo → zooms inside its frame only, mouse
  looks around, click again zooms out; max zoom = photo's real width ÷ shown width, never
  above 2.5× and not at all below 1.25× → never visible pixels. Browser zoom is not blocked
  (accessibility). `src/scripts/photo-viewer.js`. Mobile/touch (swipe, pinch) = later phase.
- **"Add to pack" disabled until everything is chosen (decided 25 Oct):** starts with the
  standard disabled look (50%, not-allowed cursor); `product-options.js` switches it on once
  size, fit and colour are chosen. Fit/colour default to the first option, so in practice it
  waits for the size. A product with only one size has it pre-chosen.
- **Sticky (final, 25 Oct):** the whole column always sticks 24px below the header – its top
  (the name) is never hidden. Replaces the "smart sticky" bottom mode and the separately sticky
  name (both tried and removed the same day).
- **Compact column (version B of a comparison, decided 25 Oct):** blocks 16px, labels 8px,
  accordions 12px, description in Small (14/20), Fit and Color side by side under Size,
  "Learn more ›" on its own line under "Preliminary Price Estimate." (changed back 25 Oct).
  Column ~810px; "Add to pack" ends ~695px from the top of the screen → visible on normal laptops.
- Breadcrumb: Muted Stone; the current page one step lighter (Weathered Bone) – decided 25 Oct.
- Second product: `field-hoodie` (The Field Hoodie, black + egret). Its shot 0 is a placeholder
  without licence info → local only (`.gitignore`), like the Core Tee's.

- Copy the mockup's layout; all spacing, type and colours from the style guide (mockup sizes are
  rough). Header never hides here (see 8). No photo header.
- Breadcrumb: Products › collection › product name. Two columns.
- Left: shot 0 big (heart top right), 2×2 grid of shots 1–4, shot 5 big. Front and back sit on the
  **diagonal** – two shots that blend into the background never share a column.
- Right column is **sticky** (stays while the photos scroll): name (stays the `<h1>` tag for
  screen readers and Google, but looks like **Geist uppercase in the H2 size – not Barlow
  Condensed**, decided 25 Oct: cleaner; weight Medium 500 – the lighter mockup weight, decided 25 Oct), tagline,
  description · line · price, German format ("35,00€") + "Preliminary Price Estimate." +
  "Learn more" · line · Size · Fit · Color · line · "Add to pack" (`.button-primary`, full width,
  12px corners) + "No payment – reserve your place for the launch." · accordions Design &
  Purpose, Fit & Silhouette, Materials – **all closed by default**.
- Colour click swaps shots 1–5 (shot 0 stays). Female/male click swaps shots 1–5 the same way;
  both combine (e.g. brown + female → the brown female shots).
- Everything not colour-coded in the mockup is the same on every product page.
- "Learn more" → later straight to the pricing question + answer in the FAQ on `/contact`.
  No target until the FAQ exists – remind Dardan (no dead links at launch).
- **"Size chart and fit guide ›" (decided 25 Oct):** text link right under the size boxes
  (left-aligned). Later straight to the size chart / fit question + answer in the FAQ –
  same as "Learn more": no target until the FAQ exists.
- OPEN: grid order of shots 1–4 (mockup numbers vs. "2 = back"), photo file names, one-size
  products (beanie, buff), selected state of size/fit/colour (comparison versions).

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
- Never outline on a photo, never glass on flat dark. Sentence case, **one size for every
  button: 40px high, 14px medium** (decided 24 Oct). Bigger or smaller only where Dardan asks.
  Pressed 97% (off with reduced motion). Reference: `/styleguide`.

### Cards & glass
Every card = the hero bear's **smoked glass**: blur 12px, saturate 1.2, brightness 0.9 + Dark
Obsidian 45% tint + fading Egret edge + soft shadow. No coloured cards. Text must pass WCAG.
Exception: a whole section may be Irr Olive (conservation); cards inside stay glass.
PROPOSED (not decided): glass only where an image or content is behind it (hero, cards over
photos, maybe the bag panel); flat Obsidian surface elsewhere – on flat Dark Obsidian the blur has
nothing to blur. Next step: comparison on `/styleguide` (glass vs flat × on photo vs on flat dark),
then Dardan decides.

### Typography
- **Geist** (variable) – body, UI, nav. **Barlow Condensed Bold 700** – H1/display only,
  uppercase, line height 0.9, 48–128px `clamp`, max 12ch. Never another weight.
  Exception: the product name on product pages is Geist (see 10, decided 25 Oct).
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
- **When the FAQ is finished:** remind Dardan, then link "Learn more" (pricing) and "Size chart
  and fit guide" on the product page to their FAQ questions (see 6, Contact).
- Netlify form notifications → info@cavewear.de.
- Newsletter double opt-in + Reserve confirmation email (Netlify Function).
- Product details, donation model, weather → product mapping.
- Home sections + final CTA; Brand page sections, then submenu + jump links.
- Ideas to build later (see 7): page fade, flying product photo, logo story section, weather
  strip/card. Glass comparison on `/styleguide` (see 11).
- Hero at 1280px, mobile version, Safari check. Card radius.
- Delete `/styleguide` and its footer link before launch. DNSSEC at the very end.

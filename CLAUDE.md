# CLAUDE.md – Cave Wear

Project memory for Claude. Read this fully at the start of every session.

## 1. The project in one paragraph

Cave Wear is a fictional premium outdoor/everyday clothing brand by **Dardan Ademi**.
The website is his portfolio piece for a **Brand & Content Designer** role at **Linro**
(a cybersecurity company). Deadline: **11 November 2026** – a one-hour presentation of
the site, its design/UX, the code and his decisions. The goal is not a big site but a
small one that feels exceptionally well considered, works reliably, and that Dardan can
fully explain.

Brand language: **Rugged. Functional. Refined.** Outdoor capability that also looks right
in the city, at a bar, at a family dinner. Dark, minimal, premium, subtle military influence.
Strength without aggression, premium without flashy luxury. The Cave Bear is the symbol
(strength, endurance, resilience) – use it with intent, never as decoration everywhere.

## 2. Who you are working with – read this

- Dardan is the **creative director and decision-maker**. Claude is the technical
  implementation partner.
- Background: trained Medientechnologe Digitaldruck (digital printing), production
  management, strong in CorelDRAW, GIMP, Photoshop. Not a formally trained media designer.
- Code level:
  - HTML/CSS: finished The Odin Project foundations. Uses modern CSS (logical properties,
    Grid, Flexbox, nesting, range media queries). Explain new CSS concepts briefly.
  - JavaScript: **beginner** (variables, types, operators, strings). Explain every JS
    feature step by step while building it. Never dump large JS files without explanation.
  - Git/Astro: new. Guide through commands.
- Communication: direct, practical, clear next steps. No long theory, no lists of optional
  technologies. He writes in English with a German background – keep language simple.

## 3. Working rules (non-negotiable)

1. **Ask before anything that changes how the brand looks** (layout, colours, type, imagery,
   copy tone). Purely technical improvements may be done, but say what and why.
2. **Never build ahead.** Only work on what Dardan asked for. No unrequested pages,
   features or files.
3. **Small steps, each explained.** After each step: what changed, why, how to test it.
4. **Suggest commits** with a short message after each meaningful step.
5. **Presentation notes:** Dardan keeps his own notes folder *outside* this repo. When a
   decision is worth presenting, point it out and give a short ready-to-copy note.
   **Never write or update notes files yourself.**
6. Not every visual problem needs code. If something belongs in Corel/Photoshop
   (logo tweaks, image prep), say so.
7. **No invented facts.** No fake certifications, partnerships, sustainability claims or
   tech specs presented as real. Product info is plausible concept material.
   Conservation: describe donations as *planned*; link bearbiology.org as a normal link –
   never claim a partnership, never use their logo.

## 4. Tech stack & decisions (with reasons)

| Choice | Reason |
|---|---|
| **Astro 7** (minimal template) | Content site → finished HTML at build time, zero JS by default. Header/footer as components instead of copy-paste. Named in Linro's tech list. |
| **No React** | Interactive parts are small; plain JS is enough and is what Dardan is learning. Astro could add a React island later if needed. |
| **Own CSS, no Tailwind** | Own design system (CSS variables) shows design craft. |
| **Plain JavaScript** | Bag, forms, weather, menu. Each feature explained. |
| **Netlify** hosting + **Netlify Forms** | Free, HTTPS automatic. Forms submitted via `fetch` (no page reload). |
| **Open-Meteo** weather API | Free, no API key. Covers fetch / REST / JSON. |
| **Git + GitHub** | From day one. Commit history shows progress. README with dev log. |
| **English only** | Built so German could be added later (mention as next step). |
| **No user accounts** | Deliberate: data minimisation – data you never store can't leak. |
| **No cookie banner** | No tracking cookies used. |

Separation of concerns: structure in `pages`/`components`, design in `styles`,
behaviour in `scripts`, content in `content`. Keep content in HTML/Markdown, not in JS.

## 5. Site structure

**Global:** Navigation: Products · Brand · Contact · Shopping Bag. Logo links to Home.
**Footer (minimal, Linear/Vercel style, built 21 Oct 2026):** on Obsidian with a hairline
on top. Top: small logo → Home · "Built for the wild. Made for anywhere." · "Not released
yet – follow the journey." · Instagram, Threads, YouTube (link still to add in
`Footer.astro` → `youtubeUrl`) · newsletter sign-up (email only, Netlify Forms via fetch,
`src/scripts/newsletter.js`; label "Sign up for the newsletter", note "We'll only email you
when there's real news – the launch, a vote on the next product or a big announcement. No
spam." – the Privacy Policy states the same purpose; keep both in sync).
Bottom (hairline, compact): © year Cave Wear · A concept brand by Dardan Ademi ·
Impressum · Privacy Policy. No email icon, no pop-up, no bearbiology.org link (moves to
the Brand page). **Dark mode only – no light mode.** (No Kickstarter.)

1. **Home** – brand intro, featured products, short conservation overview, call to action,
   weather strip ("Field conditions").
2. **Products** – overview, product detail pages, shopping bag (items, quantities, total),
   optional planned donation, **Reserve** (no payment).
3. **Brand** – story & origin, identity & purpose, conservation commitment, transparent
   explanation of the donation approach.
4. **Contact** – contact info, contact form (really sends), FAQ.
5. **Impressum**, **Privacy Policy**, **404 page**.

## 6. Features

- **Mobile menu** (first JS feature – simplest).
- **Shopping bag**: add/remove, quantities, total, optional planned donation, persists in
  the browser (localStorage). Ends in **Reserve**: name + email + bag contents sent via
  Netlify Forms. Confirmation: *"Your items are reserved. No payment now. We'll notify you
  at launch."* Must be honest – no checkout, no payment.
- **Contact form**: Netlify Forms via fetch, client-side validation, clear feedback.
- **Weather strip** (Open-Meteo): own "soft ask" first – *"Show today's conditions for your
  location?"* [Use my location] [Show Regensburg]. Browser permission only after the click.
  Declined/unavailable → **Regensburg** fallback. Shows weather + a matching product
  suggestion (mapping still to be decided). Mention location → Open-Meteo in privacy policy.
- **Home hero**: split screen *Built for the wild / Made for anywhere* (hover reveals a side
  on desktop), with subtle parallax as support. Needs a separate touch/mobile version.
  **Built (22 Oct 2026), live on Home:** `src/components/HeroSplit.astro`.
  Forest photo left, city photo right (`src/assets/hero/hero-wild.jpg`, `hero-anywhere.jpg`),
  cut along the same diagonal as the bear logo. The logo bear sits centred on the cut.
  Hover a side → the other side goes black, that half of the bear becomes outline only,
  headline + short text appear on the dark side. No button (informational only).
  Hidden H1: "Built for the wild. Made for anywhere." Soft dark gradient at the top for
  header readability.
  **Bear style: smoked glass** (decided 22 Oct 2026 after comparing no glow, glows, clear,
  frost, smoked, olive, amber and logo-colour versions). Clear felt too trendy, amber
  competed with Wild Honey.
  Still open: final photos (licence + photographer, Nike logo on the forest photo,
  larger downloads), "ANYWHERE" headline touching the bear, mobile version.
- Basic animations only, always respecting `prefers-reduced-motion`.
- **Selective scroll snap** (CSS only, `proximity`, never `mandatory`): only on the few key
  moments – hero, main call to action, max. one more. Everything else scrolls freely.
  Also used for the product image gallery and the mobile product row.
- **Follow the journey** (build in public): progress timeline with real milestones only
  (stored in a small data file, easy to update) + Instagram/Threads links. Main place: Brand
  page. Short teaser on Home (possible snap moment). One line near "Reserve" on Products.
  Links only – no embedded social feeds (no third-party scripts/cookies).

## 6b. Header & navigation (decided 18 Oct 2026)

Goal: subtle, premium navigation. Blends into the hero on Home, becomes readable
almost immediately when scrolling starts, always accessible.

### Background (transparent → opaque)
- **Home only:** at the very top the header background is almost invisible (~5% Obsidian),
  so the hero shows through. The hero sits *under* the header on Home.
- After a small scroll (~24–32px) the background **fades** (~0.3s) to solid Obsidian.
  Back at the top it fades out again.
- **Only the background** fades. Logo and links stay fully visible at all times (contrast).
- All other pages: opaque from the start.
- Detect scrolling with `IntersectionObserver` (no scroll listener for this part).
- Hero readability: test once the real hero image exists. If needed, a soft gradient
  at the top of the image – never a visible grey block.

### Hide on scroll down / show on scroll up
- Separate system from the background fade.
- Hide only after scrolling a bit (threshold, no jitter on tiny movements).
- Never hide while the mobile menu or the Brand submenu is open, or while keyboard
  focus is inside the header.
- When it reappears, the background is already opaque.
- **Product detail pages (`/products/*`): never hide.** Reason: the Bag (and its count)
  stays visible while people look at products and add them.
- `prefers-reduced-motion`: no slide animation.

### Active page
- Inactive links: Weathered Bone, normal weight. Active link: **bold**, Egret.
- **No square marker** (removed – looked dated).
- Bold must not shift the layout (reserve the bold width).
- "Products" is also active on product detail pages (`/products/...`).
- Same look in every state: transparent, opaque, open, reappearing.

### Brand submenu (the only submenu)
- Only **Brand** has a submenu, marked with a small chevron. Products, Contact = plain links.
  Home = the logo. **No mega menu.**
- Why: the Brand page is the longest page with different topics. The submenu shows all
  topics up front, so visitors jump to what interests them instead of leaving.
- Items are **placeholders** until Dardan decides the Brand sections. They live in one
  list in the code, so changing them = editing one line.
  Placeholder items: Brand overview · The Idea · The Cave Bear · Conservation · The Journey
- Clicking "Brand" opens/closes the submenu (button with `aria-expanded`). On devices
  with hover, hover opens it too (small delay before closing). Escape and click outside
  close it. Works with touch and keyboard. Disclosure pattern – not `role="menu"`.

### Jump links
- Submenu items link to sections: `/brand#cave-bear` etc.
- Same page: smooth scroll via CSS. From another page: the page opens at the top, then
  scrolls smoothly to the section (small JS, ~5–8 lines).
- `scroll-margin-top` so headings don't land under the header.
- `prefers-reduced-motion`: jump directly, no scrolling.

### Mobile
- Menu button top-right. **Bag stays visible** next to the menu button.
- Brand submenu becomes an accordion inside the mobile menu.
- Everything works with touch, nothing depends on hover.

### Structure
- Semantic `header` > `nav aria-label="Main navigation"` > `ul` > `li`.
- All header sizes and spacing on the 4-pt grid (`--space-*`).
- JS in small, separate, explained parts.

### Build order (one step at a time, commit after each)
1. Spacing scale + header on the 4-pt grid + new active style (CSS)
2. Mobile menu (first JS feature)
3. Background fade on scroll
4. Hide/show on scroll + product page exception
5. Brand submenu
6. Jump links with smooth scroll

## 7. Products (details still open)

Four products, each with the decoration technique that fits it (a story only Dardan can tell):

| Product | Technique |
|---|---|
| T-shirt | Print (screen print / DTG) |
| Hoodie | Print or chest embroidery |
| Beanie | Embroidered bear (matches the stitching video) |
| Buff | All-over sublimation (digital print – Dardan's trade) |

Names, prices, sizes, colourways, descriptions and the donation amount: **ask Dardan**.
Products will live as Markdown files in `src/content/products/`.

## 8. Design system

### Colours (final – use only these, via CSS variables)

| Role | Name | Hex |
|---|---|---|
| Background | Dark Obsidian | `#0D0D0E` |
| Surface (header, footer, bag) – cards use smoked glass, see "Cards & glass" | Obsidian | `#131314` |
| Line / divider | Charcoal | `#1E1E1E` |
| Input border | Flint | `#6B655E` |
| Main text | Egret | `#F3EBE0` |
| Secondary text (prices, details) | Weathered Bone | `#C4B9AC` |
| Quiet text (small labels, footer) – only on Dark Obsidian/Obsidian | Muted Stone | `#8C857B` |
| Accent (buttons, links, focus, bag count) | Wild Honey | `#C39132` |
| Accent hover | Amber Gold | `#D4A54A` |
| Text on accent | Dark Obsidian | `#0D0D0E` |
| Brand support (conservation areas, large surfaces only) | Irr Olive | `#4B573E` |
| Success (icon/border only) | Forest Fern | `#5B7553` |
| Error (icon/border only) | Terracotta | `#B86B43` |
| Logo dark brown | Moule | `#382D2B` |
| Reserve (no role yet) | Tobacco Brown / Alpine Oak / Mossy Elm | `#9A7354` / `#AE946B` / `#5E6D4E` |

Usage rules (all checked against WCAG):
- **Status messages:** colour only on the icon / left border; the message text is Egret.
- **On Irr Olive areas:** text in Egret only (Weathered Bone fails there).
- **Form fields** on Dark Obsidian or Obsidian, not on Charcoal.
- One accent only – Wild Honey marks everything clickable.
### Above the fold (rule, 22 Oct 2026)
- The above-the-fold section of a page (e.g. the Home hero) is **never taller than 90% of the
  viewport height** – it is a maximum, not a fixed size. Home hero: 720px, capped with
  `min(45rem, 90svh)`, so on short screens the next section still peeks in at the bottom.
- Everything inside the hero (e.g. the bear) scales with its height, so the layout stays the
  same when the cap kicks in.

### Spacing – 4-point grid
- Every size and space is a **multiple of 4px**: margin, padding, gap, component heights/widths
  (buttons, inputs, icons), and **line heights**. Use only the `--space-*` scale (in rem,
  1rem = 16px), never random values:
  `--space-1` 4px · `--space-2` 8px · `--space-3` 12px · `--space-4` 16px · `--space-6` 24px ·
  `--space-8` 32px · `--space-12` 48px · `--space-16` 64px · `--space-24` 96px
  (the number = how many 4px units).
- Why: consistent rhythm (like a baseline grid in print), fewer arbitrary decisions, clean
  rendering on 1.5×/2× screens (odd values cause half-pixel blur).
- Measure spacing from the element's **box** (bounding box), not from the text baseline.
- Order of work: page margins first → component sizes → spacing between them.
- Allowed exceptions: 1px borders/lines, `clamp()` font sizes, and spacing that results
  automatically inside a component (e.g. text centred in a 48px button). Follow the grid until
  it gets in the way – then break it deliberately, not by accident.

### Cards & glass (decided 22 Oct 2026)
- **Every card uses the same smoked glass as the hero bear.** No coloured cards, no
  card-by-card decisions. Colour comes from the content (photos, text), not the card.
- Smoked glass = the background behind is blurred (12px, saturate 1.2, brightness 0.9) +
  a dark tint on top (Dark Obsidian at 45%) + a light edge (Egret, fading) + a soft shadow.
  Reference: the bear in `src/components/HeroSplit.astro`.
- On a plain dark page there is little behind a card to blur, so the glass reads as a
  dark surface – it shows most over photos. Text on glass must still pass WCAG contrast.
- Same element type = same radius and same border everywhere (card radius still to decide).
- Exception: a whole **section** may be Irr Olive (conservation); cards inside it keep the
  same smoked glass.

### Corners
- **Default is sharp (0).** Rounding only where Dardan decides it, per element.
  Never round something "because it looks nicer" without asking.
- **If something is rounded:** normal rounded corners (circular, CSS `border-radius`).
  Works in every browser. No squircle / `corner-shape`, no chamfers, no mixed styles.
- **Only values from the scale** (on the 4-pt grid), as CSS variables:
  `--radius-sm` 4px (inputs, small tags) · `--radius-md` 8px (cards) ·
  `--radius-button` 12px (every button) · `--radius-lg` 16px (large images, big containers) ·
  `--radius-full` 9999px (only for real circles / pills, e.g. a badge, round icon buttons).
- **Same element type = same radius** everywhere on the site.
- **Nested corners:** an inner element's radius = outer radius − the space between them
  (e.g. card 16px with 8px padding → image inside 8px), so the curves run parallel.
- **Buttons (decided 22 Oct 2026): 12px for every button** (`--radius-button`) – filled,
  outline, compact, glass, the header Bag button, the footer "Sign up" button. Chosen from a
  4px → pill comparison in the style guide: modern and Mac-like, but still solid next to the
  sharp cards and the hero cut; looks the same at 48px and 40px. Icon-only buttons are round.
- **Currently rounded (decided):** all buttons (12px, see above). Inputs (4px). Style guide
  swatches and code boxes (4px = `--radius-sm`).

### Typography
- **Geist** (variable) – main font for all body text, UI, navigation.
- **Barlow Condensed Bold** – H1 / big display headlines only (`--font-display`), uppercase.
  One file, one weight (700) – never use another weight with it. Replaced Tusker Grotesk
  (Tusker removed from the project).
- Fonts are **WOFF2** in `public/fonts/` (`Geist-Variable.woff2`,
  `BarlowCondensed-Bold.woff2`), defined in `src/styles/global.css`. Originals stay outside
  the repo.
- Headline sizes with `clamp()` – must never clip on mobile. Body text ≥ 1rem, readable weight.
- Licence: Geist and Barlow Condensed are both free (SIL Open Font License) – fine for launch.

### Logo
- Files in the project (only what is used): `src/assets/logo-horizontal.svg` (uses
  `currentColor` – inlined in header + footer, coloured via CSS) and `public/logo/bear-light.svg`
  (the hero's glass mask). The other cleaned versions (`bear-dark`, `logo-stacked-dark/light`,
  `logo-horizontal-dark/light`) were removed on 22 Oct 2026 because nothing used them –
  get them back from Git history or Dardan's design folder when needed.
- The two-tone bear's head (Moule `#382D2B`) has only 1.5:1 contrast on Dark Obsidian.
  On the dark site use the single-colour versions; two-tone only on cream or at large size.
- Favicon: done – set in `public/` (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`,
  `icon-192.png`, `icon-512.png`, `site.webmanifest`), linked in `BaseLayout.astro`.

## 9. Quality requirements (from the brief)

- Semantic HTML; one `<h1>` per page; no skipped heading levels; header/main/footer inside `<body>`.
- Works on mobile, tablet, desktop, ultrawide. No horizontal overflow.
- Keyboard accessible, visible focus states (`a:focus-visible`, not on the SVG inside).
- Icon-only links need `aria-label`. Meaningful `alt` texts.
- Respect `prefers-reduced-motion`.
- Forms and buttons give clear feedback.
- All links work. No placeholder links in the final site.
- Performance: optimised images (Astro image handling), no oversized assets, no
  unnecessary scripts. Video: short loop, no audio, small file, poster image.
- Images: product shape 4:5, wide images 16:9. Placeholders until real photos exist.
  Stock/Wikipedia photos need licence check + credit.

## 10. Folder & workflow

- Project: `D:\project\cave_wear_web` (Astro root, Git repo, on GitHub).
- Dardan's design files live outside the repo in `cave-wear-design/`.
- Terminal: VS Code integrated terminal (PowerShell) in the project folder.
- Run locally: `npm run dev` → http://localhost:4321
- Claude Code in VS Code runs in **Manual** permission mode – every edit is reviewed.
- Git: one branch, **`main`** (default on GitHub, repo `DirtyDardy/cave_wear_web`, public).

### Deployment (live since 21 Oct 2026)
- **Netlify** project `cave-wear-concept` → **https://cave-wear-concept.netlify.app** (public).
- Every push to `main` builds and goes live automatically (~1 min). Rollback = one click in
  Netlify → Deploys. Branches can get preview links.
- Build: `npm run build`, publish folder `dist`. Environment variable **`NODE_VERSION=24`**
  (project needs Node ≥ 22.22).
- **Only what is in Git reaches Netlify.** Anything in `.gitignore` (e.g. `src/assets/test/`)
  exists only locally – never import from there. Before a risky push: test with a fresh
  clone (`git clone` → `npm ci` → `npm run build`).
- **Netlify Forms:** form detection is enabled. A new form only works after a deploy with
  detection on (Netlify then removes `data-netlify="true"` from the live HTML – that's the
  check). Submissions: Netlify → Forms. Locally, `newsletter.js` shows a test-mode message.
- Name check: "CAVEWEAR – Underground Tech Fashion" exists (cavewear.netlify.app) – do a
  DPMA/EUIPO trademark check (class 25) before buying a domain or a real launch.

## 11. Still open (ask, don't assume)

- Product details and donation model.
- Weather → product suggestion mapping.
- Domain + email address (form recipient).
- Impressum details (Dardan will use his real address).
- Custom domain (planned: `cavewear.de` + mailbox, e.g. at all-inkl) – connect to Netlify
  via DNS, then form notifications to the new address.
- Final home page concept after prototyping.
- **Home call to action** (placeholder since 22 Oct 2026): a button labelled "Call to action"
  sits centred right under the hero (`src/pages/index.astro`, links to `/products`).
  Decide later, once Home has more sections: final text (direction: "Discover the
  collection" → Products), exact position, and whether a short line goes with it.
  Must stay always visible – never hover-only (fails on touch screens).
- **Safari (Mac) check of the Home hero** – Dardan: "doesn't look good on Safari" (22 Oct
  2026, live site). Seen in his screenshot: header (logo + nav) not visible at the top, hero
  taller than the window (live site did not have the 90% cap yet). Re-test on Safari after
  the next deploy, ask Dardan what exactly looks wrong, then fix.
- **Button design** (all buttons site-wide): Dardan wants it closer to Apple's UI (Linro
  works on MacBooks). **Corners decided: 12px.** Still open: colours/roles (Wild Honey vs.
  smoked glass), text style (sentence case vs. uppercase). Proposals live in
  `src/components/ButtonProposals.astro` on `/styleguide`.

## 12. Nice to have (only when there is time – not a priority)

- **Open backpack icon** (`backpack-open.svg`): a second version of the backpack icon,
  drawn by Dardan in the same style (same grid, same line thickness). When and where it
  shows (e.g. when the bag has items, or on hover) is still to decide.

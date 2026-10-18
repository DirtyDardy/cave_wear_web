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
Footer: Instagram (`info.cave.wear`), Threads, email, link to bearbiology.org,
Impressum · Privacy Policy. (No Kickstarter.)

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
- **Home hero**: split screen *Built for the wild / Built for anywhere* (hover reveals a side
  on desktop), with subtle parallax as support. Needs a separate touch/mobile version.
  Prototype both variants in the browser and let Dardan decide.
- Basic animations only, always respecting
- **Selective scroll snap** (CSS only, `proximity`, never `mandatory`): only on the few key
  moments – hero, main call to action, max. one more. Everything else scrolls freely.
  Also used for the product image gallery and the mobile product row. 
  - **Follow the journey** (build in public): progress timeline with real milestones only
  (stored in a small data file, easy to update) + Instagram/Threads links. Main place: Brand
  page. Short teaser on Home (possible snap moment). One line near "Reserve" on Products.
  Links only – no embedded social feeds (no third-party scripts/cookies).
`prefers-reduced-motion`.

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
| Surface (header, footer, cards, bag) | Obsidian | `#131314` |
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

### Typography
- **Geist** (variable) – main font for all body text, UI, navigation.
- **Tusker Grotesk 5800 Super** – H1 / big display headlines only. Single weight: never
  set `font-weight` on it.
- Fonts to be converted to **WOFF2** before use (originals are TTF).
- Headline sizes with `clamp()` – must never clip on mobile. Body text ≥ 1rem, readable weight.
- Licence note: Tusker's web licence is unclear; acceptable for the short demo,
  replace before any official launch.

### Logo
- Files (cleaned SVG, Corel leftovers removed): `bear-dark/light`, `logo-stacked-dark/light`,
  `logo-horizontal-dark/light`, and `logo-horizontal.svg` (uses `currentColor` – inline it in
  the header and colour it via CSS).
- The two-tone bear's head (Moule `#382D2B`) has only 1.5:1 contrast on Dark Obsidian.
  On the dark site use the single-colour versions; two-tone only on cream or at large size.
- Favicon: round bear icon → later as SVG favicon.

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

## 11. Still open (ask, don't assume)

- Product details and donation model.
- Weather → product suggestion mapping.
- Domain + email address (form recipient).
- Impressum details (Dardan will use his real address).
- Netlify account setup (when deploying).
- Final home page concept after prototyping.

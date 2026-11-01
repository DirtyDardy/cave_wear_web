# CLAUDE.md – Cave Wear

Project memory for Claude. Read fully at the start of every session. Updated 31 Oct 2026.
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
    = a normal link, never a partnership, never their logo. Never name Carinthia or copy its specs
    – **one exception (Dardan, 1 Nov):** the credit in the All-Weather Shell's Design & Purpose
    ("Its design reference is the Carinthia PRG jacket … not affiliated with or endorsed by
    Carinthia"). Nowhere else, never its logo, specs or material claims.
11. When replacing something, remove the old version. Project-wide cleanups only when asked.
12. Hosting/DNS/accounts: click-by-click numbered steps. Dardan sends a screenshot before every
    final confirm button; Claude checks it first. Claude never handles passwords.
13. **Desktop first.** Mobile polish is a later phase. **But always mobile-minded (27 Oct):** plan
    every new part so it can also look good on phones (no widths that break, check it at 375px).
    Why: learn the fundamentals on desktop first, then build a satisfying switch between phone
    and desktop where both look good. **The Pack's CSS is written mobile first** (27 Oct, Linro
    lists "mobile first"): base styles = phone, `@media (width >= …)` adds desktop – like
    `global.css`. Designing and testing stay desktop first. One direction per component, never both.
14. Claude can't generate images: Claude writes prompts and checks results; Dardan generates in
    Gemini and finishes in Photoshop.
15. **Read change requests in the smallest sense** (learned 25 Oct): "sync the look" meant the
    same line thickness and colour – not a redesign. If a request can mean a small or a big
    change, do the small one or ask first. Comparisons work best as a temporary `?version=`
    switch on localhost + screenshots; the switch is removed right after the decision.
16. **iPhones too (Dardan, 30 Oct):** every mobile change must also work on iPhones. On an
    iPhone every browser runs on Apple's WebKit – "works in Chrome on Android" proves nothing
    (the header bug of 30 Oct only happened on iPhones). When planning a new part, say in one
    line what could act differently on an iPhone. Nothing is changed just for Safari unless
    Dardan decides it – say what, where and why. Checklist + findings: memory "iPhone / WebKit
    checklist". Real tests on his girlfriend's iPhone (Dardan has none, Claude can't run iOS).

## 4. Tech stack

| Choice | Reason |
|---|---|
| **Astro 7** (minimal) | Finished HTML at build time, zero JS by default, components. In Linro's tech list. |
| **React where it's the right tool** (decided 26 Oct) | Use React only where it benefits the site and shows real understanding – not everywhere. The **Pack** (lots of changing state: items, sizes, quantities, total) – **built 27–28 Oct** (`PackDrawer.tsx`, `ReserveForm.tsx`, see 7). Astro runs it as an "island"; the header count, the product page and the Pack share one list (a small store, e.g. nanostores). Everything else stays plain JS. **Wanted (27 Oct): a second React feature**, so the Pack isn't the only one – a feature where React really helps, or an existing idea reshaped so it does (never React just to have it). Candidate: the weather strip (many states: ask → loading → result / declined → Regensburg / error). OPEN – Dardan decides. |
| **Own CSS, no Tailwind** | Own design system (CSS variables) shows design craft. |
| **Plain JavaScript** | Menu, forms, photo viewer, weather – each explained. |
| **Netlify** + **Netlify Forms** | Free, HTTPS. Forms sent via `fetch` (no reload). |
| **Open-Meteo** | Free weather API, no key. Covers fetch / REST / JSON. |
| **English only** | Built so German could be added later. |
| **No accounts, no cookie banner** | Data minimisation; no tracking cookies. |
| **Dark mode only** | Never a light mode. |

Separation: structure in `pages`/`components`, design in `styles`, behaviour in `scripts`,
content in `content`/`data`. Content stays in HTML/Markdown, not in JS.

## 5. Workflow, deployment, domain, email

- Project `D:\project\cave_wear_web`. Design files outside the repo in `cave-wear-design/`.
- `npm run dev` → http://localhost:4321. Repo `DirtyDardy/cave_wear_web` (public).
- **Git branches (27 Oct):** `main` = the live site. A bigger feature gets its own branch
  `feature/<name>` in its own folder (a Git worktree), merged into `main` together with Dardan,
  step by step. Never "claude" or "ai" in branch names or the site's own files and folders
  (`CLAUDE.md` and `.claude/` are the tool's own files and need those names).
- Netlify project `cave-wear-concept`; every push to `main` goes live (~1 min). Build
  `npm run build`, publish `dist`, `NODE_VERSION=24`. Form detection on.
- **Pushes are limited (26 Oct):** every push = one Netlify deploy, and deploys cost credits –
  5 left this week, Dardan buys more later. So: commit locally all day, **push once at the end
  of a work day**, never for a single small fix. Netlify settings (forms, notifications) don't
  cost a push. Before each push: fresh-clone build test (see next point).
- **Several chats can work in this folder at the same time.** Commit only your own lines: check
  `git diff` per file; if a file also has another chat's changes, stage only your part (never
  their uncommitted work). Their work stays uncommitted for them.
- **Only what is in Git reaches Netlify.** Never import from git-ignored folders
  (e.g. `src/assets/test/`). Risky push → test with a fresh clone (`git clone`, `npm ci`, `npm run build`).
- Replaced image with the same file name → hard reload (Ctrl + F5); the dev server caches images.
- New page shows "not found" on localhost? An old background `astro dev` may still run
  (`.astro/dev.json` shows when it started) → `npx astro dev stop`, then start again. In the
  desktop app Claude starts servers from `.claude/launch.json`: `astro-dev` (4321) and
  `astro-preview` (the built site, 4330).
- **New content file** (e.g. `src/content/faq.yaml`) or a change in `src/content.config.ts` →
  restart the dev server; a running one doesn't see it (learned 26 Oct: the FAQ looked empty).
- **Product photos:** Dardan's originals live in `D:\project\cave_wear_dis\products\<id>\`
  (outside the repo, never in Git). Claude crops them to exact 4:5, max 1600×2000, webp
  quality 85 (sharp, comes with Astro) and saves them in the product folder.
- Claude settings: `.claude/settings.json` (allow/ask lists) + Stop hook `.claude/hooks/check-build.sh`
  (test-builds the site when site files changed).
- New Netlify form works only after a deploy (check: `data-netlify="true"` gone from live HTML).
- **Domain https://cavewear.de** (netcup Webhosting 1000). Main address without www; `www` and
  `http://` redirect to it. DNS: netcup CCP → Domains → cavewear.de → CloudDNS. Netlify = web
  host only; netcup = domain, DNS, email. Don't use Netlify DNS.
- **Mailbox info@cavewear.de** → forwarded to info.cave.wear@gmail.com (copy kept), spam filter,
  virus scan. Gmail "Send mail as" via `mx2f26.netcup.net`, 465, SSL. SPF, DKIM, DMARC `p=quarantine`.
- **Reservation confirmation email – built 28 Oct:** `netlify/functions/submission-created.mjs`.
  Netlify starts it by itself after every form submission that passed its spam check; it only
  acts on the `reserve` form and sends an email – simple HTML + a plain-text copy (approved
  29 Oct) – with nodemailer (`mx2f26.netcup.net`, 465, SSL). **Least privilege (29 Oct):** it
  sends from a separate sending-only mailbox **reservations@cavewear.de** with its own
  password – never with the info@ password; Reply-To is info@cavewear.de. Password only as the
  Netlify environment variable **`SMTP_PASSWORD`** (Production only, marked secret) – Dardan
  types it in himself, never in code. Safety: anyone can
  fake a submission, so the email only goes out when every Pack line has exactly the site's
  format (no dots, slashes or @ in names → no links can be smuggled into a mail from my
  domain); the HTML version also escapes every value.

## 6. Pages & status

- **Global header + footer** – built (see 7 and 8).
- **Home** – hero built (see 9). One button, all screens (decided 30 Oct): **"Discover the
  collection"** (`.button-glass` → `/products`), half over the hero photo's bottom edge, centred
  (so the glass really blurs something): brighter edge + faint Egret fill, one step bigger than
  every other button (see 11). "Explore more ↓" removed – the hero is never taller than 90% of
  the screen, so the next section always peeks in; the button had no job.
  Last section "Questions?" with FAQ (filled → `/contact#faq`) + "Contact us" (outline →
  `/contact#contact-form`).
  Planned: featured products, short conservation overview, journey teaser, weather strip.
- **Products** – overview + product pages built from the product folders (25 Oct, see 10).
  **Collection intros (31 Oct, from 20 questions, version A of two):** under each collection
  title + line a quiet tag line in the product-code style (12px, 300, Muted Stone, uppercase;
  a tag never breaks in the middle). Base: "Tone on tone · Made to last · Built for anywhere" +
  Dardan's text (field briefing, no "we"/"I"), folded away behind the product page's chevron
  button on the right of the title – closed by default on every screen (decided 31 Oct, the
  head then looks like the Supporter one). Supporter: "Pre-launch only · For early
  believers · Conservation planned" + the explanation in the third-column card ("For the ones
  who were here first." … "Coming soon"). **Update when the Supporter design is done:** "bolder
  graphics" and "Coming soon" in the card; "Conservation planned" may become "Supports
  conservation" only once the donation is real. Later: a quiet link to the Brand page.
  Products so far: The Core Tee, The Field Hoodie, The Traverse Half-Zip, The Ridge Beanie,
  The Pass Gaiter, The All-Weather Shell. The Pack is a drawer, not a page (see 7).
- **Brand** – story & origin, identity & purpose, conservation, donation approach, journey
  timeline, bearbiology.org link. Dardan has started the About/Brand content.
  **His texts are collected in `drafts/brand-page.md`** (27 Oct, his exact wording + notes to
  discuss) – use them when building the page. Not part of the site build.
- **Contact** – built 26 Oct (`src/pages/contact.astro`, Dardan's version A sketch). No photo
  header (a tool page, not a showcase). Top to bottom: Bears' Cave coordinates (Peștera Urșilor,
  Romania – 140 cave bear skeletons) · H1 "Contact" · one line + email + "Write to us ↓" ·
  **FAQ** (`#faq`, big heading "Questions") · big heading "Write to us" + 01–03 steps + the form
  (`#contact-form`). A dashed **trail** (CSS scroll animation, off with reduced motion, only from
  1200px) runs from the coordinates to the marker next to "Write to us"; its dashes slide down while scrolling
  ("momentum"). FAQ → "Write to us" gap 192px (`--write-gap`, the trail uses the same value).
  Name stays "Contact"; Impressum stays its own page (not repeated here).
- **FAQ** – 14 questions in 3 groups (The brand · The products · Launch & Pack), all in
  `src/content/faq.yaml` (reader `src/data/faq.ts`, rules in `content.config.ts`). Every
  question is a jump target that opens itself (`src/scripts/faq-open.js`), lands in the middle of
  the screen and gets a thin Wild Honey frame that fades out (~3 s, "look here"). Linked: "Learn more" →
  `#pricing`, "Size chart and fit guide" → `#size-and-fit` – never rename those ids. Shared
  `.accordion` look (global.css) with the product page. No shipping/returns questions (nothing
  can be bought). Launch answer without jokes ("probably never" dropped – humour stays out of
  anything about trust).
- **Impressum, Privacy Policy** – built (see 13). **Accessibility** – built 26 Oct (see 12).
  **404** – not built.
- **`/styleguide`** – noindex, public by URL. Temporary "Style guide" link in the footer bottom
  row (before Impressum) while building. **Delete page + link before final launch.**

## 7. Features

- **Mobile menu** – built. Brand submenu becomes an accordion inside it.
- **Pack** (was "Shopping bag") – **built 27–28 Oct** on `feature/pack-drawer`, merged 28 Oct.
  **Concept (24 Oct, still true):** Reserve = saving your place in the queue for the launch, not
  a purchase – no money, no commitment, said clearly. **At launch (26 Oct, FAQ wording):** an
  email first, then people confirm their order before it's locked in. **Wording (25 Oct):**
  "Add to pack", under it "No payment – reserve your place for the launch." Header label "Pack".
  - **Drawer from the right** (`<dialog>`, React island `src/components/PackDrawer.tsx`,
    `client:only`), opened by the header's Pack button; `/bag` deleted – no page. One shared
    store `src/scripts/pack-store.ts` (nanostores) for the header badge, "Add to pack" and the
    drawer; saved in localStorage (`cave-wear-pack`, `cave-wear-reservations`). Name, price and
    photo always come fresh from the product folders.
  - **Rows:** shot 1 of the chosen colour/fit, name → product page with `?colour=&fit=`,
    size · fit · colour, `[ − n + ]` (shared `.stepper`), quiet "Remove", row total. Same item =
    one row (newest on top), max 10; at 10: "Maximum 10 per item. Planning a big order? Contact
    us ›". "Estimated total" + "Preliminary prices. No payment now." Empty: "Your pack is empty.
    Packing light is good – but not that light." + "Discover the collection" (jumps to
    `/products#base-collection` and closes the Pack – on `/products` itself the page would
    otherwise scroll behind it, 31 Oct).
  - **Reserve (decided 28 Oct, 9 questions):** "Reserve my place" → step 2 in the same drawer
    (summary, **First name** + email, short privacy line → `/privacy#reserve`, no checkbox,
    "Send reservation"), behaves like the contact form (`src/components/ReserveForm.tsx`, Netlify
    form `reserve`, hidden copy in `Header.astro`). After sending: a read-only toggle "RESERVED ·
    date · time" under "Your reservations" (closed by default, the one just sent opens once with
    the confirmation text); the Pack is free again. **Up to 3 per browser**, each with its own time
    (= its own place in the queue); at 3 "Add to pack" and "Reserve my place" step aside with a
    quiet line. No editing in the Pack, no queue number – changes by replying to the email or the
    contact form. Confirmation email: see 5 (HTML + plain text, "planned first run" line + disclaimer).
  - **Look:** the menu's panel glass, opens in 0.5s / closes in 0.3s (shared tokens, see 11),
    top bar at header height with the header's subtle X everywhere (desktop too, 29 Oct), phone
    full width, desktop 480px. Row: name + row total on one line, so "Remove" never wraps.
    Dardan's open backpack (`backpack-open.svg`, 29 Oct) next to "Your pack" – the header shows
    it closed, the drawer open. Product page: quiet "Choose a size" under "Add to pack" while
    it's off; choices stay after adding.
  - **OPEN:** planned donation (later) · a reservation link without accounts = **not before
    11 Nov** (presentation part "What I still want to learn").
- **Newsletter** – built (footer): email only, Netlify Forms via fetch (`src/scripts/newsletter.js`),
  test-mode message locally. Note: "We'll only email you when there's real news – the launch, a
  vote on the next product or a big announcement. No spam." Privacy Policy states the same purpose – keep in sync.
- **Contact form** – built 26 Oct (`src/scripts/contact-form.js`), Netlify Forms via fetch like
  the newsletter. Name · email · topic chips (General · Pack & reserve · Feedback · Collaboration
  · Other → own subject field, CSS `:has`) · message. "Send message" stays disabled until
  everything is filled in; under it a **grey** (Muted Stone) line "Still missing: …" – no red
  error messages. Terracotta only for a real problem (email typo, checked when leaving the
  field; sending failed), on the line only. After sending: "MESSAGE RECEIVED · date · time"
  replaces the button. Typed text 14px, 16px on phones (see 11). Sharp form box, 1px Flint.
  **Phones (30 Oct):** topic chips 44px high (the tap minimum, was 32px); name and email
  stacked – side by side the email was cut off, and an email typo is the one mistake that
  really costs (then no answer is possible).
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
  Also for the product gallery and the mobile product row. **One exception (30 Oct):** the
  product page's photo swipe row on phones uses `x mandatory` – sideways only, so it can't
  trap the page scroll.

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
  means (Dardan), bear only or bear + wordmark. **Place: Brand page (decided 27 Oct).** Needs the logo
  split into separate shapes in Corel – today `logo-horizontal.svg` = 1 shape, `bear-light.svg` = 4.
- **Pre-launch pieces** – one extra T-shirt and one extra hoodie, only reservable before the
  launch, separate from the Base Collection. Idea only – discuss before anything is built.
- **"Dyed for wash 10" (Dardan's idea, 27 Oct – from his Ausbildung)** – colours are planned a
  little darker than the target on purpose (beige fabric darker than Egret, the black shirt
  blacker than Dark Obsidian). Colour fades with wearing and washing: after ~5–7 washes it nears
  the target, around 8–12 it's exactly there, then it stays right for a long time (Dardan's
  estimate: ~40 more washes) before it fades past it. The first day looks a little less
  "perfect" – but the shirt looks the way it's meant to for longer than other brands'. That's
  why the colour dots keep the brand hex (the target), while the photos show the darker fabric.
  Always **vision** ("what I plan", "my experience"), never a tested fact – the wash numbers are
  Dardan's experience, not measured. Wanted as a section/story – OPEN where: Brand page (fits the
  Base Collection "made to last" idea), the FAQ answer on how long garments last, or the
  product page's Materials accordion. Strong presentation point (print/production background).
- **Team section** (idea 26 Oct) – 4–5 photos of Dardan, each with a different job title that is
  real work he did for the site (draft: Founder & Creative Director · Product Photography &
  Retouching · Copy & Content · Web Design & Build · Operations & Security). The honest wink:
  one person behind the whole concept brand. Humour only in the layout (same face, serious
  titles), never in the copy; a one-line caption per title, one quiet closing line. Never next to
  Pack/Reserve. **Animation reference:** familyindustrieslive.com, section "The Experience" – the
  section is pinned, scrolling down moves a row of portrait photos sideways, each photo has one big
  condensed uppercase word over its bottom edge (our Barlow Condensed). Reduced motion → a normal
  row/grid. **Place: Brand page `#team` (decided 27 Oct)**, linked from the FAQ answer "Who is
  behind it?". **Web role (Dardan's idea, 28 Oct):** not a photo – his pixel art of himself
  next to a pixel Claude, "the programming team". Honest (Linro knows he built it with Claude
  Code) and the one open joke of the section. OPEN: how Claude looks – no Anthropic/Claude logo
  copied (trademark), a neutral character instead; whether the pixel style breaks the shoot look
  on purpose. OPEN: real photos on a timer vs Gemini (recommended: real – it's about honesty),
  4 or 5 roles, photo brief (one shoot look, dark background like the product recipe, each role
  in a different Cave Wear piece).
- **Big orders** (idea 27 Oct) – above a rough limit (e.g. more than 10 of one item, or a very
  big Pack), the Pack shows a quiet line like "Planning a big order? Contact us ›" (contact form,
  topic Pack & reserve). Maybe a special price or something free for big orders – OPEN, think it
  through first; never promise a discount on the site before it's decided. **Built 28 Oct as a
  link only** (at 10 pieces, see Pack) – a special price or something free is still OPEN.
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
  **Phones (decided 30 Oct, from 90 · 70 · 60% · uncropped):** photo headers (not the Home
  hero) are 60% of the screen (`--photo-header-height`, `60svh` below 48rem) – the taller
  the box, the more a landscape photo has to zoom in. One token, so the Brand header follows.
- **Hides on scroll down, shows on scroll up** (threshold, no jitter) – built. Never hides while
  the menu/submenu is open or focus is in the header. No slide with reduced motion.
  **iPhone fix (30 Oct, `517b0f4`):** the iPhone's bounce past the top/bottom and the phone
  browser bar growing/shrinking don't count as scrolling (the header jumped there). Not tested
  on a real iPhone yet.
- **Product detail pages: never hide** (Pack stays visible) – built 25 Oct: `Header.astro` sets
  `data-pinned` on every `/products/…` page, `header-hide.js` skips a pinned header.
- **Mobile panels = one system (rule, 28 Oct):** everything that opens over the page on phones
  (menu, Pack) uses the same panel glass (`--glass-tint-panel`), the same speed and easing
  (`--motion-duration`, `--motion-ease`), a top bar exactly the header's height (64px + the
  1px line) and the header's subtle X (no circle, no frame) in the same spot as the header's X.
  Each keeps its own direction (menu from the header, Pack from the right). Tapping Pack closes
  the menu first. The Pack's top bar has header height on desktop too (decided 29 Oct).
- Height 64px on all screens, logo 32px (decided 24 Oct – the code is the standard; the larger
  sizes from the design file looked too big on real screens).
- Nav: Geist Regular 400, 16px, **normal case** (not uppercase), `--tracking-nav` 0 (changed
  26 Oct with type version C – was 500, uppercase, 0.04em). Inactive Weathered Bone; active
  **bold Egret**, no layout shift, no marker; hover Wild Honey. "Products" active on `/products/*`.
- **Pack button** (a `<button>` since 27 Oct – opens the drawer, `/bag` is gone; hidden without
  JavaScript): 40px high, 24px backpack icon (Dardan's drawing), "Pack" label, 12px corners.
  **Count badge (27 Oct, from 4 places):** small Wild Honey circle, top right, its middle on the
  button's right edge – grows evenly, "99+" above 99, never changes the header width; hidden
  when the Pack is empty. Screen readers hear "Pack, 2 items". The button itself:
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
  **Phones + tablets (30 Oct):** © line and legal links centred up to 1023px (desktop: © left,
  links right). Phones: social icons 24px with a 48px tap area. Touch screens: every legal
  link gets an invisible 44px tap area – nothing moves visually.

## 9. Home hero (`src/components/HeroSplit.astro`)

- Split screen *Built for the wild / Made for anywhere*: forest left, city right, cut along the
  bear logo's diagonal. Bear centred on the cut, 50% of hero height, **smoked glass**.
- Hover a side → other side goes black, that bear half becomes outline, headline + short text
  appear (headline max 112px, 26ch column, small text Muted Stone). No button. Hidden H1
  "Built for the wild. Made for anywhere." Soft dark gradient on top for header readability.
- Height `--hero-height` (`min(45rem, 90svh)`, same as every photo header); everything inside scales with it.
- **Touch screens (built 30 Oct, `src/scripts/hero-auto.js`):** a finger can't hover, so time
  does what the mouse does. Rest state 2 s (both sides, the bear whole) → wild and anywhere
  take turns, 4.5 s each (3.5 s felt rushed), slower 0.8 s fade → after 3 rounds (~29 s) it
  stops by itself, back to the rest state. Pause/play button (moving longer than 5 s needs one,
  WCAG 2.2.2); whoever taps play chose it, so then it never stops by itself. Runs only while
  the hero is on screen; reduced motion → stays still. The bear max 90% of the screen width,
  never cut off. Phones (below 48rem): short texts ("Cold mornings, rough terrain – gear that
  keeps up." / "Slow mornings to late nights – pieces that fit your everyday."). Same photos.
- CTA: "Discover the collection" on the hero's bottom edge, always visible (see 6).
- OPEN: text overlaps the bear at 1280px; Safari (Mac) check; larger downloads of the hero
  photos (then re-check header readability + top gradient over them).

## 10. Products & product images

Six products: **T-shirt · Hoodie · Half-zip (male + female version, same product) · Rain jacket
· Beanie · Buff**. Products live in `src/content/products/` – see "Product folder system" below.

- **Real** (bought and photographed by Dardan): hoodie, half-zip, beanie, rain jacket.
  **AI** (Gemini): T-shirt, buff.
- **Status 25 Oct:** the mock-ups (shots 1–5) of T-shirt, hoodie and half-zip are AI for now,
  with Dardan's logo added. Real photos of the pieces he buys and embroiders himself replace
  them later – same file names, no code changes (presentation point).
- Rain jacket = Dardan's own Carinthia jacket, Carinthia logo removed, Cave Wear logo added.

### Product concept (design intent, decided 24 Oct)

- **Fit:** drop shoulder, longer body – worn loose or tucked in ("military tuck") for a sharper look.
- **Chest logo:** the normal bear logo, standard size, on the wearer's left chest (right side in
  the photo). Tone on tone: a little lighter than the fabric (decided 24 Oct; on black a
  darker logo disappears), matte, subtle – you notice it, it doesn't shout.
  **Hoodie exception (decided 25 Oct):** the bear sits centred on the chest, between the
  drawstrings.
  **Half-zip exception (decided 25 Oct):** the bear sits on the wearer's right chest, on the
  diagonal yoke seam next to the zip – the seam runs exactly through the cut between head and
  body, the feet rest on the seam under the zip. The garment's construction becomes part of
  the logo (presentation point). Embroidered, tone on tone.
- **No back print (hoodie, decided 25 Oct):** one embroidered logo is enough to show the brand;
  a back print adds cost, nobody sees it under a backpack, and it isn't a statement mark.
- **Sleeve:** "CAVE·WEAR" wordmark (with the centre dot, as in the stacked logo: bear on top,
  wordmark, "Rugged. Functional. Refined.") near the end of the right sleeve. OPEN: exact
  position – Dardan shows it; stacked logo file still to send (not in the repo).
- **Decoration (vision):** T-shirt printed · hoodie embroidered · rain jacket thin silicone 3D
  heat transfer (only slightly raised, so nothing can get pulled off; no embroidery – it would
  pierce the waterproof fabric) · beanie in the style of a beanie Dardan loves (TAC VRK), picture
  follows · half-zip embroidered (see Chest logo). OPEN: buff, what goes on the rain jacket's back.
- **Seams (T-shirt, decided 24 Oct):** flatlock (flat band of zigzag stitching, from military base
  layers) on shoulder, armhole, side and underarm seams – the shoulders because backpack straps sit
  there. Black thread, tone on tone, only visible up close. Hem, sleeve ends, collar: normal clean stitch.
- **Hoodie close-ups (decided 25 Oct):** embroidered bear (macro) · shoulder seam (flatlock like
  the T-shirt) · folded hem corner showing the outside and a grid-fleece inside. The fold photo
  is a concept picture – say so on the site; the grid fleece is vision, not a material fact.
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

- **Built 25 Oct, used by the Products page and every product page:** `src/content/products/`
  with `README.md` (rules for the text file, photos, colours – for changing a product) and
  one folder per collection (30 Oct): `base-collection/` (`core-tee/`, `field-hoodie/`,
  `traverse-half-zip/`) and `supporter-collection/` (empty). The `collection:` line decides
  the folder – when setting up a product, Claude reads it and puts the folder there; a folder
  in the wrong collection stops the build (`src/data/products.ts`). The product folder's
  name stays the id. Folders starting with `_` are drafts (skipped). Rules + error messages in
  `src/content.config.ts`; colour list `src/data/product-colours.js`; reader `src/data/products.ts`.
  Photo names (in use): `shot_0_<product>` and `shot_<1–5>_<product>_<colour>_<fit>`.
  Originals stay outside the repo (see 5); Claude crops them to exact 4:5 and converts to webp.
- **Two folders (decided 30 Oct), each with a desktop shortcut:** **SetUP-Product** =
  `D:\project\cave_wear_dis\products\` – originals, the blank `_template/` (moved there 30 Oct)
  and the guide **`Cave Wear Product Guide.pdf`** (30 Oct, 10 pages: folders, adding a product,
  text file, photos, product code, commit, error messages, cheat sheet – for anyone who adds or
  changes products). Built by `_guide-source/build-guide.mjs`, which reads colours, codes and
  products from the site – run it again after the system changes. Not in Git. **Web-Product** =
  `src/content/products/` – what the site shows; after the setup Dardan changes products
  here himself (text, photos) and commits – no Claude needed.

- One folder per product: `src/content/products/<collection>/<NN>_<id>/` = one text file + the
  photos. **Order number (31 Oct, Dardan):** the two digits in front set the order on the
  Products page (01 Core Tee · 02 Field Hoodie · 03 Traverse Half-Zip · 04 Ridge Beanie ·
  05 All-Weather Shell · 06 Pass Gaiter);
  the setup folders in `cave_wear_dis` use the same numbers. The number is stripped from the
  id (`content.config.ts`), so it may change; missing or doubled numbers stop the build
  (`products.ts`). The name after the number = web address (`/products/<id>`) + favorite id –
  never rename it (saved Packs use it too; colour names as well). Product names: only letters, digits, spaces, `-` and `'` – the confirmation
  email's safety check (another character → add it in `submission-created.mjs`). Card, product page and breadcrumb
  all read from this one file; nothing is typed twice. Presentation point: workflow for
  repetitive maintenance (change a price in one file → the whole site follows).
- Text file fields: name (typed normally – the product page shows it exactly like that) ·
  code (see "Cave Wear code system" below) · tagline · description · price (number only) · collection ("Base Collection" / "Supporter
  Collection") · sizes · fits (unisex / female / male) · colours · shot descriptions shot 0–5
  (alt texts; name, colour and fit are added automatically) · Design & Purpose · Fit &
  Silhouette · Materials (Dardan always writes these as vision).
- Photos, all 4:5: **shot 0** = real photoshoot picture, any one colour – never changes.
  **Shots 1–5** = mock-ups, one set per colour (and per fit if the product has more than one):
  1 always front, 2 always back, 3–5 close-ups (vary per product, described in the text file).
- Product colours: one shared list (name → hex + code) in `src/data/product-colours.js` – all
  17 colours of the colour sheet (see 11); text files use the names only.
- Build safety net: missing field or unknown colour/collection → build stops and names the file.
  Missing photo → placeholder + warning (photos are still being made).
- **Cave Wear code system (decided 30 Oct in the military-touch chat; data side built 30 Oct):**
  every product configuration gets a code that looks like a military tag but is a real stock
  code: `CW · THZ01 · 2-32` = brand (always CW) · product (3 capital letters) + design version
  (2 digits) · fit code (1 digit) - colour code (2 digits). Exactly this format: "CW", space,
  middle dot, space … Size is not part of it.
  - **Product code** = the `code:` line right under `name:` in every product.md (and the
    template): Core Tee `CTE01` · Field Hoodie `FHD01` · Traverse Half-Zip `THZ01`. 3 capital
    letters + 2 digits; the letters are unique and never change (like the folder name); the
    version starts at 01 and only goes +1 when the design really changes.
  - **Fit codes** (`src/data/product-fits.js`): 0 unisex · 1 male · 2 female (1 + 2 follow
    ISO/IEC 5218; one-size products are unisex → 0).
  - **Colour codes** (`src/data/product-colours.js`): first digit = family (0 blacks · 1 stones
    · 2 greens · 3 browns · 4 golds · 5 reds), darkest first in today's list. A code never
    changes; a new colour goes at the END of its family (a new green = 24), a new family takes
    the next free digit (6, 7 …). Most colours have no product yet.
  - Build stops: wrong code format (`src/content.config.ts`) · two products with the same 3
    letters (`src/data/products.ts` – the content rules only see one file at a time) · a colour
    code that isn't 2 digits or is used twice (`src/content.config.ts`).
  - `productCode(product, fit, colourName)` in `src/data/products.ts` builds the code.
  - **On the product page (built 30 Oct):** a quiet line above the name, left, every screen
    size – 12px (smallest on the site), weight 300, Muted Stone (5.3:1; Flint compared and
    rejected – below the contrast rule), label letter spacing, 8px to the name. Not an
    eye-catcher: it swaps with colour/fit without animation (`product-options.js` looks it
    up in the page's `data-codes` list, written by `productCode()` at build time).

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
  Content max 960px wide (as in the mockup).
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
  (accessibility). `src/scripts/photo-viewer.js`.
  **With a finger (built 30 Oct):** the photo is exactly screen-wide on phones (it was 455px on
  375px – the arrows sat off screen); swipe = next photo (follows the finger), double tap =
  zoom where you tapped, one finger looks around, double tap zooms out. The phone's own pinch
  zoom stays free (accessibility). Phones: dots inside the photo instead of arrows (arrows on
  the screen edge looked unclean); tablet and desktop keep the arrows.
- **Product page on phones (built 30 Oct, below 48rem):** the gallery becomes one swipe row,
  one full-width photo at a time, with dots under it (`gallery-dots.js`); the description
  folds away behind a small button next to the tagline (`description-toggle.js`); the
  breadcrumb sits on one 12px line and cuts with "…". One column, sticky only from 1024px.
  From 768px the photo grid stays as before.
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
- Second product: `field-hoodie` (The Field Hoodie, black + egret).
- Third product: `traverse-half-zip` (The Traverse Half-Zip, male + female): Black for both,
  Alpine Oak men's only, Tobacco Brown women's only (colours per fit, see below).
- Fourth product (30 Oct): `ridge-beanie` (The Ridge Beanie, `TRB01`, one size, unisex):
  Black, Wild Honey, Moule. Short fisherman beanie, the bear as a tone-on-tone embroidered
  patch on the cuff (no woven label – it looked cheap). Only shots 1–4 (front, side, patch,
  knit) – **shot 5 is optional (30 Oct):** no `Shot 5:` line in the text file → no shot 5.
  Shot 0 = a man in a whisky lounge in the Wild Honey beanie. Dardan's double fold of the
  cuff: vision for the text / a real photo later, not an AI picture.
- Fifth product (31 Oct): `pass-gaiter` (The Pass Gaiter, `PGT01`, one size, unisex, Black only,
  19,90€) = the "buff" – **never call it "Buff" on the site** (BUFF® is a registered brand name;
  the neutral word is neck gaiter). Wordmark black on black on the top edge, wearer's right
  (planned: thin silicone heat transfer); drawcord toggle in black recycled plastic (vision)
  with the bear pressed in. Shot 0 = a man exploring an abandoned factory hall in winter.
- Sixth product (1 Nov), the last of the Base Collection: `all-weather-shell` (The All-Weather
  Shell, `TAS01`, XS–XXL, unisex, Black only, 149,90€ = Claude's estimate, Dardan confirms).
  Military details + a shorter, boxier fit than the reference jacket: hem at the hip, gently
  gathered ("a little tucked"), never the long rain jacket look. Bear black on black, small,
  wearer's left chest above the seam (planned: thin silicone heat transfer, like the gaiter);
  plain back; no sleeve wordmark. Shot 0 = a stand-in (man in the rain, wet city street) until
  Dardan's own photo next week. Dardan's own text.
- **Shot 0 of all five products is AI (Gemini – Dardan 29 Oct, beanie + gaiter 31 Oct)** – the people in them aren't
  real, so they're in Git and go live; stand-ins until a real photoshoot. Covered by the
  Impressum's AI line (see 13). The old Core Tee / Field Hoodie placeholders (another brand's
  logo, unknown licence) were never in Git and now sit in the originals folder.
- **Colours per fit (built 29 Oct):** a colour that exists only in some fits gets them in
  brackets in the text file – `colours: Black, Alpine Oak (male), Tobacco Brown (female)`.
  The product page hides that dot for the other fit (decided 29 Oct – dimmed with a hint line
  was built first, but every "not here" look felt off); the chosen colour jumps to one that exists;
  the card's dot opens the right fit. A fit in brackets not under `fits:` stops the build.

- Copy the mockup's layout; all spacing, type and colours from the style guide (mockup sizes are
  rough). Header never hides here (see 8). No photo header.
- Breadcrumb: Products › collection › product name. Two columns.
- Left: shot 0 big (heart top right), 2×2 grid of shots 1–4, shot 5 big. Front and back sit on the
  **diagonal** – two shots that blend into the background never share a column.
- Right column is **sticky** (stays while the photos scroll): name (stays the `<h1>` tag for
  screen readers and Google, but looks like **Geist in the H2 size – not Barlow Condensed**,
  decided 25 Oct: cleaner; **normal case, weight 450** like every H2 – decided 30 Oct, the caps
  shouted next to the uppercase breadcrumb; was uppercase 500), tagline,
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
- Settled 25 Oct: gallery order (1 front | 3 / 4 | 2 back, 5 big), photo file names, selected
  look. One-size products (beanie, buff) show one "One size" box, already chosen – Dardan
  hasn't confirmed this look yet, check when the first one-size product arrives.
- **Photoshop fixes found 25 Oct (Core Tee mock-ups):** sleeve wordmark reads "CAVE-WEAR"
  (hyphen) on the beige and olive fronts – should be the centre dot; olive and black backs show
  no sleeve wordmark (beige does); the olive chest-logo close-up looks grey-brown; the black
  neck label is bright, beige/olive are tone on tone (intended?); the logo on beige is darker
  than the fabric (rule says a little lighter). Egret close-ups 3 + 4 are only 912px wide.

## 11. Design system

### Colours (final – only these, via CSS variables; components use role variables)

| Role | Name | Hex | Code |
|---|---|---|---|
| Background | Dark Obsidian | `#0D0D0E` | 01 |
| Surface (header, footer, bag) | Obsidian | `#131314` | 02 |
| Line / divider | Charcoal | `#1E1E1E` | 03 |
| Input border | Flint | `#6B655E` | 11 |
| Main text | Egret | `#F3EBE0` | 14 |
| Secondary text | Weathered Bone | `#C4B9AC` | 13 |
| Quiet text (only on Dark Obsidian/Obsidian) | Muted Stone | `#8C857B` | 12 |
| Accent (main action, links, focus, bag count) | Wild Honey | `#C39132` | 41 |
| Accent hover | Amber Gold | `#D4A54A` | 42 |
| Brand support (large surfaces only) | Irr Olive | `#4B573E` | 21 |
| Success / Error (icon or border only) | Forest Fern / Terracotta | `#5B7553` / `#B86B43` | 23 / 51 |
| Logo dark brown | Moule | `#382D2B` | 31 |
| Reserve (no role yet) | Tobacco Brown / Alpine Oak / Mossy Elm | `#9A7354` / `#AE946B` / `#5E6D4E` | 32 / 33 / 22 |
| Product colour only (new 30 Oct, no product yet) | White | `#FFFFFF` | 15 |

- **Code** = the colour code in the product code (see 10, decided 30 Oct). Every colour here
  is also a product colour in `src/data/product-colours.js`, under its colour sheet name –
  except two: **Dark Obsidian is called "Black"** and **Irr Olive is called "Olive"** on the
  site (easier for people).

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
Contact form (decided 26 Oct): topic chips 12px (choice buttons = button radius, looks almost
like a pill), message field 4px (input), the form box itself sharp.

### Buttons (shared classes in `src/styles/global.css` – never restyle per component)
- `.button` + `.button-primary` (Wild Honey filled, hover Amber Gold – **one per section**) ·
  `.button-glass` (on photos, Egret text) · `.button-outline` (Wild Honey outline, on plain dark) ·
  `.text-link` (tertiary, "Learn more ›") · `.icon-button` (round, Flint border, `aria-label`).
- Never outline on a photo, never glass on flat dark. Sentence case, **one size for every
  button: 40px high, 14px medium** (decided 24 Oct). Bigger or smaller only where Dardan asks.
  Pressed 97% (off with reduced motion). Reference: `/styleguide`.
- **Touch and phones:** 44px high on touch screens (`--control-height`, `pointer: coarse`,
  chosen 29 Oct from 40 / 44 / 48). 16px button text and 16px typed text in fields on phones
  (`--text-button`, `--text-field`, below 48rem, decided 30 Oct after measuring 6 sites +
  Apple/Google guidelines) – below 16px the iPhone zooms the page in when you tap a field.
  Body and small text stay the same. Exception: the Home hero button is one step bigger
  (44px with a mouse, 48px on touch, 16px text – see 6).

### Cards & glass
Every card = the hero bear's **smoked glass**: blur 12px, saturate 1.2, brightness 0.9 + Dark
Obsidian 45% tint + fading Egret edge + soft shadow. No coloured cards. Text must pass WCAG.
Exception: a whole section may be Irr Olive (conservation); cards inside stay glass.
**Shared variables (26 Oct) – never write the values out again:** glass = `--glass-blur`,
`--glass-tint`, `--glass-edge`, `--glass-shadow` (+ `-hover`, `--glass-edge-faint`); 40px =
`--control-height`; focus = `--focus-ring` + `--focus-offset`. All in `global.css`.
Added 28 Oct: `--glass-tint-panel` (92% Dark Obsidian – large panels: mobile menu, Pack) and
`--motion-duration` 0.3s + `--motion-ease` (calm start, soft landing – made calmer the same day,
the first curve jumped in) for everything that opens and closes; `--motion-duration-slide` 0.5s
for the Pack coming in (closing stays 0.3s).
PROPOSED (not decided): glass only where an image or content is behind it (hero, cards over
photos, maybe the bag panel); flat Obsidian surface elsewhere – on flat Dark Obsidian the blur has
nothing to blur. Next step: comparison on `/styleguide` (glass vs flat × on photo vs on flat dark),
then Dardan decides.

### Typography
- **Geist** (variable) – body, UI, nav. **Barlow Condensed Bold 700** – H1/display only,
  uppercase, line height 0.9, 48–128px `clamp`, max 12ch. Never another weight.
  Exception: the product name on product pages is Geist (see 10, decided 25 Oct).
- WOFF2 self-hosted in `public/fonts/` (no Google requests). Both SIL OFL.
- Scale: H2 32/32→48/48 · Lead 24/32→32/40 · H3 24/28 · Body 16/24 (all screens) · Small 14/20 ·
  Label 14/20 uppercase `--tracking-wide`; H4–H6 = Label. Headlines must never clip on mobile.
- **Type version C (decided 26 Oct, from 3 versions compared on localhost, after measuring
  Linear and Vercel):** H2/H3 Geist **450** (was ExtraBold 800), tracking H2 −0.05em · H3 −0.03em,
  H2 line height = font size; Lead 450, −0.03em (was Light 300); body −0.01em; labels 0.08em
  (was 0.14em); nav normal case. Light headings + tight spacing = the premium look. Presentation point.

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
- Something that shows on hover and also for keyboard users uses `:focus-visible`
  (`:has(:focus-visible)`), never plain focus / `:focus-within` – a mouse click also gives
  focus (learned 26 Oct: the card's second photo stuck after going back).
- **Alt texts (decided 26 Oct): Claude writes them** – describe what is really in the picture,
  short and plain; no need to ask Dardan about his vision. Decorative images get `alt=""`.
  **Exception: product photos** – their alt texts come from the shot description fields in the
  product's text file (Dardan's); never write product alt texts in the code. Before launch
  (a few days before 11 Nov), go through all alt texts once with Dardan.
- **Accessibility (checked 26 Oct, aim WCAG 2.2 AA):** page `/accessibility` (footer link). Its
  "Known limitations" list must always be true – remove a line when it's fixed, add one when a
  new gap appears. After every new feature: keyboard only, 200% zoom, reduced motion.
  OPEN for Dardan: screen reader test with NVDA (Claude guides), colour/look fixes from the check.
- All links work, no placeholder links in the final site.
- Optimised images (Astro image handling), no oversized assets or unneeded scripts. Video: short
  loop, no audio, small, poster. Product images 4:5, wide images 16:9.
- Stock photos need licence check + a credit line in the Impressum.

## 13. Legal

- **Impressum** + **Privacy Policy** built (English), details in `src/data/owner.js`, layout
  `src/layouts/LegalLayout.astro`. Two emails, no phone; the Impressum points to the contact form.
  Legal headings are quiet (decided 26 Oct, like Linear/Vercel): H2 24px medium, H3 18px,
  text Weathered Bone. Keep the name "Impressum" (the word German law looks for).
- Impressum has the concept disclaimer and "Photo credits +" (`<details>`): forest = chickenbunny
  (Pexels), alley = Andreas Rasmussen (Unsplash). Every new stock photo gets a line.
  **AI line (29 Oct, version B):** "Product images: concept mock-ups made with Google Gemini (AI)
  and edited by Dardan Ademi – logo added, retouched. The people shown in them are AI-generated."
  Once real photos arrive, "concept mock-ups" becomes "some product images".
- Privacy: no cookies/tracking, Netlify hosting, newsletter (consent), social links, GDPR rights.
  Contact form added 26 Oct ("Contact form and email": Netlify Forms, netcup mailbox → Gmail,
  Art. 6 (1) (f), deleted once answered). The Pack (localStorage) and Reserve + its confirmation
  email added 28 Oct ("Reservations", `#reserve`: Art. 6 (1) (b), deleted after the launch, at
  the latest 12 months after reserving). **Extend before** the weather (location → Open-Meteo)
  goes live.
- netcup AVV agreed (PDF with home address stays outside the repo). OPEN: check Netlify's DPA.
- Trademark check done 21 Oct (TMview, class 25): no hits in DE/EU. A website "CAVEWEAR –
  Underground Tech Fashion" exists (not registered). Real launch → register at DPMA.
- OPEN: short disclaimer on product/Bag/Reserve; note that some product images are AI (+ which
  tool – Gemini and ChatGPT, check both terms); Gewerbe/VAT question.
- **Photos of real people** (e.g. a friend wearing a piece for shot 0): written consent first
  (a chat message is enough) – right to one's own image.

## 14. Still open (ask, don't assume)

- **🔴 LINRO MUST-HAVES – HIGH PRIORITY (Dardan, 27 Oct): never cut these. Other things get cut
  first.** From Linro's development plan (`C:\Users\Dardan\Desktop\cave-wear-ai\
  Development_Plan_Brand_Content_Designer_Linro.pdf`). Not "do first" – "can't leave out":
  1. **Mobile / responsive** – Linro lists "responsive design, mobile first". The site is desktop
     first on purpose (rule 13), so: every page must work well on phones before 11 Nov, **new
     sections are written mobile first from now on** (base CSS for small screens, `width >=`
     queries add desktop – `global.css` tokens already work that way), and Dardan explains the
     choice.
  2. **Git branches** – done: `feature/mobile` and `feature/pack-drawer`, both merged into `main` (28 Oct).
  3. **A real README** – still the Astro starter text → what, why, stack, how to run.
  4. **TypeScript, "a first look"** – done: the Pack (`pack-store.ts`, `PackDrawer.tsx`,
     `ReserveForm.tsx`), and `astro check` runs before every build (a wrong type stops it).
  5. **React for an interactive part** – done: the Pack drawer (React island).
  6. **One external REST API with JSON** – the weather / Field conditions (Netlify Forms already counts as a form backend).
  7. **"Reviewing and understanding generated code"** – a code walkthrough rehearsal before 11 Nov.
  Already covered: semantic HTML, CSS, Grid/Flexbox, JS/DOM/events/fetch, Astro, Markdown
  content, contact form, basic animations, Netlify, custom domain, HTTPS, Claude Code. Tailwind:
  not used on purpose (own design system) – explain it.
- **⚠ REMIND DARDAN EVERY DAY (asked 27 Oct): make product pictures for one new product.**
  Gemini has a daily image limit, so a little every day. Takes time → not late at night.
  Status 1 Nov: **6 of 6 done** – Core Tee, Field Hoodie, Traverse Half-Zip (both fits),
  Ridge Beanie (30 Oct), Pass Gaiter (the buff, 31 Oct), All-Weather Shell (1 Nov).
  Method: memory "Gemini image method".
  Remove when all six products have photos.
- **⚠ BEFORE 11 NOV (Dardan, 29 Oct): colour-grade the product pictures right.** Every product,
  every colour, so the colours look right and the shots fit together as one shoot. Photoshop
  work (rule 9) – Dardan grades, Claude can put the shots side by side and point out
  differences. Keep "Dyed for wash 10" in mind (see 7): the fabric in the photos is meant to look
  a little darker than the colour dot. Same file names → swapped without code changes. Needs a
  full free day. Remind Dardan until he says it's done.
- **⚠ START OF THE 28 OCT SESSION, BEFORE ANYTHING ELSE (Dardan asked):** he thinks about three
  Home questions – what each of the 3 videos (Rugged · Functional · Refined) shows, the one line
  of text in the cave breather, the 3 milestones + "Next up" for "The journey so far". Details:
  `drafts/site-ideas.md`. Remove this line once answered.
- **Pack: built 27–28 Oct, merged into `main` 28 Oct – NOT pushed yet.** `SMTP_PASSWORD` is
  set in Netlify (Dardan, 31 Oct – the live test confirms it). Push planned 31 Oct afternoon:
  fresh-clone build test · ONE push (it also brings the mobile work live) · live test:
  a reservation reaches Netlify, the email arrives, `data-netlify` is gone from the live HTML.
  After the live test: this line → "pushed and live", delete the test reservations.
- **Contact page (26 Oct):** Dardan reads the new Privacy section once (netcup → Gmail, "deleted
  once answered" – true for how he works?). The contact form only reaches Netlify after a deploy
  (check: `data-netlify="true"` gone from the live HTML). Mobile layout = mobile phase.
- **Form notifications done (26 Oct):** Netlify → Forms → Submission notifications → email to
  info@cavewear.de for any form (contact + newsletter), forwarded to Gmail; reply goes straight to
  the visitor (Reply-to). Gmail put the first one in spam → "Kein Spam" + filter "never spam" for
  formresponses@netlify.com. Netlify's spam filter can catch repeated test messages (no email then).
  Privacy Policy now says Netlify Forms records the IP address (done 30 Oct, `2f5f40b`).
  OPEN: delete the test submissions.
- Newsletter double opt-in (the Reserve confirmation email is built, see 5).
- Product details, donation model, weather → product mapping.
- Home sections; Brand page sections, then submenu + jump links.
- Ideas to build later (see 7): page fade, flying product photo, logo story section, weather
  strip/card. Glass comparison on `/styleguide` (see 11).
- Hero at 1280px, Safari check. Card radius.
- Delete `/styleguide` and its footer link before launch. DNSSEC at the very end.
- **Final steps before 11 Nov (Dardan, 26 Oct): 2FA on the Cave Wear Gmail and netcup** –
  remind Dardan, guide click by click (he types passwords and scans codes himself).
  Presentation point: domain + mailbox secured with 2FA, SPF, DKIM, DMARC (Linro = cybersecurity).
- **⚠ DON'T FORGET – presentation part "What I still want to learn" (Dardan, 27 Oct, "a fucking
  good idea"):** once the site is live and done (the week before 11 Nov – only photo swaps after
  that), build a part of the presentation that names honestly what Dardan knows he must improve
  and learn more about, and how he plans to do it. Context: Linro talked about hiring him around
  Dec / Jan / Feb (Dardan thinks January–February is realistic). Collect candidates during the
  project (e.g. React/TypeScript depth, mobile first from the start, testing) – ask him, don't decide.
  Confirmed (28 Oct): a reservation link without accounts – backend storage he wants to learn first.
- **3–4 days before 11 Nov (Dardan, 27 Oct): phone + Safari check and fixes.** Linro uses
  iMacs/MacBooks → they will likely open the site in Safari, maybe on a phone. Plan time for it.
- **Mood board + page structure draft + Dardan's section ideas:** `drafts/site-ideas.md` (27 Oct).
- **Decided 27 Oct – to build (small tasks):** ("rename `/bag` → `/pack`" became no page at all
  and the "Choose a size" hint is built – both done in the Pack, 27 Oct) · "Learn more ›" and "Size
  chart and fit guide ›" on the product page always underlined (only these two) · legal
  headings weight 500 → 450 (product name done 30 Oct) · Privacy Policy: add that Netlify Forms records the
  IP address (**done 30 Oct**) · Impressum, under Photo credits: one line that some product images are
  AI-generated (Gemini) and edited (**done 29 Oct**, version B – see 13).
- **Decided 27 Oct – no change:** colour dots keep the brand hex (Egret dot stays `#F3EBE0`
  = the target colour; the darker fabric in the photos is intended – see "Dyed for wash 10" in 7) · the black Core Tee's bright neck label is intended · product
  cards stay sharp (card radius closed) · Egret shots 3 + 4 (912px) stay until the real photos.
- **Photo system first (Dardan, 27 Oct):** before the Core Tee Photoshop fixes, a simple
  workflow – Dardan edits or replaces a file in his originals folder, cropping to 4:5 + webp
  happens without Claude. Then he does the fixes on a full free day (not after a shift).
  Stacked logo file + sleeve position: needed for those fixes, not urgent.
- **I maintain my products myself (Dardan, 29 Oct):** adding a *new* product can be done with
  Claude, but changing existing ones (price, texts, photos) Dardan wants to do alone – not "he
  puts something in and Claude does the work". Needs a clearer, more structured product system
  (goes with "Photo system first"). Own chat, later – not the hub. (He tested a price change on
  the Core Tee on 29 Oct; it worked.)
- OPEN: Privacy "deleted once answered" – Dardan isn't sure yet how he'll handle it.
- Mobile phase for the product pages: one column, swipe and the photo viewer are done (30 Oct,
  see 10) – still open: card fit icons on touch.
- Real shot 0 photos (Core Tee, Field Hoodie, Half-Zip, Ridge Beanie, Pass Gaiter) – the AI
  stand-ins are online until then.

# Site ideas – Dardan's mood board + thoughts (collected 27 Oct 2026)

Raw notes from the hub chat. Not built. Use when planning Home, Brand and the sections below.

---

## Page structure draft (27 Oct, not decided)

Visual version + research (Lindgaard 2006, Tuch/Google 2012, NN/g zigzag, aesthetic-usability):
artifact "Cave Wear Page Map" – https://claude.ai/artifact/6qZavK387BRY3zMdryFeKP

Idea: same system everywhere (colours, type, `01 /` section numbers = military touch), one
signature moment per page – Home: split hero · Products: photo viewer / flying photo ·
Brand: logo story · Contact: the trail. Home = "what + where to go", Brand = "why".

**Home:** split hero + CTA · 01 Three principles (short, → Brand) · 02 Base Collection (2–3
cards) · 03 How the Pack works (Add to pack · Reserve, no payment · Early access) · 04 Field
conditions (weather) · 05 The journey teaser (→ Brand) · Questions? · Follow the journey.

**Brand:** intro (CAVE WEAR · tagline · first line) · 01 Why we exist · 02 The Cave Bear = logo
story (signature) · 03 Built to last (principles + "Dyed for wash 10") · 04 Conservation (Irr
Olive) · 05 The journey (full) · 06 The team (`#team`) · Just the beginning → follow.

Reference used: "Anatomy of a high-converting SaaS landing page" – logic kept (each section
answers one visitor question), all fake social proof dropped (users count, partner logos,
testimonials → real milestones instead).

---

## Decisions so far (structure talk, 27 Oct)

- Home 02 **Base Collection** (2 uneven: one big product, two small stacked) – **stays** (Dardan).
- **Photo break (Dardan, 27 Oct):** his two ideas combined = (1) a photo **lighter than the
  site**, so it breaks up the dark theme, (2) a **parallax** effect. Not in the hero (people
  would scroll through for visuals and miss the thoughts – the thinking is the core of the
  brand). Subject: **cave** (favourite, fits the brand best) or mountains. **No torn-paper edge**
  – something cleaner. **Text: yes** – a parallax that only shows visuals wastes space.
  Phones: still image, no parallax (OK). Reduced motion: still. Height (full screen?) = a
  question for when we build it.
  **Claude's proposal:** looking **out of the cave** – layer 1 (front): the dark cave rim, almost
  the site's own Dark Obsidian, so the page flows into the rock and there's no hard edge at all;
  layer 2 (back): the bright landscape outside the cave mouth, the light part. On scroll the
  rim moves faster than the landscape → depth. Story: from the cave into the world = "Built for
  the wild. Made for anywhere." Text sits in the dark rock part (readable), one short line of
  Dardan's thinking – a statement, not a heading + paragraph. Needs the image as 2 layers
  (rim with a transparent opening + landscape) – made in Photoshop or Gemini (rule 9/14).
  OPEN: Dardan likes it? which line of text? own photo vs generated?
  **New direction (Dardan, 27 Oct, replaces the photo idea if he confirms):** no photo – a
  **drawn, stylised cave made in Corel** (vector layers). Scrolling in, the layers move
  (parallax) and the page colour shifts **from dark to a lighter section**; scrolling out, the
  **reverse parallax** takes it back to dark, then "How the Pack works" follows. Something that
  fits the brand very well gets built in there.
  Claude's notes: SVG layers = sharp at any size, tiny files, colours from CSS variables, smooth
  parallax, and Corel is Dardan's strength. Layers could step through the palette – Dark
  Obsidian → Moule → Tobacco Brown → Alpine Oak → Egret – which finally gives the "reserve"
  colours a role. A light *section* is not a light *mode* (rule "dark mode only" stays). On a
  light background: text Dark Obsidian; Wild Honey text fails contrast on Egret – links/buttons
  need another solution there. Corel: one SVG per layer (or one SVG with named groups).
  **Decided (Dardan, 27 Oct): the light cave part is a pure breather; "How the Pack works"
  comes right after it, back in the dark.**
- **Scroll snap (Dardan, 27 Oct):** time to pick the few sections that snap (CSS only,
  `proximity`, never `mandatory` – CLAUDE.md 7). Claude's proposal: hero · 01 the three video
  tiles · 03 How the Pack works. **Not** the cave breather – a snap would stop the parallax
  halfway. OPEN: Dardan confirms.
- **Field conditions (Dardan, 27 Oct):** a standalone section, a small demo of the API work;
  nothing before or after it has to fit tightly to it. One full session.
- **Journey teaser → merged (Dardan, 27 Oct, option B):** one last Home section "The journey so
  far": 3 real milestones + "Next up" (the next real step) + a way to follow. Problem to solve:
  the footer already has the newsletter + socials – the section must not repeat them (proposal:
  the section points to the footer newsletter, no second form). Home "Questions?" (FAQ +
  contact) needs a restyle later – it doesn't fit the newer style of the product page / Impressum.
- **Scroll snap, final (Dardan, 27 Oct):** **01 video tiles + 04 Field conditions only – no snap
  on the hero.** Reason: the snap under the hero encourages scrolling – once you pass the
  threshold, it pulls you into Rugged · Functional · Refined.
- **Base Collection big product (Dardan, 27 Oct): The Field Hoodie.** · How the Pack works
  steps: Dardan works on them in the Pack chat. · **Weather animations: rain, fog, sun/clear**
  (no snow). Field conditions shape: **try strip and card side by side** when building.
  "Questions?" block: decide when building the last Home section (merge / restyle / drop).
- **Home structure done (27 Oct), final order:** hero · 01 video tiles (Rugged · Functional ·
  Refined, snap) · 02 Base Collection (Field Hoodie big) · cave breather (drawn, parallax, light)
  · 03 How the Pack works · 04 Field conditions (snap, rain/fog/sun) · Questions? (decide later) ·
  The journey so far + follow (points to the footer newsletter).
  **Dardan thinks about these tomorrow, before anything else:** what each of the 3 videos shows ·
  the one line of text in the cave · the 3 milestones + "Next up".
- **Section numbers on Home (Dardan, 27 Oct):** yes – but only if they stay clean, small and
  subtle (he's unsure they fit the clean look). Show it in the military-touch comparison. Field conditions gets **small weather animations**
  (rain, fog …), off with reduced motion.
- **Linro check (Dardan, 27 Oct):** read what Linro sent (PDF + email) and list anything they
  asked for that the site doesn't do yet. Found: `C:\Users\Dardan\Desktop\cave-wear-ai\
  Development_Plan_Brand_Content_Designer_Linro.pdf` (confirm it's the one). Email: not found on disk.
  **Checked 27 Oct – gaps vs the PDF's list:** (1) **branches** – only `main` so far → build the
  Pack on its own branch and merge it (learn + show branches). (2) **README** – still the Astro
  starter text → write a real one (what, why, stack, how to run). (3) **Mobile first /
  responsive** – the site is desktop first on purpose; the mobile phase must be done and the
  decision explained. (4) **TypeScript, "a first look"** – only small .ts files so far → write the
  Pack in TypeScript (`.tsx`). (5) **AI tooling: "reviewing and understanding generated code"** →
  plan a code walkthrough rehearsal before 11 Nov. Tailwind: not used, on purpose (own CSS design
  system) – explain it. Everything else on the list is covered or planned.

## Wanted at the end of the structure talk: the build plan PDF (Dardan, 27 Oct)

One big PDF = to-do list + structure list, so a skeleton stands before any section is built.
For **every section**: what to build · rough difficulty · what Dardan must prepare (photos,
videos, text, logo files) and by when. Then **group sections into sessions**: "after a work
shift" sessions (short, ~2–3 h) vs "full free day" sessions (e.g. the photo break with parallax).
No fixed days yet – only the groups. Example from Dardan: "first two sections + How the Pack
works" in one session · "only the photo break" in one · "Field conditions + journey teaser" in one.
Dardan works on the structure in the hub while the Pack chat (React) runs.

## Mood board (27 Oct) – what stands out

- **Mountain hiking site (Russian):** full-width photo sections that break up the light page,
  with a **torn-paper edge** between photo and page · big condensed uppercase titles · a list of
  dates with **huge numbers** (07, 16, 25 …) and small labels next to them · **vertical side labels
  with a line and "01 / 02"** on the left edge · small dot pagination on the right.
- **Dardan's early Cave Wear mockup:** honey nav bar with a dropdown, the split hero (black bear
  over forest/city), a row of five tall cream cards.
- **Soft UI style guides** ("Product UI Styleguide", "MOSS / SYSTEM"): calm tokens, pill controls,
  a clean component overview.
- **Linear app UI:** dark, dense, quiet.
- **Glass dock navigation over a rock photo** and **glass sliders** (Label 537, Weight 400 …):
  smoked glass controls with numbers – close to our glass.
- **Wood-grain photo with single words scattered** over it ("THE TREES ARE THE LUNGS OF OUR
  ANCESTORS") – text placed on the image's lines.
- **"Alpine Adventures":** forest photo + deep green section with About us.
- **"Earth Shows Us":** poetic layout, thin lines, a small line drawing of a mountain, short lines of text.
- **"Welcome home." aerial landscape with a grid over it and small coordinate labels** –
  technical/military feel. Strong candidate for the military touch.
- **"MNTN":** dark green-blue page, big **outlined numbers 01 / 02 / 03** behind each section,
  photo + text alternating.

Possible military-touch sources (reminder due Sun 1 Nov): vertical side labels with "01",
coordinate labels, grid lines over photos, big outlined section numbers.

---

## Ideas Dardan named (27 Oct)

1. **Photo break section** – a section with a mountain/landscape photo that breaks up the page's
   colour scheme (like the hiking site). Maybe with a **parallax** effect. Dardan has **two
   ideas** for it – ask him. Parallax = CSS only if possible, off with reduced motion.
2. **Weather product suggestion** ("Field conditions") – already planned (CLAUDE.md 7).
   React or plain JS: see Claude's opinion in the hub chat (27 Oct).
3. **Logo story section** – process wanted by Dardan: he explains the plan and how it should
   look, Claude asks questions one by one; each question = one keyframe/keynote of the
   animation. Then build. (Brand page.)
4. **Repeating video footage** like familyindustrieslive.com (hero, "MAKE MERCH THE EXPERIENCE"):
   next to the headline, a **grid of 9 small video tiles** in 3 offset rows (staggered, like
   bricks), each a short silent loop of real hands-on work – printing, pressing, embroidery,
   picking threads, a screen. Rounded tiles there (ours: sharp by default – ask).
   Cave Wear version (idea): **real footage of Dardan's own process** – he buys and embroiders
   pieces himself, prints, edits in Photoshop, shoots outdoors/city. Honest "made by hand" proof.
   **Dardan's placement idea (27 Oct): Home block 01, right under the hero** – three small
   looping videos side by side, one big brand word over each (**Rugged · Functional · Refined**),
   a short description under each video. The hero is at most 90% of the screen height
   (`--hero-height: min(45rem, 90svh)`), so the three words already show in the last ~10% of
   the first screen – a peek that invites scrolling. (Taller screens show more than 10%, since
   the hero stops at 720px.) Replaces the "Three principles" text bento on Home (3 columns).
   **Each tile, top to bottom (Dardan, 27 Oct):** brand word (e.g. RUGGED) → video that shows
   it → principle (e.g. Built to Last) → a small text that explains it. Pairs: **Rugged → Built
   to Last · Functional → Made to Adapt · Refined → Quietly Confident** (joins the two sets of
   three). OPEN: what each video shows.
   **Mobile version (Dardan, 27 Oct – must be done before going live, he'll explain it to Linro):**
   one big video in the middle, the two others small at the sides; it switches by itself
   Rugged → Functional → Refined → Rugged …, the fitting video moves to the middle each time.
   Technical: reduced motion → no auto-switch (swipe/buttons only); auto-moving content needs a
   pause button (WCAG 2.2.2).
   **⚠ REMIND DARDAN when this section is finished:** the two buttons under the hero
   ("Discover the collection" + "Explore more ↓") and the `#explore` jump may need to change,
   now that block 01 peeks into the first screen.
   Still open for the other places: Brand "Why we exist", team section, tile corners. Technical: short loops, no audio, small files (~480px wide), poster image each,
   only play when on screen, **reduced motion → still posters only**.
5. **Before the presentation (3–4 days before 11 Nov): phone + Safari check and fixes** – Linro
   uses iMacs/MacBooks, so they will likely open the site in Safari, maybe on a phone.

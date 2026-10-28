# Mobile plan – rules, research, ideas, questions (started 27 Oct 2026)

Collected in the mobile planning chat. **Nothing here is decided yet** – these are
proposals for the big Q&A. After the Q&A, the decided rules move into CLAUDE.md and the
work happens on the branch `feature/mobile`.

---

## How we work (Dardan, 27 Oct)

1. **Collect** – this file: rules, research, ideas, questions. No code.
2. **Big Q&A** – Dardan answers everything at once, after more work has gone in.
3. **Build** on `feature/mobile` (own worktree: `.claude/worktrees/mobile`).
   Meanwhile, fixes and new things keep going on `main` as usual.
   Bring `main` into `feature/mobile` every few days, so the branch never falls far behind
   (small merges = small conflicts).
4. **Merge** `feature/mobile` back into `main` at the end, together with Dardan, then
   bug fixing. Phone + Safari check 3–4 days before 11 Nov.

---

## Rule proposals (for the Q&A)

1. **Mobile first in CSS:** base styles = phone, `width >= …` adds desktop.
2. **No hover-only content:** anything shown on hover needs a tap/scroll way on touch.
   Detect touch with `@media (hover: hover)` / `(pointer: coarse)`, not screen width.
3. **Thumb sizes:** tap targets at least 44px on touch (Apple 44pt, Google 48dp; WCAG 2.2 AA
   minimum 24px). Idea: 40px stays for the mouse, 44px on `pointer: coarse`.
4. **Less reading, same story:** shorter blocks, key line first, details in an accordion.
   One content source – never a second, different text for mobile.
5. **One column, one decision per screen;** main action low, in reach of the thumb.
6. **Trust on mobile:** people hesitate with big actions on phones. Reserve costs nothing –
   say it at the button, keep the form tiny, the Pack stays saved for later.
7. **Performance = design:** phone-sized images (`sizes`), no big downloads on mobile data.
8. **Real devices:** test on a phone + Safari, not only the browser's phone view.

---

## Research (27 Oct)

- **Browse on phone, buy on desktop:** most shop visits are mobile, but desktop converts
  better (often quoted ~2% mobile vs ~3% desktop; numbers vary by source – say "desktop
  converts better", don't quote exact figures). Shopify, Contentsquare, Smart Insights.
  → Reserve costs nothing = low barrier. Note: the Pack is saved per browser, it does not
  move from phone to laptop by itself.
- **Reading on mobile is harder:** one study found about half the understanding on a phone
  vs desktop; NN/g: "mobile content is twice as difficult". (Secondary sources – check the
  original before quoting.) → headline first, shorter texts.
- **Thumb zone:** Steven Hoober watched ~1,300 people – about half use one hand; only about
  a third of the screen (the lower part) is easy to reach. → main actions low; idea: a
  fixed "Add to pack" bar at the bottom of the product page.
- **Hero on a phone:** mood + short headline + button on the first screen; a button below the
  first screen is a common mistake (agency guides, directional only).
- **Tech:** CSS scroll-driven animations work in Chrome and Safari 26+; older browsers just
  show the still version.
- **Malewicz, "The Secret to Mobile Web Conversion" (YouTube, transcript from Dardan, 27 Oct).**
  Dardan likes many of his points. His view is SaaS conversion ("try for free"); we are a
  brand portfolio where nothing is sold – so read it as direction, not law. His numbers
  ("90% mobile") are his claims. Points and what they mean for us:
  1. **Don't cram:** less white space on mobile = weaker hierarchy, the brain gets tired and
     leaves. → fewer elements per screen, not smaller ones.
  2. **Animations, scroll hijacks, decorations annoy on mobile.** → speaks **against hero B**
     (scroll story) and C (auto switch); for A or something calmer. Small, quick UI motion
     (menu fade) is a different thing – but keep it short.
  3. **Tap sizes:** CTA on desktop 48–52px, on mobile above 52 but under 64 (too big = looks
     like an ad, "banner blindness"). Checkboxes at least 32×32. → our 40px buttons are below
     even his desktop range; rule 3 (44px on touch) is the minimum, he'd go 52–60px for the
     main CTA. Small "social proof" icons that can't be read → drop on mobile.
  4. **No phone inside a phone** (screenshots of apps) – not relevant for us.
  5. **Rewrite copy for mobile:** bigger text, shorter copy, written separately; "tap" not
     "click"; a CTA with less friction. → **conflicts with rule proposal 4** ("never a second
     text"). Decide in the Q&A: shorter mobile versions of the same text (in the same content
     file), or one text that's short enough for both.
  6. **Bonus – sticky things:** don't let logo/menu take space while scrolling on mobile;
     people scroll back up. → our header already hides on scroll down. But the idea of a fixed
     "Add to pack" bar on the product page goes against this – discuss.
  7. **Forms on mobile:** as short as possible, ideally 2 fields max; ask the rest later;
     avoid toggles. → Reserve = name + email = exactly 2. Newsletter = 1. Contact form has
     more (it's a contact form, OK – but make the fields big).
  8. **"Micro visuals":** on mobile, headline + button at the top, skip the big hero image
     (by the time people scroll to it, the headline is gone). → a radical option for our hero:
     on the phone the split photo becomes small (or a strip), headline + button lead.
     Worth a comparison.
  9. **Test on real phones:** at night, in bright sunlight, Android and iOS. → add to rule 8.

---

## Hero on mobile – directions

Today: on a phone the split becomes two thin strips, and the texts never appear (no hover).

- **A – Stacked:** forest top, city bottom, bear on the cut, both headlines always visible.
  Calm, reliable. Also the fallback for B (old browsers, reduced motion).
- **B – Scroll story (Claude's favourite):** desktop has 3 states (resting · wild · anywhere);
  on a phone scrolling plays them in order – start in the forest, the cut moves across,
  end in the city. "Scrolling on the phone does what hover does on desktop." Trade-off:
  the hero takes longer to scroll through.
- **C – Auto switch:** forest and city swap every few seconds, pause button. Fits the video
  tiles idea, but two auto-switching parts close together may feel busy.

- **D – Micro visual (from Malewicz):** headline + button lead the first screen, the split
  photo + bear shrink to a small visual. Most "conversion", least "brand moment".

After the Malewicz video Claude's favourite moves from B to **A** (or D): calm, no scroll
hijack, both lines readable. Build as `?version=` comparison on `feature/mobile`, Dardan picks.

---

## Questions for the Q&A

1. Hero's job on a phone: tell the wild/anywhere story, or set the mood and get to the products fast?
2. Text: both headlines + short texts, or headlines only?
3. Must "Discover the collection" be visible on the first phone screen?
4. Bear size: on a phone it's ~190px tall (logo is ~1.8 : 1). OK, or should the bear lead?
5. Photos: do the landscape forest/alley photos work as tall phone crops, or portrait versions?
6. Motion: alive (B, C) or calm (A)?
7. Where do phone visitors come from? (Instagram links open in Instagram's own browser.)
8. Tablets (no hover): phone behaviour or desktop look?
9. Presentation: real phone, or desktop + phone side by side on one screen?
10. Hero and video tiles on a phone: one system that moves the same way, or deliberately different?

Add new questions here as they come up.

---

## Built on feature/mobile

- **Mobile menu (27 Oct, not merged yet):** links 24px (H3 size, Geist 450, −0.03em), rows
  52px (above Google's 48px minimum), active page bold Egret like the desktop nav, links fade
  in one after another (50ms apart), tagline + social icons at the bottom in the thumb zone.
  Hover colours only on hover devices (the X stayed Wild Honey after a tap). Social icons are
  now one shared component (`SocialLinks.astro`) for footer + menu.
  Tried and dropped the same day: 32px + "01 / 02 / 03" numbers (too big, Dardan didn't like
  the numbers); 20px vs 24px compared → **24px chosen** (already in the type scale).
  Learned: the old menu's size wasn't the "cheap" part – loose 64px rows and the empty
  screen were.
  Panel (28 Oct, from 75 / 85 / 92%): smoked glass, **92% Dark Obsidian** + the normal glass
  blur – the page behind only shows as a hint. Much darker than the normal glass (45%).
  OPEN: should the Pack drawer use the same surface – one system?

## Later – other pages (collect ideas here)

- Product page: one column, no sticky column, photo viewer with swipe + pinch, maybe a
  fixed "Add to pack" bar at the bottom.
- **Product page gallery as a swipe row (Dardan, 27 Oct, idea):** today on a phone all photos
  stack, so name, sizes and "Add to pack" sit far down. Idea: one photo row – shot 0 first,
  an indicator that you can swipe left/right through all shots; for people who don't swipe,
  it moves on by itself. Then name, price, sizes come right after the photo.
  Claude's notes for the Q&A: swipe row = CSS scroll snap (already planned in CLAUDE.md 7 for
  the product gallery). Auto-moving needs a pause button (WCAG 2.2.2), stops for good once the
  visitor touches it, off with reduced motion. Alternative to compare: no auto-move, the next
  photo peeks in at the edge (shows "there's more") + dots or "1 / 6".
  Question: auto-move or peek only? How fast? Loop or stop at the last photo?
  **Dardan leans to the alternative (27 Oct):** peek at the edge + small dots, no auto-move.
  **Dardan's fuller idea (28 Oct):** on a phone only the first photo shows – all photos in one
  swipe row, never stacked on the page. It must be obvious at once that you can swipe
  (peek + the dots from 27 Oct). Two ways in: swipe right on the page, or **tap → the photo
  viewer**, where you swipe too. The viewer looks very similar to the page row, plus **zoom**
  (pinch) – but only as far as we allow: never visible pixels (same rule as the desktop viewer:
  max = photo's real width ÷ shown width, never above 2.5×). The win: right under the one photo
  sits the product name ("The Traveler's Half-Zip" …), price, sizes – the luxury look of a
  short page.
  Claude's notes for the Q&A: the zoom limit is for our own photo zoom only – the browser's
  page zoom stays free (accessibility, like on desktop). The dots must be big enough to see but
  are not the only way (swipe + a "1 / 6" for screen readers). Pinch + swipe = small JS in
  `photo-viewer.js` (touch events), the page row itself = CSS scroll snap, no JS except the dots.
  **Answers (Dardan, 28 Oct):** colour/fit switch swaps the photos in the row – yes, like
  desktop (already a rule, CLAUDE.md 10). Dots: on the page **under** the photo; tap → the
  photo goes **full screen**, clearly swipeable, dots **inside** the picture. Exact look of the
  dots: decide when building. OPEN: tablet – row or desktop grid, decide when building.
- **Menu and Pack drawer as one system (Dardan, 27 Oct):** they open and close completely
  differently. They may differ (two purposes), but should feel like one system. Dardan also
  raises it in the Pack chat (step 1).
  Today (checked in the code):
  | | Mobile menu (`Header.astro`) | Pack drawer (`pack-drawer.css`, Pack branch) |
  |---|---|---|
  | Movement | fades in + moves 8px down | slides in from the right, full width |
  | Speed | 0.2s | 0.3s |
  | Background | Dark Obsidian | Obsidian |
  | Page behind | hidden (panel fills the screen under the header) | dimmed 70% |
  | Header | stays visible | covered |
  Claude's idea for the Q&A: keep the direction different (menu = from the header, Pack =
  from the right), but share everything else – one speed + easing token for both, the same
  surface colour, the same close button (look + place), the same dimmed backdrop. Same
  "grammar", different direction.
  Question: same movement for both, or only the shared details?
- Products: card fit icons on touch (no hover photo).
- Contact & FAQ: mobile layout; the trail is already desktop only.
- Home sections: written mobile first from the start (video tiles already have a mobile idea
  in `drafts/site-ideas.md`).

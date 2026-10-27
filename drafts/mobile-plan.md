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
- **Video to check:** "The Secret to Mobile Web Conversion" – Malewicz (YouTube). Claude
  can't watch it → Dardan writes down his 3–5 main points, then we compare.

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

Build as `?version=` comparison on `feature/mobile`, Dardan picks.

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
- Products: card fit icons on touch (no hover photo).
- Contact & FAQ: mobile layout; the trail is already desktop only.
- Home sections: written mobile first from the start (video tiles already have a mobile idea
  in `drafts/site-ideas.md`).

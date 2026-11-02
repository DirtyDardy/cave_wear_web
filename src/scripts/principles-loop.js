// HOME – RUGGED · FUNCTIONAL · REFINED ON TOUCH SCREENS (phones, tablets – no hover).
// With a mouse the visitor picks a tile by hovering (CSS only). A finger can't
// hover, so here the tiles take turns by themselves: Functional starts in the
// middle, then Refined, Rugged, Functional … The pause button stops it, and so does a
// swipe: whoever swipes wants to choose, so from then on the tiles only follow the finger.
// It only runs while the section is on screen and never while the hero is still
// switching by itself – two things moving at once would be too much.
// Reduced motion: nothing moves – phones show the three tiles under each other.

const section = document.querySelector(".principles");

const TILE_TIME = 4000; // ms – how long each tile stays the big one (1 Nov: 5 s felt too slow)
const START_TIME = 1000; // ms – the first move once the section is on screen (1 Nov: my friends
// scrolled past without noticing that it moves, so it has to show that early)
const MOVE_TIME = 600; // ms – how long a tile takes to move (same as the CSS transition)
const SWIPE_DISTANCE = 40; // px – a finger moving less than this sideways is no swipe

const touchScreen = matchMedia("(hover: none)");
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const row3 = matchMedia("(width >= 48rem)"); // the three tiles stand in a row

// STEADY HEIGHT (tablet + desktop, 31 Oct). While one tile shrinks and the next
// one grows, both are half-way for a moment – the row got ~60px shorter and
// everything below it jumped up and down (and the scroll snap pulled the page
// along). So the row keeps the height it has at rest: measured once, and again
// whenever the window size changes.
const row = section?.querySelector(".principles-row"); // ?. = only if the section exists

function lockHeight() {
  if (!row) return;
  row.style.minBlockSize = ""; // first let it find its own height …
  if (row3.matches) row.style.minBlockSize = `${row.offsetHeight}px`; // … then keep it
}

lockHeight();
window.addEventListener("resize", lockHeight);

if (section && !calm) {
  const tiles = [...section.querySelectorAll(".principle")]; // [...] = turn the list into an array
  const pauseButton = section.querySelector(".principles-pause");
  const hero = document.querySelector(".hero-split");

  let active = 1; // which tile is big: 0 Rugged, 1 Functional, 2 Refined
  let timer = null; // the waiting clock (setTimeout)
  let paused = false;
  let inView = false;

  // 1. Put every tile in its place, seen from the active one:
  //    the active tile = "active", the one after it = "next" (right),
  //    the one before it = "prev" (left). CSS moves them there.
  function show(index) {
    // The tile that is big right now stays on top while it shrinks, so the new
    // one comes up from behind it (not in front of it). After the move it's normal again.
    const leaving = tiles.find((tile) => tile.dataset.place === "active");
    if (leaving) {
      leaving.setAttribute("data-leaving", "");
      setTimeout(() => leaving.removeAttribute("data-leaving"), MOVE_TIME);
    }

    // % = the rest after dividing: 3 % 3 = 0, so after the last tile comes the first
    active = (index + tiles.length) % tiles.length;

    tiles.forEach((tile, i) => {
      const place = ["active", "next", "prev"][(i - active + tiles.length) % tiles.length];
      // A tile going from one far side to the other would fly across the
      // screen – mark it, so CSS lets it disappear and fade in on its new side
      const old = tile.dataset.place;
      tile.toggleAttribute("data-jump", (old === "prev" && place === "next") || (old === "next" && place === "prev"));
      tile.dataset.place = place;
    });

    // Two frames later (the browser has drawn the new places): fade it back in
    requestAnimationFrame(() =>
      requestAnimationFrame(() => tiles.forEach((tile) => tile.removeAttribute("data-jump"))),
    );
  }

  // 2. Is the hero still switching by itself? (It runs while at least half of
  //    it is on screen and its pause button isn't on "play".)
  function heroMoving() {
    if (!hero || !hero.hasAttribute("data-auto")) return false;
    if (hero.querySelector(".hero-pause")?.hasAttribute("data-paused")) return false;
    const box = hero.getBoundingClientRect();
    const visible = Math.min(box.bottom, innerHeight) - Math.max(box.top, 0);
    return visible >= box.height / 2;
  }

  // 3. The clock: wait, then the next tile becomes the big one, and so on.
  //    While the hero is still moving it just looks again a second later.
  //    wait = TILE_TIME: if nobody says how long to wait, it's the normal time.
  function run(wait = TILE_TIME) {
    clearTimeout(timer);
    if (!section.hasAttribute("data-loop") || paused || !inView) return;
    if (heroMoving()) {
      timer = setTimeout(() => run(wait), 1000);
      return;
    }
    timer = setTimeout(() => {
      show(active + 1);
      run();
    }, wait);
  }

  // 4. Only while at least half of the section is on screen
  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      run(START_TIME); // just came on screen: the first move comes quickly
    },
    { threshold: 0.5 },
  );
  observer.observe(section);

  // 5. Pause / play. The label tells screen readers what a tap will do.
  function setPaused(value) {
    paused = value;
    pauseButton.toggleAttribute("data-paused", paused);
    pauseButton.setAttribute("aria-label", paused ? "Play" : "Pause");
  }

  pauseButton.addEventListener("click", () => {
    setPaused(!paused);
    run();
  });

  // 6. Tapping a small tile at the side makes it the big one (and the clock
  //    starts over, so it stays a moment)
  tiles.forEach((tile, i) => {
    tile.addEventListener("click", () => {
      if (!section.hasAttribute("data-loop") || i === active) return;
      show(i);
      run();
    });
  });

  // 7. Swiping. touchstart notes where the finger lands, touchend where it lifts.
  //    Mostly sideways and far enough = a swipe: the loop stops and the next or previous
  //    tile becomes the big one. Mostly up and down = the page scrolls as usual.
  let touchX = 0;
  let touchY = 0;

  row.addEventListener(
    "touchstart",
    (event) => {
      touchX = event.touches[0].clientX;
      touchY = event.touches[0].clientY;
    },
    { passive: true },
  );

  row.addEventListener(
    "touchend",
    (event) => {
      const sideways = event.changedTouches[0].clientX - touchX;
      const upDown = event.changedTouches[0].clientY - touchY;
      if (!section.hasAttribute("data-loop")) return;
      if (Math.abs(sideways) < SWIPE_DISTANCE || Math.abs(sideways) < Math.abs(upDown)) return;

      setPaused(true);
      run(); // stops the waiting clock
      show(active + (sideways < 0 ? 1 : -1)); // finger to the left = the next tile
    },
    { passive: true },
  );

  // 8. Switch the whole thing on or off. Runs once now, and again whenever the
  //    device changes (a mouse plugged into a tablet, or the browser's phone mode).
  function setUp() {
    const on = touchScreen.matches;
    section.toggleAttribute("data-loop", on); // CSS: the phone layout with places
    pauseButton.hidden = !on;
    if (on) show(active);
    else tiles.forEach((tile) => delete tile.dataset.place);
    run();
  }

  setUp();
  touchScreen.addEventListener("change", setUp);
}

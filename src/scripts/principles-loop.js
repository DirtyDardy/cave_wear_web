// HOME – RUGGED · FUNCTIONAL · REFINED ON TOUCH SCREENS (phones, tablets – no hover).
// With a mouse the visitor picks a tile by hovering (CSS only). A finger can't
// hover, so here the tiles take turns by themselves: Functional starts in the
// middle, then Refined, Rugged, Functional … The pause button stops it.
// It only runs while the section is on screen and never while the hero is still
// switching by itself – two things moving at once would be too much.
// Reduced motion: nothing moves – phones show the three tiles under each other.

const section = document.querySelector(".principles");

const TILE_TIME = 5000; // ms – how long each tile stays the big one

const touchScreen = matchMedia("(hover: none)");
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    // % = the rest after dividing: 3 % 3 = 0, so after the last tile comes the first
    active = (index + tiles.length) % tiles.length;

    tiles.forEach((tile, i) => {
      const place = ["active", "next", "prev"][(i - active + tiles.length) % tiles.length];
      // A tile going from the far left to the far right would fly across the
      // screen – mark it, so CSS lets it disappear and fade in on its new side
      tile.toggleAttribute("data-jump", tile.dataset.place === "prev" && place === "next");
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
  function run() {
    clearTimeout(timer);
    if (!section.hasAttribute("data-loop") || paused || !inView) return;
    if (heroMoving()) {
      timer = setTimeout(run, 1000);
      return;
    }
    timer = setTimeout(() => {
      show(active + 1);
      run();
    }, TILE_TIME);
  }

  // 4. Only while at least half of the section is on screen
  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      run();
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

  // 7. Switch the whole thing on or off. Runs once now, and again whenever the
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

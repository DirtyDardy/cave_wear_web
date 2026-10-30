// HOME HERO ON TOUCH SCREENS (phones, tablets – no hover).
// On desktop the mouse picks a side. A finger can't hover, so here time does it:
// first both sides together (the rest state – what desktop shows on load), then
// wild and anywhere take turns by themselves. The pause button stops it on the
// side you're on. Reduced motion: nothing moves, the rest state stays.

const hero = document.querySelector(".hero-split");
const pauseButton = hero?.querySelector(".hero-pause");

const REST_TIME = 2000; // ms – the rest state before the first switch (decided 30 Oct)
const SIDE_TIME = 4500; // ms – how long each side stays (decided 30 Oct, 3.5 s felt rushed)

// matchMedia = a media query in JavaScript. .matches is true or false right now,
// and it can tell us when the answer changes (see step 5).
const touchScreen = matchMedia("(hover: none)");
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hero && !calm) {
  let timer = null; // the waiting clock (setTimeout)
  let paused = false;
  let inView = false;
  let started = false; // has the rest state had its turn?

  // 1. Show the other side, then wait again
  function next() {
    hero.dataset.side = hero.dataset.side === "wild" ? "anywhere" : "wild";
    timer = setTimeout(next, SIDE_TIME);
  }

  // 2. Start the clock – only on a touch screen, while the hero is on screen
  //    and not paused. The very first wait is the rest state, every later one a side.
  function run() {
    clearTimeout(timer);
    if (!touchScreen.matches || paused || !inView) return;
    timer = setTimeout(next, started ? SIDE_TIME : REST_TIME);
    started = true;
  }

  // 3. The clock only runs while at least half of the hero is on screen –
  //    nobody misses the start, and nothing runs while they read further down
  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      if (inView) run();
      else clearTimeout(timer);
    },
    { threshold: 0.5 },
  );
  observer.observe(hero);

  // 4. Pause / play. The label tells screen readers what a tap will do.
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.toggleAttribute("data-paused", paused);
    pauseButton.setAttribute("aria-label", paused ? "Play" : "Pause");
    if (paused) clearTimeout(timer);
    else run();
  });

  // 5. Switch the whole thing on or off. Runs once now, and again whenever the
  //    device changes (a mouse plugged into a tablet, or the browser's phone mode).
  function setUp() {
    const on = touchScreen.matches;
    hero.toggleAttribute("data-auto", on); // CSS: the slower, calmer fade
    pauseButton.hidden = !on;
    if (!on) {
      delete hero.dataset.side; // back to the rest state – the mouse takes over
      started = false;
    }
    run();
  }

  setUp();
  touchScreen.addEventListener("change", setUp);
}

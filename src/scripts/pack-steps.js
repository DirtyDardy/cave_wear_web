// HOME – HOW THE PACK WORKS. The "Open your pack" button, and the Wild Honey dot that
// walks along the trail by itself: from outside the screen to 1, 2, 3 and out again.
// Each number it reaches turns Wild Honey and its text appears for as long as it stays.
// It stops after 3 rounds with all three texts showing, and only runs on screen.
// Reduced motion: nothing moves – the section simply shows all three texts.
import { openPack } from "./pack-store";

const section = document.querySelector(".home-pack");

const REST_TIME = 4500; // ms – how long the dot stays at a number: reading time (same as the hero)
const MOVE_TIME = 1500; // ms – the way to the next stop (same as the CSS transition)
const START_TIME = 500; // ms – the first move once the section is on screen

section?.querySelector(".home-pack-open").addEventListener("click", openPack);

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (section && !calm) {
  const track = section.querySelector(".pack-track");
  const dot = section.querySelector(".pack-dot");
  const steps = [...section.querySelectorAll(".pack-step")]; // [...] = turn the list into an array
  const numbers = steps.map((step) => step.querySelector(".pack-number"));
  const pauseButton = section.querySelector(".home-pack-pause");
  const across = matchMedia("(width >= 48rem)"); // the trail lies across (phones: it runs down)

  let stop = -1; // where the dot is: -1 outside at the start, 0 1 2 the numbers, 3 outside at the end
  let round = 1;
  let rounds = 3; // 3 rounds, then it stops by itself
  let timer = null; // the waiting clock (setTimeout)
  let next = null; // what happens when the clock runs out
  let paused = false;
  let inView = false;

  // 1. Where is a stop? Measured fresh every time, so it fits any screen size.
  //    The numbers tell us the line; outside = one dot size past the edge of the track.
  function place(index) {
    const box = track.getBoundingClientRect();
    const number = numbers[Math.min(Math.max(index, 0), numbers.length - 1)].getBoundingClientRect();
    let x = number.left + number.width / 2 - box.left;
    let y = number.top + number.height / 2 - box.top;
    const outside = dot.offsetWidth;

    if (index < 0) {
      if (across.matches) x = -outside;
      else y = -outside;
    }
    if (index >= numbers.length) {
      if (across.matches) x = box.width + outside;
      else y = box.height + outside;
    }
    return `translate(${x}px, ${y}px)`;
  }

  // Put the dot somewhere without sliding there
  function jump(index) {
    dot.style.transition = "none";
    dot.style.transform = place(index);
    dot.getBoundingClientRect(); // asking for its position makes the browser apply it now
    dot.style.transition = "";
  }

  // 2. The clock: wait, then do the next thing. Remembering "next" means a pause
  //    can pick up exactly where it stopped.
  function after(wait, then) {
    next = then;
    clearTimeout(timer);
    if (!paused && inView) timer = setTimeout(then, wait);
  }

  // 3. The walk, one piece at a time
  function startRound() {
    steps.forEach((step) => step.removeAttribute("data-reached"));
    dot.hidden = false;
    jump(-1);
    moveTo(0);
  }

  function moveTo(index) {
    stop = index;
    steps.forEach((step) => step.removeAttribute("data-current")); // the text fades when the dot leaves
    dot.style.transform = place(stop);
    after(MOVE_TIME, arrive);
  }

  function arrive() {
    // Walked out at the end of the line: the next round starts from the beginning
    if (stop === steps.length) {
      round += 1;
      startRound();
      return;
    }
    steps[stop].setAttribute("data-reached", "");
    steps[stop].setAttribute("data-current", "");
    after(REST_TIME, leave);
  }

  function leave() {
    const lastNumber = stop === steps.length - 1;
    if (lastNumber && round >= rounds) finish();
    else moveTo(stop + 1);
  }

  // The last round is over: the dot stays hidden behind the 3 and all texts show
  function finish() {
    next = startRound;
    setPaused(true);
  }

  // 4. Pause / play. Paused = nothing hides any more: all three texts show.
  //    The label tells screen readers what a click will do.
  function setPaused(value) {
    paused = value;
    pauseButton.toggleAttribute("data-paused", paused);
    pauseButton.setAttribute("aria-label", paused ? "Play" : "Pause");
    section.toggleAttribute("data-running", !paused);
    if (paused) clearTimeout(timer);
  }

  pauseButton.addEventListener("click", () => {
    setPaused(!paused);
    if (paused) return;
    rounds = Infinity; // whoever presses play chose it, so it doesn't stop by itself (like the hero)
    after(START_TIME, next);
  });

  // 5. Only while at least half of the track is on screen
  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      if (inView) after(START_TIME, next);
      else clearTimeout(timer);
    },
    { threshold: 0.5 },
  );

  // 6. A new width moves the numbers, so the dot goes to its new place. Only the
  //    width counts: on phones the browser bar changes the height while scrolling.
  let lastWidth = innerWidth;
  window.addEventListener("resize", () => {
    if (innerWidth === lastWidth) return;
    lastWidth = innerWidth;
    if (!dot.hidden) jump(stop);
  });

  // 7. Everything is ready: show the pause button, hide the texts, start watching
  next = startRound;
  pauseButton.hidden = false;
  section.setAttribute("data-running", "");
  observer.observe(track);
}

// HOME – HOW THE PACK WORKS. The "Open your pack" button, and the dot that walks along the
// trail once: from outside the screen to 1, 2 and 3, where it stays hidden behind the
// number. The line behind it takes its colour, each number it reaches does too, that
// number's text appears and stays, and its technical drawing plays (PackDrawing.astro).
// - Tablet and desktop: by itself, once the section is on screen. It moves for less than
//   5 seconds, so it needs no pause button (WCAG 2.2.2).
// - Phones (my idea, 1 Nov): the steps stand under each other, so on a timer they would
//   play before anyone sees them. Here scrolling starts each step, when it comes into view.
// Reduced motion: nothing moves – the section simply shows all three texts and drawings.
import { openPack } from "./pack-store";

const section = document.querySelector(".home-pack");

const START_TIME = 500; // ms – before the first move, once the section is on screen
// ms into a move (0.8 s, --pack-move in the CSS): the dot slips behind the number, measured:
// it starts to disappear at ~370, it's gone at ~530 (1 Nov: at 800 the colour came too late)
const REACH_TIME = 450;
// ms – from the colour to the next move. RULE (1 Nov): a drawing has to be over before
// the next number gets its colour, so it gets at most REST_TIME + REACH_TIME.
const REST_TIME = 1200;

// The drawings are 400 units wide, so 1px on screen is a different number of units on each
// screen size. CSS draws their lines with this number (--line), so they always stay 1px.
function setLineWidth() {
  const width = section?.querySelector(".pack-step-drawing")?.clientWidth;
  if (width) section.style.setProperty("--line", 400 / width);
}

setLineWidth();
window.addEventListener("resize", setLineWidth);

section?.querySelector(".home-pack-open").addEventListener("click", openPack);

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (section && !calm) {
  const track = section.querySelector(".pack-track");
  const walked = section.querySelector(".pack-walked");
  const dot = section.querySelector(".pack-dot");
  const steps = [...section.querySelectorAll(".pack-step")]; // [...] = turn the list into an array
  const numbers = steps.map((step) => step.querySelector(".pack-number"));
  const drawings = steps.map((step) => step.querySelector(".pack-step-drawing"));
  const across = matchMedia("(width >= 48rem)"); // the trail lies across (phones: it runs down)

  let stop = -1; // where the dot is: -1 outside the screen, 0 1 2 the numbers

  // 1. Send the dot to a stop, and cut the coloured line off at the same place.
  //    Measured fresh every time, so it fits any screen size. The numbers tell us
  //    the line; outside = one dot size past the edge of the track.
  function show(index) {
    const box = track.getBoundingClientRect();
    const number = numbers[Math.max(index, 0)].getBoundingClientRect();
    let x = number.left + number.width / 2 - box.left;
    let y = number.top + number.height / 2 - box.top;

    if (index < 0) {
      if (across.matches) x = -dot.offsetWidth;
      else y = -dot.offsetWidth;
    }
    dot.style.transform = `translate(${x}px, ${y}px)`;
    // inset(top right bottom left) = how much to cut away on each side
    walked.style.clipPath = across.matches ? `inset(0 ${box.width - x}px 0 0)` : `inset(0 0 ${box.height - y}px 0)`;
  }

  // The same, but straight there without sliding
  function jump(index) {
    dot.style.transition = "none";
    walked.style.transition = "none";
    show(index);
    dot.getBoundingClientRect(); // asking for its position makes the browser apply it now
    dot.style.transition = "";
    walked.style.transition = "";
  }

  // The dot and the coloured line appear, outside the screen
  function enter() {
    dot.hidden = false;
    walked.hidden = false;
    jump(-1);
  }

  // 2. TABLET AND DESKTOP: the walk. Go to a number. The moment the dot slips behind it,
  //    mark it (CSS colours the number, shows the text and plays the drawing), rest, go on.
  function moveTo(index) {
    stop = index;
    show(stop);
    setTimeout(() => {
      steps[stop].setAttribute("data-reached", "");
      if (stop < steps.length - 1) setTimeout(() => moveTo(stop + 1), REST_TIME);
    }, REACH_TIME);
  }

  // It starts the first time the 1 is in the upper 60% of the screen, and only ever runs
  // once. rootMargin makes the area the observer looks at smaller: -40% cuts the lower
  // part of the screen off.
  const walkObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      walkObserver.disconnect();
      enter();
      setTimeout(() => moveTo(0), START_TIME);
    },
    { rootMargin: "0px 0px -40% 0px" },
  );

  // 3. PHONES: the dot only goes to a number when that step comes into view. Whoever
  //    scrolls fast past a step doesn't lose it: everything up to here gets marked.
  function reach(index) {
    if (index <= stop) return; // already there (scrolling back up changes nothing)
    if (dot.hidden) enter();
    stop = index;
    show(stop);
    setTimeout(() => {
      steps.slice(0, index + 1).forEach((step) => step.setAttribute("data-reached", ""));
    }, REACH_TIME);
  }

  // A step starts when half of its drawing is on screen: the number and the text are
  // already visible then, so you see all of it happen.
  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        stepObserver.unobserve(entry.target); // each step only once
        reach(drawings.indexOf(entry.target));
      });
    },
    { threshold: 0.5 },
  );

  // 4. A new width moves the numbers, so the dot and the line go to their new place.
  //    Only the width counts: on phones the browser bar changes the height while scrolling.
  let lastWidth = innerWidth;
  window.addEventListener("resize", () => {
    if (innerWidth === lastWidth) return;
    lastWidth = innerWidth;
    if (!dot.hidden) jump(stop);
  });

  // 5. Everything is ready: hide the texts until the dot gets there, start watching
  section.setAttribute("data-running", "");
  if (across.matches) walkObserver.observe(numbers[0]);
  else drawings.forEach((drawing) => stepObserver.observe(drawing));
}

// HOME – HOW THE PACK WORKS. The "Open your pack" button, and the dot that walks along
// the trail once, the first time the section is on screen: from outside the screen to
// 1, 2 and 3, where it stays hidden behind the number. The line behind it takes its
// colour, each number it reaches and that number's card do too, and its text appears and stays.
// It moves for less than 5 seconds, so it needs no pause button (WCAG 2.2.2).
// Reduced motion: nothing moves – the section simply shows all three texts.
import { openPack } from "./pack-store";

const section = document.querySelector(".home-pack");

const START_TIME = 500; // ms – before the first move, once the section is on screen
// ms into a move (0.8 s, --pack-move in the CSS): the dot slips behind the number, measured:
// it starts to disappear at ~370, it's gone at ~530 (1 Nov: at 800 the colour came too late)
const REACH_TIME = 450;
// ms – from the colour to the next move. RULE (1 Nov): a card's animation has to be over
// before the next number gets its colour, so it gets at most REST_TIME + REACH_TIME.
const REST_TIME = 1200;

section?.querySelector(".home-pack-open").addEventListener("click", openPack);

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (section && !calm) {
  const track = section.querySelector(".pack-track");
  const walked = section.querySelector(".pack-walked");
  const dot = section.querySelector(".pack-dot");
  const steps = [...section.querySelectorAll(".pack-step")]; // [...] = turn the list into an array
  const numbers = steps.map((step) => step.querySelector(".pack-number"));
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

  // 2. The walk: go to a number. The moment the dot slips behind it, mark it (CSS colours
  //    the number and the card's outline, and shows the text), rest, then on to the next.
  function moveTo(index) {
    stop = index;
    show(stop);
    setTimeout(() => {
      steps[stop].setAttribute("data-reached", "");
      if (stop < steps.length - 1) setTimeout(() => moveTo(stop + 1), REST_TIME);
    }, REACH_TIME);
  }

  // 3. The first time the 1 is in the upper 60% of the screen: start, and stop watching –
  //    it only ever runs once. Watching the 1 (not the whole track) means it also starts
  //    on a small screen, where the tall track never fits. rootMargin makes the area
  //    the observer looks at smaller: -40% cuts the lower part of the screen off.
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      dot.hidden = false;
      walked.hidden = false;
      jump(-1);
      setTimeout(() => moveTo(0), START_TIME);
    },
    { rootMargin: "0px 0px -40% 0px" },
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
  observer.observe(numbers[0]);
}

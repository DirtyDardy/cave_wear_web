// BRAND – ON RECORD: THE NUMBER COUNTS UP AND THE BARS GROW, THE FIRST TIME YOU SEE THEM (4 Nov).
// The bars' movement is CSS (BrandRecords.astro). This script says when they start, and it writes
// the number. Without it the finished number and the full bars simply stand there.

const number = document.querySelector("[data-count-to]");
const list = document.querySelector(".brand-records-list");

// On every screen, but never for people who asked for less motion
const wanted = window.matchMedia("(prefers-reduced-motion: no-preference)");

const countUpBy = 1000; // 54,035 to 55,035: the first digit stays, the next changes once, the last three roll
const countTime = 1200; // in milliseconds, about as long as the bars need

// Runs `action` once, the first time that much of the element is on screen (1 = all of it).
// IntersectionObserver is the browser telling us "this is on screen now".
function onFirstSight(element, share, action) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      action();
      observer.disconnect(); // once is enough
    },
    { threshold: share },
  );
  observer.observe(element);
}

function write(value) {
  number.textContent = value.toLocaleString("en-GB"); // with the comma: 55,035
}

function countUp() {
  const end = Number(number.dataset.countTo);
  const startTime = performance.now();

  // requestAnimationFrame = "run this right before the screen draws its next picture", about 60
  // times a second. Each time we work out how far along we are and write that number.
  function step(now) {
    const progress = Math.min((now - startTime) / countTime, 1); // 0 = just started, 1 = done
    const eased = 1 - (1 - progress) ** 3; // fast at first, so the last numbers tick by slowly
    write(Math.round(end - countUpBy + countUpBy * eased));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

if (number && list && wanted.matches) {
  write(Number(number.dataset.countTo) - countUpBy); // it waits at its starting number
  list.dataset.grow = "waiting"; // the CSS keeps the bars at nothing

  onFirstSight(number, 1, countUp);
  onFirstSight(list, 0.6, () => {
    list.dataset.grow = "go";
  });
}

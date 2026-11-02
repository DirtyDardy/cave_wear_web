// PHONES: the pieces in Today's pick stand in a sideways row, one at a time (the CSS swipe
// row in field-conditions.css). This makes them slide by themselves, so people see there is
// more. The first touch stops it for good and the finger takes over. Also waits while the
// section's pause button is on "play", and stands still with reduced motion.

const SLIDE_TIME = 3000; // ms – how long each piece stays

// Returns a function that stops everything again; React calls it when the pieces change.
export function startSliding(list: HTMLElement) {
  const phone = matchMedia("(width < 48rem)").matches;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!phone || calm || list.children.length < 2) return () => {};

  let current = 0;
  let onScreen = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
    },
    { threshold: 0.5 },
  );
  observer.observe(list);

  const timer = setInterval(() => {
    const paused = document.querySelector(".field-pause")?.hasAttribute("data-paused");
    if (!onScreen || paused) return;
    current = (current + 1) % list.children.length; // after the last one comes the first
    list.scrollTo({ left: current * list.clientWidth, behavior: "smooth" });
  }, SLIDE_TIME);

  function stop() {
    clearInterval(timer);
    observer.disconnect();
    list.removeEventListener("touchstart", stop);
  }

  list.addEventListener("touchstart", stop, { passive: true });
  return stop;
}

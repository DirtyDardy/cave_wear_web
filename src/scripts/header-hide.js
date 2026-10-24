// Header hides when scrolling down and comes back when scrolling up.
// CSS does the sliding – this script only sets or removes data-hidden.

const header = document.querySelector(".site-header");
const threshold = 8; // px to scroll in one direction before anything happens

// Where hiding may start. Normally below the header (72px). On photo pages we wait
// until the background fade is finished (--header-fade-distance, 200px),
// so the fade is visible and the header always comes back solid.
const rootStyle = getComputedStyle(document.documentElement);
const remInPx = parseFloat(rootStyle.fontSize);
const fadeDistance = parseFloat(rootStyle.getPropertyValue("--header-fade-distance")) * remInPx;
const hideStart = header.hasAttribute("data-transparent") ? fadeDistance : header.offsetHeight;

let lastY = window.scrollY;
let ticking = false;

function update() {
  const y = window.scrollY;
  const distance = y - lastY;

  if (y <= hideStart) {
    // Near the top of the page: always visible
    header.removeAttribute("data-hidden");
    lastY = y;
  } else if (distance > threshold) {
    // Scrolled down far enough: hide
    header.setAttribute("data-hidden", "");
    lastY = y;
  } else if (distance < -threshold) {
    // Scrolled up far enough: show
    header.removeAttribute("data-hidden");
    lastY = y;
  }

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  },
  { passive: true },
);

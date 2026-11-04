// Header hides when scrolling down and comes back when scrolling up.
// CSS does the sliding – this script only sets or removes data-hidden.

const header = document.querySelector(".site-header");
const threshold = 8; // px to scroll in one direction before anything happens

// Where hiding may start. Normally below the header (64px). On photo pages we wait
// until the background fade is finished (--header-fade-distance, 200px),
// so the fade is visible and the header always comes back solid.
const rootStyle = getComputedStyle(document.documentElement);
const remInPx = parseFloat(rootStyle.fontSize);
const fadeDistance = parseFloat(rootStyle.getPropertyValue("--header-fade-distance")) * remInPx;
const hideStart = header.hasAttribute("data-transparent") ? fadeDistance : header.offsetHeight;

// iPhones (every browser there uses Apple's WebKit) let the page bounce past the
// top and bottom and spring back ("rubber band"). Those bounce pixels are not
// real scrolling, so we only count positions inside the real scroll range.
function scrollPosition() {
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(Math.max(window.scrollY, 0), maxY);
}

let lastY = scrollPosition();
let ticking = false;

function update() {
  const y = scrollPosition();
  const distance = y - lastY;

  if (header.hasAttribute("data-frozen")) {
    // A section asked for no change right now (My Symbol on Brand, brand-symbol.js)
    lastY = y;
  } else if (y <= hideStart) {
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

// Product pages have data-pinned on the header (Header.astro): there the header
// never hides, so we only listen for scrolling on all other pages.
if (!header.hasAttribute("data-pinned")) {
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

  // Phone browser bars grow and shrink while scrolling and change the window
  // height. That jump is not the visitor scrolling: start counting fresh.
  window.addEventListener("resize", () => {
    lastY = scrollPosition();
  });
}

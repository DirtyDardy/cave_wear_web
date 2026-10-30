// Phone only: the dots under the product photo row.
// One dot per photo you can swipe to (shot 0 + the chosen colour/fit's shots 1–5).
// The dot of the photo you see lights up; a tap on a dot glides to its photo.
// From 768px the dots are hidden by CSS – there the photos are a grid.
const gallery = document.querySelector(".gallery");
const dots = document.querySelector(".gallery-dots");

// 1. The photos in the row right now. Photos in a hidden set have no
//    "offsetParent" (the browser doesn't lay them out), so they drop out.
function visiblePhotos() {
  return [...gallery.querySelectorAll(".photo-button")].filter((photo) => photo.offsetParent !== null);
}

// 2. Which photo is in view: the one whose left edge is closest to the row's left edge
function currentIndex(photos) {
  const rowLeft = gallery.getBoundingClientRect().left;
  const distances = photos.map((photo) => Math.abs(photo.getBoundingClientRect().left - rowLeft));
  return distances.indexOf(Math.min(...distances));
}

// 3. Light up the dot of the photo in view (aria-current = "this one" for screen readers too)
function markCurrent() {
  const index = currentIndex(visiblePhotos());
  [...dots.children].forEach((dot, n) => dot.toggleAttribute("aria-current", n === index));
}

// 4. Make one dot button per photo. A tap scrolls the row so that photo sits at the start.
function buildDots() {
  const photos = visiblePhotos();

  const buttons = photos.map((photo, n) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot";
    dot.setAttribute("aria-label", `Photo ${n + 1} of ${photos.length}`);
    dot.addEventListener("click", () => {
      const distance = photo.getBoundingClientRect().left - gallery.getBoundingClientRect().left;
      gallery.scrollTo({ left: gallery.scrollLeft + distance });
    });
    return dot;
  });

  dots.replaceChildren(...buttons);
  markCurrent();
}

// 5. Swiping moves the light; a new colour or fit brings new photos → new dots.
//    requestAnimationFrame waits one frame, so product-options.js has swapped the photos first.
gallery.addEventListener("scroll", markCurrent, { passive: true });
document.addEventListener("change", (event) => {
  if (event.target.name === "colour" || event.target.name === "fit") {
    requestAnimationFrame(buildDots);
  }
});

buildDots();

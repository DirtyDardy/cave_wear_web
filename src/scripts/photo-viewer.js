// PHOTO VIEWER on the product page (from my mockup).
// A click on a gallery photo opens it big; the neighbours peek in left and right.
// ‹ ›, the arrow keys or a click on a neighbour go round in a circle (after the
// last photo comes the first). A click on the big photo zooms in – only inside the
// photo and never further than its real pixels – the mouse looks around, another
// click zooms out. Escape or × closes.

const viewer = document.querySelector(".viewer");
const stage = viewer.querySelector(".viewer-stage");
const prevArrow = viewer.querySelector(".viewer-prev");

const SIDE_SCALE = 0.82; // neighbours are 82% of the big photo (CSS uses the same number)
const MAX_ZOOM = 2.5; // never more than 2.5×, even for very large photos
const MIN_ZOOM = 1.25; // less than that isn't worth zooming – then the click does nothing

let slides = []; // the photos in the viewer
let current = 0; // the one in the middle

// --- Where each photo goes ----------------------------------------------------------

// How many places a photo is away from the middle, counted round the circle:
// with 6 photos and photo 0 in the middle, photo 5 is −1 (left), photo 1 is +1 (right).
function offsetOf(index) {
  const count = slides.length;
  const offset = (index - current + count) % count; // 0 … count-1
  return offset > count / 2 ? offset - count : offset;
}

// How far a photo moves sideways, in photo widths. The neighbours touch the big
// photo: half the big one + half a small one, then one small photo width per step.
function shiftFor(offset) {
  if (offset === 0) return 0;
  const steps = Math.abs(offset);
  const distance = 0.5 + SIDE_SCALE / 2 + (steps - 1) * SIDE_SCALE;
  return Math.sign(offset) * distance;
}

// Puts every photo in its place. The photo that wraps round from one end to the
// other gets "is-jumping" (no animation), so it doesn't fly across the screen.
function render() {
  slides.forEach((slide, index) => {
    const offset = offsetOf(index);
    const before = slide.dataset.offset === undefined ? offset : Number(slide.dataset.offset);
    const jumping = Math.abs(offset - before) > 1;

    slide.classList.toggle("is-jumping", jumping);
    slide.dataset.offset = offset;
    slide.style.setProperty("--shift", shiftFor(offset));
    slide.classList.toggle("is-current", offset === 0);

    // Screen readers: the big photo zooms, the others move to the middle
    const alt = slide.querySelector("img").alt;
    slide.setAttribute("aria-label", offset === 0 ? `Zoom in: ${alt}` : `Show: ${alt}`);
    slide.tabIndex = offset === 0 ? 0 : -1; // with the keyboard: arrows go left/right

    if (jumping) {
      // Reading offsetWidth makes the browser apply the jump right now, without
      // animation – then the animation can be switched back on
      void slide.offsetWidth;
      slide.classList.remove("is-jumping");
    }
  });
}

// One step left (−1) or right (+1) – or several, when a photo further out is clicked
function go(steps) {
  resetZoom();
  current = (current + steps + slides.length) % slides.length;
  render();
  slides[current].focus({ preventScroll: true });
}

// --- Zoom -------------------------------------------------------------------------------

// The largest zoom without seeing pixels: the photo's real width divided by the
// width it's shown at. A 1600px photo shown 500px wide may zoom 3.2× → capped at 2.5×.
function maxZoomFor(slide) {
  const photo = slide.querySelector("img");
  return Math.min(MAX_ZOOM, photo.naturalWidth / slide.clientWidth);
}

// The point under the mouse stays where it is while zoomed – so moving the mouse
// looks around the photo. inTheMiddle = true (keyboard): zoom into the middle.
function aimZoom(slide, event, inTheMiddle = false) {
  let x = 50;
  let y = 50;
  if (!inTheMiddle) {
    const box = slide.getBoundingClientRect();
    x = ((event.clientX - box.left) / box.width) * 100;
    y = ((event.clientY - box.top) / box.height) * 100;
  }
  slide.style.setProperty("--zoom-x", `${Math.min(100, Math.max(0, x))}%`);
  slide.style.setProperty("--zoom-y", `${Math.min(100, Math.max(0, y))}%`);
}

function resetZoom() {
  for (const slide of slides) {
    slide.classList.remove("is-zoomed");
    slide.style.removeProperty("--zoom");
  }
}

function toggleZoom(slide, event) {
  if (slide.classList.contains("is-zoomed")) {
    resetZoom();
    render(); // puts the "Zoom in" label back
    return;
  }

  const zoom = maxZoomFor(slide);
  if (zoom < MIN_ZOOM) return; // photo too small – zooming would show pixels

  // event.detail = number of mouse clicks; 0 means Enter or Space on the keyboard
  aimZoom(slide, event, event.detail === 0);
  slide.style.setProperty("--zoom", zoom);
  slide.classList.add("is-zoomed");
  slide.setAttribute("aria-label", `Zoom out: ${slide.querySelector("img").alt}`);
}

// --- Opening -----------------------------------------------------------------------------

// Builds the viewer from the gallery: shot 0 + shots 1–5 of the chosen colour and
// fit (the set that's visible), in number order – then opens on the clicked photo.
function open(clickedButton) {
  const buttons = [
    document.querySelector(".shot-0 .photo-button"),
    ...document.querySelectorAll(".shot-set:not([hidden]) .photo-button"),
  ].sort((a, b) => Number(a.dataset.shot) - Number(b.dataset.shot));

  for (const old of slides) old.remove();

  // One button per photo, with the full-size file (data-full) for sharp zooming
  slides = buttons.map((button) => {
    const slide = document.createElement("button");
    slide.type = "button";
    slide.className = "viewer-slide";

    const photo = document.createElement("img");
    photo.src = button.dataset.full;
    photo.alt = button.querySelector("img").alt;

    slide.append(photo);
    stage.insertBefore(slide, prevArrow); // before the arrows, so the arrows stay on top
    return slide;
  });

  current = Math.max(0, buttons.indexOf(clickedButton));
  render();
  viewer.showModal(); // opens the <dialog> above everything
  slides[current].focus({ preventScroll: true });
}

// --- Clicks and keys ------------------------------------------------------------------

// Gallery: a click on any photo opens the viewer on that photo
document.querySelector(".gallery").addEventListener("click", (event) => {
  const button = event.target.closest(".photo-button");
  if (button) open(button);
});

// In the viewer: the big photo zooms, a neighbour moves to the middle,
// a click on the empty dark area closes
stage.addEventListener("click", (event) => {
  const slide = event.target.closest(".viewer-slide");
  if (!slide) {
    if (event.target === stage) viewer.close();
    return;
  }

  const offset = Number(slide.dataset.offset);
  if (offset === 0) {
    toggleZoom(slide, event);
  } else {
    go(offset);
  }
});

// While zoomed, the mouse looks around the photo
stage.addEventListener("mousemove", (event) => {
  const slide = slides[current];
  if (slide && slide.classList.contains("is-zoomed")) aimZoom(slide, event);
});

prevArrow.addEventListener("click", () => go(-1));
viewer.querySelector(".viewer-next").addEventListener("click", () => go(1));
viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());

// Arrow keys go left and right (Escape is built into <dialog>)
viewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    go(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    go(1);
  }
});

// Closed (×, Escape or a click beside the photos): next time it starts unzoomed
viewer.addEventListener("close", resetZoom);

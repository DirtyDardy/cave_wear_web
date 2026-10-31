// PHOTO VIEWER on the product page (from my mockup).
// A click on a gallery photo opens it big; the neighbours peek in left and right.
// ‹ ›, the arrow keys or a click on a neighbour go round in a circle (after the
// last photo comes the first). A click on the big photo zooms in – only inside the
// photo and never further than its real pixels – the mouse looks around, another
// click zooms out. Escape or × closes.
// With a finger (phones, tablets): swipe left/right, double tap zooms in and out,
// while zoomed one finger looks around. Phones also get dots inside the photo.

const viewer = document.querySelector(".viewer");
const stage = viewer.querySelector(".viewer-stage");
const prevArrow = viewer.querySelector(".viewer-prev");
const dotsBox = viewer.querySelector(".viewer-dots");

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

  // The dot of the photo in the middle lights up (aria-current = "this one")
  [...dotsBox.children].forEach((dot, n) => dot.toggleAttribute("aria-current", n === current));
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

// inTheMiddle: event.detail = number of mouse clicks; 0 means Enter or Space on
// the keyboard. A double tap passes false – it zooms where the finger tapped.
function toggleZoom(slide, event, inTheMiddle = event.detail === 0) {
  if (slide.classList.contains("is-zoomed")) {
    resetZoom();
    render(); // puts the "Zoom in" label back
    return;
  }

  const zoom = maxZoomFor(slide);
  if (zoom < MIN_ZOOM) return; // photo too small – zooming would show pixels

  aimZoom(slide, event, inTheMiddle);
  slide.style.setProperty("--zoom", zoom);
  slide.classList.add("is-zoomed");
  slide.setAttribute("aria-label", `Zoom out: ${slide.querySelector("img").alt}`);
}

// --- Opening -----------------------------------------------------------------------------

// Builds the viewer from the gallery: shot 0 + shots 1–5 of the chosen colour and
// fit (the set that's visible), in number order – then opens on the clicked photo.
function open(clickedButton) {
  const buttons = [
    document.querySelector(".shot-0 .photo-button:not([hidden])"), // the shot 0 of the chosen fit
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

  // One dot per photo (phones only – CSS hides them from 768px). A tap moves there.
  // "_" = the slide itself isn't needed here, only its number n
  const dots = slides.map((_, n) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot"; // same look as the dots under the page's photo row
    dot.setAttribute("aria-label", `Photo ${n + 1} of ${slides.length}`);
    dot.addEventListener("click", () => go(n - current));
    return dot;
  });
  dotsBox.replaceChildren(...dots);

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
  // The browser also sends a click after a finger lifts – after a swipe that
  // click must do nothing (it would close the viewer or jump to a neighbour)
  if (ignoreClick) return;

  const slide = event.target.closest(".viewer-slide");
  if (!slide) {
    if (event.target === stage) viewer.close();
    return;
  }

  const offset = Number(slide.dataset.offset);
  if (offset !== 0) {
    go(offset);
  } else if (lastPointer !== "touch") {
    toggleZoom(slide, event); // with a finger, a double tap zooms instead (below)
  }
});

// While zoomed, the mouse looks around the photo
stage.addEventListener("mousemove", (event) => {
  const slide = slides[current];
  if (slide && slide.classList.contains("is-zoomed")) aimZoom(slide, event);
});

// --- Fingers (phones and tablets) --------------------------------------------------------
// Pointer events report mouse, pen and finger the same way; pointerType says which.
// Only fingers are handled here – the mouse keeps the click zoom from above.

const SWIPE_DISTANCE = 40; // px sideways before a drag counts as a swipe
const DOUBLE_TAP_TIME = 300; // ms between two taps for a double tap

let finger = null; // the finger on the screen: where it started, where it is now
let fingersDown = 0; // two fingers = the browser's pinch zoom, we stay out of it
let lastTap = null; // time and place of the last tap, to spot a double tap
let lastPointer = "mouse"; // what touched the screen last: "mouse", "touch" or "pen"
let ignoreClick = false; // true after a swipe, see the click handler

// While zoomed, one finger drags the photo around. Moving the zoom centre the
// other way moves the photo with the finger: by the distance ÷ (zoom − 1).
function lookAround(slide, moveX, moveY) {
  const zoom = Number(slide.style.getPropertyValue("--zoom"));
  const box = slide.getBoundingClientRect();
  const x = parseFloat(slide.style.getPropertyValue("--zoom-x")) - ((moveX / box.width) * 100) / (zoom - 1);
  const y = parseFloat(slide.style.getPropertyValue("--zoom-y")) - ((moveY / box.height) * 100) / (zoom - 1);
  slide.style.setProperty("--zoom-x", `${Math.min(100, Math.max(0, x))}%`);
  slide.style.setProperty("--zoom-y", `${Math.min(100, Math.max(0, y))}%`);
}

// The photos stop following the finger (CSS animates them back into place)
function endDrag() {
  stage.classList.remove("is-dragging");
  stage.style.removeProperty("--drag");
  finger = null;
}

// A short touch without moving. Two of them quickly on the same spot = double tap.
function tap(event) {
  const slide = event.target.closest(".viewer-slide");
  if (!slide || Number(slide.dataset.offset) !== 0) return; // the click handler does the rest

  const quick = lastTap && event.timeStamp - lastTap.time < DOUBLE_TAP_TIME;
  const close = lastTap && Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 30;
  if (quick && close) {
    toggleZoom(slide, event, false);
    lastTap = null;
  } else {
    lastTap = { time: event.timeStamp, x: event.clientX, y: event.clientY };
  }
}

// 1. Finger down: remember where. Not on the arrows or dots – those are buttons.
stage.addEventListener("pointerdown", (event) => {
  lastPointer = event.pointerType;
  ignoreClick = false;
  if (event.pointerType !== "touch") return;

  fingersDown += 1;
  if (fingersDown > 1 || event.target.closest(".viewer-arrow, .viewer-dots")) {
    endDrag();
    return;
  }
  finger = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: event.clientX, y: event.clientY };
});

// 2. Finger moves: zoomed → look around; otherwise the photos follow it sideways
stage.addEventListener("pointermove", (event) => {
  if (!finger || event.pointerId !== finger.id) return;

  const moveX = event.clientX - finger.x;
  const moveY = event.clientY - finger.y;
  finger.x = event.clientX;
  finger.y = event.clientY;

  const slide = slides[current];
  if (slide.classList.contains("is-zoomed")) {
    lookAround(slide, moveX, moveY);
    return;
  }

  const dragX = finger.x - finger.startX;
  if (Math.abs(dragX) > Math.abs(finger.y - finger.startY)) {
    stage.classList.add("is-dragging");
    stage.style.setProperty("--drag", `${dragX}px`);
  }
});

// 3. Finger up: far enough sideways = next/previous photo, hardly moved = a tap
stage.addEventListener("pointerup", (event) => {
  if (event.pointerType !== "touch") return;
  fingersDown = Math.max(0, fingersDown - 1);
  if (!finger || event.pointerId !== finger.id) return;

  const dragX = finger.x - finger.startX;
  const dragY = finger.y - finger.startY;
  const zoomed = slides[current].classList.contains("is-zoomed");
  endDrag();

  if (!zoomed && Math.abs(dragX) > SWIPE_DISTANCE && Math.abs(dragX) > Math.abs(dragY)) {
    ignoreClick = true;
    go(dragX < 0 ? 1 : -1); // finger to the left = the next photo comes in from the right
  } else if (Math.hypot(dragX, dragY) < 10) {
    tap(event);
  } else {
    ignoreClick = true; // moved, but not a swipe (or looked around while zoomed)
  }
});

// The browser took the touch over (e.g. its own pinch zoom): let go
stage.addEventListener("pointercancel", (event) => {
  if (event.pointerType !== "touch") return;
  fingersDown = Math.max(0, fingersDown - 1);
  endDrag();
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

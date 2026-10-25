// Smart sticky for the right column on product pages.
// The CSS decides where the column sticks, but it needs to know how tall the
// column is. This script measures it and writes the height into a CSS variable
// (--details-height) – and again whenever it changes, e.g. when an accordion
// opens or the window gets smaller.

const details = document.querySelector(".details");

// ResizeObserver = the browser calls this function every time the column changes size
const observer = new ResizeObserver(() => {
  details.style.setProperty("--details-height", `${details.offsetHeight}px`);
});

observer.observe(details);

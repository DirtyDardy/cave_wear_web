// Style guide only: shows the real, current font size and line height
// of every sample in the type scale, and updates them when the window is resized.

const rows = document.querySelectorAll(".type-row");

function showLiveSizes() {
  rows.forEach((row) => {
    const sample = row.querySelector(".type-sample");
    const output = row.querySelector(".type-live");

    const style = getComputedStyle(sample);
    const size = Math.round(parseFloat(style.fontSize));
    const lineHeight = Math.round(parseFloat(style.lineHeight));

    output.textContent = `now: ${size}px / ${lineHeight}px`;
  });
}

showLiveSizes();
window.addEventListener("resize", showLiveSizes);

// BRAND – MY THREE PRINCIPLES APPEAR ONCE, THEN STAY.
// The look of the fade is CSS (BrandPrinciples.astro). This only says when each row starts:
// IntersectionObserver tells us when a row comes into view; we mark it and stop watching it,
// so scrolling back changes nothing. People who asked for less motion get no fade at all.

const block = document.querySelector(".brand-principles");
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (block && !calm) {
  const STEP = 0.2; // seconds between rows that come into view at the same moment

  const observer = new IntersectionObserver(
    (entries) => {
      // Rows already passed (top above the screen, after a jump or a reload) count as seen too
      const seen = entries.filter((e) => e.isIntersecting || e.boundingClientRect.top < 0);

      // Scrolled fast, so several rows arrive together? They still come one after the other.
      seen.forEach((entry, place) => {
        entry.target.style.setProperty("--reveal-delay", `${place * STEP}s`);
        entry.target.setAttribute("data-in", "");
        observer.unobserve(entry.target); // once is enough
      });
    },
    // A row starts once it is a little inside the screen, not at the very bottom edge
    { rootMargin: "0px 0px -10% 0px" },
  );

  block.setAttribute("data-reveal", ""); // from here on the CSS hides the rows until they're marked
  block.querySelectorAll(".brand-principle").forEach((row) => observer.observe(row));
}

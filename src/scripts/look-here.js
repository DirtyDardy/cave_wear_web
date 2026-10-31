// "LOOK HERE" FOR JUMPS ON THE SAME PAGE (e.g. "Follow the journey ↓" on Home).
// A link with data-look-here jumps to its #target, puts it in the middle of the
// screen and marks it for a moment – the same frame as the FAQ questions
// ("is-found", CSS in global.css), so you see exactly where the link took you.

document.querySelectorAll("a[data-look-here]").forEach((link) => {
  link.addEventListener("click", (event) => {
    // link.hash = the part after # in the link, e.g. "#newsletter"
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return; // no target → the browser's normal jump

    event.preventDefault(); // we do the jump ourselves

    // "center": the target lands in the middle of the screen, where the eye finds it.
    // "instant": no smooth scrolling first – the mark should start when you can
    // already see the target (same as the FAQ jump).
    target.scrollIntoView({ block: "center", behavior: "instant" });

    // Start the mark (again): remove the class, make the browser notice (offsetWidth),
    // add it back – otherwise a second click wouldn't show it
    target.classList.remove("is-found");
    void target.offsetWidth;
    target.classList.add("is-found");
  });
});

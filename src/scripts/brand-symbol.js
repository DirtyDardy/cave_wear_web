// BRAND – OUR SYMBOL: MY LOGO LIGHTS UP PART BY PART WHILE THE TEXT SCROLLS (3 Nov).
// Each text says which parts it switches on (data-lights) and which one it talks about (data-glow).
// Every time the page scrolls we look at all the texts: each one that has passed a line just
// under the logo counts, so scrolling back up works the same way.

const stage = document.querySelector(".brand-symbol-stage");

if (stage) {
  const steps = [...document.querySelectorAll(".brand-symbol-step")];
  const parts = [...stage.querySelectorAll("[data-part]")];
  const title = document.querySelector(".brand-symbol-title");
  const slowBox = document.querySelector(".brand-symbol-slow");
  const texts = document.querySelector(".brand-symbol-steps");
  const endText = document.querySelector(".brand-symbol-end");

  // canStay: title and logo really stay in place (the same screen height as in the CSS), and the
  // page isn't asked for less motion. canSlow: on top of that, the texts move at half speed. Not on
  // phones: a finger scrolls the page outside of this script, so the script's half speed would
  // always arrive a moment late, and the text would tremble (above all on iPhones).
  const canStay = window.matchMedia("(height >= 40rem) and (prefers-reduced-motion: no-preference)");
  const canSlow = window.matchMedia("(width >= 48rem) and (height >= 40rem) and (prefers-reduced-motion: no-preference)");

  // Heights are only written when they really change: every write makes the browser re-check the
  // page's layout, and that during scrolling is what can make things tremble on a phone
  let shownBoxHeight = null;
  let shownStageHeight = null;

  const header = document.querySelector(".site-header");
  const column = document.querySelector(".brand-symbol-column");
  const again = document.querySelector(".brand-symbol-again");
  const snapPoints = document.querySelectorAll(".brand-symbol-snap");
  let firstLogoStays = false; // true while my first text is still the one being read

  // The wheel stays normal. The box gets taller, so the logo stays longer, and the texts are pushed
  // back down by part of what was scrolled. Half pushed back = they move at half speed.
  function moveTexts() {
    if (column.hasAttribute("data-collapsed")) return; // nothing is moving then
    const speed = canSlow.matches ? 0.5 : 1;
    const boxHeight = texts.offsetHeight / speed;
    if (boxHeight !== shownBoxHeight) {
      slowBox.style.blockSize = `${boxHeight}px`;
      shownBoxHeight = boxHeight;
    }

    // How far the box has gone past the logo. With the header showing, the logo stands that much
    // lower. The header can't change while the logo stays in place (below), so nothing jumps.
    const headerShows = !header.hasAttribute("data-hidden");
    const logoBottom = title.offsetHeight + stage.offsetHeight + (headerShows ? header.offsetHeight : 0);
    const scrolled = logoBottom - slowBox.getBoundingClientRect().top;
    const inBox = Math.min(Math.max(scrolled, 0), boxHeight);

    texts.style.transform = `translateY(${inBox * (1 - speed)}px)`;
    // The closing sentence travels with them and lands in its real place when the box ends
    endText.style.transform = `translateY(${(inBox - boxHeight) * (1 - speed)}px)`;

    // TWO SNAP POINTS (the CSS does the snapping). The first: my first text under my first logo.
    // The second: the cave bear text in that same place. At half speed a text needs twice its
    // distance in scrolling. After these two the page scrolls normally.
    const toSecondText = steps[1].offsetTop - steps[0].offsetTop;
    snapPoints[1].style.insetBlockStart = `${toSecondText / speed}px`;
    slowBox.style.setProperty("--logo-bottom", `${logoBottom}px`);
    firstLogoStays = canStay.matches && inBox < toSecondText; // halfway between the two

    // While title and logo stay in place, the header keeps the state it came in with (header-hide.js
    // leaves it alone): showing stays showing, hidden stays hidden, until you leave this part.
    const scroller = slowBox.parentElement.getBoundingClientRect();
    header.toggleAttribute("data-frozen", canStay.matches && scroller.top < header.offsetHeight && scroller.bottom > logoBottom);
  }

  function update() {
    // The title needs the logo's height, so that they leave the screen together (see the CSS)
    if (stage.offsetHeight !== shownStageHeight) {
      shownStageHeight = stage.offsetHeight;
      stage.parentElement.style.setProperty("--stage-height", `${shownStageHeight}px`);
    }
    moveTexts();

    // Closed: the finished logo, without my story
    if (column.hasAttribute("data-collapsed")) {
      lightParts(steps);
      return;
    }

    const line = Math.max(stage.getBoundingClientRect().bottom, 0) + 160; // 160px under the logo
    // While my first text is being read, the next ones don't count yet, so my first logo stays
    const passed = steps.filter((step) => step.getBoundingClientRect().top < line);
    lightParts(firstLogoStays ? passed.slice(0, 1) : passed);
  }

  const lightTime = 1600; // 1.6s, the same as --light-time in the CSS: the next part starts when one is done
  const waiting = new Map(); // the parts still waiting for their turn
  let waitingFor = null; // the text they belong to

  function lightParts(passed) {
    const current = passed.at(-1); // the last text that crossed the line
    const lit = passed.flatMap((step) => step.dataset.lights.split(" "));
    const glowing = current ? current.dataset.glow.split(" ") : [];

    // A staggered text lights its parts one after another. Until its turn a part isn't touched at
    // all: it stays the plain outline. A new text cancels whatever was still waiting.
    const staggered = current && "stagger" in current.dataset ? current.dataset.lights.split(" ") : [];
    if (current !== waitingFor) {
      waiting.forEach((timer) => clearTimeout(timer));
      waiting.clear();
      waitingFor = current;
    }

    steps.forEach((step) => step.classList.toggle("is-current", step === current));
    parts.forEach((part) => {
      const light = () => {
        part.classList.toggle("is-lit", lit.includes(part.dataset.part));
        part.classList.toggle("is-current", glowing.includes(part.dataset.part));
      };
      const place = staggered.indexOf(part.dataset.part);
      if (place > 0 && !part.classList.contains("is-lit")) {
        if (!waiting.has(part)) waiting.set(part, setTimeout(light, place * lightTime));
      } else {
        light();
      }
    });

    // The first text belongs to my first logo; from the second one on, today's logo shows
    stage.dataset.view = passed.length > 1 ? "logo" : "first";

    // The closing sentence reached: this part is done (no more crop marks, the logo a little bigger)
    stage.toggleAttribute("data-done", current === endText);
  }

  // CLOSING THE STORY ONCE IT'S BEHIND YOU, so the way back up is short and not the story in reverse.
  // It only happens when the whole section is above the screen and the scrolling has stopped, so
  // nobody sees it. Taking the text out makes the page shorter by exactly that much, so the page
  // moves up by the same amount in the same moment: what's on screen stays where it is.
  // Nothing is saved: after a reload the story is open again.
  const section = document.querySelector("#our-symbol");
  const root = document.documentElement;

  function changeHeight(change) {
    root.style.overflowAnchor = "none"; // the browser shouldn't try to correct this as well
    // Measured on the next section, which is on screen: near the page's end the browser also moves
    // the page by itself when it gets shorter, and this way that's counted too
    // (The first one with a height: the element right after the section is its invisible script.)
    let next = section.nextElementSibling;
    while (next.offsetHeight === 0) next = next.nextElementSibling;
    const before = next.getBoundingClientRect().top;
    change();
    window.scrollBy({ top: next.getBoundingClientRect().top - before, behavior: "instant" });
    root.style.overflowAnchor = "";
  }

  let stopTimer;
  function closeWhenPassed() {
    clearTimeout(stopTimer);
    stopTimer = setTimeout(() => {
      if (column.hasAttribute("data-collapsed")) return;
      if (section.getBoundingClientRect().bottom >= 0) return; // still on screen, or not reached yet
      changeHeight(() => {
        column.setAttribute("data-collapsed", "");
        again.hidden = false;
        texts.style.transform = "";
        endText.style.transform = "";
        header.removeAttribute("data-frozen");
      });
      update();
    }, 200); // 200ms without scrolling counts as stopped
  }

  // "Read the logo story again": open it, go to its start, and the keyboard goes along
  again.addEventListener("click", () => {
    column.removeAttribute("data-collapsed");
    again.hidden = true;
    shownBoxHeight = null;
    update();
    const start = slowBox.getBoundingClientRect().top + window.scrollY - (title.offsetHeight + stage.offsetHeight);
    window.scrollTo({ top: start, behavior: "instant" });
    update();
    title.focus();
  });

  window.addEventListener("scroll", closeWhenPassed, { passive: true });
  window.addEventListener("scroll", update, { passive: true }); // passive = never slows the scrolling
  window.addEventListener("resize", update);

  stage.dataset.ready = "";
  update();
}

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

  // Half speed only while the logo really stays in place, and never with reduced motion
  const canSlow = window.matchMedia("(height >= 40rem) and (prefers-reduced-motion: no-preference)");

  // Heights are only written when they really change: every write makes the browser re-check the
  // page's layout, and that during scrolling is what can make things tremble on a phone
  let shownBoxHeight = null;
  let shownStageHeight = null;

  // The wheel stays normal. The box gets taller, so the logo stays longer, and the texts are pushed
  // back down by part of what was scrolled. Half pushed back = they move at half speed.
  function moveTexts() {
    const speed = canSlow.matches ? 0.5 : 1;
    const boxHeight = texts.offsetHeight / speed;
    if (boxHeight !== shownBoxHeight) {
      slowBox.style.blockSize = `${boxHeight}px`;
      shownBoxHeight = boxHeight;
    }

    // How far the box has gone past the logo, counted from the logo's place without the header,
    // so the texts don't jump when the header comes or goes
    const logoBottom = title.offsetHeight + stage.offsetHeight;
    const scrolled = logoBottom - slowBox.getBoundingClientRect().top;
    const inBox = Math.min(Math.max(scrolled, 0), boxHeight);

    texts.style.transform = `translateY(${inBox * (1 - speed)}px)`;
    // The closing sentence travels with them and lands in its real place when the box ends
    endText.style.transform = `translateY(${(inBox - boxHeight) * (1 - speed)}px)`;
  }

  function update() {
    // The title needs the logo's height, so that they leave the screen together (see the CSS)
    if (stage.offsetHeight !== shownStageHeight) {
      shownStageHeight = stage.offsetHeight;
      stage.parentElement.style.setProperty("--stage-height", `${shownStageHeight}px`);
    }
    moveTexts();

    const line = Math.max(stage.getBoundingClientRect().bottom, 0) + 160; // 160px under the logo
    lightParts(steps.filter((step) => step.getBoundingClientRect().top < line));
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
  }

  window.addEventListener("scroll", update, { passive: true }); // passive = never slows the scrolling
  window.addEventListener("resize", update);

  stage.dataset.ready = "";
  update();
}

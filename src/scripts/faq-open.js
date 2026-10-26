// FAQ JUMP LINKS on the Contact page.
// A link like /contact#pricing should show that answer right away – but a closed
// <details> doesn't open by itself. This opens it, puts it in the middle of the screen
// and marks it for a moment, so you see where to look ("is-found", CSS in contact.astro).

function openTarget() {
  // location.hash = the part after # in the address, e.g. "#pricing"
  if (!location.hash) return;

  // decodeURIComponent turns "%20" back into a space; slice(1) drops the "#"
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));

  // Only questions (details elements) – #faq and #contact-form are left alone
  if (!(target instanceof HTMLDetailsElement)) return;

  target.open = true;

  // "center": the question lands in the middle of the screen, where the eye finds it
  // (26 Oct – at the top, under the header, it was easy to miss). "instant": no smooth
  // scrolling first – the mark should start when you can already see the question.
  target.scrollIntoView({ block: "center", behavior: "instant" });

  // Start the mark (again): remove the class, make the browser notice (offsetWidth),
  // add it back – otherwise a second click on the same link wouldn't show it
  target.classList.remove("is-found");
  void target.offsetWidth;
  target.classList.add("is-found");
}

// When the page opens with a #… in the address: wait until it has fully loaded –
// the browser does its own jump first, ours comes after it and wins
if (document.readyState === "complete") openTarget();
else window.addEventListener("load", openTarget);

window.addEventListener("hashchange", openTarget); // when a link on the same page changes it

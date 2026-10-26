// FAQ JUMP LINKS on the Contact page.
// A link like /contact#pricing scrolls to that question – but a closed <details>
// doesn't open by itself. This opens it, so the answer is visible right away.

function openTarget() {
  // location.hash = the part after # in the address, e.g. "#pricing"
  if (!location.hash) return;

  // decodeURIComponent turns "%20" back into a space; slice(1) drops the "#"
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));

  // Only questions (details elements) – #faq and #contact-form are left alone
  if (target instanceof HTMLDetailsElement) {
    target.open = true;
    // The browser's own jump can get lost while the page is still loading (and an
    // opened answer changes the heights) – so we scroll there ourselves.
    // The space for the header comes from scroll-margin in contact.astro.
    target.scrollIntoView({ block: "start" });
  }
}

openTarget(); // when the page opens with a #… in the address
window.addEventListener("hashchange", openTarget); // when a link on the same page changes it

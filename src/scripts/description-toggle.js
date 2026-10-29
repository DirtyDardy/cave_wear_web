// Phone only: the small button next to the tagline shows or hides the longer
// description. CSS does the hiding – it looks at aria-expanded – so this script
// only flips that value. Screen readers hear "Product description, collapsed / expanded".
const toggle = document.querySelector(".description-toggle");

// "?." = only if the button exists (a product without a description has none)
toggle?.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isOpen));
});

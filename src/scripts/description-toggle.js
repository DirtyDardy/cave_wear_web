// The small chevron button that shows or hides a short text: the product description
// on phones, the Base Collection intro on the Products page. CSS does the hiding – it
// looks at aria-expanded – so this script only flips that value. Screen readers hear
// the button's name plus "collapsed / expanded".
// querySelectorAll + forEach = the same for every such button on the page.
document.querySelectorAll(".description-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
});

// Mobile menu: opens and closes the main navigation on small screens.
// CSS does all the visuals – this script only switches aria-expanded.

const button = document.querySelector(".menu-button");
const pageContent = document.querySelectorAll("main, footer");
const desktop = window.matchMedia("(width >= 48rem)");

function setMenuOpen(isOpen) {
  button.setAttribute("aria-expanded", String(isOpen));

  // While the menu is open, the page behind it can't be reached with Tab
  pageContent.forEach((element) => {
    element.inert = isOpen;
  });
}

// Click on the button: open if closed, close if open
button.addEventListener("click", () => {
  const isOpen = button.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

// Escape closes the menu and puts focus back on the button
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    button.focus();
  }
});

// Screen becomes wide enough for the desktop nav → close the menu
desktop.addEventListener("change", () => {
  setMenuOpen(false);
});

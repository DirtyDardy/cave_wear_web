// BRAND – FOUR PLACES: ONE TEXT IS ALWAYS OPEN, AND ITS CROSS ON THE MAP IS BIG.
// The look and the opening movement are CSS (brand.astro). This only says which place is open.
// Further down: the reward button, which adds the Explorer's bonus to the shared Pack.
import { explorerBonus, addBonus, openPack } from "./pack-store";

const rows = [...document.querySelectorAll(".my-places-row")]; // [...] = turn the list into an array
const bigCrosses = document.querySelectorAll("[data-map-big]");

function open(place) {
  for (const row of rows) {
    const isOpen = row.dataset.place === place;
    row.toggleAttribute("data-open", isOpen);
    // aria-expanded tells screen readers whether this row's text is showing
    row.querySelector("button").setAttribute("aria-expanded", isOpen);
  }
  for (const cross of bigCrosses) {
    cross.toggleAttribute("data-active", cross.dataset.mapBig === place);
  }
}

for (const row of rows) {
  const openThis = () => open(row.dataset.place);
  row.addEventListener("mouseenter", openThis); // with a mouse: hovering is enough
  row.addEventListener("focusin", openThis); // with the keyboard: Tab to it
  row.addEventListener("click", openThis); // on a touch screen there is no hover: tap it
}

// THE REWARD BUTTON. subscribe = "run this now, and again every time the bonus changes", so the
// button always shows the truth, also after a reload. disabled = it can only be used once.
const bonusButton = document.querySelector(".my-places-bonus-button");

if (bonusButton) {
  const labels = { "in-pack": "In your pack", used: "Used on a reservation" };

  explorerBonus.subscribe((state) => {
    if (state === "unused") return; // keeps the text from the page
    bonusButton.textContent = labels[state];
    bonusButton.disabled = true;
  });

  bonusButton.addEventListener("click", () => {
    addBonus();
    openPack(); // so you see it land in the Pack
  });
}

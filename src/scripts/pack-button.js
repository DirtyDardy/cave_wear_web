// The Pack button in the header: opens the drawer and shows how many pieces are inside.
// The number comes from the shared Pack list (pack-store.ts) – the same list the
// product page and the drawer use. This file is plain JavaScript; the store doesn't care.
import { packCount, openPack } from "./pack-store";

const button = document.querySelector(".pack-button");
const count = button.querySelector(".pack-count");
const number = count.querySelector(".pack-count-number");
const label = count.querySelector(".pack-count-label");

button.addEventListener("click", openPack);

// subscribe = "run this now, and again every time the number changes".
// An empty Pack shows no number at all.
packCount.subscribe((pieces) => {
  count.hidden = pieces === 0;
  number.textContent = pieces > 99 ? "99+" : pieces; // the badge stays small
  // Only for screen readers: "Pack" + ", 2 items" = "Pack, 2 items"
  label.textContent = `, ${pieces} ${pieces === 1 ? "item" : "items"}`;
});

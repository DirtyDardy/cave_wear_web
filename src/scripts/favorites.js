// Favorites – the heart on the Products page and on every product page.
// Click a heart → a copy of that card appears under "Favorites". Click again → it's gone.
// Saved in this browser only (localStorage), so the list is still there after a reload.
// Nothing is sent anywhere.

const storageKey = "cave-wear-favorites";
const list = document.querySelector("#favorites-list"); // only on the Products page – null elsewhere
const emptyText = document.querySelector("#favorites-empty");

// Reads the saved list: product ids, e.g. ["core-tee", "beanie"].
// try/catch: some browsers block storage (private mode) – then we start empty.
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? [];
  } catch {
    return [];
  }
}

function saveFavorites(ids) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(ids));
  } catch {
    // Storage blocked: favorites still work until the page is closed
  }
}

let favorites = loadFavorites();

// Makes the page match the list. Runs on load and after every click.
function render() {
  // Steps 1 and 2 only where the Favorites list exists (the Products page)
  if (list) {
    // 1. Throw away the old copies and add a fresh copy of each favorite card,
    //    in the order they were clicked
    list.replaceChildren();
    for (const id of favorites) {
      const original = document.querySelector(`.collection [data-product-id="${id}"]`);
      if (!original) continue; // product no longer on the page – skip it

      const item = document.createElement("li");
      item.append(original.cloneNode(true)); // true = copy everything inside, too
      list.append(item);
    }

    // 2. Show the list or the "No favorites yet" text – never both
    list.hidden = favorites.length === 0;
    emptyText.hidden = favorites.length > 0;
  }

  // 3. Switch every heart on or off – the originals and the copies
  for (const card of document.querySelectorAll("[data-product-id]")) {
    const isFavorite = favorites.includes(card.dataset.productId);
    card.querySelector(".favorite-button").setAttribute("aria-pressed", isFavorite);
  }
}

// One click listener for the whole page instead of one per heart. It also
// catches hearts inside the copies, which don't exist yet when the page loads.
document.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite-button");
  if (!button) return; // the click was somewhere else

  const id = button.closest("[data-product-id]").dataset.productId;

  if (favorites.includes(id)) {
    favorites = favorites.filter((favorite) => favorite !== id); // remove it
  } else {
    favorites.push(id); // add it at the end
  }

  saveFavorites(favorites);
  render();
});

render();

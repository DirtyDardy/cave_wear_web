// The hidden coordinates. Click one → it stays yellow and its cross lights up on the Home map.
// All four found → a bar says so and a section opens on the Brand page.
// Saved in this browser only (localStorage), like the favorites: every link loads a fresh
// page, so a normal variable would forget everything. Nothing is sent anywhere.

const storageKey = "cave-wear-coordinates";
const allPlaces = 4; // one each on Home, Products, Brand and Contact

const bar = document.querySelector(".coordinates-bar");
const barText = document.querySelector(".coordinates-bar-text");

// Reads the saved list: place ids, e.g. ["gjilan", "regensburg"].
// try/catch: some browsers block storage (private mode) – then we start empty.
function loadFound() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? [];
  } catch {
    return [];
  }
}

function saveFound(ids) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(ids));
  } catch {
    // Storage blocked: a find still shows until the next page
  }
}

let found = loadFound();

// Makes the page match the list. Runs on load and after every click.
function render() {
  // 1. The coordinate on this page: the CSS turns it yellow when aria-pressed is true
  for (const button of document.querySelectorAll(".coordinates")) {
    button.setAttribute("aria-pressed", found.includes(button.dataset.place));
  }

  // 2. The yellow crosses on the Home map – no crosses on the other pages, so nothing happens there
  for (const cross of document.querySelectorAll("[data-map-cross]")) {
    cross.hidden = !found.includes(cross.dataset.mapCross);
  }

  // 3. The hidden section – only on the Brand page, null elsewhere
  const section = document.querySelector("#my-places");
  if (section) section.hidden = found.length < allPlaces;
}

// One click listener for the whole page, like the favorites
document.addEventListener("click", (event) => {
  const button = event.target.closest(".coordinates");
  if (!button) return; // the click was somewhere else

  const place = button.dataset.place;
  if (found.includes(place)) return; // already found – stays yellow, nothing else happens

  found.push(place);
  saveFound(found);
  render();

  // The fourth find: a copy of the text from the template goes into the bar
  if (found.length === allPlaces) {
    bar.append(barText.content.cloneNode(true)); // true = copy everything inside, too
  }
});

// On the Brand page the bar's link only jumps down the page, so the bar has done its job.
// hashchange = that jump just happened. Not on the click itself: the link would be gone
// before the browser could follow it.
window.addEventListener("hashchange", () => {
  if (location.hash === "#my-places") bar.replaceChildren();
});

// Going back can show the old page from memory without running this script again (iPhones
// do this a lot), so a find made in between wouldn't show. persisted = it came from memory.
window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  found = loadFound();
  render();
});

render();

// Colour and fit on the product page: shows the set of shots 1–5 that matches
// the chosen colour + fit (shot 0 never changes).
// It also reads the address: /products/core-tee?colour=olive opens the page with
// olive already chosen – that's what the colour dots on the Products page link to.
// And it runs "Add to pack": the choice goes into the shared Pack list (pack-store.ts).
import { addItem, openPack, canReserve, maxReservations } from "./pack-store";

const sets = document.querySelectorAll(".shot-set");

// 1. The address may ask for a colour or fit, e.g. ?colour=olive&fit=female.
//    URLSearchParams reads the part after the "?". If the product has that
//    option, it gets chosen; anything else in the address is ignored.
const params = new URLSearchParams(window.location.search);

for (const group of ["colour", "fit"]) {
  const wanted = params.get(group);
  const options = document.querySelectorAll(`input[name="${group}"]`);
  const match = [...options].find((option) => option.value === wanted);
  if (match) match.checked = true;
}

// The value of the chosen option in a group, e.g. chosen("size") → "M".
// Nothing chosen yet → undefined ("?." stops instead of crashing).
function chosen(group) {
  return document.querySelector(`input[name="${group}"]:checked`)?.value;
}

// Colours that only exist in some fits (text file: "Alpine Oak (male)").
// Each colour dot carries its fits in data-fits, e.g. "male" or "female male".
const colourInputs = [...document.querySelectorAll('input[name="colour"]')];

// The fits of one colour button: "female male" → ["female", "male"]
function fitsOf(input) {
  return input.closest(".colour").dataset.fits.split(" ");
}

// If the address asked for a colour that isn't in the chosen fit (e.g. the card's
// Tobacco Brown dot), the colour wins: the fit switches to the colour's first fit.
const startColour = colourInputs.find((input) => input.checked);
if (!fitsOf(startColour).includes(chosen("fit"))) {
  document.querySelector(`input[name="fit"][value="${fitsOf(startColour)[0]}"]`).checked = true;
}

// Hides every colour that doesn't exist in the chosen fit (decided 29 Oct: away,
// not dimmed). disabled as well, so the arrow keys skip it. Was the chosen colour
// hidden? Then the first colour that does exist gets chosen – otherwise
// "Add to pack" would point at a product that doesn't exist.
function matchColoursToFit() {
  const fit = chosen("fit");

  for (const input of colourInputs) {
    input.disabled = !fitsOf(input).includes(fit);
    input.closest(".colour").hidden = input.disabled;
  }

  const chosenInput = colourInputs.find((input) => input.checked);
  if (chosenInput.disabled) {
    colourInputs.find((input) => !input.disabled).checked = true;
  }
}

// 2. Show the set whose data-colour and data-fit match the chosen options, hide the rest
const shot0s = [...document.querySelectorAll(".shot-0 .photo-button")];

function showChosenSet() {
  const colour = chosen("colour");
  const fit = chosen("fit");

  for (const set of sets) {
    set.hidden = !(set.dataset.colour === colour && set.dataset.fit === fit);
  }

  // The colour's name after "Color:" – read from the chosen dot's hidden label text
  const chosenColour = colourInputs.find((input) => input.checked);
  document.querySelector(".chosen-colour").textContent = chosenColour.nextElementSibling.textContent;

  // Shot 0: the chosen fit's own one if there is one, otherwise the normal one (data-fit="")
  const ownShot0 = shot0s.some((shot) => shot.dataset.fit === fit);
  for (const shot of shot0s) {
    shot.hidden = shot.dataset.fit !== (ownShot0 ? fit : "");
  }
}

// 3. "Add to pack" only works once size, fit and colour are all chosen.
//    Fit and colour start with the first option; size has no default, so the
//    button starts switched off (disabled in the HTML) until a size is picked.
//    The "Choose a size" line under it disappears at the same moment.
const packButton = document.querySelector(".add-to-pack");
const sizeHint = document.querySelector(".size-hint");

//    After 3 reservations (the limit) the button stays off for good, and the same quiet
//    line says why instead.
function updatePackButton() {
  const allChosen = ["size", "fit", "colour"].every((group) => chosen(group));
  const roomForMore = canReserve.get();
  packButton.disabled = !allChosen || !roomForMore;
  sizeHint.textContent = roomForMore ? "Choose a size" : `You've reached the limit of ${maxReservations} reservations.`;
  sizeHint.hidden = allChosen && roomForMore; // gone when nothing is in the way – the lines below move up
}

// A reservation sent from the drawer (on this page) updates the button right away
canReserve.subscribe(updatePackButton);

// 4. The click: the chosen product + size + fit + colour + quantity go into the Pack,
//    then the drawer opens and shows it. The choices stay as they are (decided 27 Oct),
//    so the same shirt in another colour is just one click on a dot away.
packButton.addEventListener("click", () => {
  addItem({
    id: packButton.dataset.product,
    size: chosen("size"),
    fit: chosen("fit"),
    colour: chosen("colour"),
    quantity: Number(document.querySelector("#quantity").value),
  });
  openPack();
});

// 5. Every time an option is chosen: show the matching photos, check the button.
//    "change" fires when a radio button gets chosen – by click or with the arrow keys.
//    A new fit first checks which colours exist in it.
document.addEventListener("change", (event) => {
  if (event.target.name === "fit") {
    matchColoursToFit();
  }
  if (event.target.name === "colour" || event.target.name === "fit") {
    showChosenSet();
  }
  updatePackButton();
});

matchColoursToFit();
showChosenSet();
updatePackButton();

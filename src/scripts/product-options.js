// Colour and fit on the product page: shows the set of shots 1–5 that matches
// the chosen colour + fit (shot 0 never changes).
// It also reads the address: /products/core-tee?colour=olive opens the page with
// olive already chosen – that's what the colour dots on the Products page link to.

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

// 2. Show the set whose data-colour and data-fit match the chosen options, hide the rest
function showChosenSet() {
  const colour = document.querySelector('input[name="colour"]:checked').value;
  const fit = document.querySelector('input[name="fit"]:checked').value;

  for (const set of sets) {
    set.hidden = !(set.dataset.colour === colour && set.dataset.fit === fit);
  }
}

// 3. "Add to pack" only works once size, fit and colour are all chosen.
//    Fit and colour start with the first option; size has no default, so the
//    button starts switched off (disabled in the HTML) until a size is picked.
const packButton = document.querySelector(".add-to-pack");

function updatePackButton() {
  const allChosen = ["size", "fit", "colour"].every((group) =>
    document.querySelector(`input[name="${group}"]:checked`),
  );
  packButton.disabled = !allChosen;
}

// 4. Every time an option is chosen: show the matching photos, check the button.
//    "change" fires when a radio button gets chosen – by click or with the arrow keys.
document.addEventListener("change", (event) => {
  if (event.target.name === "colour" || event.target.name === "fit") {
    showChosenSet();
  }
  updatePackButton();
});

showChosenSet();
updatePackButton();

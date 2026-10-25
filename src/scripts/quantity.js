// Quantity on the product page: − and + change the number by one, between the
// input's min (1) and max (10). Typing a number works too – it gets checked as well.

const input = document.querySelector("#quantity");
const buttons = document.querySelectorAll("[data-step]");
const min = Number(input.min);
const max = Number(input.max);

// Puts a number into the field – rounded and kept between min and max.
// "|| min": if someone types something that isn't a number, it goes back to 1.
function setQuantity(value) {
  const number = Math.min(max, Math.max(min, Math.round(Number(value)) || min));
  input.value = number;

  // At the limits, the button that can't go further is switched off
  for (const button of buttons) {
    const step = Number(button.dataset.step);
    button.disabled = (step < 0 && number === min) || (step > 0 && number === max);
  }
}

// − has data-step="-1", + has data-step="1": the click adds that to the number
for (const button of buttons) {
  button.addEventListener("click", () => {
    setQuantity(Number(input.value) + Number(button.dataset.step));
  });
}

// Typed by hand: "change" fires when the visitor leaves the field or presses Enter
input.addEventListener("change", () => setQuantity(input.value));

setQuantity(input.value);

// Newsletter sign-up in the footer.
// Checks the email, sends the form to Netlify Forms with fetch (no page reload)
// and shows a message. Netlify only receives it on the deployed site – locally you get a test-mode message.

const form = document.querySelector(".newsletter");
const emailInput = form.querySelector('input[type="email"]');
const button = form.querySelector('button[type="submit"]');
const status = form.querySelector(".newsletter-status");

// Shows a message under the form. type is "success" or "error" (sets the border colour in CSS)
function showStatus(type, message) {
  status.dataset.type = type;
  status.textContent = message;
}

form.addEventListener("submit", async (event) => {
  // Stop the browser from sending the form the old way (that would reload the page)
  event.preventDefault();

  // The browser checks type="email" and required for us
  if (!emailInput.checkValidity()) {
    emailInput.setAttribute("aria-invalid", "true");
    showStatus("error", "Please enter a valid email address.");
    emailInput.focus();
    return;
  }
  emailInput.removeAttribute("aria-invalid");

  // On your computer (npm run dev) there is no Netlify – the dev server would answer "OK"
  // to every request and fake a success. So in dev mode we stop here and say so honestly.
  // import.meta.env.DEV is true only while running npm run dev, never on the live site.
  if (import.meta.env.DEV) {
    showStatus("success", "Test mode: email is valid, but nothing was sent (works after deploying to Netlify).");
    return;
  }

  // While sending: button can't be clicked twice
  button.disabled = true;

  try {
    // Turn all form fields into "form-name=newsletter&email=..." – the format Netlify expects
    const body = new URLSearchParams(new FormData(form)).toString();

    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      throw new Error(`Netlify answered ${response.status}`);
    }

    form.reset();
    showStatus("success", "You're on the list.");
  } catch (error) {
    showStatus("error", "Something went wrong. Please try again.");
  } finally {
    // Runs after success and after an error
    button.disabled = false;
  }
});

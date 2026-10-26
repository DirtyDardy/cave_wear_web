// CONTACT FORM on the Contact page.
// 1. "Send message" stays switched off until everything is filled in; a grey line
//    under it says what's still missing (no red error messages – decided 26 Oct).
// 2. An email with a typo gets a Terracotta line – checked only when you leave the
//    field, never while you're still typing.
// 3. Sending works like the newsletter: Netlify Forms with fetch, no page reload.
//    Netlify only receives it on the deployed site – locally you get a test-mode note.

const form = document.querySelector(".contact-form");
const nameInput = form.querySelector("#contact-name");
const emailInput = form.querySelector("#contact-email");
const subjectInput = form.querySelector("#contact-subject");
const messageInput = form.querySelector("#contact-message");
const otherTopic = form.querySelector("#topic-other");
const button = form.querySelector(".send-button");
const missingLine = form.querySelector(".form-missing");
const status = form.querySelector(".form-status");

// What's still missing, as a list of words – e.g. ["name", "message"].
// .trim() removes spaces at the start and end, so "   " counts as empty.
function missingFields() {
  const missing = [];
  if (!nameInput.value.trim()) missing.push("name");
  if (!emailInput.value.trim()) missing.push("email");
  else if (!emailInput.checkValidity()) missing.push("a complete email"); // the browser knows what an email looks like
  if (otherTopic.checked && !subjectInput.value.trim()) missing.push("subject");
  if (!messageInput.value.trim()) missing.push("message");
  return missing;
}

// Runs after every key press or click in the form
function update() {
  subjectInput.required = otherTopic.checked; // the subject only counts when "Other" is chosen
  const missing = missingFields();
  button.disabled = missing.length > 0;
  // .join(" · ") puts the words in one line: "name · message"
  missingLine.textContent = missing.length > 0 ? `Still missing: ${missing.join(" · ")}` : "";

  // A wrong email that has just been fixed loses its Terracotta line right away
  if (emailInput.checkValidity()) emailInput.removeAttribute("aria-invalid");
}

// Leaving the email field ("blur"): only now mark a typo
emailInput.addEventListener("blur", () => {
  if (emailInput.value.trim() && !emailInput.checkValidity()) {
    emailInput.setAttribute("aria-invalid", "true");
  }
});

form.addEventListener("input", update);
update(); // once at the start: button off, "Still missing: name · email · message"

// Shows the result in place of the button.
// The first line is small and uppercase (like a status line on a field radio).
function showStatus(type, heading, text) {
  status.dataset.type = type;
  status.replaceChildren(); // empties it
  const first = document.createElement("p");
  first.className = "label";
  first.textContent = heading;
  const second = document.createElement("p");
  second.textContent = text;
  status.append(first, second);
}

// "26.10.2026 · 17:42" – the German date and time format
function now() {
  const date = new Date();
  const day = date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  const time = date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  return `${day} · ${time}`;
}

form.addEventListener("submit", async (event) => {
  // Stop the browser from sending the form the old way (that would reload the page)
  event.preventDefault();
  if (missingFields().length > 0) return; // safety net – the button is off anyway

  // On your computer (npm run dev) there is no Netlify – so we only show how it looks
  if (import.meta.env.DEV) {
    showStatus("success", `Message received · ${now()}`, "Test mode – nothing was sent (works after deploying to Netlify).");
    return;
  }

  button.disabled = true; // while sending: can't be clicked twice

  try {
    // Turn all form fields into "form-name=contact&name=...&email=..." – the format Netlify expects
    const body = new URLSearchParams(new FormData(form)).toString();
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!response.ok) throw new Error(`Netlify answered ${response.status}`);

    showStatus("success", `Message received · ${now()}`, "We'll get back to you.");
  } catch (error) {
    showStatus("error", "Not sent", "Something went wrong. Please try again, or write to info@cavewear.de.");
    button.disabled = false;
  }
});

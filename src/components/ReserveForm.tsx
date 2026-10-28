// RESERVE FORM – step 2 inside the Pack drawer. Works like my contact form:
// 1. "Send reservation" stays off until first name and email are filled in; a grey line
//    under it says what's still missing (no red error messages).
// 2. An email with a typo gets a Terracotta line – only after leaving the field.
// 3. Sent with Netlify Forms via fetch, no page reload. Netlify only receives it on the
//    deployed site – on my computer nothing is sent (the drawer says "Test mode").
// 4. After sending, the drawer keeps a copy under "Your reservations" (PackDrawer.tsx).
import { useState } from "react";

type Props = {
  packText: string; // the Pack as text lines, e.g. "2 × The Core Tee – M · Unisex · Olive – 69,80€"
  totalText: string; // e.g. "104,80€"
  onSent: (sentAt: string) => void; // after success: the drawer keeps a copy with this time
};

// Something @ something . something – enough to catch typos like "anna@gmail"
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ReserveForm({ packText, totalText, onSent }: Props) {
  // useState = React's memory: [the current value, the function that changes it].
  // Every change draws the form again with the new value.
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [botField, setBotField] = useState(""); // honeypot – people never see it
  const [emailLeft, setEmailLeft] = useState(false); // has the visitor left the email field once?
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  // What's still missing – worked out fresh every time the form is drawn
  const emailOk = emailPattern.test(email.trim());
  const missing: string[] = [];
  if (!firstName.trim()) missing.push("first name");
  if (!email.trim()) missing.push("email");
  else if (!emailOk) missing.push("a complete email");

  // Terracotta line only for a real typo, and only after leaving the field
  const emailInvalid = emailLeft && email.trim() !== "" && !emailOk;

  // SubmitEvent = the type TypeScript knows for "a form is being sent"
  async function send(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); // no old-style sending (that would reload the page)
    if (missing.length > 0 || status === "sending") return;

    // On my computer (npm run dev) there is no Netlify – only show how it looks.
    // toISOString() = the exact moment, e.g. "2026-10-28T18:58:00.000Z"
    if (import.meta.env.DEV) {
      onSent(new Date().toISOString());
      return;
    }

    setStatus("sending"); // the button can't be clicked twice
    try {
      // "form-name=reserve&first-name=…&email=…" – the format Netlify expects
      const body = new URLSearchParams({
        "form-name": "reserve",
        "first-name": firstName.trim(),
        email: email.trim(),
        pack: packText,
        total: totalText,
        "bot-field": botField,
      }).toString();
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) throw new Error(`Netlify answered ${response.status}`);

      onSent(new Date().toISOString());
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="drawer-form" onSubmit={send} noValidate>
      {/* Honeypot: hidden from people, spam bots fill it in and get ignored by Netlify */}
      <p hidden>
        <label>
          Leave this empty:{" "}
          <input name="bot-field" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
        </label>
      </p>

      <div className="drawer-field">
        <label htmlFor="reserve-first-name" className="label">
          First name
        </label>
        {/* value + onChange = a "controlled" field: React always knows what's typed */}
        <input
          id="reserve-first-name"
          name="first-name"
          type="text"
          required
          autoComplete="given-name"
          placeholder="Your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="drawer-field">
        <label htmlFor="reserve-email" className="label">
          Email
        </label>
        <input
          id="reserve-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          aria-invalid={emailInvalid || undefined}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailLeft(true)}
        />
      </div>

      <p className="small drawer-form-note">
        We only use your first name and email for your reservation and the launch.{" "}
        <a href="/privacy">Privacy Policy</a>
      </p>

      <div>
        <button
          type="submit"
          className="button button-primary drawer-reserve"
          disabled={missing.length > 0 || status === "sending"}
          aria-describedby="reserve-missing"
        >
          Send reservation
        </button>
        {/* aria-live: screen readers hear the line when it changes */}
        <p id="reserve-missing" className="small drawer-form-missing" aria-live="polite">
          {missing.length > 0 ? `Still missing: ${missing.join(" · ")}` : ""}
        </p>
      </div>

      {status === "error" && (
        <div className="drawer-status" data-type="error" role="status">
          <p className="label">Not sent</p>
          <p>Something went wrong. Please try again, or write to info@cavewear.de.</p>
        </div>
      )}
    </form>
  );
}

// CONFIRMATION EMAIL for a reservation – a Netlify Function: it runs on Netlify's server,
// never in the visitor's browser.
// "submission-created" is a special file name: Netlify starts this function by itself
// after every form submission that passed its spam check. It only acts on my Reserve
// form and sends the visitor a plain-text email from info@cavewear.de through my netcup
// mailbox, with nodemailer (the package that "speaks" to mail servers).
// The password is never in this file: it's the environment variable SMTP_PASSWORD, which
// I typed into Netlify myself (Site configuration → Environment variables).
import nodemailer from "nodemailer";

// My exact concept disclaimer (CLAUDE.md) – real people get this email, so they must know
const disclaimer =
  "Cave Wear is a concept brand for a design portfolio. Products are concept mock-ups – some are based on existing garments and edited. Nothing is for sale.";

// Something @ something . something – the same check as the Reserve form
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// SAFETY: anyone can send Netlify a made-up "reservation" without using my form. So the
// email only ever contains text in exactly my format – no dots, slashes or @ in names,
// so no link or email address can be smuggled into a mail sent from info@cavewear.de.
// One Pack line: "1 × The Core Tee – M · Unisex · Olive – 34,90€"
// (If a product name ever needs another character, add it to the [ ] lists here.)
const linePattern = /^\d{1,2} × [\p{L}\d' -]{1,60} – [\p{L}\d·' -]{1,60} – \d{1,3}(\.\d{3})*,\d{2}€$/u;
const totalPattern = /^\d{1,3}(\.\d{3})*,\d{2}€$/;

// Only real reservation text gets an email: at most 40 lines, every line and the total
// in my format
function looksLikeMyReservation(pack, total) {
  const lines = String(pack ?? "").split("\n");
  return lines.length <= 40 && lines.every((line) => linePattern.test(line)) && totalPattern.test(String(total ?? ""));
}

// "2026-10-28T20:15:00.000Z" → "28.10.2026 · 21:15" (German format, German time –
// Netlify's servers run on world time, so the time zone is said here)
function formatTime(isoDate) {
  const date = new Date(isoDate);
  const zone = { timeZone: "Europe/Berlin" };
  const day = date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", ...zone });
  const time = date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", ...zone });
  return `${day} · ${time}`;
}

// The email itself – kept apart from the sending, so it can be tested on its own.
// Plain text only: nothing in it can "run", whatever someone types into the form.
export function reservationEmail({ firstName, pack, total, createdAt }) {
  // A first name is one short line of letters (also é, ü …), spaces, - and ' – everything
  // else is dropped (no links), at most 60 characters
  const name = String(firstName ?? "")
    .replace(/[^\p{L}\s'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);

  const text = [
    `Hi ${name},`,
    "",
    "your items are reserved. No payment now. We'll notify you at launch.",
    "",
    `Your reservation · ${formatTime(createdAt)}`,
    pack,
    `Estimated total: ${total} (preliminary prices)`,
    "",
    "Your reservation is your place in the planned first run. At launch you'll get an email " +
      "first, and you can still remove pieces before you confirm. Adding isn't possible then: " +
      "the first run is planned to match the reservations.",
    "",
    "Want to change something? Just reply to this email.",
    "",
    "Cave Wear · Built for the wild. Made for anywhere. · cavewear.de",
    "",
    disclaimer,
  ].join("\n");

  return { subject: "Your Cave Wear reservation", text };
}

// What Netlify calls. "event.body" holds the submission as text (JSON).
export const handler = async (event) => {
  const { payload } = JSON.parse(event.body);

  // Newsletter and contact form start this function too – only reservations get an email
  if (payload.form_name !== "reserve") return { statusCode: 200, body: "Not a reservation" };

  const { "first-name": firstName, email, pack, total } = payload.data;
  if (!emailPattern.test(String(email ?? "").trim())) {
    return { statusCode: 400, body: "No valid email" };
  }
  if (!looksLikeMyReservation(pack, total)) {
    // Not from my form – the submission stays in Netlify for me to see, but no email goes out
    console.error("[reserve] Reservation text not in the expected format – no email sent");
    return { statusCode: 400, body: "Unexpected reservation text" };
  }

  if (!process.env.SMTP_PASSWORD) {
    console.error("[reserve] SMTP_PASSWORD is not set in Netlify – no email sent");
    return { statusCode: 500, body: "Email not configured" };
  }

  const { subject, text } = reservationEmail({ firstName, pack, total, createdAt: payload.created_at });

  // My netcup mailbox – the same server settings as Gmail's "Send mail as" (CLAUDE.md)
  const mailServer = nodemailer.createTransport({
    host: "mx2f26.netcup.net",
    port: 465,
    secure: true, // encrypted (SSL) from the first moment
    auth: { user: "info@cavewear.de", pass: process.env.SMTP_PASSWORD },
  });

  try {
    await mailServer.sendMail({ from: '"Cave Wear" <info@cavewear.de>', to: email.trim(), subject, text });
    return { statusCode: 200, body: "Sent" };
  } catch (error) {
    // The reservation is safe in Netlify either way – only the email failed (Netlify's log shows why)
    console.error("[reserve] Email not sent:", error.message);
    return { statusCode: 500, body: "Email failed" };
  }
};

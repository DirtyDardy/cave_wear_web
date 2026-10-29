// CONFIRMATION EMAIL for a reservation – a Netlify Function: it runs on Netlify's server,
// never in the visitor's browser.
// "submission-created" is a special file name: Netlify starts this function by itself
// after every form submission that passed its spam check. It only acts on my Reserve
// form and sends the visitor a short email through my netcup mailbox, with nodemailer
// (the package that "speaks" to mail servers).
// LEAST PRIVILEGE (29 Oct): it sends from a separate mailbox that only exists for this,
// reservations@cavewear.de – never with my main info@ password. If that password ever
// leaked, nobody could read my real emails. Replies still reach info@ (Reply-To).
// The password is never in this file: it's the environment variable SMTP_PASSWORD, which
// I typed into Netlify myself (Project configuration → Environment variables, Production).
import nodemailer from "nodemailer";

const sender = "reservations@cavewear.de"; // logs in and sends – nothing else
const replyTo = "info@cavewear.de"; // where answers to the email arrive

// My exact concept disclaimer (CLAUDE.md) – real people get this email, so they must know
const disclaimer =
  "Cave Wear is a concept brand for a design portfolio. Products are concept mock-ups – some are based on existing garments and edited. Nothing is for sale.";

// Something @ something . something – the same check as the Reserve form
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// SAFETY: anyone can send Netlify a made-up "reservation" without using my form. So the
// email only ever contains text in exactly my format – no dots, slashes or @ in names,
// so no link or email address can be smuggled into a mail sent from my domain.
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

// HTML-safe text: < > & " ' become harmless codes, so nothing typed can turn into HTML.
// (The checks above already let none of them through – this is the second lock on the door.)
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// My brand colours (CLAUDE.md, design system). An email can't read my CSS variables,
// so the hex values are written out here – only for the email.
const colour = {
  background: "#0D0D0E", // Dark Obsidian
  line: "#1E1E1E", // Charcoal
  text: "#F3EBE0", // Egret
  secondary: "#C4B9AC", // Weathered Bone
  quiet: "#8C857B", // Muted Stone
  accent: "#C39132", // Wild Honey
};

// Email programs don't load my fonts – each device uses its own system font instead
const font = "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;";

// Text styles in the site's sizes: Body 16/24, Small 14/20, Label (uppercase), fine print 12/16
const body = `${font}font-size:16px;line-height:24px;color:${colour.text};`;
const small = `${font}font-size:14px;line-height:20px;color:${colour.secondary};`;
const label = `${font}font-size:14px;line-height:20px;letter-spacing:0.08em;text-transform:uppercase;color:${colour.quiet};`;

// The logo as a PNG on my own site (email programs don't show SVG). It only exists once
// public/email/logo.png is live – before that, the email shows the alt text "Cave Wear".
const logoUrl = "https://cavewear.de/email/logo.png";

// The email itself – kept apart from the sending, so it can be tested on its own.
// Two versions in one email: a simple HTML one, and plain text for programs that only
// show text. Nothing in either can "run", whatever someone types into the form.
export function reservationEmail({ firstName, pack, total, createdAt }) {
  // A first name is one short line of letters (also é, ü …), spaces, - and ' – everything
  // else is dropped (no links), at most 60 characters
  const name = String(firstName ?? "")
    .replace(/[^\p{L}\s'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
  const greeting = name ? `Hi ${name},` : "Hi there,";
  const thanks = "Thanks for reserving your place with Cave Wear. Your items are reserved – no payment now. We'll notify you at launch.";
  const nextSteps =
    "Your reservation is your place in the planned first run. At launch you'll get an email " +
    "first, and you can still remove pieces before you confirm. Adding isn't possible then: " +
    "the first run is planned to match the reservations.";
  const change = "Want to change something? Just reply to this email.";
  const tagline = "Cave Wear · Built for the wild. Made for anywhere.";
  const when = formatTime(createdAt);
  const subject = "Your Cave Wear reservation";

  const text = [
    greeting,
    "",
    thanks,
    "",
    `Your reservation · ${when}`,
    pack,
    `Estimated total: ${total} (preliminary prices)`,
    "",
    nextSteps,
    "",
    change,
    "",
    `${tagline} · cavewear.de`,
    "",
    disclaimer,
  ].join("\n");

  // One table row per Pack line: "1 × The Core Tee – M · Unisex · Olive – 34,90€" is split
  // at the " – " into item, details and row total (the check above makes sure there are 3)
  const rows = pack
    .split("\n")
    .map((line) => {
      const [item, details, price] = line.split(" – ");
      const cell = `padding:12px 0;border-top:1px solid ${colour.line};`;
      return `<tr>
        <td style="${cell}"><div style="${body}">${escapeHtml(item)}</div><div style="${small}">${escapeHtml(details)}</div></td>
        <td align="right" valign="top" style="${cell}${body}white-space:nowrap;">${escapeHtml(price)}</td>
      </tr>`;
    })
    .join("");

  // Email HTML is old-fashioned on purpose: tables for the layout and every style written
  // on the element itself – that's what works in Gmail, Outlook and Apple Mail alike.
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${subject}</title>
<style>a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}</style>
</head>
<body style="margin:0;padding:0;background:${colour.background};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${colour.background}" style="background:${colour.background};">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
    <tr><td style="padding-bottom:24px;border-bottom:1px solid ${colour.line};">
      <a href="https://cavewear.de"><img src="${logoUrl}" width="125" height="32" alt="Cave Wear" style="display:block;border:0;${body}"></a>
    </td></tr>
    <tr><td style="padding-top:32px;${body}">
      <p style="margin:0 0 16px;">${escapeHtml(greeting)}</p>
      <p style="margin:0;">${thanks}</p>
    </td></tr>
    <tr><td style="padding-top:32px;">
      <div style="${label}padding-bottom:8px;">Your reservation · ${escapeHtml(when)}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${rows}
        <tr>
          <td style="padding-top:12px;border-top:1px solid ${colour.line};${body}font-weight:600;">Estimated total</td>
          <td align="right" style="padding-top:12px;border-top:1px solid ${colour.line};${body}font-weight:600;white-space:nowrap;">${escapeHtml(total)}</td>
        </tr>
        <tr><td colspan="2" style="${small}color:${colour.quiet};">Preliminary prices. No payment now.</td></tr>
      </table>
    </td></tr>
    <tr><td style="padding-top:32px;">
      <div style="${label}padding-bottom:8px;">What happens next</div>
      <p style="margin:0 0 16px;${body}color:${colour.secondary};">${nextSteps}</p>
      <p style="margin:0;${body}">${change}</p>
    </td></tr>
    <tr><td style="padding-top:32px;"><div style="border-top:1px solid ${colour.line};padding-top:24px;">
      <div style="${small}">${tagline}</div>
      <div style="${small}"><a href="https://cavewear.de" style="color:${colour.accent};text-decoration:none;">cavewear.de</a></div>
      <div style="${font}font-size:12px;line-height:16px;color:${colour.quiet};padding-top:16px;">${disclaimer}</div>
    </div></td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, text, html };
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

  const { subject, text, html } = reservationEmail({ firstName, pack, total, createdAt: payload.created_at });

  // My netcup mail server – the same server settings as Gmail's "Send mail as" (CLAUDE.md)
  const mailServer = nodemailer.createTransport({
    host: "mx2f26.netcup.net",
    port: 465,
    secure: true, // encrypted (SSL) from the first moment
    auth: { user: sender, pass: process.env.SMTP_PASSWORD },
  });

  try {
    await mailServer.sendMail({ from: `"Cave Wear" <${sender}>`, replyTo, to: email.trim(), subject, text, html });
    return { statusCode: 200, body: "Sent" };
  } catch (error) {
    // The reservation is safe in Netlify either way – only the email failed (Netlify's log shows why)
    console.error("[reserve] Email not sent:", error.message);
    return { statusCode: 500, body: "Email failed" };
  }
};

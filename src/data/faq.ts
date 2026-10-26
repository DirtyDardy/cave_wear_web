// FAQ READER – turns src/content/faq.yaml into what the Contact page needs:
// the questions grouped (in file order), each answer split into paragraphs,
// with [text](address) written as real links.
// Runs only while the site is built – nothing of this reaches the visitor's browser.
import { getCollection } from "astro:content";
// The file as plain text (?raw) – only used to know the order of the questions:
// Astro's content store doesn't keep the order of the file, the file itself does.
import faqText from "../content/faq.yaml?raw";

// ["different", "cave-bear", …] – every "- id: …" line, top to bottom
const fileOrder = [...faqText.matchAll(/^- id: *(\S+)/gm)].map((match) => match[1]);

// "&", "<" and ">" would break the HTML, so they become their safe HTML versions
function escapeHtml(text: string) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

// One answer → a list of paragraphs (HTML). An empty line starts a new paragraph.
// [IBA, bearbiology.org](https://www.bearbiology.org/) → <a href="…">IBA, bearbiology.org</a>
function toParagraphs(answer: string) {
  return answer
    .split(/\n\s*\n/)
    .map((paragraph) => escapeHtml(paragraph.replace(/\s*\n\s*/g, " ").trim()))
    .map((paragraph) => paragraph.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>'));
}

export async function getFaqGroups() {
  const entries = await getCollection("faq");
  entries.sort((a, b) => fileOrder.indexOf(a.id) - fileOrder.indexOf(b.id));

  // { "The brand": [questions …], "The products": [ … ], … } – a Map keeps the file order
  const groups = new Map<string, { id: string; question: string; paragraphs: string[] }[]>();
  for (const { id, data } of entries) {
    if (!groups.has(data.group)) groups.set(data.group, []);
    groups.get(data.group)!.push({ id, question: data.question, paragraphs: toParagraphs(data.answer) });
  }

  return [...groups].map(([name, questions]) => ({ name, questions }));
}

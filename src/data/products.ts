// PRODUCT READER – turns every product folder (src/content/products/) into what the
// pages need: the fields, the long texts split by their headings, and the photos found
// by their file names. The product page uses it (the product card will too).
// Runs only while the site is built – nothing of this reaches the visitor's browser.
import { getCollection } from "astro:content";
import type { ImageMetadata } from "astro";
import { productColours } from "./product-colours.js";
import placeholder from "../assets/products/placeholder.jpg";

// Every photo in every product folder. import.meta.glob = "find all files that
// match this pattern"; eager = load them right away.
const photos = import.meta.glob<{ default: ImageMetadata }>("/src/content/products/*/*.{webp,jpg,jpeg,png}", {
  eager: true,
});

// "Tobacco Brown" → "tobacco-brown" (how colours are written in file names)
function toFileName(text: string) {
  return text.toLowerCase().replaceAll(" ", "-");
}

// Finds a photo by its name without the ending, e.g. "shot_1_core-tee_black_unisex".
// Missing photo → the placeholder, plus a warning in the terminal.
function findPhoto(id: string, name: string): ImageMetadata {
  const path = Object.keys(photos).find((path) => path.startsWith(`/src/content/products/${id}/${name}.`));
  if (path) return photos[path].default;

  console.warn(`[products] Photo missing: ${id}/${name} – placeholder used`);
  return placeholder;
}

// Splits the text under the "## Heading" lines: { "Materials": "…", "Description": "…" }.
// Notes between <!-- and --> are removed first.
function splitSections(body: string) {
  const sections: Record<string, string> = {};
  const withoutNotes = body.replace(/<!--[\s\S]*?-->/g, "");

  for (const part of withoutNotes.split(/^## /m).slice(1)) {
    const [heading, ...lines] = part.split("\n");
    sections[heading.trim()] = lines.join("\n").trim();
  }
  return sections;
}

// One text → a list of paragraphs (an empty line starts a new one)
function toParagraphs(text = "") {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter((paragraph) => paragraph !== "");
}

// "Shot 3: Close-up of the seam" lines → { 3: "Close-up of the seam" }
function readShotDescriptions(text = "") {
  const descriptions: Record<number, string> = {};
  for (const match of text.matchAll(/^Shot (\d):[ \t]*(.*)$/gm)) {
    descriptions[Number(match[1])] = match[2].trim();
  }
  return descriptions;
}

export async function getProducts() {
  const entries = await getCollection("products");

  return entries.map(({ id, data, body = "" }) => {
    const sections = splitSections(body);
    const shotText = readShotDescriptions(sections["Shot descriptions"]);

    const colours = data.colours.map((name) => ({
      name,
      file: toFileName(name),
      hex: productColours[name as keyof typeof productColours],
    }));

    // One set of shots 1–5 for every colour × fit, e.g. black + unisex.
    // Alt text = name, colour, fit + what the shot shows (written in the text file).
    const shotSets = colours.flatMap((colour) =>
      data.fits.map((fit) => ({
        colour: colour.file,
        fit,
        shots: [1, 2, 3, 4, 5].map((number) => ({
          number,
          image: findPhoto(id, `shot_${number}_${id}_${colour.file}_${fit}`),
          alt: [`${data.name} in ${colour.name}, ${fit} fit`, shotText[number]].filter(Boolean).join(" – "),
        })),
      })),
    );

    return {
      id,
      name: data.name,
      tagline: data.tagline,
      price: data.price,
      priceText: data.price.toFixed(2).replace(".", ",") + "€", // 34.9 → "34,90€"
      collection: data.collection,
      sizes: data.sizes,
      fits: data.fits,
      colours,
      description: toParagraphs(sections["Description"]),
      designPurpose: toParagraphs(sections["Design & Purpose"]),
      fitSilhouette: toParagraphs(sections["Fit & Silhouette"]),
      materials: toParagraphs(sections["Materials"]),
      shot0: {
        image: findPhoto(id, `shot_0_${id}`),
        alt: [data.name, shotText[0]].filter(Boolean).join(" – "),
      },
      shotSets,
    };
  });
}

// The shape of one product, for the pages ("type" = a description for TypeScript)
export type Product = Awaited<ReturnType<typeof getProducts>>[number];

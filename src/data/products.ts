// PRODUCT READER – turns every product folder (src/content/products/<collection>/) into what the
// pages need: the fields, the long texts split by their headings, and the photos found
// by their file names. The product page and the Products page use it.
// Runs only while the site is built – nothing of this reaches the visitor's browser.
import { getCollection } from "astro:content";
import type { ImageMetadata } from "astro";
import { productColours } from "./product-colours.js";
import { productFits } from "./product-fits.js";
import { formatPrice } from "./price";
import placeholder from "../assets/products/placeholder.jpg";

// Every photo in every product folder. import.meta.glob = "find all files that
// match this pattern"; eager = load them right away.
const photos = import.meta.glob<{ default: ImageMetadata }>("/src/content/products/*/*/*.{webp,jpg,jpeg,png}", {
  eager: true,
});

// "Tobacco Brown" → "tobacco-brown" (how colours and collections are written in file names)
function toFileName(text: string) {
  return text.toLowerCase().replaceAll(" ", "-");
}

// Every product folder sits in the folder of its collection ("Base Collection" →
// base-collection/01_core-tee/). The collection line in the text file decides: a folder in
// the wrong collection stops the build, so the folder and the text can never disagree.
// Returns the folder, e.g. "base-collection/01_core-tee".
function checkCollectionFolder(id: string, collection: string, filePath = "") {
  const parts = filePath.split(/[\\/]/);
  const folder = parts.at(-3);
  const expected = toFileName(collection);
  if (folder !== expected) {
    throw new Error(
      `[products] ${id}: the text file says "${collection}", but the folder is in "${folder}/". ` +
        `Move the folder ${parts.at(-2)} into src/content/products/${expected}/.`,
    );
  }
  return `${expected}/${parts.at(-2)}`;
}

// The number in front of the product folder decides the order on the site:
// "01_core-tee" → 1. A folder without a number stops the build, and so do two
// products with the same number (the order would be a guess).
function readOrder(filePath = "") {
  const folder = filePath.split(/[\\/]/).at(-2) ?? "";
  const number = folder.match(/^(\d+)_/)?.[1];
  if (!number) {
    throw new Error(`[products] ${folder}: the folder needs its order number in front, e.g. 07_${folder}.`);
  }
  return Number(number);
}

function checkOrderUnique(entries: { id: string; filePath?: string }[]) {
  const owners = new Map<number, string>(); // number → product, e.g. 1 → "core-tee"
  for (const { id, filePath } of entries) {
    const order = readOrder(filePath);
    const owner = owners.get(order);
    if (owner) {
      throw new Error(`[products] ${owner} and ${id} both have the number ${order} – every product needs its own number.`);
    }
    owners.set(order, id);
  }
}

// A colour name from the text file → everything a colour dot needs.
// veryDark: black and similar get a thin Flint ring, or the dot vanishes on the dark page.
// (Average of red, green and blue below 40 out of 255.)
export function toColour(name: string) {
  const { hex } = productColours[name as keyof typeof productColours];
  const [red, green, blue] = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16));
  return { name, file: toFileName(name), hex, veryDark: (red + green + blue) / 3 < 40 };
}

// The 3 letters of a product code belong to one product only (CTE = the Core Tee).
// The content rules see one file at a time, so this looks at all products together:
// two products with the same letters stop the build.
function checkCodesUnique(entries: { id: string; data: { code: string } }[]) {
  const owners = new Map<string, string>(); // letters → product, e.g. "CTE" → "core-tee"
  for (const { id, data } of entries) {
    const letters = data.code.slice(0, 3);
    const owner = owners.get(letters);
    if (owner) {
      throw new Error(`[products] ${owner} and ${id} both use the code letters ${letters} – every product needs its own 3 letters.`);
    }
    owners.set(letters, id);
  }
}

// Finds a photo in a product folder by its name without the ending,
// e.g. "shot_1_core-tee_black_unisex" in "base-collection/core-tee".
// Missing photo → the placeholder, plus a warning in the terminal.
function findPhoto(folder: string, name: string): ImageMetadata {
  const path = Object.keys(photos).find((path) => path.startsWith(`/src/content/products/${folder}/${name}.`));
  if (path) return photos[path].default;

  console.warn(`[products] Photo missing: ${folder}/${name} – placeholder used`);
  return placeholder;
}

// The same, but for photos that are allowed to be missing (e.g. a women's shot 0):
// no placeholder, no warning – just nothing.
function findOptionalPhoto(folder: string, name: string): ImageMetadata | undefined {
  const path = Object.keys(photos).find((path) => path.startsWith(`/src/content/products/${folder}/${name}.`));
  return path ? photos[path].default : undefined;
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

// "Shot 3: Close-up of the seam" lines → { "3": "Close-up of the seam" }
// A shot 0 for one fit has the fit after the number: "Shot 0 female: …" → { "0 female": "…" }
function readShotDescriptions(text = "") {
  const descriptions: Record<string, string> = {};
  for (const match of text.matchAll(/^Shot (\d(?: \w+)?):[ \t]*(.*)$/gm)) {
    descriptions[match[1].toLowerCase()] = match[2].trim();
  }
  return descriptions;
}

export async function getProducts() {
  const entries = await getCollection("products");
  checkCodesUnique(entries);
  checkOrderUnique(entries);

  // Sorted by the number in front of the folder (01, 02 …), not by name.
  // "a, b" = two products; a negative result puts a first.
  const sorted = [...entries].sort((a, b) => readOrder(a.filePath) - readOrder(b.filePath));

  return sorted.map(({ id, data, body = "", filePath }) => {
    const folder = checkCollectionFolder(id, data.collection, filePath);
    const sections = splitSections(body);
    const shotText = readShotDescriptions(sections["Shot descriptions"]);

    // Every colour knows its fits: the ones in brackets in the text file, otherwise all
    // ("as": the build already checked that every fit in brackets is one under "fits:")
    const colours = data.colours.map(({ name, fits }) => ({
      ...toColour(name),
      fits: (fits ?? data.fits) as typeof data.fits,
    }));

    // Shot 5 is optional: no "Shot 5:" line in the text file → the product has only
    // shots 1–4 (e.g. the beanie) and the page leaves the big shot 5 out.
    const shotNumbers = "5" in shotText ? [1, 2, 3, 4, 5] : [1, 2, 3, 4];

    // One set of shots for every colour × fit that exists, e.g. black + unisex.
    // Alt text = name, colour, fit + what the shot shows (written in the text file).
    const shotSets = colours.flatMap((colour) =>
      colour.fits.map((fit) => ({
        colour: colour.file,
        fit,
        shots: shotNumbers.map((number) => ({
          number,
          image: findPhoto(folder, `shot_${number}_${id}_${colour.file}_${fit}`),
          alt: [`${data.name} in ${colour.name}, ${fit} fit`, shotText[number]].filter(Boolean).join(" – "),
        })),
      })),
    );

    // Shot 0 is optional too: no "Shot 0:" line → the page starts with shot 1.
    const shot0 =
      "0" in shotText
        ? { image: findPhoto(folder, `shot_0_${id}`), alt: [data.name, shotText[0]].filter(Boolean).join(" – ") }
        : undefined;

    return {
      id,
      order: readOrder(filePath), // e.g. 1 – sets the order on the Products page
      name: data.name,
      code: data.code, // e.g. "THZ01" – the full code comes from productCode() below
      tagline: data.tagline,
      price: data.price,
      priceText: formatPrice(data.price), // 34.9 → "34,90€" (src/data/price.ts)
      collection: data.collection,
      sizes: data.sizes,
      fits: data.fits,
      colours,
      description: toParagraphs(sections["Description"]),
      designPurpose: toParagraphs(sections["Design & Purpose"]),
      fitSilhouette: toParagraphs(sections["Fit & Silhouette"]),
      materials: toParagraphs(sections["Materials"]),
      shot0,
      // The product card: shot 0 + hover shot 1. Without shot 0: shot 1 + hover shot 2.
      card: shot0 ?? shotSets[0].shots[0],
      cardHover: shotSets[0].shots[shot0 ? 0 : 1],
      // Optional: an own shot 0 for one fit, e.g. shot_0_traverse-half-zip_female.
      // The product page shows it while that fit is chosen; otherwise the normal shot 0.
      shot0ByFit: data.fits.flatMap((fit) => {
        const image = findOptionalPhoto(folder, `shot_0_${id}_${fit}`);
        return image ? [{ fit, image, alt: [data.name, shotText[`0 ${fit}`]].filter(Boolean).join(" – ") }] : [];
      }),
      shotSets,
    };
  });
}

// The shape of one product, for the pages ("type" = a description for TypeScript)
export type Product = Awaited<ReturnType<typeof getProducts>>[number];

// The Cave Wear code of one product configuration – looks like a military tag, but is a
// real stock code: brand · product + design version · fit-colour.
// productCode(product, "female", "Tobacco Brown") → "CW · THZ01 · 2-32"
// The size isn't part of it (the size boxes already show it).
export function productCode(product: Pick<Product, "code">, fit: keyof typeof productFits, colourName: string) {
  const fitCode = productFits[fit].code;
  const colourCode = productColours[colourName as keyof typeof productColours].code;
  return `CW · ${product.code} · ${fitCode}-${colourCode}`;
}

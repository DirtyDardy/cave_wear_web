// CONTENT – tells Astro where my content lives and what every file must contain.
// Products: one folder per product in src/content/products/<collection>/ (guide: README.md there).
// If a text file breaks a rule, the build stops and names the file and the field –
// so a product with a missing price can never go live.
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { productColours } from "./data/product-colours.js";

// Colour codes (src/data/product-colours.js): exactly 2 digits, each one used only once.
// A wrong or doubled code stops the build before anything else is checked.
const colourWithCode = new Map<string, string>(); // code → colour, e.g. "32" → "Tobacco Brown"
for (const [name, { code }] of Object.entries(productColours)) {
  if (!/^\d{2}$/.test(code)) {
    throw new Error(`[colours] ${name}: the colour code "${code}" must be exactly 2 digits, e.g. 24 (src/data/product-colours.js)`);
  }
  const taken = colourWithCode.get(code);
  if (taken) {
    throw new Error(`[colours] ${taken} and ${name} both have the colour code ${code} – every code is used only once (src/data/product-colours.js)`);
  }
  colourWithCode.set(code, name);
}

// Turns "XS, S, M" into a list: ["XS", "S", "M"]
const commaList = z.string({ error: "Missing – write at least one, comma between" }).transform((text) =>
  text
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== ""),
);

const products = defineCollection({
  // Every product.md two folders deep: collection folder / product folder.
  // Folders starting with _ (drafts) are skipped.
  // The product folder's name becomes the id, without its order number in front:
  // "base-collection/01_core-tee/product.md" → "core-tee". So the number can change
  // (new order on the site) while the web address and saved Packs stay the same.
  loader: glob({
    pattern: ["*/*/product.md", "!**/_*/**"],
    base: "./src/content/products",
    generateId: ({ entry }) => entry.split("/")[1].replace(/^\d+_/, ""),
  }),

  schema: z.object({
    name: z.string({ error: "Name is missing" }),

    // The product code: 3 capital letters (the product) + 2 digits (the design version,
    // starts at 01), e.g. THZ01. Set once, never changed. That the 3 letters belong to one
    // product only is checked in src/data/products.ts – these rules see one file at a time.
    code: z
      .string({ error: "Code is missing – 3 capital letters + 2 digits, e.g. THZ01" })
      .regex(/^[A-Z]{3}\d{2}$/, { error: "Code must be 3 capital letters + 2 digits, e.g. THZ01" }),

    tagline: z.string({ error: "Tagline is missing" }),

    // 35 and 34.90 arrive as numbers, "34,90" (German comma) as text – both become a number
    price: z
      .union([z.number(), z.string()], { error: "Price is missing – write a number, e.g. 35 or 34,90" })
      .transform((price) => (typeof price === "number" ? price : Number(price.replace(",", "."))))
      .pipe(z.number({ error: "Price must be a number, e.g. 35 or 34,90" }).positive()),

    collection: z.enum(["Base Collection", "Supporter Collection"], {
      error: 'Write "Base Collection" or "Supporter Collection"',
    }),

    sizes: commaList.pipe(z.array(z.string()).min(1)),

    // "Unisex" or "unisex" – both fine
    fits: commaList.transform((list) => list.map((fit) => fit.toLowerCase())).pipe(
      z.array(z.enum(["unisex", "female", "male"], { error: "Fits are unisex, female or male" })).min(1),
    ),

    // A colour that only exists in some fits gets them in brackets:
    // "Black, Alpine Oak (male), Tobacco Brown (female)". No brackets = every fit.
    // Several fits: "(female / male)". Each colour becomes { name, fits }.
    colours: commaList
      .transform((list): { name: string; fits?: string[] }[] =>
        list.map((item) => {
          const [, name, inBrackets] = item.match(/^(.*?)\s*(?:\((.*)\))?$/) ?? [];
          const fits = inBrackets?.split("/").map((fit) => fit.trim().toLowerCase());
          return { name, fits };
        }),
      )
      .pipe(
        z
          .array(
            z.object({
              name: z.string().refine((name) => name in productColours, {
                error: "Every colour must be listed in src/data/product-colours.js (same spelling)",
              }),
              fits: z.array(z.string()).optional(), // checked against "fits:" below
            }),
          )
          .min(1),
      ),
  })
    // A fit in brackets must also be under "fits:" – "Tobacco Brown (kids)" stops the build
    .refine((product) => product.colours.every((colour) => (colour.fits ?? []).every((fit) => (product.fits as string[]).includes(fit))), {
      error: 'A fit in brackets after a colour must also be listed under "fits:", e.g. Alpine Oak (male)',
      path: ["colours"],
    }),
});

// FAQ: all questions in one file, src/content/faq.yaml (the Contact page shows them).
// Every entry needs an id (the jump target), a group, a question and an answer.
const faq = defineCollection({
  loader: file("./src/content/faq.yaml"),
  schema: z.object({
    group: z.enum(["The brand", "The products", "Launch & Pack"], {
      error: 'Write "The brand", "The products" or "Launch & Pack"',
    }),
    question: z.string({ error: "Question is missing" }),
    answer: z.string({ error: "Answer is missing" }),
  }),
});

export const collections = { products, faq };

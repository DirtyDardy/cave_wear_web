// CONTENT – tells Astro where my content lives and what every file must contain.
// Products: one folder per product in src/content/products/ (guide: README.md there).
// If a text file breaks a rule, the build stops and names the file and the field –
// so a product with a missing price can never go live.
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { productColours } from "./data/product-colours.js";

// Turns "XS, S, M" into a list: ["XS", "S", "M"]
const commaList = z.string({ error: "Missing – write at least one, comma between" }).transform((text) =>
  text
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== ""),
);

const products = defineCollection({
  // Every product.md one folder deep. Folders starting with _ (the template) are skipped.
  // The folder name becomes the product's id: "core-tee/product.md" → "core-tee".
  loader: glob({
    pattern: ["*/product.md", "!_*/**"],
    base: "./src/content/products",
    generateId: ({ entry }) => entry.split("/")[0],
  }),

  schema: z.object({
    name: z.string({ error: "Name is missing" }),
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

    colours: commaList.pipe(
      z
        .array(
          z.string().refine((name) => name in productColours, {
            error: "Every colour must be listed in src/data/product-colours.js (same spelling)",
          }),
        )
        .min(1),
    ),
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

// Product colours – one shared list for all products: every colour of my Cave Wear colour
// sheet, with its hex (the colour dot) and its code (part of the product code, see
// src/data/products.ts). The product text files (src/content/products/*/*/product.md) use
// these names – spelled exactly like here. New colour: add one line here first.
// In photo file names a colour is written in lowercase, spaces become hyphens
// ("Tobacco Brown" → tobacco-brown).
//
// Names = the colour sheet names, except Black (= Dark Obsidian) and Olive (= Irr Olive).
// Codes: 2 digits – the first is the colour family, then darkest first (today's list).
// A code never changes once it's set. A new colour goes at the END of its family (a new
// green = 24, even if it's darker); a new family takes the next free digit (6, 7 …).
// The build stops if a code isn't exactly 2 digits or is used twice (src/content.config.ts).

export const productColours = {
  // 0 · Blacks
  Black: { hex: "#0D0D0E", code: "01" }, // Dark Obsidian
  Obsidian: { hex: "#131314", code: "02" },
  Charcoal: { hex: "#1E1E1E", code: "03" },
  // 1 · Stones
  Flint: { hex: "#6B655E", code: "11" },
  "Muted Stone": { hex: "#8C857B", code: "12" },
  "Weathered Bone": { hex: "#C4B9AC", code: "13" },
  Egret: { hex: "#F3EBE0", code: "14" },
  White: { hex: "#FFFFFF", code: "15" }, // new 30 Oct – pure white, no product yet
  // 2 · Greens
  Olive: { hex: "#4B573E", code: "21" }, // Irr Olive
  "Mossy Elm": { hex: "#5E6D4E", code: "22" },
  "Forest Fern": { hex: "#5B7553", code: "23" },
  // 3 · Browns
  Moule: { hex: "#382D2B", code: "31" },
  "Tobacco Brown": { hex: "#9A7354", code: "32" },
  "Alpine Oak": { hex: "#AE946B", code: "33" },
  // 4 · Golds
  "Wild Honey": { hex: "#C39132", code: "41" },
  "Amber Gold": { hex: "#D4A54A", code: "42" },
  // 5 · Reds
  Terracotta: { hex: "#B86B43", code: "51" },
};

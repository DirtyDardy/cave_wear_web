# Products – how to add or change a product

Every product is one folder in here: one text file (`product.md`) and its photos.
The site builds the product card, the product page and the breadcrumb from that folder.
Change something in the text file and the whole site follows – nothing is typed twice.

## Add a new product

1. Copy the `_template` folder. Never fill in `_template` itself – it stays empty.
2. Rename the copy: short, lowercase, hyphens instead of spaces – e.g. `rain-jacket`.
   This name becomes the web address (`/products/rain-jacket`) and saved favorites use it,
   so **never rename the folder later**.
3. Open `product.md` and fill in every line.
4. Put the photos into the folder (names below).
5. Start the site (`npm run dev`). If something is missing or wrong, the terminal says
   which file and which field.

**Drafts:** a folder whose name starts with `_` is skipped (e.g. `_field-hoodie`). Use this
while a product is still being filled in – remove the `_` when it's ready to go online.

**Photos:** keep your originals outside this project (e.g. `cave_wear_dis/products/<product>/`).
Only the finished, converted photos go into the product folder.

## The text file

**Top part** (between the two `---` lines): one short value per line, written after the colon.
Lines starting with `#` are notes – the site ignores them.

- If a value contains a colon, put it in quotes: `tagline: "Rain: no problem"`
- Lists are separated by commas: `colours: Black, Olive, Egret`
- Write the name normally (`The Core Tee`) – the product page shows it in capitals by itself.

**Bottom part:** the long texts, each under its heading. Don't rename or delete the headings.
An empty line starts a new paragraph. Text between `<!--` and `-->` is a note and never shown.

## Photos

All photos **4:5** (e.g. 1600 × 2000 px) – jpg, png or webp. File names: lowercase, no spaces,
`_` between the parts, `-` inside a part.

| File | What it shows |
|---|---|
| `shot_0_core-tee.webp` | Real photoshoot picture, any colour. Stays the same when the visitor changes colour or fit. |
| `shot_1_core-tee_black_unisex.webp` | Front |
| `shot_2_core-tee_black_unisex.webp` | Back |
| `shot_3_…` to `shot_5_…` | Close-ups – what they show goes under "Shot descriptions" |

The pattern is always **shot number _ product _ colour _ fit**. Every colour and every fit gets
its own shots 1–5 (e.g. the half-zip in brown needs `…_brown_female` and `…_brown_male`).
Colours in file names: lowercase, spaces become hyphens (`Tobacco Brown` → `tobacco-brown`).

## Colours

Every colour name must be listed in `src/data/product-colours.js` – that list also holds the
colour of the dot. New colour: add it there first, then use it in the text file.

## Rules

- Materials and anything about production is always written as **vision** ("planned",
  "our vision", "what I'm working on") – never as fact.
- Only what is in Git reaches the live site.

# Products – how to change a product

Every product is one folder in here: one text file (`product.md`) and its photos.
The site builds the product card, the product page and the breadcrumb from that folder.
Change something in the text file and the whole site follows – nothing is typed twice.

Each product folder sits in the folder of its collection:

```
products/
├── base-collection/
│   ├── 01_core-tee/
│   └── 02_field-hoodie/
└── supporter-collection/
```

**The number in front sets the order** on the Products page (01 comes first). The name
after it is the web address (`01_core-tee` → `/products/core-tee`) and never changes –
saved Packs and favorites use it. The number may change: rename `04_ridge-beanie` to
`02_ridge-beanie` and the beanie moves up. Every folder needs a number, and no two
products may share one – otherwise the build stops and says which.

The `collection:` line in the text file decides the folder ("Base Collection" →
`base-collection/`). If a product sits in the wrong collection folder, the build stops and
says where it belongs.

**New products start in the setup folder** `cave_wear_dis/products/`, next to this project
(not in Git). It holds the original photos, the blank template and the steps. Only the
finished product – text file + converted photos – comes into this folder.

After a change, start the site (`npm run dev`). If something is missing or wrong, the
terminal says which file and which field. Replaced a photo? Reload with Ctrl + F5.

**Drafts:** a folder whose name starts with `_` is skipped (e.g. `_02_field-hoodie`). Use this
to take a product off the site for a while – remove the `_` to bring it back.

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
| `shot_0_core-tee_female.webp` | Optional: an own shot 0 for one fit – shown while that fit is chosen. Its description: `Shot 0 female:` |
| `shot_1_core-tee_black_unisex.webp` | Front |
| `shot_2_core-tee_black_unisex.webp` | Back |
| `shot_3_…` to `shot_5_…` | Close-ups – what they show goes under "Shot descriptions" |

**Only four mock-ups** (e.g. a beanie): delete the line `Shot 5:` in the text file. The product
page then shows shots 1–4 without the big shot 5, and no `shot_5_…` photos are needed.

The pattern is always **shot number _ product _ colour _ fit**. Every colour and every fit gets
its own shots 1–5 (e.g. the half-zip in brown needs `…_brown_female` and `…_brown_male`).
Colours in file names: lowercase, spaces become hyphens (`Tobacco Brown` → `tobacco-brown`).

## Colours

Every colour name must be listed in `src/data/product-colours.js` – that list also holds the
colour of the dot and the colour code (see below). New colour: add it there first, then use
it in the text file.

**A colour only in some fits:** write the fit in brackets after it –
`colours: Black, Alpine Oak (male), Tobacco Brown (female)`. No brackets = every fit;
several: `(female / male)`. On the product page that colour is then hidden for the
other fits, and only its own photos are needed (here no `…_alpine-oak_female` shots).

## The product code

Every product configuration has a code that looks like a military tag but is a real stock
code – an order can be read in one look:

```
CW · THZ01 · 2-32
│    │  │    │ └─ colour code (2 digits)
│    │  │    └─── fit code (1 digit)
│    │  └──────── design version (2 digits)
│    └─────────── product (3 capital letters)
└──────────────── brand, always CW
```

- **Product + design version** – the `code:` line in the text file, e.g. `code: THZ01`.
  Exactly 3 capital letters + 2 digits. The 3 letters belong to this product only and
  never change (like the folder name). The version starts at 01 and only goes up by one
  when the design really changes.
- **Fit code** – fixed in `src/data/product-fits.js`: 0 unisex · 1 male · 2 female.
  One-size products (beanie, buff) are unisex → 0.
- **Colour code** – fixed in `src/data/product-colours.js`. The first digit is the colour
  family (0 blacks · 1 stones · 2 greens · 3 browns · 4 golds · 5 reds). A new colour goes
  at the end of its family (a new green = 24), a new family takes the next free digit.
- The size is not part of the code.
- **Never change a code once it's set.** The build stops if a code has the wrong format,
  if two products share the same 3 letters, or if a colour code is used twice.

## Rules

- Materials and anything about production is always written as **vision** ("planned",
  "our vision", "what I'm working on") – never as fact.
- Only what is in Git reaches the live site.

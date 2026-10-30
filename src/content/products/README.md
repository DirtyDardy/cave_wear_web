# Products – how to change a product

Every product is one folder in here: one text file (`product.md`) and its photos.
The site builds the product card, the product page and the breadcrumb from that folder.
Change something in the text file and the whole site follows – nothing is typed twice.

Each product folder sits in the folder of its collection:

```
products/
├── base-collection/
│   ├── core-tee/
│   └── field-hoodie/
└── supporter-collection/
```

The `collection:` line in the text file decides the folder ("Base Collection" →
`base-collection/`). If a product sits in the wrong collection folder, the build stops and
says where it belongs.

**New products start in the setup folder** `cave_wear_dis/products/`, next to this project
(not in Git). It holds the original photos, the blank template and the steps. Only the
finished product – text file + converted photos – comes into this folder.

After a change, start the site (`npm run dev`). If something is missing or wrong, the
terminal says which file and which field. Replaced a photo? Reload with Ctrl + F5.

**Drafts:** a folder whose name starts with `_` is skipped (e.g. `_field-hoodie`). Use this
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

The pattern is always **shot number _ product _ colour _ fit**. Every colour and every fit gets
its own shots 1–5 (e.g. the half-zip in brown needs `…_brown_female` and `…_brown_male`).
Colours in file names: lowercase, spaces become hyphens (`Tobacco Brown` → `tobacco-brown`).

## Colours

Every colour name must be listed in `src/data/product-colours.js` – that list also holds the
colour of the dot. New colour: add it there first, then use it in the text file.

**A colour only in some fits:** write the fit in brackets after it –
`colours: Black, Alpine Oak (male), Tobacco Brown (female)`. No brackets = every fit;
several: `(female / male)`. On the product page that colour is then hidden for the
other fits, and only its own photos are needed (here no `…_alpine-oak_female` shots).

## Rules

- Materials and anything about production is always written as **vision** ("planned",
  "our vision", "what I'm working on") – never as fact.
- Only what is in Git reaches the live site.

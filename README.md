# Cave Wear

**Built for the wild. Made for anywhere.**

Cave Wear is a concept brand for outdoor and everyday clothing, and this website is my portfolio
project: brand, design, content and code by one person, Dardan Ademi.

Live: [cavewear.de](https://cavewear.de)

> Cave Wear is a concept brand for a design portfolio. Products are concept mock-ups – some are
> based on existing garments and edited. Nothing is for sale.

## Why I built it

I wanted to show the whole way from an idea to a working product: a brand identity, a design system
and a site that works reliably on desktop and phones, with decisions I can explain. I come from
digital print and production management and learned web development on this project, using
Claude Code as my technical partner. I make the design decisions and review the code.

## What's in it

- **Home:** the split-screen hero, the Base Collection, how the Pack works, and live weather from
  Open-Meteo with a product suggestion.
- **Products:** one page per product, built from one text file and a folder of photos.
- **The Pack:** a drawer to reserve a place for the launch. No payment and no accounts, with a
  confirmation email.
- **Brand:** the story, the logo, and cave bear records from GBIF, fetched when the site is built.
- **Contact:** an FAQ and a contact form.

## Tech stack

| Choice | Why |
|---|---|
| [Astro](https://astro.build) | Finished HTML at build time, no JavaScript unless a part needs it |
| React + TypeScript | Only for the parts with a lot of changing state: the Pack and the weather |
| Own CSS, no framework | A design system of my own, built on CSS variables and a 4-point grid |
| Plain JavaScript | The menu, forms and photo viewer |
| Netlify + Netlify Forms | Hosting, forms and the confirmation email function |
| Open-Meteo, GBIF | Public REST APIs that return JSON |

There are no cookies, no tracking and no accounts: I only collect what a feature really needs. The
accessibility goal is WCAG 2.2 AA, and [the accessibility page](https://cavewear.de/accessibility/)
lists what isn't there yet.

## Run it

You need Node 22.22 or newer.

```sh
npm ci          # install the exact packages from package-lock.json
npm run dev     # start the site at http://localhost:4321
npm run build   # check the types, then build the site into dist/
npm run preview # show the built site
```

## Where things are

```text
src/pages/             one file per page
src/components/        the parts of a page (Astro and React)
src/content/products/  one folder per product: text file + photos
src/content/faq.yaml   the FAQ questions and answers
src/data/              colours, fits and the code that reads the content
src/scripts/           behaviour in the browser
src/styles/global.css  the design system: colours, type, spacing, buttons
netlify/functions/     the reservation confirmation email
```

To change a product, see [`src/content/products/README.md`](src/content/products/README.md).

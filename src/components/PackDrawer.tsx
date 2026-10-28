// THE PACK DRAWER – slides in from the right and shows what's in the Pack.
// The one React part of the site (an "island"): Astro builds every page as plain HTML,
// and only this piece runs React in the browser.
// The list comes from the shared Pack store (src/scripts/pack-store.ts). Names, prices
// and photos come from the product folders – Header.astro passes them in as "catalog".
import { useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import {
  packItems,
  isPackOpen,
  closePack,
  changeQuantity,
  removeItem,
  itemKey,
  maxQuantity,
  type PackItem,
} from "../scripts/pack-store";
import { formatPrice } from "../data/price";
// ?raw = the SVG file as text, so the drawer shows my own icons (the same files)
import closeIcon from "../assets/icons/close.svg?raw";
// PLACEHOLDER: the closed backpack from the header – swap for my open backpack once drawn
import packIcon from "../assets/icons/backpack.svg?raw";

// What the drawer needs to know about one product (filled in by Header.astro)
export type PackProduct = {
  name: string;
  price: number;
  colours: Record<string, string>; // "olive" → "Olive"
  fits: Record<string, string>; // "unisex" → "Unisex"
  photos: Record<string, string>; // "olive_unisex" → address of the small front photo
};

// Props = the values a component gets from outside, like the attributes of an HTML tag
type Props = {
  catalog: Record<string, PackProduct>; // product folder name → product
};

export default function PackDrawer({ catalog }: Props) {
  // useStore = "read this store, and draw the drawer again every time it changes"
  const items = useStore(packItems);
  const open = useStore(isPackOpen);

  // useRef = a handle on the real <dialog> element, to use its own open and close
  const dialog = useRef<HTMLDialogElement>(null);

  // useEffect = "after drawing, also do this". Here: open or close the real dialog
  // whenever the store's isPackOpen changes ([open] = only then, not on every change).
  // showModal() gives us for free: focus moves inside, Escape closes, the page behind
  // can't be clicked, and focus goes back to the button that opened it.
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  // A row whose product folder no longer exists (renamed or deleted) is skipped quietly
  const rows = items.filter((item) => catalog[item.id]);

  let total = 0;
  for (const item of rows) total += catalog[item.id].price * item.quantity;

  return (
    // Escape closes a dialog by itself – onCancel (fires right at the key press) and
    // onClose tell the store, so the next click on "Pack" opens it again. Both on
    // purpose: in my tests "close" sometimes never arrived, "cancel" always did.
    // A click on the dialog itself (not on anything inside) = the dark area outside.
    <dialog
      ref={dialog}
      id="pack-drawer"
      className="drawer"
      aria-labelledby="drawer-title"
      onCancel={closePack}
      onClose={closePack}
      onClick={(event) => {
        if (event.target === event.currentTarget) closePack();
      }}
    >
      <div className="drawer-panel">
        <div className="drawer-head">
          {/* tabIndex -1: not a Tab stop, but focus can be put here (after Remove) */}
          <h2 id="drawer-title" className="h3 drawer-title" tabIndex={-1}>
            {/* The same symbol as on the header button (decided 28 Oct) – screen readers
                skip it (aria-hidden in the SVG file) and only hear "Your pack" */}
            <span className="drawer-title-icon" dangerouslySetInnerHTML={{ __html: packIcon }} />
            Your pack
          </h2>
          {/* "dangerously" because inserting HTML text can be unsafe – here it's my
              own SVG file, never text typed by a visitor, so it's safe */}
          <button
            type="button"
            className="drawer-close"
            aria-label="Close pack"
            onClick={closePack}
            dangerouslySetInnerHTML={{ __html: closeIcon }}
          />
        </div>

        {rows.length === 0 ? (
          <EmptyPack />
        ) : (
          <>
            <ul className="drawer-list" role="list">
              {/* key = a name React uses to tell the rows apart when the list changes */}
              {rows.map((item) => (
                <PackRow key={itemKey(item)} item={item} product={catalog[item.id]} />
              ))}
            </ul>

            <div className="drawer-total">
              <p className="drawer-total-line">
                <span>Estimated total</span>
                <span>{formatPrice(total)}</span>
              </p>
              <p className="small">Preliminary prices. No payment now.</p>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

type RowProps = {
  item: PackItem;
  product: PackProduct;
};

// One row: photo · name · size, fit, colour · [− 2 +] · Remove · row total
function PackRow({ item, product }: RowProps) {
  const key = itemKey(item);
  // Opens the product page with this colour and fit already chosen (product-options.js)
  const link = `/products/${item.id}?colour=${item.colour}&fit=${item.fit}`;

  // After Remove, the button is gone – focus moves to the title, so keyboard users
  // keep their place in the drawer
  function remove() {
    removeItem(key);
    document.getElementById("drawer-title")?.focus();
  }

  return (
    <li className="drawer-item">
      {/* Same page as the name: the photo link is skipped by Tab and screen readers,
          one stop per row is enough */}
      <a href={link} className="drawer-photo" tabIndex={-1} aria-hidden="true">
        <img src={product.photos[`${item.colour}_${item.fit}`]} alt="" width={64} height={80} />
      </a>

      <div>
        <a href={link} className="drawer-name">
          {product.name}
        </a>
        <p className="small">
          {item.size} · {product.fits[item.fit]} · {product.colours[item.colour]}
        </p>

        <div className="drawer-controls">
          {/* aria-disabled instead of disabled: the button stays focusable at 1 and 10,
              so keyboard users don't lose their place. The store keeps 1–10 anyway. */}
          <div className="stepper" role="group" aria-label={`Quantity of ${product.name}`}>
            <button
              type="button"
              className="stepper-button"
              aria-label="One less"
              aria-disabled={item.quantity === 1}
              onClick={() => changeQuantity(key, item.quantity - 1)}
            >
              −
            </button>
            <span className="stepper-value" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              className="stepper-button"
              aria-label="One more"
              aria-disabled={item.quantity === maxQuantity}
              onClick={() => changeQuantity(key, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <button type="button" className="drawer-remove" onClick={remove}>
            Remove<span className="visually-hidden"> {product.name}</span>
          </button>
        </div>

        {item.quantity === maxQuantity && <p className="drawer-max">Maximum {maxQuantity} per item</p>}
      </div>

      <p className="drawer-price">{formatPrice(product.price * item.quantity)}</p>
    </li>
  );
}

// The empty Pack – my quiet joke (decided 27 Oct), far away from prices and Reserve
function EmptyPack() {
  return (
    <div className="drawer-empty">
      <p>Your pack is empty. Packing light is good – but not that light.</p>
      <a href="/products" className="button button-primary">
        Discover the collection
      </a>
    </div>
  );
}

// THE PACK DRAWER – slides in from the right and shows what's in the Pack.
// The one React part of the site (an "island"): Astro builds every page as plain HTML,
// and only this piece runs React in the browser.
// The list comes from the shared Pack store (src/scripts/pack-store.ts). Names, prices
// and photos come from the product folders – Header.astro passes them in as "catalog".
import { Fragment, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import ReserveForm from "./ReserveForm";
import {
  packItems,
  isPackOpen,
  closePack,
  changeQuantity,
  removeItem,
  itemKey,
  maxQuantity,
  reservations,
  canReserve,
  addReservation,
  maxReservations,
  type PackItem,
  type Reservation,
} from "../scripts/pack-store";
import { formatPrice } from "../data/price";
import { supportChoices } from "../data/product-support.js";
// ?raw = the SVG file as text, so the drawer shows my own icons (the same files)
import closeIcon from "../assets/icons/close.svg?raw";
// My open backpack: the header shows it closed, the drawer shows the Pack opened
import packIcon from "../assets/icons/backpack-open.svg?raw";

// A product name, but a word with a hyphen ("Half-Zip") never breaks in the middle:
// on small phones the whole word moves to the next line instead of "Half-" / "Zip".
// The name is cut at the spaces; each hyphen word gets white-space: nowrap.
function ProductName({ name }: { name: string }) {
  // The space stays outside the nowrap part – it's where the line may break
  return name.split(" ").map((word, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      <span style={word.includes("-") ? { whiteSpace: "nowrap" } : undefined}>{word}</span>
    </Fragment>
  ));
}

// What the drawer needs to know about one product (filled in by Header.astro)
export type PackProduct = {
  name: string;
  price: number;
  colours: Record<string, string>; // "olive" → "Olive"
  fits: Record<string, string>; // "unisex" → "Unisex"
  photos: Record<string, string>; // "olive_unisex" → address of the small front photo
};

// The Supporter choice of a row – undefined for every other product
function supportOf(item: PackItem) {
  return supportChoices[item.support as keyof typeof supportChoices];
}

// "M · Unisex · Black", plus what a Supporter piece supports. The same text in the row, the
// reservation and the email. filter(Boolean) drops the part a product doesn't have.
function itemDetails(item: PackItem, product: PackProduct) {
  return [item.size, product.fits[item.fit], product.colours[item.colour], supportOf(item)?.detail].filter(Boolean).join(" · ");
}

// A row's total: the product's price + the extra of its Supporter choice, times the quantity
function rowTotal(item: PackItem, product: PackProduct) {
  return (product.price + (supportOf(item)?.extra ?? 0)) * item.quantity;
}

// Props = the values a component gets from outside, like the attributes of an HTML tag
type Props = {
  catalog: Record<string, PackProduct>; // product folder name → product
};

export default function PackDrawer({ catalog }: Props) {
  // useStore = "read this store, and draw the drawer again every time it changes"
  const items = useStore(packItems);
  const open = useStore(isPackOpen);
  const reservedList = useStore(reservations);
  const roomForMore = useStore(canReserve);

  // Which step the drawer shows: the Pack itself, or the Reserve form (step 2).
  // useState = React's memory for it; setStep changes it and draws the drawer again.
  const [step, setStep] = useState<"pack" | "reserve">("pack");

  // The time of the reservation that was just sent – that one shows the confirmation text
  const [justReserved, setJustReserved] = useState<string | null>(null);

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
    // Closed = next time it opens with the Pack again, without the "just sent" text
    if (!open) {
      setStep("pack");
      setJustReserved(null);
    }
  }, [open]);

  // Keyboard focus follows the step: into the form's title, back to "Reserve my place",
  // or – after sending – onto the new reservation
  const stepTitle = useRef<HTMLParagraphElement>(null);
  const reserveButton = useRef<HTMLButtonElement>(null);
  const newestReservation = useRef<HTMLLIElement>(null);
  const focusNext = useRef<"form" | "button" | "reservation" | null>(null);
  useEffect(() => {
    if (focusNext.current === "form") stepTitle.current?.focus();
    if (focusNext.current === "button") reserveButton.current?.focus();
    if (focusNext.current === "reservation") newestReservation.current?.focus();
    focusNext.current = null;
  }, [step]);

  // A row whose product folder no longer exists (renamed or deleted) is skipped quietly
  const rows = items.filter((item) => catalog[item.id]);

  let total = 0;
  let pieces = 0;
  for (const item of rows) {
    total += rowTotal(item, catalog[item.id]);
    pieces += item.quantity;
  }

  // The Pack as text for the reservation – one line per row, e.g.
  // "2 × The Core Tee – M · Unisex · Olive – 69,80€" (Netlify shows it to me like that)
  const packText = rows
    .map((item) => {
      const product = catalog[item.id];
      return `${item.quantity} × ${product.name} – ${itemDetails(item, product)} – ${formatPrice(rowTotal(item, product))}`;
    })
    .join("\n");

  // After a successful "Send reservation": keep a frozen copy with its time (the store
  // also empties the Pack), then show the Pack step with the new reservation in focus
  function reserved(sentAt: string) {
    const lines = rows.map((item) => {
      const product = catalog[item.id];
      return {
        name: product.name,
        details: itemDetails(item, product),
        quantity: item.quantity,
        price: rowTotal(item, product),
      };
    });
    addReservation({ sentAt, lines, total });
    setJustReserved(sentAt);
    focusNext.current = "reservation";
    setStep("pack");
  }

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

        {step === "pack" || rows.length === 0 ? (
          <>
            {/* One scroll area: the current Pack, then my reservations under it */}
            <div className="drawer-body">
              {rows.length === 0 ? (
                <EmptyPack />
              ) : (
                <ul className="drawer-list" role="list">
                  {/* key = a name React uses to tell the rows apart when the list changes */}
                  {rows.map((item) => (
                    <PackRow key={itemKey(item)} item={item} product={catalog[item.id]} />
                  ))}
                </ul>
              )}

              {reservedList.length > 0 && (
                <Reservations list={reservedList} justReserved={justReserved} newestRef={newestReservation} />
              )}
            </div>

            {rows.length > 0 && (
              <div className="drawer-total">
                <p className="drawer-total-line">
                  <span>Estimated total</span>
                  <span>{formatPrice(total)}</span>
                </p>
                <p className="small">Preliminary prices. No payment now.</p>
                {roomForMore ? (
                  <button
                    ref={reserveButton}
                    type="button"
                    className="button button-primary drawer-reserve"
                    onClick={() => {
                      focusNext.current = "form";
                      setStep("reserve");
                    }}
                  >
                    Reserve my place
                  </button>
                ) : (
                  <p className="small drawer-limit">You've reached the limit of {maxReservations} reservations.</p>
                )}
              </div>
            )}
          </>
        ) : (
          // STEP 2: the Reserve form, in the same drawer (decided 28 Oct)
          <div className="drawer-step">
            <button
              type="button"
              className="drawer-back small"
              onClick={() => {
                focusNext.current = "button";
                setStep("pack");
              }}
            >
              <span aria-hidden="true">‹</span> Back to your pack
            </button>
            {/* tabIndex -1: focus lands here when the step opens, so screen readers hear it */}
            <p ref={stepTitle} className="label drawer-step-title" tabIndex={-1}>
              Reserve your place
            </p>
            <p className="drawer-summary">
              {pieces} {pieces === 1 ? "item" : "items"} · {formatPrice(total)}
            </p>
            <ReserveForm packText={packText} totalText={formatPrice(total)} onSent={reserved} />
          </div>
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
  const link = `/products/${item.id}?colour=${item.colour}&fit=${item.fit}${item.support ? `&support=${item.support}` : ""}`;

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
        {/* Name left, row total right – on one line, so the stepper and "Remove" below
            get the full width (with 3-digit prices "Remove" used to wrap on phones) */}
        <div className="drawer-item-top">
          <a href={link} className="drawer-name">
            <ProductName name={product.name} />
          </a>
          <span className="drawer-price">{formatPrice(rowTotal(item, product))}</span>
        </div>
        <p className="small">{itemDetails(item, product)}</p>

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

        {/* At 10: the limit, and my big-order idea (27 Oct) – only a way to talk to me,
            no promise of a special price */}
        {item.quantity === maxQuantity && (
          <p className="drawer-max">
            Maximum {maxQuantity} per item. Planning a big order?{" "}
            <a href="/contact#contact-form" className="text-link">
              Contact us <span aria-hidden="true">›</span>
            </a>
          </p>
        )}
      </div>
    </li>
  );
}

// The empty Pack – my quiet joke (decided 27 Oct), far away from prices and Reserve.
// The button jumps straight to the first collection. closePack: already on /products,
// the page would otherwise scroll behind the still-open drawer.
function EmptyPack() {
  return (
    <div className="drawer-empty">
      <p>Your pack is empty. Packing light is good – but not that light.</p>
      <a href="/products#base-collection" className="button button-primary" onClick={closePack}>
        Discover the collection
      </a>
    </div>
  );
}

// "2026-10-28T18:58:00.000Z" → "28.10.2026 · 19:58" (German format, the visitor's own time zone)
function formatTime(sentAt: string) {
  const date = new Date(sentAt);
  const day = date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  const time = date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  return `${day} · ${time}`;
}

type ReservationsProps = {
  list: Reservation[];
  justReserved: string | null;
  newestRef: React.RefObject<HTMLLIElement | null>;
};

// "Your reservations" – read-only, newest first, each with the time it was sent
// (= its place in the queue). Changes go through me (decided 28 Oct).
function Reservations({ list, justReserved, newestRef }: ReservationsProps) {
  return (
    <section className="drawer-reservations" aria-labelledby="reservations-title">
      {/* No "1 of 3" here (decided 28 Oct) – it read like a warning. The limit only
          shows up when someone actually reaches it. */}
      <h3 id="reservations-title" className="label drawer-reservations-title">
        Your reservations
      </h3>

      <ol className="drawer-reservation-list" role="list">
        {list.map((reservation, index) => (
          // The newest one can take the focus right after sending (tabIndex -1)
          <li
            key={reservation.sentAt}
            ref={index === 0 ? newestRef : undefined}
            tabIndex={index === 0 ? -1 : undefined}
            className="drawer-reservation"
          >
            {/* A toggle like my accordions (decided 28 Oct): closed by default, so the
                reservations don't distract from the Pack. Only the one just sent opens
                once, so its confirmation is seen. */}
            <details className="accordion drawer-reservation-toggle" open={reservation.sentAt === justReserved}>
              <summary>
                <span className="label drawer-reservation-time">Reserved · {formatTime(reservation.sentAt)}</span>
              </summary>

              <div className="drawer-reservation-content">
                {/* Only right after sending – role="status": screen readers read it out */}
                {reservation.sentAt === justReserved && (
                  <p className="drawer-reservation-note" role="status">
                    {import.meta.env.DEV
                      ? "Test mode – nothing was sent (works after deploying to Netlify)."
                      : "Your items are reserved. No payment now. We'll notify you at launch."}
                  </p>
                )}

                <ul className="drawer-reservation-lines" role="list">
                  {reservation.lines.map((line) => (
                    <li key={`${line.name} ${line.details}`}>
                      <span>
                        {line.quantity} × <ProductName name={line.name} />
                        <span className="drawer-reservation-details">{line.details}</span>
                      </span>
                      <span>{formatPrice(line.price)}</span>
                    </li>
                  ))}
                </ul>

                <p className="drawer-reservation-total">
                  <span>Estimated total</span>
                  <span>{formatPrice(reservation.total)}</span>
                </p>
              </div>
            </details>
          </li>
        ))}
      </ol>

      <p className="small drawer-change">
        Want to change something? Reply to your confirmation email or{" "}
        <a href="/contact#contact-form">write to us</a>.
      </p>
    </section>
  );
}

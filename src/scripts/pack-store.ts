// THE PACK – one shared list for the whole site (a "store"). The header button, the
// product page and the drawer all read and change this same list, so they always agree.
// Saved in this browser only (localStorage), like the favorites. Nothing is sent anywhere.
import { atom, computed } from "nanostores";

// One row in the Pack. A "type" describes what a value looks like, so TypeScript can
// warn us before the site even runs – e.g. if quantity is ever text instead of a number.
// Name, price and photo are NOT saved here: they always come fresh from the product
// folder, so a new price in product.md reaches the Pack too.
export type PackItem = {
  id: string; // product folder, e.g. "core-tee"
  size: string; // e.g. "M"
  fit: string; // "unisex", "female" or "male"
  colour: string; // as in the photo file names, e.g. "black"
  support?: string; // Supporter Collection only: where the 5€ goes (src/data/product-support.js)
  quantity: number; // 1 to maxQuantity
};

export const maxQuantity = 10; // same limit as the product page

// Reads a saved list. try/catch: some browsers block storage (private mode) or the
// saved text is broken – then the list simply starts empty.
// <T> = "works for any kind of list": Pack items here, reservations further down.
function loadList<T>(key: string): T[] {
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

// readonly = this function only reads the list, never changes it (the stores hand it over that way)
function saveList(key: string, list: readonly unknown[]) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Storage blocked: everything still works until the page is closed
  }
}

// atom = a box that holds one value and tells everyone who listens when it changes.
// <PackItem[]> = this box always holds a list of Pack items.
export const packItems = atom<PackItem[]>(loadList("cave-wear-pack"));
export const isPackOpen = atom(false);

// Every change is saved right away
packItems.subscribe((items) => saveList("cave-wear-pack", items));

// computed = a value worked out from another store; it updates by itself.
// The header shows pieces, not rows: 2 × tee + 1 × hoodie = 3.
export const packCount = computed(packItems, (items) => {
  let count = 0;
  for (const item of items) count += item.quantity;
  return count;
});

// Same product + size + fit + colour + support = the same row, e.g. "core-tee|M|unisex|black|"
export function itemKey(item: PackItem) {
  return [item.id, item.size, item.fit, item.colour, item.support].join("|");
}

// Keeps a quantity a whole number between 1 and maxQuantity.
// "|| 1": something that isn't a number becomes 1 (like quantity.js does).
function limit(quantity: number) {
  return Math.min(maxQuantity, Math.max(1, Math.round(quantity) || 1));
}

// Adds an item. Already in the Pack? Then only the number goes up (never above 10).
// The added row moves to the top, so it's the first thing you see in the drawer.
export function addItem(newItem: PackItem) {
  const items = packItems.get();
  const existing = items.find((item) => itemKey(item) === itemKey(newItem));
  // "?." = "only if there is one"; "?? 0" = "otherwise 0"
  const quantity = limit((existing?.quantity ?? 0) + newItem.quantity);

  packItems.set([{ ...newItem, quantity }, ...items.filter((item) => item !== existing)]);
}

export function changeQuantity(key: string, quantity: number) {
  packItems.set(
    packItems.get().map((item) => (itemKey(item) === key ? { ...item, quantity: limit(quantity) } : item)),
  );
}

export function removeItem(key: string) {
  packItems.set(packItems.get().filter((item) => itemKey(item) !== key));
}

// --- EXPLORER'S BONUS (decided 4 Nov) ----------------------------------------------------
// The reward for finding all four hidden coordinates: 5€ off, once per browser and never more
// than one in a Pack. It isn't a product: it has no size, photo or quantity, so it's its own line.
// A game, not a lock: it lives in the browser like everything else here, so dev tools could fake
// it. That's fine because no money moves. A real discount would have to be checked on a server.
export const bonusAmount = 5;
export const bonusName = "Explorer's bonus";
export const bonusDetails = "If and when Cave Wear launches";
// The same text is checked in netlify/functions/submission-created.mjs: change both together
export const bonusLine = `1 × ${bonusName} – ${bonusDetails} – −5,00€`;

// unused = the button still works · in-pack = waiting in the Pack · used = sent with a reservation
type BonusState = "unused" | "in-pack" | "used";

function loadBonus(): BonusState {
  try {
    const saved = localStorage.getItem("cave-wear-bonus");
    return saved === "in-pack" || saved === "used" ? saved : "unused";
  } catch {
    return "unused";
  }
}

export const explorerBonus = atom<BonusState>(loadBonus());

explorerBonus.subscribe((state) => {
  try {
    localStorage.setItem("cave-wear-bonus", state);
  } catch {
    // Storage blocked: it still works until the page is closed
  }
});

// Only from "unused", so a second click can never add a second one. It asks the saved value too,
// because another open tab may already have used it.
export function addBonus() {
  if (explorerBonus.get() === "unused" && loadBonus() === "unused") explorerBonus.set("in-pack");
}

export function openPack() {
  isPackOpen.set(true);
}

export function closePack() {
  isPackOpen.set(false);
}

// --- RESERVATIONS (decided 28 Oct) -----------------------------------------------------
// A copy of what was reserved plus the moment it was sent – that moment is its place in
// the queue. Up to 3 per browser; each one keeps its own time, so a later reservation
// simply joins the queue later. Read-only: changes go through me (reply to the email or
// the contact form). Saved in this browser too, so the visitor still sees them tomorrow.

// One reserved row, frozen as it was sent – unlike the Pack, the name and price are
// saved here, because the reservation is a record of that moment
type ReservedLine = {
  name: string; // "The Core Tee"
  details: string; // "M · Unisex · Olive"
  quantity: number;
  price: number; // the row total when it was reserved
};

export type Reservation = {
  sentAt: string; // when it was sent, e.g. "2026-10-28T18:58:00.000Z"
  lines: ReservedLine[];
  total: number;
};

export const maxReservations = 3;

export const reservations = atom<Reservation[]>(loadList("cave-wear-reservations"));
reservations.subscribe((list) => saveList("cave-wear-reservations", list));

// true while there is room for another reservation
export const canReserve = computed(reservations, (list) => list.length < maxReservations);

// After a successful "Send reservation": keep the copy (newest first) and empty the Pack,
// so it's free for the next one
export function addReservation(reservation: Reservation) {
  reservations.set([reservation, ...reservations.get()]);
  packItems.set([]);
  if (explorerBonus.get() === "in-pack") explorerBonus.set("used"); // it went with this reservation
}

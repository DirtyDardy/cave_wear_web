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
  quantity: number; // 1 to maxQuantity
};

export const maxQuantity = 10; // same limit as the product page

const storageKey = "cave-wear-pack";

// Reads the saved list. try/catch: some browsers block storage (private mode) or the
// saved text is broken – then the Pack simply starts empty.
function loadPack(): PackItem[] {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

// atom = a box that holds one value and tells everyone who listens when it changes.
// <PackItem[]> = this box always holds a list of Pack items.
export const packItems = atom<PackItem[]>(loadPack());
export const isPackOpen = atom(false);

// Every change is saved right away
packItems.subscribe((items) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(items));
  } catch {
    // Storage blocked: the Pack still works until the page is closed
  }
});

// computed = a value worked out from another store; it updates by itself.
// The header shows pieces, not rows: 2 × tee + 1 × hoodie = 3.
export const packCount = computed(packItems, (items) => {
  let count = 0;
  for (const item of items) count += item.quantity;
  return count;
});

// Same product + size + fit + colour = the same row, e.g. "core-tee|M|unisex|black"
export function itemKey(item: PackItem) {
  return [item.id, item.size, item.fit, item.colour].join("|");
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

export function openPack() {
  isPackOpen.set(true);
}

export function closePack() {
  isPackOpen.set(false);
}

// Prices in German format: 34.9 → "34,90€", 1050 → "1.050,00€".
// One shared function, so the product pages and the Pack always write prices the same way.
// Intl.NumberFormat is built into every browser and into Node: "de-DE" = German style.
const germanNumber = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(price: number) {
  return germanNumber.format(price) + "€";
}

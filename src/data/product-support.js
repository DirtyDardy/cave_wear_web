// SUPPORTER COLLECTION: the visitor chooses what the piece supports (planned, nothing is
// paid now). The value is saved in the Pack, so never change it; the first one is chosen
// at the start. label = the box on the product page, detail = the line in the Pack, the
// reservation and the email – only letters and spaces, or the email's safety check stops it.
// extra = euros on top of the price in product.md, which already includes one cause.
export const supportChoices = {
  bears: { label: "Bears", detail: "Supports bears", extra: 0 },
  "cave-wear": { label: "Cave Wear", detail: "Supports Cave Wear", extra: 0 },
  both: { label: "Both", detail: "Supports bears and Cave Wear", extra: 5 },
};

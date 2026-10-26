// Product fits – one shared list for the product card and the product page.
// The product text files (src/content/products/*/product.md) use these keys.
// Each fit has its label (for screen readers) and my icon (circle + symbol).
import FitUnisexIcon from "../assets/icons/fit-unisex.svg";
import FitFemaleIcon from "../assets/icons/fit-female.svg";
import FitMaleIcon from "../assets/icons/fit-male.svg";

export const productFits = {
  unisex: { label: "Unisex", icon: FitUnisexIcon },
  female: { label: "Female", icon: FitFemaleIcon },
  male: { label: "Male", icon: FitMaleIcon },
};

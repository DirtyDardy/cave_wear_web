// Product fits – one shared list for the product card and the product page.
// The product text files (src/content/products/*/*/product.md) use these keys.
// Each fit has its label (for screen readers), my icon (circle + symbol) and its code for
// the product code: 0 unisex · 1 male · 2 female (1 and 2 as in ISO/IEC 5218, the standard
// for coding sex in data; one-size products like a beanie are unisex → 0). Never change them.
import FitUnisexIcon from "../assets/icons/fit-unisex.svg";
import FitFemaleIcon from "../assets/icons/fit-female.svg";
import FitMaleIcon from "../assets/icons/fit-male.svg";

export const productFits = {
  unisex: { label: "Unisex", icon: FitUnisexIcon, code: "0" },
  female: { label: "Female", icon: FitFemaleIcon, code: "2" },
  male: { label: "Male", icon: FitMaleIcon, code: "1" },
};

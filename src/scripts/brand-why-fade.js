// BRAND ON PHONES – THE PHOTO OF WHY CAVE WEAR EXISTS FADES OUT OVER MY THREE PRINCIPLES (4 Nov).
// Every time the page scrolls we look at where the principles are on the screen, and that decides
// how see-through the photo is. A script and not a CSS scroll animation, because those only work
// on the newest iPhones. Only the opacity changes, so nothing can tremble.

const photo = document.querySelector(".brand-why-photo");
const principles = document.querySelector(".brand-principles");
const isPhone = window.matchMedia("(width < 48rem)");

function update() {
  if (!isPhone.matches) {
    photo.style.opacity = ""; // tablets and desktops: the CSS decides, the photo is simply there
    return;
  }
  const screen = window.innerHeight;
  const top = principles.getBoundingClientRect().top;
  // 0 = the principles are just coming in (90% down the screen), 1 = they've reached 30% from the top
  const progress = (screen * 0.9 - top) / (screen * 0.6);
  // min and max keep it between 0 and 1, also when an iPhone bounces past the page's end
  photo.style.opacity = 1 - Math.min(Math.max(progress, 0), 1);
}

if (photo && principles) {
  window.addEventListener("scroll", update, { passive: true }); // passive = never slows the scrolling
  window.addEventListener("resize", update);
  update();
}

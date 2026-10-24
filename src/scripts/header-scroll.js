// Header background: almost transparent at the top of photo pages (Home, Products),
// solid after a small scroll. CSS does the fade – this script only
// switches the data-scrolled attribute on the header.

const header = document.querySelector(".site-header");
const sentinel = document.querySelector(".scroll-sentinel");

const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  header.toggleAttribute("data-scrolled", !entry.isIntersecting);
});

observer.observe(sentinel);

// BRAND – MY FIRST PARAGRAPH WRITES ITSELF, ONCE (decided 2 Nov).
// The waiting and the animation are CSS (BrandTop.astro). This only says when to start:
// IntersectionObserver tells us when the section comes into view; then we mark it
// once and stop watching.

const section = document.querySelector(".brand-intro-section");

if (section) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      section.setAttribute("data-write", "go");
      observer.disconnect(); // once is enough
    },
    { threshold: 0.4 }, // 40% of the section on screen
  );
  observer.observe(section);
}

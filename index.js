// Parallax (rAF)
const layers = Array.from(document.querySelectorAll(".parallax-layer"));
let latestY = 0, ticking = false;

function onScroll() {
  latestY = window.scrollY || 0;
  if (!ticking) {
    requestAnimationFrame(() => {
      layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed || "0.2");
        layer.style.transform = `translate3d(0, ${latestY * speed}px, 0)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Stage entry on mobile when middle
(function stageEntryOnMobileMid(){
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = matchMedia("(max-width: 768px)").matches;
  const stage = document.getElementById("stage3d");
  if (!stage) return;

  if (reduceMotion || !isMobile) {
    stage.classList.add("is-live");
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        stage.classList.add("is-live");
        obs.disconnect();
        break;
      }
    }
  }, { threshold: 0, rootMargin: "-45% 0px -45% 0px" });

  obs.observe(stage);
})();

// Cards entry on mobile when middle
(function cardsEntryOnMobileMid(){
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = matchMedia("(max-width: 768px)").matches;
  const cards = Array.from(document.querySelectorAll(".reveal-card"));

  if (reduceMotion || !isMobile) {
    cards.forEach(c => c.classList.add("is-visible"));
    return;
  }

  const section = document.getElementById("products");
  if (!section) return;

  const obs = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        cards.forEach((c, i) => setTimeout(() => c.classList.add("is-visible"), i * 90));
        obs.disconnect();
        break;
      }
    }
  }, { threshold: 0, rootMargin: "-45% 0px -45% 0px" });

  obs.observe(section);
})();

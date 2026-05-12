const scrollySlides = Array.from(document.querySelectorAll(".scrolly-slide"));
const slideDots = Array.from(document.querySelectorAll(".slide-dot"));

let activeSlideIndex = 0;
let isProgrammaticScroll = false;
let scrollFrame = 0;

function setActiveSlide(index) {
  activeSlideIndex = Math.min(Math.max(index, 0), scrollySlides.length - 1);

  scrollySlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlideIndex);
  });

  slideDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlideIndex);
  });
}

function nearestSlideIndex() {
  const viewportAnchor = window.innerHeight * 0.38;

  return scrollySlides.reduce((closestIndex, slide, index) => {
    const currentDistance = Math.abs(slide.getBoundingClientRect().top - viewportAnchor);
    const closestDistance = Math.abs(scrollySlides[closestIndex].getBoundingClientRect().top - viewportAnchor);
    return currentDistance < closestDistance ? index : closestIndex;
  }, 0);
}

function goToSlide(index) {
  if (scrollySlides.length === 0 || isProgrammaticScroll) return;

  const nextIndex = Math.min(Math.max(index, 0), scrollySlides.length - 1);
  const nextSlide = scrollySlides[nextIndex];

  isProgrammaticScroll = true;
  setActiveSlide(nextIndex);
  nextSlide.scrollIntoView({ behavior: "smooth", block: "start" });

  window.setTimeout(() => {
    isProgrammaticScroll = false;
  }, 800);
}

function isScrollyVisible() {
  if (scrollySlides.length === 0) return false;

  const first = scrollySlides[0].getBoundingClientRect();
  const last = scrollySlides[scrollySlides.length - 1].getBoundingClientRect();
  return first.top < window.innerHeight * 0.72 && last.bottom > window.innerHeight * 0.28;
}

function updateActiveSlideFromScroll() {
  if (isProgrammaticScroll || scrollySlides.length === 0) return;
  setActiveSlide(nearestSlideIndex());
}

window.addEventListener(
  "scroll",
  () => {
    if (scrollFrame) return;

    scrollFrame = window.requestAnimationFrame(() => {
      updateActiveSlideFromScroll();
      scrollFrame = 0;
    });
  },
  { passive: true },
);

updateActiveSlideFromScroll();

slideDots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName?.toLowerCase();
  const isTyping = activeTag === "input" || activeTag === "textarea";
  if (isTyping || scrollySlides.length === 0 || !isScrollyVisible()) return;

  if (event.key === " " || event.key === "ArrowDown" || event.key === "PageDown") {
    event.preventDefault();
    goToSlide(nearestSlideIndex() + 1);
  }

  if (event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    goToSlide(nearestSlideIndex() - 1);
  }
});

scrollySlides.forEach((slide) => {
  slide.addEventListener("click", (event) => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    if (event.target.closest("a, button")) return;
    goToSlide(nearestSlideIndex() + 1);
  });
});

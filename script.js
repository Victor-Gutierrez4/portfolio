const storySteps = Array.from(document.querySelectorAll(".story-step"));
const storyTitle = document.querySelector("#story-visual-title");
const storyText = document.querySelector("#story-visual-text");
const storyStage = document.querySelector(".story-stage");
const storySection = document.querySelector(".story-section");

let activeStoryIndex = 0;

function setActiveStoryStep(step) {
  if (!step) return;

  storySteps.forEach((item) => item.classList.toggle("is-active", item === step));
  activeStoryIndex = Math.max(0, storySteps.indexOf(step));

  if (storyTitle) storyTitle.textContent = step.dataset.title || "";
  if (storyText) storyText.textContent = step.dataset.text || "";
  if (storyStage) storyStage.textContent = step.dataset.stage || "";
}

function moveStory(direction = 1) {
  if (storySteps.length === 0) return;

  const nextIndex = Math.min(Math.max(activeStoryIndex + direction, 0), storySteps.length - 1);
  const nextStep = storySteps[nextIndex];
  setActiveStoryStep(nextStep);
  nextStep.scrollIntoView({ behavior: "smooth", block: "center" });
}

function isStoryVisible() {
  if (!storySection) return false;

  const rect = storySection.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.28;
}

if ("IntersectionObserver" in window && storySteps.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActiveStoryStep(visible.target);
    },
    {
      rootMargin: "-30% 0px -35% 0px",
      threshold: [0.25, 0.5, 0.75],
    },
  );

  storySteps.forEach((step) => observer.observe(step));
}

document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName?.toLowerCase();
  const isTyping = activeTag === "input" || activeTag === "textarea";
  if (isTyping || storySteps.length === 0 || !isStoryVisible()) return;

  if (event.key === " " || event.key === "ArrowDown" || event.key === "PageDown") {
    event.preventDefault();
    moveStory(1);
  }

  if (event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    moveStory(-1);
  }
});

storySection?.addEventListener("click", (event) => {
  if (!window.matchMedia("(max-width: 900px)").matches) return;
  if (event.target.closest("a, button")) return;
  moveStory(1);
});

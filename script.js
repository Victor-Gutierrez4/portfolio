const storySteps = Array.from(document.querySelectorAll(".story-step"));
const storyTitle = document.querySelector("#story-visual-title");
const storyText = document.querySelector("#story-visual-text");
const storyStage = document.querySelector(".story-stage");

function setActiveStoryStep(step) {
  if (!step) return;

  storySteps.forEach((item) => item.classList.toggle("is-active", item === step));

  if (storyTitle) storyTitle.textContent = step.dataset.title || "";
  if (storyText) storyText.textContent = step.dataset.text || "";
  if (storyStage) storyStage.textContent = step.dataset.stage || "";
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

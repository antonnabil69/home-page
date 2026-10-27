
function setupInfiniteSlider(id) {
  const slider = document.getElementById(id);

  if (!slider || slider.dataset.initialized === "true") {
    return;
  }

  const cards = [...slider.children];

  if (cards.length === 0) return;

  slider.dataset.initialized = "true";

  // Duplicate the cards to create the looping effect
  cards.forEach((card) => {
    const copy = card.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    slider.append(copy);
  });

  let dragging = false;
  let mouseStart = 0;
  let scrollStart = 0;

  // Keep the slider moving in a continuous loop
  slider.addEventListener("scroll", () => {
    const loopPoint = slider.scrollWidth / 2;

    if (slider.scrollLeft >= loopPoint) {
      slider.scrollLeft -= loopPoint;
    } else if (slider.scrollLeft <= 0) {
      slider.scrollLeft += loopPoint;
    }
  });

  // Start dragging with the left mouse button
  slider.addEventListener("mousedown", (event) => {
    if (event.button !== 0 || event.target.closest("button")) {
      return;
    }

    dragging = true;
    mouseStart = event.clientX;
    scrollStart = slider.scrollLeft;

    slider.classList.add("cursor-grabbing");
    event.preventDefault();
  });

  // Move the slider while dragging
  window.addEventListener("mousemove", (event) => {
    if (!dragging) return;

    const distance = event.clientX - mouseStart;
    slider.scrollLeft = scrollStart - distance;
  });

  // Stop dragging when the mouse button is released
  window.addEventListener("mouseup", () => {
    dragging = false;
    slider.classList.remove("cursor-grabbing");
  });
}


// Initialize the page sliders
["Providers", "categorySlider", "servicesSlider"].forEach(setupInfiniteSlider);


// Handle the favorite buttons
document.querySelectorAll(".favorite-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const heart = button.querySelector("svg");

    if (!heart) return;

    const selected = heart.getAttribute("fill") === "currentColor";

    heart.classList.toggle("text-red-500", !selected);
    heart.classList.toggle("text-gray-500", selected);
    heart.setAttribute("fill", selected ? "none" : "currentColor");
  });
});

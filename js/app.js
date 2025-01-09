// colour theme
function updateHue() {
  var timeNow = new Date(),
  seconds = timeNow.getSeconds() * 6;
  document.documentElement.style.setProperty("--hue", seconds);
  console.log(seconds);
  setTimeout(updateHue, 1000);
}
updateHue();

// Add navigation and dots to the slider
document.addEventListener("DOMContentLoaded", () => {
   const sliders = document.querySelectorAll("[data-slider]");

   sliders.forEach((slider) => {
      // Reset to first slide
      slider.scrollLeft = 0;

      // Create desktop navigation
      const nav = document.createElement("nav");
      nav.classList.add("slider_nav");

      const prevButton = document.createElement("button");
      prevButton.title = "Previous slide";
      prevButton.innerHTML = `‹`;
      
      prevButton.addEventListener("click", () => slide("prev", slider));

      const nextButton = document.createElement("button");
      nextButton.title = "Next slide";
      nextButton.innerHTML = `›`;
      nextButton.addEventListener("click", () => slide("next", slider));

      nav.appendChild(prevButton);
      nav.appendChild(nextButton);

      slider.parentElement.insertBefore(nav, slider);

      // Create counter
      const counter = document.createElement("div");
      counter.classList.add("slider_counter");
      counter.textContent = `1/${slider.children.length}`;
      slider.parentElement.insertBefore(counter, slider);

      // Create dots
      const dotsContainer = document.createElement("div");
      dotsContainer.classList.add("slider_dots");

      [...slider.children].forEach(() => {
         const dot = document.createElement("span");
         dot.classList.add("slider_dot");
         dotsContainer.appendChild(dot);
      });

      slider.insertAdjacentElement("afterend", dotsContainer);

      // Highlight current dot
      const totalSlides = slider.children.length;
      const observerOptions = {
         root: slider,
         rootMargin: "0px",
         threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               const visibleIndex = parseInt(entry.target.dataset.slide, 10);

               counter.textContent = `${visibleIndex}/${totalSlides}`;

               const allDots = dotsContainer.querySelectorAll(".slider_dot");
               allDots.forEach((dot) => dot.classList.remove("active"));
               allDots[visibleIndex - 1].classList.add("active");
            }
         });
      }, observerOptions);

      // Tag and observe
      [...slider.children].forEach((child, index) => {
         child.dataset.slide = index + 1;
         observer.observe(child);
      });
   });
});

// Helper for desktop navigation
function slide(direction, slider) {
   const { scrollLeft, clientWidth } = slider;
   const left =
      direction === "prev" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
   slider.scroll({ left, behavior: "smooth" });
}
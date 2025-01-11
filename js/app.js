// Color theme V1
// function updateHue() {
//   var timeNow = new Date(),
//   seconds = timeNow.getSeconds() * 6;
//   document.documentElement.style.setProperty("--hue", seconds);
//   console.log(seconds);
//   setTimeout(updateHue, 1500);
// }
// updateHue();

// Color theme V5
document.addEventListener("DOMContentLoaded", () => {
   let timeNow = new Date();
   let initialHue = (timeNow.getSeconds() * 6) % 360;
   document.documentElement.style.setProperty("--hue", initialHue);

   let hue = initialHue;
   let lastTime = 0;
   let speedUp = false;

   let osDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
   let isDark = osDark;
   document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

   function animateHue(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;

      const threshold = speedUp ? 20 : 100;
      const increment = speedUp ? 5 : 0.5;

      if (delta > threshold) {
         hue = (hue + increment) % 360;
         document.documentElement.style.setProperty("--hue", hue);
         lastTime = timestamp;
      }
      requestAnimationFrame(animateHue);
   }
   requestAnimationFrame(animateHue);

   const blobButtons = document.querySelectorAll(".blob");
   blobButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
         speedUp = true;
         btn.classList.add("spin");
         isDark = !isDark;
         document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
      });

      btn.addEventListener("animationend", (e) => {
         if (e.animationName === "spinOnce") {
            speedUp = false;
            btn.classList.remove("spin");
         }
      });
   });
});

// Add navigation and dots to the slider
document.addEventListener("DOMContentLoaded", () => {
   const sliders = document.querySelectorAll("[data-slider]");

   sliders.forEach((slider) => {
      slider.scrollLeft = 0;
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
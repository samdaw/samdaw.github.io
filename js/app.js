// colour theme
function updateHue() {
  var timeNow = new Date(),
  seconds = timeNow.getSeconds() * 6;
  // ss = timeNow.getMinutes() * 6;
  document.documentElement.style.setProperty("--hue", seconds);
  console.log(seconds);
  setTimeout(updateHue, 1000);
  // setTimeout(updateHue, 10000);
}
updateHue();


const sliders = document.querySelectorAll("[data-slider]");

function slide(direction, slider) {
   let left;
   const { scrollLeft, clientWidth } = slider;

   switch (direction) {
      case "prev":
         left = scrollLeft - clientWidth;
         break;
      case "next":
      default:
         left = scrollLeft + clientWidth;
         break;
   }

   slider.scroll({
      left,
      behavior: "smooth"
   });
}

if (sliders.length) {
   for (let i = 0; i < sliders.length; i++) {

      const nav = document.createElement("nav");
      nav.classList.add("slider_nav");

      const prevButton = document.createElement("button");
      prevButton.title = "Previous slide";
      prevButton.dataset.prev = true;
      prevButton.innerHTML = `<svg viewBox="0 0 45 54" alt="Previous slide"><path d="M28 39.6 14.5 27 28 14.4"/></svg>`;
      prevButton.addEventListener("click", () => slide("prev", sliders[i]));
      nav.appendChild(prevButton);

      const nextButton = document.createElement("button");
      nextButton.title = "Next slide";
      nextButton.dataset.next = true;
      nextButton.innerHTML = `<svg viewBox="0 0 45 54" alt="Next slide"><path d="M17 14.4 30.5 27 17 39.6"/></svg>`;

      nextButton.addEventListener("click", () => slide("next", sliders[i]));
      nav.appendChild(nextButton);

      sliders[i].parentElement.insertBefore(nav, sliders[i]);

      // create and add counter element
      const counter = document.createElement("div");
      counter.classList.add("slider_counter");
      counter.innerHTML = "1/" + sliders[i].children.length;
      sliders[i].parentElement.insertBefore(counter, sliders[i]);

      // update counter on slide
      sliders[i].addEventListener("scroll", () => {
         const currentSlide =
            Math.floor(sliders[i].scrollLeft / sliders[i].clientWidth) + 1;
         counter.innerHTML = currentSlide + "/" + sliders[i].children.length;
      });

      // sliders[i].addEventListener("scroll", () => {
      //    const currentSlide =
      //       Math.floor(sliders[i].scrollLeft / sliders[i].clientWidth) + 1;
      //    counter.innerHTML = currentSlide + "/" + sliders[i].children.length;
      // });

      sliders[i].addEventListener("scroll", () => {
         requestAnimationFrame(() => {
            const currentSlide =
               Math.floor(sliders[i].scrollLeft / sliders[i].clientWidth) + 1;
            counter.innerHTML = currentSlide + "/" + sliders[i].children.length;
         });
      });
   }
}
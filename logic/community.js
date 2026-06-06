const TOTAL_SLIDES = 1; // 🔥 real slides count

const hero = new Swiper(".hero-swiper", {
  loop: true,
  effect: "fade",
  speed: 1000,
  watchOverflow: false,

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".hero-next",
    prevEl: ".hero-prev",
  },

  on: {
    afterInit: function () {
      setupIndicators(this);
      updateAll(this);
    },
    slideChange: function () {
      updateAll(this);
    },
  },
});

// =================
// MAIN UPDATE
// =================
function updateAll(swiper) {
  const index = swiper.realIndex % TOTAL_SLIDES;

  updateIndicators(index);
  updateNumber(index);
  updateImages(index);
}

// =================
// NUMBER
// =================
function updateNumber(index) {
  document.querySelector(".slideNumber").textContent = index + 1;
}

// =================
// INDICATORS
// =================
function setupIndicators(swiper) {
  const container = document.querySelector(".custom-indicators");
  container.innerHTML = "";

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    const span = document.createElement("span");
    span.className = "indicator";

    span.addEventListener("click", () => {
      swiper.slideToLoop(i);
    });

    container.appendChild(span);
  }

  document.querySelector(".totalSlide").textContent = TOTAL_SLIDES;
}

// =================
// UPDATE INDICATORS
// =================
function updateIndicators(index) {
  document.querySelectorAll(".indicator").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

// =================
// IMAGE SYNC
// =================
function updateImages(index) {
  const images = document.querySelectorAll(".overlay-image");

  images.forEach((img, i) => {
    const realIndex = i % TOTAL_SLIDES;
    img.classList.toggle("active", realIndex === index);
  });
}

// =================
// PAUSE / PLAY BUTTON
// =================
const pauseBtn = document.querySelector(".hero-pause");

if (pauseBtn) {
  let isPaused = false;

  pauseBtn.addEventListener("click", () => {
    if (isPaused) {
      hero.autoplay.start();
      pauseBtn.innerText = "Pause"; // change text/icon
    } else {
      hero.autoplay.stop();
      pauseBtn.innerText = "Play";
    }

    isPaused = !isPaused;
  });
}

// =================
// HOVER PAUSE (OPTIONAL UX)
// =================
const heroEl = document.querySelector(".hero-swiper");

if (heroEl) {
  heroEl.addEventListener("mouseenter", () => {
    hero.autoplay.stop();
  });

  heroEl.addEventListener("mouseleave", () => {
    hero.autoplay.start();
  });
}
const toggleBtn = document.getElementById("heroToggle");

if (toggleBtn) {
  let isPaused = false;

  toggleBtn.addEventListener("click", () => {
    if (isPaused) {
      hero.autoplay.start();
      toggleBtn.querySelector(".icon").textContent = "⏸"; // Pause icon
    } else {
      hero.autoplay.stop();
      toggleBtn.querySelector(".icon").textContent = "▶"; // Play icon
    }

    isPaused = !isPaused;
  });
}
// // Testimonaial EMPLOYEE FEEDBACK Slider
// // IMAGE SWIPER
// var imageSwiper = new Swiper(".testimonialImageSwiper", {
//   slidesPerView: 1,
//   loop: true,
//   effect: "fade",
//   allowTouchMove: false,
// });

// // CONTENT SWIPER
// var contentSwiper = new Swiper(".testimonialContentSwiper", {
//   slidesPerView: 1,
//   loop: true,
//   effect: "fade",

//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   on: {
//     slideChange: function () {
//       // Sync image slider
//       imageSwiper.slideToLoop(this.realIndex);

//       // Custom Pagination Active Change
//       document.querySelectorAll(".pagination span").forEach((dot, index) => {
//         dot.classList.remove("active");
//         if (index === this.realIndex) {
//           dot.classList.add("active");
//         }
//       });
//     },
//   },
// });

// document.querySelectorAll(".pagination span").forEach((dot, index) => {
//   dot.addEventListener("click", function () {
//     contentSwiper.slideToLoop(index);
//   });
// });

var imageSwiper = new Swiper(".testimonialImageSwiper", {
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  speed: 700,
  allowTouchMove: false,
  fadeEffect: {
    crossFade: true,
  },
});

var contentSwiper = new Swiper(".testimonialContentSwiper", {
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  speed: 700,
  fadeEffect: {
    crossFade: true,
  },

  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },

  navigation: {
    nextEl: ".testimonial-next",
    prevEl: ".testimonial-prev",
  },

  pagination: {
    el: ".testimonial-pagination",
    clickable: true,
  },

  on: {
    slideChange: function () {
      imageSwiper.slideToLoop(this.realIndex);
    },
  },
});

contentSwiper.on("slideChange", function () {
  imageSwiper.slideToLoop(contentSwiper.realIndex);
});

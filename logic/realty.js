/* =====================================
   MAIN PROPERTY SLIDER
===================================== */

const paradiseMainSwiper = new Swiper(".paradiseMainSwiper", {
  loop: true,
  speed: 1200,
  effect: "fade",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* =====================================
   SMALL IMAGE SLIDER
===================================== */

const smallPropertySwiper = new Swiper(".smallPropertySwiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

/* =========================================
   GSAP REGISTER
========================================= */

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   SECTION PARALLAX
========================================= */

gsap.from(".soho-house-section", {
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

/* =========================================
   HEADING ANIMATION
========================================= */

gsap.from(".soho-heading h2", {
  scrollTrigger: {
    trigger: ".soho-heading",
    start: "top 80%",
  },

  y: 120,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
});

gsap.from(".soho-heading h4", {
  scrollTrigger: {
    trigger: ".soho-heading",
    start: "top 78%",
  },

  y: 80,
  opacity: 0,
  delay: 0.2,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".soho-heading p", {
  scrollTrigger: {
    trigger: ".soho-heading",
    start: "top 75%",
  },

  y: 60,
  opacity: 0,
  delay: 0.4,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".soho-btn-wrap", {
  scrollTrigger: {
    trigger: ".soho-heading",
    start: "top 72%",
  },

  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  ease: "power3.out",
});

/* =========================================
   LEFT COLUMN
========================================= */

gsap.from(".left-column .large-card", {
  scrollTrigger: {
    trigger: ".soho-gallery-wrapper",
    start: "top 75%",
  },

  x: -120,
  opacity: 0,
  rotate: -4,
  duration: 1.3,
  ease: "power4.out",
});

gsap.from(".left-column .small-card", {
  scrollTrigger: {
    trigger: ".soho-gallery-wrapper",
    start: "top 72%",
  },

  y: 80,
  opacity: 0,
  duration: 1.1,
  delay: 0.2,
  ease: "power3.out",
});

/* =========================================
   CENTER IMAGE
========================================= */

gsap.from(".center-card", {
  scrollTrigger: {
    trigger: ".center-card",
    start: "top 78%",
  },

  scale: 0.85,
  opacity: 0,
  duration: 1.5,
  ease: "power4.out",
});

/* =========================================
   RIGHT COLUMN
========================================= */

gsap.from(".right-column .medium-card", {
  scrollTrigger: {
    trigger: ".soho-gallery-wrapper",
    start: "top 75%",
  },

  x: 120,
  opacity: 0,
  rotate: 4,
  duration: 1.3,
  ease: "power4.out",
});

gsap.from(".right-column .small-card", {
  scrollTrigger: {
    trigger: ".soho-gallery-wrapper",
    start: "top 72%",
  },

  y: 100,
  opacity: 0,
  delay: 0.3,
  duration: 1.1,
  ease: "power3.out",
});

/* =========================================
   IMAGE HOVER EFFECT
========================================= */

document.querySelectorAll(".gallery-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card.querySelector("img"), {
      scale: 1.08,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card.querySelector("img"), {
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  });
});

/* =========================================
   PARALLAX EFFECT
========================================= */

gsap.to(".center-card img", {
  yPercent: 12,

  ease: "none",

  scrollTrigger: {
    trigger: ".soho-house-section",
    scrub: true,
  },
});

/* =========================================
   ACCENT BAR ANIMATION
========================================= */

gsap.from(".soho-top-accent", {
  width: 0,
  duration: 1.4,
  ease: "power4.out",
});

gsap.from(".soho-right-accent", {
  height: 0,

  scrollTrigger: {
    trigger: ".soho-house-section",
    start: "top 80%",
  },

  duration: 1.2,
  ease: "power4.out",
});

// Banner Js

const TOTAL_SLIDES = 2; // 🔥 real slides count

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

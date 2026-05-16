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

// Service we Provide
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".servicescardWrapper");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 200);
        }
      });
    },
    {
      threshold: 0.25,
    },
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
});

// Pittie Logistics By Numbers counting js
const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const symbol = counter.getAttribute("data-symbol") || "+";

  let count = 0;

  const speed = target / 100;

  const updateCounter = () => {
    count += speed;

    if (count < target) {
      counter.innerText = Math.ceil(count) + symbol;
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target + symbol;
    }
  };

  updateCounter();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  observer.observe(counter);
});








gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".tech-stack .tech-card");

let currentMode = null;

/* =====================================
   DESKTOP HORIZONTAL SLIDER
===================================== */

function initDesktopStack() {
  currentMode = "desktop";

  ScrollTrigger.getAll().forEach((st) => st.kill());
  gsap.killTweensOf(cards);

  // Initial setup
  cards.forEach((card, i) => {
    gsap.set(card, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      x: i === 0 ? 0 : window.innerWidth,
      zIndex: cards.length - i,
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".tech-stack",
      start: "top-=80px top",
      end: `+=${cards.length * 120}%`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    },
  });

  // Sequential horizontal reveal
  cards.forEach((card, i) => {
    if (i === 0) return;

    tl.to(card, {
      x: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  });
}

/* =====================================
   MOBILE HORIZONTAL SLIDER
===================================== */

function initMobileStack() {
  currentMode = "mobile";

  ScrollTrigger.getAll().forEach((st) => st.kill());
  gsap.killTweensOf(cards);

  cards.forEach((card, i) => {
    gsap.set(card, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      x: i === 0 ? 0 : window.innerWidth,
      zIndex: cards.length - i,
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".tech-stack",
      start: "top top",
      end: `+=${cards.length * 100}%`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    },
  });

  cards.forEach((card, i) => {
    if (i === 0) return;

    tl.to(card, {
      x: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  });
}

/* =====================================
   RESPONSIVE INIT
===================================== */

function initTechStackByScreen() {
  const isMobile = window.innerWidth <= 900;

  if (isMobile && currentMode !== "mobile") {
    initMobileStack();
  }

  if (!isMobile && currentMode !== "desktop") {
    initDesktopStack();
  }
}

// Initial load
initTechStackByScreen();

// Resize
window.addEventListener("resize", () => {
  clearTimeout(window.__stackResize);

  window.__stackResize = setTimeout(() => {
    initTechStackByScreen();
  }, 300);
});
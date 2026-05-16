const TOTAL_SLIDES = 3; // 🔥 real slides count

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

// At A glance counting js
const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  const speed = target / 100;

  const updateCounter = () => {
    count += speed;

    if (count < target) {
      counter.innerText = Math.ceil(count) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target + "+";
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

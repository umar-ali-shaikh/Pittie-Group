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

document.addEventListener("DOMContentLoaded", function () {
  // IMAGE SWIPER
  const careerImageSwiper = new Swiper(".careerImageSwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    effect: "fade",
    allowTouchMove: false,
  });

  // CONTENT SWIPER
  const careerContentSwiper = new Swiper(".careerContentSwiper", {
    slidesPerView: 1,
    spaceBetween: 60,
    loop: false,
    speed: 800,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      slideChange: function () {
        updatePagination(this.realIndex);
      },
    },
  });

  // SYNC BOTH SWIPERS
  careerContentSwiper.controller.control = careerImageSwiper;
  careerImageSwiper.controller.control = careerContentSwiper;

  // CUSTOM PAGINATION
  const paginationDots = document.querySelectorAll(".career-pagination span");

  function updatePagination(index) {
    paginationDots.forEach((dot) => dot.classList.remove("active"));
    if (paginationDots[index]) {
      paginationDots[index].classList.add("active");
    }
  }

  // DOT CLICK FUNCTION
  paginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      careerContentSwiper.slideTo(index);
      updatePagination(index);
    });
  });
});

// Carrer section js

const tabs = document.querySelectorAll(".jobs-tabs button");
const sliders = document.querySelectorAll(".jobs-slider");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    sliders.forEach((slider) => {
      slider.classList.remove("active");
    });

    document.getElementById(target).classList.add("active");
  });
});

document.getElementById("nextJob").addEventListener("click", () => {
  document.querySelector(".jobs-slider.active").scrollLeft += 580;
});

document.getElementById("prevJob").addEventListener("click", () => {
  document.querySelector(".jobs-slider.active").scrollLeft -= 580;
});

// Adress Tabs Css

const addressTabs = document.querySelectorAll(".address-tab-btn");
const addressItems = document.querySelectorAll(".address-item");

function filterAddress(category) {
  addressItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");

    if (itemCategory === category) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

addressTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    const selectedCategory = this.getAttribute("data-filter");

    addressTabs.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    filterAddress(selectedCategory);
  });
});

// Page load par sirf corporate offices show honge
filterAddress("corporate");

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

const jobsData = {
  consumer: [
    {
      title: "Build Brands That Reach Every Home",
      category: "FMCG & Consumer Products",
      image: "assets/contactPage/first-carrer-image-821x514.webp",
    },
    {
      title: "Create Products People Trust",
      category: "Brand Management",
      image: "assets/contactPage/second-carrer-image-821x514-821x514.webp",
    },
    {
      title: "Drive Growth Across Markets",
      category: "Sales & Distribution",
      image: "assets/careers/consumer-3.jpg",
    },
  ],

  logistics: [
    {
      title: "Move Businesses Forward",
      category: "Supply Chain Operations",
      image: "assets/careers/logistics-1.jpg",
    },
    {
      title: "Deliver With Speed & Precision",
      category: "Warehouse Management",
      image: "assets/careers/logistics-2.jpg",
    },
    {
      title: "Optimize Modern Logistics",
      category: "Transport Planning",
      image: "assets/careers/logistics-3.jpg",
    },
  ],

  media: [
    {
      title: "Create Stories That Inspire",
      category: "Media & Entertainment",
      image: "assets/careers/media-1.jpg",
    },
    {
      title: "Shape Digital Experiences",
      category: "Content Production",
      image: "assets/careers/media-2.jpg",
    },
    {
      title: "Build Powerful Campaigns",
      category: "Creative Strategy",
      image: "assets/careers/media-3.jpg",
    },
  ],

  realty: [
    {
      title: "Build Spaces For Tomorrow",
      category: "Real Estate Development",
      image: "assets/careers/realty-1.jpg",
    },
    {
      title: "Design Premium Living Experiences",
      category: "Project Planning",
      image: "assets/careers/realty-2.jpg",
    },
    {
      title: "Create Landmark Projects",
      category: "Sales & Leasing",
      image: "assets/careers/realty-3.jpg",
    },
  ],
};

const tabs = document.querySelectorAll(".jobs-tabs button");
const jobsSlider = document.getElementById("jobsSlider");

function renderJobs(tabName) {
  jobsSlider.innerHTML = "";

  jobsData[tabName].forEach((job, index) => {
    const card = document.createElement("div");
    card.className = index === 0 ? "job-card image-card" : "job-card";

    card.innerHTML = `
      <img src="${job.image}" alt="">
      <div class="job-content">
        <h3>${job.title}</h3>
        <p>${job.category}</p>
        <a href="#">View Openings</a>
      </div>
    `;

    jobsSlider.appendChild(card);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    renderJobs(tab.dataset.tab);
  });
});

document.getElementById("nextJob").addEventListener("click", () => {
  jobsSlider.scrollLeft += 580;
});

document.getElementById("prevJob").addEventListener("click", () => {
  jobsSlider.scrollLeft -= 580;
});

renderJobs("consumer");

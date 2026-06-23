const slide = document.querySelector(".hero-wrapper .swiper-slide");

if (slide) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          slide.classList.add("active");
          observer.unobserve(slide);
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  observer.observe(slide);
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

// Adress Tabs Css
// document.addEventListener("DOMContentLoaded", () => {
//   const tabs = document.querySelectorAll(".address-tab-btn");
//   const items = document.querySelectorAll(".address-item");

//   function filterCategory(category) {
//     items.forEach((item) => {
//       if (item.dataset.category === category) {
//         item.style.display = "block";
//       } else {
//         item.style.display = "none";
//       }
//     });
//   }

//   // Default category
//   filterCategory("corporate");

//   tabs.forEach((tab) => {
//     tab.addEventListener("click", () => {
//       const category = tab.dataset.filter;

//       tabs.forEach((btn) =>
//         btn.classList.remove("active")
//       );

//       tab.classList.add("active");

//       filterCategory(category);
//     });
//   });
// });

const tabButtons = document.querySelectorAll(".address-tab-btn");
const addressItems = document.querySelectorAll(".address-item");
const prevBtn = document.querySelector(".address-prev");
const nextBtn = document.querySelector(".address-next");

let activeFilter = "corporate";
let currentPage = 0;
const warehousePerPage = 6;

function updateAddressList() {
  const matchedItems = Array.from(addressItems).filter(
    (item) => item.dataset.category === activeFilter,
  );

  addressItems.forEach((item) => item.classList.add("hide"));

  if (activeFilter === "warehouse") {
    const start = currentPage * warehousePerPage;
    const end = start + warehousePerPage;

    matchedItems.slice(start, end).forEach((item) => {
      item.classList.remove("hide");
    });

    prevBtn.classList.add("show");
    nextBtn.classList.add("show");

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = end >= matchedItems.length;
  } else {
    matchedItems.forEach((item) => {
      item.classList.remove("hide");
    });

    prevBtn.classList.remove("show");
    nextBtn.classList.remove("show");
  }
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    activeFilter = btn.dataset.filter;
    currentPage = 0;

    updateAddressList();
  });
});

nextBtn.addEventListener("click", () => {
  const warehouseItems = Array.from(addressItems).filter(
    (item) => item.dataset.category === "warehouse",
  );

  const totalPages = Math.ceil(warehouseItems.length / warehousePerPage);

  if (currentPage < totalPages - 1) {
    currentPage++;
    updateAddressList();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    updateAddressList();
  }
});

updateAddressList();

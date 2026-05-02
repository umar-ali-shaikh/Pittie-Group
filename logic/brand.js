
const thumbs = new Swiper(".heroThumbs-swipper", {
  slidesPerView: 6,

  breakpoints: {
    0: { slidesPerView: 2 },
    576: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    992: { slidesPerView: 5 }
  },

  spaceBetween: 20,
  watchSlidesProgress: true,
});

const main = new Swiper(".heroMain", {
  effect: "fade",
  loop: true,

  thumbs: {
    swiper: thumbs,
  },

  navigation: {
    nextEl: ".hero-next",
    prevEl: ".hero-prev",
  },

  autoplay: {
    delay: 3000, // 3 sec
    disableOnInteraction: false,
  },

  breakpoints: {
    768: {
      autoplay: false, // tablet + desktop pe band
    }
  }
});
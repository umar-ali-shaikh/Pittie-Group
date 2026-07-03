const slide = document.querySelector(".swiper-slide");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active"); // optional
      }
    });
  },
  {
    threshold: 0.3,
  },
);

observer.observe(slide);

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

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  allowTouchMove: false,

  on: {
    slideChange: function () {
      imageSwiper.slideToLoop(this.realIndex);
    },
  },
});


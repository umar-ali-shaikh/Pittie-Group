


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
  }
);

observer.observe(slide);


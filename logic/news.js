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

// Another js 

const loadBtn = document.getElementById("loadMoreBtn");
const items = document.querySelectorAll(".news-item");

let visible = 6;

items.forEach((item, index) => {
  if (index >= visible) item.style.display = "none";
});

loadBtn.addEventListener("click", () => {
  visible += 3;
  items.forEach((item, index) => {
    if (index < visible) item.style.display = "block";
  });

  if (visible >= items.length) {
    loadBtn.style.display = "none";
  }
});

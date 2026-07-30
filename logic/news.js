initSwiperSlideObserver();

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

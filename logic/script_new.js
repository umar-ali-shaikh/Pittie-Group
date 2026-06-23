const panels = document.querySelectorAll(".pittie-panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    panels.forEach((p) => p.classList.remove("active"));
    panel.classList.add("active");
  });
});

const TOTAL_SLIDES = 5; // 🔥 real slides count

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

// =================
// HOVER PAUSE (OPTIONAL UX)
// =================
const heroEl = document.querySelector(".hero-swiper");

if (heroEl) {
  heroEl.addEventListener("mouseenter", () => {
    hero.autoplay.stop();
  });

  heroEl.addEventListener("mouseleave", () => {
    hero.autoplay.start();
  });
}
const toggleBtn = document.getElementById("heroToggle");

if (toggleBtn) {
  let isPaused = false;

  toggleBtn.addEventListener("click", () => {
    if (isPaused) {
      hero.autoplay.start();
      toggleBtn.querySelector(".icon").textContent = "⏸"; // Pause icon
    } else {
      hero.autoplay.stop();
      toggleBtn.querySelector(".icon").textContent = "▶"; // Play icon
    }

    isPaused = !isPaused;
  });
}


let mobileIndex = 0;
let mobileInterval;

function updateMobileImages(index) {
  const images = document.querySelectorAll(".overlay-image");

  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function startMobileSlider() {
  if (window.innerWidth > 576) return;

  clearInterval(mobileInterval);

  updateMobileImages(mobileIndex);

  mobileInterval = setInterval(() => {
    mobileIndex = (mobileIndex + 1) % TOTAL_SLIDES;
    updateMobileImages(mobileIndex);
  }, 4000);

  let startX = 0;

  document.querySelector(".overlay-images-wrapper")
    ?.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

  document.querySelector(".overlay-images-wrapper")
    ?.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;

      if (startX - endX > 50) {
        mobileIndex = (mobileIndex + 1) % TOTAL_SLIDES;
      } else if (endX - startX > 50) {
        mobileIndex =
          (mobileIndex - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
      }

      updateMobileImages(mobileIndex);
    });
}

startMobileSlider();

window.addEventListener("resize", startMobileSlider);






// leader section

gsap.registerPlugin(ScrollTrigger);

// Select ALL quote paragraphs properly
document.querySelectorAll(".quote-box p").forEach((p) => {
  const cleanText = p.textContent.replace(/\s+/g, " ").trim();

  // Convert text into character spans
  p.innerHTML = [...cleanText]
    .map((char) => {
      return char === " "
        ? `<span class="space">&nbsp;</span>`
        : `<span class="char">${char}</span>`;
    })
    .join("");
});

/* 🔥 SMOOTH SCROLL ANIMATION */
gsap.fromTo(
  ".quote-box .char",
  {
    color: "#aaa",
    willChange: "color",
  },
  {
    color: "#000",
    stagger: {
      each: 0.04,
      from: "start",
    },
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".quote-box",
      start: "top 85%",
      end: "bottom 45%",
      scrub: 0.8,
      anticipatePin: 1,
    },
  },
);

function openVideo(url) {
  document.getElementById("videoModal").style.display = "flex";
  document.getElementById("videoFrame").src = url;
}

function closeVideo() {
  document.getElementById("videoModal").style.display = "none";
  document.getElementById("videoFrame").src = "";
}

const cards = document.querySelectorAll(".width190");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    // Sabse pehle sab cards se active hatao
    cards.forEach((item) => {
      item.classList.remove("active");
    });

    // Jispe hover ho usko active karo
    card.classList.add("active");
  });
});




// Business verticals section
document.addEventListener("DOMContentLoaded", () => {
  function createSlider(pane) {
    const track = pane.querySelector(".business-slider-track");

    if (!track) return;

    gsap.killTweensOf(track);

    // Clone only once
    if (!track.dataset.cloned) {
      track.innerHTML += track.innerHTML;
      track.dataset.cloned = "true";
    }

    const moveWidth = track.scrollWidth / 2;

    gsap.set(track, { x: 0 });

    gsap.to(track, {
      x: -moveWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % moveWidth}px`,
      },
    });
  }

  // First active tab
  const activePane = document.querySelector(".tab-pane.active.show");

  if (activePane) {
    createSlider(activePane);
  }

  // Tab change
  document
    .querySelectorAll('[data-bs-toggle="pill"], [data-bs-toggle="tab"]')
    .forEach((tab) => {
      tab.addEventListener("shown.bs.tab", (e) => {
        const pane = document.querySelector(
          e.target.getAttribute("data-bs-target")
        );

        if (pane) {
          createSlider(pane);
        }
      });
    });
});


// Journey section

const viewTimelineBtn = document.getElementById("viewTimelineBtn");
const journeySection = document.getElementById("our-journey");

viewTimelineBtn.addEventListener("click", function () {
  const isActive = journeySection.classList.contains("active");

  if (isActive) {
    // Close section
    journeySection.classList.remove("active");
  } else {
    // Open section
    journeySection.classList.add("active");

    journeySection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});


// Mobile version time line js 
// ===============================
// TIMELINE SLIDERS
// ===============================
const timelineContainer = document.querySelector(".timeline-container.timeline-container-mb ");
const timelinePrev = document.getElementById("timelinePrev");
const timelineNext = document.getElementById("timelineNext");

if (timelineContainer && timelinePrev && timelineNext) {

  const getScrollAmount = () => {
    const firstCard = timelineContainer.querySelector(".timeline-box");

    return firstCard
      ? firstCard.offsetWidth + 24
      : timelineContainer.clientWidth;
  };

  timelineNext.addEventListener("click", () => {
    timelineContainer.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });

  timelinePrev.addEventListener("click", () => {
    timelineContainer.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });

}
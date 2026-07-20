"use strict";

/* ============================================================
   HERO SWIPER
   ============================================================ */
const heroSwiperEl = document.querySelector(".hero-swiper");
let hero = null;

if (heroSwiperEl) {
  const TOTAL_SLIDES = heroSwiperEl.querySelectorAll(".swiper-slide").length || 5;

  hero = new Swiper(".hero-swiper", {
    loop: true,
    effect: "fade",

    fadeEffect: {
      crossFade: true,
    },

    speed: 1000,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },

    navigation: {
      nextEl: ".hero-next",
      prevEl: ".hero-prev",
    },

    on: {
      init(swiper) {
        setupIndicators(TOTAL_SLIDES);
        updateSlider(swiper);
      },

      slideChange(swiper) {
        updateSlider(swiper);
      },
    },
  });
}

function updateSlider(swiper) {
  const index = swiper.realIndex;

  // Slide Number
  const slideNumberEl = document.querySelector(".slideNumber");
  if (slideNumberEl) slideNumberEl.textContent = index + 1;

  // Indicators
  document.querySelectorAll(".indicator").forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });

  // Move Overlay Wrapper
  const wrapper = document.querySelector(".overlay-bg-wrapper");
  if (wrapper) {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
  }
}

function setupIndicators(totalSlides) {
  const container = document.querySelector(".custom-indicators");
  if (!container || !hero) return;

  container.innerHTML = "";

  for (let i = 0; i < totalSlides; i++) {
    const span = document.createElement("span");
    span.classList.add("indicator");

    // First indicator active
    if (i === 0) {
      span.classList.add("active");
    }

    span.addEventListener("click", () => {
      hero.slideToLoop(i);
    });

    container.appendChild(span);
  }

  const totalSlideEl = document.querySelector(".totalSlide");
  if (totalSlideEl) totalSlideEl.textContent = totalSlides;
}

// Hero autoplay pause/play toggle
const toggleBtn = document.getElementById("heroToggle");
let paused = false;

if (toggleBtn && hero) {
  toggleBtn.addEventListener("click", () => {
    paused = !paused;
    const icon = toggleBtn.querySelector(".icon");

    if (paused) {
      hero.autoplay.stop();
      if (icon) icon.textContent = "▶";
    } else {
      hero.autoplay.start();
      if (icon) icon.textContent = "⏸";
    }
  });
}

/* ============================================================
   LEADER / QUOTE SECTION — GSAP TEXT REVEAL
   ============================================================ */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const quoteParagraphs = document.querySelectorAll(".quote-box p");

  if (quoteParagraphs.length) {
    quoteParagraphs.forEach((p) => {
      const cleanText = p.textContent.replace(/\s+/g, " ").trim();

      // Convert text into character spans
      p.innerHTML = [...cleanText]
        .map((char) =>
          char === " "
            ? `<span class="space">&nbsp;</span>`
            : `<span class="char">${char}</span>`,
        )
        .join("");
    });

    // Smooth scroll-linked color reveal
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
  }
}

/* ============================================================
   VIDEO MODAL
   ============================================================ */
function openVideo(url) {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  if (modal) modal.style.display = "flex";
  if (frame) frame.src = url;
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  if (modal) modal.style.display = "none";
  if (frame) frame.src = "";
}

// Expose to global scope (called via inline onclick in markup)
window.openVideo = openVideo;
window.closeVideo = closeVideo;

/* ============================================================
   HOVER ACTIVE CARDS (width190)
   ============================================================ */
const cards = document.querySelectorAll(".width190");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    // Remove active from all cards first
    cards.forEach((item) => {
      item.classList.remove("active");
    });

    // Activate the hovered card
    card.classList.add("active");
  });
});

/* ============================================================
   BUSINESS VERTICALS SECTION — INFINITE MARQUEE SLIDER
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  function createSlider(pane) {
    const track = pane.querySelector(".business-slider-track");
    if (!track || !window.gsap) return;

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
        const target = e.target.getAttribute("data-bs-target");
        const pane = target ? document.querySelector(target) : null;

        if (pane) {
          createSlider(pane);
        }
      });
    });
});

/* ============================================================
   JOURNEY SECTION — TIMELINE TOGGLE
   ============================================================ */
const viewTimelineBtn = document.getElementById("viewTimelineBtn");
const journeySection = document.getElementById("our-journey");

if (viewTimelineBtn && journeySection) {
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
}

/* ============================================================
   MOBILE TIMELINE SLIDER (prev/next scroll)
   ============================================================ */
const timelineContainer = document.querySelector(
  ".timeline-container.timeline-container-mb",
);
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

/* ============================================================
   NEWS / MEDIA SLIDER (mobile only)
   ============================================================ */
let mediaSwiper = null;

function initMediaSwiper() {
  const mediaSwiperEl = document.querySelector(".mediahlp-pc");
  if (!mediaSwiperEl) return;

  if (window.innerWidth < 576) {
    if (!mediaSwiper) {
      mediaSwiper = new Swiper(".mediahlp-pc", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 600,

        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  } else {
    if (mediaSwiper) {
      mediaSwiper.destroy(true, true);
      mediaSwiper = null;
    }
  }
}

window.addEventListener("load", initMediaSwiper);
window.addEventListener("resize", initMediaSwiper);

/* ============================================================
   LIFE AT PITTIE — MOBILE PARAGRAPH (kept as-is, originally
   commented out in source; left disabled intentionally)
   ============================================================ */

// const lifeCards = document.querySelectorAll(".width190.result_hover.no");
//
// lifeCards.forEach((card) => {
//   card.addEventListener("click", () => {
//     lifeCards.forEach((item) => item.classList.remove("active"));
//     card.classList.add("active");
//   });
// });
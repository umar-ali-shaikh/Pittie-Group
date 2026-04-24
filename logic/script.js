// ================= HERO SLIDER =================

// function initHeroSlider() {
//     const heroSwiperEl = document.querySelector(".hero-swiper");
//     if (!heroSwiperEl) return;

//     const dots = [...document.querySelectorAll(".hero-wrapper .hero-dots span")];
//     const bgImages = [...document.querySelectorAll(".overlay-bg .overlay-image")];

//     const prevBtn = document.querySelector(".hero-arrow.left");
//     const nextBtn = document.querySelector(".hero-arrow.right");

//     if (!dots.length) return;

//     const heroSwiper = new Swiper(heroSwiperEl, {
//         slidesPerView: 1,
//         loop: true,
//         speed: 700,

//         preloadImages: false,
//         lazy: { loadPrevNext: true },

//         autoplay: {
//             delay: 4000,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//         },

//         observer: true,
//         observeParents: true,

//         on: {
//             init: (swiper) => updateHeroUI(swiper.realIndex),
//             slideChangeTransitionEnd: (swiper) => updateHeroUI(swiper.realIndex),
//         },
//     });

//     function updateHeroUI(realIndex) {
//         const index = realIndex % dots.length;

//         dots.forEach((d) => d.classList.remove("active"));
//         bgImages.forEach((bg) => bg.classList.remove("active"));

//         dots[index]?.classList.add("active");
//         bgImages[index]?.classList.add("active");
//     }

//     dots.forEach((dot, i) => {
//         dot.addEventListener("click", () => heroSwiper.slideToLoop(i));
//     });

//     prevBtn?.addEventListener("click", () => heroSwiper.slidePrev());
//     nextBtn?.addEventListener("click", () => heroSwiper.slideNext());
// }

// initHeroSlider()



// leader section

gsap.registerPlugin(ScrollTrigger);

// Select ALL quote paragraphs properly
document.querySelectorAll(".quote-box p").forEach((p) => {

  const cleanText = p.textContent
    .replace(/\s+/g, " ")
    .trim();

  // Convert text into character spans
  p.innerHTML = [...cleanText].map((char) => {
    return char === " "
      ? `<span class="space">&nbsp;</span>`
      : `<span class="char">${char}</span>`;
  }).join("");

});


/* 🔥 SMOOTH SCROLL ANIMATION */
gsap.fromTo(
  ".quote-box .char",
  {
    color: "#aaa",
    willChange: "color"
  },
  {
    color: "#000",
    stagger: {
      each: 0.04,
      from: "start"
    },
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".quote-box",
      start: "top 85%",
      end: "bottom 45%",
      scrub: 0.8,
      anticipatePin: 1
    }
  }
);

function openVideo(url) {
  document.getElementById("videoModal").style.display = "flex";
  document.getElementById("videoFrame").src = url;
}

function closeVideo() {
  document.getElementById("videoModal").style.display = "none";
  document.getElementById("videoFrame").src = "";
}

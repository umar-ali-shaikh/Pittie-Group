
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



document.addEventListener("DOMContentLoaded", function () {

    const galleries = document.querySelectorAll(".show-more-gallery");

    galleries.forEach(gallery => {

        const cards = gallery.querySelectorAll(".row > .col-md-3");
        const buttonWrapper = gallery.querySelector(".view-more-wrapper");
        const button = gallery.querySelector(".view-more-btn");

        if (cards.length > 12) {

            cards.forEach((card, index) => {
                if (index >= 12) {
                    card.classList.add("hidden-card");
                }
            });

            buttonWrapper.style.display = "block";

            button.addEventListener("click", function () {

                cards.forEach(card => {
                    card.classList.remove("hidden-card");
                });

                buttonWrapper.style.display = "none";
            });
        }
    });
});
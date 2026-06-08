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






// ================= Header =================
function wrap() {
  // ================= Scroll-triggered Animate.css =================
  const animatedElements = document.querySelectorAll(".animate__animated");

  function animateOnScroll() {
    animatedElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("animate__fadeInUp");
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  // ================= Smooth Scroll =================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ================= Hamburger Menu Toggle =================
  function initHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navUl = document.querySelector("#nav ul");
    if (!hamburger || !navUl) return;

    hamburger.addEventListener("click", () => {
      navUl.classList.toggle("active");
    });

    navUl.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navUl.classList.remove("active");
      }
    });
  }
  initHamburgerMenu();

  // ================= Search Placeholder Slider (sab inputs par) =================
  const searchInputs = document.querySelectorAll(".header-search input");

  const placeholders = [
    "Search...",
    "Cleaning essentials...",
    "Home care...",
    "Puja essentials...",
    "Personal care...",
  ];

  searchInputs.forEach((input) => {
    if (input) {
      const wrapper = input.parentElement;
      let placeholderSpan = document.createElement("span");
      placeholderSpan.className = "placeholder-text show";
      wrapper.appendChild(placeholderSpan);

      let i = 0;

      function changePlaceholder() {
        placeholderSpan.classList.remove("show");
        placeholderSpan.classList.add("hide");

        setTimeout(() => {
          placeholderSpan.textContent = placeholders[i];
          placeholderSpan.classList.remove("hide");
          placeholderSpan.classList.add("show");
          i = (i + 1) % placeholders.length;
        }, 600);
      }

      // start with first text
      placeholderSpan.textContent = placeholders[i];
      i++;

      // repeat every 2s
      setInterval(changePlaceholder, 2000);
    }
  });
}
document.addEventListener("DOMContentLoaded", wrap);

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const btn = dropdown.querySelector(".dropdown-btn");

  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent from closing immediately
    dropdown.classList.toggle("open");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".initiative-tabs .tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Page load par first tab ke text/image classes delay ke saath add karo
  tabContents.forEach((content) => {
    const text = content.querySelector(".initiative-text");
    const image = content.querySelector(".initiative-image");

    if (content.classList.contains("active")) {
      setTimeout(() => {
        if (text) text.classList.add("csr-left");
        if (image) image.classList.add("csr-right");
      }, 500); // 0.5 second delay
    }
  });

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-tab");

      // Buttons active toggle
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Remove animation classes from all content
      tabContents.forEach((content) => {
        const text = content.querySelector(".initiative-text");
        const image = content.querySelector(".initiative-image");
        if (text) text.classList.remove("csr-left");
        if (image) image.classList.remove("csr-right");
        content.classList.remove("active");
      });

      // Add active immediately
      const activeContent = document.getElementById(target);
      if (activeContent) {
        activeContent.classList.add("active");

        // Add animation classes after delay
        const text = activeContent.querySelector(".initiative-text");
        const image = activeContent.querySelector(".initiative-image");
        setTimeout(() => {
          if (text) text.classList.add("csr-left");
          if (image) image.classList.add("csr-right");
        }, 500); // 0.5 second delay
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".navigation .nav-item");
  const contents = document.querySelectorAll("._1 > div");

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // remove active class from all
      navItems.forEach((nav) => nav.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      // add active class to clicked nav and corresponding content
      item.classList.add("active");
      contents[index].classList.add("active");
    });
  });
});

// back too top
document.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtns = document.querySelectorAll(".section7-up"); // sabhi select karo

  scrollTopBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // smooth scrolling
      });
    });
  });
});

// yamify toggle
document.addEventListener("DOMContentLoaded", () => {
  const yamifyBtns = document.querySelectorAll(".yamify-btn");
  const yamifyOverlay = document.getElementById("yamify-upcomming");
  const yamifyCancel = document.querySelector(".yamify-cancel");

  // Open overlay on button click
  yamifyBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      yamifyOverlay.classList.add("active");
    });
  });

  // Close overlay when clicking outside the box
  yamifyOverlay.addEventListener("click", (e) => {
    if (e.target === yamifyOverlay) {
      yamifyOverlay.classList.remove("active");
    }
  });

  // Close overlay when clicking on cancel button
  if (yamifyCancel) {
    yamifyCancel.addEventListener("click", () => {
      yamifyOverlay.classList.remove("active");
    });
  }
});

// New sustainability section js
const panels = document.querySelectorAll(".pittie-panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    panels.forEach((p) => p.classList.remove("active"));
    panel.classList.add("active");
  });
});

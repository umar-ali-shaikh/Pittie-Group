// manu shine
const buttons = document.querySelectorAll(".menu-main-container li");

buttons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  });
});

const glowButtons = document.querySelectorAll(".button-colour");

glowButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  });
});

// Counter Js universal
document.addEventListener("DOMContentLoaded", () => {
  // ALL COUNTERS
  const counters = document.querySelectorAll(".count-box h3");

  // OBSERVER
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;

          // ORIGINAL TEXT
          const originalText = counter.innerText.trim();

          // EXTRACT NUMBER
          const targetNumber = parseFloat(originalText.replace(/[^0-9.]/g, ""));

          // EXTRACT SYMBOLS
          const suffix = originalText.replace(/[0-9.]/g, "");

          let current = 0;

          // SPEED
          const increment = targetNumber / 100;

          const updateCounter = () => {
            current += increment;

            if (current < targetNumber) {
              // HANDLE DECIMAL VALUES
              if (originalText.includes(".")) {
                counter.innerText = current.toFixed(1) + suffix;
              } else {
                counter.innerText = Math.floor(current) + suffix;
              }

              requestAnimationFrame(updateCounter);
            } else {
              // FINAL VALUE
              counter.innerText = originalText;
            }
          };

          updateCounter();

          // RUN ONLY ONCE
          observer.unobserve(counter);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  // OBSERVE ALL
  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryMenu = document.querySelector("#primary-menu");

  menuToggle.addEventListener("click", () => {
    primaryMenu.classList.toggle("show");

    const expanded = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", !expanded);
  });
});

/* All section Hover Shine Effect  */
document.querySelectorAll(".mouse-shine").forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();

    element.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);

    element.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  });

  element.addEventListener("mouseleave", () => {
    element.style.setProperty("--mouse-x", "-999px");
    element.style.setProperty("--mouse-y", "-999px");
  });
});

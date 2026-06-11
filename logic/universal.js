// Counter Js universal 
document.addEventListener("DOMContentLoaded", () => {

  // ALL COUNTERS
  const counters = document.querySelectorAll(".count-box h3");

  // OBSERVER
  const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        const counter = entry.target;

        // ORIGINAL TEXT
        const originalText = counter.innerText.trim();

        // EXTRACT NUMBER
        const targetNumber = parseFloat(originalText.replace(/[^0-9.]/g, ''));

        // EXTRACT SYMBOLS
        const suffix = originalText.replace(/[0-9.]/g, '');

        let current = 0;

        // SPEED
        const increment = targetNumber / 100;

        const updateCounter = () => {

          current += increment;

          if(current < targetNumber){

            // HANDLE DECIMAL VALUES
            if(originalText.includes(".")){
              counter.innerText = current.toFixed(1) + suffix;
            }else{
              counter.innerText = Math.floor(current) + suffix;
            }

            requestAnimationFrame(updateCounter);

          }else{

            // FINAL VALUE
            counter.innerText = originalText;
          }
        };

        updateCounter();

        // RUN ONLY ONCE
        observer.unobserve(counter);
      }

    });

  }, {
    threshold:0.5
  });

  // OBSERVE ALL
  counters.forEach(counter => {
    observer.observe(counter);
  });

});
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryMenu = document.querySelector("#primary-menu");

  menuToggle.addEventListener("click", () => {
    primaryMenu.classList.toggle("show");

    const expanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", !expanded);
  });
});



initSwiperSlideObserver();



document.querySelectorAll(".frame-shining").forEach((card) => {
  const glow = card.querySelector(".shine-dot");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  });
});
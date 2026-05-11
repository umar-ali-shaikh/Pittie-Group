const panels = document.querySelectorAll(".pittie-panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    panels.forEach((p) => p.classList.remove("active"));
    panel.classList.add("active");
  });
});


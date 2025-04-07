'use strict'


// Animate game cards with GSAP
gsap.from(".game-card", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

// Toggle search input visibility
document.getElementById("searchToggle").addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  input.classList.toggle("d-none");
  if (!input.classList.contains("d-none")) {
    input.focus();
  }
});

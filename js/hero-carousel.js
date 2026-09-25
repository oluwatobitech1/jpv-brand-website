// ==========================================================
// HERO IMAGE CAROUSEL
// ==========================================================
// Rotates through the hero images (all real photos already used
// elsewhere on the site), updates the caption chip to match, and
// lets the visitor click a dot to jump straight to a slide.

(function () {
  const slides = document.querySelectorAll('.hero-slide-img');
  const dots = document.querySelectorAll('.hero-dot');
  const chipTitle = document.getElementById('heroChipTitle');
  const chipCaption = document.getElementById('heroChipCaption');

  if (!slides.length) return;

  let current = 0;
  let timer = null;
  const INTERVAL = 5000;

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

    const active = slides[index];
    if (chipTitle && active.dataset.title) chipTitle.textContent = active.dataset.title;
    if (chipCaption && active.dataset.caption) chipCaption.innerHTML = active.dataset.caption;

    current = index;
  }

  function next() {
    showSlide((current + 1) % slides.length);
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(idx)) {
        showSlide(idx);
        startTimer();
      }
    });
  });

  // pause while the visitor is looking closely at the panel
  const panel = document.getElementById('heroVisual');
  if (panel) {
    panel.addEventListener('mouseenter', () => clearInterval(timer));
    panel.addEventListener('mouseleave', startTimer);
  }

  showSlide(0);
  startTimer();
})();

// --- GALLERY & SLIDESHOW LOGIC ---
(function() {
  const galleryOverlay = document.getElementById('gallery-overlay');
  const btnGallery = document.querySelector('.btn-gallery');
  const btnClose = document.getElementById('gallery-close');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');

  let slideIndex = 1;

  // Open Gallery
  btnGallery.addEventListener('click', () => {
    galleryOverlay.classList.add('show');
    showSlides(slideIndex);
  });

  // Close Gallery
  btnClose.addEventListener('click', () => {
    galleryOverlay.classList.remove('show');
  });

  // Next/previous controls
  prevBtn.addEventListener('click', () => plusSlides(-1));
  nextBtn.addEventListener('click', () => plusSlides(1));

  window.plusSlides = (n) => {
    showSlides(slideIndex += n);
  };

  window.currentSlide = (n) => {
    showSlides(slideIndex = n);
  };

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    
    if (slides[slideIndex-1]) {
      slides[slideIndex-1].style.display = "block";
    }
    if (dots[slideIndex-1]) {
      dots[slideIndex-1].className += " active";
    }
  }
})();

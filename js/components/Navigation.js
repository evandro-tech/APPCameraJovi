// --- NAVEGAÇÃO / FLIP ---
const btnFlip = document.querySelector('.btn-flip');
btnFlip.addEventListener('click', () => {
  btnFlip.classList.toggle('rotated');
  const viewfinder = document.querySelector('.viewfinder');
  viewfinder.style.transition = 'filter 0.3s';
  viewfinder.style.filter = 'blur(10px)';
  setTimeout(() => {
    viewfinder.style.filter = 'brightness(1)';
  }, 400);
});

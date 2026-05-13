// --- EXPOSIÇÃO (BRIGHTNESS SLIDER) ---
const track = document.getElementById('brightness-track');
const fill = document.getElementById('brightness-fill');
const thumb = document.getElementById('brightness-thumb');
let isDragging = false;

const updateBrightness = (y) => {
  const rect = track.getBoundingClientRect();
  let percent = 1 - (y - rect.top) / rect.height;
  percent = Math.max(0, Math.min(1, percent));

  fill.style.height = `${percent * 100}%`;
  thumb.style.top = `${(1 - percent) * (rect.height - 20)}px`;

  document.querySelector('.viewfinder').style.filter = `brightness(${0.4 + percent * 0.8})`;
  resetHideTimer();
};

thumb.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
window.addEventListener('mouseup', () => { isDragging = false; });
window.addEventListener('mousemove', (e) => { if (isDragging) updateBrightness(e.clientY); });

thumb.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); }, { passive: false });
window.addEventListener('touchend', () => { isDragging = false; });
window.addEventListener('touchmove', (e) => {
  if (isDragging) updateBrightness(e.touches[0].clientY);
}, { passive: false });

// --- FOCO E ZOOM AO CLICAR NA TELA ---
const viewfinder = document.querySelector('.viewfinder');
const focusBox = document.getElementById('focus-box');
const zoomSelector = document.querySelector('.zoom-selector');

viewfinder.addEventListener('click', (e) => {
  const activeModeItem = document.querySelector('.mode-item.active');
  const activeMode = activeModeItem ? activeModeItem.getAttribute('data-mode') : 'Foto';

  if (e.target.classList.contains('zoom-btn')) {
    resetHideTimer();
    return;
  }

  if (activeMode === 'Panorâmica' || activeMode === 'Estudante') return;

  const rect = viewfinder.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Reposiciona e re-anima o focus box
  focusBox.classList.remove('show');
  focusBox.style.left = `${x}px`;
  focusBox.style.top = `${y}px`;

  // Força reflow para re-triggar a animação
  void focusBox.offsetWidth;
  focusBox.classList.add('show');

  zoomSelector.classList.add('show');
  track.classList.add('show');

  resetHideTimer();
});

// Zoom buttons
const zoomBtns = document.querySelectorAll('.zoom-btn');
zoomBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    zoomBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    resetHideTimer();
  });
});

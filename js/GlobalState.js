// Variáveis globais compartilhadas entre componentes
let hideTimeout;

const resetHideTimer = () => {
  const focusBox       = document.getElementById('focus-box');
  const zoomSelector   = document.querySelector('.zoom-selector');
  const brightnessTrack = document.getElementById('brightness-track');

  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    if (focusBox) focusBox.classList.remove('show');
    if (zoomSelector) zoomSelector.classList.remove('show');
    if (brightnessTrack) brightnessTrack.classList.remove('show');
  }, 2000);
};

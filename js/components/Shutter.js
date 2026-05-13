// --- SHUTTER INTERACTION ---
const shutterBtn = document.getElementById('shutter-btn');
const flashOverlay = document.getElementById('flash-overlay');
const recordingIndicator = document.getElementById('recording-indicator');
const recordingTimer = document.getElementById('recording-timer');
const shutterThumbnail = document.getElementById('shutter-thumbnail');
const btnGallery = document.querySelector('.btn-gallery');
const shutterRing = document.querySelector('.shutter-ring');

let isRecording = false;
let recInterval;
let seconds = 0;

shutterBtn.addEventListener('click', () => {
  const activeModeItem = document.querySelector('.mode-item.active');
  const activeMode = activeModeItem ? activeModeItem.getAttribute('data-mode') : 'Foto';

  if (activeMode === 'Vídeo') {
    isRecording = !isRecording;

    if (isRecording) {
      // Shutter vira quadrado vermelho com transição suave
      shutterBtn.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      shutterBtn.style.transform = 'scale(0.72)';
      shutterBtn.style.borderRadius = '14px';
      shutterBtn.style.backgroundColor = '#ff3b30';
      shutterRing.style.borderColor = 'rgba(255,59,48,0.3)';
      recordingIndicator.style.display = 'flex';

      seconds = 0;
      recInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        recordingTimer.innerText = `${mins}:${secs}`;
      }, 1000);
    } else {
      shutterBtn.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      shutterBtn.style.transform = 'scale(1)';
      shutterBtn.style.borderRadius = '50%';
      shutterBtn.style.backgroundColor = '';
      shutterRing.style.borderColor = '';
      recordingIndicator.style.display = 'none';
      clearInterval(recInterval);
      recordingTimer.innerText = '00:00';
    }
  } else {
    const isFlashOff = document.getElementById('btn-flash').classList.contains('is-off');

    if (!isFlashOff) {
      flashOverlay.classList.remove('do-flash');
      void flashOverlay.offsetWidth;
      flashOverlay.classList.add('do-flash');
    }

    // Feedback háptico visual
    shutterBtn.style.transition = 'transform 0.08s ease';
    shutterBtn.style.transform = 'scale(0.88)';
    setTimeout(() => {
      shutterBtn.style.transform = 'scale(1.04)';
      setTimeout(() => { shutterBtn.style.transform = 'scale(1)'; }, 80);
    }, 80);

    // Thumbnail animada indo para galeria
    shutterThumbnail.style.display = 'block';
    shutterThumbnail.style.opacity = '1';
    shutterThumbnail.style.transform = 'translate(-50%, -50%) scale(1)';
    shutterThumbnail.style.transition = 'none';

    setTimeout(() => {
      shutterThumbnail.style.transition = 'all 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
      shutterThumbnail.style.left = '40px';
      shutterThumbnail.style.top = '630px';
      shutterThumbnail.style.transform = 'scale(0.15)';
      shutterThumbnail.style.opacity = '0';
    }, 60);

    setTimeout(() => {
      shutterThumbnail.style.display = 'none';
      shutterThumbnail.style.transition = 'none';
      shutterThumbnail.style.left = '50%';
      shutterThumbnail.style.top = '50%';
      // Flash da galeria
      btnGallery.style.transition = 'all 0.15s ease';
      btnGallery.style.borderColor = 'rgba(158,202,255,0.5)';
      btnGallery.style.boxShadow = '0 0 12px rgba(158,202,255,0.2)';
      setTimeout(() => {
        btnGallery.style.borderColor = '';
        btnGallery.style.boxShadow = '';
      }, 300);
    }, 650);
  }
});

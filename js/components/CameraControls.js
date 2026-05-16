// --- FLASH TOGGLE ---
const btnFlash = document.getElementById('btn-flash');
const flashStrike = document.getElementById('flash-strike');

btnFlash.addEventListener('click', () => {
  btnFlash.classList.toggle('is-off');
  // A risca é controlada pelo CSS agora via .is-off
  if (btnFlash.classList.contains('is-off')) {
    flashStrike.style.display = 'block';
  } else {
    flashStrike.style.display = 'none';
  }
});

// --- TIMER CYCLE ---
const btnTimer = document.getElementById('btn-timer');
const timerStrike = document.getElementById('timer-strike');
const timerLabel = document.getElementById('timer-label');
const timerStates = ['none', '3s', '5s', '10s'];
let currentTimerIdx = 0;

// Estado inicial: sem timer (risca visível)
timerStrike.style.display = 'block';

btnTimer.addEventListener('click', () => {
  currentTimerIdx = (currentTimerIdx + 1) % timerStates.length;
  const state = timerStates[currentTimerIdx];

  if (state === 'none') {
    timerStrike.style.display = 'block';
    timerLabel.innerText = '';
    btnTimer.style.opacity = '1';
  } else {
    timerStrike.style.display = 'none';
    timerLabel.innerText = state;
    btnTimer.style.opacity = '1';
  }

  // Micro feedback visual
  btnTimer.style.transform = 'scale(0.85)';
  setTimeout(() => { btnTimer.style.transform = ''; }, 150);
});

// --- RATIO CYCLE ---
const btnRatio = document.getElementById('btn-ratio');
const viewfinder = document.querySelector('.viewfinder');
const ratioStates = ['3:4', '9:16', '1:1', 'Full'];
let currentRatioIdx = 0;

btnRatio.addEventListener('click', () => {
  currentRatioIdx = (currentRatioIdx + 1) % ratioStates.length;
  const state = ratioStates[currentRatioIdx];
  btnRatio.innerText = state;
  
  const cameraApp = document.getElementById('camera-app');
  
  // Lógica de Escala / Ratio
  switch(state) {
    case '3:4':
      viewfinder.style.height = '520px';
      cameraApp.classList.remove('aspect-full');
      cameraApp.classList.remove('aspect-1-1');
      break;
    case '9:16':
      viewfinder.style.height = '738px'; // Cobre até o fim
      cameraApp.classList.add('aspect-full');
      cameraApp.classList.remove('aspect-1-1');
      break;
    case '1:1':
      viewfinder.style.height = '390px';
      cameraApp.classList.remove('aspect-full');
      cameraApp.classList.add('aspect-1-1');
      break;
    case 'Full':
      viewfinder.style.height = '738px'; 
      cameraApp.classList.add('aspect-full');
      cameraApp.classList.remove('aspect-1-1');
      break;
  }

  // Micro feedback
  btnRatio.style.opacity = '0.5';
  setTimeout(() => { btnRatio.style.opacity = ''; }, 150);
});


// --- SETTINGS / MORE MODES ---
const btnSettings = document.getElementById('btn-settings');
const moreModesOverlay = document.getElementById('more-modes-overlay');

btnSettings.addEventListener('click', () => {
  moreModesOverlay.classList.toggle('show');
  // Rotaciona o ícone de grade quando aberto
  btnSettings.style.transform = moreModesOverlay.classList.contains('show') ? 'rotate(45deg)' : '';
  btnSettings.style.transition = 'transform 0.3s ease';
});

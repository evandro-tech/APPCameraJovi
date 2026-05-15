// =============================================================
//  CAROUSEL INFINITO — Transform-based, loop real
// =============================================================
(function () {

  const container = document.querySelector('.mode-bar-container');
  const bar       = document.getElementById('mode-bar');

  const MODES          = ['Panorâmica','Noite','Documento','Vídeo','Foto','Retrato','Estudante','Pro'];
  const ACTIVE_DEFAULT = 'Foto';
  const COPIES         = 5;
  const N              = MODES.length; // 8

  // ── BUILD DOM ────────────────────────────────────────────
  bar.innerHTML = '';
  for (let c = 0; c < COPIES; c++) {
    MODES.forEach(mode => {
      const el = document.createElement('span');
      el.className = 'mode-item';
      el.setAttribute('data-mode', mode);
      el.textContent = mode;
      bar.appendChild(el);
    });
  }

  // ── STATE ────────────────────────────────────────────────
  let posX       = 0;
  let velX       = 0;
  let activeMode = ACTIVE_DEFAULT;
  let rafId      = null;

  let dragging      = false;
  let dragOriginX   = 0;
  let dragOriginPos = 0;
  let prevClientX   = 0;
  let prevTime      = 0;
  let hasMoved      = false;

  // ── HELPERS ──────────────────────────────────────────────
  const cw      = () => container.offsetWidth;
  const sw      = () => bar.children[N].offsetLeft - bar.children[0].offsetLeft;
  const setX    = (x) => { posX = x; bar.style.transform = `translateX(${x}px)`; };

  // Mantém posX dentro das cópias do meio para nunca ter fim
  const wrap = (x) => {
    const s = sw();
    if (!s) return x;
    // ancora entre cópia 1 e (COPIES-2), ou seja, sempre tem cópias antes e depois
    while (x > -(s * 1))            x -= s;
    while (x < -(s * (COPIES - 2))) x += s;
    return x;
  };

  // Item cujo centro está mais próximo do centro da viewport
  const itemAtCenter = () => {
    const center = cw() / 2 - posX;
    let best = null, bestD = Infinity;
    Array.from(bar.children).forEach(el => {
      const d = Math.abs((el.offsetLeft + el.offsetWidth / 2) - center);
      if (d < bestD) { bestD = d; best = el; }
    });
    return best;
  };

  // translateX necessário para centralizar um elemento
  const xForEl = (el) => cw() / 2 - el.offsetLeft - el.offsetWidth / 2;

  // Item mais próximo do centro para o modo pedido
  const closestElForMode = (mode) => {
    const center = cw() / 2 - posX;
    let best = null, bestD = Infinity;
    bar.querySelectorAll(`[data-mode="${mode}"]`).forEach(el => {
      const d = Math.abs((el.offsetLeft + el.offsetWidth / 2) - center);
      if (d < bestD) { bestD = d; best = el; }
    });
    return best;
  };

  // ── ANIMATION ────────────────────────────────────────────
  // Parâmetros recalibrados para sensação de "iOS"
  const SNAP_LERP = 0.15;  // Velocidade do encaixe (0.15 é firme, não fica sambando)
  const FRICTION  = 0.90;  // Amortecimento inércia
  const VEL_SCALE = 2;     // REDUZIDO DE 10 PARA 2 (Fim da super sensibilidade)
  const MAX_VEL   = 25;    // Limite de velocidade (Impede o bug de voar longe)

  let snapping    = false;
  let snapGoal    = 0;

  const tick = () => {
    if (dragging) { rafId = requestAnimationFrame(tick); return; }

    if (snapping) {
      const diff = snapGoal - posX;
      if (Math.abs(diff) < 0.5) {
        // Chegou
        setX(snapGoal);
        const wrapped = wrap(posX);
        if (wrapped !== posX) { setX(wrapped); snapGoal = wrapped; }
        snapping = false;
        rafId = null;
        return;
      }
      setX(posX + diff * SNAP_LERP);
      rafId = requestAnimationFrame(tick);
      return;
    }

    // Inércia livre
    velX *= FRICTION;
    if (Math.abs(velX) < 0.5) {
      velX = 0;
      // Inicia snap para o item mais próximo
      const el = itemAtCenter();
      if (el) {
        snapping = true;
        snapGoal = xForEl(el);
        const m = el.getAttribute('data-mode');
        if (m !== activeMode) updateModeSelection(m);
      }
      rafId = requestAnimationFrame(tick);
      return;
    }

    setX(wrap(posX + velX));

    // Atualiza o CSS da bolinha e texto do modo enquanto desliza
    const el = itemAtCenter();
    if (el) {
      const m = el.getAttribute('data-mode');
      if (m !== activeMode) updateModeSelection(m);
    }

    rafId = requestAnimationFrame(tick);
  };

  const startTick = () => { if (!rafId) rafId = requestAnimationFrame(tick); };

  // ── DRAG ─────────────────────────────────────────────────
  const MIN_DRAG_PX = 3; 

  const onStart = (clientX) => {
    dragging      = true;
    hasMoved      = false;
    dragOriginX   = clientX;
    dragOriginPos = posX;
    prevClientX   = clientX;
    prevTime      = performance.now();
    velX          = 0;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  };

  const onMove = (clientX) => {
    if (!dragging) return;
    const dx = clientX - dragOriginX;
    if (!hasMoved && Math.abs(dx) < MIN_DRAG_PX) return; 
    hasMoved = true;

    const now = performance.now();
    const dt  = now - prevTime || 16;
    
    // Calcula a velocidade do frame atual
    let currentVel = ((clientX - prevClientX) / dt) * 16; 
    
    // SUAVIZADOR (Média móvel): Mistura a velocidade antiga com a nova para evitar picos do touch
    velX = (velX * 0.2) + (currentVel * 0.6);

    // Trava de segurança para impedir pulos gigantescos
    if (velX > MAX_VEL) velX = MAX_VEL;
    if (velX < -MAX_VEL) velX = -MAX_VEL;

    prevClientX = clientX;
    prevTime    = now;

    setX(wrap(dragOriginPos + dx));

    const el = itemAtCenter();
    if (el) {
      const m = el.getAttribute('data-mode');
      if (m !== activeMode) updateModeSelection(m);
    }
  };

  const onEnd = (clientX) => {
    if (!dragging) return;
    dragging = false;

    if (!hasMoved) return; 

    // Aplica o multiplicador (agora corrigido para 2)
    velX *= VEL_SCALE;
    
    // Garante que o solavanco final não ultrapasse o limite
    if (velX > MAX_VEL) velX = MAX_VEL;
    if (velX < -MAX_VEL) velX = -MAX_VEL;

    snapping = false;
    startTick();
  };

  // Mouse
  container.addEventListener('mousedown',  (e) => { e.preventDefault(); onStart(e.clientX); });
  window   .addEventListener('mousemove',  (e) => onMove(e.clientX));
  window   .addEventListener('mouseup',    (e) => onEnd(e.clientX));

  // Touch
  container.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
  container.addEventListener('touchmove',  (e) => onMove(e.touches[0].clientX),  { passive: true });
  container.addEventListener('touchend',   (e) => onEnd(e.changedTouches[0].clientX));

  // ── CLICK ────────────────────────────────────────────────
  container.addEventListener('click', (e) => {
    if (hasMoved) return; // ignora se foi drag
    const el = e.target.closest('.mode-item');
    if (!el) return;
    const mode = el.getAttribute('data-mode');
    updateModeSelection(mode);
    snapping = true;
    snapGoal = xForEl(el); 
    
    startTick();
  });

  // ── UPDATE MODE ──────────────────────────────────────────
  window.updateModeSelection = (selectedMode) => {
    activeMode = selectedMode;

    bar.querySelectorAll('.mode-item').forEach(i =>
      i.classList.toggle('active', i.getAttribute('data-mode') === selectedMode)
    );

    const pill            = document.getElementById('top-mode-pill');
    const moreModesOverlay = document.getElementById('more-modes-overlay');
    const shutterBtn      = document.getElementById('shutter-btn');
    const focusBox        = document.getElementById('focus-box');
    const zoomSelector    = document.querySelector('.zoom-selector');
    const focusBoxStudent = document.getElementById('focus-box-student');
    const panoGuide       = document.getElementById('pano-guide');
    const studentActions  = document.getElementById('student-actions');

    if (pill)            pill.innerText = selectedMode;
    if (moreModesOverlay) moreModesOverlay.classList.remove('show');
    if (shutterBtn)      shutterBtn.style.backgroundColor = selectedMode === 'Vídeo' ? '#ff3b30' : '';
    if (focusBox)        focusBox.classList.remove('show');
    if (zoomSelector)    zoomSelector.classList.remove('show');
    if (focusBoxStudent) focusBoxStudent.style.display = selectedMode === 'Estudante' ? 'block' : 'none';
    if (panoGuide)       panoGuide.style.display       = selectedMode === 'Panorâmica' ? 'flex' : 'none';
    if (studentActions)  studentActions.style.display  = selectedMode === 'Estudante' ? 'flex' : 'none';

    // Chama a função externa para lidar com lógica específica de cada modo
    if (window.handleModeChange) {
      window.handleModeChange(selectedMode);
    }
  };

  window.scrollToMode = (mode, smooth = true) => {
    updateModeSelection(mode);
    const el = closestElForMode(mode);
    if (!el) return;
    if (smooth) {
      snapping = true;
      snapGoal = xForEl(el);
      startTick();
    } else {
      setX(wrap(xForEl(el))); 
    }
  };

  // Mode chips do overlay
  document.querySelectorAll('.mode-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      window.scrollToMode(chip.innerText.trim(), true);
    });
  });

  // ── INIT ─────────────────────────────────────────────────
  const init = () => {
    // 1. Primeiro definimos qual modo está ativo para ele ganhar o estilo (dot, flex, etc.)
    // Isso garante que offsetWidth/offsetLeft já considerem o estado "ativo".
    updateModeSelection(ACTIVE_DEFAULT);

    // 2. Cópia do meio = índice 2 (0-based), de 5 cópias
    const MIDDLE_COPY  = 2;
    const defaultIdx   = MODES.indexOf(ACTIVE_DEFAULT);
    const targetEl     = bar.children[MIDDLE_COPY * N + defaultIdx];

    if (targetEl) {
      // 3. Medimos e centralizamos
      setX(wrap(xForEl(targetEl)));
    }
  };

  // Garante layout pronto e fontes carregadas antes de medir
  const startInit = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(init);
    });
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(startInit);
  } else {
    startInit();
  }

})();
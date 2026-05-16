// --- EXPOSIÇÃO (BRIGHTNESS SLIDER) ---
(function() {
    const track = document.getElementById('brightness-track');
    const fill = document.getElementById('brightness-fill');
    const thumb = document.getElementById('brightness-thumb');
    const viewfinder = document.querySelector('.viewfinder');
    const focusBox = document.getElementById('focus-box');
    const zoomSelector = document.querySelector('.zoom-selector');
    
    let isDragging = false;

    const updateBrightness = (y) => {
        if (!track || !fill || !thumb || !viewfinder) return;
        const rect = track.getBoundingClientRect();
        let percent = 1 - (y - rect.top) / rect.height;
        percent = Math.max(0, Math.min(1, percent));

        fill.style.height = `${percent * 100}%`;
        thumb.style.top = `${(1 - percent) * (rect.height - 20)}px`;

        viewfinder.style.filter = `brightness(${0.4 + percent * 0.8})`;
        if (window.resetHideTimer) window.resetHideTimer();
    };

    if (thumb) {
        thumb.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
        window.addEventListener('mouseup', () => { isDragging = false; });
        window.addEventListener('mousemove', (e) => { if (isDragging) updateBrightness(e.clientY); });

        thumb.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); }, { passive: false });
        window.addEventListener('touchend', () => { isDragging = false; });
        window.addEventListener('touchmove', (e) => {
            if (isDragging) updateBrightness(e.touches[0].clientY);
        }, { passive: false });
    }

    // --- FOCO E ZOOM AO CLICAR NA TELA ---
    if (viewfinder) {
        viewfinder.addEventListener('click', (e) => {
            const activeModeItem = document.querySelector('.mode-item.active');
            const activeMode = activeModeItem ? activeModeItem.getAttribute('data-mode') : 'Foto';

            // Evita foco em modos específicos
            if (activeMode === 'Panorâmica' || activeMode === 'Estudante') return;

            const rect = viewfinder.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Reposiciona e re-anima o focus box
            if (focusBox) {
                focusBox.classList.remove('show');
                focusBox.style.left = `${x}px`;
                focusBox.style.top = `${y}px`;
                void focusBox.offsetWidth;
                focusBox.classList.add('show');
            }

            if (zoomSelector) zoomSelector.classList.add('show');
            if (track) track.classList.add('show');

            if (window.resetHideTimer) window.resetHideTimer();
        });
    }

    // --- ZOOM BUTTONS ---
    const zoomBtns = document.querySelectorAll('.zoom-btn');
    const zoomLevels = {
        '.5': 'scale(0.85)',
        '1':  'scale(1)',
        '2':  'scale(1.5)',
        '3':  'scale(2.2)'
    };

    zoomBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Atualiza UI dos botões
            zoomBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Aplica o Zoom no Viewfinder
            const level = btn.textContent.trim();
            if (zoomLevels[level] && viewfinder) {
                // Aplicamos o zoom apenas ao viewfinder
                viewfinder.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                viewfinder.style.transform = zoomLevels[level];
                
                // Feedback visual no botão
                btn.style.transform = 'scale(0.9)';
                setTimeout(() => btn.style.transform = '', 150);
            }

            if (window.resetHideTimer) window.resetHideTimer();
        });
    });

})();

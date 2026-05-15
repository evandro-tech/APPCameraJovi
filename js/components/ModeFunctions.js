// --- MODE SPECIFIC FUNCTIONS ---
(function() {
  const proControls = document.getElementById('pro-controls');
  const viewfinder = document.querySelector('.viewfinder');
  const notification = document.getElementById('camera-notification');
  
  let notificationTimeout = null;

  // Custom notification system (replaces native alert)
  window.showNotification = (message) => {
    if (!notification) return;
    
    // Reset timeout if already showing
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    notification.innerText = message;
    notification.classList.add('show');

    notificationTimeout = setTimeout(() => {
      notification.classList.remove('show');
      notificationTimeout = null;
    }, 2000);
  };

  // Storage for visited modes to show alerts only once
  const visitedModes = new Set();

  window.handleModeChange = (mode) => {
    // 1. Pro Mode Logic - No more confirm()
    if (mode === 'Pro') {
      proControls.classList.add('show');
      showNotification("Modo Profissional ativado");
    } else {
      proControls.classList.remove('show');
    }

    // 2. Video Mode Logic
    if (mode === 'Vídeo') {
      showNotification("Pronto para gravar");
    }

    // 3. Document Mode Logic
    const docActions = document.getElementById('doc-actions');
    const docFrame = document.getElementById('doc-scanner-frame');
    if (mode === 'Documento') {
      showNotification("Enquadre o documento no centro");
      if (docActions) docActions.style.display = 'flex';
      if (docFrame) docFrame.style.display = 'block';
    } else {
      if (docActions) docActions.style.display = 'none';
      if (docFrame) docFrame.style.display = 'none';
    }

    // 4. Night Mode Logic (Noite) - No more prompt()
    if (mode === 'Noite') {
      showNotification("Longa exposição: mantenha parado");
    }

    // 5. Retrato Mode Logic
    if (mode === 'Retrato') {
      if (!visitedModes.has('Retrato')) {
        showNotification("Posicione o assunto a 1.5m");
        visitedModes.add('Retrato');
      }
    }
    
    // Dynamic background effect based on mode
    if (mode === 'Panorâmica') {
      viewfinder.style.background = "linear-gradient(rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.2))";
      showNotification("Deslize lentamente para o lado");
    } else if (mode === 'Foto') {
      viewfinder.style.background = "none";
    }
  };
})();

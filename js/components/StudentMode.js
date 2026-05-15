// --- MODO ESTUDANTE ---

const openOverlay = (id) => {
    document.getElementById(id).classList.add('show');
};

const closeOverlay = (id) => {
    document.getElementById(id).classList.remove('show');
};

// Helper to handle action button clicks
const handleActionClick = (containerId, mapping) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.student-btn');
        if (!btn) return;

        btn.style.background = 'rgba(92, 157, 245, 0.35)';
        btn.style.borderColor = 'rgba(92, 157, 245, 1)';
        setTimeout(() => {
            btn.style.background = '';
            btn.style.borderColor = '';
        }, 250);

        const action = btn.textContent.trim();
        if (mapping[action]) openOverlay(mapping[action]);
    });
};

handleActionClick('student-actions', {
    'Resumir': 'overlay-resumir',
    'Anotar': 'overlay-anotar',
    'Exportar': 'overlay-exportar'
});

handleActionClick('doc-actions', {
    'Exportar': 'overlay-doc-exportar'
});

// Fecha ao clicar no botão voltar
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.student-back-btn');
    if (!btn) return;
    closeOverlay(btn.getAttribute('data-close'));
});
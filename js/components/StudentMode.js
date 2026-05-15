// --- MODO ESTUDANTE ---

const openOverlay = (id) => {
    document.getElementById(id).classList.add('show');
};

const closeOverlay = (id) => {
    document.getElementById(id).classList.remove('show');
};

// Abre o overlay correspondente ao botão clicado
document.getElementById('student-actions').addEventListener('click', (e) => {
    const btn = e.target.closest('.student-btn');
    if (!btn) return;

    btn.style.background = 'rgba(92, 157, 245, 0.35)';
    btn.style.borderColor = 'rgba(92, 157, 245, 1)';
    setTimeout(() => {
    btn.style.background = '';
    btn.style.borderColor = '';
    }, 250);

    const action = btn.textContent.trim();
    if (action === 'Resumir')  openOverlay('overlay-resumir');
    if (action === 'Anotar')   openOverlay('overlay-anotar');
    if (action === 'Exportar') openOverlay('overlay-exportar');
});

// Fecha ao clicar no botão voltar
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.student-back-btn');
    if (!btn) return;
    closeOverlay(btn.getAttribute('data-close'));
});
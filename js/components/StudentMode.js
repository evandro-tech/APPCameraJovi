// --- MODO ESTUDANTE ---

const openOverlay = (id) => {
    const el = document.getElementById(id);
    el.classList.add('show');
    
    // Simulação de carregamento de conteúdo IA
    if (id === 'overlay-resumir') {
        const skeleton = el.querySelector('.student-skeleton-lines');
        if (skeleton && !el.dataset.loaded) {
            setTimeout(() => {
                skeleton.style.opacity = '0';
                setTimeout(() => {
                    skeleton.innerHTML = `
                        <p style="color:rgba(255,255,255,0.75); font-size:12.5px; line-height:1.6; margin:0;">
                            O conteúdo analisado aborda os princípios da <b>Termodinâmica</b>, com foco na Primeira Lei e na conservação de energia em sistemas fechados. Foram identificados exemplos práticos envolvendo máquinas térmicas e ciclos de compressão.
                        </p>
                    `;
                    skeleton.style.opacity = '1';
                    el.dataset.loaded = "true";
                }, 300);
            }, 1500);
        }
    }
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
    'Digitalizar': 'overlay-resumir',
    'Exportar': 'overlay-doc-exportar'
});

// Fecha ao clicar no botão voltar
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.student-back-btn');
    if (!btn) return;
    closeOverlay(btn.getAttribute('data-close'));
});

// --- INTERAÇÕES INTERNAS DOS MENUS ---

// 1. Alternar Tags (Matérias, Formatos, etc.)
document.addEventListener('click', (e) => {
    const tag = e.target.closest('.student-tag');
    if (!tag || tag.textContent.includes('+ Novo')) return;

    // Se estiver em um grupo de escolha única (como Formato ou Qualidade)
    const parentCard = tag.closest('.student-card');
    const labelEl = parentCard ? parentCard.querySelector('.student-card-label') : null;
    const labelText = labelEl ? labelEl.textContent.toUpperCase() : '';
    
    const isSingleChoice = labelText.includes('FORMATO') || 
                          labelText.includes('QUALIDADE') || 
                          labelText.includes('DESTINO');

    if (isSingleChoice) {
        tag.closest('.student-tags').querySelectorAll('.student-tag').forEach(t => t.classList.remove('active-tag'));
        tag.classList.add('active-tag');
    } else {
        // Seleção múltipla para matérias
        tag.classList.toggle('active-tag');
    }
});

// 2. Botões de Ação no Rodapé (Salvar, Exportar, etc.)
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.student-action-btn');
    if (!btn) return;

    const overlay = btn.closest('.student-overlay');
    const actionText = btn.textContent.trim();

    // Feedback visual de clique
    btn.style.opacity = '0.7';
    setTimeout(() => btn.style.opacity = '1', 150);

    if (actionText === 'Descartar' || actionText === 'Cancelar') {
        if (overlay) closeOverlay(overlay.id);
        return;
    }

    // Simulação de ação concluída
    if (window.showNotification) {
        let message = 'Ação realizada!';
        if (actionText === 'Salvar PDF') message = 'Salvo com sucesso!';
        else if (actionText === 'Compartilhar') message = 'Compartilhado com sucesso!';
        else if (actionText.includes('Salvar')) message = 'Salvo com sucesso!';
        else if (actionText.includes('Exportar')) message = 'Exportação iniciada...';
        
        window.showNotification(message);
    }

    // Fecha o menu após a "conclusão"
    setTimeout(() => {
        if (overlay) closeOverlay(overlay.id);
    }, 1000);
});

// 3. Fechar ao clicar no fundo (fora do painel)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('student-overlay')) {
        closeOverlay(e.target.id);
    }
});
// --- SETTINGS & LOGIN VALIDATION ---
(function() {
    const btnOpenLogin = document.getElementById('btn-open-login');
    const loginOverlay = document.getElementById('overlay-login');
    const loginForm = document.getElementById('login-form');
    const forgotPassword = document.getElementById('forgot-password');

    // Abrir o overlay (escondido dentro do menu de modos)
    if (btnOpenLogin) {
        btnOpenLogin.addEventListener('click', () => {
            loginOverlay.classList.add('show');
        });
    }

    // Validação de Formulário
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();
            
            // Simulação de validação
            if (!email || !password) {
                // Requisito: Alerta nativo
                alert("Por favor, preencha todos os campos do formulário.");
                return;
            }

            if (!email.includes('@')) {
                alert("Por favor, insira um e-mail válido.");
                return;
            }

            if (password.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres.");
                return;
            }

            // Sucesso
            alert("Login realizado com sucesso! (Simulação)");
            loginOverlay.classList.remove('show');
            
            // Feedback visual na interface principal
            if (window.showNotification) {
                window.showNotification("Usuário autenticado");
            }
        });
    }

    // Requisito: Prompt nativo
    if (forgotPassword) {
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            const userEmail = prompt("Para recuperar sua senha, digite seu e-mail cadastrado:");
            
            if (userEmail) {
                if (userEmail.includes('@')) {
                    alert("Um link de recuperação foi enviado para: " + userEmail);
                } else {
                    alert("E-mail inválido.");
                }
            }
        });
    }
})();

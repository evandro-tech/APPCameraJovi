# Projeto CelularJOVI - Protótipo de Câmera

Este projeto é um protótipo interativo de uma interface de câmera de smartphone, desenvolvido inteiramente em **JavaScript Vanila**, CSS e HTML, sem o uso de frameworks externos.

## Autores
- **Nome:** [Seu Nome Completo Aqui]
- **RM:** [Seu RM Aqui]

## Funcionalidades Implementadas

1.  **Manipulação Dinâmica de Elementos e Eventos**:
    - Transição entre modos de câmera com feedback visual em tempo real.
    - Controles de zoom, foco e exposição interativos.
    - Interface adaptativa para modos específicos (Pro, Vídeo, Estudante).

2.  **Notificações Customizadas**:
    - Substituição de `alert()`, `confirm()` e `prompt()` por um sistema de notificações interno.
    - As notificações aparecem no topo do viewfinder e desaparecem automaticamente após 2 segundos, sem interromper o fluxo do usuário.
    - Ativação direta dos modos Pro e Noite sem janelas de diálogo.

3.  **Manipulação de Imagens (Slideshow)**:
    - Galeria interativa integrada com sistema de slideshow.
    - Navegação entre fotos capturadas usando controles de "anterior" e "próximo".
    - Indicadores visuais (dots) para a posição atual no slideshow.

4.  **Gerenciamento de Eventos com o DOM**:
    - Captura de cliques, toques e arrastes para o carrossel infinito.
    - Botão de obturador (Shutter) com animações de feedback.
    - Toggles para Flash, Timer e Proporção (Ratio).

5.  **Tecnologias**:
    - HTML5 Semântico.
    - CSS3 (Flexbox, Grid, Animações, Backdrop-filter).
    - JavaScript ES6+ (Manipulação de DOM, Event Listeners, Sets, IIFEs).

## Como Executar
Basta abrir o arquivo `index.html` em qualquer navegador moderno.

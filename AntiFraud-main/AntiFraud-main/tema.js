/**
 * Gerenciador de Tema (Modo Claro / Modo Escuro)
 */

export function inicializarTema() {
    // Recupera a preferência salva ou usa escuro como padrão
    const temaSalvo = localStorage.getItem('antifraud-tema') || 'dark';
    aplicarTema(temaSalvo);

    // Event listener usando delegação para garantir que funciona mesmo se o botão for carregado depois
    document.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'btn-tema') {
            const temaAtual = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            aplicarTema(temaAtual);
        }
    });
}

function aplicarTema(tema) {
    // Aplica o atributo data-theme tanto na tag <html> quanto na tag <body>
    document.documentElement.setAttribute('data-theme', tema);
    if (document.body) {
        document.body.setAttribute('data-theme', tema);
    }
    
    // Salva a preferência
    localStorage.setItem('antifraud-tema', tema);
    
    // Atualiza o texto de todos os botões de tema presentes na página
    const botoesTema = document.querySelectorAll('#btn-tema');
    botoesTema.forEach(btn => {
        btn.textContent = tema === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro';
    });
}
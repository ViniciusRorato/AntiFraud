/**
 * Controlador do Jogo Educativo de Imunidade Digital (com salvamento de estado)
 */

import { inicializarTema } from './tema.js';

export const casos = [
  {
    remetente: "contato@segur.bank-seguro.com",
    assunto: "ALERTA DE SEGURANÇA - ACESSO BLOQUEADO!",
    mensagem: "Detectamos um acesso não autorizado à sua conta. Confirme seus dados em: secure.segur-bank-reativar.com/validar (link expira em 30 minutos).",
    golpe: true,
    explicacao: [
      "Domínio falso: o banco oficial não usa esse endereço.",
      "Urgência: prazo curto para você não pensar direito.",
      "Bancos reais não pedem confirmação de dados por link em e-mail."
    ]
  },
  {
    remetente: "+55 11 9****-1234 (número desconhecido)",
    assunto: "Mensagem de possível familiar",
    mensagem: "Oi mãe, troquei de número. Perdi meu cartão e preciso pagar uma coisa urgente. Consegue fazer um Pix de R$ 350 agora?",
    golpe: true,
    explicacao: [
      "Clássico golpe do falso parente com número novo.",
      "Pede dinheiro com urgência, sem confirmar por ligação.",
      "Usa o vínculo familiar para reduzir a desconfiança."
    ]
  },
  {
    remetente: "naoresponda@nubank.com.br",
    assunto: "Sua fatura de setembro já está disponível",
    mensagem: "Sua fatura fechou em R$ 428,17. Consulte e pague direto pelo aplicativo Nubank.",
    golpe: false,
    explicacao: [
      "Não pede senha, CPF ou número de cartão.",
      "Direciona para o aplicativo oficial, não para um link externo.",
      "Tom informativo, sem ameaça de bloqueio."
    ]
  },
  {
    remetente: "CORREIOS",
    assunto: "Encomenda com pendência",
    mensagem: "Sua encomenda está retida. Pague a taxa em até 24h em: correios-rastreio-br.info/pagar, ou o pacote será devolvido.",
    golpe: true,
    explicacao: [
      "Domínio fora do padrão oficial (correios.com.br).",
      "Taxa de liberação por link não é uma prática dos Correios.",
      "Usa prazo curto e ameaça de devolução para pressionar."
    ]
  },
  {
    remetente: "Financeiro - Condomínio Edifício Ipê",
    assunto: "Boleto de condomínio - 09/2026",
    mensagem: "Vencimento: 10/10/2026 | Valor: R$ 650,00. Confira o código de barras no app do banco antes de pagar.",
    golpe: false,
    explicacao: [
      "Beneficiário reconhecível e valor dentro do padrão mensal.",
      "Orienta conferir o código de barras antes do pagamento.",
      "Não usa urgência nem pede dados sensíveis."
    ]
  },
  {
    remetente: "@promocoes.oficial_2026",
    assunto: "Você foi sorteado(a)!",
    mensagem: "Seu perfil ganhou um iPhone 17 grátis! Clique no link do stories e preencha seus dados em até 2 horas. Compartilhe com 5 amigos para confirmar.",
    golpe: true,
    explicacao: [
      "Prêmio que você não pediu para participar de sorteio nenhum.",
      "Prazo de 2 horas força uma decisão sem checagem.",
      "Pedir compartilhamento em massa é típico de golpe em cadeia."
    ]
  },
  {
    remetente: 'Loja Online "MegaOfertas Brasil"',
    assunto: "Pagamento antecipado via Pix",
    mensagem: "Garanta 70% de desconto pagando via Pix para o CPF 000.111.222-33. Envie o comprovante para liberar o rastreio.",
    golpe: true,
    explicacao: [
      "Desconto exagerado para criar senso de oportunidade única.",
      "Pix para CPF de pessoa física, sem nota fiscal ou CNPJ.",
      "Nenhuma garantia de entrega ou proteção ao consumidor."
    ]
  },
  {
    remetente: "no-reply@accounts.google.com",
    assunto: "Novo login detectado em seu dispositivo",
    mensagem: "Detectamos um novo login em um Windows em São Paulo. Se não foi você, acesse myaccount.google.com pelo navegador para revisar.",
    golpe: false,
    explicacao: [
      "Remetente é o domínio oficial do Google.",
      "Pede para digitar o endereço manualmente, sem link direto.",
      "Informa o evento sem ameaçar bloqueio imediato."
    ]
  }
];

// VARIÁVEIS DE ESTADO
let casoAtual = 0;
let pontuacao = 0;
let acertos = 0;
const pontosPorAcerto = 100;
const pontuacaoMaxima = casos.length * pontosPorAcerto;
const STORAGE_KEY = 'antifraud_jogo_estado';

document.addEventListener('DOMContentLoaded', () => {
  inicializarTema();

  const meter = document.querySelector("#status-jogo meter");
  const textoPontuacao = document.querySelector("#status-jogo figcaption strong");
  const textoNivel = document.querySelector("#status-jogo figcaption p");
  const textoProgresso = document.querySelector("#status-jogo small");
  const secaoDesafio = document.getElementById("desafio-card");
  const secaoFeedback = document.getElementById("feedback-jogo");

  // FUNÇÕES DE PERSISTÊNCIA (localStorage)
  function salvarEstado() {
    const estado = {
      casoAtual,
      pontuacao,
      acertos
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  }

  function carregarEstado() {
    const estadoSalvo = localStorage.getItem(STORAGE_KEY);
    if (estadoSalvo) {
      try {
        const estado = JSON.parse(estadoSalvo);
        casoAtual = estado.casoAtual ?? 0;
        pontuacao = estado.pontuacao ?? 0;
        acertos = estado.acertos ?? 0;
      } catch (e) {
        limparEstadoSalvo();
      }
    }
  }

  function limparEstadoSalvo() {
    localStorage.removeItem(STORAGE_KEY);
  }

  // LÓGICA DO JOGO
  function mostrarCaso() {
    const caso = casos[casoAtual];

    if (secaoFeedback) {
      secaoFeedback.hidden = true;
    }

    if (textoProgresso) {
      textoProgresso.textContent = `Desafio ${casoAtual + 1} de ${casos.length}`;
    }

    if (secaoDesafio) {
      secaoDesafio.innerHTML = `
        <h2>Analise o Caso Abaixo</h2>
        <article>
          <header>
            <h3>Remetente: ${caso.remetente}</h3>
            <p><strong>Assunto: ${caso.assunto}</strong></p>
          </header>
          <blockquote><p>${caso.mensagem}</p></blockquote>
          <menu>
            <li><button type="button" id="btn-legitimo" class="btn-legitimo">Legítimo</button></li>
            <li><button type="button" id="btn-golpe" class="btn-golpe">Golpe</button></li>
          </menu>
        </article>
      `;

      document.getElementById("btn-legitimo")?.addEventListener("click", () => responder(false));
      document.getElementById("btn-golpe")?.addEventListener("click", () => responder(true));

      secaoDesafio.hidden = false;
    }
  }

  function responder(escolheuGolpe) {
    const caso = casos[casoAtual];
    const acertou = escolheuGolpe === caso.golpe;

    const btnLegitimo = document.getElementById("btn-legitimo");
    const btnGolpe = document.getElementById("btn-golpe");
    if (btnLegitimo) btnLegitimo.disabled = true;
    if (btnGolpe) btnGolpe.disabled = true;

    if (acertou) {
      pontuacao += pontosPorAcerto;
      acertos += 1;
    }

    // Grava no localStorage após responder
    salvarEstado();

    atualizarPainel();
    mostrarFeedback(caso, acertou);
  }

  function atualizarPainel() {
    if (meter) {
      meter.max = pontuacaoMaxima;
      meter.value = pontuacao;
    }
    if (textoPontuacao) textoPontuacao.textContent = `Pontuação Atual: ${pontuacao} pts`;
    if (textoNivel) textoNivel.textContent = `Nível: ${calcularNivel(pontuacao / pontuacaoMaxima)}`;
  }

  function calcularNivel(p) {
    if (p >= 0.9) return "Lenda Anti-Golpe";
    if (p >= 0.7) return "Guardião Digital";
    if (p >= 0.5) return "Detetive Digital";
    if (p >= 0.3) return "Vigilante Iniciante";
    return "Alvo Vulnerável";
  }

  function mostrarFeedback(caso, acertou) {
    if (secaoFeedback) {
      const textoBotao = casoAtual === casos.length - 1 ? "Ver Resultado Final" : "Próximo Desafio";

      secaoFeedback.innerHTML = `
        <h2>${acertou ? "Você acertou! ✅" : "Resposta incorreta ❌"}</h2>
        <article>
          <h3>Análise do Especialista</h3>
          <ul>
            ${caso.explicacao.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <button type="button" id="btn-proximo" style="margin-top: 20px;">${textoBotao}</button>
        </article>
      `;

      document.getElementById("btn-proximo")?.addEventListener("click", avancar);
      secaoFeedback.hidden = false;
      secaoFeedback.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function avancar() {
    casoAtual += 1;
    
    // Salva o novo progresso
    salvarEstado();

    if (casoAtual < casos.length) {
      mostrarCaso();
    } else {
      mostrarResultadoFinal();
    }
  }

  function mostrarResultadoFinal() {
    if (secaoDesafio) secaoDesafio.hidden = true;
    if (secaoFeedback) {
      secaoFeedback.hidden = false;
      secaoFeedback.innerHTML = `
        <h2>Resultado Final</h2>
        <article>
          <h3>Nível Obtido: ${calcularNivel(pontuacao / pontuacaoMaxima)}</h3>
          <p>Você acertou ${acertos} de ${casos.length} desafios.</p>
          <p><strong>Pontuação Final: ${pontuacao} / ${pontuacaoMaxima} pts</strong></p>
          <button type="button" id="btn-reiniciar" style="margin-top: 20px;">Jogar Novamente</button>
        </article>
      `;
      document.getElementById("btn-reiniciar")?.addEventListener("click", reiniciar);
      secaoFeedback.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function reiniciar() {
    casoAtual = 0;
    pontuacao = 0;
    acertos = 0;
    
    // Limpa a memória salva para recomeçar do zero
    limparEstadoSalvo();
    
    atualizarPainel();
    mostrarCaso();
  }

  // INICIALIZAÇÃO
  carregarEstado();
  atualizarPainel();

  // Se já tinha terminado todos os desafios antes de atualizar a página, mostra a tela final
  if (casoAtual >= casos.length) {
    mostrarResultadoFinal();
  } else {
    mostrarCaso();
  }
});
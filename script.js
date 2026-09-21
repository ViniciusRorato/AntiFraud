// Cada objeto é uma mensagem. "golpe: true" = é fraude / "golpe: false" = é real.
const casos = [
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
    remetente: "Loja Online \"MegaOfertas Brasil\"",
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

// 2. VARIÁVEIS DE ESTADO DO JOGO
let casoAtual = 0;      // índice do caso que está sendo exibido
let pontuacao = 0;      // pontos ganhos até agora
let acertos = 0;        // quantos casos o jogador acertou
const pontosPorAcerto = 100;
const pontuacaoMaxima = casos.length * pontosPorAcerto;

// 3. ELEMENTOS DA PÁGINA (pegos uma única vez)
const meter = document.getElementById("meter-pontuacao");
const textoPontuacao = document.getElementById("texto-pontuacao");
const textoNivel = document.getElementById("texto-nivel");
const textoProgresso = document.getElementById("texto-progresso");
const cardDesafio = document.getElementById("card-desafio");
const secaoDesafio = document.getElementById("desafio-card");
const secaoFeedback = document.getElementById("feedback-jogo");
const feedbackTitulo = document.getElementById("feedback-titulo");
const feedbackLista = document.getElementById("feedback-lista");
const botaoProximo = document.getElementById("btn-proximo");
const secaoResultado = document.getElementById("resultado-final");
const resultadoTitulo = document.getElementById("resultado-titulo");
const resultadoDescricao = document.getElementById("resultado-descricao");
const resultadoPontuacao = document.getElementById("resultado-pontuacao");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// 4. MOSTRAR O CASO ATUAL NA TELA
function mostrarCaso() {
  const caso = casos[casoAtual];

  textoProgresso.textContent = "Desafio " + (casoAtual + 1) + " de " + casos.length;

  cardDesafio.innerHTML =
    "<header>" +
      "<h3>" + caso.remetente + "</h3>" +
      "<p><strong>" + caso.assunto + "</strong></p>" +
    "</header>" +
    "<blockquote><p>" + caso.mensagem + "</p></blockquote>" +
    "<menu>" +
      '<li><button type="button" id="btn-legitimo">Legítimo</button></li>' +
      '<li><button type="button" id="btn-golpe">Golpe</button></li>' +
    "</menu>";

  // Liga os botões desse card às respostas
  document.getElementById("btn-legitimo").addEventListener("click", function () {
    responder(false);
  });
  document.getElementById("btn-golpe").addEventListener("click", function () {
    responder(true);
  });

  secaoDesafio.hidden = false;
  secaoFeedback.hidden = true;
}

// 5. VERIFICAR A RESPOSTA DO JOGADOR
function responder(escolheuGolpe) {
  const caso = casos[casoAtual];
  const acertou = escolheuGolpe === caso.golpe;

  // trava os botões para não responder duas vezes o mesmo card
  document.getElementById("btn-legitimo").disabled = true;
  document.getElementById("btn-golpe").disabled = true;

  if (acertou) {
    pontuacao = pontuacao + pontosPorAcerto;
    acertos = acertos + 1;
  }

  atualizarPainel();
  mostrarFeedback(caso, acertou);
}

// 6. ATUALIZAR PONTUAÇÃO E NÍVEL NA TELA
function atualizarPainel() {
  meter.max = pontuacaoMaxima;
  meter.value = pontuacao;
  textoPontuacao.textContent = "Pontuação Atual: " + pontuacao + " pts";
  textoNivel.textContent = "Nível: " + calcularNivel(pontuacao / pontuacaoMaxima);
}

// 7. DESCOBRIR O NÍVEL DE IMUNIDADE DIGITAL PELO PERCENTUAL DE ACERTO
function calcularNivel(percentual) {
  if (percentual >= 0.9) return "Lenda Anti-Golpe";
  if (percentual >= 0.7) return "Guardião Digital";
  if (percentual >= 0.5) return "Detetive Digital";
  if (percentual >= 0.3) return "Vigilante Iniciante";
  return "Alvo Vulnerável";
}

// 8. MOSTRAR A EXPLICAÇÃO DO CASO (FEEDBACK)
function mostrarFeedback(caso, acertou) {
  feedbackTitulo.textContent = acertou ? "Você acertou! ✅" : "Resposta incorreta ❌";

  feedbackLista.innerHTML = "";
  caso.explicacao.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    feedbackLista.appendChild(li);
  });

  botaoProximo.textContent =
    casoAtual === casos.length - 1 ? "Ver resultado final" : "Próximo Desafio";

  secaoFeedback.hidden = false;
}

// 9. AVANÇAR PARA O PRÓXIMO CASO (OU TERMINAR O JOGO)
function avancar() {
  casoAtual = casoAtual + 1;

  if (casoAtual < casos.length) {
    mostrarCaso();
  } else {
    mostrarResultadoFinal();
  }
}

// 10. TELA FINAL COM O NÍVEL DE IMUNIDADE DIGITAL
function mostrarResultadoFinal() {
  const percentual = pontuacao / pontuacaoMaxima;

  secaoDesafio.hidden = true;
  secaoFeedback.hidden = true;

  resultadoTitulo.textContent = "Nível de Imunidade Digital: " + calcularNivel(percentual);
  resultadoDescricao.textContent =
    "Você acertou " + acertos + " de " + casos.length + " casos.";
  resultadoPontuacao.textContent = "Pontuação final: " + pontuacao + " / " + pontuacaoMaxima + " pts";

  secaoResultado.hidden = false;
}

// 11. REINICIAR O JOGO DO ZERO
function reiniciar() {
  casoAtual = 0;
  pontuacao = 0;
  acertos = 0;

  atualizarPainel();
  secaoResultado.hidden = true;
  mostrarCaso();
}

// 12. INÍCIO DO JOGO
botaoProximo.addEventListener("click", avancar);
botaoReiniciar.addEventListener("click", reiniciar);

atualizarPainel();
mostrarCaso();

// 1. PADRÕES (REGEX) DOS DADOS SENSÍVEIS
const padraoCPF = /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/g;
const padraoEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// 2. ELEMENTOS DA PÁGINA
const formulario = document.getElementById("form-analise");
const campoTexto = document.getElementById("texto-suspeito");
const areaResultado = document.getElementById("resultado-sanitizado");
const textoResultado = document.getElementById("texto-sanitizado");

// 3. FUNÇÃO QUE FAZ A SANITIZAÇÃO
function sanitizarTexto(texto) {
  return texto
    .replace(padraoCPF, "***.***.***-**")
    .replace(padraoEmail, "***@***.***");
}

// 4. AO CLICAR EM "ANALISAR AGORA"
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita recarregar a página

  const textoOriginal = campoTexto.value;
  const textoLimpo = sanitizarTexto(textoOriginal);

  textoResultado.textContent = textoLimpo;
  areaResultado.hidden = false;
});

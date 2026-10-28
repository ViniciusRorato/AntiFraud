import { sanitizarTexto } from './sanitizador';
import { REGRAS } from './regras';

const PONTOS_POR_PALAVRA = 15;
const LIMITE_PONTOS_POR_GRUPO = 30;
const PONTOS_SOLICITACAO_DADOS = 20;
const PONTOS_IP_DIRETO = 40;
const PONTOS_ENCURTADOR = 25;
const PONTOS_DOMINIO_SUSPEITO = 35;
const PONTOS_URL_INVALIDA = 10;
const PONTUACAO_MAXIMA = 100;

const REGEX_URL = /(https?:\/\/[^\s]+)/g;
const REGEX_IP = /^(\d{1,3}\.){3}\d{1,3}$/;

const encontrarPalavras = (palavras, texto) =>
  palavras.filter((palavra) => texto.includes(palavra));
const contemAlgum = (termos, hostname) => termos.some((termo) => hostname.includes(termo));
const pontosPorPalavras = (quantidade) =>
  Math.min(quantidade * PONTOS_POR_PALAVRA, LIMITE_PONTOS_POR_GRUPO);

// Avalia uma única URL e devolve os pontos de risco, indicadores e evidências encontrados.
function analisarUrl(urlString) {
  let hostname;
  try {
    hostname = new URL(urlString).hostname.toLowerCase();
  } catch {
    return {
      pontos: PONTOS_URL_INVALIDA,
      indicadores: ['URL mal formatada ou suspeita'],
      evidencias: [],
    };
  }

  let pontos = 0;
  const indicadores = [];
  const evidencias = [];

  if (REGEX_IP.test(hostname)) {
    pontos += PONTOS_IP_DIRETO;
    indicadores.push('Uso de Endereço IP Direto');
    evidencias.push(`Link com IP direto: <code>${hostname}</code>`);
  }
  if (contemAlgum(REGRAS.encurtadores, hostname)) {
    pontos += PONTOS_ENCURTADOR;
    indicadores.push('Link Malicioso / Encurtado');
    evidencias.push(`Encurtador detectado: <code>${hostname}</code>`);
  }
  if (contemAlgum(REGRAS.dominiosSuspeitos, hostname)) {
    pontos += PONTOS_DOMINIO_SUSPEITO;
    indicadores.push('Domínio Suspeito / Typosquatting');
    evidencias.push(`Domínio suspeito: <code>${hostname}</code>`);
  }

  return { pontos, indicadores, evidencias };
}

// Analisa um texto suspeito e devolve pontuação (0 a 100), indicadores e evidências.
export function analisarConteudo(textoConteudo) {
  let pontuacaoRisco = 0;
  const indicadores = [];
  const evidencias = [];
  const textoMinusculo = textoConteudo.toLowerCase();

  const urgencias = encontrarPalavras(REGRAS.palavrasUrgencia, textoMinusculo);
  if (urgencias.length) {
    pontuacaoRisco += pontosPorPalavras(urgencias.length);
    indicadores.push(`Padrão de Urgência (${urgencias.slice(0, 3).join(', ')})`);
  }

  const vantagens = encontrarPalavras(REGRAS.palavrasVantagem, textoMinusculo);
  if (vantagens.length) {
    pontuacaoRisco += pontosPorPalavras(vantagens.length);
    indicadores.push('Promessas de Vantagens Irreais / Financeiras');
  }

  const solicitacoes = encontrarPalavras(REGRAS.palavrasSolicitacaoDados, textoMinusculo);
  if (solicitacoes.length) {
    pontuacaoRisco += PONTOS_SOLICITACAO_DADOS;
    indicadores.push('Solicitação excessiva de dados');
  }

  const urls = textoConteudo.match(REGEX_URL) || [];
  urls.forEach((url) => {
    const analiseUrl = analisarUrl(url);
    pontuacaoRisco += analiseUrl.pontos;
    indicadores.push(...analiseUrl.indicadores);
    evidencias.push(...analiseUrl.evidencias);
  });

  const { textoSanitizado, evidencias: evidenciasSanitizacao } = sanitizarTexto(textoConteudo);
  evidencias.push(...evidenciasSanitizacao);

  return {
    pontuacao: Math.min(Math.max(pontuacaoRisco, 0), PONTUACAO_MAXIMA),
    indicadores: [...new Set(indicadores)],
    evidencias: [...new Set(evidencias)],
    textoSanitizado,
  };
}

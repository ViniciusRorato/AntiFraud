import { sanitizarTexto } from './sanitizador';
const CONFIG = {
  palavrasUrgencia: ['urgente','urgência','bloqueio','bloqueado','bloqueada','cancelamento','expira','expirante','imediato','imediata','suspensao','suspensa','suspenso','atencao','atenção','ultimas horas','últimas horas','hoje mesmo','agora','multa','penalidade','seguranca','segurança'],
  palavrasVantagem: ['ganhe','ganhou','premiado','prêmio','premio','sorteio','lucro','facil','fácil','gratis','grátis','gratuito','renda extra','investimento garantido','sem risco','cashback alto','pix','resgate','desconto exclusivo','liberado','aprovado'],
  palavrasSolicitacaoDados: ['digite sua senha','informe seu cpf','confirme seus dados','token','código de verificação','cartão','cvv','sua conta'],
  encurtadores: ['bit.ly','t.co','tinyurl.com','is.gd','buff.ly','ow.ly','goo.gl','rebrand.ly','cutt.ly','shorturl.at','rb.gy'],
  dominiosSuspeitos: ['br-br','atendimento-','suporte-','seguranca-','verificacao-','-banco','login-','com-br.site','com-br.online','.xyz','.top','.club']
};
export function analisarConteudo(textoConteudo) {
  let pontuacaoRisco = 0; const indicadores = []; const evidencias = [];
  const textoMinusculo = textoConteudo.toLowerCase();
  const urgencias = CONFIG.palavrasUrgencia.filter(p => textoMinusculo.includes(p));
  if (urgencias.length) { pontuacaoRisco += Math.min(urgencias.length * 15, 30); indicadores.push(`Padrão de Urgência (${urgencias.slice(0,3).join(', ')})`); }
  const vantagens = CONFIG.palavrasVantagem.filter(p => textoMinusculo.includes(p));
  if (vantagens.length) { pontuacaoRisco += Math.min(vantagens.length * 15, 30); indicadores.push('Promessas de Vantagens Irreais / Financeiras'); }
  const solicitacoes = CONFIG.palavrasSolicitacaoDados.filter(p => textoMinusculo.includes(p));
  if (solicitacoes.length) { pontuacaoRisco += 20; indicadores.push('Solicitação excessiva de dados'); }
  const urls = textoConteudo.match(/(https?:\/\/[^\s]+)/g) || [];
  urls.forEach(urlString => {
    try {
      const hostname = new URL(urlString).hostname.toLowerCase();
      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) { pontuacaoRisco += 40; indicadores.push('Uso de Endereço IP Direto'); evidencias.push(`Link com IP direto: <code>${hostname}</code>`); }
      if (CONFIG.encurtadores.some(e => hostname.includes(e))) { pontuacaoRisco += 25; indicadores.push('Link Malicioso / Encurtado'); evidencias.push(`Encurtador detectado: <code>${hostname}</code>`); }
      if (CONFIG.dominiosSuspeitos.some(d => hostname.includes(d))) { pontuacaoRisco += 35; indicadores.push('Domínio Suspeito / Typosquatting'); evidencias.push(`Domínio suspeito: <code>${hostname}</code>`); }
    } catch { pontuacaoRisco += 10; indicadores.push('URL mal formatada ou suspeita'); }
  });
  const resultadoSanitizacao = sanitizarTexto(textoConteudo);
  evidencias.push(...resultadoSanitizacao.evidencias);
  return { pontuacao: Math.min(Math.max(pontuacaoRisco,0),100), indicadores:[...new Set(indicadores)], evidencias:[...new Set(evidencias)], textoSanitizado: resultadoSanitizacao.textoSanitizado };
}

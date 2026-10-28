const SEPARADOR = '='.repeat(50);

const removerTagCode = (texto) => texto.replace(/<\/?code>/g, '');

function formatarLista(itens, mensagemVazia) {
  if (!itens.length) return `- ${mensagemVazia}`;
  return itens.map((item) => `- ${item}`).join('\n');
}

// Monta o texto do relatório de evidências, pronto para anexar a um B.O.
export function gerarRelatorioBO({ pontuacao, textoSanitizado, indicadores, evidencias }) {
  const dataAtual = new Date().toLocaleString('pt-BR');

  return [
    SEPARADOR,
    '        RELATÓRIO DE EVIDÊNCIAS DE FRAUDE DIGITAL',
    SEPARADOR,
    `Data/Hora da Análise: ${dataAtual}`,
    `Nível de Risco Calculado: ${pontuacao}%`,
    '',
    '[CONTEÚDO SANITIZADO DA MENSAGEM]',
    textoSanitizado,
    '',
    '[INDICADORES DE FRAUDE DETECTADOS]',
    formatarLista(indicadores, 'Nenhum indicador crítico.'),
    '',
    '[EVIDÊNCIAS E TÉCNICAS UTILIZADAS]',
    formatarLista(evidencias.map(removerTagCode), 'Nenhuma evidência registrada.'),
    '',
    SEPARADOR,
    'Documento gerado pela plataforma AntiFraud.',
    'Pronto para ser anexado a denúncias ou Boletim de Ocorrência.',
    SEPARADOR,
  ].join('\n');
}

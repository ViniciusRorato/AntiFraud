/**
 * Gerador de Relatório de Evidências
 */

export function gerarRelatorioBO(dadosAnalise) {
    const dataAtual = new Date().toLocaleString('pt-BR');
    
    return `==================================================
        RELATÓRIO DE EVIDÊNCIAS DE FRAUDE DIGITAL
==================================================
Data/Hora da Análise: ${dataAtual}
Nível de Risco Calculado: ${dadosAnalise.pontuacao}%

[CONTEÚDO SANITIZADO DA MENSAGEM]
${dadosAnalise.textoSanitizado}

[INDICADORES DE FRAUDE DETECTADOS]
${dadosAnalise.indicadores.length > 0 ? dadosAnalise.indicadores.map(i => `- ${i}`).join('\n') : '- Nenhum indicador crítico.'}

[EVIDÊNCIAS E TÉCNICAS UTILIZADAS]
${dadosAnalise.evidencias.length > 0 ? dadosAnalise.evidencias.map(e => `- ${e.replace(/<\/?code>/g, '')}`).join('\n') : '- Nenhuma evidência registrada.'}

==================================================
Documento gerado pela plataforma AntiFraud.
Pronto para ser anexado a denúncias ou Boletim de Ocorrência.
==================================================`;
}
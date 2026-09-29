/**
 * Controlador Principal da Interface (index.html)
 */

import { analisarConteudo } from './analise.js';

document.addEventListener('DOMContentLoaded', () => {
  // Captura o formulário da seção #analise
  const formAnalise = document.querySelector('#analise form');
  const textareaTexto = document.getElementById('texto-suspeito');

  // Captura os elementos do Painel de Risco
  const meterRisco = document.querySelector('#painel-risco meter');
  const figcaptionStrong = document.querySelector('#painel-risco figcaption strong');
  const figcaptionP = document.querySelector('#painel-risco figcaption p');
  
  const artigos = document.querySelectorAll('#painel-risco article');
  const listaIndicadores = artigos[0]?.querySelector('ul');
  const listaEvidencias = artigos[1]?.querySelector('ul');

  if (formAnalise) {
    formAnalise.addEventListener('submit', (event) => {
      event.preventDefault(); // Impede o recarregamento da página

      const texto = textareaTexto.value.trim();
      if (!texto) return;

      // Executa a análise heurística + sanitização
      const resultado = analisarConteudo(texto);
      
      // Atualiza o painel na tela
      atualizarPainelRisco(resultado);
    });
  }

  function atualizarPainelRisco({ pontuacao, indicadores, evidencias }) {
    // 1. Atualiza o medidor <meter>
    if (meterRisco) {
      meterRisco.value = pontuacao;
      meterRisco.textContent = `${pontuacao}%`;
    }

    // 2. Determina a classificação
    let nivel = 'BAIXO';
    let desc = 'Baixa probabilidade de fraude. Mantenha a atenção.';

    if (pontuacao >= 70) {
      nivel = 'ALTO';
      desc = 'Alta probabilidade de fraude! Não aceda a links nem forneça dados.';
    } else if (pontuacao >= 35) {
      nivel = 'MÉDIO';
      desc = 'Atenção necessária. Foram identificados padrões suspeitos.';
    }

    if (figcaptionStrong) figcaptionStrong.textContent = `${pontuacao}% - RISCO ${nivel}`;
    if (figcaptionP) figcaptionP.textContent = desc;

    // 3. Atualiza a lista de Indicadores
    if (listaIndicadores) {
      listaIndicadores.innerHTML = indicadores.length > 0 
        ? indicadores.map(item => `<li>${item}</li>`).join('')
        : '<li>Nenhum indicador de risco crítico detectado.</li>';
    }

    // 4. Atualiza a lista de Evidências Sanitizadas
    if (listaEvidencias) {
      listaEvidencias.innerHTML = evidencias.length > 0 
        ? evidencias.map(item => `<li>${item}</li>`).join('')
        : '<li>Nenhuma evidência sensível detectada.</li>';
    }

    // Rola a página até o painel de resultado
    document.getElementById('painel-risco')?.scrollIntoView({ behavior: 'smooth' });
  }
});
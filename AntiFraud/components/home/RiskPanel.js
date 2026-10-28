'use client';
import { gerarRelatorioBO } from '@/lib/relatorio';

// Valores de exemplo exibidos antes de o usuário rodar a primeira análise.
const PONTUACAO_PADRAO = 85;
const INDICADORES_PADRAO = [
  'Padrão de Urgência',
  'Link Malicioso / Encurtado',
  'Solicitação excessiva de dados',
];
const EVIDENCIAS_PADRAO = [
  'CPF/E-mail anonimizados: <code>***.***.***-**</code>',
  'Redirecionamento suspeito detectado',
];

function classificarRisco(pontuacao) {
  if (pontuacao >= 70) {
    return {
      nivel: 'ALTO',
      descricao: 'Alta probabilidade de fraude! Não aceda a links nem forneça dados.',
    };
  }
  if (pontuacao >= 35) {
    return {
      nivel: 'MÉDIO',
      descricao: 'Atenção necessária. Foram identificados padrões suspeitos.',
    };
  }
  return {
    nivel: 'BAIXO',
    descricao: 'Baixa probabilidade de fraude. Mantenha a atenção.',
  };
}

function baixarArquivoTexto(conteudo, nomeArquivo) {
  const blob = new Blob([conteudo], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  link.click();
  URL.revokeObjectURL(url);
}

export default function RiskPanel({ resultado }) {
  const pontuacao = resultado?.pontuacao ?? PONTUACAO_PADRAO;
  const indicadores = resultado?.indicadores ?? INDICADORES_PADRAO;
  const evidencias = resultado?.evidencias ?? EVIDENCIAS_PADRAO;
  const { nivel, descricao } = classificarRisco(pontuacao);

  function baixarRelatorio() {
    if (!resultado) return;
    baixarArquivoTexto(gerarRelatorioBO(resultado), 'relatorio-antifraud.txt');
  }

  return (
    <section id="painel-risco" aria-live="polite">
      <h2>Painel de Risco</h2>
      <figure>
        <meter high="70" low="30" max="100" min="0" optimum="0" value={pontuacao}>
          {pontuacao}%
        </meter>
        <figcaption>
          <strong>
            {pontuacao}% - RISCO {nivel}
          </strong>
          <p>{descricao}</p>
        </figcaption>
      </figure>
      <article>
        <h3>Indicadores Detectados</h3>
        <ul>
          {indicadores.map((indicador, i) => (
            <li key={i}>{indicador}</li>
          ))}
        </ul>
      </article>
      <article>
        <h3>Evidências Sanitizadas</h3>
        <ul>
          {evidencias.map((evidencia, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: evidencia }} />
          ))}
        </ul>
      </article>
      <menu>
        <li>
          <button type="button" onClick={baixarRelatorio} disabled={!resultado}>
            Gerar Relatório (PDF)
          </button>
        </li>
        <li>
          <a href="#denunciar">Denunciar Golpe</a>
        </li>
      </menu>
    </section>
  );
}

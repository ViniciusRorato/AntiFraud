'use client';
import { gerarRelatorioBO } from '@/lib/relatorio';
export default function RiskPanel({result}){
 const score=result?.pontuacao??85; const nivel=score>=70?'ALTO':score>=35?'MÉDIO':'BAIXO';
 const desc=score>=70?'Alta probabilidade de fraude! Não aceda a links nem forneça dados.':score>=35?'Atenção necessária. Foram identificados padrões suspeitos.':'Baixa probabilidade de fraude. Mantenha a atenção.';
 const indicadores=result?.indicadores??['Padrão de Urgência','Link Malicioso / Encurtado','Solicitação excessiva de dados'];
 const evidencias=result?.evidencias??['CPF/E-mail anonimizados: <code>***.***.***-**</code>','Redirecionamento suspeito detectado'];
 function relatorio(){if(!result)return; const b=new Blob([gerarRelatorioBO(result)],{type:'text/plain'}); const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download='relatorio-antifraud.txt'; a.click(); URL.revokeObjectURL(u);}
 return <section id="painel-risco" aria-live="polite">
  <h2>Painel de Risco</h2><figure><meter high="70" low="30" max="100" min="0" optimum="0" value={score}>{score}%</meter><figcaption><strong>{score}% - RISCO {nivel}</strong><p>{desc}</p></figcaption></figure>
  <article><h3>Indicadores Detectados</h3><ul>{indicadores.map((x,i)=><li key={i}>{x}</li>)}</ul></article>
  <article><h3>Evidências Sanitizadas</h3><ul>{evidencias.map((x,i)=><li key={i} dangerouslySetInnerHTML={{__html:x}} />)}</ul></article>
  <menu><li><button type="button" onClick={relatorio} disabled={!result}>Gerar Relatório (PDF)</button></li><li><a href="#denunciar">Denunciar Golpe</a></li></menu>
 </section>;
}

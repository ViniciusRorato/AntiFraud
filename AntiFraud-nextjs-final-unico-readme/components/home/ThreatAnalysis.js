'use client';
import { useState } from 'react';
import { analisarConteudo } from '@/lib/analise';
import RiskPanel from './RiskPanel';

export default function ThreatAnalysis(){
 const [texto,setTexto]=useState(''); const [result,setResult]=useState(null);
 function analisar(e){e.preventDefault(); if(!texto.trim()) return; const r=analisarConteudo(texto.trim()); setResult(r); setTimeout(()=>document.getElementById('painel-risco')?.scrollIntoView({behavior:'smooth'}),0);}
 return <>
  <section id="analise">
   <h2>Análise de Ameaça</h2>
   <form onSubmit={analisar}>
    <label htmlFor="texto-suspeito">Cole a mensagem, link ou chave Pix suspeita:</label>
    <textarea id="texto-suspeito" name="texto_suspeito" rows="4" value={texto} onChange={e=>setTexto(e.target.value)} placeholder="Cole aqui o conteúdo..." required />
    <menu><li><button type="submit">Analisar agora</button></li><li><button type="button" onClick={()=>alert('Recurso de áudio da interface original.')}>Ouvir áudio</button></li></menu>
   </form>
  </section>
  <RiskPanel result={result}/>
 </>;
}

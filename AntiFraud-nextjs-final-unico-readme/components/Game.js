'use client';
import {useEffect,useState} from 'react';
const KEY='antifraud_jogo_estado';
const nivel=p=>p>=.9?'Lenda Anti-Golpe':p>=.7?'Guardião Digital':p>=.5?'Detetive Digital':p>=.3?'Vigilante Iniciante':'Alvo Vulnerável';
export default function Game(){
 const [casos,setCasos]=useState([]); const [s,setS]=useState({casoAtual:0,pontuacao:0,acertos:0}); const [f,setF]=useState(null); const [ok,setOk]=useState(false);
 useEffect(()=>{fetch('/data/casos.json').then(r=>r.json()).then(setCasos);try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x)setS(v=>({...v,...x}))}catch{}setOk(true)},[]);
 useEffect(()=>{if(ok)localStorage.setItem(KEY,JSON.stringify(s))},[s,ok]);
 if(!ok||!casos.length)return <main><p>Carregando desafios...</p></main>;
 const max=casos.length*100,final=s.casoAtual>=casos.length,caso=casos[Math.min(s.casoAtual,casos.length-1)];
 const responder=g=>{const ac=g===caso.golpe;setS(x=>({...x,pontuacao:x.pontuacao+(ac?100:0),acertos:x.acertos+(ac?1:0)}));setF({caso,acertou:ac})};
 const avancar=()=>{setF(null);setS(x=>({...x,casoAtual:x.casoAtual+1}))}; const reiniciar=()=>{localStorage.removeItem(KEY);setS({casoAtual:0,pontuacao:0,acertos:0});setF(null)};
 return <main>
  <section id="status-jogo"><h2>Sua Imunidade Digital</h2><figure><meter max={max} min="0" value={s.pontuacao}>{s.pontuacao} pontos</meter><figcaption><strong>Pontuação Atual: {s.pontuacao} pts</strong><p>Nível: {nivel(s.pontuacao/max)}</p></figcaption></figure><p><small>{final?'Todos os desafios concluídos':`Desafio ${s.casoAtual+1} de ${casos.length}`}</small></p></section>
  {!final&&!f&&<section id="desafio-card"><h2>Analise o Caso Abaixo</h2><article><header><h3>Remetente: {caso.remetente}</h3><p><strong>Assunto: {caso.assunto}</strong></p></header><blockquote><p>{caso.mensagem}</p></blockquote><menu><li><button className="btn-legitimo" type="button" onClick={()=>responder(false)}>Legítimo</button></li><li><button className="btn-golpe" type="button" onClick={()=>responder(true)}>Golpe</button></li></menu></article></section>}
  {f&&<section id="feedback-jogo" aria-live="polite"><h2>{f.acertou?'Você acertou! ✅':'Resposta incorreta ❌'}</h2><article><h3>Análise do Especialista</h3><ul>{f.caso.explicacao.map((x,i)=><li key={i}>{x}</li>)}</ul><button type="button" onClick={avancar} style={{marginTop:20}}>{s.casoAtual===casos.length-1?'Ver Resultado Final':'Próximo Desafio'}</button></article></section>}
  {final&&<section id="feedback-jogo"><h2>Resultado Final</h2><article><h3>Nível Obtido: {nivel(s.pontuacao/max)}</h3><p>Você acertou {s.acertos} de {casos.length} desafios.</p><p><strong>Pontuação Final: {s.pontuacao} / {max} pts</strong></p><button type="button" onClick={reiniciar} style={{marginTop:20}}>Jogar Novamente</button></article></section>}
 </main>;
}

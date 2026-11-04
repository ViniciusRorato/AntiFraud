'use client';
import { useState } from 'react';
import { analisarConteudo } from '@/lib/analise';
import RiskPanel from './RiskPanel';

function rolarParaPainelDeRisco() {
  document.getElementById('painel-risco')?.scrollIntoView({ behavior: 'smooth' });
}

export default function ThreatAnalysis() {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState(null);

  function analisar(evento) {
    evento.preventDefault();
    if (!texto.trim()) return;
    setResultado(analisarConteudo(texto.trim()));
    // espera o painel atualizar antes de rolar até ele
    setTimeout(rolarParaPainelDeRisco, 0);
  }

  return (
    <>
      <section id="analise">
        <h2>Análise de Ameaça</h2>
        <form onSubmit={analisar}>
          <label htmlFor="texto-suspeito">Cole a mensagem, link ou chave Pix suspeita:</label>
          <textarea
            id="texto-suspeito"
            name="texto_suspeito"
            rows="4"
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
            placeholder="Cole aqui o conteúdo..."
            required
          />
          <menu>
            <li>
              <button type="submit">Analisar agora</button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => alert('Recurso de áudio da interface original.')}
              >
                Ouvir áudio
              </button>
            </li>
          </menu>
        </form>
      </section>
      <RiskPanel resultado={resultado} />
    </>
  );
}

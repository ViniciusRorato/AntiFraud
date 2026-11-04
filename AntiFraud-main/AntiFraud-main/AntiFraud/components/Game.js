'use client';
import { useEffect, useState } from 'react';

const CHAVE_STORAGE = 'antifraud_jogo_estado';
const PONTOS_POR_ACERTO = 100;
const ESTADO_INICIAL = { casoAtual: 0, pontuacao: 0, acertos: 0 };
const ESTILO_BOTAO = { marginTop: 20 };

// Do mais exigente para o menos exigente: vale o primeiro nível que a proporção alcança.
const NIVEIS = [
  { minimo: 0.9, nome: 'Lenda Anti-Golpe' },
  { minimo: 0.7, nome: 'Guardião Digital' },
  { minimo: 0.5, nome: 'Detetive Digital' },
  { minimo: 0.3, nome: 'Vigilante Iniciante' },
];
const NIVEL_INICIAL = 'Alvo Vulnerável';

function obterNivel(proporcao) {
  const nivel = NIVEIS.find(({ minimo }) => proporcao >= minimo);
  return nivel ? nivel.nome : NIVEL_INICIAL;
}

function StatusJogo({ pontuacao, maximo, nivel, rotuloProgresso }) {
  return (
    <section id="status-jogo">
      <h2>Sua Imunidade Digital</h2>
      <figure>
        <meter max={maximo} min="0" value={pontuacao}>
          {pontuacao} pontos
        </meter>
        <figcaption>
          <strong>Pontuação Atual: {pontuacao} pts</strong>
          <p>Nível: {nivel}</p>
        </figcaption>
      </figure>
      <p>
        <small>{rotuloProgresso}</small>
      </p>
    </section>
  );
}

function CartaoDesafio({ caso, onResponder }) {
  return (
    <section id="desafio-card">
      <h2>Analise o Caso Abaixo</h2>
      <article>
        <header>
          <h3>Remetente: {caso.remetente}</h3>
          <p>
            <strong>Assunto: {caso.assunto}</strong>
          </p>
        </header>
        <blockquote>
          <p>{caso.mensagem}</p>
        </blockquote>
        <menu>
          <li>
            <button className="btn-legitimo" type="button" onClick={() => onResponder(false)}>
              Legítimo
            </button>
          </li>
          <li>
            <button className="btn-golpe" type="button" onClick={() => onResponder(true)}>
              Golpe
            </button>
          </li>
        </menu>
      </article>
    </section>
  );
}

function FeedbackResposta({ feedback, ehUltimoCaso, onAvancar }) {
  return (
    <section id="feedback-jogo" aria-live="polite">
      <h2>{feedback.acertou ? 'Você acertou! ✅' : 'Resposta incorreta ❌'}</h2>
      <article>
        <h3>Análise do Especialista</h3>
        <ul>
          {feedback.caso.explicacao.map((linha, i) => (
            <li key={i}>{linha}</li>
          ))}
        </ul>
        <button type="button" onClick={onAvancar} style={ESTILO_BOTAO}>
          {ehUltimoCaso ? 'Ver Resultado Final' : 'Próximo Desafio'}
        </button>
      </article>
    </section>
  );
}

function ResultadoFinal({ nivel, acertos, totalCasos, pontuacao, maximo, onReiniciar }) {
  return (
    <section id="feedback-jogo">
      <h2>Resultado Final</h2>
      <article>
        <h3>Nível Obtido: {nivel}</h3>
        <p>
          Você acertou {acertos} de {totalCasos} desafios.
        </p>
        <p>
          <strong>
            Pontuação Final: {pontuacao} / {maximo} pts
          </strong>
        </p>
        <button type="button" onClick={onReiniciar} style={ESTILO_BOTAO}>
          Jogar Novamente
        </button>
      </article>
    </section>
  );
}

export default function Game() {
  const [casos, setCasos] = useState([]);
  const [estado, setEstado] = useState(ESTADO_INICIAL);
  const [feedback, setFeedback] = useState(null);
  const [carregado, setCarregado] = useState(false);

  // Carrega os casos e recupera o progresso salvo no navegador.
  useEffect(() => {
    fetch('/data/casos.json')
      .then((resposta) => resposta.json())
      .then(setCasos);

    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || 'null');
      if (salvo) setEstado((atual) => ({ ...atual, ...salvo }));
    } catch {
      // progresso salvo inválido: começa do zero
    }
    setCarregado(true);
  }, []);

  // Salva o progresso a cada mudança, só depois de ter carregado o salvo.
  useEffect(() => {
    if (carregado) localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estado));
  }, [estado, carregado]);

  if (!carregado || !casos.length) {
    return (
      <main>
        <p>Carregando desafios...</p>
      </main>
    );
  }

  const totalCasos = casos.length;
  const maximo = totalCasos * PONTOS_POR_ACERTO;
  const terminou = estado.casoAtual >= totalCasos;
  const caso = casos[Math.min(estado.casoAtual, totalCasos - 1)];
  const nivel = obterNivel(estado.pontuacao / maximo);

  const responder = (respostaEhGolpe) => {
    const acertou = respostaEhGolpe === caso.golpe;
    setEstado((anterior) => ({
      ...anterior,
      pontuacao: anterior.pontuacao + (acertou ? PONTOS_POR_ACERTO : 0),
      acertos: anterior.acertos + (acertou ? 1 : 0),
    }));
    setFeedback({ caso, acertou });
  };

  const avancar = () => {
    setFeedback(null);
    setEstado((anterior) => ({ ...anterior, casoAtual: anterior.casoAtual + 1 }));
  };

  const reiniciar = () => {
    localStorage.removeItem(CHAVE_STORAGE);
    setEstado(ESTADO_INICIAL);
    setFeedback(null);
  };

  return (
    <main>
      <StatusJogo
        pontuacao={estado.pontuacao}
        maximo={maximo}
        nivel={nivel}
        rotuloProgresso={
          terminou
            ? 'Todos os desafios concluídos'
            : `Desafio ${estado.casoAtual + 1} de ${totalCasos}`
        }
      />
      {!terminou && !feedback && <CartaoDesafio caso={caso} onResponder={responder} />}
      {feedback && (
        <FeedbackResposta
          feedback={feedback}
          ehUltimoCaso={estado.casoAtual === totalCasos - 1}
          onAvancar={avancar}
        />
      )}
      {terminou && (
        <ResultadoFinal
          nivel={nivel}
          acertos={estado.acertos}
          totalCasos={totalCasos}
          pontuacao={estado.pontuacao}
          maximo={maximo}
          onReiniciar={reiniciar}
        />
      )}
    </main>
  );
}

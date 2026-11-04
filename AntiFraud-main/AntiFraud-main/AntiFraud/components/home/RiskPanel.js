'use client';

import { useEffect, useState } from 'react';

export default function RiskPanel() {
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCasos() {
      try {
        const res = await fetch('/api/casos');
        if (!res.ok) throw new Error('Falha ao carregar os dados');
        
        const data = await res.json();
        setCasos(data);
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCasos();
  }, []);

  if (loading) return <p className="text-gray-500">Carregando análises de risco...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!casos.length) return <p className="text-gray-500">Nenhum caso encontrado.</p>;

  return (
    <div className="risk-panel space-y-4">
      <h2 className="text-2xl font-bold mb-4">Painel de Análise de Risco</h2>
      {casos.map((caso, index) => (
        <article key={index} className="border p-4 rounded-lg shadow-sm bg-white">
          <h3 className="font-semibold text-lg">{caso.assunto}</h3>
          <p className="text-sm text-gray-600"><strong>Remetente:</strong> {caso.remetente}</p>
          <p className="my-2">{caso.mensagem}</p>
          
          <div className="mt-2 mb-3">
            <span className={`inline-block px-2.5 py-1 rounded text-xs font-semibold text-white ${caso.golpe ? 'bg-red-600' : 'bg-green-600'}`}>
              {caso.golpe ? 'Golpe Detectado' : 'Mensagem Legítima'}
            </span>
          </div>

          {caso.explicacao?.length > 0 && (
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {caso.explicacao.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
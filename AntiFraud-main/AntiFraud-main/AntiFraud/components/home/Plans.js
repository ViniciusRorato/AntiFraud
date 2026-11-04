const PLANOS = [
  { nome: 'Pessoal', precoExibido: '19,90', valor: '19.90' },
  { nome: 'Profissional', precoExibido: '49,90', valor: '49.90' },
  { nome: 'Empresarial', precoExibido: '99,90', valor: '99.90' },
];

export default function Plans() {
  return (
    <section id="planos">
      <h2>Planos</h2>
      {PLANOS.map(({ nome, precoExibido, valor }) => (
        <article key={nome}>
          <h3>{nome}</h3>
          <p>
            <data value={valor}>
              <strong>R$ {precoExibido}</strong>/mês
            </data>
          </p>
          <button type="button">Escolher</button>
        </article>
      ))}
    </section>
  );
}

'use client';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

// "pagina" liga o link à prop "current", para marcar a página atual no menu.
const LINKS = [
  { href: '/', texto: 'Início', pagina: 'home' },
  { href: '/#como-funciona', texto: 'Como funciona' },
  { href: '/jogo', texto: 'Jogo Educativo', pagina: 'jogo' },
  { href: '/ods', texto: 'ODS', pagina: 'ods' },
  { href: '/#planos', texto: 'Planos' },
  { href: '/#denunciar', texto: 'Denunciar' },
];

export default function Header({ subtitle, current }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <hgroup>
        <h1>AntiFraud</h1>
        <p>{subtitle}</p>
      </hgroup>
      <nav aria-label="Menu Principal">
        {LINKS.map(({ href, texto, pagina }) => (
          <Link
            key={href}
            href={href}
            aria-current={pagina && pagina === current ? 'page' : undefined}
          >
            {texto}
          </Link>
        ))}
        <button id="btn-tema" type="button" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </button>
      </nav>
    </header>
  );
}

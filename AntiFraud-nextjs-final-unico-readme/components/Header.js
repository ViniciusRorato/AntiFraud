'use client';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export default function Header({ subtitle, current }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header>
      <hgroup>
        <h1>AntiFraud</h1>
        <p>{subtitle}</p>
      </hgroup>
      <nav aria-label="Menu Principal">
        <Link href="/" aria-current={current === 'home' ? 'page' : undefined}>Início</Link>
        <Link href="/#como-funciona">Como funciona</Link>
        <Link href="/jogo" aria-current={current === 'jogo' ? 'page' : undefined}>Jogo Educativo</Link>
        <Link href="/ods" aria-current={current === 'ods' ? 'page' : undefined}>ODS</Link>
        <Link href="/#planos">Planos</Link>
        <Link href="/#denunciar">Denunciar</Link>
        <button id="btn-tema" type="button" onClick={toggleTheme}>{theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}</button>
      </nav>
    </header>
  );
}

'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CHAVE_STORAGE = 'antifraud-tema';
const TEMA_PADRAO = 'dark';

export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

function aplicarTema(tema) {
  document.documentElement.setAttribute('data-theme', tema);
  document.body.setAttribute('data-theme', tema);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(TEMA_PADRAO);

  const toggleTheme = () => setTheme((atual) => (atual === 'light' ? 'dark' : 'light'));

  // Ao abrir o site, recupera o tema salvo no navegador.
  useEffect(() => {
    const salvo = localStorage.getItem(CHAVE_STORAGE) || TEMA_PADRAO;
    setTheme(salvo);
    aplicarTema(salvo);
  }, []);

  // Sempre que o tema muda, aplica na página e salva.
  useEffect(() => {
    aplicarTema(theme);
    localStorage.setItem(CHAVE_STORAGE, theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

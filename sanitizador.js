/**
 * Módulo Sanitizador de Dados Pessoais
 */

const PADRAO_CPF = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;
const PADRAO_EMAIL = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;

/**
 * Substitui dados sensíveis por marcadores anónimos e retorna as evidências encontradas.
 * @param {string} texto 
 * @returns {{ textoSanitizado: string, evidencias: string[] }}
 */
export function sanitizarTexto(texto) {
  const evidencias = [];
  let textoSanitizado = texto;

  if (PADRAO_CPF.test(texto)) {
    textoSanitizado = textoSanitizado.replace(PADRAO_CPF, "***.***.***-**");
    evidencias.push("CPF detectado e anonimizado: <code>***.***.***-**</code>");
  }

  if (PADRAO_EMAIL.test(texto)) {
    textoSanitizado = textoSanitizado.replace(PADRAO_EMAIL, "***@***.***");
    evidencias.push("E-mail detectado e anonimizado: <code>***@***.***</code>");
  }

  return { textoSanitizado, evidencias };
}
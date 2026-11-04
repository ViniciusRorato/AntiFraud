# 🛡️ AntiFraud

Plataforma de identificação, prevenção e conscientização contra golpes e fraudes digitais. O projeto analisa textos, links, chaves Pix e números de telefone suspeitos, gerando diagnósticos de risco em tempo real e relatórios estruturados para denúncia oficial.

---

## 👥 Integrantes do Projeto

* Matheus Nhoato - 10738957
* Paulo Andrade - 10420708
* Arthur Murer - 10771457
* Vinicius Rorato - 10739419

---

## 🎯 Objetivo do Projeto

O **AntiFraud** foi desenvolvido com um duplo propósito:
1. **Social & Prático:** Proteger cidadãos e microempreendedores contra estelionato digital, oferecendo análise de risco e facilitação de denúncias.
2. **Técnico & Pedagógico:** Demonstrar a construção de uma mesma aplicação em duas abordagens distintas:
   * **Versão 1 (Vanilla):** Desenvolvida com HTML5, CSS3 e JavaScript puro (manipulação direta do DOM e funções utilitárias).
   * **Versão 2 (React):** Reescrita idêntica utilizando React (arquitetura baseada em componentes, gerenciamento de estado reativo e custom hooks).

---

## 🌐 Alinhamento aos Objetivos de Desenvolvimento Sustentável (ODS da ONU)

Este projeto integra diretrizes de impacto social alinhadas às metas da Agenda 2030 da ONU:

* **ODS 8 – Trabalho Decente e Crescimento Econômico (Meta 8.10):** Protege a renda familiar e de microempreendedores ao mitigar perdas financeiras por golpes digitais, promovendo um ambiente seguro para transações no ecossistema financeiro.
* **ODS 16 – Paz, Justiça e Instituições Eficazes (Meta 16.3):** Organiza e padroniza evidências colhidas (mensagens, links, chaves Pix) em um relatório formatado para facilitar a denúncia bancária e a emissão de Boletins de Ocorrência.
* **ODS 9 – Indústria, Inovação e Infraestrutura (Meta 9.c):** Promove a inclusão digital por meio de recursos de acessibilidade, como leitor de voz nativo e suporte ao Modo Claro/Escuro.

---

## ⚙️ Funcionalidades & Implementação em JavaScript

As funcionalidades descritas abaixo operam de forma dinâmica na aplicação para garantir análise, usabilidade e acessibilidade:

### 1. Simulador Educacional ("Jogo de Detecção de Golpes")
* **Descrição:** Gerencia uma dinâmica interativa em formato de cards onde o usuário analisa conversas, e-mails, boletos e mensagens reais para decidir se o conteúdo é *"Legítimo"* ou *"Golpe"*.
* **Comportamento:** Exibe uma pilha de cards estilizados, valida a escolha do usuário ao clicar no botão, contabiliza a pontuação em tempo real com explicação pedagógica imediata dos detalhes da fraude e calcula o nível final de *"Imunidade Digital"*.

### 2. Sanitizador e Protetor de Dados Pessoais (Privacidade)
* **Descrição:** Examina o conteúdo inserido na busca principal em busca de informações sensíveis da vítima antes do processamento.
* **Comportamento:** Substitui CPFs e e-mails por marcações anônimas para garantir que nenhuma informação pessoal seja exposta ou salva na base comunitária.

### 3. Motor de Análise Heurística e Validador de Links (Detecção)
* **Descrição:** Varre o texto inserido no analisador em busca de gatilhos mentais e examina a estrutura de URLs.
* **Comportamento:** Identifica palavras de pressão psicológica (*"urgente"*, *"bloqueio"*), promessas de vantagens irreais e analisa links verificando o uso de encurtadores, endereços IP diretos ou domínios falsos. Calcula uma pontuação total de risco ao final.

### 4. Atualizador Dinâmico da Interface (Painel de Risco)
* **Descrição:** Consome o resultado do motor de análise e atualiza os elementos visuais do painel na tela em tempo real.
* **Comportamento:** Modifica o gráfico do medidor, exibe a porcentagem exata de risco, altera dinamicamente as cores/etiquetas de severidade e lista os indicadores de fraude detectados.

### 5. Gerador de Relatório de Evidências (Para B.O.)
* **Descrição:** Coleta e estrutura os dados organizados da análise (data, hora, canal utilizado, chave Pix ou link suspeito e indicadores).
* **Comportamento:** Gera um documento formatado com as provas organizadas para que o usuário possa anexar ao registrar um Boletim de Ocorrência ou abrir uma contestação no banco.

### 6. Gerenciador de Tema Visual (Modo Claro / Modo Escuro)
* **Descrição:** Controla a aparência visual de toda a aplicação e a personalização do usuário.
* **Comportamento:** Altera as variáveis de cores no CSS, atualiza o ícone do botão de alternância e armazena a preferência no `localStorage` do navegador para manter o tema escolhido após recarregar a página.


RELATÓRIO DE ARQUITETURA E ADEQUAÇÃO TÉCNICA
Sistema de Detecção de Fraudes em Next.js (App Router) — Versão Atualizada

1. Sumário Executivo
Este relatório apresenta a documentação detalhada e a consolidação técnica referente às dúvidas e modificações solicitadas no projeto de Detecção de Fraudes. O sistema foi desenvolvido sobre o ecossistema Next.js utilizando a arquitetura App Router.
Nesta versão atualizada, além da centralização do consumo de dados via API REST (/api/casos), mapeamos e especificamos os componentes que realizam requisições HTTP dinâmicas para o carregamento dos casos de fraude.
2. Divisão de Responsabilidades (Cliente vs. Servidor)
A arquitetura Next.js App Router separa os componentes de acordo com o ambiente de execução. A tabela abaixo resume o papel de cada elemento do projeto:
Componente / Módulo	Ambiente	Responsabilidade & Função
app/api/casos/route.js	Server (Node.js)	Endpoint REST responsável por ler casos.json no servidor e servir a API HTTP.
app/layout.js, page.js, etc.	Server (SSR/SSG)	Estruturação das páginas principais e renderização inicial do HTML.
lib/ (analise, regras)	Server / Shared	Regras de negócio de análise de risco, validação e sanitização.
components/ (Game, RiskPanel)	Client (Browser)	Interatividade do usuário, manipulação de formulários e consumo da API via fetch.

3. Mapeamento das Rotas da Aplicação
As rotas ativas na aplicação seguem a convenção de pastas do Next.js:
•	Página Inicial (/): Localizada em app/page.js, responsável por apresentar o sistema e visões gerais.
•	Página do Jogo (/jogo): Localizada em app/jogo/page.js, contendo o simulador interativo antifraude.
•	Página ODS (/ods): Localizada em app/ods/page.js, cobrindo a relação do projeto com os Objetivos de Desenvolvimento Sustentável.
•	Endpoint de API (/api/casos): Localizado em app/api/casos/route.js, responsável por fornecer os dados JSON via requisição HTTP GET.
4. Componentes que Consomem a API via fetch
Para garantir o funcionamento 100% dinâmico sem importações estáticas diretas do JSON no lado do cliente, os seguintes componentes utilizam o método `fetch('/api/casos')`:
•	components/RiskPanel.js: Realiza a requisição assíncrona ao carregar a interface (useEffect) para obter a lista de casos e apresentar o painel de análise de risco atualizado.
•	app/jogo/page.js (ou componentes/Game.js): Busca os cenários de fraude via API para alimentar a mecânica do jogo interativo e dos testes de conhecimento do usuário.
5. Implementação da API e Exemplo de Consumo
Abaixo estão os trechos de código representativos das alterações efetuadas:
5.1 Rota de API (app/api/casos/route.js)
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'casos.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Erro ao ler casos.json:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar dados dos casos.' },
      { status: 500 }
    );
  }
}
5.2 Exemplo de Consumo no Cliente via fetch
'use client';

import { useEffect, useState } from 'react';

export default function RiskPanel() {
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCasos() {
      try {
        const res = await fetch('/api/casos');
        const data = await res.json();
        setCasos(data);
      } catch (err) {
        console.error('Erro ao carregar casos via API:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCasos();
  }, []);

  if (loading) return <p>Carregando dados via API...</p>;
  return <div>{/* Renderização dinâmica dos casos */}</div>;
}
6. Conclusão e Recomendações
Com a adição da seção dedicada aos componentes que utilizam `fetch`, o relatório agora reflete completamente toda a cadeia de dados da aplicação — desde a leitura no sistema de arquivos pelo servidor até a renderização interativa no cliente.


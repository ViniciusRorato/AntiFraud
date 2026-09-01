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

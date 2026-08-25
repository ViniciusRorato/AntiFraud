Matheus Nhoato
Paulo Andrade
Arthur Murer
Vinicius Rorato


# 🛡️ AntiFraud

Plataforma de identificação, prevenção e conscientização contra golpes e fraudes digitais. O projeto analisa textos, links, chaves Pix e números de telefone suspeitos, gerando diagnósticos de risco em tempo real e relatórios estruturados para denúncia oficial.

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

## ⚙️ Funcionalidades Principais & Implementação em JS

As seguintes funcionalidades estão presentes de forma idêntica em ambas as versões do projeto:

1. **Sanitização Automática de Dados:** Limpa dados pessoais sensíveis (CPFs e e-mails da vítima) do texto antes do processamento, garantindo a privacidade do usuário.
2. **Análise Heurística e de URLs:** Identifica padrões de pressão psicológica (*"urgente"*, *"bloqueio"*) e checa a segurança de links (domínios suspeitos, IP direto ou encurtadores).
3. **Painel Dinâmico de Risco:** Atualiza em tempo real a pontuação percentual de risco, a etiqueta de severidade e os indicadores detectados.
4. **Gerador de Relatório de Evidências:** Formata os dados analisados em um documento pronto para anexar em denúncias oficiais ou B.O.
5. **Leitor de Acessibilidade por Voz:** Utiliza a API `Web Speech` do navegador para ler o resultado da análise em áudio, auxiliando idosos ou pessoas com deficiência visual.
6. **Alternância de Tema (Light / Dark):** Permite alterar visualmente o tema da aplicação com persistência das preferências do usuário no `localStorage`.




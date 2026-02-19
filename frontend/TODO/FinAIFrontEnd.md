# ESPECIFICAÇÃO EXAUSTIVA DO AGENTE DE IA FRONTEND - FinAI

## 1. INTRODUÇÃO E VISÃO SISTÊMICA DA INTERFACE

O "Agente de IA Frontend" do FinAI transcende a definição tradicional de uma camada de apresentação. Ele é concebido como um **ecossistema inteligente de interação humana**, projetado para traduzir a aridez de um banco de dados relacional (PostgreSQL) de alta densidade em clareza financeira acionável. 

Atuando como o ponto de contato primário entre o usuário e seus ativos digitais, este agente frontend não apenas exibe dados; ele os contextualiza. Utilizando uma abordagem de **Clean UI** e **Atomic Design**, a interface é esculpida para mascarar a complexidade de centenas de registros transacionais, transformando-os em narratives visuais digestíveis. 

O sistema é preparado para um cenário de **Alta Carga de Dados**, onde usuários "power-users" podem possuir históricos com mais de 700 transações anuais. A interface deve manter a fluidez (60fps) e a responsividade (LCP < 2s) independentemente se acessada via um desktop workstation ou um dispositivo móvel em conexão 4G. Mais do que um dashboard financeiro, o front-end do FinAI é um consultor proativo que valida regras de negócio em tempo real, impedindo erros antes mesmo que eles cheguem ao servidor.

---

## 2. ARQUITETURA TÉCNICA E STACK DE DESENVOLVIMENTO

A fundação técnica do FinAI foi selecionada para suportar escalabilidade horizontal e manutenção de longo prazo.

### 2.1. Core Framework & React Ecosystem
- **Framework:** **React.js** (via Vite) é a escolha mandatória pela sua maturidade e eficiência no "Reconciliation Algorithm", crucial para atualizar gráficos em tempo real sem "jankiness".
- **Linguagem:** **TypeScript** (obrigatório) para garantir tipagem estática robusta (`User`, `Transaction`, `Goal`), prevenindo erros de runtime comuns em manipulação financeira (ex: tratar string como float).
- **Roteamento:** **React Router Dom (v6)**, implementando `Lazy Loading` para separar os módulos pesados (Dashboard, Charts) e otimizar o bundle inicial.

### 2.2. Estilização Modernista
- **Framework CSS:** **Tailwind CSS (v3+)**. A decisão pelo Tailwind elimina o overhead de arquivos `.css` legados e força a consistência visual através de tokens de design pré-definidos (ex: `bg-emerald-600` para receitas, `text-red-500` para despesas críticas).
- **Tema:** Suporte nativo a **Dark Mode** via classe `dark:`, respeitando a preferência do sistema operacional (`prefers-color-scheme`) e permitindo alternância manual (`ThemeContext`).

### 2.3. Camada de Comunicação (Networking & Security)
- **HTTP Client:** **Axios**, configurado como um Singleton (`src/services/api.ts`).
- **Endpoint:** O frontend deve apontar inequivocamente para o **IP Remoto Fixado** (`170.254.78.193`) no ambiente de desenvolvimento/teste ("Cenário A").
- **Segurança de Transporte:**
    - **Header Authorization:** Implementação de `Interceptors` no Axios que injetam automaticamente o token JWT (`Bearer <firebase_token>`) em *todas* as chamadas.
    - **Tratamento de Erros:** Middleware de resposta que intercepta códigos 401 (Unauthorized) para deslogar o usuário e 403 (Forbidden) para sugerir upgrade de plano.

### 2.4. Identidade e Acesso (IAM)
- **Provedor:** **Firebase Authentication**.
- **Chave Mestra:** O `firebaseUid` é a "Verdade Única" que conecta o frontend ao backend PostgreSQL.
- **Persistência:** `LocalPersistence` para manter o usuário logado entre sessões, mas forçando revalidação do token a cada hora.

---

## 3. MÓDULOS DETALHADOS E COMPONENTIZAÇÃO

A aplicação é dividida em módulos funcionais isolados, promovendo o princípio de "Single Responsibility".

### 3.1. O Módulo de Dashboard (Centro de Comando)
Localização: `src/pages/Dashboard.tsx`
O componente mais visualmente rico, responsável por agregar dados das 6 tabelas principais.

- **Cards de KPI (Key Performance Indicators):**
    - Componentes atômicos (`<StatCard />`) que exibem: Receita Total, Despesa Mensal, e Saldo Disponível.
    - **Regra de UI:** Valores negativos devem ser renderizados automaticamente em vermelho/rosa; positivos em verde/esmeralda.
- **Gráfico de Evolução (Time Series):**
    - Utiliza `Recharts` ou `Chart.js`.
    - Eixo X: Datas (agrupadas por dia ou semana).
    - Eixo Y: Valores monetários.
    - **Intelligence:** Deve projetar uma linha pontilhada de "Previsão" baseado nas Automações (`Automations` table) futuras.
- **Gráfico de Pizza (Categorias):**
    - Agrega transações por `categoryId`.
    - **Interatividade:** Ao clicar em uma fatia (ex: "Alimentação"), o sistema deve filtrar a tabela de transações abaixo para mostrar apenas esses gastos.

### 3.2. O Módulo de Transações (Gestão de Dados Brutos)
Localização: `src/pages/Transactions.tsx`
O "trabalhador pesado" do sistema.

- **Tabela Virtualizada:** Para lidar com 700+ registros, deve-se usar técnicas de "Windowing" (ex: `react-window`) para renderizar apenas o que está visível na tela.
- **Filtros Multifacetados:**
    - Dropdown de Mês/Ano (Busca no banco via `referenceMonth`).
    - Multi-select para Categorias.
    - Toggle para "Apenas Recorrentes".
- **Indicadores de IA (`<AiBadge />`):**
    - Ícone de "Robô" 🤖 azul para transações categorizadas automaticamente.
    - Ícone de "Alerta" ⚠️ amarelo para `aiConfidence < 0.70`, solicitando revisão humana.
- **Controle de Plano:**
    - O botão "Nova Transação" (`<FabButton />`) deve consultar o `AuthContext`. Se `user.planType === 'semente'` e `currentMonthTransCount >= 50`, o botão deve se tornar um gatilho para o Modal de Upgrade.

### 3.3. O Módulo de Metas (Gamificação)
Localização: `src/pages/Goals.tsx`
Focado em psicologia comportamental e recompensas visuais.

- **Barra de Progresso Dinâmica (`<ProgressBar />`):**
    - Renderiza `(currentAmount / targetAmount) * 100`.
    - Muda de cor conforme a proximidade: Vermelho (<25%), Amarelo (<75%), Verde (>75%).
    - Animação suave (CSS transition) ao carregar.
- **Calculadora de Aporte Reverso:**
    - Input: Data limite desejada.
    - Output: "Você precisa guardar R$ XXX,XX por mês". (Cálculo realizado no frontend para feedback instantâneo).

### 3.4. O Módulo de IA Chat (Agente Conversacional)
Localização: `src/pages/Chat.tsx` ou Widget Flutuante.

- **Interface de Mensageria:**
    - Estilo "WhatsApp Web".
    - Balões de mensagem alinhados (User à direita, AI à esquerda).
- **Contexto Financeiro:**
    - O frontend não envia apenas o texto. Ele deve (opcionalmente) empacotar um JSON com o "Resumo do Dashboard" para que a IA no backend tenha contexto imediato sem fazer query no banco.
- **Widgets de Resposta:**
    - A IA pode responder não só com texto, mas com componentes React renderizados (ex: `<GoalSuggestionCard />`).

---

## 4. REQUISITOS FUNCIONAIS DA INTERFACE (RF-UI)

- **RF-UI-01 (Conectividade):** O sistema deve possuir um "Circuit Breaker" visual. Se o Axios falhar em conectar ao IP `170.254.78.193` (Timeout > 5s), um Toast de erro ("Servidor Indisponível - Tentando Reconectar...") deve surgir.
- **RF-UI-02 (Diferenciação de Planos):**
    - Plano Semente: Vê anúncios ou banners de "Upgrade" em áreas bloqueadas.
    - Plano Colheita: UI limpa, sem banners, acesso total a temas "Gold".
- **RF-UI-03 (Tematização):** A troca de tema deve persistir no `localStorage` para que a preferência do usuário seja lembrada na próxima visita.
- **RF-UI-04 (Feedback de Processamento):**
    - Ao criar uma transação, o botão "Salvar" deve mostrar um `Spinner` e ficar `disabled`.
    - Categorização de IA deve mostrar um status "Analisando..." efêmero na tabela.
- **RF-UI-05 (Sanitização):** Inputs de valor monetário devem usar máscaras (ex: `react-currency-input-field`) para garantir que o backend receba Floats limpos (ex: envia `1250.00` em vez de `"R$ 1.250,00"`).

---

## 5. REQUISITOS NÃO FUNCIONAIS DA INTERFACE (RNF-UI)

- **RNF-UI-01 (Performance Web Vitals):**
    - Largest Contentful Paint (LCP): < 2.0s.
    - Cumulative Layout Shift (CLS): < 0.1 (Evitar que gráficos "pulem" ao carregar).
- **RNF-UI-02 (Responsividade Extrema):**
    - **Mobile First:** O layout de colunas do Dashboard (Grid) deve virar Pilha (Flex-col) em telas < 768px.
    - **Touch Targets:** Botões em mobile devem ter área de toque mínima de 44x44px.
- **RNF-UI-03 (Gestão de Estado Efficiente):**
    - Utilizar `React Context API` para dados globais leves (Auth, Theme).
    - Utilizar `React Query` (TanStack Query) ou similar para cachear as requisições do Dashboard, evitando refetching desnecessário ao navegar entre abas.
- **RNF-UI-04 (Acessibilidade - a11y):**
    - Contraste de cores (texto cinza sobre fundo branco) deve passar no teste WCAG AA.
    - Todos os inputs de formulário devem ter `<label>` associados ou `aria-label`.

---

## 6. LÓGICA DE NEGÓCIO NO FRONTEND (CLIENT-SIDE RULES)

Embora o Backend seja a autoridade final, o Frontend deve atuar como "Guardião da UX", prevenindo requisições fadadas ao fracasso.

1.  **Trava de Limite de Mensagens (Rate Limiting UI):**
    - Antes de enviar mensagem ao Chat, verificar `user.dailyChatCount`.
    - Se `>= 5` e `planType == 'semente'`, bloquear input e exibir *Call-to-Action* para upgrade.
2.  **Validação Temporal:**
    - Transações futuras: Permitir apenas se o status for "Agendado". Se o status for "Realizado", a data não pode ser > `Date.now()`.
3.  **Saldo em Risco:**
    - Ao digitar o valor de uma nova despesa, se `valor > saldo_atual`, exibir um alerta visual sutil ("Atenção: Isso deixará sua conta no negativo") próximo ao input.
4.  **Meta Cumprida:**
    - Se o usuário editar o `currentAmount` de uma meta e atingir 100%, disparar uma animação de confetes (biblioteca `canvas-confetti`) para reforço positivo.

---

## 7. INTEGRAÇÃO COM O BACKEND (FLUXO DE DADOS)

O frontend não acessa o banco diretamente. Ele conversa com a API RESTful Node.js.

### 7.1. Camada de Serviço (`src/services/`)
- `authService.ts`: Login, Logout, Refresh Token.
- `transactionService.ts`: GET (list), POST (create), PUT (update), DELETE.
- `dashboardService.ts`: Endpoint agregado `/summary` para puxar KPIs de uma só vez.

### 7.2. Estratégia de Sincronização
- **Optimistic UI Updates:** Ao deletar uma transação, removê-la da lista visual *imediatamente* antes mesmo do servidor confirmar, para dar sensação de instantaneidade. Se o servidor falhar, reverter a operação e avisar o usuário.
- **Polling Inteligente:** O widget de "Status da Automação" deve fazer polling a cada 30s para verificar se o **n8n** ou o **cron job** do backend processou novas recorrências.

---

## 8. DESIGN DE EXPERIÊNCIA (UX/UI)

A filosofia é "O design não deve atrapalhar os dados".

- **Empty States:** Não mostrar telas brancas. Se não houver metas, mostrar uma ilustração de um "Cofre Vazio" com um botão "Criar meu primeiro objetivo".
- **Skeleton Screens:** Durante o carregamento dos dados do Dashboard, exibir "retângulos cinzas pulsantes" (Skeletons) mantendo o layout estrutural, evitando que a tela "pule" quando os gráficos aparecerem.
- **Feedback Tátil/Visual:**
    - Hover effects em linhas da tabela.
    - Ripple effect em botões (padrão Material/Tailwind).

---

## 9. CONCLUSÃO E PREPARO PARA O FUTURO

Esta especificação define o **estado da arte** para o frontend do FinAI. Ela não apenas atende aos requisitos funcionais imediatos, mas prepara o terreno para escalabilidade massiva. A separação clara entre "Lógica de Apresentação" e "Lógica de Negócio" (via Hooks e Contextos) garante que o código permaneça manutenível, testável e pronto para receber novas features de IA conforme o projeto evolui para sua versão de TCC e mercado.

# Documentação de Requisitos e Planejamento Frontend - FinAI

> **Status do Documento:** Em Planejamento / Desenvolvimento Ativo
> **Tecnologias:** React.js (Vite), Tailwind CSS, Firebase Auth, Axios
> **Backend Alvo:** Node.js (Express/Sequelize/PostgreSQL) - IP Remoto Fixado

---

## 1. Visão Geral e Arquitetura

O frontend do FinAI é uma aplicação Single Page Application (SPA) moderna, focada em performance e usabilidade ("Clean UI"). O objetivo é fornecer uma interface fluida para gestão financeira pessoal, com diferenciação clara entre níveis de planos (Semente, Florescer, Colheita).

### 1.1. Tecnologias Obrigatórias
- **Core:** React.js (via Vite) + TypeScript (Recomendado pela robustez).
- **Estilização:** Tailwind CSS (v3+) para design system, modo escuro nativo e responsividade.
- **Autenticação:** Firebase Authentication (Google/Email). O `firebaseUid` é a chave mestra.
- **HTTP Client:** Axios. Todas as requisições devem conter o Header `Authorization: Bearer <token>`.
- **Rotas:** React Router Dom (v6+).
- **Ícones:** Phosphor Icons ou Material Symbols (via biblioteca react-icons).
- **Gráficos:** Recharts ou Chart.js (Leve e customizável).

### 1.2. Arquitetura de Pastas Esperada
```
src/
├── components/         # Componentes Reutilizáveis (Botões, Inputs, Cards)
│   ├── ui/             # Componentes de Design System (Atômicos)
│   ├── business/       # Componentes de Negócio (TransactionTable, GoalCard)
│   └── layout/         # Sidebar, Header, MainLayout
├── contexts/           # Gestão de Estado Global
│   ├── AuthContext.tsx # Contexto de Autenticação e Permissões do Usuário
│   └── ThemeContext.tsx# (Opcional) Se não usar dark mode via OS
├── hooks/              # Custom Hooks (useTransactions, useAuth)
├── pages/              # Páginas da Aplicação (Rotas)
├── services/           # Comunicação com Backend
│   ├── api.ts          # Instância do Axios configurada
│   └── textService.ts  # Tratamento de textos/formatadores
├── styles/             # CSS Global (Tailwind directives)
└── utils/              # Funções auxiliares (formatCurrency, formatDate)
```

---

## 2. Requisitos Funcionais (RF) e Implementação

### RF01 - Autenticação e Segurança
**Regra de Negócio:** O sistema só é acessível a usuários autenticados via Firebase.
- [ ] **Contexto Global (`AuthContext`):**
    - Deve monitorar o estado do Firebase (`onAuthStateChanged`).
    - Deve buscar os dados do usuário no Backend (`/api/auth/me`) logo após o login para obter o `planType`, `role` e `photoURL`.
    - Deve fornecer métodos `login`, `logout` e `register`.
    - **FALTA:** Implementar o arquivo `src/contexts/AuthContext.tsx` que hoje não existe.
- [x] **Página de Login:** Já existe (`src/pages/Login.tsx`), mas precisa ser integrada ao `AuthContext` real.
- [ ] **Proteção de Rotas:** Criar componente `PrivateRoute` que redireciona para `/login` se não houver usuário.

### RF02 - Painel de Controle (Dashboard) (`src/pages/Dashboard.tsx`)
**Regra de Negócio:** Visão panorâmica da saúde financeira.
- [x] **Layout Básico:** Arquivo existe com estrutura HTML.
- [ ] **Integração Backend:**
    - Substituir dados *mockados* (fictícios) por chamadas reais ao endpoint `/api/dashboard/summary`.
    - Exibir: Saldo Total, Receitas do Mês, Despesas do Mês.
- [ ] **Gráficos:**
    - Implementar gráfico de **Pizza** (Despesas por Categoria).
    - Implementar gráfico de **Barras** (Receita x Despesa nos últimos 6 meses).
- [ ] **Links Rápidos:** Botões para "Nova Transação" e "Ver Metas".

### RF03 - Gestão de Transações (`src/pages/Transactions.tsx`)
**Regra de Negócio:** O coração da operação. Permite CRUD completo.
- [x] **Tabela de Listagem:** Arquivo existe.
- [ ] **Filtros Avançados:**
    - **Mês/Ano:** Dropdown para selecionar o período (padrão: mês atual).
    - **Categoria:** Filtro múltiplo.
    - **Tipo:** Receita / Despesa.
- [ ] **Indicador de IA:**
    - Exibir ícone/badge especial se `isAutoCategorized === true`.
    - Se `aiConfidence < 0.70`, destacar a linha em amarelo (Alerta de revisão).
- [ ] **Ações:**
    - Botão de Editar (Abre Modal).
    - Botão de Excluir (Com confirmação).
    - **Bloqueio de Plano:** Se o usuário `Semente` tentar criar a 51ª transação do mês, o botão "Nova Transação" deve ficar desabilitado ou abrir um modal de Upgrade.

### RF04 e RF05 - Consultoria via Chat IA
**Regra de Negócio:** Interface conversacional tipo WhatsApp/ChatGPT.
- [ ] **Componente de Chat (`src/pages/Chat.tsx` ou Modal Global):**
    - **Histórico:** Carregar mensagens anteriores da tabela `AiMessages`.
    - **Input:** Campo de texto simples.
    - **Feedback Visual:** "IA digitando..." enquanto aguarda a resposta do Backend.
- [ ] **Limites:**
    - Validar no frontend se `dailyChatCount < limite` antes de deixar enviar.
- [ ] **Renderização Rica:**
    - A IA pode responder com Markdown ou "Widgets" (ex: "Aqui está o gráfico da sua meta"). O frontend deve estar preparado para renderizar isso.

### RF06 - Gestão de Metas (`src/pages/Goals.tsx`)
**Regra de Negócio:** Gamificação da economia.
- [ ] **Visualização em Cards:**
    - Cada meta é um Card.
    - Barra de progresso animada (`currentAmount / targetAmount`).
    - Exibir: "Faltam R$ X" e "Prazo: DD/MM/AAAA".
- [ ] **Criação/Edição:** Modal para definir valor alvo e prazo.

### RF07 - Automação e Recorrência
- [ ] **Listagem:** Similar à de transações, mas mostra a `frequency` (Mensal/Semanal).
- [ ] **Status:** Toggle (Switch) para ativar/desativar a automação (campo `isActive`).

---

## 3. Integração com Backend (API Service)

Devido ao cenário de desenvolvimento (Backend Remoto), o Axios deve ser configurado com precisão.

### Arquivo Alvo: `src/services/api.ts`
```typescript
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const api = axios.create({
  baseURL: 'http://170.254.78.193:3000/api', // IP FIXO DO SERVIDOR
  timeout: 10000,
});

// Interceptor para injetar o Token
api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;
```

---

## 4. Regras de Negócio no Frontend (Lógica de Planos)

O Frontend deve ser "consciente" do plano do usuário para melhorar a UX (não deixar o usuário clicar em algo que vai dar erro 403).

| Funcionalidade | Plano Semente 🌱 | Plano Florescer 🌻 | Plano Colheita 🌾 |
| :--- | :--- | :--- | :--- |
| **Transações/mês** | Max 50 | Ilimitado | Ilimitado |
| **Chat IA/dia** | Max 5 | Max 20 | Ilimitado |
| **Automações** | Max 2 | Max 10 | Ilimitado |
| **Temas** | Somente Light | Light/Dark | Todos (Custom) |

**Implementação Sugerida:**
Criar um Hook `usePlanLimits()`:
```typescript
const { canAddTransaction, canSendMessage, checks } = usePlanLimits();
if (!canAddTransaction) { return <UpgradeModal />; }
```

---

## 5. UI/UX e Design System

- **Paleta de Cores (Tailwind):**
    - Primária: Tons de Verde/Emerald (`bg-emerald-600`) para remeter a dinheiro e crescimento.
    - Fundo Dark: `bg-slate-900` ou `bg-gray-950`.
    - Cartões: `bg-white` (Light) e `bg-slate-800` (Dark) com sombras suaves (`shadow-lg`).
- **Feedback:**
    - **Toasts:** Usar biblioteca (ex: `react-hot-toast`) para avisos de "Sucesso" ou "Erro".
    - **Loaders:** Skeletons (esqueletos) enquanto os dados carregam, nunca telas brancas vazias.

---

## 6. Lista de Tarefas (TODO) - Ordem de Prioridade

### Fase 1: Fundação (Essencial)
- [ ] Configurar `src/services/api.ts` com o IP do servidor.
- [ ] Implementar `src/contexts/AuthContext.tsx` completo.
- [ ] Proteger as rotas no `App.tsx` com `<PrivateRoute />`.
- [ ] Criar Hook global de estado do usuário (`useAuth`).

### Fase 2: Funcionalidade Core
- [ ] Conectar **Dashboard** aos endpoints reais.
- [ ] Implementar **CRUD de Transações** com Axios.
- [ ] Implementar validação visual de **Limites do Plano**.

### Fase 3: Inteligência e Extras
- [ ] Criar interface de **Chat com IA**.
- [ ] Implementar página de **Metas** com barras de progresso.
- [ ] refinar **Modo Escuro** e transições.

Este documento deve ser usado como guia mestre para o desenvolvimento do Frontend. Qualquer dúvida sobre regra de negócio deve ser tirada consultando a seção 4 e o Schema do banco de dados.

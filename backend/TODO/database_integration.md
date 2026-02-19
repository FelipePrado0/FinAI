# Checklist de Integração com Banco de Dados

Este documento lista as tarefas necessárias para fazer o código Backend (Node.js) "conversar" com o Banco de Dados (PostgreSQL) que já estruturamos.

## 1. Criação dos Models (Sequelize)
Os Models são a representação das tabelas no código. Precisamos criar um arquivo para cada tabela na pasta `src/models`.

- [ ] **User.js**
  - [ ] Campos: `firebaseUid`, `email`, `name`, `photoURL`, `role`, `planType`, `monthlyIncome`, `payDay`, `currency`, `theme`, contadores.
  - [ ] Associações: `hasMany` (Transactions, Categories, Automations, Goals, AiChats).

- [ ] **Category.js**
  - [ ] Campos: `name`, `icon`, `color`, `type`.
  - [ ] Associações: `belongsTo` (User), `hasMany` (Transactions, Automations).

- [ ] **Automation.js**
  - [ ] Campos: `description`, `amount`, `type`, `frequency`, `nextExecutionDate`, `isActive`.
  - [ ] Associações: `belongsTo` (User), `hasMany` (Transactions).

- [ ] **Goal.js**
  - [ ] Campos: `name`, `targetAmount`, `currentAmount`, `monthlyContribution`, `deadline`, `status`.
  - [ ] Associações: `belongsTo` (User), `hasMany` (Transactions).

- [ ] **Transaction.js**
  - [ ] Campos: `description`, `amount`, `type`, `date`, `isAutoCategorized`, `aiConfidence`.
  - [ ] Campo Calculado: `referenceMonth` (se suportado pelo ORM/Driver, senão tratado na query/trigger).
  - [ ] Associações: `belongsTo` (User, Category, Automation, Goal).

- [ ] **AiChat.js** & **AiMessage.js**
  - [ ] Campos para histórico do chat.
  - [ ] Associações entre si e com User.

- [ ] **AiPrompt.js**
  - [ ] Configurações de System Prompt.

## 2. Criação dos Controllers (Lógica da API)
Os Controllers usam os Models para buscar/salvar dados e enviar para o Frontend.

- [ ] **DashboardController.js**
  - [ ] `getSummary`: Saldo total, Receitas vs Despesas (usando Models e somatórios).
  - [ ] `getRecentTransactions`: Listar últimas 5 transações.
  - [ ] `getCategoryBreakdown`: Agrupar gastos por categoria (para o gráfico).

- [ ] **TransactionController.js**
  - [ ] `list`: Com filtros (mês, categoria, busca).
  - [ ] `create`: Inserir nova transação (gatilhos do banco atualizam o resto).
  - [ ] `update/delete`.

- [ ] **GoalController.js**
  - [ ] CRUD de Metas.

- [ ] **AutomationController.js**
  - [ ] CRUD de Automações.

- [ ] **AiController.js**
  - [ ] Gerenciar histórico de chat.
  - [ ] Integração com n8n (futuro).

## 3. Rotas (API Endpoints)
- [ ] Atualizar `src/routes/index.js` para apontar para esses novos Controllers.

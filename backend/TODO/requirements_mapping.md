# Mapeamento de Requisitos e Regras de Negócio (RF/RN)
(Alinhado com o Projeto FinAI)

Este documento mapeia as Regras de Negócio e Requisitos Funcionais para as tarefas de implementação no Backend.

## 1. Criação dos Models (Sequelize)
Refletem o Schema e suportam os requisitos de dados.

- [ ] **User.js** (RF01, RF08)
  - [ ] Campos: `id`, `firebaseUid`, `email`, `role`, `planType`, `monthlyIncome`, `payDay`, contadores (`currentMonthTransCount`, `dailyChatCount`).
  - [ ] Associações: `hasMany` (todas as outras entidades).

- [ ] **Category.js** (RF04)
  - [ ] Campos: `name`, `icon`, `color`, `type`.

- [ ] **Automation.js** (RF07, RN05)
  - [ ] Campos: `description`, `amount`, `frequency`, `nextExecutionDate`, `isActive`.

- [ ] **Goal.js** (RF06, RN03)
  - [ ] Campos: `targetAmount`, `currentAmount`, `deadline`.
  - [ ] Regra: ON DELETE CASCADE na relação com User, mas nas Transações o DB já garante `SET NULL` (RN03).

- [ ] **Transaction.js** (RF03, RN02, RN04)
  - [ ] Campos: `amount`, `type`, `date`, `isAutoCategorized`, `aiConfidence` (RN04: < 0.70 flag).
  - [ ] Campo Calculado: `referenceMonth` (RNF02 - Performance).

- [ ] **AiChat.js** & **AiMessage.js** (RF05)
  - [ ] Histórico de chat para contexto da IA.

## 2. Criação dos Controllers & Services (Lógica da API)
Onde as Regras de Negócio (RN) são validadas.

- [ ] **AuthController.js** (RF01)
  - [ ] `register`: Criar usuário já com `planType = 'semente'` (Padrão do banco).

- [ ] **DashboardController.js** (RF02)
  - [ ] `getSummary`: Usar queries otimizadas para calcular Saldo (RN02).
  - [ ] `getGoalsProgress`: Retornar status das metas.

- [ ] **TransactionController.js** (RF03, RN01, RN02, RN04)
  - [ ] `create`: 
    - [ ] **Validação RN01**: Verificar `planType` e `currentMonthTransCount`. Se Semente e > 50, bloquear.
    - [ ] Gatilho do Banco (`trg_increment_trans_count`) incrementa contador automaticamente.
    - [ ] Gatilho do Banco (`trg_update_goal_amount`) atualiza metas automaticamente.

- [ ] **AutomationService.js** (RF07, RN05)
  - [ ] `processDueAutomations`: Cron job (ou rota chamada pelo n8n) para gerar transações.
  - [ ] **Lógica RN05**: Ao processar, calcular `nextExecutionDate` (+30 dias ou +1 mês).

- [ ] **AiController.js** (RF05, RN01)
  - [ ] `sendMessage`:
    - [ ] **Validação RN01**: Verificar `dailyChatCount`. Se Semente e > 5, bloquear.
    - [ ] Salvar mensagens em `AiMessages`.

## 3. Segurança & Performance (RNF)
- [ ] **Indices (RNF02)**: Já criados no Schema (`idx_transactions_user_month`, etc).
- [ ] **Segurança (RNF01)**: Validação do Token Firebase em todas as rotas protegidas (`authMiddleware`).

## 4. Rotas
- [ ] Atualizar `src/routes.js` conectando os Controllers.

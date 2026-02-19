# ESPECIFICAÇÃO EXAUSTIVA DO AGENTE DE IA BACKEND - FinAI

## 1. O NÚCLEO PROCESSADOR E A FILOSOFIA DE ENGENHARIA

O "Agente de IA Backend" do FinAI transcende a função de um servidor de API convencional. Ele opera como uma **Engine de Processamento Lógico-Financeiro**, hospedada em um ambiente Linux (Ubuntu Server) otimizado para alta disponibilidade. Sua filosofia central é baseada em dois pilares: **Integridade Absoluta** (ACID Compliance) e **Análise Preditiva**.

Num ecossistema onde a confiança é a moeda principal, este backend atua como o **validador supremo** de todas as regras de negócio. Ele não confia no frontend; cada requisição é auditada, cada token decodificado e cada limite de plano (Semente, Florescer, Colheita) verificado antes de qualquer persistência de dados.

Construído sobre o runtime **Node.js LTS**, o sistema aproveita a arquitetura *Event-Driven* e *Non-Blocking I/O* para gerenciar milhares de conexões simultâneas (Cenário de 2026) com baixo consumo de hardware, garantindo que a transição entre estados de assinatura e a execução de automações massivas ocorra sem "race conditions".

---

## 2. INFRAESTRUTURA E SEGURANÇA (CENÁRIO A - HÍBRIDO)

A infraestrutura opera no modelo "Cenário A": uma arquitetura distribuída onde o servidor físico reside localmente (IP `170.254.78.193`), mas serve aplicações globais via túneis seguros.

### 2.1. Camada de Rede e Acesso
- **PostgreSQL Exposto:** Configurado para escutar em `0.0.0.0/0` (`listen_addresses = '*'`), permitindo conexões diretas do ambiente de desenvolvimento.
- **Firewall (UFW):** Regras estritas permitindo tráfego TCP nas portas:
    - `5432` (PostgreSQL - Acesso Restrito por IP/VPC).
    - `3000` (API Node.js).
    - `80/443` (Reservado para Nginx Reverse Proxy).
- **Autenticação de Banco (HBA):** O arquivo `pg_hba.conf` força o uso de **SCRAM-SHA-256** para o usuário `finai_admin`, anulando vetores de ataque por *Sniffing* ou *Brute-force* em senhas legadas (MD5).

### 2.2. Segurança da Aplicação
- **Autenticação:** Validação de JWT (JSON Web Tokens) via **Firebase Admin SDK**. O backend não gerencia senhas, apenas valida a assinatura criptográfica do Google.
- **Variáveis de Ambiente:** Gestão via biblioteca `dotenv`, garantindo que credenciais sensíveis (`DB_PASS`, `FIREBASE_PRIVATE_KEY`) nunca sejam commitadas no código-fonte.
- **Sanitização:** Uso do ORM **Sequelize** para prevenir 100% de ataques de *SQL Injection* através de *Parameterized Queries*.

---

## 3. A ARQUITETURA DE DADOS (O ECOSSISTEMA DAS 8 TABELAS)

O esquema relacional é normalizado (3NF) e enriquecido com funcionalidades avançadas do PostgreSQL (Triggers, Stored Procedures).

### 3.1. Tabela Users: O Guardião da Identidade
- **Chave Mestra:** `firebaseUid` (Indexed, Unique).
- **Controle de Planos:** Campos `planType` ('semente', 'florescer', 'colheita') e contadores (`currentMonthTransCount`, `dailyChatCount`) são a base para a lógica de monetização.
- **Reset Automático:** Campo `lastResetDate` usado por jobs noturnos para zerar contadores.

### 3.2. Tabela Transactions: O Grande Livro Razão
- **Volume:** Projetada para suportar milhões de registros (Partitioning por data planejado para V2).
- **Performance:** Coluna Calculada `referenceMonth` (`GENERATED ALWAYS AS ... STORED`) cria um índice físico virtual para consultas de dashboard instantâneas.
- **Inteligência:** Campos `isAutoCategorized` e `aiConfidence` rastreiam a eficácia da IA.
- **Triggers:**
    - `trg_increment_trans_count`: Incrementa o contador do usuário a cada INSERT.
    - `trg_update_goal_amount`: Atualiza o saldo da meta automaticamente.

### 3.3. Tabela Goals: O Motor de Gamificação
- **Integridade:** Uso de `ON DELETE SET NULL` nas transações. Se a meta for apagada, o histórico financeiro permanece, apenas desvinculado.
- **Lógica:** Campo `currentAmount` é atualizado em tempo real pelo banco, garantindo que o progresso exibido no frontend seja atômico e consistente.

### 3.4. Tabela Automations: A Máquina de Recorrência
- **Proatividade:** Campo `nextExecutionDate` é monitorado por um *Cron Service*.
- **Eficiência:** Ao executar, o sistema clona os dados para `Transactions` e recalcula a próxima data (Lógica +30 dias ou mesmo dia do próximo mês).

### 3.5. Tabela Categories: Taxonomia Personalizada
- **Flexibilidade:** Permite que cada usuário tenha sua própria árvore de categorias, além das padrões do sistema.

### 3.6. Tabelas AiChats & AiMessages: Memória Contextual Longa
- **Estrutura:** Relacionamento 1:N entre Users -> Chats -> Messages.
- **Persistência:** O backend armazena o histórico completo para permitir que o LLM (Large Language Model) tenha "memória" de conversas passadas.

### 3.7. Tabela AiPrompts: Configuração Dinâmica
- **Inovação:** Armazena "System Prompts" (ex: "Seja um consultor conservador"). Permite ajustar a personalidade da IA sem redeploy da aplicação.

---

## 4. REQUISITOS FUNCIONAIS DO BACKEND (RF-BE)

### RF-BE-01 - Validação de Limites (Gatekeeper)
Antes de persistir uma transação, o middleware `PlanLimitMiddleware` deve:
1. Ler o `planType` do `req.user`.
2. Comparar `currentMonthTransCount` com a constante do plano.
3. Se excedido, retornar `403 Forbidden` com payload `{ code: 'UPGRADE_REQUIRED' }`.

### RF-BE-02 - Automação de Categorização (AI Pipeline)
Ao receber uma transação sem categoria:
1. Buscar no histórico do usuário se já existe descrição similar (Cache L1).
2. Se não, enviar para API de NLP (OpenAI/n8n) para classificação.
3. Se `confidence < 0.70`, marcar flag `review_needed`.

### RF-BE-03 - Gestão de Saldo (Aggregator)
Endpoint `/dashboard/summary` deve executar uma única *Query Otimizada* (usando `SUM` e `CASE WHEN`) para retornar:
- Receita Total
- Despesa Total
- Saldo Líquido
*Tempo alvo: < 50ms.*

### RF-BE-04 - Sincronização Firebase
Todo Request deve passar pelo `AuthMiddleware`:
1. Extrair Token do Header `Authorization`.
2. `admin.auth().verifyIdToken(token)`.
3. Injetar objeto `user` (com ID do banco) no `req`.

---

## 5. REQUISITOS NÃO FUNCIONAIS DO BACKEND (RNF-BE)

- **RNF-BE-01 (Conectividade):** O serviço deve manter conexão estável com o PostgreSQL remoto, com retentativas automáticas (Exponential Backoff) em caso de queda de link.
- **RNF-BE-02 (Escalabilidade Vertical):** Uso de **Connection Pooling** (`pg-pool`) configurado para max 20 clientes, otimizando o uso de RAM do servidor modesto.
- **RNF-BE-03 (Observabilidade):** Logs estruturados (JSON) para todas as falhas críticas (Erros 500) e tentativas de violação de acesso.
- **RNF-BE-04 (Performance):** Indices B-Tree criados cobrindo todas as chaves estrangeiras (`userId`, `categoryId`) e campos de filtro (`date`, `type`).

---

## 6. REGRAS DE NEGÓCIO E LÓGICA DO "CÉREBRO" (RN)

### RN01 - A Regra do Plano Semente
> "Quem planta pouco, colhe limitado."
Se usuário == Semente:
- Max 50 Transações/mês.
- Max 5 Mensagens IA/dia.
- Sem acesso a temas customizados (Backend ignora campo `theme` no update).

### RN02 - Saldo e Prioridade
O cálculo de saldo deve sempre considerar a data. Transações futuras ("Agendadas") não compõem o saldo atual ("Disponível"), mas compõem o saldo "Projetado".

### RN03 - Upgrade Trigger
O backend deve monitorar a utilização. Se `currentMonthTransCount` atingir 90% do limite, incluir header `X-FinAI-Alert: approaching_limit` na resposta.

---

## 7. INTEGRAÇÃO E ENDPOINTS (API ARCHITECTURE)

A API segue o padrão RESTful estrito, com respostas JSON envelopadas:

### Estrutura de Resposta Padrão
```json
{
  "success": true,
  "data": { ... },
  "meta": { "timestamp": "...", "version": "1.0" }
}
```

### Endpoints Chave
- `POST /api/transactions`: Criação com trigger de categorização.
- `GET /api/dashboard`: Aggregation service.
- `POST /api/ai/chat`: Interface com LLM, grava histórico e incrementa contador.
- `GET /api/automations/due`: Endpoint interno para o Cron Job verificar recorrências.

---

## 8. CONCLUSÃO TÉCNICA

Este documento define o **Agente de IA Backend** do FinAI como uma peça de engenharia robusta, preparada para o futuro. A decisão de mover a lógica de negócios pesada (Triggers, Counts) para o Banco de Dados libera o Node.js para fazer o que faz de melhor: gerenciar I/O e orquestrar integrações. Com a estrutura de 8 tabelas (incluindo `AiPrompts`), o sistema está pronto não apenas para registrar gastos, mas para entender o comportamento financeiro do usuário e guiá-lo ativamente rumo à prosperidade.

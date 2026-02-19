-- FINAL FINAI DATABASE SCHEMA (Advanced)
-- Includes Triggers, Generated Columns, and AI Configuration

-- 1. USERS (Usuários)
CREATE TABLE IF NOT EXISTS "Users" (
    "id" SERIAL PRIMARY KEY,
    "firebaseUid" VARCHAR(255) NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "name" VARCHAR(255),
    "photoURL" VARCHAR(255),
    "role" VARCHAR(50) DEFAULT 'user',
    
    -- Financial Profile
    "monthlyIncome" DECIMAL(10, 2) DEFAULT 0.00,
    "payDay" INTEGER CHECK ("payDay" BETWEEN 1 AND 31),
    "currency" VARCHAR(10) DEFAULT 'BRL',
    "theme" VARCHAR(20) DEFAULT 'system',
    
    -- Subscription & Usage Limits
    "planType" VARCHAR(20) DEFAULT 'semente', -- 'semente', 'florescer', 'colheita'
    "currentMonthTransCount" INTEGER DEFAULT 0, -- Updated via Trigger
    "dailyChatCount" INTEGER DEFAULT 0,
    "lastResetDate" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORIES (Categorias)
CREATE TABLE IF NOT EXISTS "Categories" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES "Users" ("id") ON DELETE CASCADE,
    "name" VARCHAR(100) NOT NULL,
    "icon" VARCHAR(100),
    "color" VARCHAR(20),
    "type" VARCHAR(20) NOT NULL CHECK ("type" IN ('income', 'expense')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. AUTOMATIONS (Automações Recorrentes)
CREATE TABLE IF NOT EXISTS "Automations" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "Users" ("id") ON DELETE CASCADE,
    "categoryId" INTEGER REFERENCES "Categories" ("id"),
    "description" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10, 2) NOT NULL,
    "type" VARCHAR(20) NOT NULL CHECK ("type" IN ('income', 'expense')),
    "frequency" VARCHAR(50) NOT NULL,
    "nextExecutionDate" DATE,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. GOALS (Metas)
CREATE TABLE IF NOT EXISTS "Goals" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "Users" ("id") ON DELETE CASCADE,
    "name" VARCHAR(255) NOT NULL,
    "targetAmount" DECIMAL(12, 2) NOT NULL,
    "currentAmount" DECIMAL(12, 2) DEFAULT 0.00, -- Updated via Trigger
    "monthlyContribution" DECIMAL(10, 2),
    "deadline" DATE,
    "status" VARCHAR(50) DEFAULT 'in_progress',
    "icon" VARCHAR(50),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TRANSACTIONS (Transações)
CREATE TABLE IF NOT EXISTS "Transactions" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "Users" ("id") ON DELETE CASCADE,
    "categoryId" INTEGER REFERENCES "Categories" ("id"),
    "automationId" INTEGER REFERENCES "Automations" ("id"),
    "goalId" INTEGER REFERENCES "Goals" ("id") ON DELETE SET NULL,
    "description" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10, 2) NOT NULL,
    "type" VARCHAR(20) NOT NULL CHECK ("type" IN ('income', 'expense')),
    "date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Performance Optimization: Reference Month (YYYY-MM)
    -- Requires PostgreSQL 12+ for GENERATED ALWAYS
    "referenceMonth" VARCHAR(7) GENERATED ALWAYS AS (TO_CHAR("date", 'YYYY-MM')) STORED,
    
    "isAutoCategorized" BOOLEAN DEFAULT FALSE,
    "aiConfidence" DECIMAL(3, 2),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. AI CHATS (IA Consultor)
CREATE TABLE IF NOT EXISTS "AiChats" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "Users" ("id") ON DELETE CASCADE,
    "title" VARCHAR(255) DEFAULT 'Nova Conversa',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. AI MESSAGES (Mensagens)
CREATE TABLE IF NOT EXISTS "AiMessages" (
    "id" SERIAL PRIMARY KEY,
    "chatId" INTEGER NOT NULL REFERENCES "AiChats" ("id") ON DELETE CASCADE,
    "role" VARCHAR(20) NOT NULL CHECK ("role" IN ('user', 'assistant', 'system')),
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. AI PROMPTS (Configuração de IA) - New!
-- Store System Prompts to adjust AI personality dynamically
CREATE TABLE IF NOT EXISTS "AiPrompts" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE, -- e.g., 'financial_advisor_angry', 'financial_advisor_supportive'
    "prompt" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX idx_transactions_user_month ON "Transactions"("userId", "referenceMonth"); -- Optimized for Dashboards
CREATE INDEX idx_transactions_goal ON "Transactions"("goalId");
CREATE INDEX idx_automations_active ON "Automations"("isActive", "nextExecutionDate");

-- TRIGGERS & FUNCTIONS

-- 1. Auto Update UpdatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updatedAt" = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON "Users" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_goals_modtime BEFORE UPDATE ON "Goals" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_trans_modtime BEFORE UPDATE ON "Transactions" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 2. Auto Update Goal Amount (Logic: Income adds to goal, Expense removes/spends from goal)
-- Adjusted logic: If linking a transaction to a goal, usually it's a contribution (income flow to goal) OR a spending (expense usage of goal funds).
CREATE OR REPLACE FUNCTION update_goal_amount()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."goalId" IS NOT NULL THEN
        -- Assuming 'income' linked to goal means ADDING funds to it (saving)
        -- Assuming 'expense' linked to goal means USING funds from it (spending)
        IF NEW."type" = 'income' THEN
            UPDATE "Goals" 
            SET "currentAmount" = "currentAmount" + NEW."amount",
                "updatedAt" = CURRENT_TIMESTAMP
            WHERE "id" = NEW."goalId";
        ELSIF NEW."type" = 'expense' THEN
             UPDATE "Goals" 
            SET "currentAmount" = "currentAmount" - NEW."amount",
                "updatedAt" = CURRENT_TIMESTAMP
            WHERE "id" = NEW."goalId";
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_goal_amount
AFTER INSERT ON "Transactions"
FOR EACH ROW EXECUTE FUNCTION update_goal_amount();

-- 3. Auto Increment Transaction Count for Subscription Limits
CREATE OR REPLACE FUNCTION increment_transaction_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "Users"
    SET "currentMonthTransCount" = "currentMonthTransCount" + 1
    WHERE "id" = NEW."userId";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_increment_trans_count
AFTER INSERT ON "Transactions"
FOR EACH ROW EXECUTE FUNCTION increment_transaction_count();

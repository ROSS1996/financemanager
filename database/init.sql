CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(320) NOT NULL UNIQUE,
    password_hash VARCHAR(128) NOT NULL,
    country VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birthdate DATE NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    starting_balance NUMERIC(12, 2) NOT NULL,
    category VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid BOOLEAN NOT NULL,
    category VARCHAR(255) NOT NULL,
    account_id INT NOT NULL REFERENCES accounts(id),
    paid_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS revenues (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    amount DECIMAL(12, 2) NOT NULL,
    due_date DATE NOT NULL,
    received BOOLEAN NOT NULL,
    category VARCHAR(255) NOT NULL,
    account_id INT NOT NULL REFERENCES accounts(id),
    received_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS transfers (
    id SERIAL PRIMARY KEY,
    description TEXT,
    amount NUMERIC(12, 2) NOT NULL,
    due_date DATE,
    done BOOLEAN NOT NULL,
    origin_account_id INTEGER NOT NULL,
    destination_account_id INTEGER NOT NULL,
    FOREIGN KEY (origin_account_id) REFERENCES accounts (id) ON DELETE CASCADE,
    FOREIGN KEY (destination_account_id) REFERENCES accounts (id) ON DELETE CASCADE
);
CREATE INDEX expenses_account_id_idx ON expenses (account_id);
CREATE INDEX revenues_account_id_idx ON revenues (account_id);
CREATE INDEX accounts_id_idx ON accounts (id);
CREATE INDEX origin_account_id_idx ON transfers (origin_account_id);
CREATE INDEX destination_account_id_idx ON transfers (destination_account_id);
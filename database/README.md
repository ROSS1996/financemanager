# Database

This is the README file for the database component of the project. The database used in this project is [PostgreSQL](https://www.postgresql.org/download/). The database schema has five tables: users, accounts, expenses, revenues, and transfers.

## Table Descriptions

### Users

The "Users" table contains information about users such as their username, email, password hash, country, first name, last name, birthdate, phone, address, and creation and update timestamps. This table serves as the primary source of user data for the system.

### Accounts

The "Accounts" table stores data about financial accounts, including their name, starting balance, category, and user_id. The user_id field is a foreign key that references the id field of the Users table. This table allows the system to track multiple accounts per user and categorize them according to the user's preferences.

### Expenses

The "Expenses" table contains data about expenses. It includes fields such as description, amount, due_date, paid, category, account_id, user_id, paid_at, and timestamps for creation and update. This table enables the system to keep track of all expenses made by users across different accounts.

### Revenues

The "Revenues" table stores information about revenues, such as description, amount, due_date, received, category, account_id, user_id, received_at, and timestamps for creation and update. This table allows the system to keep track of all revenues received by users across different accounts.

### Transfers

The "Transfers" table contains data about transfers of money between accounts. It has fields such as description, amount, due_date, done, origin_account_id, destination_account_id, and user_id. The origin_account_id and destination_account_id fields are foreign keys that reference the id field of the Accounts table.

## Installation

This folder contains a ``init.sql`` that defines the schema for the database. This schema should be used in a Postgres SQL database.

Alternatively, the database component can be executed using Docker-Compose. There is a file that sets up a PostgreSQL container and a pgAdmin container for web-based management of the database.

To run the database component via Docker, [download it](https://www.docker.com/products/docker-desktop/) and install it in your system. Navigate to the db directory, edit the ``.env`` file  and run the following command:

```terminal
docker-compose up -d
```

This will start the PostgreSQL and pgAdmin containers in detached mode. You can then access the pgAdmin web interface by navigating to <http://localhost:8080> in your web browser. You can use the email and password defined in the .env file to log in to pgAdmin.

To stop the containers, run the following command in the db directory:

```terminal
docker-compose down
```

This will stop and remove the containers.

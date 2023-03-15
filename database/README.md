# Database

This is the README file for the database component of the project. The database used in this project is PostgreSQL. The database schema comprises four tables: users, accounts, expenses, revenues, and transfers.

## Table Descriptions

### Users

This table contains information about users such as their id, username, email, password hash, country, first name, last name, birthdate, phone, address, and creation and update timestamps.

### Accounts

This table stores data about financial accounts, including their id, name, starting balance, category, and user_id. The user_id field is a foreign key that references the id field of the Users table.

### Expenses

This table contains data about expenses. The table includes fields such as id, description, amount, due_date, paid, category, account_id, user_id, paid_at, and timestamps for creation and update.

### Revenues

This table stores information about revenues, such as id, description, amount, due_date, received, category, account_id, user_id, received_at, and timestamps for creation and update.

### Transfers

This table contains data about transfers of money between accounts. It has fields such as id, description, amount, due_date, done, origin_account_id, destination_account_id, and user_id. The origin_account_id and destination_account_id fields are foreign keys that reference the id field of the Accounts table.

## Docker-Compose

The database component of the project includes a Docker-Compose file that sets up a PostgreSQL container and a pgAdmin container for web-based management of the database. The Docker-Compose file defines the following environment variables:

- DB_USER: the username for the database
- DB_PASSWORD: the password for the database
- DB_NAME: the name of the database
- DB_PORT: the port number for the database
- PGADMIN_DEFAULT_EMAIL: the email address for the default pgAdmin user
- PGADMIN_DEFAULT_PASSWORD: the password for the default pgAdmin user

The Docker-Compose file also maps the data directory and initialization script to the PostgreSQL container. The initialization script creates the necessary tables and indexes in the database.

## Running the Database Component

To run the database component, you need to have Docker installed on your system. Navigate to the db directory and run the following command:

```terminal
docker-compose up -d
```

This will start the PostgreSQL and pgAdmin containers in detached mode. You can then access the pgAdmin web interface by navigating to <http://localhost:8080> in your web browser. You can use the email and password defined in the .env file to log in to pgAdmin.

To stop the containers, run the following command in the db directory:

```terminal
docker-compose down
```

This will stop and remove the containers.

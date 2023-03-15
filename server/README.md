# Backend Server

## Description

The backend is written in [Node.JS](https://nodejs.org/en/download/) and [Typescript](https://www.typescriptlang.org/) and requires a [PostgreSQL](https://www.postgresql.org/download/) database to work. It provides the server-side functionality of the project and communicates with the database to manage user authentication, account management, expenses and revenues, and transfers. This backend follows a REST API structure. This means clients can interact with the backend through standard HTTP methods such as GET, POST, PATCH, and DELETE.

## Installation

To install and run the backend, follow these steps:

1. Install [Node.JS](https://nodejs.org/en/download/) and npm on your system.
2. Clone the project repository.
3. Navigate to the backend directory in the project repository.
4. Edit the .env file in the directory to define the required environment variables.
5. Install dependencies using the command `npm install`.
6. Start the backend using the command `npm start`.

Alternatively, you can use the Dockerfile in the directory to run the backend in a Docker container. To do so, follow these steps:

1. Install [Docker](https://www.docker.com/products/docker-desktop/) on your system.
2. Clone the project repository.
3. Navigate to the backend directory in the project repository.
4. Edit the .env file in the directory to define the required environment variables.
5. Build the Docker image using the command `docker build -t <image-name> .` in the directory.
6. Start the Docker container using the command `docker run -p <host-port>:<container-port> -d <image-name>`.

## Scripts

The following scripts are available to run the frontend:

- `npm run start`: Start the development server.
- `npm run build`: Build the production version of the server.

These commands assume that Node.js and npm are installed on your system. If you're running the frontend in a Docker container, the scripts will automatically be executed.

## Usage

The backend provides various endpoints to manage user authentication, account management, expenses and revenues, and transfers. These endpoints can be accessed via a HTTP requests using a client or through the frontend, following a REST API structure.

## Dependencies

To run the backend, you will need:

- [Node.JS](https://nodejs.org/en/download/) with npm installed on your system OR [Docker](https://www.docker.com/products/docker-desktop/) installed on your system.
- A [PostgreSQL](https://www.postgresql.org/download/) database with the correct schema.

Please ensure that you have these dependencies installed before attempting to run the backend.

# Backend Server

## Description

The backend is written in Node.js and TypeScript and requires a PostgreSQL database to work. It provides the server-side functionality of the full stack project and communicates with the database to manage user authentication, account management, expenses and revenues, and transfers.

## Installation

To install and run the backend, follow these steps:

1. Install Node.js and npm on your system.
2. Clone the project repository.
3. Navigate to the backend directory in the project repository.
4. Edit the .env file in the directory to define the required environment variables.
5. Install dependencies using the command `npm install`.
6. Start the backend using the command `npm start`.

Alternatively, you can use the Dockerfile in the directory to run the backend in a Docker container. To do so, follow these steps:

1. Install Docker on your system.
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

The backend provides various endpoints to manage user authentication, account management, expenses and revenues, and transfers. These endpoints can be accessed using an HTTP client, such as curl, or through the frontend.

## Dependencies

To run the backend, you will need:

- Node.js and npm installed on your system OR Docker installed on your system.
- A PostgreSQL database with the correct schema.

Please ensure that you have these dependencies installed before attempting to run the backend.

# Finance Manager

## Overview

This project is a finance manager application that consists of three parts: the PostgreSQL database, a backend built with Javascript (Node.js, Express and TypeScript), and the frontend, built with Next.js. The frontend part does not depend on the database or backend provided in this repository.

The backend provides the server-side functionality for user authentication, account management, expenses and revenues, and transfers. The database stores user data and transaction information. The frontend provides a user interface for managing financial activities such as creating and managing accounts, tracking expenses, revenues, and transfers between accounts.

## Screenshot

![Preview of the Website](website/screenshots/accounts.jpeg)

## Future Plans

The project has several planned improvements, including:

- Finishing the authentication system
- Improving the API communication for the backend
- Improving the UI/UX design for the frontend
- Adding credit card management
- Adding investments management
- Adding a budget system
- Adding a goals system

## Installation

To install the project, you can follow the separate installation steps for each part detailed in the README files in the respective folders. Alternatively, you can use Docker to automatically set up the project.

To use Docker, make sure to edit the `.env` file in the root directory of the project and then run the `docker-compose` file using the command `docker-compose up -d`. This will set up the entire project, including the database, backend, and frontend.

Note that if you choose to install the project manually, you will need to make sure to define the required environment variables in the respective `.env` files.

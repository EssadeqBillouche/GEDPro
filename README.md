<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# GEDPro - Intelligent HR Document Management Platform

GEDPro is a robust and scalable backend application designed for modern HR document management. It leverages a hybrid database architecture to handle structured organizational data and unstructured dynamic form submissions efficiently.

## 🚀 Key Features

-   **Hybrid Database Architecture**:
    -   **PostgreSQL (TypeORM)**: Manages relational data such as Users, Organizations, Candidates, and Workflows.
    -   **MongoDB (Mongoose)**: Handles flexible schemas for Dynamic Forms, Templates, and Submissions.
-   **Multi-Tenancy Support**: Built-in data isolation per organization using interceptors and context services.
-   **Dynamic Forms Engine**: Create and manage custom form templates with flexible validation schemas.
-   **Secure Authentication**: JWT-based authentication with Access and Refresh tokens.
-   **Candidate Management**: specialized module for tracking candidates and their state history.
-   **Object Storage**: Integrated with MinIO (S3 compatible) for secure file storage.
-   **API Documentation**: Auto-generated Swagger/OpenAPI documentation.

## 🛠 Tech Stack

-   **Framework**: [NestJS](https://nestjs.com/) (Node.js)
-   **Language**: TypeScript
-   **Databases**:
    -   PostgreSQL 15
    -   MongoDB
-   **Use Cases**:
    -   **TypeORM**: Relational Mapping
    -   **Mongoose**: Document Mapping
-   **Validation**: Zod & Class Validator
-   **Storage**: MinIO / AWS S3 SDK
-   **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

Ensure you have the following installed including:

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Docker](https://www.docker.com/) & Docker Compose
-   [npm](https://www.npmjs.com/) or yarn

## ⚙️ Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd gedpro
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory. You can use the defaults from `docker-compose.yml` or customize them:
    ```env
    # Database - Postgres
    PG_HOST=localhost
    PG_PORT=5432
    PG_USERNAME=gedpro
    PG_PASSWORD=gedpro_secret
    PG_DATABASE=gedpro_db

    # Database - MongoDB
    MONGO_URI=mongodb://gedpro:gedpro_secret@localhost:27017/gedpro_forms?authSource=admin

    # JWT Security
    JWT_SECRET=super_secure_secret
    JWT_EXPIRES_IN=15m
    JWT_REFRESH_SECRET=super_secure_refresh_secret
    JWT_REFRESH_EXPIRES_IN=7d

    # Storage (MinIO)
    MINIO_ENDPOINT=localhost
    MINIO_PORT=9000
    MINIO_ACCESS_KEY=minioadmin
    MINIO_SECRET_KEY=minioadmin
    MINIO_BUCKET=gedpro-files
    MINIO_USE_SSL=false
    ```

## 🚀 Running the Application

### 1. Start Support Services (Databases & MinIO)
Use Docker Compose to spin up PostgreSQL and MongoDB.
```bash
docker-compose up -d
```

### 2. Run the Application
In a new terminal window, start the NestJS application.
```bash
npm run start:dev
```

### 3. Access the Application
-   **API**: `http://localhost:3000`
-   **Swagger UI**: `http://localhost:3000/api`

## 📚 Documentation

-   **API Documentation**: Access the auto-generated Swagger documentation at `/api` after starting the application.
-   **NestJS Documentation**: [https://docs.nestjs.com](https://docs.nestjs.com)

## 🤝 Contributing

We welcome contributions to GEDPro! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to get involved.

## 📝 License

GEDPro is [MIT licensed](LICENSE).

## 📞 Support

For support, please open an issue on the GitHub repository or contact the maintainers.

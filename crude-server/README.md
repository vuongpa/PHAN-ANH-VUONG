# NestJS Product CRUD API

A RESTful API built with NestJS, Prisma, and PostgreSQL for managing products with full CRUD operations.

## Features

- Product management (Create, Read, Update, Delete)
- Swagger API documentation
- PostgreSQL database with Prisma ORM
- Pagination and filtering support
- Soft delete implementation

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Docker (optional, for running PostgreSQL in container)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vuongpa/PHAN-ANH-VUONG.git
cd crude-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install dependencies

Copy .env.example to .env file in the root directory.

### 4. Database Setup

```bash
docker-compose up -d
```

Then run the Prisma migrations:

```bash
npx prisma generate
npx prisma db push
```

## API Documentation
Once the application is running, you can access the Swagger documentation at:

```plaintext
http://localhost:3000/api
```

### Available Endpoints
- POST /products - Create a new product
- GET /products - Get all products (with pagination and filters)
- GET /products/:id - Get a specific product
- PATCH /products/:id - Update a product
- DELETE /products/:id - Soft delete a product

## Testing
Run unit tests:

```bash
npm run test
```

Run e2e tests:

```bash
npm run test:e2e
```

## Project Structure
```plaintext
src/
├── prisma/
│   ├── schema.prisma
│   └── prisma.service.ts
├── product/
│   ├── dto/
│   ├── entities/
│   ├── product.controller.ts
│   ├── product.service.ts
│   └── product.module.ts
└── main.ts
```

## Built With
- NestJS - The web framework
- Prisma - ORM
- PostgreSQL - Database
- @nestjs/swagger - API documentation

## License

```plaintext
This README provides:
- Clear project description
- Setup instructions
- Environment configuration
- Available endpoints
- Testing information
- Project structure
- Technology stack
- License information

The format is clean and professional, making it easy for other developers to understand and run the project.
```


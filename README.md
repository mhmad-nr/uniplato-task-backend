# Fastify TypeScript Project

## Description

This project is a Fastify-based backend API built with TypeScript. It includes user authentication and user management functionalities with JWT-based authentication. The API follows REST principles and includes endpoints for user login, signup, password change, and more.

## How to Clone and Setup

### Prerequisites

- Node.js (>=14.x)
- yarn (>=1.x)

### Clone the Repository

```sh
git clone https://github.com/yourusername/fastify-typescript-project.git
cd fastify-typescript-project
```

### Install Dependencies

```sh
yarn install
```

### Setup Environment Variables

Create a `.env` file in the root of the project and add your environment variables (e.g., `JWT_SECRET`, `DATABASE_URL`).

### Run the Project

#### Development

```sh
yarn run dev
```

#### Production

```sh
yarn run build
yarn start
```

#### Clean Build Artifacts

```sh
yarn run clean
```

### Run Tests

```sh
yarn test
```

## Project Structure

```
.
├── src
│   ├── controllers
│   │   ├── authController.ts
│   │   └── userController.ts
│   ├── helpers
│   │   └── auth.ts
│   ├── interfaces
│   │   └── IServerController.ts
│   ├── routes
│   │   ├── authRouter.ts
│   │   └── userRouter.ts
│   ├── schema
│   │   ├── authSchema.ts
│   │   └── userSchema.ts
│   ├── server.ts
│   └── config.ts
├── test
│   └── auth.test.ts
├── .gitignore
├── package.json
├── tsconfig.json
├── swagger.yaml
└── README.md
```

## Features

- **User Authentication**: Login, signup, change password, and logout functionalities.
- **User Management**: Get all users, get user by ID, update username, and delete user.
- **JWT-based Authentication**: Secure endpoints with JWT tokens.
- **Schema Validation**: Validate request and response payloads with TypeBox and class-validator.

## Endpoints Schema

### Authentication

#### POST /api/auth/login

Login a user with email and password.

```json
{
  "body": {
    "email": "string",
    "password": "string"
  },
  "response": {
    "200": {
      "token": "string"
    }
  }
}
```

#### POST /api/auth/signup

Sign up a new user.

```json
{
  "body": {
    "username": "string",
    "email": "string",
    "password": "string"
  },
  "response": {
    "200": {
      "data": {
        "id": "number",
        "username": "string",
        "email": "string",
        "created_at": "string"
      }
    }
  }
}
```

#### PUT /api/auth/change-password

Change the password of an authenticated user.

```json
{
  "body": {
    "password": "string"
  },
  "response": {
    "200": {
      "message": "string"
    }
  }
}
```

#### POST /api/auth/logout

Logout an authenticated user.

```json
{
  "response": {
    "200": {
      "message": "string"
    }
  }
}
```

### User Management

#### GET /api/user

Get a list of users.

```json
{
  "query": {
    "limit": "number (optional)",
    "offset": "number (optional)",
    "sortBy": "string (optional)",
    "sortOrder": "string (optional)"
  },
  "response": {
    "200": {
      "data": [
        {
          "id": "number",
          "username": "string",
          "email": "string",
          "created_at": "string"
        }
      ]
    }
  }
}
```

#### GET /api/user/{id}

Get a user by ID.

```json
{
  "params": {
    "id": "number"
  },
  "response": {
    "200": {
      "data": {
        "id": "number",
        "username": "string",
        "email": "string",
        "created_at": "string"
      }
    }
  }
}
```

#### PUT /api/user/user-name

Update a user's username.

```json
{
  "body": {
    "username": "string"
  },
  "response": {
    "200": {
      "data": {
        "id": "number",
        "username": "string",
        "email": "string",
        "created_at": "string"
      }
    }
  }
}
```

#### DELETE /api/user/{id}

Delete a user by ID.

```json
{
  "params": {
    "id": "number"
  },
  "response": {
    "204": {}
  }
}
```

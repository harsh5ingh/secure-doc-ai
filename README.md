# Secure Doc AI 🔐🤖

A secure AI-powered document assistant built with Node.js, Express, PostgreSQL, and modern authentication practices.

---

## Features

- User Signup API
- Input Validation
- PostgreSQL Database Integration
- Password Hashing using bcrypt
- Duplicate User Detection
- Modular Backend Architecture
- REST API Structure

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Authentication & Security
- bcrypt

### Tools
- Nodemon
- dotenv
- Postman

---

## Project Structure

```bash
backend/
│
├── src/
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── package-lock.json
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=secure_doc_ai
DB_PASSWORD=your_password
DB_PORT=5432
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/harsh5ingh/secure-doc-ai.git
```

Move into backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm run dev
```

---

## API Endpoints

### Signup User

```http
POST /api/auth/signup
```

### Request Body

```json
{
   "email": "test@gmail.com",
   "password": "123456"
}
```

### Success Response

```json
{
   "message": "User created successfully"
}
```

---

## Database Schema

### users table

```sql
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Security Features

- Password hashing using bcrypt
- SQL Injection prevention using parameterized queries
- Input validation
- Duplicate email detection

---

## Upcoming Features

- Login API
- JWT Authentication
- Protected Routes
- PDF Upload
- AI Chat with Documents
- Redis Integration
- Docker Support

---

## Author

Harsh Kumar
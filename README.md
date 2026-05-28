# Secure Doc AI 🔐🤖

An AI-powered secure document management platform where users can upload PDFs, extract text, store documents securely, and interact with them through a modern dashboard.

---

# Features 🚀

## Authentication & Security
- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt
- Duplicate User Detection
- Secure API Access

---

## Document Management
- Upload PDF Files
- Extract Text from PDFs
- Store Documents in PostgreSQL
- View Uploaded Documents
- Open Individual Document Pages
- User-specific Document Access

---

## Frontend
- React Frontend
- Dashboard UI
- Tailwind CSS Integration
- Document Viewer
- Protected Navigation

---

# Tech Stack 🛠️

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

---

## Backend
- Node.js
- Express.js

---

## Database
- PostgreSQL

---

## Authentication & Security
- JWT
- bcrypt

---

## PDF Processing
- Multer
- pdf-parse-fork

---

## Tools & Utilities
- Nodemon
- dotenv
- Postman

---

# Project Structure 📂

```bash
secure-doc-ai/
│
├── backend/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   │
│   │   ├── routes/
│   │   │   └── auth.routes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── upload.middleware.js
│   │   │
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   │
│   │   ├── db/
│   │   │   └── db.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── DocumentPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Environment Variables 🔑

Create a `.env` file inside the backend folder.

```env
PORT=3000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=secure_doc_ai
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret_key
```

---

# Installation ⚡

## Clone Repository

```bash
git clone https://github.com/harsh5ingh/secure-doc-ai.git
```

---

## Backend Setup

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run backend server:

```bash
npm run dev
```

---

## Frontend Setup

Move into frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

---

# API Endpoints 🌐

## Authentication

### Signup

```http
POST /api/auth/signup
```

### Login

```http
POST /api/auth/login
```

### Get Current User

```http
GET /api/auth/me
```

---

## Documents

### Upload PDF

```http
POST /api/auth/upload
```

### Get All Documents

```http
GET /api/auth/documents
```

### Get Single Document

```http
GET /api/auth/documents/:id
```

---

# Database Schema 🗄️

## users table

```sql
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## documents table

```sql
CREATE TABLE documents (
   id SERIAL PRIMARY KEY,
   user_id INTEGER REFERENCES users(id),
   filename TEXT NOT NULL,
   content TEXT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Security Features 🔒

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- SQL Injection Prevention using Parameterized Queries
- Input Validation
- User-specific Document Access

---

# Upcoming Features 🤖

- AI Summary Generation
- Chat with PDF
- Semantic Search
- Redis Caching
- OCR Support
- Dark Mode UI
- Docker Deployment
- Cloud Storage Integration

---

# Author ✨

Harsh Kumar

GitHub: [harsh5ingh](https://github.com/harsh5ingh)

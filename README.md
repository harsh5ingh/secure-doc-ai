# Secure Doc AI 🔐🤖

Secure Doc AI is an AI-powered document intelligence platform that allows users to upload PDFs, extract text, generate AI summaries, and manage documents securely through a modern dashboard.

---

## ✨ Features

### 🔐 Authentication & Security

- User Signup & Login
- JWT Authentication
- Protected Routes
- Password Hashing with bcrypt
- User-specific Data Access
- Duplicate User Detection
- Secure API Authorization
- SQL Injection Protection using Parameterized Queries

---

### 📄 Document Management

- Upload PDF Documents
- Extract Text from PDFs
- Store Documents in PostgreSQL
- View Uploaded Documents
- Open Individual Document Pages
- Delete Documents
- User-specific Document Access
- Storage Usage Tracking

---

### 🤖 AI Features

- AI-Powered Document Summarization
- Groq LLM Integration
- Cached Summaries Stored in Database
- Fast Summary Retrieval
- Intelligent Document Analysis

---

### 🎨 Modern Dashboard

- Responsive Dashboard UI
- Dark / Light Mode
- Collapsible Sidebar
- Storage Statistics
- Upload Analytics
- Recent Documents Table
- Toast Notifications

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite
- React Toastify
- Lucide React Icons

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

### Authentication

- JWT
- bcrypt

### AI Integration

- Groq API
- Llama 3.3 70B Versatile

### PDF Processing

- Multer
- pdf-parse-fork
- pdfjs-dist

### Utilities

- dotenv
- Nodemon

---

## 📂 Project Structure

```bash
secure-doc-ai
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   ├── auth.controller.js
│   │   │   └── ai.controller.js
│   │   │
│   │   ├── routes
│   │   │   ├── auth.routes.js
│   │   │   └── ai.routes.js
│   │   │
│   │   ├── middleware
│   │   │   ├── auth.middleware.js
│   │   │   └── upload.middleware.js
│   │   │
│   │   ├── services
│   │   │   └── groq.service.js
│   │   │
│   │   ├── utils
│   │   │   ├── generateToken.js
│   │   │   └── extractText.js
│   │   │
│   │   ├── db
│   │   │   └── db.js
│   │   │
│   │   └── app.js
│   │
│   └── uploads
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=secure_doc_ai
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret_key

GROQ_API_KEY=your_groq_api_key
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/harsh5ingh/secure-doc-ai.git
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🌐 API Endpoints

### Authentication

#### Signup

```http
POST /api/auth/signup
```

#### Login

```http
POST /api/auth/login
```

#### Current User

```http
GET /api/auth/me
```

---

### Documents

#### Upload PDF

```http
POST /api/auth/upload
```

#### Get All Documents

```http
GET /api/auth/documents
```

#### Get Single Document

```http
GET /api/auth/documents/:id
```

#### Delete Document

```http
DELETE /api/auth/documents/:id
```

---

### AI

#### Generate Summary

```http
POST /api/ai/summary
```

Request:

```json
{
  "documentId": 1
}
```

---

## 🗄️ Database Schema

### users

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### documents

```sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    filename TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    file_size BIGINT,
    pdf_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔒 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- User-specific Document Access
- SQL Injection Prevention
- Secure API Authorization
- Input Validation

---

## 📈 Future Roadmap

- Chat with PDF
- Semantic Search
- Vector Database (Qdrant)
- RAG Pipeline
- OCR Support
- Redis Caching
- Docker Deployment
- AWS S3 Storage
- Multi-file Analysis
- AI Question Answering

---

## 👨‍💻 Author

### Harsh Kumar

- GitHub: https://github.com/harsh5ingh
- LinkedIn: https://www.linkedin.com/in/harsh5ingh

---

⭐ If you found this project useful, consider giving it a star.

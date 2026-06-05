# InternOps - Workforce Management & Intern Operations Platform

**InternOps** is a production‑grade intern workforce management system built for the Uptoskills ecosystem. It provides complete hierarchy management, attendance tracking, ratings, social task submissions, and full audit logging with role‑based access control.

##  Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| **Backend**  | Node.js, Fastify, PostgreSQL      |
| **Frontend** | React, Vite, TailwindCSS, Axios   |
| **Auth**     | JWT, Argon2, Refresh Token Rotation |
| **Security** | Helmet, CORS, Rate Limiting, CSRF, Input Sanitization |
| **Docs**     | Swagger (OpenAPI)                 |
| **DevOps**   | Git, GitHub, PowerShell scripts   |

##  Features

- **Role Hierarchy** – Admin → Senior TL → TL → Captain → Intern
- **Authentication** – JWT access/refresh tokens, brute‑force protection, password reset
- **Attendance** – Single & bulk marking with remarks, monthly stats, audit logs
- **Ratings** – Permanent history, per‑role rating (Captain rates Intern, etc.)
- **Social Tasks** – Admins/Senior TLs create tasks; Interns upload proof; Captains verify
- **Notifications** – Real‑time in‑app notifications for attendance, ratings, tasks
- **Meetings** – Schedule and manage team meetings with hierarchy‑based visibility
- **Reports & Analytics** – Attendance summary, top performers, CSV exports
- **Audit Logs** – Immutable log of every sensitive action (login, attendance, rating changes)
- **Uptoskills Integration Ready** – Placeholder module for future sync
- **REST API** – Full Swagger UI documentation at \/docs\
- **RBAC + Ownership** – Every endpoint validates role **and** hierarchy access

##  Quick Start

### 1. Clone & Install
\\\ash
git clone https://github.com/rajat-wyrm/InternOps.git
cd InternOps
# Install backend dependencies
cd backend && npm install && cd ..
# Install frontend dependencies
cd frontend && npm install && cd ..
\\\

### 2. Configure Environment
Copy the example environment file and fill in your secrets:
\\\ash
cp backend/.env.example backend/.env
\\\
Required variables: DATABASE_URL, JWT_SECRET, CORS_ORIGIN.

### 3. Run Database Migrations & Seed Admin
\\\ash
cd backend
npm run migrate
npm run seed
\\\
Default admin: **admin@internops.com** / **Admin@123**

### 4. Start the Server
\\\ash
npm run dev
\\\
Backend runs on http://localhost:5000. Swagger UI at http://localhost:5000/docs.

### 5. Start the Frontend (optional)
\\\ash
cd frontend
npm run dev
\\\
Frontend runs on http://localhost:5173 and proxies API requests to the backend.

##  Project Structure

\\\
InternOps/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection, Redis, env config
│   │   ├── middleware/       # Auth, RBAC, ownership, CSRF, brute‑force
│   │   ├── modules/          # Feature modules (auth, users, attendance, etc.)
│   │   ├── utils/            # Tokens, audit logging, hierarchy helpers
│   │   ├── services/         # Email service placeholder
│   │   └── app.js            # Fastify entry point
│   ├── migrations/           # SQL migration files
│   ├── seeds/                # Seed scripts
│   └── package.json
├── frontend/                 # React + Vite application
├── docs/                     # Documentation assets
└── scripts/                  # Utility PowerShell scripts
\\\

##  API Overview

All endpoints are prefixed with /api. Full interactive documentation available at /docs.

| Method | Endpoint                     | Description                |
|--------|------------------------------|----------------------------|
| POST   | /auth/login                | User login                 |
| POST   | /auth/register             | Admin register             |
| GET    | /users/me                  | Get current user profile   |
| POST   | /attendance/mark           | Mark attendance            |
| POST   | /attendance/bulk           | Bulk mark attendance       |
| GET    | /attendance/:userId        | View attendance records    |
| POST   | /ratings                   | Submit a rating            |
| GET    | /ratings/:userId           | View ratings               |
| POST   | /tasks                     | Create a social task       |
| POST   | /proofs/submit             | Submit proof (Intern)      |
| PATCH  | /proofs/:id/verify         | Verify proof (Captain/TL)  |
| GET    | /notifications             | List notifications         |
| GET    | /reports/attendance-summary| Attendance report          |
| GET    | /reports/export/attendance-csv | Export CSV             |
| GET    | /analytics/top-performers  | Top rated interns          |
| POST   | /meetings                  | Schedule a meeting         |
| GET    | /sessions/me               | List active sessions       |
| GET    | /health                    | Health check               |

##  Security

- **JWT** with access/refresh token rotation
- **Argon2** password hashing
- **Rate limiting** per IP and per route
- **CSRF** protection via \X-CSRF-Token\ header
- **Helmet** security headers
- **Input sanitization** against XSS/SQL injection
- **Ownership validation** on every hierarchical operation
- **Brute‑force** login protection with temporary lockout
- **Audit logging** for all sensitive actions

##  Future Integration (Uptoskills)

The modules/uptoskills folder contains placeholder services ready for the Uptoskills API. Environment variables UPTOSKILLS_BASE_URL and UPTOSKILLS_API_KEY are already wired in the configuration.

##  License

InternOps is proprietary software developed for the Uptoskills ecosystem. All rights reserved.
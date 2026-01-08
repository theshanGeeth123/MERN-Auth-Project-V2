MERN Authentication & Authorization System

A robust, role-based authentication and authorization system for MERN applications. This system is production-ready and can be easily integrated into any MERN project. It includes secure user authentication, email verification, password reset functionality, and role-based access control (User/Admin).

Features

✅ User Registration & Login with secure password hashing
✅ Email Verification after registration
✅ Password Reset via email OTP with Modern email templates
✅ Role-Based Access Control (User/Admin)
✅ JWT Authentication for route protection
✅ Middleware for secured routes
✅ Easy Integration into any MERN project
✅ Production-Ready foundation for authentication & authorization


Project Structure

project-root/
│
├── client/          # React frontend
└── server/          # Node.js + Express backend

Environment Variables

Client (client/.env)
VITE_BACKEND_URL='http://localhost:4000'

Server (server/.env)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_for_users
JWT_SECRET_ADMIN=your_jwt_secret_for_admins
NODE_ENV=development
SENDER_EMAIL=your_email_address
SMTP_PASS=your_email_smtp_password


Getting Started

1. Backend Setup
cd server
npm install
npm run dev

The backend server will run on http://localhost:4000 by default.

2. Frontend Setup
cd client
npm install
npm run dev

The frontend React app will run (typically on http://localhost:5173 for Vite projects).




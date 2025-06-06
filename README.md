# 🧾 Immigration CRM - Lead Management System

A full-stack **Immigration CRM (Customer Relationship Management)** application built with the MERN stack. This project allows immigration consultants or agencies to manage leads, assign categories, track document checklists, send email notifications, and more.

---

## 🚀 Features

### ✅ Lead Management
- Add, edit, delete leads with fields:
  - First name
  - Last name
  - Email
  - Phone number
  - Category (Express Entry, Study Permit, Work Permit)
- Real-time UI update with search and filtering
- Progress tracking using checklist completion percentage

### ✅ Category-Specific Custom Fields
- Dynamic form fields based on the selected category
- Checklist items specific to each category

### ✅ Authentication & Security
- User login/logout using JWT + cookies
- Protected routes and middleware (`isAuthenticated`)
- Password reset via email with secure token link

### ✅ Email Notifications
- Nodemailer integration to send:
  - Lead status updates
  - Password reset links

### ✅ Frontend
- Built with React + Lucide Icons
- Modular components:
  - `Dashboard`
  - `LeadsList`
  - `LeadForm`
  - `LeadDetails`
- Styled with custom CSS + optional Tailwind

---

## 🛠️ Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React, JSX, Lucide Icons      |
| Backend     | Node.js, Express.js           |
| Database    | MongoDB (Mongoose ODM)        |
| Email       | Nodemailer                    |
| Auth        | JWT, cookie-parser            |
| Deployment  | Render, Vercel (optional)     |

---

## 📁 Directory Structure

\`\`\`
📦 backend
├── controllers
│   └── leadController.js
├── models
│   └── Lead.js
├── routes
│   └── leadRoutes.js
├── utils
│   └── sendEmail.js
├── middlewares
│   └── auth.js
├── app.js
├── server.js

📦 frontend
├── components
│   ├── Dashboard.jsx
│   ├── LeadsList.jsx
│   ├── LeadForm.jsx
│   └── LeadDetails.jsx
├── App.jsx
├── index.js
├── styles
│   └── LeadsList.css
\`\`\`

---

## 📦 Installation

### Backend

\`\`\`bash
cd backend
npm install
\`\`\`

### Frontend

\`\`\`bash
cd frontend
npm install
\`\`\`

---

## 🔐 Environment Variables

### \`.env\` (in \`backend/\`)

\`\`\`env
PORT=5000
MONGO_URI=mongodb://localhost:27017/crm
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
CLIENT_URL=http://localhost:5173
\`\`\`

---

## 🧪 Sample Data for Testing

Send a POST request to \`/api/leads/forgot-password\` with:

\`\`\`json
{
  "email": "testuser@example.com"
}
\`\`\`

Ensure this user exists in your MongoDB to test password reset and email flow.

---

## 🔁 API Routes Overview

### Leads Routes

\`\`\`
GET     /api/leads               // Get all leads
POST    /api/leads               // Add new lead
PUT     /api/leads/:id           // Update lead
DELETE  /api/leads/:id           // Delete lead
GET     /api/leads/:id           // Get lead by ID
POST    /api/leads/:id/email     // Send status email
POST    /api/leads/forgot-password // Password reset request
\`\`\`

### Auth Middleware

Protected routes are wrapped with:
\`\`\`js
exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  // decode and verify token logic
};
\`\`\`

---

## 📧 SMTP (Nodemailer)

Uses \`EMAIL_USER\` and \`EMAIL_PASS\` from \`.env\` to configure transport:

\`\`\`js
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
\`\`\`

---

## 🧑‍💻 Author

**Harsh Srivastav**

---

## 📄 License

MIT License — Feel free to use, modify, and build upon this project.

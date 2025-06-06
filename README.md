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
- User login/logout using JWT + cookies implemented in backend beacuse not mentioned in problem statement to 
- Protected routes and middleware (`isAuthenticated`)


### ✅ Frontend
- Built with React + Lucide Icons
- Modular components:
  - `Dashboard`
  - `LeadsList`
  - `LeadForm`
  - `LeadDetails`
- Styled with custom CSS 

---
## 🛠️ Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React, JSX, Lucide Icons      |
| Backend     | Node.js, Express.js           |
| Database    | MongoDB (Mongoose ODM)        |
| Auth        | JWT, cookie-parser            |

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
├── app.js
├── server.js

📦 frontend
├── components
│   ├── Dashboard.jsx
│   ├── LeadsList.jsx
│   ├── LeadForm.jsx
│   └── LeadDetails.jsx
├── App.jsx
├── main.js
## 📦 Installation
#####
Clone the project: git clone 

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

## 🔁 API Routes Overview

### Leads Routes

\`\`\`
GET     /api/leads               // Get all leads
POST    /api/leads               // Add new lead
PUT     /api/leads/:id           // Update lead
DELETE  /api/leads/:id           // Delete lead
GET     /api/leads/:id           // Get lead by ID
POST    /:id/upload              // Upload The image
\`\`\`



});
\`\`\`

---

## 🧑‍💻 Author

**Harsh Srivastav**

## 📄 License

MIT License — Feel free to use, modify, and build upon this project.

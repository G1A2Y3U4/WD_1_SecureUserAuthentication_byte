# 📋 Mini Attendance Management System

A full-stack **Mini Attendance Management System** built using **React.js**, **Node.js**, **Express.js**, **MySQL**, and **JWT Authentication**. This application enables administrators to manage employees, record attendance, and monitor attendance statistics through an interactive dashboard.

---

## 🚀 Tech Stack

### Frontend
- React.js
- React Router DOM
- Bootstrap
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MySQL

---

# ✨ Features

## 🔐 Authentication
- Admin Login
- JWT Token Authentication
- Protected Routes
- Logout Functionality

---

## 👨‍💼 Employee Management
- Add Employee
- View Employee List
- Edit Employee Details
- Delete Employee
- Search Employees
- Employee Status (Active / Inactive)

---

## 📅 Attendance Management
- Mark Employee Attendance
- Attendance Date
- Check-In Time
- Check-Out Time
- Attendance Status
  - Present
  - Absent
  - Leave
  - Sick Leave
  - Week Off
  - Holiday
- View Attendance Records
- Employee-wise Attendance History
- Attendance Summary

---

## 📊 Dashboard
Displays:

- Total Employees
- Active Employees
- Present Today
- Absent Today
- Department-wise Employee Count

---

# 🗄 Database Tables

The project uses three normalized tables:

### Users
- id
- username
- password
- role

### Employees
- id
- employee_id
- name
- email
- mobile
- department
- designation
- status

### Attendance
- id
- employee_id (Foreign Key)
- attendance_date
- check_in
- check_out
- status

---

# 📁 Project Structure

```
Mini-Attendance-System
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── database
│   ├── server.js
│   └── .env
│
└── README.md
```

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/mini-attendance-management-system.git

cd mini-attendance-management-system
```

---

## 2. Backend Setup

```bash
cd server

npm install

npm start
```

Backend runs on

```
http://localhost:5000
```

---

## 3. Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔧 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=attendance_db

JWT_SECRET=attendance_secret_key
```

---

# 🔑 Login Credentials

### Username

```
admin
```

### Password

```
admin123
```

---

# 📡 REST APIs

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /auth/login |

---

## Employee APIs

| Method | Endpoint |
|---------|----------|
| GET | /employees |
| GET | /employees/:id |
| POST | /employees |
| PUT | /employees/:id |
| DELETE | /employees/:id |

---

## Attendance APIs

| Method | Endpoint |
|---------|----------|
| GET | /attendance |
| POST | /attendance |
| GET | /attendance/summary |
| GET | /attendance/employee/:id |

---

## Dashboard APIs

| Method | Endpoint |
|---------|----------|
| GET | /dashboard |

---

# 🧪 Testing

Use **Thunder Client** or **Postman** to test all REST APIs.

---

# 📷 Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Employee Management
- Add Employee
- Attendance Management
- Attendance Records

---

# 🔒 Authentication

This project uses **JWT (JSON Web Token)** authentication.

After successful login:

- JWT token is generated.
- Token is stored in Local Storage.
- Protected pages require authentication.
- Logout removes the token and redirects to the Login page.

---

# 🌟 Future Enhancements

- Pagination
- Sorting
- Advanced Search & Filtering
- Role-Based Access Control
- Export Attendance Report (CSV/Excel)
- Swagger API Documentation
- Docker Support
- Unit Testing
- Cloud Deployment

---

# 👩‍💻 Author

**Gayathri S. N.**

Frontend Developer | React.js | Node.js | Express.js | MySQL

---

# 📜 License

This project is developed for educational and technical assessment purposes.

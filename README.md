
# WD_1_SecureUserAuthentication_byte

# Mini Attendance Management System

A full-stack **Mini Attendance Management System** built using React.js, Node.js, Express.js, MySQL, and JWT authentication.

This project was enhanced as part of **Task 1 — Secure User Authentication**. It includes secure user registration, password hashing, JWT-based authentication, protected API routes, and a honeypot admin portal for security monitoring.

The application allows administrators to manage employees, record attendance, monitor attendance statistics, and securely access protected resources.

---

## 🚀 Project Information

- **Task:** Task 1 — Secure User Authentication
- **Domain:** Web Development
- **Repository:** WD_1_SecureUserAuthentication_byte
- **Author:** Gayathri S. N.
- **GitHub:** https://github.com/G1A2Y3U4/WD_1_SecureUserAuthentication_byte

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- React Router DOM
- Bootstrap
- Axios

### Backend

- Node.js
- Express.js
- JSON Web Token (JWT)
- bcrypt
- CORS
- dotenv

### Database

- MySQL
- MySQL Workbench

### API Testing

- Thunder Client

---

## ✨ Main Features

### 🔐 Secure User Authentication

- User registration endpoint
- User login endpoint
- Password hashing using bcrypt
- JWT token generation
- JWT token expiration
- Protected API routes
- Input validation
- Appropriate HTTP status codes
- Invalid credential handling
- Token-based authentication

### 👨‍💼 Employee Management

- Add employees
- View employee list
- View employee details
- Edit employee information
- Delete employees
- Search employees
- Filter employees
- Employee status management
  - Active
  - Inactive

### 📅 Attendance Management

- Mark employee attendance
- Record attendance date
- Record check-in time
- Record check-out time
- Attendance status
  - Present
  - Absent
  - Leave
  - Sick Leave
  - Week Off
  - Holiday
- View attendance records
- Employee-wise attendance history
- Attendance summary

### 📊 Dashboard

The dashboard displays:

- Total employees
- Active employees
- Present employees
- Absent employees
- Department-wise employee count
- Attendance-related statistics

### 🛡️ Honeypot Admin Portal

A fake admin portal login endpoint is implemented for security monitoring.

The honeypot records suspicious login attempts, including:

- IP address
- Session identifier
- Security incident reason
- Date and time of the incident

The incidents are stored in the MySQL `security_incidents` table.

---

## 🔒 Task 1 — Secure User Authentication

### 1. User Registration

New users can register through the registration endpoint.

Security features:

- Username and password validation
- Minimum password length validation
- Duplicate username checking
- Password hashing using bcrypt
- No plaintext password storage
- Default employee role for new users

**Endpoint:**

```http
POST /api/auth/register
```

**Example request body:**

```json
{
  "username": "testuser",
  "password": "securePassword123"
}
```

**Possible responses:**

| Status Code | Description |
|---|---|
| 201 | Registration successful |
| 400 | Invalid or missing input |
| 409 | Username already exists |
| 500 | Internal server error |

---

### 2. User Login

Registered users can log in using their username and password.

The login process:

1. Receives the username and password.
2. Checks whether the user exists.
3. Compares the password using bcrypt.
4. Generates a JWT token after successful authentication.
5. Returns the token to the client.
6. Stores the token in browser local storage on the frontend.

**Endpoint:**

```http
POST /api/auth/login
```

**Example request body:**

```json
{
  "username": "admin",
  "password": "YOUR_PASSWORD"
}
```

**Successful response:**

```json
{
  "message": "Login Successful",
  "token": "YOUR_JWT_TOKEN",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

**Possible responses:**

| Status Code | Description |
|---|---|
| 200 | Login successful |
| 400 | Missing username or password |
| 401 | Invalid username or password |
| 403 | Account is banned |
| 500 | Internal server error |

---

### 3. JWT Authentication

This project uses JSON Web Tokens (JWT) to protect private API routes.

After successful login:

- The backend generates a JWT token.
- The token contains user information.
- The token expires after one day.
- The frontend stores the token in local storage.
- Axios automatically adds the token to API requests.
- The backend verifies the token using authentication middleware.

**Authorization header format:**

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The JWT secret is stored in the server `.env` file and is not committed to GitHub.

---

### 4. Protected API Endpoint

The protected endpoint returns data only when a valid JWT token is provided.

**Endpoint:**

```http
GET /api/protected-data
```

**Full URL:**

```http
http://localhost:5000/api/protected-data
```

**Authorization header:**

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Successful response:**

```json
{
  "message": "You are authenticated",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin",
    "iat": 1790191448,
    "exp": 1790277848
  },
  "data": {
    "secret": "This data is visible only to authenticated users"
  }
}
```

**Authentication testing:**

| Request | Expected Result |
|---|---|
| Valid JWT token | 200 — Authenticated |
| No token | 401 — Unauthorized |
| Invalid token | 401 — Token expired or invalid |
| Expired token | 401 — Token expired or invalid |

---

### 5. Honeypot Admin Portal

A fake admin portal is implemented to monitor suspicious login attempts.

**Endpoint:**

```http
POST /api/admin-portal/login
```

**Full URL:**

```http
http://localhost:5000/api/admin-portal/login
```

**Example request body:**

```json
{
  "username": "admin",
  "password": "admin"
}
```

The honeypot records the following details:

- IP address
- Session identifier
- Security incident reason
- Date and time

**Example security incident reason:**

```text
Malicious Actor - honeypot demo login attempt
```

The records are stored in the following MySQL table:

```text
security_incidents
```

**Database verification query:**

```sql
USE attendance_db;

SELECT *
FROM security_incidents
ORDER BY created_at DESC;
```

The honeypot was tested using Thunder Client, and the recorded incidents were verified using MySQL Workbench.

> Note: The honeypot is intended for security monitoring and demonstration. The incident log should not be treated as proof that a person is malicious.

---

## 📡 API Endpoints

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in a user |
| GET | `/api/protected-data` | Access protected data |

### Honeypot API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin-portal/login` | Record honeypot login attempts |

### Employee APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Add an employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/employees/filter` | Filter employees |

### Attendance APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/attendance` | Get attendance records |
| POST | `/api/attendance` | Mark attendance |
| GET | `/api/attendance/summary` | Get attendance summary |
| GET | `/api/attendance/employee/:id` | Get employee attendance history |

### Dashboard APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | Get dashboard statistics |

### Leave APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leaves` | Get leave records |
| POST | `/api/leaves` | Submit a leave request |

---

## 🗄️ Database Tables

The project uses MySQL for data storage.

### Users

| Column | Description |
|---|---|
| id | Primary key |
| username | Unique username |
| password | Bcrypt-hashed password |
| role | User role |
| is_banned | Account status, if configured |

### Employees

| Column | Description |
|---|---|
| id | Primary key |
| employee_id | Unique employee ID |
| name | Employee name |
| email | Employee email |
| mobile | Employee mobile number |
| department | Employee department |
| designation | Employee designation |
| status | Active or Inactive |
| profile_picture | Optional profile picture |

### Attendance

| Column | Description |
|---|---|
| id | Primary key |
| employee_id | Employee reference |
| attendance_date | Attendance date |
| check_in | Check-in time |
| check_out | Check-out time |
| status | Attendance status |

### Security Incidents

| Column | Description |
|---|---|
| id | Primary key |
| ip_address | Request IP address |
| session_identifier | Session identifier |
| reason | Security incident reason |
| created_at | Incident creation time |

---

## 📁 Project Structure

```text
WD_1_SecureUserAuthentication_byte
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── database
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── README.md
└── Dump20260723.sql
```

> Database dumps and environment files should be reviewed carefully before being pushed to a public repository. Do not commit passwords, JWT secrets, or other sensitive information.

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/G1A2Y3U4/WD_1_SecureUserAuthentication_byte.git
```

Move into the project directory:

```bash
cd WD_1_SecureUserAuthentication_byte
```

---

### 2. Backend Setup

Open a terminal and navigate to the server directory:

```bash
cd server
```

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=attendance_db

JWT_SECRET=YOUR_SECRET_KEY
```

Start the backend development server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

Expected startup output:

```text
Server is running on port 5000
MySQL Connected Successfully!
```

---

### 3. Frontend Setup

Open another terminal:

```bash
cd client
```

Install frontend dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on the Vite development URL, usually:

```text
http://localhost:5173
```

---

## 🔧 Environment Variables

The following environment variables are required:

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `JWT_SECRET` | Secret used to sign JWT tokens |

Do not commit the `.env` file to GitHub.

The `.gitignore` file should include:

```gitignore
.env
.env.local
.env.*.local
node_modules
dist
```

---

## 🧪 Testing

The APIs were tested using **Thunder Client**.

### Authentication Tests

- User registration
- Duplicate username validation
- User login
- Invalid login credentials
- Missing input validation
- Password hashing verification

### Protected Endpoint Tests

The protected endpoint was tested with:

1. A valid JWT token
2. No token
3. An invalid token
4. An expired token

### Honeypot Tests

The honeypot endpoint was tested with decoy credentials:

```json
{
  "username": "admin",
  "password": "admin"
}
```

Security incidents were verified in MySQL Workbench:

```sql
SELECT *
FROM security_incidents
ORDER BY created_at DESC;
```

---

## 🔒 Security Measures

- Passwords are hashed using bcrypt.
- Plaintext passwords are not stored in the database.
- JWT authentication protects private API routes.
- JWT tokens expire after one day.
- Authorization headers use the Bearer token format.
- Invalid authentication requests return appropriate HTTP status codes.
- Input validation is implemented for authentication.
- Parameterized SQL queries are used for user input.
- Environment variables are used for sensitive configuration.
- Honeypot login attempts are recorded for security monitoring.
- Sensitive configuration files are excluded from Git tracking.

---

## 📸 Screenshots

The following screenshots can be added to document the project:

- Login page
- Registration request in Thunder Client
- Successful login response
- Protected endpoint with a valid token
- Protected endpoint without a token
- Invalid token response
- Honeypot login request
- Security incidents in MySQL Workbench
- Dashboard
- Employee management
- Add employee form
- Attendance management
- Attendance records

Recommended screenshot folder:

```text
screenshots/
├── login.png
├── registration.png
├── protected-success.png
├── protected-unauthorized.png
├── honeypot.png
├── security-incidents.png
└── dashboard.png
```

---

## 📌 Project Status

- [x] User registration implemented
- [x] User login implemented
- [x] Password hashing implemented
- [x] JWT authentication implemented
- [x] Protected API endpoint implemented
- [x] Input validation implemented
- [x] Appropriate HTTP status codes implemented
- [x] Honeypot security logging implemented
- [x] Thunder Client API testing completed
- [x] Security incidents verified in MySQL Workbench
- [ ] Final screenshots added
- [ ] README documentation finalized
- [ ] Code pushed to the required public GitHub repository
- [ ] LinkedIn progress post published

---

## 🚀 Future Enhancements

- Pagination
- Advanced search and filtering
- Role-based access control
- Token revocation
- Export attendance reports to CSV or Excel
- Swagger API documentation
- Docker support
- Automated unit and integration testing
- Cloud deployment
- Improved security monitoring dashboard

---

## 👩‍💻 Author

**Gayathri S. N.**

Frontend Developer | React.js | Node.js | Express.js | MySQL

---

## 📜 License

This project was developed for educational and technical assessment purposes.
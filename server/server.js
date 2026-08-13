require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Database Connection
require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

// Create Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.send("Employee Attendance Management API is running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/leaves", leaveRoutes);

// Handle Invalid Routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
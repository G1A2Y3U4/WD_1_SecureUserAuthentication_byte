const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");

const {
    markAttendance,
    getAttendance,
    attendanceSummary,
    employeeAttendance
} = require("../controllers/attendanceController");

// Mark Attendance
router.post("/", auth, markAttendance);

// Get All Attendance Records
router.get("/", auth, getAttendance);

// Get Attendance Summary
router.get("/summary", auth, attendanceSummary);

// Get Attendance By Employee ID
router.get("/employee/:id", auth, employeeAttendance);

module.exports = router;
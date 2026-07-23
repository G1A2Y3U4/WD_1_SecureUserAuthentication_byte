const express = require("express");
const router = express.Router();

const {
    markAttendance,
    getAttendance,
    attendanceSummary,
    employeeAttendance
} = require("../controllers/attendanceController");

// Mark Attendance
router.post("/", markAttendance);

// Get All Attendance Records
router.get("/", getAttendance);

// Get Attendance Summary
router.get("/summary", attendanceSummary);

// Get Attendance By Employee ID
router.get("/employee/:id", employeeAttendance);

module.exports = router;
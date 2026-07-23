const db = require("../config/db");

// Mark Attendance
const markAttendance = (req, res) => {

    const {
        employee_id,
        attendance_date,
        check_in,
        check_out,
        status
    } = req.body;

    const sql = `
        INSERT INTO attendance
        (employee_id, attendance_date, check_in, check_out, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            employee_id,
            attendance_date,
            check_in,
            check_out,
            status
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Attendance Marked Successfully"
            });
        }
    );
};

// Get All Attendance Records
const getAttendance = (req, res) => {

    const sql = `
        SELECT
            attendance.id,
            employees.employee_id,
            employees.name,
            employees.department,
            attendance.attendance_date,
            attendance.check_in,
            attendance.check_out,
            attendance.status
        FROM attendance
        JOIN employees
        ON attendance.employee_id = employees.id
        ORDER BY attendance.attendance_date DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// Attendance Summary
const attendanceSummary = (req, res) => {

    const sql = `
        SELECT
            status,
            COUNT(*) AS total
        FROM attendance
        GROUP BY status
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// Employee Attendance History
const employeeAttendance = (req, res) => {

    const employeeId = req.params.id;

    const sql = `
        SELECT
            attendance.id,
            attendance.attendance_date,
            attendance.check_in,
            attendance.check_out,
            attendance.status,
            employees.employee_id,
            employees.name,
            employees.department
        FROM attendance
        JOIN employees
        ON attendance.employee_id = employees.id
        WHERE attendance.employee_id = ?
        ORDER BY attendance.attendance_date DESC
    `;

    db.query(sql, [employeeId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "No attendance records found"
            });
        }

        res.json(result);
    });
};

// Export All Functions
module.exports = {
    markAttendance,
    getAttendance,
    attendanceSummary,
    employeeAttendance
};
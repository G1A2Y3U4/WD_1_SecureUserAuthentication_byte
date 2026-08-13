const db = require("../config/db");

const applyLeave = (req, res) => {
    const { employee_id, start_date, end_date, reason } = req.body;

    if (!employee_id || !start_date || !end_date || !reason) {
        return res.status(400).json({ message: "Please provide all leave details" });
    }

    const sql = `
        INSERT INTO leave_requests (employee_id, start_date, end_date, reason, status)
        VALUES (?, ?, ?, ?, 'Pending')
    `;

    db.query(sql, [employee_id, start_date, end_date, reason], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({ message: "Leave request submitted successfully", id: result.insertId });
    });
};

const getLeaveRequests = (req, res) => {
    const sql = `
        SELECT lr.id, lr.start_date, lr.end_date, lr.reason, lr.status, e.name, e.employee_id
        FROM leave_requests lr
        JOIN employees e ON lr.employee_id = e.id
        ORDER BY lr.id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

const updateLeaveRequest = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const sql = "UPDATE leave_requests SET status = ? WHERE id = ?";

    db.query(sql, [status, id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({ message: "Leave request updated successfully" });
    });
};

module.exports = {
    applyLeave,
    getLeaveRequests,
    updateLeaveRequest
};

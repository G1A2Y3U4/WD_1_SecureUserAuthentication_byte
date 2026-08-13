const db = require("../config/db");

const getDashboard = (req, res) => {
    const dashboard = {};

    db.query("SELECT COUNT(*) AS totalEmployees FROM employees", (err, totalResult) => {
        if (err) return res.status(500).json(err);
        dashboard.totalEmployees = totalResult[0].totalEmployees;

        db.query("SELECT COUNT(*) AS activeEmployees FROM employees WHERE status='Active'", (err, activeResult) => {
            if (err) return res.status(500).json(err);
            dashboard.activeEmployees = activeResult[0].activeEmployees;

            db.query("SELECT COUNT(*) AS presentToday FROM attendance WHERE attendance_date = CURDATE() AND status='Present'", (err, presentResult) => {
                if (err) return res.status(500).json(err);
                dashboard.presentToday = presentResult[0].presentToday;

                db.query("SELECT COUNT(*) AS absentToday FROM attendance WHERE attendance_date = CURDATE() AND status='Absent'", (err, absentResult) => {
                    if (err) return res.status(500).json(err);
                    dashboard.absentToday = absentResult[0].absentToday;

                    db.query("SELECT COUNT(*) AS lateEmployees FROM attendance WHERE attendance_date = CURDATE() AND status='Present' AND check_in > '09:30:00'", (err, lateResult) => {
                        if (err) return res.status(500).json(err);
                        dashboard.lateEmployees = lateResult[0].lateEmployees;

                        db.query("SELECT COUNT(*) AS leaveToday FROM attendance WHERE attendance_date = CURDATE() AND status='Leave'", (err, leaveResult) => {
                            if (err) return res.status(500).json(err);
                            dashboard.leaveToday = leaveResult[0].leaveToday;

                            db.query("SELECT COUNT(*) AS totalRecords FROM attendance", (err, recordResult) => {
                                if (err) return res.status(500).json(err);
                                const total = recordResult[0].totalRecords || 1;
                                const present = dashboard.presentToday || 0;
                                dashboard.attendancePercentage = Math.round((present / total) * 100);

                                db.query(`SELECT department, COUNT(*) AS total FROM employees GROUP BY department`, (err, departmentResult) => {
                                    if (err) return res.status(500).json(err);
                                    dashboard.departmentWise = departmentResult;

                                    db.query(`SELECT a.id, e.name, e.employee_id, a.attendance_date, a.status, a.check_in, a.check_out
                                              FROM attendance a
                                              JOIN employees e ON a.employee_id = e.id
                                              ORDER BY a.attendance_date DESC, a.id DESC LIMIT 8`, (err, recentResult) => {
                                        if (err) return res.status(500).json(err);
                                        dashboard.recentAttendance = recentResult;
                                        res.json(dashboard);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

module.exports = {
    getDashboard
};
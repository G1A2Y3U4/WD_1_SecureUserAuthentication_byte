const db = require("../config/db");

const getDashboard = (req, res) => {

    const dashboard = {};

    // Total Employees
    db.query(
        "SELECT COUNT(*) AS totalEmployees FROM employees",
        (err, totalResult) => {

            if (err) return res.status(500).json(err);

            dashboard.totalEmployees = totalResult[0].totalEmployees;

            // Active Employees
            db.query(
                "SELECT COUNT(*) AS activeEmployees FROM employees WHERE status='Active'",
                (err, activeResult) => {

                    if (err) return res.status(500).json(err);

                    dashboard.activeEmployees = activeResult[0].activeEmployees;

                    // Present Today
                    db.query(
                        `SELECT COUNT(*) AS presentToday
                         FROM attendance
                         WHERE attendance_date = CURDATE()
                         AND status='Present'`,
                        (err, presentResult) => {

                            if (err) return res.status(500).json(err);

                            dashboard.presentToday = presentResult[0].presentToday;

                            // Absent Today
                            db.query(
                                `SELECT COUNT(*) AS absentToday
                                 FROM attendance
                                 WHERE attendance_date = CURDATE()
                                 AND status='Absent'`,
                                (err, absentResult) => {

                                    if (err) return res.status(500).json(err);

                                    dashboard.absentToday = absentResult[0].absentToday;

                                    // Department Count
                                    db.query(
                                        `SELECT
                                            department,
                                            COUNT(*) AS total
                                         FROM employees
                                         GROUP BY department`,
                                        (err, departmentResult) => {

                                            if (err)
                                                return res.status(500).json(err);

                                            dashboard.departmentWise =
                                                departmentResult;

                                            res.json(dashboard);
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
};

module.exports = {
    getDashboard
};
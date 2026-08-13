const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "gayu@2004",
    database: process.env.DB_NAME || "attendance_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed!");
        console.log(err);
        return;
    }

    console.log("MySQL Connected Successfully!");

    const initQueries = [
        `CREATE TABLE IF NOT EXISTS leave_requests (
            id INT AUTO_INCREMENT PRIMARY KEY,
            employee_id INT NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            reason TEXT NOT NULL,
            status VARCHAR(20) DEFAULT 'Pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (employee_id) REFERENCES employees(id)
        )`,
        ];

        // Run simple init queries
        initQueries.forEach((query) => {
            db.query(query, (initErr) => {
                if (initErr) {
                    console.log("Initialization Warning:", initErr.message);
                }
            });
        });

        // Ensure `profile_picture` column exists on `employees` in a MySQL-compatible way
        const checkColumnQuery = `SELECT COUNT(*) AS count FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = '${db.config.database}' AND TABLE_NAME = 'employees' AND COLUMN_NAME = 'profile_picture'`;
        db.query(checkColumnQuery, (checkErr, results) => {
            if (checkErr) {
                console.log('Initialization Warning (column check):', checkErr.message);
                return;
            }

            const count = results && results[0] && results[0].count ? results[0].count : 0;
            if (count === 0) {
                db.query(`ALTER TABLE employees ADD COLUMN profile_picture VARCHAR(255) DEFAULT NULL`, (alterErr) => {
                    if (alterErr) {
                        console.log('Initialization Warning (adding column):', alterErr.message);
                    }
                });
            }
        });
});

module.exports = db;
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gayu@2004",
    database: "attendance_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed!");
        console.log(err);
        return;
    }

    console.log("MySQL Connected Successfully!");
});

module.exports = db;
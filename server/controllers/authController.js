const db = require("../config/db");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid Username"
            });
        }

        const user = result[0];

        if (password !== user.password) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            "attendance_secret_key",
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });
    });   // <-- closes db.query
};       // <-- closes login function

module.exports = {
    login
};
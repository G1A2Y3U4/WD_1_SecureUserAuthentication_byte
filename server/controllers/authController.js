const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], async (err, result) => {
        console.log(`Login attempt: username=${username}`);
        console.log(`Password provided: ${password ? 'yes' : 'no'}, length=${password ? password.length : 0}`);

        if (err) {
            console.error('Auth DB error:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err });
        }

        if (!result || result.length === 0) {
            console.log('Auth result: no user found for username=', username);
            return res.status(401).json({ message: "Invalid Username" });
        }

        const user = result[0];
        const storedPassword = user.password || '';
        const isHashed = storedPassword.startsWith("$2");
        console.log('User found:', { id: user.id, username: user.username, isHashed });

        let isValidPassword = false;
        try {
            if (isHashed) {
                isValidPassword = await bcrypt.compare(password, storedPassword);
                console.log('bcrypt.compare result:', isValidPassword);
            } else {
                isValidPassword = password === storedPassword;
                console.log('Plaintext password match:', isValidPassword);
            }
        } catch (compareErr) {
            console.error('Password compare error:', compareErr);
        }

        if (!isValidPassword) {
            console.log('Authentication failed for username=', username);
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET || "attendance_secret_key",
            {
                expiresIn: "1d"
            }
        );

        console.log('Authentication successful for user id=', user.id);

        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    });
};

module.exports = {
    login
};
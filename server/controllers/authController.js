const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// REGISTER
const register = (req, res) => {
    const { username, password, role } = req.body;

    // Validation
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    const checkSql = "SELECT id FROM users WHERE username = ?";

    db.query(checkSql, [username], async (err, result) => {
        if (err) {
            console.error("Registration DB error:", err);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }

        if (result.length > 0) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = `
                INSERT INTO users (username, password, role)
                VALUES (?, ?, ?)
            `;

            db.query(
                sql,
                [username, hashedPassword, role || "employee"],
                (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error("Registration insert error:", insertErr);
                        return res.status(500).json({
                            message: "Internal Server Error"
                        });
                    }

                    return res.status(201).json({
                        message: "Registration successful",
                        userId: insertResult.insertId
                    });
                }
            );
        } catch (hashError) {
            console.error("Password hashing error:", hashError);

            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    });
};


// LOGIN
const login = (req, res) => {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], async (err, result) => {

        if (err) {
            console.error("Login DB error:", err);

            return res.status(500).json({
                message: "Internal Server Error"
            });
        }

        if (!result || result.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const user = result[0];

        // Check whether account is banned
        if (user.is_banned) {
            return res.status(403).json({
                message: "Account is banned"
            });
        }

        try {
            // Compare entered password with bcrypt hash
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!isValidPassword) {
                return res.status(401).json({
                    message: "Invalid username or password"
                });
            }

            // Check JWT secret
            if (!process.env.JWT_SECRET) {
                console.error("JWT_SECRET is missing in .env");

                return res.status(500).json({
                    message: "Server configuration error"
                });
            }

            // Create JWT
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            return res.status(200).json({
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });

        } catch (error) {
            console.error("Login authentication error:", error);

            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    });
};


module.exports = {
    register,
    login
};
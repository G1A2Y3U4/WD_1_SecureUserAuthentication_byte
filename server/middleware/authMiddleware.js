const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../config/db");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token =
        authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Create a SHA-256 hash of the token
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Check whether this token was permanently revoked
        const sql = `
            SELECT id
            FROM revoked_sessions
            WHERE token_hash = ?
        `;

        db.query(sql, [tokenHash], (err, results) => {
            if (err) {
                console.error("Revoked session check error:", err);

                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }

            if (results.length > 0) {
                return res.status(401).json({
                    message: "This session has been permanently revoked"
                });
            }

            // Token is valid and has not been revoked
            req.user = decoded;
            req.token = token;
            req.tokenHash = tokenHash;

            next();
        });

    } catch (error) {
        return res.status(401).json({
            message: "Token expired or invalid"
        });
    }
};

module.exports = {
    auth
};
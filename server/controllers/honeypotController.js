const crypto = require("crypto");
const db = require("../config/db");

const honeypotLogin = (req, res) => {
    const { username, password } = req.body;

    const authHeader = req.headers.authorization;

    const token =
        authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;

    const ipAddress =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress ||
        "Unknown";

    const sessionIdentifier = crypto.randomUUID();

    // Detect the fake admin credentials
    if (username === "admin" && password === "admin") {

        // Record the suspicious login attempt
        const incidentSql = `
            INSERT INTO security_incidents
            (ip_address, session_identifier, reason)
            VALUES (?, ?, ?)
        `;

        const reason =
            "Malicious Actor - honeypot demo login attempt";

        db.query(
            incidentSql,
            [ipAddress, sessionIdentifier, reason],
            (incidentError) => {

                if (incidentError) {
                    console.error(
                        "Security incident logging error:",
                        incidentError
                    );
                }

                // Revoke the supplied session, if available
                if (token) {
                    const tokenHash = crypto
                        .createHash("sha256")
                        .update(token)
                        .digest("hex");

                    const revokeSql = `
                        INSERT IGNORE INTO revoked_sessions
                        (user_id, token_hash, reason)
                        VALUES (?, ?, ?)
                    `;

                    db.query(
                        revokeSql,
                        [
                            null,
                            tokenHash,
                            "Permanently revoked - honeypot login attempt"
                        ],
                        (revokeError) => {

                            if (revokeError) {
                                console.error(
                                    "Session revocation error:",
                                    revokeError
                                );
                            }

                            return res.status(401).json({
                                message: "Invalid username or password"
                            });
                        }
                    );

                } else {
                    return res.status(401).json({
                        message: "Invalid username or password"
                    });
                }
            }
        );

        return;
    }

    // Do not reveal whether the honeypot credentials were correct
    return res.status(401).json({
        message: "Invalid username or password"
    });
};

module.exports = {
    honeypotLogin
};
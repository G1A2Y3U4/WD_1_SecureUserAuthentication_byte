const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "attendance_secret_key");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};

module.exports = {
    auth
};

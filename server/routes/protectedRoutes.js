
const express = require("express");

const router = express.Router();

const { auth } = require("../middleware/authMiddleware");

const {
    getProtectedData
} = require("../controllers/protectedController");

// Protected endpoint
router.get(
    "/protected-data",
    auth,
    getProtectedData
);

module.exports = router;
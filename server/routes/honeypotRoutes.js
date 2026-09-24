
const express = require("express");

const router = express.Router();

const { honeypotLogin } =
    require("../controllers/honeypotController");

router.post("/login", honeypotLogin);

module.exports = router;
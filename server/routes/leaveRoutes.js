const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { applyLeave, getLeaveRequests, updateLeaveRequest } = require("../controllers/leaveController");

router.post("/", auth, applyLeave);
router.get("/", auth, getLeaveRequests);
router.put("/:id", auth, updateLeaveRequest);

module.exports = router;

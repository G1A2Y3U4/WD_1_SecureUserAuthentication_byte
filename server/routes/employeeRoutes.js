const express = require("express");
const router = express.Router();

const {
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

// Add Employee
router.post("/", addEmployee);

// Get All Employees
router.get("/", getEmployees);

// Get Employee By ID
router.get("/:id", getEmployeeById);

// Update Employee
router.put("/:id", updateEmployee);

// Delete Employee
router.delete("/:id", deleteEmployee);

module.exports = router;
const db = require("../config/db");

// Add Employee
const addEmployee = (req, res) => {

    const {
        employee_id,
        name,
        email,
        mobile,
        department,
        designation,
        status
    } = req.body;

    const sql = `
        INSERT INTO employees
        (employee_id, name, email, mobile, department, designation, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            employee_id,
            name,
            email,
            mobile,
            department,
            designation,
            status
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Employee Added Successfully",
                id: result.insertId
            });
        }
    );
};

// Get All Employees
const getEmployees = (req, res) => {

    const sql = "SELECT * FROM employees";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// Get Employee By ID
const getEmployeeById = (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM employees WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json(result[0]);
    });
};

// Update Employee
const updateEmployee = (req, res) => {

    const id = req.params.id;

    const {
        name,
        email,
        mobile,
        department,
        designation,
        status
    } = req.body;

    const sql = `
        UPDATE employees
        SET name = ?,
            email = ?,
            mobile = ?,
            department = ?,
            designation = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name,
            email,
            mobile,
            department,
            designation,
            status,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Employee Updated Successfully"
            });
        }
    );
};

// Delete Employee
const deleteEmployee = (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM employees WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Employee Deleted Successfully"
        });
    });
};

module.exports = {
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};
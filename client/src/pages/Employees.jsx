import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Employees() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        fetchEmployees();
    }, [navigate]);

    const fetchEmployees = async () => {
        try {
            const res = await api.get("/employees");
            setEmployees(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteEmployee = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/employees/${id}`);
            alert("Employee Deleted Successfully");
            fetchEmployees();
        } catch (error) {
            console.log(error);
        }
    };

    const filteredEmployees = employees.filter((emp) => {
        const matchesSearch = `${emp.name} ${emp.employee_id} ${emp.department}`.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === "All" || emp.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="page-shell">
                <div className="page-card">
                <h2 className="page-title">Employees</h2>
                <p className="page-subtitle">Manage team records, statuses, and staffing information.</p>

                <div className="row justify-content-between mb-4 align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                        <Link to="/add-employee" className="btn btn-primary">Add Employee</Link>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, ID or department..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-modern">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? filteredEmployees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.employee_id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.designation}</td>
                                    <td>{emp.status}</td>
                                    <td>
                                        <Link to={`/edit-employee/${emp.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No employees match your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Employees;
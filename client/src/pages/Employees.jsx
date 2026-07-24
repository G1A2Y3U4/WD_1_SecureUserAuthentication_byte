import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Employees() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        fetchEmployees();

    }, []);

    // Fetch Employees
    const fetchEmployees = async () => {

        try {

            const res = await api.get("/employees");

            setEmployees(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    // Delete Employee
    const deleteEmployee = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/employees/${id}`);

            alert("Employee Deleted Successfully");

            fetchEmployees();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="d-flex">

            <Sidebar />

            <div
                className="container-fluid p-4"
                style={{ flex: 1 }}
            >

                <h2 className="text-center mb-4">
                    Employees
                </h2>

                <div className="text-center mb-4">

                    <Link
                        to="/add-employee"
                        className="btn btn-primary"
                    >
                        Add Employee
                    </Link>

                </div>

                <div className="row justify-content-center mb-4">

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Employee ID or Name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                </div>

                <table className="table table-bordered table-striped">

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

                        {employees
                            .filter(
                                (emp) =>
                                    emp.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) ||
                                    emp.employee_id
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                            )
                            .map((emp) => (

                                <tr key={emp.id}>

                                    <td>{emp.id}</td>
                                    <td>{emp.employee_id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.designation}</td>
                                

                                    <td>

                                        <Link
                                            to={`/edit-employee/${emp.id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>``

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteEmployee(emp.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default Employees;
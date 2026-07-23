import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function EditEmployee() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        mobile: "",
        department: "",
        designation: "",
        status: ""
    });

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {

        try {

            const res = await api.get(`/employees/${id}`);

            setEmployee(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/employees/${id}`, employee);

            alert("Employee Updated Successfully");

            navigate("/employees");

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
                Edit Employee
            </h2>

            <form
                onSubmit={handleSubmit}
                className="col-md-8 mx-auto"
            >

                <input
                    className="form-control mb-2"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="mobile"
                    value={employee.mobile}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="status"
                    value={employee.status}
                    onChange={handleChange}
                >
                    <option>Active</option>
                    <option>Inactive</option>
                </select>

                <div className="text-center">
                    <button className="btn btn-primary w-50">
                        Update Employee
                    </button>
                </div>
            </form>

        </div>

    </div>

);

}

export default EditEmployee;
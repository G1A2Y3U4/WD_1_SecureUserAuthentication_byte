import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AddEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        employee_id: "",
        name: "",
        email: "",
        mobile: "",
        department: "",
        designation: "",
        status: "Active"
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/employees", employee);

            alert("Employee Added Successfully");

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

            <h2 className="text-center mb-4">Add Employee</h2>
         <div className="row justify-content-center">
          <div  className="col-md-6">
           
            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-2"
                    name="employee_id"
                    placeholder="Employee ID"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="name"
                    placeholder="Employee Name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="mobile"
                    placeholder="Mobile"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="department"
                    placeholder="Department"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="designation"
                    placeholder="Designation"
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="status"
                    onChange={handleChange}
                >
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                <div className="text-center">
                    <button className="btn btn-success w-50">
                    Save Employee
                    </button>
                </div>
                

            </form>
          </div>
         </div>
        </div>
    </div>
    );
}

export default AddEmployee;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";


function Attendance() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [records, setRecords] = useState([]);

    const [attendance, setAttendance] = useState({
        employee_id: "",
        attendance_date: "",
        check_in: "",
        check_out: "",
        status: "Present"
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        fetchEmployees();
        fetchAttendance();

    }, []);

    // Fetch Employees
    const fetchEmployees = async () => {

        try {

            const res = await api.get("/employees");

            setEmployees(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    // Fetch Attendance Records
    const fetchAttendance = async () => {

        try {

            const res = await api.get("/attendance");

            setRecords(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    // Handle Form Input
    const handleChange = (e) => {

        setAttendance({
            ...attendance,
            [e.target.name]: e.target.value
        });

    };

    // Submit Attendance
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/attendance", attendance);

            alert("Attendance Marked Successfully");

            setAttendance({
                employee_id: "",
                attendance_date: "",
                check_in: "",
                check_out: "",
                status: "Present"
            });

            fetchAttendance();

        } catch (err) {

            console.log(err);

            alert("Something went wrong");

        }

    };

    return (
    
    <div className="d-flex">

        <Sidebar />

        <div className="page-shell">
            <div className="page-card">

            <h2 className="page-title">
                Attendance Management
            </h2>
            <p className="page-subtitle">Record attendance, status changes, and attendance history clearly.</p>

            <form
                onSubmit={handleSubmit}
                className="col-md-6 mx-auto"
            >

                <div className="mb-3">

                    <label className="form-label">
                        Employee
                    </label>

                    <select
                        className="form-control"
                        name="employee_id"
                        value={attendance.employee_id}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {employees.map((emp) => (

                            <option
                                key={emp.id}
                                value={emp.id}
                            >
                                {emp.employee_id} - {emp.name}
                            </option>

                        ))}

                    </select>

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Attendance Date
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        name="attendance_date"
                        value={attendance.attendance_date}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Check In
                    </label>

                    <input
                        type="time"
                        className="form-control"
                        name="check_in"
                        value={attendance.check_in}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Check Out
                    </label>

                    <input
                        type="time"
                        className="form-control"
                        name="check_out"
                        value={attendance.check_out}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Status
                    </label>

                    <select
                        className="form-control"
                        name="status"
                        value={attendance.status}
                        onChange={handleChange}
                    >
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Leave</option>
                        <option>SickLeave</option>
                        <option>WeekOff</option>
                        <option>Holiday</option>
                    </select>

                </div>

                <div className="text-center">

                    <button className="btn btn-success">
                        Mark Attendance
                    </button>

                </div>

            </form>

            <hr className="my-5" />

            <h3 className="text-center mb-4">
                Attendance Records
            </h3>

            <table className="table table-bordered table-modern">

                <thead className="table-dark">

                    <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Date</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {records.length > 0 ? (

                        records.map((record) => (

                            <tr key={record.id}>

                                <td>
                                    {record.employee_id} - {record.name}
                                </td>

                                <td>
                                    {record.department}
                                </td>

                                <td>
                                    {record.attendance_date}
                                </td>

                                <td>
                                    {record.check_in || "-"}
                                </td>

                                <td>
                                    {record.check_out || "-"}
                                </td>

                                <td>
                                    {record.status}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Attendance Records
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

            </div>

        </div>

    </div>

    );

}

export default Attendance;
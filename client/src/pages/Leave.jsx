import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Leave() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [requests, setRequests] = useState([]);
    const [form, setForm] = useState({
        employee_id: "",
        start_date: "",
        end_date: "",
        reason: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        fetchEmployees();
        fetchRequests();
    }, [navigate]);

    const fetchEmployees = async () => {
        try {
            const res = await api.get("/employees");
            setEmployees(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await api.get("/leaves");
            setRequests(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/leaves", form);
            alert("Leave request submitted successfully");
            setForm({ employee_id: "", start_date: "", end_date: "", reason: "" });
            fetchRequests();
        } catch (error) {
            console.error(error);
            alert("Unable to submit leave request");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/leaves/${id}`, { status });
            alert(`Leave ${status.toLowerCase()} successfully`);
            fetchRequests();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="page-shell">
                <div className="page-card">
                <h2 className="page-title">Leave Management</h2>
                <p className="page-subtitle">Submit, review, and approve leave requests within the same system.</p>

                <div className="row g-4">
                    <div className="col-lg-5">
                        <div className="card shadow-sm p-4">
                            <h5 className="mb-3">Apply for Leave</h5>
                            <form onSubmit={handleSubmit}>
                                <select className="form-select mb-3" name="employee_id" value={form.employee_id} onChange={handleChange} required>
                                    <option value="">Select Employee</option>
                                    {employees.map((emp) => (
                                        <option key={emp.id} value={emp.id}>{emp.employee_id} - {emp.name}</option>
                                    ))}
                                </select>
                                <input type="date" className="form-control mb-3" name="start_date" value={form.start_date} onChange={handleChange} required />
                                <input type="date" className="form-control mb-3" name="end_date" value={form.end_date} onChange={handleChange} required />
                                <textarea className="form-control mb-3" name="reason" rows="3" placeholder="Reason for leave" value={form.reason} onChange={handleChange} required />
                                <button className="btn btn-success w-100">Submit Leave Request</button>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card shadow-sm p-4">
                            <h5 className="mb-3">Leave Requests</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered table-modern align-middle">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Employee</th>
                                            <th>Dates</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.length > 0 ? requests.map((request) => (
                                            <tr key={request.id}>
                                                <td>{request.employee_id} - {request.name}</td>
                                                <td>{request.start_date} to {request.end_date}</td>
                                                <td>{request.reason}</td>
                                                <td><span className={`badge ${request.status === "Approved" ? "bg-success" : request.status === "Rejected" ? "bg-danger" : "bg-warning text-dark"}`}>{request.status}</span></td>
                                                <td>
                                                    {request.status === "Pending" ? (
                                                        <>
                                                            <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(request.id, "Approved")}>Approve</button>
                                                            <button className="btn btn-danger btn-sm" onClick={() => updateStatus(request.id, "Rejected")}>Reject</button>
                                                        </>
                                                    ) : (
                                                        <span className="text-muted">Handled</span>
                                                    )}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No leave requests yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Leave;

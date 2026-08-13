import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalEmployees: 0,
        activeEmployees: 0,
        presentToday: 0,
        absentToday: 0,
        lateEmployees: 0,
        leaveToday: 0,
        attendancePercentage: 0,
        departmentWise: [],
        recentAttendance: []
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        fetchDashboard();
    }, [navigate]);

    const fetchDashboard = async () => {
        try {
            const res = await api.get("/dashboard");
            setDashboard(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const statCards = [
        { title: "Total Employees", value: dashboard.totalEmployees, color: "primary" },
        { title: "Present Today", value: dashboard.presentToday, color: "success" },
        { title: "Absent Today", value: dashboard.absentToday, color: "danger" },
        { title: "Late Employees", value: dashboard.lateEmployees, color: "warning" }
    ];

    return (
        <>
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div className="page-shell">
                    <div className="page-card">
                        <h2 className="page-title">Attendance Dashboard</h2>
                        <p className="page-subtitle">Track daily attendance, staffing, and team activity in one place.</p>

                        <div className="row g-4">
                        {statCards.map((card) => (
                            <div className="col-md-3" key={card.title}>
                                <div className="stat-card text-center">
                                    <h6>{card.title}</h6>
                                    <div className="value">{card.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                        <div className="row g-4 mt-2">
                        <div className="col-lg-4">
                            <div className="section-card">
                                <h5 className="mb-3">Key Highlights</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Attendance %: <strong>{dashboard.attendancePercentage}%</strong></li>
                                    <li className="list-group-item">Employees on Leave: <strong>{dashboard.leaveToday}</strong></li>
                                    <li className="list-group-item">Active Employees: <strong>{dashboard.activeEmployees}</strong></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="section-card">
                                <h5 className="mb-3">Department Overview</h5>
                                <table className="table table-bordered table-striped mb-0">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Department</th>
                                            <th>Employees</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dashboard.departmentWise.length > 0 ? dashboard.departmentWise.map((dept, index) => (
                                            <tr key={`${dept.department}-${index}`}>
                                                <td>{dept.department || "Unassigned"}</td>
                                                <td>{dept.total}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="2" className="text-center">No data available</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="section-card mt-4">
                        <h5 className="mb-3">Recent Attendance</h5>
                        <table className="table table-bordered table-striped mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Employee</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboard.recentAttendance.length > 0 ? dashboard.recentAttendance.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.employee_id} - {item.name}</td>
                                        <td>{item.attendance_date}</td>
                                        <td>{item.status}</td>
                                        <td>{item.check_in || "-"}</td>
                                        <td>{item.check_out || "-"}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center">No recent attendance yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
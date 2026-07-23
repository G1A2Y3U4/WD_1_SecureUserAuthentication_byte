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
        departmentWise: []
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const res = await api.get("/dashboard");
            setDashboard(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="text-center  mt-4 mb-4">
                        Attendance Dashboard
                    </h2>

                    <div className="row g-4">

                        <div className="col-md-3">
                            <div className="card shadow text-center p-3">
                                <h5>Total Employees</h5>
                                <h2>{dashboard.totalEmployees}</h2>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card shadow text-center p-3">
                                <h5>Active Employees</h5>
                                <h2>{dashboard.activeEmployees}</h2>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card shadow text-center p-3">
                                <h5>Present Today</h5>
                                <h2>{dashboard.presentToday}</h2>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card shadow text-center p-3">
                                <h5>Absent Today</h5>
                                <h2>{dashboard.absentToday}</h2>
                            </div>
                        </div>

                    </div>

                    <div className="mt-5">

                        <h4 className="text-center mt-5 mb-4">
                            Department Wise Employees
                        </h4>

                        <table className="table table-bordered table-striped mt-3">

                            <thead className="table-dark">
                                <tr>
                                    <th>Department</th>
                                    <th>Employee Count</th>
                                </tr>
                            </thead>

                            <tbody>

                                {dashboard.departmentWise.length > 0 ? (

                                    dashboard.departmentWise.map(
                                        (dept, index) => (

                                            <tr key={index}>
                                                <td>{dept.department}</td>
                                                <td>{dept.total}</td>
                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="2"
                                            className="text-center"
                                        >
                                            No Data Available
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;
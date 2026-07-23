import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div
            className="bg-dark grey text-white p-3"
            style={{ width: "220px", minHeight: "100vh" }}
        >

            <Link
                to="/dashboard"
                className="btn btn-dark w-100  mt-4 mb-3"
            >
                Dashboard
            </Link>

            <Link
                to="/employees"
                className="btn btn-dark w-100 mb-3"
            >
                Employees
            </Link>

            <Link
                to="/attendance"
                className="btn btn-dark w-100"
            >
                Attendance
            </Link>

        </div>

    );
}

export default Sidebar;
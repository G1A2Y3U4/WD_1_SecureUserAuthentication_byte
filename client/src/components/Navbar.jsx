import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        alert("Logged Out Successfully");

        navigate("/");

    };

    return (

        <nav className="modern-navbar">
            <div className="d-flex justify-content-between align-items-center">
                <div className="navbar-brand">Mini Attendance Management</div>
                <div className="d-flex align-items-center gap-3">
                    <span className="text-light-emphasis">Admin Console</span>
                    <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        alert("Logged Out Successfully");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-dark bg-dark px-4">

            <div className="container-fluid d-flex align-items-center">

                {/* left Side (Empty for Balance) */}
                <div style={{ width: "90px" }}></div>
        

                {/* Center Title */}
                <h3
                    className="text-white m-0 flex-grow-1 text-center" >
                    Mini Attendance Management System
                </h3>

                {/* right Side */}
                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}

export default Navbar;
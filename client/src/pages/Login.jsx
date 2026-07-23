import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // If already logged in, go directly to Dashboard
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }

    }, [navigate]);

    // Login Function
    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        // Validation
        if (username.trim() === "" || password.trim() === "") {

            setError("Please enter Username and Password.");

            return;

        }

        setLoading(true);

        try {

            const response = await api.post("/auth/login", {
                username,
                password
            });

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

            // Redirect to Dashboard
            navigate("/dashboard");

        } catch (err) {

            if (err.response) {

                setError(err.response.data.message);

            } else {

                setError("Server Error");

            }

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container d-flex justify-content-center align-items-center min-vh-100">

            <div
                className="card shadow p-4"
                style={{ width: "400px" }}
            >

                <h2 className="text-center mb-4">
                    Mini Attendance Management System
                </h2>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    {error && (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {loading ? "Logging In..." : "Login"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;
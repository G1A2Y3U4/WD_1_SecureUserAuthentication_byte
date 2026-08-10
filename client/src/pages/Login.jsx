import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

            if (!response.data || !response.data.token) {
                throw new Error("Invalid login response");
            }

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

            // Redirect to Dashboard only after a successful response
            navigate("/dashboard");

        } catch (err) {

            localStorage.removeItem("token");

            if (err.response) {

                setError(err.response.data.message || `Login failed (${err.response.status})`);
                console.error("Login error response:", err.response.data, err.response.status);

            } else {

                setError(err.message || "Login failed. Please try again.");
                console.error("Login error:", err.message, err);

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-shell">

            <div className="auth-card">

                <div className="text-center mb-4">
                    <h2>Attendance Management</h2>
                    <p className="text-muted mb-0">Secure admin access for employee and attendance control</p>
                </div>

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
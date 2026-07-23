import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // ADD THIS
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                username,
                password
            });

            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

            // ADD THIS
            navigate("/dashboard");

        } catch (err) {

            alert("Invalid Username or Password");

            console.log(err);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <input
                        className="form-control mb-3"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn btn-primary">
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Login;
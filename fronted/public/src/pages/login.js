import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, password };

        axios
            .post("http://localhost:4003/api/login", user)
            .then((res) => {
                const { upi_id, message, balance } = res.data;
                if (message === "Login successful") {
                    // Save the user data or token in localStorage or context
                    localStorage.setItem("upi_id", upi_id);
                    localStorage.setItem("balance", balance);
                    
                    // Navigate to the dashboard or home page
                    navigate("/dashboard");
                } else {
                    // Set error message
                    setError(message);
                }
            })
            .catch((err) => {
                setError("An error occurred during login. Please try again.");
            });
    };

    return (
        <div className="container">
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/signup" className="link-primary">SignUp</Link>
            </p>
        </div>
    );
}
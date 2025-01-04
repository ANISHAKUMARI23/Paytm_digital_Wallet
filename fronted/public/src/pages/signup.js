import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Transaction() {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [receiverUpi, setReceiverUpi] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Fetch user information and transactions
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("upi_id");
                const response = await axios.get(`http://localhost:4003/api/user/${userId}`);
                setUser(response.data);
                
                const transactionsResponse = await axios.get(`http://localhost:4003/api/transactions/${userId}`);
                setTransactions(transactionsResponse.data);
            } catch (err) {
                setError("Failed to fetch user data or transactions.");
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("upi_id");
            const response = await axios.post("http://localhost:4003/api/transaction", {
                sender_upi: userId,
                receiver_upi: receiverUpi,
                amount: parseFloat(amount),
            });

            // Update transactions and clear the form
            setTransactions([...transactions, response.data]);
            setReceiverUpi("");
            setAmount("");
            setSuccess("Transaction successful!");
            setError("");
        } catch (err) {
            setError("Transaction failed. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="container">
            <h2>Transaction Page</h2>
            {user && (
                <div>
                    <p>Welcome, {user.name}</p>
                    <p>Balance: {user.balance}</p>
                </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Receiver UPI ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={receiverUpi}
                        onChange={(e) => setReceiverUpi(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Make Transaction
                </button>
            </form>
            <h3>Transaction History</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={transactions}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
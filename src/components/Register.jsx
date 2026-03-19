import { useState } from "react";

function Register() { // Component for registering a new user
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e) { // Runs when the form is submitted
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/users/", {
                method: "POST", // Send POST request to create a new user
                headers: {"Content-Type": "application/json"}, // Sending JSON data
                body: JSON.stringify({username, email, password}) // Convert JS object into JSON
            }); // Call the backend users endpoint
            const data = await response.json(); // Convert response from JSON to JS object
            console.log(data);
            alert("User registered successfully");
        }
        catch (error) {
            console.error("Register error:", error);
        }
    }

    return (
        <div>
            <h2>Register</h2>
            {/* Registration form */}
            <form onSubmit={handleRegister}>
                <div className="form-row">
                    <label>Username</label>
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>Email</label>
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

// Export the component to import it in App.jsx
export default Register;
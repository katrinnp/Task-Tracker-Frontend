import { useState } from "react";
import { Link } from "react-router-dom"; // Used for navigation between pages

// Login component
function Login() {
    // State to store the username input
    const [username, setUsername] = useState("");
    // State to store the password input
    const [password, setPassword] = useState("");
    // State to store currently logged user
    const [currentUser, setCurrentUser] = useState(null); 

    // Handles form submission
    async function handleSubmit(e) {
        // Prevent page refresh
        e.preventDefault();

        try {
            // Request all users from FastAPI
            const response = await fetch("http://127.0.0.1:8000/users"); // React - HTTP - FastAPI
            const users = await response.json(); // Convert response from JSON to JS object
            // Check if user exists with the entered username and password
            const foundUser = users.find (
                (user) => user.username === username && user.password === password
            );
            if(foundUser) {
                setCurrentUser(foundUser); // Save the logged user
                console.log(foundUser);
                alert("Login successful");
            }
            else {
                alert("Invalid username and password");
            }
        }
        catch (error) {
            console.error("Login error:", error);
        }

        console.log("Username:", username);
        console.log("Password:", password);
    }
    return (
        <div>
            <h2>Login</h2>
            
            {/* Form for entering user data */}
            <form onSubmit={handleSubmit}>

                {/* Username field */}
                <div className="form-row">
                    <label>Username</label>
                    {/* Value comes from React state */}
                    <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                
                {/* Password field */}
                <div className="form-row">
                    <label>Password</label>
                    {/* Input connected to password state */}
                    <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Button for submission */}
                <button type="submit">Login</button>
            </form>

            {/* Link to register page */}
            <p>New user</p>
            <Link to="/register">
            <button>Register</button>
            </Link>
        </div>
    );
}

// Export the component to import it in App.jsx
export default Login
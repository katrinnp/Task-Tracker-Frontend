// Login component
function Login() {
    return (
        <div>
            <h2>Login</h2>
            
            {/* Forn for entering user data */}
            <form>

                {/* Username field */}
                <div>
                    <label>Username</label>
                    <input type="text" />
                </div>
                
                {/* Password field */}
                <div>
                    <label>Password</label>
                    <input type="password" />
                </div>

                {/* Button for submission */}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

// Export the component to import it in App.jsx
export default Login
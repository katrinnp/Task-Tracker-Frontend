import { useState } from "react";
import { Link } from "react-router-dom"; // Used for navigation between pages

// Import Chakra UI components
import {
    Box,
    Button,
    Input,
    Heading,
    VStack
} from "@chakra-ui/react";

// Login component
function Login() {
    // State to store the username input
    const [username, setUsername] = useState("");
    // State to store the password input
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handles form submission
    async function handleSubmit(e) {
        setError("");
        // Prevent page refresh
        e.preventDefault();

        if(!username || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            // Request all users from FastAPI
            const response = await fetch("http://127.0.0.1:8000/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"}, // JSON to backend
                body: JSON.stringify({
                    username: username,
                    password: password
                }) // Convert JS object to JSON string
            }); 
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.detail || "Login failed");
            }
            alert("Login successful");
        }
        catch (error) {
            console.error("Login error:", error);
            setError(error.message);
        }
    }
    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box 
                maxW="400px" //Max width
                mx="auto" //Center horizontally
                mt="100px" //Margin top
                p="6" //Padding
                borderWidth="1px" //Border
                borderRadius="lg" //Rounded corners
                boxShadow="lg" //Shadow
            >
        
            <Heading mb="6" textAlign="center">
                Login
            </Heading>
            <form onSubmit={handleSubmit}>
                {/*Vertical stack with spacing*/}
                <VStack spacing={4}>
                    {/* Groups label and input*/}
                    
                        <Input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    
                    
                        <Input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    
                    {/*Button with built-in styling*/}
                    <Button colorScheme="blue" width="full" type="submit">
                        Login
                    </Button>
                    {/*Navigate to register page*/}
                    <Link to="/register">
                        <Button variant="link" colorScheme="blue">
                            New user? Register
                        </Button>
                    </Link>
                    {error && (
                        <Box color="red" fontSize="sm">
                            {error}
                        </Box>
                    )}
                </VStack>
            </form>
        </Box>
        </Box>
    );
}

// Export the component to import it in App.jsx
export default Login;
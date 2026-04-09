import { useState } from "react";
import { Link } from "react-router-dom"; // Used for navigation between pages
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Eye icons
import { useNavigate } from "react-router-dom";

// Import Chakra UI components
import {
    Box,
    Button,
    Input,
    Heading,
    VStack,
    InputGroup, // Groups input and button together
    InputRightElement, // Places button inside input to the right
    IconButton // Clickable button
} from "@chakra-ui/react";

// Login component
function Login() {
    // State to store the username input
    const [username, setUsername] = useState("");
    // State to store the password input
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // Controls whether password is visible or not
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

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
            // Form data for OAuth2 login
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            // Send POST request to auth/login endpoint
            const response = await fetch("http://127.0.0.1:8000/auth/login", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            console.log("LOGIN RESPONSE:", data);
            if(!response.ok) {
                throw new Error(data.detail || "Login failed");
            }
            // Save token to localStorage
            localStorage.setItem("token", data.access_token);
            // Redirect to tasks page
            navigate("/tasks");
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
                    
                        <InputGroup>
                            <Input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement>
                                <IconButton
                                    size="sm"
                                    variant="ghost"
                                    // Accesibility label
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    // Change visibility on click
                                    onClick={() => setShowPassword(!showPassword)}
                                    // Change icon depending on state
                                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                />
                            </InputRightElement>
                        </InputGroup>            
                    
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
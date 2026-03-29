import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Eye icons

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

function Register() { // Component for registering a new user
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // Controls whether password is visible or not
    const [showPassword, setShowPassword] = useState(false);

    async function handleRegister(e) { // Runs when the form is submitted
        e.preventDefault();
        if(!username || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const response = await fetch("http://localhost:8000/users", {
                method: "POST", // Send POST request to create a new user
                headers: {"Content-Type": "application/json"}, // Sending JSON data
                body: JSON.stringify({username, email, password}) // Convert JS object into JSON
            }); // Call the backend users endpoint
            if(!response.ok) {
                throw new Error("Registration failed");
            }
            const data = await response.json(); // Convert response from JSON to JS object
            console.log(data);
            alert("User registered successfully");
            navigate("/");
        }
        catch (error) {
            console.error("Register error:", error);
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
                Register
            </Heading>
            <form onSubmit={handleRegister}>
                <VStack spacing={4}>
                    
                        <Input 
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    
                        <Input 
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    
                    <Button colorScheme="blue" width="full" type="submit">
                        Register
                    </Button>
                    <Link to="/">
                        <Button variant="link" colorScheme="blue">
                            Already have an account? Login
                        </Button>
                    </Link>
                </VStack>
            </form>
        </Box>
        </Box>
    );
}

// Export the component to import it in App.jsx
export default Register;
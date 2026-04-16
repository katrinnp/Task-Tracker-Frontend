import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Chakra UI components
import {
    Box,
    Button,
    Input,
    Heading,
    VStack,
    Text,
    Checkbox
} from "@chakra-ui/react";

const TasksPage = () => {
    // State to store tasks from backend
    const [tasks, setTasks] = useState([]);
    // State to store error
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // State to track loading
    const [loading, setLoading] = useState(true);
    // State for new task inputs 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // This runs when the component loads
    useEffect(() => {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if(!token) {
            navigate("/");
            return;
        }
        // Function to fetch tasks
        async function fetchTasks() {
            try {
                // Send request to backend
                const response = await fetch("http://127.0.0.1:8000/tasks/", {
                    headers: { Authorization: `Bearer ${token}`} // Attach token for authentication
                });
                const data = await response.json();
                if(!response.ok) {
                    throw new Error(data.detail || "Failed to fetch tasks");
                }
                // Save tasks in state
                setTasks(data);
            } catch (error) {
                console.error("Tasks error:", error);
                setError(error.message);
            } finally {
                // Stop loading after request finishes 
                setLoading(false);
            }
        }
        fetchTasks();
    }, [navigate]);

    // Function to create a new task
    async function handleAddTask() {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://127.0.0.1:8000/tasks/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ // Send task data to backend
                    title: title,
                    description: description
                })
            });
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.detail || "Failed to create task");
            }
            // Add new task
            setTasks(prev => [...prev, data]);
            // Clear inputs 
            setTitle("");
            setDescription("");
        } catch(error) {
            setError(error.message);
        }
    }

    // Function to toggle task completion status
        async function handleToggle(task) {
            const token = localStorage.getItem("token");
            try {
                // Send PATCH request to update only status field
                const response = await fetch(`http://127.0.0.1:8000/tasks/${task.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        completed: !task.completed 
                    })
                });
                const updatedTask = await response.json();
                if(!response.ok) {
                    throw new Error(updatedTask.detail || "Failed to update task");
                }
                // Update task 
                setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
            }
            catch (error) {
                setError(error.message);
            }
        }

    // Function to delete task
    async function handleDelete(taskId) {
        const token = localStorage.getItem("token");
        try {
            // Send DELETE request to backend
            const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(!response.ok) {
                throw new Error("Failed to delete task");
            }
            // Remove task from state
            setTasks(prev => prev.filter(t => t.id !== taskId));
        }
        catch (error) {
            setError(error.message);
        }
    }

    // Function to logout user
    function handleLogout() {
        // Remove token from localStorage
        localStorage.removeItem("token");
        // Redirect to login page
        navigate("/");
    }
    return (
        <Box // Full page
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {/*Main*/}
            <Box 
                maxW="500px"
                w="full"
                p="6"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb="6">
                    <Heading size="md">
                        My Tasks
                    </Heading>
                    {/*Logout button*/}
                    <Button colorScheme="red" size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
                <VStack spacing={4}>
                    {/*Input for task title*/}
                    <Input 
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {/*Input for description*/}
                    <Input 
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {/*Add task button*/}
                    <Button colorScheme="blue" width="full" onClick={handleAddTask}>
                        Add Task
                    </Button>
                    {/*Show error*/}
                    {error && <Text color="red.500">{error}</Text>}
                    {/*If no tasks*/}
                    {tasks.length === 0 ? (
                        <Text>No tasks yet</Text>
                    ) : (
                        // Render each task
                        tasks.map((task) => (
                            <Box 
                                key={task.id}
                                w="full"
                                p="4"
                                borderWidth="1px"
                                borderRadius="md"
                            >
                                <Text fontWeight="bold">
                                    {task.title || "No title"}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    {task.description || "No description"}
                                </Text>
                                {/*Checkbox to toggle completion*/}
                                <Box 
                                    mt="3"
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    {/*Checkbox for completion*/}
                                    <Checkbox 
                                        isChecked={task.completed}
                                        onChange={() => handleToggle(task)}
                                    >
                                        Done
                                    </Checkbox>
                                    {/*Delete button*/}
                                    <Button 
                                        size="sm"
                                        colorScheme="red"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        ))
                    )}
                </VStack>
            </Box>
        </Box>
    )
};

export default TasksPage;

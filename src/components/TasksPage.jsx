import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
    // State to store tasks from backend
    const [tasks, setTasks] = useState([]);
    // State to store error
    const [error, setError] = useState("");

    // This runs when the component loads
    useEffect(() => {
        // Function to fetch tasks
        async function fetchTasks() {
            try {
                // Get token from localStorage
                const token = localStorage.getItem("token");
                console.log("TOKEN:", token);
                // Send request to backend
                const response = await fetch("http://127.0.0.1:8000/tasks/", {
                    headers: { Authorization: `Bearer ${token}`} // Attach token for authentication
                });
                const data = await response.json();
                console.log("TASKS RESPONSE:", data);
                if(!response.ok) {
                    throw new Error(data.detail || "Failed to fetch tasks");
                }
                // Save tasks in state
                setTasks(data);
            } catch (error) {
                console.error("Tasks error:", error);
                setError(error.message);
            }
        }
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>My tasks</h1>
            {/*Show error */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Show message if no tasks */}
            {tasks.length === 0 ? (
                <p>No tasks yet</p>
            ) : (
                // Render tasks
                tasks.map((task) => (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                    </div>
                ))
            )}
        </div>
    )
};

export default TasksPage;

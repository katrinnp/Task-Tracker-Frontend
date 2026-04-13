import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
    // State to store tasks from backend
    const [tasks, setTasks] = useState([]);
    // State to store error
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // State to track loading state
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
            } finally {
                // Stop loading after request finishes 
                setLoading(false);
            }
        }
        fetchTasks();
    }, [navigate]);

    // Function to create a new task
    async function handleAddTask() {
        console.log("CLICKED");
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
            console.log("CREATE RESPONSE:", data);
            if(!response.ok) {
                throw new Error(data.detail || "Failed to create task");
            }
            // Add new task
            setTasks(tasks => [...tasks, data]);
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
    return (
        <div>
            <h1>My tasks</h1>
            {/*Add task form*/}
           <div>
            <input 
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input 
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

    <button onClick={handleAddTask}>
        Add Task
    </button>
        </div>
                {/*Show error */}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {/* Show message if no tasks */}
                    {tasks.length === 0 ? (
                        <p>No tasks yet</p>
                    ) : (
                        // Render tasks
                        tasks.map((task) => (
                            <div key={task.id}>
                                <h3>{task.title || "No title"}</h3>
                                <p>{task.description || "No description"}</p>
                                <p>Status: {task.completed ? "Done" : "Pending"}</p>

                                {/*Toggle completed*/}
                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggle(task)}
                                        style={{marginRight: "6px"}}
                                    />
                                    Mark as done
                                </label>
                                <br />
                                <button onClick={() => handleDelete(task.id)}
                                    style={{marginTop: "10px", color:"red"}}>
                                    Delete task
                                </button>
                            </div>
                        ))
                    )}
        </div>
    )
};

export default TasksPage;

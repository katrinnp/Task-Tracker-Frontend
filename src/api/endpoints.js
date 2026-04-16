// Base URL of the backend
const BASE_URL = "http://127.0.0.1:8000";

// Contains all API endpoints used in the frontend
export const ENDPOINTS = {
    // Endpoint for user login
    LOGIN: `${BASE_URL}/auth/login`,
    // Endpoint for user registration
    REGISTER: `${BASE_URL}/users`,
    // Endpoint to get all tasks or create a new task
    TASKS: `${BASE_URL}/tasks/`,
    // Endpoint for a single task by ID - function because ID is dynamic
    TASK_BY_ID: (id) => `${BASE_URL}/tasks/${id}`
};

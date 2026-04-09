// Router components used for navigation between pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import TasksPage from './components/TasksPage'

// Root component- other components will be rendered here
function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />
        {/* Register page */}
        <Route path="/register" element={<Register />} />
        {/* Tasks page */}
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App
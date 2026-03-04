import { StrictMode } from 'react' // Used to build UI components
import { createRoot } from 'react-dom/client' // Creates the root where the React app will be rendered
import App from './App.jsx'
import './index.css'

// Find HTML element with id = 'root' in index.html and render the React app inside it
createRoot(document.getElementById('root')).render(
  // Helps detect potential problems
  <StrictMode> 
    <App />
  </StrictMode>,
)

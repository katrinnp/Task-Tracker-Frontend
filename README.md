# Task Tracker Frontend

This is the frontend application for the Task Tracker project. It provides a simple user interface for authentication (login and registration) and communicates with the FastAPI backend.


## Tech Stack

- React (Vite)
- React Router DOM
- Chakra UI
- JavaScript


## Project Structure

```
src/
│
├── components/
│  ├── Login.jsx # Login page component
│  └── Register.jsx # Register page component
│
├── App.jsx # Main routing configuration
├── main.jsx # Application entry point
├── App.css # Global styles
└── index.css # Base styles
```


## Installation & Setup

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

3. Make sure the backend is running at:
http://localhost:8000


## Authentication Flow

### Login

Endpoint: POST /users/login

Request body:
```json
{
  "username": "string",
  "password": "string"
}
```

Behavior:
- Sends user credentials to the backend
- Displays a success message on successful login
- Displays an error message if login fails

### Register

Endpoint: POST /users

Request body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Behavior:
- Creates a new user in the backend
- Displays a success message on successful registration
- Redirects to the login page after registration


## Components

### Login.jsx

Handles user authentication.

Features:
- Controlled inputs for username and password
- Password visibility toggle (show/hide)
- Error handling
- API request to backend login endpoint
- Navigation to registration page

### Register.jsx

Handles new user registration.

Features:
- Controlled inputs for username, email, and password
- Password visibility toggle
- API request to create a new user
- Redirect to login after successful registration

### App.jsx

Defines application routes using React Router:
- / → Login page
- /register → Register page

### main.jsx

Entry point of the application


## UI Styling

Built with Chakra UI
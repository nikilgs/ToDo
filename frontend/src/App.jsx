import { useState } from "react";
import "./App.css";
import TaskManager from "./components/TaskManager";
import Login from "./components/Login";
function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      <h1>Todo App</h1>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <p>Welcome, {user.email}</p>
          <TaskManager />
        </>
      )}
    </div>
  );
}

export default App;
import { useState } from "react";
import "./App.css";
import TaskManager from "./components/TaskManager";
import Login from "./components/Login";
import Test from "./components1/Test"
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
          <Test />
        </>
      )}
    </div>
  );
}

export default App;
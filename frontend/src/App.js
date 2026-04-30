import { useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [page, setPage] = useState("login");

  const [tasks, setTasks] = useState([
    { title: "Finish assignment", deadline: "2026-05-01", status: "Pending" },
    { title: "Study for quiz", deadline: "2026-05-03", status: "Done" },
  ]);

  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      <nav className="navbar">
  {!user && <button onClick={() => setPage("login")}>Login</button>}
  {!user && <button onClick={() => setPage("register")}>Register</button>}
</nav>

      <hr />

      {page === "login" && <Login setPage={setPage} setUser={setUser} />}

      {page === "register" && <Register setPage={setPage} />}

      {page === "student" && (
        <StudentDashboard
          tasks={tasks}
          setTasks={setTasks}
          user={user}
          setUser={setUser}
          setPage={setPage}
        />
      )}

      {page === "admin" && (
        <AdminDashboard
          tasks={tasks}
          setTasks={setTasks}
          setUser={setUser}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default App;
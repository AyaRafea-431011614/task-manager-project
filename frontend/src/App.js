import { useState } from "react";

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

  return (
    <div>
      <nav>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("student")}>Student Dashboard</button>
        <button onClick={() => setPage("admin")}>Admin Dashboard</button>
      </nav>

      <hr />

      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "student" && <StudentDashboard tasks={tasks} setTasks={setTasks} />}
      {page === "admin" && <AdminDashboard tasks={tasks} setTasks={setTasks} />}
    </div>
  );
}

export default App;
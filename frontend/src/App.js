import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [page, setPage] = useState("login");

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
      {page === "register" && <Register />}
      {page === "student" && <StudentDashboard />}
      {page === "admin" && <AdminDashboard />}
    </div>
  );
}

export default App;
import { useState } from "react";

function Login({ setPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (email === "" || password === "") {
      setMessage("Please enter email and password.");
      return;
    }

    if (email === "admin@gmail.com") {
      setUser({ email: email, role: "admin", group: null });
      setMessage("Admin login successful.");
      setPage("admin");
    } else {
      setUser({ email: email, role: "student", group: "A" });
      setMessage("Student login successful.");
      setPage("student");
    }
  };

  return (
    <div className="card">
      <h2>Student Task Manager</h2>
      <h3>Login</h3>

      <div>
        <label>Email:</label><br />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Password:</label><br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleLogin}>Login</button>

      <p className="message">{message}</p>
    </div>
  );
}

export default Login;
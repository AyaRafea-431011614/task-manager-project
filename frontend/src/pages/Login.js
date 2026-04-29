import { useState } from "react";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Please enter email and password.");
      return;
    }

    if (email === "admin@gmail.com") {
      setPage("admin");
    } else {
      setPage("student");
    }
  };

  return (
    <div>
      <h2>Student Task Manager</h2>
      <h3>Login</h3>

      <div>
        <label>Email:</label><br />
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <br />

      <div>
        <label>Password:</label><br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <br />

      <button type="button" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
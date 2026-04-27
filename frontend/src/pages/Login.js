import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
  if (email === "" || password === "") {
    setMessage("Please enter email and password.");
    return;
  }

  // Simple role logic
  if (email === "admin@gmail.com") {
    setMessage("Admin login successful.");
    console.log("Go to Admin Dashboard");
  } else {
    setMessage("Student login successful.");
    console.log("Go to Student Dashboard");
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

      <button onClick={handleLogin}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default Login;
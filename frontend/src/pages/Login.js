import { useState } from "react";

function Login({ setPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please enter email and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ SAVE USER (important for tasks later)
      localStorage.setItem("user", JSON.stringify(data.user));

      // keep React state also
      setUser(data.user);

      // REDIRECT
      if (data.user.role === "admin") {
        setPage("admin");
      } else {
        setPage("student");
      }

    } catch (err) {
      console.error(err);
      alert("Server error.");
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
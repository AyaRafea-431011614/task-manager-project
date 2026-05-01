import { useState } from "react";

function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (name === "" || email === "" || password === "" || group === "") {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "student",
          group_name: group,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("Account created successfully. Please login.");
      setPage("login");
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="card">
      <h2>Student Task Manager</h2>
      <h3>Register</h3>

      <div>
        <label>Name:</label><br />
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <br />

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

      <div>
        <label>Group:</label><br />
        <input type="text" onChange={(e) => setGroup(e.target.value)} />
      </div>

      <br />

      <button onClick={handleRegister}>Register</button>

      <p className="message">{message}</p>
    </div>
  );
}

export default Register;
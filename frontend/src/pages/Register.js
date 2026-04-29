import { useState } from "react";

function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    if (name === "" || email === "" || password === "" || group === "") {
      setMessage("Please fill in all fields.");
      return;
    }

    setMessage("Registration successful.");
    setPage("student");
    console.log("Registered user:", name, email, password, group);
  };

  return (
    <div>
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

      <p>{message}</p>
    </div>
  );
}

export default Register;
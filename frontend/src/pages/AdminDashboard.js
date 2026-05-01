import { useState, useEffect } from "react";

function AdminDashboard({ setUser, setPage }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to load tasks.");
        return;
      }

      setTasks(data);
    } catch (err) {
      console.error(err);
      setMessage("Server error while loading tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const assignTask = async () => {
    if (title === "" || group === "" || deadline === "") {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          deadline,
          group_name: group,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to assign task.");
        return;
      }

      setMessage("Task assigned successfully.");

      setTitle("");
      setGroup("");
      setDeadline("");

      fetchTasks();
    } catch (err) {
      console.error(err);
      setMessage("Server error while assigning task.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPage("login");
  };

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>

      <h3>Assign Task to Group</h3>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Group name"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      />
      <br /><br />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <br /><br />

      <button onClick={assignTask}>Assign Task</button>

      <p className="message">{message}</p>

      <h3>Assigned Tasks</h3>

      <ul>
        {tasks
          .filter((task) => task.group_name)
          .map((task) => (
            <li key={task.id}>
              {task.title} - {task.group_name} - {task.deadline} - {task.status}
            </li>
          ))}
      </ul>

      <button
        style={{ marginTop: "20px", background: "#dc2626" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
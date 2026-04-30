import { useState } from "react";

function AdminDashboard({ tasks, setTasks, setUser, setPage }) {
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [deadline, setDeadline] = useState("");

  const assignTask = () => {
    if (title === "" || group === "" || deadline === "") {
      alert("Please fill all fields.");
      return;
    }

    const newTask = {
      title,
      group,
      deadline,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setGroup("");
    setDeadline("");
  };

  const handleLogout = () => {
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

      <h3>Assigned Tasks</h3>

      <ul>
        {tasks
  .filter((task) => task.group)
  .map((task, index) => (
          <li key={index}>
            {task.title} - {task.group || "Personal"} - {task.deadline} - {task.status}
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
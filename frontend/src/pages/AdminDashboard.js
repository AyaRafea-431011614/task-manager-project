import { useState } from "react";

function AdminDashboard({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [deadline, setDeadline] = useState("");

  const assignTask = () => {
    if (title === "" || group === "" || deadline === "") {
      alert("Please fill all fields.");
      return;
    }

    const newTask = {
      title: title,
      group: group,
      deadline: deadline,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setGroup("");
    setDeadline("");
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
        {tasks.map((task, index) => (
          <li key={index}>
            {task.title} - {task.group} - {task.deadline} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
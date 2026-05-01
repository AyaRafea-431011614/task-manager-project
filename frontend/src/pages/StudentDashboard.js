import { useState, useEffect } from "react";

function StudentDashboard({ user, setUser, setPage }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Fetch tasks from backend
  useEffect(() => {
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

    fetchTasks();
  }, []);

  // 🔹 Add task (CONNECTED TO BACKEND)
  const addTask = async () => {
    if (title === "" || deadline === "") {
      setMessage("Please enter task title and deadline.");
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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("Task added successfully.");

      // 🔹 reload tasks after adding
      const reload = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newTasks = await reload.json();
      setTasks(newTasks);

      setTitle("");
      setDeadline("");

    } catch (err) {
      console.error(err);
      setMessage("Server error.");
    }
  };

  const markAsDone = async (index) => {
  if (!window.confirm("Mark this task as done?")) return;

  try {
    const token = localStorage.getItem("token");
    const taskId = tasks[index].id;

    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: "done",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to update task.");
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[index].status = "done";
    setTasks(updatedTasks);
    setMessage("Task marked as done.");

  } catch (err) {
    console.error(err);
    setMessage("Server error while updating task.");
  }
};

const deleteTask = async (index) => {
  const task = tasks[index];

  // 🚫 Prevent deleting group tasks
  if (task.group_name) {
    alert("You cannot delete group tasks.");
    return;
  }

  if (!window.confirm("Are you sure you want to delete this task?")) return;

  try {
    const token = localStorage.getItem("token");
    const taskId = task.id;

    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete task.");
      return;
    }

    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    alert("Task deleted successfully.");

  } catch (err) {
    console.error(err);
    alert("Server error while deleting task.");
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
      <h2>Student Dashboard</h2>

      <h3>My Tasks</h3>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-info">
              <strong>{task.title}</strong>
              <span>{task.deadline}</span>
            </div>

            <div className="task-actions">
              <span
                className={`badge ${
                  task.status === "done"
                    ? "done deletable"
                    : "pending actionable"
                }`}
                onClick={() => {
                  if (task.status === "done") deleteTask(index);
                  else markAsDone(index);
                }}
              >
                <span>{task.status}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>

      <h3>Add New Task</h3>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <br /><br />

      <button onClick={addTask}>Add Task</button>
      <p className="message">{message}</p>

      <button
        style={{ marginTop: "20px", background: "#dc2626" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default StudentDashboard;
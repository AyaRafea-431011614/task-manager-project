import { useState } from "react";

function StudentDashboard({ tasks, setTasks, user, setUser, setPage }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  const addTask = () => {
    if (title === "" || deadline === "") {
     setMessage("Please enter task title and deadline.");
      return;
    }

    const newTask = {
      title,
      deadline,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDeadline("");
  };

  const markAsDone = (index) => {
  if (!window.confirm("Mark this task as done?")) return;

  const updatedTasks = [...tasks];
  updatedTasks[index].status = "Done";
  setTasks(updatedTasks);
};

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };
  const deleteTask = (index) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  const updatedTasks = tasks.filter((_, i) => i !== index);
  setTasks(updatedTasks);
};

  return (
    <div className="card">
      <h2>Student Dashboard</h2>

      <h3>My Tasks</h3>

      <ul>
        {tasks
          .filter((task) => !task.group || task.group === user?.group)
          .map((task, index) => (
            <li key={index} className="task-item">
              
              <div className="task-info">
                <strong>{task.title}</strong>
                <span>{task.deadline}</span>
              </div>

              <div className="task-actions">
               <span
  className={`badge ${
    task.status === "Done" ? "done deletable" : "pending actionable"
  }`}
  onClick={() => {
    if (task.status === "Done") deleteTask(index);
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
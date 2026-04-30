import { useState } from "react";

function StudentDashboard({ tasks, setTasks, user }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const addTask = () => {
    if (title === "" || deadline === "") {
      alert("Please enter task title and deadline.");
      return;
    }

    const newTask = {
      title: title,
      deadline: deadline,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDeadline("");
  };

  const markAsDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = "Done";
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
          <span className={`badge ${task.status === "Done" ? "done" : "pending"}`}>
            {task.status}
          </span>

          {task.status === "Pending" && (
            <button onClick={() => markAsDone(index)}>
              Done
            </button>
          )}
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
    </div>
  );
}

export default StudentDashboard;
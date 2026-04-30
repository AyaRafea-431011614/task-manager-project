import { useState } from "react";

function StudentDashboard() {
  const [tasks, setTasks] = useState([
    { title: "Finish assignment", deadline: "2026-05-01", status: "Pending" },
    { title: "Study for quiz", deadline: "2026-05-03", status: "Done" },
  ]);

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
    <div>
      <h2>Student Dashboard</h2>

      <h3>My Tasks</h3>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.title} - {task.deadline} - {task.status}
            {task.status === "Pending" && (
              <button onClick={() => markAsDone(index)}>Mark as Done</button>
            )}
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
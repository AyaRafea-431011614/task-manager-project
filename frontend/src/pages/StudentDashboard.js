function StudentDashboard() {
  return (
    <div>
      <h2>Student Dashboard</h2>

      <h3>My Tasks</h3>

      <ul>
        <li>Finish assignment - Pending</li>
        <li>Study for quiz - Done</li>
        <li>Submit project report - Pending</li>
      </ul>

      <h3>Add New Task</h3>

      <input type="text" placeholder="Task title" />
      <br /><br />

      <input type="date" />
      <br /><br />

      <button>Add Task</button>
    </div>
  );
}

export default StudentDashboard;
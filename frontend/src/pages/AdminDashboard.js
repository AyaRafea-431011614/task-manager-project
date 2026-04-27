function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Assign Task to Group</h3>

      <input type="text" placeholder="Task title" />
      <br /><br />

      <input type="text" placeholder="Group name" />
      <br /><br />

      <input type="date" />
      <br /><br />

      <button>Assign Task</button>

      <h3>Assigned Tasks</h3>

      <ul>
        <li>Project report - Group A - Pending</li>
        <li>Quiz preparation - Group B - Done</li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
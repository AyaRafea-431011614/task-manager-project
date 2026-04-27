function Register() {
  return (
    <div>
      <h2>Student Task Manager</h2>
      <h3>Register</h3>

      <div>
        <label>Name:</label>
        <br />
        <input type="text" placeholder="Enter name" />
      </div>

      <br />

      <div>
        <label>Email:</label>
        <br />
        <input type="email" placeholder="Enter email" />
      </div>

      <br />

      <div>
        <label>Password:</label>
        <br />
        <input type="password" placeholder="Enter password" />
      </div>

      <br />

      <div>
        <label>Group:</label>
        <br />
        <input type="text" placeholder="Enter group" />
      </div>

      <br />

      <button>Register</button>
    </div>
  );
}

export default Register;
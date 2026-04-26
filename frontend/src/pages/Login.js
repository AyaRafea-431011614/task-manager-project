function Login() {
  return (
    <div>
      <h2>Student Task Manager</h2>
      <h3>Login</h3>

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

      <button>Login</button>
    </div>
  );
}

export default Login;
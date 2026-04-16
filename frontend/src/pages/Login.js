import { useState } from "react";
import api from "../services/api";
import "../styles/Login.css";

function Login({ setUser, setShowLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "USER",
  });

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    api
      .post("/auth/login", {
        username: form.username,
        password: form.password,
      })
      .then((res) => {
        const { token, role, username, id } = res.data;

        // 🔥 OPTIONAL: check selected role matches backend
        if (form.role !== role) {
          setError("Selected role does not match your account!");
          return;
        }

        localStorage.setItem("token", token);

        const user = {
          id: Number(id),
          name: username,
          role: role,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      })
      .catch((err) => {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed";

        setError(msg);
        setTimeout(() => setError(""), 3000);
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleLogin}>
        {/* Username */}
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        {/* Password */}
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* 🔥 ROLE SELECT */}
        <select
          className="login-input"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ORGANIZER">Organizer</option>
        </select>

        <button className="login-button">Login</button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "#00c6ff" }}
          onClick={() => setShowLogin(false)}
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;

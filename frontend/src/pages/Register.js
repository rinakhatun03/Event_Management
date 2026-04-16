import { useState } from "react";
import api from "../services/api";
import "../styles/Login.css"; // reuse same styling

function Register({ setShowLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "USER"
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    api.post("/auth/register", form)
      .then(() => {
        setMessage("Registration successful! Please login.");
        setError("");

        setTimeout(() => {
          setShowLogin(true); // go to login
        }, 1500);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
          "Registration failed"
        );
        setMessage("");
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Register</h2>

      {message && <div style={{ color: "lightgreen" }}>{message}</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleRegister}>
        <input
          className="login-input"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <select
          className="login-input"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="USER">User</option>
          <option value="ORGANIZER">Organizer</option>
        </select>

        <button className="login-button">Register</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "#00c6ff" }}
          onClick={() => setShowLogin(true)}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;
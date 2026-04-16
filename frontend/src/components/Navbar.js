import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ user, setUser }) {

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <h2>Event Dashboard</h2>

      <div>
        <Link to="/">Home</Link>

        {user.role === "ORGANIZER" && (
          <Link to="/create">Create Event</Link>
        )}

        <span style={{ marginLeft: "10px" }}>
          {user.name} ({user.role})
        </span>

        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
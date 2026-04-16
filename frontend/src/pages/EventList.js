import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/EventList.css";

function EventList({ user }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const loadEvents = () => {
    api
      .get("/events")
      .then((res) => setEvents(res.data))
      .catch(() => setError("Failed to load events"));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const register = (id) => {
    api
      .post(`/events/${id}/register`, { userId: user.id })
      .then(() => {
        loadEvents();
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
          "Already registered!"
        );
        setTimeout(() => setError(""), 3000);
      });
  };

  return (
    <div className="container">
      <h1 className="title">Events</h1>

      {error && <div className="error">{error}</div>}

      {events.length === 0 && <p>No events available</p>}

      <div className="grid">
        {events.map((e) => (
          <div key={e.id} className="card">
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p>{e.date}</p>
            <p>Seats: {e.seats}</p>
            <p>Registered: {e.registrations?.length || 0}</p>

            {user.role === "USER" && (
              <button
                className="button"
                onClick={() => register(e.id)}
              >
                Register
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
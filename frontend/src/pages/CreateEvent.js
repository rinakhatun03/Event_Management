import { useState } from "react";
import api from "../services/api";
import "../styles/CreateEvent.css";

function CreateEvent({ user }) {

  if (user.role !== "ORGANIZER") {
    return <h2 style={{ textAlign: "center" }}>Access Denied</h2>;
  }

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    seats: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/events", event)
      .then(() => {
        setSuccess("Event created successfully!");
        setError("");

        setEvent({
          title: "",
          description: "",
          date: "",
          seats: "",
        });

        setTimeout(() => setSuccess(""), 3000);
      })
      .catch(() => {
        setError("Failed to create event!");
        setSuccess("");
        setTimeout(() => setError(""), 3000);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Event</h2>

      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="Title"
          value={event.title}
          onChange={(e) =>
            setEvent({ ...event, title: e.target.value })
          }
          required
        />

        <input
          className="form-input"
          placeholder="Description"
          value={event.description}
          onChange={(e) =>
            setEvent({
              ...event,
              description: e.target.value,
            })
          }
          required
        />

        <input
          className="form-input"
          type="date"
          value={event.date}
          onChange={(e) =>
            setEvent({ ...event, date: e.target.value })
          }
          required
        />

        <input
          className="form-input"
          type="number"
          placeholder="Seats"
          value={event.seats}
          onChange={(e) =>
            setEvent({ ...event, seats: e.target.value })
          }
          required
        />

        <button className="form-button">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
import "../styles/EventCard.css";

function EventCard({ event, onRegister }) {
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>Seats: {event.seats}</p>
      <p>Registered: {event.registrations.length}</p>

      <button onClick={() => onRegister(event.id)}>
        Register
      </button>
    </div>
  );
}

export default EventCard;
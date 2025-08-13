import { Link } from 'react-router-dom'

const EventList = (props) => {
  return (
    <main>
      <h1>Event List</h1>

      {!props.events?.length && <p>No events yet.</p>}

      {props.events?.map((event) => (
        <Link key={event._id} to={`/events/${event._id}`}>
          <article>
            <header>
              <h2>{event.title}</h2>
              <p>
                posted by: {event.owner?.username}
                {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : ""}
              </p>
              {event.date && (
                <p>
                  Event Date: {new Date(event.date).toLocaleString()}
                </p>
              )}
            </header>
            <p>Description: <br></br>{event.description}</p>
            <p>
  <strong>Location:</strong><br />
  {event.locationName
    ? event.locationName
    : event.location
    ? `${event.location.lat}, ${event.location.lng}`
    : "No location provided"}
</p>

          </article>
        </Link>
      ))}
    </main>
  )
}

export default EventList

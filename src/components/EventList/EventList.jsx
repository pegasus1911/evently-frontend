import { Link } from 'react-router-dom'

const EventList = (props) => {
  return (
    <main>
      <h1>Event List</h1>
      {props.events.map((event) => (
        <Link key={event._id} to={`/events/${event._id}`}>
          <article>  
            <header>
              <h2>{event.title}</h2>
              <p>
                {event.owner.username} posted on {new Date(event.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{event.description}</p>
            <p>
              📍 {event.location} <br />
              📅 {new Date(event.dateTime).toLocaleString()}
            </p>
          </article>
        </Link>
      ))}
    </main>
  )
}

export default EventList

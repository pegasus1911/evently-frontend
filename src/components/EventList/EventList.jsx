import { Link } from 'react-router-dom' // Importing Link to navigate without page refresh

// Event list component
const EventList = (props) => {
    return (
        <main> {/* Main content wrapper */}
            <h1>Event List</h1>
            <ul> {/* Container for the list of events */}
                {props.events.map(event => (
                    // Loop through each event in the events array
                    <Link key={event?._id} to={`/events/${event?._id}`}> {/* Unique key for React */}
                        {/* Event card */}
                        <article>
                            <header>
                                {/* Event title with fallback */}
                                <h2>{event?.title ?? 'Untitled Event'}</h2>
                                
                                {/* Host name or fallback */}
                                <p>
                                    {event?.owner?.username
                                        ? `Hosted by ${event.owner.username}`
                                        : 'Host unknown'}
                                </p>
                            </header>

                            {/* Event description with fallback */}
                            <p>{event?.description ?? 'No description provided'}</p>

                            {/* Event location and date */}
                            <p>
                                📍 {event?.location ?? 'Location not set'}
                                <br />
                                📅 {event?.dateTime
                                    ? new Date(event.dateTime).toLocaleString()
                                    : 'Date not set'}
                            </p>
                        </article>
                    </Link>
                ))}
            </ul>
        </main>
    )
}

export default EventList

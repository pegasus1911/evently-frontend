import { Link } from 'react-router-dom';

const EventList = (props) => {
  return (
    <main>
      <h1>Event List</h1>

      {!props.events?.length && <p>No events yet.</p>}

      {props.events?.map((event) => {
        console.log(event.image)
        const when = event.date ? new Date(event.date).toLocaleString() : null;

        return (
          <Link key={event._id} to={`/events/${event._id}`}>
            <article>
              <header>
                <p>
                 <img src={event.image?.url} alt="Event logo" />

                </p>
                <h2>{event.title}</h2>
                <p>
                  posted by: {event.owner?.username}{' '}
                  {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : ""}
                </p>
              </header>

              <p>
                Description: <br />{event.description}
              </p>
              {/* Event date/time display */}
              {when && (
                <p>
                  📅 {when}
                </p>
              )}
            </article>
          </Link>
        );
      })}
    </main>
  );
};

export default EventList;

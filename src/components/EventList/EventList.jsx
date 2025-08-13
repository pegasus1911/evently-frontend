// import { Link } from 'react-router-dom';

// const EventList = (props) => {
//   const events = Array.isArray(props.events) ? props.events : [];

//   if (!events.length) {
//     return (
//       <main>
//         <h1>Event List</h1>
//         <p>No events yet.</p>
//       </main>
//     );
//   }

//   return (
//     <main>
//       <h1>Event List</h1>
//       {events.map((event) => {
//         const ownerName = event.owner?.username || 'Unknown';
//         const createdAt = event.createdAt ? new Date(event.createdAt).toLocaleDateString() : '';
//         // Your schema uses `date` (not dateTime); fall back to dateTime if old data exists
//         const when = event.date
//           ? new Date(event.date).toLocaleString()
//           : (event.dateTime ? new Date(event.dateTime).toLocaleString() : 'TBD');

//         return (
//           <Link key={event._id} to={`/events/${event._id}`}>
//             <article>
//               <header>
//                 <h2>{event.title || 'Untitled Event'}</h2>
//                 <p>
//                   {ownerName}{createdAt ? ` • ${createdAt}` : ''}
//                 </p>
//               </header>
//               {event.description && <p>{event.description}</p>}
//               <p>
//                 {event.location ? `📍 ${event.location}` : ''}{' '}
//                 {when ? <><br />📅 {when}</> : null}
//               </p>
//             </article>
//           </Link>
//         );
//       })}
//     </main>
//   );
// };

// export default EventList;

/// new CODEEEEE ====

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
            <p>Location: <br></br>{event.location}</p>

          </article>
        </Link>
      ))}
    </main>
  )
}

export default EventList

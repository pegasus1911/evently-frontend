// import { Link } from 'react-router-dom'
// import MapComponent from '../MapComponent/MapComponent';
// const EventList = (props) => {
//   return (
//     <main>
//       <h1>Event List</h1>

//       {!props.events?.length && <p>No events yet.</p>}

//       {props.events?.map((event) => (
//         <Link key={event._id} to={`/events/${event._id}`}>
//           <article>
//             <header>
//               <h2>{event.title}</h2>
//               <p>
//                 posted by: {event.owner?.username}
//                 {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : ""}
//               </p>
//               {event.date && (
//                 <p>
//                   Event Date: {new Date(event.date).toLocaleString()}
//                 </p>
//               )}
//             </header>
//             <p>Description: <br></br>{event.description}</p>
            
  

//           </article>
//           <br></br>
//         </Link>
//       ))}
//     </main>
//   )
// }

// export default EventList

import { Link } from 'react-router-dom';

const EventList = (props) => {
  return (
    <main>
      <h1>Event List</h1>

      {!props.events?.length && <p>No events yet.</p>}

      {props.events?.map((event) => {
        const when = event.date ? new Date(event.date).toLocaleString() : null;

        return (
          <Link key={event._id} to={`/events/${event._id}`}>
            <article>
              <header>
                <h2>{event.title}</h2>
                <p>
                  posted by: {event.owner?.username}{' '}
                  {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : ""}
                </p>
              </header>

              <p>
                Description: <br />{event.description}
              </p>

              {/* Location display */}
              {event.locationName && event.location?.lat && event.location?.lng && (
                <p>
                  📍 {event.locationName}
                </p>
              )}

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

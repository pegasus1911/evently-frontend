import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as eventService from '../../services/eventService'
import { Link } from 'react-router-dom'

const EventDetails = (props) => {

  const { eventId } = useParams()

  const [event, setEvent] = useState()

  useEffect(() => {
    // fetch a single event
    const fetchEvent = async () => {
      // call the event service
      const eventData = await eventService.show(eventId)
      console.log(eventData)
      setEvent(eventData)
    }
    fetchEvent()
  }, [eventId])
  if (!event) return <main>Loading...</main>
  return (
    <main>
      <header>
        {/* <p>{event.category.toUpperCase()}</p> */}
        <h1>{event.title}</h1>
        <p>
          {event.owner.username} posted on {event.data}
        </p>
        <p>{event.description}</p>

        {event.owner._id === props.user._id && (
          <>
            <Link to={`/events/${eventId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteEvent(eventId)}>Delete</button>
          </>
        )}
      </header>

    </main>
  )
}

export default EventDetails

//ALOT OF ERRORS, WE NEED TO REVIEW
// import { useEffect, useState } from 'react'
// import * as eventService from '../../services/eventService'
// import * as attendanceService from '../../services/attendanceService'

// const EventDetails = (props) => {

//   const { eventId } = useParams()

//   const [event, setEvent] = useState()
//   const [attendees, setAttendees] = useState([])
//   const [attending, setAttending] = useState(false)

//   useEffect(() => {
//     const fetchEvent = async () => {
//       const eventData = await eventService.show(eventId)
//       setEvent(eventData)
//     }
//     fetchEvent()
//   }, [eventId])

//   useEffect(() => {
//     if (!event || !props.user) return

//     let isOwner = false
//     if (event.owner && event.owner._id && props.user._id) {
//       if (event.owner._id === props.user._id) {
//         isOwner = true
//       }
//     }

//     if (isOwner) {
//       const fetchAttendees = async () => {
//         const data = await attendanceService.list(eventId)
//         if (data && data.attendees) {
//           setAttendees(data.attendees)
//         } else {
//           setAttendees([])
//         }
//       }
//       fetchAttendees()
//       setAttending(false) 
//     } else {
//       const checkStatus = async () => {
//         const data = await attendanceService.status(eventId)
//         if (data && data.attending === true) {
//           setAttending(true)
//         } else {
//           setAttending(false)
//         }
//       }
//       checkStatus()
//       setAttendees([]) 
//     }
//   }, [event, eventId, props.user])

//   if (!event) return <main>Loading...</main>

//   let isOwner = false
//   if (props.user && event.owner && event.owner._id === props.user._id) {
//     isOwner = true
//   }

//   const handleClickingAttend = async () => {
//     if (!props.user) return
//     if (isOwner) return 

//     try {
//       if (attending) {
//         await attendanceService.leave(eventId)
//         setAttending(false)
//       } else {
//         await attendanceService.join(eventId)
//         setAttending(true)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   return (
//     <main>
//       <header>
//         <h1>{event.title}</h1>
//         <p>
//           {event.owner && event.owner.username} posted on{" "}
//           {event.date ? new Date(event.date).toLocaleDateString() : ""}
//         </p>
//         <p>{event.description}</p>

//         {isOwner && (
//           <>
//             <Link  className="edit-btn" to={`/events/${eventId}/edit`}>Edit</Link>
//             <button onClick={() => props.handleDeleteEvent(eventId)}>Delete</button>
//           </>
//         )}
//       </header>

//       {props.user && !isOwner && (
//         <button onClick={handleClickingAttend}>
//           {attending ? 'Leave event' : 'Attend event'}
//         </button>
//       )}


//       {!props.user && <p>Please sign in to attend.</p>}

//       {isOwner && (
//         <>
//           <h2>Attendees ({attendees.length})</h2>
//           {!attendees.length && <p>No attendees yet.</p>}
//           {attendees.map((u) => (
//             <p key={u._id}>{u.username}</p>
//           ))}
//         </>
//       )}
//     </main>
//   )
// }

// export default EventDetails

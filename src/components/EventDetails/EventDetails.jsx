import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as eventService from '../../services/eventService'
//import CommentForm from '../CommentForm/CommentForm'
import { Link } from 'react-router-dom'

const EventDetails = (props) => {

  const { eventId } = useParams()

  const [event, setEvent] = useState()
  
  useEffect(() => {
    // fetch a single event
    const fetchEvent = async () => {
      // call the event service
const eventData = await eventService.show(eventId)
      setEvent(eventData)
    }
    fetchEvent()
  }, [eventId])

//   const handleAddComment = async (formData) => {
//     const newComment = await eventService.createComment(formData,eventId)
//     console.log(newComment)
//     setEvent({...event, comments: [...event.comments, newComment]})
//   }

  if (!event) return <main>Loading...</main>

  return (
    <main>
      <header>
        <p>{event.category.toUpperCase()}</p>
        <h1>{event.title}</h1>
        <p>
          {event.author.username} posted on {new Date(event.createdAt).toLocaleDateString()}
        </p>
        {/* DELETE BUTTON */}
        {event.author._id === props.user._id && (
          <>
            <Link to={`/events/${eventId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteEvent(eventId)}>Delete</button>
          </>
        )}
      </header>
      {/* <h2>Comments</h2>
      <CommentForm handleAddComment={handleAddComment} />
       {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <p key={comment._id}>{comment.text}</p>
        ))} */}
    </main>
  )
}

export default EventDetails
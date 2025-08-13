import { useState, useEffect } from "react"// manages local state and useffect fetchs event data while editing 
import { useParams } from "react-router-dom"// useParams is used to access the event ID from the URL
import * as eventService from "../../services/eventService"// importing all functions from eventService
// declaring event form component
const EventForm = (props) => {
    const { eventId } = useParams()// looks for a route param named :id and aliases it to eventId

    const initialState = {
        title: "",
        image: "",
        description: "",
        date: "",
        location: "",
        capacity: "0",
        isPublic: true,
    };

    const [formData, setFormData] = useState(initialState)// formData is the state that will hold the form data

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await eventService.show(eventId)// fetching the event data using the show function from eventService
            setFormData(data)// setting the formData state with the fetched data
        }
        if (eventId) fetchEvent()// if eventId exists, fetch the event data
    }, [eventId])// useEffect will run when eventId changes

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })// updating formData state with the new value
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()

        if (eventId) {
            props.handleUpdateEvent(formData, eventId)
        } else {
            props.handleAddEvent(formData)
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1>{eventId ? 'Edit Event' : 'New Event'}</h1>
                <br></br>
                <label htmlFor="title-input">Title: </label>
                <input
                    required
                    type="text"
                    name="title"
                    id="title-input"
                    value={formData.title}
                    onChange={handleChange}
                />
                <br></br>
                <label htmlFor="description-input">Description: </label>
                <textarea
                    required
                    name="description"
                    id="description-input"
                    value={formData.description}
                    onChange={handleChange}
                />
                <br></br>
                <label htmlFor="date-input">Date & Time: </label>
                <input
                    required
                    type="datetime-local"
                    name="date"
                    id="date-input"
                    value={formData.date}
                    onChange={handleChange}
                />
                <br></br>
                <label htmlFor="location-input">Location: </label>
                <input
                    required
                    type="text"
                    name="location"
                    id="location-input"
                    value={formData.location}
                    onChange={handleChange}
                />
                <br></br>
                <label htmlFor="isPublic-input">Public event? </label>
                <input
                    type="checkbox"
                    name="isPublic"
                    id="isPublic-input"
                    checked={!!formData.isPublic}
                    onChange={(e) => setFormData(f => ({ ...f, isPublic: e.target.checked }))}
                />
                <br></br>
                <label htmlFor="capacity-input">Capacity: </label>
                <input
                    required
                    type="text"
                    name="capacity"
                    id="capacity-input"
                    value={formData.capacity}
                    onChange={handleChange}
                />
                <br></br>
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    )
}

export default EventForm




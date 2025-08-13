import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as eventService from "../../services/eventService"
const EventForm = (props) => {
    const { eventId } = useParams()

 const initialState = {
  title: "",
  image: "",
  description: "",
  date: "",
  capacity: "0",
  isPublic: true,
};


    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await eventService.show(eventId)
            setFormData(data)
        }
        if (eventId) fetchEvent()
    }, [eventId])

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()

        // create a new instance of FormData (comes from the browser and is specifically for multipart/form-data)
        const fd = new FormData()
        fd.append('title', formData.title)
        fd.append('description', formData.description)
        fd.append('date', formData.date)
        fd.append('location', formData.location)
        fd.append('capacity', String(formData.capacity))
        fd.append('isPublic', String(!!formData.isPublic))
        if (formData.image instanceof File) {
            fd.append('image', formData.image)
        }

        if (eventId) {
            props.handleUpdateEvent(formData, eventId)
        } else {
            props.handleAddEvent(fd)
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

                <label htmlFor="image">image</label>
                <input
                    type="file"
                    name="image"
                    id="image-input"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                />
                <br></br>
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    )
}

export default EventForm




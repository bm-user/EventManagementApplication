import { useState, useEffect } from 'react'
import { getEventById } from '../utils/api'
import { useBooking } from '../context/BookingContext'

const categoryColors = {
  Technology: 'bg-purple-100 text-purple-700',
  Music: 'bg-orange-100 text-orange-700',
  Sports: 'bg-green-100 text-green-700',
  Arts: 'bg-pink-100 text-pink-700',
}

function EventDetailPage({ eventId, navigate }) {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const { dispatch } = useBooking()

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true)
      const data = await getEventById(eventId)
      setEvent(data)
      setLoading(false)
    }
    fetchEvent()
  }, [eventId])

  function handleBookNow() {
    dispatch({ type: 'SET_EVENT', payload: event })
    navigate('booking', eventId)
  }

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading event...</div>
  }

  if (!event) {
    return <div className="text-center py-20 text-red-500">Event not found.</div>
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate('events')}
        className="text-purple-600 hover:text-purple-800 text-sm mb-6 flex items-center gap-1"
      >
        ← Back to Events
      </button>

      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover rounded-2xl mb-6"
      />

      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[event.category]}`}>
            {event.category}
          </span>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">{event.title}</h1>
        </div>
        <button
          onClick={handleBookNow}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Book Tickets
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-slate-600">
        <div className="bg-slate-50 rounded-xl p-4 space-y-2">
          <div>📅 <span className="font-medium">{formattedDate}</span></div>
          <div>🕐 <span className="font-medium">{event.time}</span></div>
          <div>📍 <span className="font-medium">{event.location}</span></div>
          <div>🏛️ <span className="font-medium">{event.venue}</span></div>
          <div>👤 <span className="font-medium">Organized by {event.organizerName}</span></div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <h3 className="font-semibold text-slate-800 mb-3">Available Tickets</h3>
          <div className="space-y-2">
            {event.ticketTypes.map(ticket => (
              <div key={ticket.id} className="flex justify-between items-center">
                <span>{ticket.name}</span>
                <span className="font-bold text-purple-600">
                  {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-2">About this Event</h3>
        <p className="text-slate-600 leading-relaxed">{event.description}</p>
      </div>
    </div>
  )
}

export default EventDetailPage
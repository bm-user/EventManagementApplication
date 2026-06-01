import { useState, useEffect } from 'react'
import { getBookings, cancelBooking } from '../utils/api'
import Modal from '../components/Modal'

function MyBookingsPage({ navigate }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Upcoming')
  const [cancelId, setCancelId] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true)
      const data = await getBookings('user1')
      setBookings(data)
      setLoading(false)
    }
    fetchBookings()
  }, [])

  function showNotification(message, type = 'success') {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  async function handleCancel(bookingId) {
    await cancelBooking(bookingId)
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    setCancelId(null)
    showNotification('Booking cancelled successfully.')
  }

  const today = new Date()
  const filtered = bookings.filter(b => {
    const isPast = new Date(b.eventDate) < today
    return filter === 'Upcoming' ? !isPast : isPast
  })

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">My Bookings</h1>

      <div className="flex gap-2 mb-6">
        {['Upcoming', 'Past'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tab
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && <div className="text-center py-20 text-slate-500">Loading bookings...</div>}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 mb-4">No {filter.toLowerCase()} bookings found.</p>
          <button onClick={() => navigate('events')} className="bg-purple-600 text-white px-6 py-2 rounded-lg">
            Browse Events
          </button>
        </div>
      )}

      <div className="space-y-4">
        {filtered.map(booking => {
          const isPast = new Date(booking.eventDate) < today
          return (
            <div key={booking.id} className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{booking.eventTitle}</h2>
                  <p className="text-sm text-slate-500">📅 {new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}>
                  {booking.status === 'confirmed' ? '✓ Confirmed' : '✗ Cancelled'}
                </span>
              </div>

              <div className="text-sm text-slate-600 space-y-1 mb-4">
                {booking.tickets.map((t, i) => (
                  <div key={i}>🎟️ {t.quantity}x {t.type} — ${t.price * t.quantity}</div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t pt-3">
                <div>
                  <span className="text-sm text-slate-500">Total: </span>
                  <span className="font-bold text-slate-800">${booking.totalAmount}</span>
                  <span className="text-xs text-slate-400 ml-3">Ref: {booking.referenceNumber}</span>
                </div>
                {!isPast && booking.status === 'confirmed' && (
                  <button
                    onClick={() => setCancelId(booking.id)}
                    className="text-sm text-red-500 border border-red-300 hover:bg-red-50 px-4 py-1.5 rounded-lg transition-colors"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {cancelId && (
        <Modal
          message="Are you sure you want to cancel this booking? This cannot be undone."
          onConfirm={() => handleCancel(cancelId)}
          onCancel={() => setCancelId(null)}
        />
      )}

      {notification && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  )
}

export default MyBookingsPage
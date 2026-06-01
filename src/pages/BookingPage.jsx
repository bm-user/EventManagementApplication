import { useState } from 'react'
import { useBooking } from '../context/BookingContext'
import { createBooking } from '../utils/api'
import ProgressBar from '../components/ProgressBar'

function BookingPage({ navigate }) {
  const { state, dispatch } = useBooking()
  const { selectedEvent, currentStep, selectedTickets, totalAmount } = state

  if (!selectedEvent) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">No event selected.</p>
        <button onClick={() => navigate('events')} className="bg-purple-600 text-white px-6 py-2 rounded-lg">
          Browse Events
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Book Tickets</h1>
      <p className="text-slate-500 mb-6">{selectedEvent.title}</p>

      <ProgressBar currentStep={currentStep} />

      {currentStep === 1 && <Step1 event={selectedEvent} dispatch={dispatch} navigate={navigate} />}
      {currentStep === 2 && <Step2 dispatch={dispatch} selectedTickets={selectedTickets} totalAmount={totalAmount} />}
      {currentStep === 3 && <Step3 state={state} dispatch={dispatch} navigate={navigate} />}
    </div>
  )
}

function Step1({ event, dispatch, navigate }) {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(event.ticketTypes.map(t => [t.id, 0]))
  )

  const total = event.ticketTypes.reduce((sum, t) => sum + t.price * (quantities[t.id] || 0), 0)
  const totalTickets = Object.values(quantities).reduce((sum, q) => sum + q, 0)

  function handleNext() {
    const tickets = event.ticketTypes
      .filter(t => quantities[t.id] > 0)
      .map(t => ({ type: t.name, quantity: quantities[t.id], price: t.price }))
    dispatch({ type: 'SET_TICKETS', payload: { tickets, total } })
    dispatch({ type: 'NEXT_STEP' })
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-700 mb-4">Select Tickets</h2>
      <div className="space-y-4 mb-6">
        {event.ticketTypes.map(ticket => (
          <div key={ticket.id} className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
            <div>
              <div className="font-medium text-slate-800">{ticket.name}</div>
              <div className="text-purple-600 font-bold">{ticket.price === 0 ? 'Free' : `$${ticket.price}`}</div>
              <div className="text-xs text-slate-400">{ticket.available} available</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantities(prev => ({ ...prev, [ticket.id]: Math.max(0, prev[ticket.id] - 1) }))}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 font-bold"
              >-</button>
              <span className="w-6 text-center font-semibold">{quantities[ticket.id]}</span>
              <button
                onClick={() => setQuantities(prev => ({ ...prev, [ticket.id]: Math.min(ticket.available, prev[ticket.id] + 1) }))}
                className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >+</button>
            </div>
          </div>
        ))}
      </div>

      {total > 0 && (
        <div className="bg-purple-50 rounded-xl p-4 mb-6 flex justify-between font-semibold">
          <span>Total ({totalTickets} ticket{totalTickets > 1 ? 's' : ''})</span>
          <span className="text-purple-600">${total}</span>
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={() => navigate('eventDetail')} className="px-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={totalTickets === 0}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function Step2({ dispatch, selectedTickets, totalAmount }) {
  const totalTickets = selectedTickets.reduce((sum, t) => sum + t.quantity, 0)
  const [attendees, setAttendees] = useState(
    Array.from({ length: totalTickets }, () => ({ name: '', email: '', phone: '' }))
  )
  const [errors, setErrors] = useState([])

  function validate() {
    const newErrors = attendees.map(a => ({
      name: a.name.trim() === '' ? 'Name is required' : '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email) ? 'Valid email is required' : '',
      phone: !/^\d{10}$/.test(a.phone.replace(/\D/g, '')) ? 'Valid 10-digit phone is required' : '',
    }))
    setErrors(newErrors)
    return newErrors.every(e => !e.name && !e.email && !e.phone)
  }

  function updateAttendee(index, field, value) {
    setAttendees(prev => prev.map((a, i) => i === index ? { ...a, [field]: value } : a))
  }

  function handleNext() {
    if (validate()) {
      dispatch({ type: 'SET_ATTENDEES', payload: attendees })
      dispatch({ type: 'NEXT_STEP' })
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-700 mb-4">Attendee Details</h2>
      <div className="space-y-6 mb-6">
        {attendees.map((attendee, index) => (
          <div key={index} className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-medium text-slate-700 mb-3">Attendee {index + 1}</h3>
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={attendee.name}
                  onChange={e => updateAttendee(index, 'name', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors[index]?.name && <p className="text-red-500 text-xs mt-1">{errors[index].name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={attendee.email}
                  onChange={e => updateAttendee(index, 'email', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors[index]?.email && <p className="text-red-500 text-xs mt-1">{errors[index].email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={attendee.phone}
                  onChange={e => updateAttendee(index, 'phone', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors[index]?.phone && <p className="text-red-500 text-xs mt-1">{errors[index].phone}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-purple-50 rounded-xl p-4 mb-6 flex justify-between font-semibold">
        <span>Total Amount</span>
        <span className="text-purple-600">${totalAmount}</span>
      </div>

      <div className="flex justify-between">
        <button onClick={() => dispatch({ type: 'PREV_STEP' })} className="px-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
          Back
        </button>
        <button onClick={handleNext} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Next
        </button>
      </div>
    </div>
  )
}

function Step3({ state, dispatch, navigate }) {
  const { selectedEvent, selectedTickets, attendees, totalAmount } = state
  const [loading, setLoading] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState(null)

  async function handleConfirm() {
    setLoading(true)
    const booking = {
      userId: 'user1',
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      tickets: selectedTickets,
      attendees,
      totalAmount,
      status: 'confirmed',
      bookingDate: new Date().toISOString().split('T')[0],
      referenceNumber: 'BK' + Math.random().toString(36).substr(2, 6).toUpperCase()
    }
    const result = await createBooking(booking)
    setReferenceNumber(result.referenceNumber)
    dispatch({ type: 'SET_REFERENCE', payload: result.referenceNumber })
    setLoading(false)
  }

  if (referenceNumber) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h2>
        <p className="text-slate-500 mb-4">Your reference number is:</p>
        <div className="bg-purple-50 text-purple-700 font-bold text-xl px-6 py-3 rounded-xl inline-block mb-6">
          {referenceNumber}
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={() => { dispatch({ type: 'RESET' }); navigate('myBookings') }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            View My Bookings
          </button>
          <button onClick={() => { dispatch({ type: 'RESET' }); navigate('events') }}
            className="border border-slate-300 px-6 py-2 rounded-lg hover:bg-slate-50">
            Browse More Events
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-700 mb-4">Confirm Your Booking</h2>
      <div className="bg-slate-50 rounded-xl p-4 mb-4">
        <h3 className="font-bold text-slate-800 mb-2">{selectedEvent.title}</h3>
        <p className="text-sm text-slate-500 mb-3">📅 {selectedEvent.date} &nbsp; 📍 {selectedEvent.location}</p>
        <div className="border-t pt-3 space-y-1">
          {selectedTickets.map((t, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{t.quantity}x {t.type}</span>
              <span>${t.price * t.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-purple-600">${totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => dispatch({ type: 'PREV_STEP' })} className="px-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
          Back
        </button>
        <button onClick={handleConfirm} disabled={loading}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50">
          {loading ? 'Confirming...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  )
}

export default BookingPage
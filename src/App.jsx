import { useState } from 'react'
import ThemeProvider from './context/ThemeContext'
import BookingProvider from './context/BookingContext'
import Navbar from './components/Navbar'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import BookingPage from './pages/BookingPage'
import MyBookingsPage from './pages/MyBookingsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('events')
  const [selectedEventId, setSelectedEventId] = useState(null)

  function navigate(page, eventId = null) {
    setCurrentPage(page)
    if (eventId) setSelectedEventId(eventId)
  }

  function renderPage() {
    if (currentPage === 'events') return <EventsPage navigate={navigate} />
    if (currentPage === 'eventDetail') return <EventDetailPage eventId={selectedEventId} navigate={navigate} />
    if (currentPage === 'booking') return <BookingPage eventId={selectedEventId} navigate={navigate} />
    if (currentPage === 'myBookings') return <MyBookingsPage navigate={navigate} />
    return <EventsPage navigate={navigate} />
  }

  return (
    <ThemeProvider>
      <BookingProvider>
        <div className="min-h-screen bg-white dark:bg-slate-900 dark:text-white transition-colors">
          <Navbar currentPage={currentPage} navigate={navigate} />
          <main>
            {renderPage()}
          </main>
        </div>
      </BookingProvider>
    </ThemeProvider>
  )
}

export default App
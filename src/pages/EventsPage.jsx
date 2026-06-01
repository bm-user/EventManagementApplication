import { useState, useEffect, useRef, useMemo } from 'react'
import { getEvents } from '../utils/api'
import EventCard from '../components/EventCard'

function EventsPage({ navigate }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All')
  const [priceFilter, setPriceFilter] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [favorites, setFavorites] = useState([])

  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      setError(null)
      const data = await getEvents()
      if (data.length === 0) {
        setError('Could not load events. Make sure json-server is running.')
      }
      setEvents(data)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  function toggleFavorite(eventId) {
    setFavorites(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    )
  }

  const filteredEvents = useMemo(() => {
    let result = [...events]

    if (search) {
      result = result.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
    }

    if (categoryFilter !== 'All') {
      result = result.filter(e => e.category === categoryFilter)
    }

    if (priceFilter === 'Free') {
      result = result.filter(e => e.ticketTypes.some(t => t.price === 0))
    } else if (priceFilter === 'Under $50') {
      result = result.filter(e => Math.min(...e.ticketTypes.map(t => t.price)) < 50)
    } else if (priceFilter === '$50+') {
      result = result.filter(e => Math.min(...e.ticketTypes.map(t => t.price)) >= 50)
    }

    if (dateFilter === 'Upcoming') {
      result = result.filter(e => new Date(e.date) >= new Date())
    } else if (dateFilter === 'This Month') {
      const now = new Date()
      result = result.filter(e => {
        const d = new Date(e.date)
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      })
    }

    result.sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date)
      if (sortBy === 'price') return Math.min(...a.ticketTypes.map(t => t.price)) - Math.min(...b.ticketTypes.map(t => t.price))
      return 0
    })

    return result
  }, [events, search, categoryFilter, dateFilter, priceFilter, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Upcoming Events</h1>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-slate-300 dark:border-slate-600 rounded-full px-4 py-2 text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
          <option>All</option>
          <option>Technology</option>
          <option>Music</option>
          <option>Sports</option>
          <option>Arts</option>
        </select>

        <select value={dateFilter} onChange={e => setDateFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
          <option>All</option>
          <option>Upcoming</option>
          <option>This Month</option>
        </select>

        <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
          <option>All</option>
          <option>Free</option>
          <option>Under $50</option>
          <option>$50+</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {loading && (
        <div className="text-center py-20 text-slate-500">Loading events...</div>
      )}

      {error && (
        <div className="text-center py-20 text-red-500">{error}</div>
      )}

      {!loading && !error && filteredEvents.length === 0 && (
        <div className="text-center py-20 text-slate-500">No events found. Try different filters.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            isFavorite={favorites.includes(event.id)}
            onToggleFavorite={toggleFavorite}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  )
}

export default EventsPage
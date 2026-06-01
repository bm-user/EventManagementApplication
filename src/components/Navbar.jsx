import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function Navbar({ currentPage, navigate }) {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
      
      <div
        className="text-xl font-bold cursor-pointer flex items-center gap-2"
        onClick={() => navigate('events')}
      >
        🎟️ EventHub
      </div>

      <div className="flex gap-6">
        <button
          className={`text-sm font-medium pb-1 transition-colors ${
            currentPage === 'events' || currentPage === 'eventDetail'
              ? 'text-white border-b-2 border-purple-400'
              : 'text-slate-400 hover:text-white'
          }`}
          onClick={() => navigate('events')}
        >
          Events
        </button>
        <button
          className={`text-sm font-medium pb-1 transition-colors ${
            currentPage === 'myBookings'
              ? 'text-white border-b-2 border-purple-400'
              : 'text-slate-400 hover:text-white'
          }`}
          onClick={() => navigate('myBookings')}
        >
          My Bookings
        </button>
      </div>

      <button
        className="bg-slate-700 hover:bg-slate-600 text-sm px-4 py-2 rounded-full transition-colors"
        onClick={toggleTheme}
      >
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>

    </nav>
  )
}

export default Navbar
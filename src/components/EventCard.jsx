import { memo } from 'react'

const categoryColors = {
  Technology: 'bg-purple-100 text-purple-700',
  Music: 'bg-orange-100 text-orange-700',
  Sports: 'bg-green-100 text-green-700',
  Arts: 'bg-pink-100 text-pink-700',
}

function EventCard({ event, isFavorite, onToggleFavorite, navigate }) {
  const minPrice = Math.min(...event.ticketTypes.map(t => t.price))
  const priceLabel = minPrice === 0 ? 'Free' : `From $${minPrice}`

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
      
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onToggleFavorite(event.id)}
          className="absolute top-3 right-3 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2 ${categoryColors[event.category] || 'bg-gray-100 text-gray-700'}`}>
          {event.category}
        </span>

        <h2 className="text-lg font-bold text-slate-800 mb-2">{event.title}</h2>

        <div className="text-sm text-slate-500 space-y-1 mb-3">
          <div>📅 {formattedDate}</div>
          <div>📍 {event.location}</div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-slate-800">{priceLabel}</span>
          <button
            onClick={() => navigate('eventDetail', event.id)}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

    </div>
  )
}

export default memo(EventCard)
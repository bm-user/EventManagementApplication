import { createContext, useReducer, useContext } from 'react'

export const BookingContext = createContext()

const initialState = {
  currentStep: 1,
  selectedEvent: null,
  selectedTickets: [],
  attendees: [],
  totalAmount: 0,
  referenceNumber: null
}

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_EVENT':
      return { ...initialState, selectedEvent: action.payload }
    case 'SET_TICKETS':
      return { ...state, selectedTickets: action.payload.tickets, totalAmount: action.payload.total }
    case 'SET_ATTENDEES':
      return { ...state, attendees: action.payload }
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 }
    case 'PREV_STEP':
      return { ...state, currentStep: state.currentStep - 1 }
    case 'SET_REFERENCE':
      return { ...state, referenceNumber: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}

export default BookingProvider
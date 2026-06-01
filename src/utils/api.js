const BASE_URL = 'http://localhost:3001'

export async function getEvents() {
    try {
        const response = await fetch(`${BASE_URL}/events`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching events:', error)
        return []
    }
}

export async function getEventById(id) {
    try {
        const response = await fetch(`${BASE_URL}/events/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching event by id:', error)
        return null
    }
}

export async function getBookings(userId) {
    try {   
        const response = await fetch(`${BASE_URL}/bookings?userId=${userId}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching bookings:', error)
        return []
    }
  }

export async function createBooking(bookingdata){
    try 
    {
        const response = await fetch(`${BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingdata)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating booking:', error)
        return null
    }   
}

export async function cancelBooking(bookingId) {
    try {
        const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'cancelled' })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error canceling booking:', error)
        return null
    }
}

import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'

const events = [
  {
    title: "React Conference 2025",
    description: "Annual React developers conference featuring the latest updates, best practices, and hands-on workshops for developers of all levels.",
    category: "Technology",
    date: "2026-09-15",
    time: "09:00 AM",
    location: "San Francisco, CA",
    venue: "Moscone Convention Center",
    image: "https://picsum.photos/seed/tech1/400/200",
    organizerName: "Tech Events Inc",
    ticketTypes: [
      { id: "t1", name: "General", price: 99, available: 100 },
      { id: "t2", name: "VIP", price: 299, available: 20 }
    ]
  },
  {
    title: "Summer Music Festival",
    description: "Three days of live music across 5 stages featuring top artists from around the world. Food, art, and good vibes.",
    category: "Music",
    date: "2026-07-20",
    time: "12:00 PM",
    location: "Austin, TX",
    venue: "Zilker Park",
    image: "https://picsum.photos/seed/music1/400/200",
    organizerName: "Live Nation",
    ticketTypes: [
      { id: "t1", name: "General", price: 149, available: 500 },
      { id: "t2", name: "VIP", price: 399, available: 50 }
    ]
  },
  {
    title: "City Marathon 2025",
    description: "Annual city marathon with 5K, 10K, half marathon, and full marathon categories. All fitness levels welcome.",
    category: "Sports",
    date: "2026-10-05",
    time: "07:00 AM",
    location: "Chicago, IL",
    venue: "Grant Park",
    image: "https://picsum.photos/seed/sports1/400/200",
    organizerName: "Chicago Sports Foundation",
    ticketTypes: [
      { id: "t1", name: "5K Entry", price: 0, available: 200 },
      { id: "t2", name: "Full Marathon", price: 75, available: 150 }
    ]
  },
  {
    title: "Modern Art Exhibition",
    description: "A curated collection of contemporary art from 50 emerging artists. Paintings, sculptures, and digital installations.",
    category: "Arts",
    date: "2026-08-10",
    time: "10:00 AM",
    location: "New York, NY",
    venue: "MoMA",
    image: "https://picsum.photos/seed/arts1/400/200",
    organizerName: "NYC Arts Council",
    ticketTypes: [
      { id: "t1", name: "General Admission", price: 25, available: 300 },
      { id: "t2", name: "Members", price: 0, available: 100 }
    ]
  },
  {
    title: "JavaScript Summit",
    description: "Deep dive into modern JavaScript, Node.js, TypeScript, and the future of web development.",
    category: "Technology",
    date: "2026-11-20",
    time: "09:00 AM",
    location: "Seattle, WA",
    venue: "Washington State Convention Center",
    image: "https://picsum.photos/seed/tech2/400/200",
    organizerName: "JS Foundation",
    ticketTypes: [
      { id: "t1", name: "General", price: 79, available: 200 },
      { id: "t2", name: "Workshop Pass", price: 199, available: 40 }
    ]
  },
  {
    title: "Jazz Night Live",
    description: "An intimate evening of smooth jazz with award-winning musicians in a beautiful venue.",
    category: "Music",
    date: "2026-05-31",
    time: "07:30 PM",
    location: "New Orleans, LA",
    venue: "Jazz Preservation Hall",
    image: "https://picsum.photos/seed/music2/400/200",
    organizerName: "NOLA Music Events",
    ticketTypes: [
      { id: "t1", name: "Standard", price: 45, available: 80 }
    ]
  },
  {
    title: "NBA All-Star Weekend",
    description: "Experience the biggest basketball event of the year with celebrity games, slam dunk contests, and more.",
    category: "Sports",
    date: "2026-12-14",
    time: "06:00 PM",
    location: "Las Vegas, NV",
    venue: "T-Mobile Arena",
    image: "https://picsum.photos/seed/sports2/400/200",
    organizerName: "NBA Events",
    ticketTypes: [
      { id: "t1", name: "Upper Bowl", price: 120, available: 300 },
      { id: "t2", name: "Floor Seats", price: 500, available: 30 }
    ]
  },
  {
    title: "Photography Workshop",
    description: "Learn portrait and landscape photography from professional photographers. Includes hands-on outdoor sessions.",
    category: "Arts",
    date: "2026-08-25",
    time: "10:00 AM",
    location: "Denver, CO",
    venue: "Denver Art Studio",
    image: "https://picsum.photos/seed/arts2/400/200",
    organizerName: "Creative Arts Denver",
    ticketTypes: [
      { id: "t1", name: "Workshop Seat", price: 35, available: 25 }
    ]
  }
]

async function seedEvents() {
  console.log('Seeding events to Firestore...')
  for (const event of events) {
    await addDoc(collection(db, 'events'), event)
    console.log(`Added: ${event.title}`)
  }
  console.log('Done! All 8 events added.')
}

seedEvents()
# EventHub — Event Management Platform
A React application where users can browse events, book tickets, and manage their bookings.
Built as part of the Humber College React course — Project 1.

**Live Demo:** https://event-management-application-zeta-gules.vercel.app/
**GitHub:** https://github.com/bm-user/EventManagementApplication
---
## Features
- Browse events with search, category/date/price filters, and sorting
- View full event details with ticket pricing
- 3-step ticket booking flow (Select Tickets → Attendee Details → Confirmation)
- My Bookings page with upcoming/past filter and cancellation
- Light and Dark mode with preference saved in browser
- Responsive design (desktop and mobile)
---
## How to Run
You need **two terminals** running at the same time.
**Step 1 — Install dependencies (first time only):**
```bash
npm install

**Step 2 — Start the fake backend (json-server)**
npm run server
Runs at: http://localhost:3001

No local backend needed — data is served from Firebase Firestore.

Tech Stack
React 19 + Vite
Tailwind CSS
Firebase Firestore (cloud database)
Deployed on Vercel

# Travel Loop API Documentation

This document outlines the available backend endpoints for the Travel Loop application.

## Authentication
- **Signup**: `POST /api/auth/signup`
  - Payload: `{ "email": "...", "password": "...", "name": "..." }`
- **Login/Logout**: Handled by Auth.js (`/api/auth/signin`, `/api/auth/signout`).

---

## 1. Dashboard
- `GET /api/dashboard`
  - Returns: Upcoming trips, popular cities, user stats, recommended destinations, budget highlights.

## 2. Trips
- `GET /api/trips`: List all user trips.
- `POST /api/trips`: Create a new trip.
  - Payload: `{ "name": "...", "startDate": "...", "endDate": "...", "description": "...", "coverPhoto": "..." }`
- `GET /api/trips/[id]`: Get full trip details (itinerary, budget, etc.).
- `PATCH /api/trips/[id]`: Update trip details.
- `DELETE /api/trips/[id]`: Delete a trip.

## 3. Itinerary (Stops)
- `GET /api/trips/[id]/itinerary`: Get all stops for a trip.
- `POST /api/trips/[id]/itinerary`: Add a stop.
  - Payload: `{ "cityId": "...", "arrivalDate": "...", "departureDate": "...", "order": 1 }`
- `PATCH /api/trips/[id]/itinerary/[stopId]`: Update stop (dates, order).
- `DELETE /api/trips/[id]/itinerary/[stopId]`: Remove stop.

## 4. Activities
- `GET /api/trips/[id]/itinerary/[stopId]/activities`: Get activities for a stop.
- `POST /api/trips/[id]/itinerary/[stopId]/activities`: Add an activity.
  - Payload: `{ "name": "...", "category": "...", "interest": "...", "cost": 0, "description": "...", "image": "..." }`
- `PATCH /api/activities/[id]`: Update activity.
- `DELETE /api/activities/[id]`: Remove activity.

## 5. Search
- `GET /api/search/cities?q=query`: Search for cities.
- `GET /api/search/activities?stopId=...`: Browse activities.

## 6. Budget
- `GET /api/trips/[id]/budget`: Get budget breakdown.
- `POST /api/trips/[id]/budget`: Add/Update budget category.
  - Payload: `{ "category": "transport", "amount": 100, "limit": 500 }`

## 7. Packing Checklist
- `GET /api/trips/[id]/packing`: Get packing list.
- `POST /api/trips/[id]/packing`: Add item.
  - Payload: `{ "name": "...", "category": "clothing" }`
- `PATCH /api/trips/[id]/packing/[itemId]`: Toggle `isChecked`.

## 8. Notes
- `GET /api/trips/[id]/notes`: Get all notes.
- `POST /api/trips/[id]/notes`: Add a note.
  - Payload: `{ "content": "..." }`
- `PATCH /api/trips/[id]/notes/[noteId]`: Edit note.
- `DELETE /api/trips/[id]/notes/[noteId]`: Delete note.

## 9. Sharing & Social
- `PATCH /api/trips/[id]/share`: Toggle public/private.
  - Payload: `{ "isPublic": true }`
- `GET /api/trips/public/[publicId]`: Read-only view of a public trip.
- `POST /api/trips/copy`: Copy a public trip to user account.
  - Payload: `{ "publicId": "..." }`

## 10. User Profile
- `GET /api/user/profile`: Get profile & saved destinations.
- `PATCH /api/user/profile`: Update profile (name, image, language).
- `DELETE /api/user/profile`: Delete account.

## 11. Admin
- `GET /api/admin/stats`: Admin-only platform statistics.

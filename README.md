# 🌲 EcoSentinel — IoT & Full Stack Wildlife Conservation Platform

A full-stack MERN application for tracking wildlife using simulated GPS/IoT collars.
Rangers can monitor live animal positions on a map, view vitals (heart rate,
temperature, speed), and get real-time alerts for geofence breaches, abnormal
vitals, and low collar battery.

## Tech Stack
- **Frontend:** React (Vite), React Router, Leaflet (maps), Recharts (charts), Socket.io-client
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io, JWT auth
- **IoT Layer:** A Node.js simulator script that mimics GPS/biometric collars POSTing data to the API every 5 seconds (swap this for real hardware later — e.g. an ESP32 + GPS + heart-rate sensor calling the same endpoint)

## Folder Structure
```
EcoSentinel/
├── backend/
│   ├── config/db.js
│   ├── models/          # User, Animal, TrackingLog, Alert
│   ├── controllers/
│   ├── routes/
│   ├── middleware/authMiddleware.js
│   ├── simulator/iotSimulator.js   # fake IoT collar data generator
│   ├── seed/seedData.js            # sample animals + admin user
│   └── server.js
└── frontend/
    └── src/
        ├── pages/        # Login, Register, Dashboard, AnimalDetail
        ├── components/   # Sidebar, MapView, AnimalCard, AlertsFeed, StatsPanel
        ├── context/AuthContext.jsx
        └── api/axios.js
```

## Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

## Setup

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # edit MONGO_URI / JWT_SECRET if needed
npm run seed               # creates 5 sample animals + admin@ecosentinel.org / admin123
npm run dev                 # starts API on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev                 # starts app on http://localhost:5173
```

### 3. (Optional) Start the IoT simulator
In a third terminal, from `backend/`:
```bash
npm run simulate
```
This sends live GPS + sensor pings every 5 seconds for each seeded animal, so
you can watch markers move and alerts fire in real time on the dashboard.

## Login
After seeding, sign in with:
- **Email:** admin@ecosentinel.org
- **Password:** admin123

Or register a new ranger/researcher account from the Register page.

## Key Features
- 🗺️ Live map with pulsing GPS markers for each tracked animal
- 📊 Dashboard stats: total tracked, at-risk count, injured count, species mix
- ❤️ Per-animal vitals (heart rate, temperature, speed) with historical chart
- 🚨 Real-time alerts (Socket.io) for geofence breaches, abnormal vitals, low battery
- 🔐 JWT-based auth with role-based access (admin / ranger / researcher)
- 📡 IoT ingestion endpoint (`POST /api/tracking`) ready to accept data from real hardware collars — just point a GPS module at this URL with the same JSON shape

## API Overview
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/animals` | List all animals |
| GET | `/api/animals/:id` | Animal detail + tracking history |
| POST | `/api/animals` | Register new animal (admin/ranger) |
| GET | `/api/animals/stats/summary` | Dashboard summary stats |
| POST | `/api/tracking` | IoT collar posts a GPS/sensor ping |
| GET | `/api/tracking/:animalId` | Tracking history for one animal |
| GET | `/api/alerts` | List alerts |
| PATCH | `/api/alerts/:id/resolve` | Mark alert resolved |

## Next Steps / Ideas to Extend
- Connect a real GPS + heart-rate sensor (e.g. ESP32/Arduino) to POST to `/api/tracking`
- Add push/SMS notifications for critical alerts (Twilio)
- Add historical trail playback on the map
- Deploy backend (Render/Railway) + frontend (Vercel/Netlify) + MongoDB Atlas

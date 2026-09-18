# 🌲 EcoSentinel — IoT & Full-Stack Wildlife Conservation Platform

<p align="center">
  <img src="https://img.shields.io/badge/EcoSentinel-Wildlife%20Conservation-16a34a?style=for-the-badge" alt="EcoSentinel">
  <img src="https://img.shields.io/badge/IoT-Enabled-0ea5e9?style=for-the-badge" alt="IoT">
  <img src="https://img.shields.io/badge/Full%20Stack-Platform-7c3aed?style=for-the-badge" alt="Full Stack">
  <img src="https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge" alt="Status">
</p>

<p align="center">
  <b>A modern IoT + full-stack wildlife monitoring platform designed to help rangers and researchers track animals, monitor health telemetry, and respond to real-time conservation alerts.</b>
</p>

<p align="center">
  <a href="https://github.com/priyanshu18611/EcoSentinel">Repository</a> •
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#installation">Installation</a> •
  <a href="#api-overview">API</a>
</p>

---

## 🐾 Overview

**EcoSentinel** is an IoT-enabled wildlife conservation platform that combines a web dashboard, REST APIs, real-time communication, authentication, mapping, and simulated animal-collar telemetry.

The platform is designed around a practical conservation workflow:

**Animal → IoT Collar → Tracking API → Backend → Database → Real-Time Alerts → Ranger Dashboard**

The current project uses simulated GPS and biometric collar data so the complete system can be developed and tested without physical hardware. The same ingestion architecture can later be connected to real devices such as an ESP32 with GPS and health sensors.

---

## 🎯 Problem

Wildlife teams can face challenges when monitoring animals across large or remote conservation areas:

- Continuous location monitoring
- Animal health and vital tracking
- Early detection of abnormal readings
- Geofence breach detection
- Low-device-battery awareness
- Centralized access to animal information
- Historical movement and telemetry analysis

EcoSentinel brings these workflows together in one full-stack application.

---

## ✨ Key Features

### 🗺️ Live Wildlife Tracking
- Interactive map-based animal monitoring
- GPS location updates
- Animal markers and tracking information
- Architecture prepared for real-time telemetry

### 📊 Conservation Dashboard
- Total tracked animals
- At-risk animals
- Animal health information
- Species distribution
- Monitoring statistics

### ❤️ Animal Health Monitoring
Track telemetry such as:
- Heart rate
- Temperature
- Speed
- Collar/device battery
- GPS coordinates

### 🚨 Real-Time Alerts
The platform can handle alerts for events such as:
- Geofence breaches
- Abnormal vitals
- Low collar battery
- Other tracking-related conditions

### 🔐 Authentication & Authorization
- User registration
- User login
- JWT authentication
- Protected routes
- Role-oriented access architecture

### 📡 IoT Data Ingestion
The backend exposes a tracking endpoint that can receive GPS and sensor telemetry from simulated or real hardware.

### 🤖 IoT Simulation
A Node.js simulator can generate recurring collar telemetry for development and testing.

---

## 🧰 Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router |
| UI / Visualization | CSS, Leaflet, Recharts |
| API Communication | Axios / REST API |
| Real-Time | Socket.io |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| IoT Layer | Node.js telemetry simulator |
| Version Control | Git & GitHub |

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │   Wildlife Animal    │
                    │   + IoT Collar       │
                    └──────────┬───────────┘
                               │
                               │ GPS + Sensors
                               ▼
                    ┌──────────────────────┐
                    │   IoT Simulator /    │
                    │   Real Hardware      │
                    └──────────┬───────────┘
                               │
                               │ HTTP / JSON
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │   REST API           │
                    └──────┬────────┬──────┘
                           │        │
                 ┌─────────┘        └──────────┐
                 ▼                             ▼
        ┌────────────────┐            ┌────────────────┐
        │ MongoDB        │            │ Socket.io      │
        │ Animal Data    │            │ Real-Time      │
        │ Tracking Logs  │            │ Events/Alerts  │
        └────────────────┘            └───────┬────────┘
                                              │
                                              ▼
                                   ┌────────────────────┐
                                   │ React Dashboard    │
                                   │ Map + Stats +      │
                                   │ Animals + Alerts   │
                                   └────────────────────┘
```

---

## 📁 Project Structure

The repository is organized into separate frontend and backend applications:

```text
EcoSentinel/
│
├── .github/
│   └── workflows/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── seedData.js
│
├── README.md
└── .gitignore
```

> The exact contents of individual folders may evolve as new features are added.

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/priyanshu18611/EcoSentinel.git
cd EcoSentinel
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Start the backend using the script configured in `server/package.json`.

Common development command:

```bash
npm run dev
```

If the project uses the standard Node start script instead:

```bash
npm start
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd EcoSentinel/client
npm install
npm run dev
```

Vite will normally provide a local development URL similar to:

```text
http://localhost:5173
```

---

## 4. MongoDB

EcoSentinel uses MongoDB for application data.

You can use:

- MongoDB Community Server
- MongoDB Atlas

For MongoDB Atlas, place the connection string in:

```env
MONGO_URI=your_mongodb_atlas_connection_string
```

Never commit real database credentials or secrets to GitHub.

---

# 📡 IoT Telemetry

The simulator represents a wildlife collar that periodically sends telemetry.

Typical data can include:

```json
{
  "animalId": "animal-id",
  "latitude": 25.5941,
  "longitude": 85.1376,
  "heartRate": 78,
  "temperature": 37.2,
  "speed": 4.6,
  "battery": 87
}
```

A future hardware implementation can replace the simulator with an ESP32/Arduino-based device while keeping the same backend ingestion concept.

---

# 🔌 API Overview

The backend is designed around REST endpoints such as:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/animals` | Get animals |
| GET | `/api/animals/:id` | Get animal details |
| POST | `/api/animals` | Register an animal |
| GET | `/api/animals/stats/summary` | Dashboard statistics |
| POST | `/api/tracking` | Receive IoT telemetry |
| GET | `/api/tracking/:animalId` | Get tracking history |
| GET | `/api/alerts` | Get alerts |
| PATCH | `/api/alerts/:id/resolve` | Resolve an alert |

> Endpoint availability can change as the application evolves. The backend route files are the source of truth.

---

# 🔐 Security

The application uses authentication-related technologies including JWT.

Recommended production practices:

- Keep secrets inside environment variables
- Never commit `.env`
- Use a strong JWT secret
- Validate incoming IoT payloads
- Validate and sanitize user input
- Apply authentication middleware to protected APIs
- Configure CORS for trusted origins
- Use HTTPS in production
- Apply rate limiting to public endpoints
- Store passwords using secure password hashing

---

# 🧪 Development Workflow

Recommended local workflow:

```text
Terminal 1
└── MongoDB

Terminal 2
└── Backend API

Terminal 3
└── Frontend / Vite

Terminal 4
└── IoT Simulator (optional)
```

---

# 🌐 Deployment

A production deployment can be divided into three services:

```text
Frontend
   ↓
Vercel / Netlify

Backend
   ↓
Render / Railway / VPS

Database
   ↓
MongoDB Atlas
```

Before deployment, configure:

- Production MongoDB URI
- JWT secret
- Frontend API URL
- CORS allowed origins
- Production environment variables
- Secure HTTPS endpoints

---

# 📈 Future Roadmap

## Phase 1 — Core Platform
- [x] Authentication architecture
- [x] Wildlife dashboard
- [x] Animal management
- [x] Tracking API
- [x] Alert architecture
- [x] IoT simulation

## Phase 2 — Advanced Monitoring
- [ ] Historical movement playback
- [ ] Advanced geofencing
- [ ] More detailed health analytics
- [ ] Advanced alert filtering
- [ ] Exportable reports
- [ ] Ranger activity logs

## Phase 3 — Real IoT
- [ ] ESP32 integration
- [ ] GPS module
- [ ] Heart-rate sensor
- [ ] Temperature sensor
- [ ] Battery monitoring
- [ ] Device authentication

## Phase 4 — Intelligence Layer
- [ ] Anomaly detection
- [ ] Predictive health alerts
- [ ] Wildlife movement analytics
- [ ] Risk-zone analysis
- [ ] AI-assisted conservation insights

## Phase 5 — Production Platform
- [ ] Cloud deployment
- [ ] Monitoring and logging
- [ ] Automated backups
- [ ] CI/CD
- [ ] Production security hardening
- [ ] Mobile-friendly ranger experience

---

# 💡 Real-World Expansion

EcoSentinel can be extended beyond a simulated environment into a real wildlife monitoring ecosystem.

Potential hardware:

```text
ESP32
  │
  ├── GPS Module
  ├── Temperature Sensor
  ├── Heart-Rate / Health Sensor
  └── Battery Monitor
          │
          ▼
      Network / Gateway
          │
          ▼
      EcoSentinel API
          │
          ▼
       MongoDB
          │
          ▼
    Ranger Dashboard
```

For remote areas, future versions could explore LoRa/LoRaWAN, cellular IoT, or gateway-based communication depending on deployment requirements.

---

# 🧑‍💻 Development Principles

EcoSentinel is intended to follow:

- Modular architecture
- Separation of frontend and backend concerns
- Reusable React components
- RESTful API design
- Secure authentication
- Environment-based configuration
- Maintainable folder structure
- Git-based version control
- Production-oriented deployment practices

---

# 🛠️ Troubleshooting

### Frontend does not start

```bash
cd client
npm install
npm run dev
```

### Backend dependencies missing

```bash
cd server
npm install
```

### MongoDB connection error

Check:

```env
MONGO_URI=...
```

and make sure MongoDB is running or the Atlas connection is reachable.

### CORS error

Verify that the backend allows the frontend origin and that the frontend is using the correct API base URL.

### Port already in use

Change the backend port in `.env`:

```env
PORT=5001
```

and update the frontend API configuration accordingly.

---

# 📊 Project Highlights

| Area | Implementation |
|---|---|
| Architecture | Full-stack client/server |
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB |
| Authentication | JWT |
| Real-Time | Socket.io |
| Maps | Leaflet |
| Charts | Recharts |
| IoT | Simulated telemetry |
| API | REST |
| Version Control | Git/GitHub |

---

# 👨‍💻 Author

### Priyanshu Kumar

Computer Science & Engineering

GitHub:  
https://github.com/priyanshu18611

Project Repository:  
https://github.com/priyanshu18611/EcoSentinel

---

# ⭐ Support the Project

If you find EcoSentinel useful or interesting:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐛 Open an issue
- 💡 Suggest an improvement
- 🤝 Contribute to the project

---

## 📄 License

Add an appropriate open-source license to the repository before distributing the project publicly.

A common choice for personal/open-source projects is the MIT License.

---

<p align="center">
  <b>🌲 EcoSentinel</b><br>
  <i>Technology for smarter wildlife conservation.</i>
</p>

# 📅 EventCraft: Event Management & Registration Platform

EventCraft is a premium, full-featured Event Management and RSVP platform designed to provide a seamless and visually stunning experience for both organizers and attendees. Built with a modern, high-performance tech stack, it features a glassmorphic dark-themed user interface, real-time analytics, secure authentication, and fully responsive layouts.

---
## 🌐 Live Preview := https://code-alpha-event-management-system.vercel.app/
## 📷 Preview Images

## ✨ Features

- **🔒 Secure Authentication**
  - JWT-based authentication system.
  - Password hashing via `bcryptjs`.
  - Secure state management with context providers and auto-login persistent sessions.
  - Guest exploration flow combined with restricted interactions (only logged-in users can create events or RSVP).

- **🎪 Rich Event Management**
  - Comprehensive dashboard for event organizers to manage their hosted events.
  - CRUD operations on events: Create, Read, Update, and Delete.
  - Detailed metadata including category, date, time, location, description, capacity constraints, and cover image URLs.
  - Interactive forms with validation and instant visual feedback.

- **🎟️ Seamless Registration & RSVP**
  - Fast single-click registration for events.
  - Dynamic capacity checking: prevents registration when an event is sold out.
  - Real-time RSVP counters and visual progress indicators.
  - Dedicated attendee list tracking for organizers.

- **🎨 Premium Visual Experience**
  - Stunning modern dark-mode design with slate tones (`bg-slate-950`).
  - Immersive background grid patterns and glowing neon accents.
  - Beautiful micro-animations powered by `Framer Motion`.
  - Clean iconography using `Lucide React` and `React Icons`.
  - Elegant toast alerts via `React Hot Toast` for actions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Functional Components, Hooks)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 & PostCSS
- **Routing:** React Router DOM v7
- **Animations:** Framer Motion
- **HTTP Client:** Axios (configured with interceptors/base URL)
- **Icons & UI Details:** Lucide React, React Icons
- **Toast Notifications:** React Hot Toast

### Backend
- **Runtime Environment:** Node.js
- **Framework:** Express (v5)
- **Database:** MongoDB Atlas (Cloud) / MongoDB Local
- **ODM (Object Data Modeling):** Mongoose (v9)
- **Security:** bcryptjs, JSON Web Tokens (JWT)
- **Middleware:** CORS (Cross-Origin Resource Sharing), Express JSON Parser, Morgan (HTTP Request Logger)
- **Development Tools:** Nodemon, Dotenv

---

## 📂 Project Structure

```bash
Event_Management_System/
├── backend/                  # Express API Server
│   ├── config/               # Database connection config
│   ├── controllers/          # Business logic handlers
│   ├── middleware/           # Auth and error middlewares
│   ├── models/               # MongoDB Mongoose schemas (User, Event, Registration)
│   ├── routes/               # API endpoint routing declarations
│   ├── .env                  # Backend environmental variables (ignored by Git)
│   ├── server.js             # Main server entrypoint
│   └── package.json          # Node backend dependencies & scripts
│
└── frontend/                 # React SPA Client
    ├── public/               # Static assets
    ├── src/                  # React Application Source
    │   ├── api/              # Axios instance configuration & endpoints
    │   ├── assets/           # Icons, images and fonts
    │   ├── components/       # Reusable components (Navbar, Footer, Loader, etc.)
    │   ├── context/          # Global Context (AuthContext)
    │   ├── pages/            # Application pages (Home, Dashboard, CreateEvent, Details, Login, Register)
    │   ├── App.jsx           # Main routing & application wrapper
    │   ├── index.css         # Global styles (Tailwind imports & typography)
    │   └── main.jsx          # Vite React entry point
    │
    ├── .env                  # Frontend environmental variables (ignored by Git)
    ├── vite.config.js        # Vite configuration
    └── package.json          # Frontend packages & scripts
```

---

## ⚙️ Environment Variables Setup

You need to configure environmental variables in both the `backend` and `frontend` folders before running the application locally.

### 1. Backend Config
Navigate to the `/backend` folder and create a `.env` file:
```bash
cd backend
touch .env
```
Add the following configuration settings:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```
> [!NOTE]
> - `PORT`: The port on which the Express server will run locally (defaults to `3000`).
> - `MONGO_URI`: The MongoDB Atlas connection string (or local mongodb address `mongodb://localhost:27017/eventcraft`).
> - `JWT_SECRET`: A high-entropy random string used to sign JWT tokens.
> - `FRONTEND_URL`: The origin URL of your React frontend app to avoid CORS errors in local development.

### 2. Frontend Config
Navigate to the `/frontend` folder and create a `.env` file:
```bash
cd ../frontend
touch .env
```
Add the following configuration settings:
```env
VITE_BACKEND_URL=http://localhost:3000/api
```
> [!NOTE]
> - `VITE_BACKEND_URL`: The base URL pointing to the backend Express server endpoints. Note that Vite requires env variables to be prefixed with `VITE_` to be accessible on the client side.

---

## 🚀 How to Run Locally

Follow these sequential steps to fire up the system on your local machine.

### Step 1: Install Dependencies
Open your terminal and install packages for both components.

**For the Backend:**
```bash
cd backend
npm install
```

**For the Frontend:**
```bash
cd ../frontend
npm install
```

### Step 2: Start the Servers

**Start the Backend Server (with auto-reload):**
```bash
cd backend
npm run dev
```
*The server will boot up and should output `Server running on port 3000` and `MongoDB Connected: <cluster_host> ✅`*

**Start the Frontend Client:**
In a separate terminal window:
```bash
cd frontend
npm run dev
```
*Vite will compile files and spin up a development hot-reloaded server, usually accessible at `http://localhost:5173`.*

---

## 🔌 API Endpoints Summary

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---|
| **POST** | `/api/auth/register` | Register a new user account | No |
| **POST** | `/api/auth/login` | Login and receive JWT access token | No |
| **GET** | `/api/auth/me` | Fetch currently logged-in user profile | Yes (JWT Token) |

### Event Routes (`/api/events`)
| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---|
| **GET** | `/api/events` | Retrieve list of all available events | No |
| **GET** | `/api/events/:id` | Fetch exhaustive details of a single event | No |
| **POST** | `/api/events` | Create a new event | Yes |
| **PUT** | `/api/events/:id` | Update an existing event details | Yes (Creator only) |
| **DELETE** | `/api/events/:id` | Cancel/delete an event | Yes (Creator only) |

### Registration Routes (`/api/registrations`)
| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---|
| **POST** | `/api/registrations/:eventId/register` | Register / RSVP for an event | Yes |
| **GET** | `/api/registrations/:eventId/attendees` | Get list of registered attendees | Yes |
| **GET** | `/api/registrations/user-registrations` | Fetch all RSVPs for the active user | Yes |

---

## 🔄 How It Works (System Architecture Flow)

1. **User Registers/Logs In**:
   - The user inputs credentials on the frontend page.
   - Axios sends a POST request to `/api/auth/register` or `/api/auth/login`.
   - The backend validates fields, queries MongoDB, verifies credentials, signs a JWT token with `JWT_SECRET`, and returns the user object along with the JWT payload.
   
2. **Session Persistence**:
   - The React client stores the JWT token locally (or in storage headers) and populates the `AuthContext` state, turning `isAuthenticated` to true.
   - An Axios interceptor automatically appends the `Authorization: Bearer <token>` header to all outgoing requests to authorized endpoints.

3. **Event Discovery & Operations**:
   - The landing page performs a GET request to `/api/events` to dynamically retrieve all events from MongoDB.
   - When an organizer creates/updates an event, a request is sent to `/api/events`. The server confirms the user's signature using the `authMiddleware` before persisting it to the database.

4. **RSVP Processing**:
   - When an attendee clicks "Register for Event", a request hits `/api/registrations/:eventId/register`.
   - The backend checks:
     - Is the user already registered? (Prevents duplicates)
     - Is the event capacity exceeded? (Returns capacity error)
   - If validations pass, a new `Registration` document links the `User` and the `Event`, and incrementing values update in real-time.
## ✍️ Author
rahulthapa9024

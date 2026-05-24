# Medicore 

A full-stack hospital management system built with **Node.js**, **Express**, and **MongoDB**. Medicore handles the complete patient journey — from registration and appointment booking to prescriptions and billing — with role-based access for patients, doctors, and admins.

---

## Features

- **Auth System** — Register, login, logout with JWT stored in HTTP-only cookies. Token blacklisting on logout.
- **Role-Based Access** — Three roles: `patient`, `doctor`, `admin`. Each role sees only what it's allowed to.
- **Patient Portal** — Manage profile, browse available doctors, book/cancel appointments, view prescriptions and bills.
- **Doctor Portal** — Manage profile and availability, confirm/complete/cancel appointments, write prescriptions, generate bills.
- **Admin Panel** — Full oversight of users, patients, doctors, appointments, prescriptions, and billing.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB + Mongoose |
| Auth | JWT + cookie-parser |
| Password Hashing | bcryptjs |
| Config | dotenv |
| Dev Server | nodemon |

---

## Project Structure

```
Medicore/
├── public/
│   └── index.html              # Frontend (HTML/CSS/JS)
├── src/
│   ├── app.js                  # Express app setup, routes
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/            # Route handler logic
│   │   ├── auth.controller.js
│   │   ├── patient.controller.js
│   │   ├── appointment.controller.js
│   │   ├── prescription.controller.js
│   │   ├── billing.controller.js
│   │   ├── doctor.controller.js
│   │   ├── doctor.appointment.controller.js
│   │   ├── doctor.prescription.controller.js
│   │   ├── doctor.billing.controller.js
│   │   ├── admin.controller.js
│   │   ├── admin.appointment.controller.js
│   │   ├── admin.prescription.controller.js
│   │   └── admin.billing.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js   # JWT verification
│   │   └── role.middleware.js   # Role-based guards
│   ├── models/
│   │   ├── user.model.js
│   │   ├── patient.model.js
│   │   ├── doctor.model.js
│   │   ├── appointment.model.js
│   │   ├── prescription.model.js
│   │   ├── bill.model.js
│   │   └── blacklist.model.js
│   └── routes/                 # Express routers
│       ├── auth.route.js
│       ├── patient.route.js
│       ├── appointment.route.js
│       ├── prescription.route.js
│       ├── billing.route.js
│       ├── doctor.route.js
│       ├── doctor.appointment.route.js
│       ├── doctor.prescription.route.js
│       ├── doctor.billing.route.js
│       ├── admin.route.js
│       ├── admin.appointment.route.js
│       ├── admin.prescription.route.js
│       └── admin.billing.route.js
└── server.js                   # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/medicore.git
cd medicore

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/medicore
JWT_SECRET=your_super_secret_key_here
```

### Running the App

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Open your browser at `http://localhost:3000`.

---

## API Reference

All protected routes require a valid JWT cookie (set automatically on login). Include `credentials: 'include'` in frontend fetch calls.

## Auth API

Base URL: `/api/auth`

### Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user and receive JWT cookie |
| POST | `/api/auth/logout` | Logout user and blacklist token |
| GET | `/api/auth/me` | Get currently logged-in user |

---

### Register User

**POST** `/api/auth/register`

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "patient",
  "phone": "9876543210"
}

---

### Patient — `/api/patient` *(patient only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/patient/profile` | Create patient profile |
| GET | `/api/patient/profile` | Get own profile |
| PUT | `/api/patient/profile` | Update profile |
| GET | `/api/patient/doctors` | Browse available doctors |

**Create profile body:**
```json
{
  "age": 28,
  "gender": "male",
  "bloodGroup": "B+",
  "address": "123 Main St",
  "allergies": ["penicillin"],
  "medicalHistory": ["diabetes"],
  "emergencyContact": {
    "name": "Jane Doe",
    "phone": "9876543210",
    "relation": "spouse"
  }
}
```

---

### Appointments — `/api/appointment` *(patient only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointment` | Book an appointment |
| GET | `/api/appointment` | View my appointments |
| PUT | `/api/appointment/:id/cancel` | Cancel an appointment |

**Book appointment body:**
```json
{
  "doctor": "<doctorUserId>",
  "date": "2025-06-15",
  "timeSlot": "10:00 AM",
  "reason": "Routine checkup"
}
```

Appointment statuses: `PENDING` → `CONFIRMED` → `COMPLETED` / `CANCELLED`

---

### Prescriptions — `/api/prescription` *(patient only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/prescription` | View all my prescriptions |
| GET | `/api/prescription/:id` | View a specific prescription |

---

### Billing — `/api/bill` *(patient only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bill` | View all my bills |
| GET | `/api/bill/:id` | View a specific bill |

---

### Doctor Profile — `/api/doctor` *(doctor only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/doctor/profile` | Create doctor profile |
| GET | `/api/doctor/profile` | Get own profile |
| PUT | `/api/doctor/profile` | Update profile |

**Create profile body:**
```json
{
  "specialization": "Cardiology",
  "qualification": "MBBS, MD",
  "experience": 8,
  "consultationFee": 500,
  "availableDays": ["Monday", "Wednesday", "Friday"],
  "availableTimeSlots": ["10:00 AM", "11:00 AM", "02:00 PM"],
  "bio": "Experienced cardiologist..."
}
```

---

### Doctor — Appointments — `/api/doctor/appointments` *(doctor only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctor/appointments` | View all assigned appointments |
| GET | `/api/doctor/appointments/:id` | View appointment details |
| PUT | `/api/doctor/appointments/:id/confirm` | Confirm an appointment |
| PUT | `/api/doctor/appointments/:id/complete` | Mark as completed |
| PUT | `/api/doctor/appointments/:id/cancel` | Cancel an appointment |

---

### Doctor — Prescriptions — `/api/doctor/prescriptions` *(doctor only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/doctor/prescriptions` | Write a prescription |
| GET | `/api/doctor/prescriptions` | View all prescriptions written |
| PUT | `/api/doctor/prescriptions/:id` | Update a prescription |

**Write prescription body:**
```json
{
  "appointment": "<appointmentId>",
  "patient": "<patientId>",
  "diagnosis": "Hypertension",
  "medicines": [
    {
      "name": "Amlodipine",
      "dosage": "5mg",
      "frequency": "Once daily",
      "duration": "30 days",
      "instructions": "Take after food"
    }
  ],
  "labTests": ["CBC", "Lipid Profile"],
  "advice": "Reduce salt intake",
  "followUpDate": "2025-07-15"
}
```

---

### Doctor — Billing — `/api/doctor/bill` *(doctor only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/doctor/bill` | Generate a bill for a patient |
| GET | `/api/doctor/bill` | View bills generated |

---

### Admin — Users — `/api/admin` *(admin only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/users/:id` | Get user by ID |
| PUT | `/api/admin/users/:id/toggle-status` | Activate / deactivate user |
| DELETE | `/api/admin/users/:id` | Delete a user |
| GET | `/api/admin/patients` | List all patients |
| GET | `/api/admin/doctors` | List all doctors |

---

### Admin — Appointments — `/api/admin/appointments` *(admin only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/appointments` | View all appointments |
| GET | `/api/admin/appointments/:id` | View appointment details |
| PUT | `/api/admin/appointments/:id/cancel` | Cancel any appointment |

---

### Admin — Prescriptions — `/api/admin/prescriptions` *(admin only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/prescriptions` | View all prescriptions |
| GET | `/api/admin/prescriptions/:id` | View prescription details |

---

### Admin — Billing — `/api/admin/bill` *(admin only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/bill` | View all bills |
| GET | `/api/admin/bill/:id` | View bill details |
| PUT | `/api/admin/bill/:id/mark-paid` | Mark a bill as paid |

---

## Authentication Flow

```
Register / Login
      │
      ▼
JWT token set as HTTP-only cookie
      │
      ▼
Each protected request → authMiddleware verifies token
      │                   (checks blacklist, decodes JWT,
      │                    attaches req.user)
      ▼
roleMiddleware checks req.user.role
      │
      ▼
Controller executes
      │
      ▼
Logout → token added to blacklist collection
```

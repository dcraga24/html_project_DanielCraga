# AeroBlue Airlines - Web Technologies Project

## Project Structure

```
aeroblue/
├── frontend/          ← HTML/CSS/JS website
├── backend/
│   └── AeroBlue.API/  ← C# ASP.NET Core backend
└── database.sql       ← MySQL database setup
```

## How to Run

### Step 1 — Start XAMPP
- Open XAMPP Control Panel
- Start **Apache**
- Start **MySQL**

### Step 2 — Create the Database
- Open your browser and go to: `http://localhost/phpmyadmin`
- Click **Import** (top menu)
- Choose the file `database.sql` from this project folder
- Click **Go**
- You should see the `aeroblue` database created with `users` and `bookings` tables

### Step 3 — Run the C# Backend
Open a terminal (Command Prompt or VS Code terminal) and run:

```bash
cd backend/AeroBlue.API
dotnet run
```

You should see:
```
Now listening on: http://localhost:5000
```

Leave this terminal open while using the site.

### Step 4 — Open the Frontend
Open `frontend/index.html` in your browser.

> **Important:** Open it via a local server or directly as a file. The backend runs on `http://localhost:5000`.

---

## Features

- **User Registration & Login** — stored in MySQL with bcrypt password hashing
- **Session Management** — server-side sessions via ASP.NET Core
- **REST API Endpoints:**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/logout`
  - `GET /api/auth/me`
  - `POST /api/bookings`
  - `GET /api/bookings`
  - `GET /api/bookings/{id}`
- **jQuery** — used throughout for DOM manipulation and AJAX calls
- **Weather API** — live weather via Open-Meteo (no API key needed)
- **Currency Converter** — live exchange rates via open.er-api.com
- **Full booking flow** — Home → Flights → Departure → Return → Payment → Confirmation

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript, jQuery
- **Backend:** C# ASP.NET Core (.NET 10)
- **Database:** MySQL (MariaDB via XAMPP)
- **Authentication:** BCrypt password hashing + server-side sessions

<div align="center">

# ShipEx

### A full-stack parcel delivery & logistics management platform

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-projectshipex.vercel.app-4CAF50?style=for-the-badge)](https://projectshipex.vercel.app/)
[![Frontend Repo](https://img.shields.io/badge/Frontend-Repo-181717?style=for-the-badge&logo=github)](https://github.com/Riad-Zz/ShipEx)
[![Backend Repo](https://img.shields.io/badge/Backend-Repo-181717?style=for-the-badge&logo=github)](https://github.com/Riad-Zz/ShipEx_Server)

</div>

---

##  Overview

ShipEx is a complete parcel delivery platform with three distinct roles — **Customer**, **Rider**, and **Admin** — each with their own dashboard and workflow.

- 📦 Customers book parcels, pay via **Stripe**, and track shipments on a real-time timeline
- 🛵 Riders apply, get assigned deliveries by district, update parcel statuses, and cashout earnings
- 🧑‍💼 Admins assign riders, manage users, monitor revenue, and handle the full operational picture

---

## 🖼️ Screenshots

| Admin Dashboard | Parcel Tracking | Rider Tasks |
|:---:|:---:|:---:|
| ![Admin](/public/screenshots/admin.png) | ![Tracking](/public/screenshots/tracking.png) | ![Rider](/public/screenshots/riderTask.png) |

| Assign Rider | Payment History | User Management |
|:---:|:---:|:---:|
| ![Assign](/public/screenshots/assignRider.png) | ![Payments](/public/screenshots/paymentHistory.png) | ![Users](/public/screenshots/userManagement.png) |

---

## ⚙️ Tech Stack

### Frontend
<p>
  <img src="https://skillicons.dev/icons?i=react" title="React 19" />
  <img src="https://skillicons.dev/icons?i=vite" title="Vite" />
  <img src="https://skillicons.dev/icons?i=js" title="JavaScript" />
  <img src="https://skillicons.dev/icons?i=tailwind" title="Tailwind CSS v4" />
  <img src="https://skillicons.dev/icons?i=firebase" title="Firebase Auth" />
</p>

| Technology | Purpose |
|---|---|
| React 19 + Vite | Core framework |
| Tailwind CSS v4 + DaisyUI | Styling & UI components |
| React Router v7 | Client-side routing with role guards |
| TanStack Query v5 | Server state, caching, and mutations |
| React Hook Form | Form handling |
| Axios | HTTP client with JWT interceptors |
| Firebase Auth | Email/Password + Google login |
| Stripe Checkout | Real payment processing |
| Recharts | Revenue and earnings charts |
| Leaflet / React-Leaflet | Maps |
| SweetAlert2 + React Toastify | User feedback |

### Backend
<p>
  <img src="https://skillicons.dev/icons?i=nodejs" title="Node.js" />
  <img src="https://skillicons.dev/icons?i=express" title="Express" />
  <img src="https://skillicons.dev/icons?i=mongodb" title="MongoDB" />
  <img src="https://skillicons.dev/icons?i=firebase" title="Firebase Admin SDK" />
</p>

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + MongoDB Atlas | Database |
| Firebase Admin SDK | Server-side token verification |
| Stripe | Payment session creation & verification |

### Deployment
<p>
  <img src="https://skillicons.dev/icons?i=vercel" title="Vercel" />
  <img src="https://skillicons.dev/icons?i=git" title="Git" />
  <img src="https://skillicons.dev/icons?i=github" title="GitHub" />
</p>

| Layer | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Vercel |
| Database | MongoDB Atlas |

---

## ✨ Features

### Customer
- Register / login via Firebase (Email or Google OAuth)
- Book a parcel with sender & receiver details — price auto-calculated by weight and delivery type
- Pay securely via **Stripe Checkout** (real BDT payments)
- Receive a unique `SHIPX-XXXXXXX` **Tracking ID** on payment confirmation
- Track parcel through a live chronological timeline:
  `Awaiting Pickup → Rider Assigned → On Transit → Picked Up → Delivered`
- View full payment history with transaction IDs and receiver info
- Personal dashboard with shipment stats and a 7-day expense trend chart

### Rider
- Apply via `/berider` — submits region, district, NID, and contact info
- Account stays **Pending** until an Admin approves it
- After approval, view parcels filtered to their registered district only
- **Accept or Reject** assigned deliveries
- Update parcel status step by step — every update is logged and reflected in the customer's tracking timeline instantly
- **Cashout** 25% of parcel fee per delivery after marking it delivered *(simulated payout)*
- Dashboard with total earnings, delivered count, active task count, and earnings chart

### Admin
- Master dashboard: total revenue, parcels, riders, users + 7-day revenue chart via MongoDB aggregation
- **Action alerts** — flags paid parcels stuck at `Awaiting Pickup` needing rider assignment
- **Assign Rider** — filters available riders by the parcel's destination district
- **Rider Management** — approve or reject rider applications
- **User Management** — search users, promote to Admin, or revoke access
- Full parcel list and complete Stripe payment ledger

---

## How It Works (Under the Hood)

**Role-Based Access Control**
Three custom React Router guards — `PrivateRoute`, `RiderRoute`, `AdminRoute` — protect routes based on the user's role stored in MongoDB. Unauthorized roles are redirected automatically.

**Firebase Token Verification**
An Axios interceptor automatically attaches the Firebase ID token as `Authorization: Bearer <token>` on every outgoing request. The Express backend verifies it via Firebase Admin SDK before processing any protected route.

**Parcel Timeline Logging**
Every status change (payment confirmed, rider assigned, accepted, on-transit, delivered) writes a timestamped entry to a dedicated `parcellog` collection. The public tracking page queries logs by tracking ID and renders them as a vertical timeline.

**TanStack Query Caching**
All data fetching goes through React Query. Mutations (accepting a task, approving a rider, etc.) call `invalidateQueries` on the relevant keys — updating tables and dashboards instantly without page reloads.

**Duplicate Payment Guard**
On Stripe session verification, the backend checks for an existing `transaction_id` before inserting a payment record — preventing duplicate entries if the success URL is hit more than once.

**MongoDB Aggregation**
Admin and rider dashboards use aggregation pipelines to calculate total revenue, per-day chart data, and role-based user counts — no client-side number crunching.

---

## 📁 Project Structure

```
client/                          # This repo
├── src/
│   ├── Components/              # Reusable UI (loaders, modals)
│   ├── Firebase/                # Firebase initialization
│   ├── Hooks/                   # useAxios, useRole
│   ├── Layouts/                 # Dashboard & root layouts
│   ├── Pages/
│   │   ├── Authentication/      # Login & Register
│   │   ├── BeRider/             # Rider application portal
│   │   ├── DashboardPages/      # Admin, Rider, User specific views
│   │   ├── Home/                # Landing page
│   │   └── SendParcel/          # Parcel booking form
│   ├── Providers/               # AuthContext
│   └── Router/                  # Route config + guards

server/                          # github.com/Riad-Zz/ShipEx_Server
├── index.js                     # Express app, all routes, DB connection
└── .env
```

---

## 🔌 API Reference

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/parcellog/:tracking_id` | Parcel timeline logs | Firebase token |
| `POST` | `/parcel` | Create parcel booking | Public |
| `GET` | `/parcel` | Get parcels (filter by email/status/rider) | Public |
| `PATCH` | `/parcel/:id` | Assign rider to parcel | Admin |
| `PATCH` | `/parcel/rider-update/:id` | Accept / Reject / Update status / Cashout | Firebase token |
| `DELETE` | `/parcel/:id` | Delete a parcel | Public |
| `POST` | `/create-checkout-session` | Create Stripe Checkout session | Public |
| `PATCH` | `/session-status` | Verify Stripe payment & update parcel | Public |
| `GET` | `/payhistory` | Payment history by email | Firebase token |
| `POST` | `/users` | Save new user on register | Public |
| `GET` | `/users` | All users with search | Admin |
| `GET` | `/users/:email/role` | Get user role | Public |
| `POST` | `/users/:id` | Promote / Revoke role | Admin + Firebase token |
| `POST` | `/riders` | Submit rider application | Firebase token |
| `GET` | `/riders` | Get riders (filter by status/district) | Firebase token |
| `POST` | `/riders/:id` | Approve / Reject rider | Admin + Firebase token |
| `GET` | `/admin-stats` | Aggregate stats + charts | Admin + Firebase token |
| `GET` | `/rider-stats/:email` | Rider earnings + chart | Firebase token |
| `GET` | `/user-stats/:email` | User spend + chart | Firebase token |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project (Email/Password + Google auth enabled)
- Stripe account
- ImageBB account (profile image uploads)

### Client Setup

```bash
git clone https://github.com/Riad-Zz/ShipEx.git
cd ShipEx
npm install
```

Create `.env.local`:
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_IMAGE_UPLOAD_KEY=
VITE_STRIPE_PUBLIC_KEY=
VITE_API_BASE_URL=http://localhost:5000
```

```bash
npm run dev
# → http://localhost:5173
```

### Server Setup

```bash
git clone https://github.com/Riad-Zz/ShipEx_Server.git
cd ShipEx_Server
npm install
```

Create `.env`:
```env
PORT=5000
MONGO_URI=
STRIPE_KEY=
STRIPE_DOMAIN=http://localhost:5173
FIREBASE_KEY=        # base64-encoded Firebase service account JSON
```

```bash
node index.js
```

---

## Author

**Riadul Islam Riad**

[![GitHub](https://img.shields.io/badge/GitHub-Riad--Zz-181717?style=flat-square&logo=github)](https://github.com/Riad-Zz)
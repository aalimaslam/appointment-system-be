
---
title: Frontend and Backend Feature Breakdown
description: A detailed breakdown of the frontend and backend responsibilities for the general-purpose appointment system.
---

# 🧩 Feature Breakdown — Frontend vs Backend

This document outlines the features and responsibilities split between the **frontend** and **backend** for the general-purpose appointment + business directory system.

---

## 🖼 Frontend Features (Customer + Business + Admin UIs)

### 1. 🌍 Public Directory (Customer Side)
- Search bar with filters (industry, location, service)
- Business list/grid view
- Business profile page (`/business-name`)
  - Info: name, logo, description, services, hours
  - Embedded booking form (calendar picker)
  - Call/Direction/Contact buttons
- Responsive layout (mobile-first)
- Optional: installable PWA support (Add to Home Screen)

### 2. 📅 Booking System (Customer)
- Select service → choose staff (if available)
- Pick date/time from availability
- Enter user info (name, phone, email)
- Show booking confirmation with:
  - Summary
  - Calendar download link
  - Reschedule/Cancel options
- Show errors/messages based on backend response

### 3. 🧑‍💼 Business Dashboard (Authenticated Portal)
- Login / Register form (email, password, magic link)
- Profile editor (logo, description, socials, hours)
- Service management UI (add/edit/delete)
- Calendar view (appointments list)
- Appointment actions: accept, cancel, reschedule
- CSV export/download button

### 4. 🧑‍⚖️ Admin Panel
- View all businesses
- Approve/reject new listings
- View all bookings
- Global announcements
- Manage categories/industries/tags

### 5. ✨ UI / UX Enhancements
- Animations (Framer Motion or similar)
- Date pickers (React-DatePicker, etc.)
- Drag-and-drop calendar (FullCalendar)
- Modals, toasts, confirmation dialogs

---

## ⚙️ Backend Features (API + Logic Layer)

### 1. 📁 Business Management
- CRUD APIs:
  - `/api/businesses` (list, get, create, update, delete)
- Business schema includes:
  - Name, Description, Industry, Location
  - Slug (for static page)
  - Working hours, holidays
  - Services array (name, duration, price)
- Uploads (logo, banner): store in S3 or Supabase

### 2. 🧾 Booking Engine
- Availability calculation:
  - Based on working hours, buffer time, holidays
  - Conflict detection with existing bookings
- Book appointment:
  - `/api/bookings` (POST)
  - Create booking + lock slot
- Get bookings (per business)
- Reschedule/cancel endpoints (with permission check)
- Webhooks for reminders (email/SMS)

### 3. 🔒 Authentication & Authorization
- JWT-based or Magic Link
- Roles: customer, business-owner, admin
- Route protection middleware
- Forgot password flow or passwordless login

### 4. 📬 Notifications
- Email service:
  - Booking confirmation
  - Reminder (X minutes before)
  - Reschedule/cancellation
- Optional SMS (via Twilio or MSG91)
- Templating system (e.g., with Handlebars)

### 5. 📊 Admin Controls
- Business approval system
- View analytics (bookings, traffic)
- Manage industries/categories
- Flag/spam report logic
- Rate limiting / abuse prevention

### 6. 💸 Premium/Monetization (Optional Module)
- Stripe integration:
  - Payment during booking
  - Subscription plans (for business accounts)
- Track payment status on bookings
- Custom domain support (CNAME records or Vercel rewrites)

---

## 🗃️ Database Tables (Simplified Overview)

| Table            | Purpose                                      |
|------------------|----------------------------------------------|
| `users`          | Stores customer + business owner accounts    |
| `businesses`     | Stores business profile info                 |
| `services`       | Services offered per business                |
| `bookings`       | Appointment data                             |
| `schedules`      | Working hours, breaks, holidays              |
| `admins`         | Platform admins                              |
| `subscriptions`  | Premium plan info (optional)                 |
| `reviews`        | Customer reviews (optional)                  |

---

## 🧠 Suggested Stack Pairing

| Layer      | Suggested Tools/Tech       |
|------------|-----------------------------|
| Frontend   | **Next.js**, Tailwind CSS, React Query |
| Backend    | **NestJS** (or Express), PostgreSQL, Prisma |
| Auth       | NextAuth / Magic Link / JWT |
| Storage    | Supabase / S3 for uploads   |
| Notifications | SendGrid, Twilio         |
| Deployment | Vercel (FE), Railway (BE)   |

---

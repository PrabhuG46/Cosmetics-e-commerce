<div align="center">

<img src="./images/logo.png" alt="Gwen Beauty Logo" width="80" />

# ✨ Gwen Beauty Studio

### A premium minimalist beauty & skincare e-commerce platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://gwen23.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/PrabhuG46/Cosmetics-e-commerce)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Links](#-live-links)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Backend Modules](#-backend-modules)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Admin Panel](#-admin-panel)
- [Deployment](#-deployment)

---

## 🎯 Overview

**Gwen Beauty Studio** is a full-stack, production-ready e-commerce web application for a minimalist beauty and skincare brand. It features a sleek, aesthetic frontend built with vanilla HTML/CSS/JS and a robust Node.js + MongoDB backend — deployed on Vercel (frontend) and Render (backend).

> Designed with a luxury-minimal aesthetic — smooth animations, glassmorphism, and a refined user experience inspired by premium beauty brands.

---

## 🌐 Live Links

| Service | URL |
|---|---|
| 🛍️ **Frontend** | [gwen23.vercel.app](https://gwen23.vercel.app) |
| ⚙️ **Backend API** | Hosted on Render (free tier — may cold-start) |
| 🔧 **Admin Panel** | `/admin.html` — password protected |

---

## ✨ Features

### 🛒 Shopping
- Browse **All Products** and **New Arrivals** grid with lazy loading
- **Real-time search** with instant filtering across products and categories
- **Product Detail** page with image gallery, tabs (Description / Ingredients / How to Use), reviews, trust badges, and delivery info
- **Add to Bag** / **Buy Now** with quantity controls
- Persistent cart stored in-memory per session

### 💝 Wishlist
- Toggle wishlist per product with heart animation
- Wishlist sidebar panel (desktop & mobile)
- Backend sync — wishlist persists across sessions when logged in

### 👤 User Authentication
- **Sign Up** with OTP email verification via Resend
- **Sign In** with phone + password
- **Forgot Password** with OTP-based reset flow
- JWT-based session management

### 👩‍💼 Profile Dashboard
- View & edit: Name, Email, Phone, Shipping Address
- **My Orders** — order history with status, delivery date, payment method
- **My Wishlist** — saved products with quick actions

### 🛍️ Checkout (Multi-step)
- Step 1: Order Summary with promo code support (`GWEN15`, `BEAUTY10`, `FIRST20`)
- Step 2: Payment method selection (UPI, Card, COD, Net Banking)
- Step 3: Order confirmation with estimated delivery

### ⭐ Reviews & Ratings
- Star rating with distribution bars
- Submit reviews (verified purchase badge)
- Mark reviews as helpful

### 📬 Email Notifications
- OTP emails via **Resend API**
- Contact form emails with branding
- Password reset flow

### 📱 Mobile Responsive
- Fully responsive design
- Mobile navbar: Logo left · Bag + Profile + Hamburger right
- Pill-shaped search bar below header
- Slide-out nav: Shop → About → Contact → Wishlist → Bag

### ⏳ Loading States
- Global overlay spinner for all async operations
- Per-section loading spinners with `::before` CSS animation

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Structure & templating |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Styling, animations, glassmorphism |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | DOM, API calls, state management |
| Google Fonts | `Cormorant Garamond` + `Inter` typography |

### Backend
| Technology | Purpose |
|---|---|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Runtime |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | REST API framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | Database (Atlas cloud) |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | ODM / Schema modeling |
| `jsonwebtoken` | JWT auth tokens |
| `bcryptjs` | Password hashing |
| `resend` | Transactional email (OTP, contact) |
| `dotenv` | Environment variable management |
| `cors` | Cross-origin request handling |

### Deployment
| Service | Role |
|---|---|
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | Frontend hosting + SPA routing |
| ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=black) | Backend API hosting |
| ![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=flat&logo=mongodb&logoColor=white) | Cloud database |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) | Source control + CI/CD trigger |

---

## 📁 Project Structure

```
Gwen-Beauty-Studio/
│
├── 📄 index.html              # Main SPA — all pages rendered via JS
├── 📄 admin.html              # Admin panel (separate page)
├── 📄 style.css               # Global shared styles
├── 📄 config.js               # API_URL config (switches dev/prod)
├── 📄 checkout.js             # Checkout page logic
├── 📄 vercel.json             # Vercel SPA rewrite rules
├── 📄 netlify.toml            # Netlify fallback config
│
└── 📁 backend/
    ├── 📄 server.js           # Express app entry point
    ├── 📄 createAdmin.js      # One-time admin user seed script
    ├── 📄 seedProducts.js     # Product data seeder
    ├── 📄 addTestData.js      # Test data utility
    │
    ├── 📁 controllers/
    │   ├── authController.js  # Auth, profile, wishlist, OTP
    │   ├── productController.js # CRUD for products
    │   ├── orderController.js # Order creation & management
    │   └── adminController.js # Admin dashboard stats & controls
    │
    ├── 📁 models/
    │   ├── User.js            # User schema (auth, wishlist, orders)
    │   ├── Product.js         # Product schema
    │   ├── Order.js           # Order schema with status tracking
    │   └── Review.js          # Product reviews schema
    │
    ├── 📁 routes/
    │   ├── auth.js            # /auth/* — register, login, profile
    │   ├── products.js        # /products/* — listing & detail
    │   ├── orders.js          # /orders/* — place & track orders
    │   ├── reviews.js         # /reviews/* — submit & fetch
    │   ├── admin.js           # /admin/* — protected admin routes
    │   └── contact.js         # /contact — email inquiry
    │
    ├── 📁 middleware/
    │   └── auth.js            # JWT verification middleware
    │
    └── 📁 utils/
        └── emailService.js    # Resend email (OTP + contact)
```

---

## 🔌 Backend Modules

### 🔐 Auth Module (`/auth`)
| Endpoint | Method | Description |
|---|---|---|
| `/auth/send-otp` | `POST` | Send OTP to email for signup |
| `/auth/register` | `POST` | Verify OTP & create account |
| `/auth/login` | `POST` | Authenticate & return JWT |
| `/auth/profile` | `GET` | Fetch user profile + orders + wishlist |
| `/auth/profile` | `PUT` | Update name, email, phone, address |
| `/auth/forgot-password` | `POST` | Send OTP for password reset |
| `/auth/reset-password` | `POST` | Verify OTP & change password |
| `/auth/wishlist/toggle` | `POST` | Add/remove product from wishlist |

### 🛍️ Products Module (`/products`)
| Endpoint | Method | Description |
|---|---|---|
| `/products` | `GET` | Get all products |
| `/products/:id` | `GET` | Get a single product |
| `/products` | `POST` | Create product (admin) |
| `/products/:id` | `PUT` | Update product (admin) |
| `/products/:id` | `DELETE` | Delete product (admin) |

### 📦 Orders Module (`/orders`)
| Endpoint | Method | Description |
|---|---|---|
| `/orders` | `POST` | Create a new order |
| `/orders/:id` | `GET` | Get order by ID |

### ⭐ Reviews Module (`/reviews`)
| Endpoint | Method | Description |
|---|---|---|
| `/reviews/:productId` | `GET` | Get reviews + stats for a product |
| `/reviews/:productId` | `POST` | Submit a review (authenticated) |
| `/reviews/:productId/helpful/:reviewId` | `POST` | Mark review as helpful |

### 🔧 Admin Module (`/admin`)
| Endpoint | Method | Description |
|---|---|---|
| `/admin/login` | `POST` | Admin authentication |
| `/admin/stats` | `GET` | Dashboard stats |
| `/admin/products` | `GET/POST/PUT/DELETE` | Manage products |
| `/admin/orders` | `GET/PUT` | View & update orders |
| `/admin/users` | `GET` | View all users |

---

## 🔑 Environment Variables

Create a `.env` file inside `backend/` (see `.env.production.example` for reference):

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/gwen-beauty

# App
PORT=5001
NODE_ENV=development

# JWT
JWT_SECRET=your_long_random_secret_here

# Admin Credentials
ADMIN_USERNAME=Goat
ADMIN_PASSWORD=your_secure_password

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# (Legacy — kept for reference)
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
```

> ⚠️ Never commit `.env` to GitHub — it is already in `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- MongoDB Atlas account
- Resend account (for email)

### 1. Clone the repository
```bash
git clone https://github.com/PrabhuG46/Cosmetics-e-commerce.git
cd Cosmetics-e-commerce
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.production.example .env
# Fill in your values in .env
npm run dev
```

### 3. Configure Frontend API URL
Edit `config.js` in the root:
```js
// Development
const API_URL = 'http://localhost:5001';
```

### 4. Open the frontend
Just open `index.html` in your browser or use a local server:
```bash
npx serve .
```

### 5. Seed Products (optional)
```bash
cd backend
node seedProducts.js
```

### 6. Create Admin User
```bash
cd backend
node createAdmin.js
```

---

## 🔧 Admin Panel

Visit `/admin.html` after the server is running.

**Features:**
- 📊 Dashboard with stats (orders, revenue, users, products)
- 🛍️ Product management (add, edit, delete, image upload)
- 📦 Order management with status updates (Pending → Shipped → Delivered)
- 👥 User management & overview

---

## 🚢 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Vercel auto-deploys on every push to `main`
4. SPA routing handled by `vercel.json`

### Backend → Render
1. Create a **Web Service** on [render.com](https://render.com)
2. Set **Root Directory** to `backend`
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add all environment variables from `.env` in the Render dashboard

> 💡 Render free tier spins down after inactivity. The first load may take ~45 seconds — the loading spinner will show during this time.

---

## 📄 License

This project is for educational and portfolio purposes.

---

<div align="center">

Made with ♥ by **Prabhu** — Gwen Beauty Studio © 2025

</div>

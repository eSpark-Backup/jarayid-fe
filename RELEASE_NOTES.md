# Jarayid Frontend – Release Notes

## 🚀 Initial Release – v1.0.0 (July 2025)

### 📋 Overview

This is the **first official release** of the **Jarayid frontend web application**, which includes complete **user-side pages**, a fully functioning **authentication system**, and the **UI scaffolding for the Admin Dashboard**. A select number of admin modules are already integrated with the backend, while others will be functional in upcoming releases.

---

## 🎯 Key Features

---

### 🔐 Authentication System

#### ✅ Auth Pages (UI)

- Login
- Sign Up
- Forget Password
- Set Password

#### ✅ API Integration

- Email/password login and signup
- Forgot/reset password workflow
- Google OAuth signup/login
- JWT session handling and local storage persistence

---

### 🌐 User-Side Web App

#### ✅ UI Pages

- Landing Page
- Article Details Page
- Read Later
- FAQs
- Terms and Conditions
- Privacy Policy

#### ✅ API Integration

- Article listing and detail rendering
- Categories and youtube video and shorts rendering
- Edit profile flow
- Language Translation Integration (EN/AR)
- Contact us flow
- Read Later management
- FAQs, Terms, and Privacy content retrieval

#### ⏳ Pending API Integration (in progress):

- Chatbot AI interface
- Edit RSS source
- Font size toggle
- Settings dropdown
- Footer categories
- Article like functionality
- Instagram share option (Instagram does not allow direct share feature)
- Subscription logic
- Advertise Here CTA
- QR code generation
- Ad display logic
- Smart Reader
- View Original Summary

---

### 🛠️ Admin Dashboard

#### ✅ UI Modules Created (Design-Only)

> These pages have **completed UI/UX**, but **do not yet have full backend API integration** unless listed below.

- Dashboard Home
- Article Management
- Category Management
- SEO Categories
- RSS Resource
- RSS Resource Management
- Sponsor Account
- Manual Post
- YouTube Channel
- Cookies Management
- FAQs
- Users
- TOS & Privacy Pages
- Sentry Bug Reports
- OpenAI Interface
- Ad-Free Subscription Controls
- External Links
- Social Media Links
- Contact Us Management
- RSS Summarization
- Ad Placement Map

#### ✅ API-Integrated Modules (Working End-to-End)

- Article Management
- Category Management
- SEO Categories
- RSS Resource
- RSS Resource Management
- Sponsor Account
- Manual Post
- YouTube Channel
- Cookies
- FAQs
- Users
- TOS / Privacy Policy
- OpenAI
- External Links
- Social Media Links
- Contact Us

---

## 🧱 Technical Overview

| Stack      | Description                   |
| ---------- | ----------------------------- |
| Framework  | React (Vite)                  |
| State Mgmt | Redux Toolkit + RTK Query     |
| UI Styling | Material UI                   |
| Forms      | Formik + Yup                  |
| Auth       | JWT + OAuth (Google)          |
| Routing    | React Router DOM              |
| Payments   | Paddle Integration (upcoming) |

---

## 🧪 QA & Testing

- Route guards and redirects for unauthenticated users
- Form validation (login, signup, reset)
- Manual testing across user and admin interfaces
- Error/success feedback for API-connected forms
- Device responsiveness tested (desktop, tablet, mobile)

---

## 🔜 Roadmap

### Upcoming Priorities

- Complete remaining Admin API integrations
- Finalize all User Side API endpoints
- Add Paddle payment UI and logic
- Smart Reader and View Original Summary UI logic
- Footer + Instagram share + QR + Ad logic

---

## 🏁 Getting Started

```bash
# Clone frontend repo
git clone https://github.com/eSpark-Consultants/jarayid-fe.git
cd jarayid-fe

# Install dependencies
npm install

# Start local server
npm run dev
```

### `.env` Sample

```env
VITE_BASE_URL= your_backend_baseurl
VITE_AUTH0_DOMAIN= your_auth0_domain
VITE_CLIENT_ID= your_client_id
```

---

## 🏷️ Version

- **v1.0.0** – Initial release  
  ✅ Auth system + user pages  
  ✅ Some admin modules with API  
  🧩 Some Remaining dashboard pages currently UI-only

---

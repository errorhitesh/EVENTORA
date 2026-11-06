# EVENTORA – Modern Event Discovery & Management Platform

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)](#)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](#)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Vanilla%20JS-orange?style=flat-square)](#)

> **"Discover Experiences. Create Memories."**
> A modern, visually rich, and fully functional event management and ticket registration platform built with pure semantic HTML5, modern CSS3 (Flexbox/Grid), and Vanilla JavaScript (ES6+).

---

## 🌟 Executive Summary & Project Description

**EVENTORA** is an end-to-end event discovery and pass registration web application tailored for tech conferences, music festivals, startup investment conclaves, academic symposiums, art biennales, and athletic championships. Designed with a SaaS-inspired aesthetic, the platform features a dynamic client-side architecture that eliminates traditional page refreshes while ensuring persistent state management via `LocalStorage`.

---

## 🎯 Key Objectives

1. **Seamless Discovery:** Enable users to effortlessly browse, search, and filter 16+ curated upcoming events across 8 distinct categories.
2. **Real-Time Responsiveness:** Provide instant, debounced search across event titles, categories, venues, cities, descriptions, and tags.
3. **Robust Client-Side Validation:** Implement strict validation for participant details (names, email formats, and Indian mobile numbers `+91`) with clear inline error messaging.
4. **Data Integrity & Duplicate Prevention:** Block duplicate registrations for the same user and event, track real-time seat decrement/increment upon booking or cancellation.
5. **Persistent Storage:** Store and retrieve bookings, themes, and bookmarks through a serialized `LocalStorage` service.
6. **Digital Ticket Issuance:** Generate a realistic boarding-pass digital ticket with QR code, check-in barcode, and print-ready stylesheet.

---

## 🛠️ Technology Stack

| Layer | Technologies | Purpose |
|---|---|---|
| **Structure** | Semantic HTML5 | Clean document outline, high accessibility (ARIA), modern form elements. |
| **Styling** | CSS3, CSS Custom Properties | Responsive Grid & Flexbox layouts, frosted glassmorphism, fluid typography, dark/light themes. |
| **Typography** | Google Fonts (*Plus Jakarta Sans*, *JetBrains Mono*) | Modern SaaS visual hierarchy and monospaced ticket typography. |
| **Icons** | Font Awesome 6.5.1 CDN | Crisp iconography for categories, navigation, statuses, and toast alerts. |
| **Logic** | Vanilla JavaScript (ES6+) | Modular architecture, event delegation, client-side routing, regex validation engines. |
| **Storage** | LocalStorage API | Persistent client-side database for user registrations, capacity counters, bookmarks, and themes. |
| **Version Control** | Git & GitHub | Clean branch workflow, structured commits, deployment automation. |

---

## 🚀 Key Features Implemented

### 1. Modern SaaS Visual Identity & Theme Engine
- **Dark & Light Mode Switching:** Toggle themes with automatic system preference detection (`prefers-color-scheme`) and LocalStorage persistence. Zero Flash of Unstyled Content (FOUC).
- **Refined Color Palette:** Deep Indigo (`#5B4BDB`), Electric Purple (`#8B5CF6`), Emerald Green (`#10B981`), Amber (`#F59E0B`), and Rose (`#EF4444`).
- **Interactive Micro-Interactions:** Subtle card lift on hover, button glow effects, animated pulse dots for "Selling Fast" badges, and smooth scroll anchors.

### 2. Multi-Page Comprehensive Architecture
- **Homepage (`index.html`):**
  - Sticky glassmorphic navbar with active page indicators and mobile drawer menu.
  - Split Hero section with live attendee metrics and a 3D-styled floating preview card with live second-by-second countdown.
  - Instant Search Bar with clear button and category selector.
  - Interactive Category Filter Chips with live event counters.
  - Featured Events spotlight grid.
  - Discovery Grid with multi-criteria sorting (Date, Price, Popularity, A-Z) and price filters (Free, Paid, Under ₹1,000).
  - Spotlight Marquee Event Banner with a 4-digit live countdown timer (Days, Hours, Minutes, Seconds).
  - "Why Choose Eventora" 6-card benefit showcase.
  - Call-to-Action banner and comprehensive footer with verified newsletter subscription.
- **Explore Events Hub (`events.html`):**
  - Dedicated search and faceted multi-filtering center.
  - Grid View vs. List View switcher.
  - Active filter tag pills with 1-click removal.
  - Deep-link synchronization with URL query parameters (`?cat=...` and `?q=...`).
- **Event Details View (`event-details.html`):**
  - Dynamic URL parameter routing (`?id=evt-101`).
  - High-resolution hero banner with metadata overlays.
  - Comprehensive agenda timeline with time stamps and speaker topics.
  - Featured speakers grid with avatars and credentials.
  - Venue location preview card with direct "Open in Google Maps" integration.
  - Interactive FAQ accordion.
  - Sticky booking sidebar with real-time seat capacity meter, registration deadline notice, live event countdown, and "Add to Google Calendar" button.
  - Related event recommendations.
- **My Registrations Dashboard (`registrations.html`):**
  - Metric summary cards: Total passes, Active/Confirmed passes, and Cancelled passes.
  - Real-time search/filter by attendee email address.
  - Status filter dropdown (Confirmed vs. Cancelled).
  - Detailed booking cards with Registration ID (`#EVT-2026-XXXX`), attendee name, venue, pass count, and booking timestamp.
  - Re-open and print digital entry passes at any time.
  - Self-service booking cancellation with a custom confirmation modal that instantly restores seat capacity to the event.

### 3. Registration System & JavaScript Form Validation
- **Modal Integration:** Opens seamlessly from any event card or details page, pre-populating event information.
- **Validation Rules:**
  - **Full Name:** Required, letters/spaces only, minimum 3 characters.
  - **Email Address:** Standard RFC 5322 regex validation (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`).
  - **Phone Number:** Validates Indian mobile numbers (`^(?:\+91|0)?[6-9]\d{9}$`) as well as international E.164 formats.
  - **Selected Event:** Must correspond to an active, valid event.
  - **Terms Checkbox:** Mandatory agreement to code of conduct.
  - **Duplicate Prevention:** Checks existing records in LocalStorage; blocks duplicate registrations for the same user and active event.
  - **Capacity Safeguard:** Prohibits registration if remaining capacity is zero.
  - **Deadline Enforcement:** Prohibits registration if the deadline has passed.
- **Digital Ticket Pass Output:**
  - Generates unique ID format (e.g. `EVT-2026-9482`).
  - Perforated ticket styling with notches and barcode line graphics.
  - Vector QR code for entrance scanning.
  - "Print Pass" functionality using CSS `@media print` rules.

### 4. User Authentication & Google Social Sign-In
- **Existing User Login:** Standard email and password authentication verified against persistent storage with field validations and a 1-click "Fill Demo User" option for swift testing.
- **New User Registration (Sign Up):** Complete onboarding form with full name, email, phone number, password strength enforcement, password confirmation matching, and terms acceptance.
- **One-Click Google / Gmail Sign-In:** Official Google OAuth-styled account picker dialog allowing instant authentication with verified Google accounts (`aarav.sharma@gmail.com`, `vikram.rao@gmail.com`) or custom Gmail addresses.
- **Active Session & Profile Dropdown:** Displays user avatar, first name, and a sleek dropdown menu with "My Registrations", "Explore Events", and "Sign Out" actions.
- **Form Auto-fill Integration:** Seamlessly pre-populates attendee details when booking passes and automatically filters bookings to the active user's email on the registrations page.

### 5. Toast Notification Drawer
- Non-intrusive floating toasts for success, error, warning, and informational feedback with auto-dismissal and manual close buttons.

---

## 📁 Project Folder Structure

```
eventora/
├── index.html                   # Primary Homepage (Hero, Search, Featured, Discovery, Benefits, CTA)
├── events.html                  # Faceted Explore Events page (Grid/List views, deep-linking)
├── event-details.html           # Deep Event Details page (Agenda, Speakers, Map, Sticky booking)
├── registrations.html           # My Registrations dashboard (Pass management, Cancellation)
│
├── css/
│   ├── themes.css               # Light/Dark CSS custom properties & color palettes
│   ├── style.css                # Base reset, layout, cards, navbar, modals, passes, toasts
│   └── responsive.css           # Breakpoints (Mobile, Tablet, Desktop) & mobile drawer
│
├── js/
│   ├── data.js                  # 16 realistic, diverse future events (Late 2026 - 2027)
│   ├── storage.js               # Safe LocalStorage wrapper with capacity & duplicate tracking
│   ├── theme.js                 # Dark/Light mode manager with FOUC prevention
│   ├── auth.js                  # User authentication (Login, Sign Up, Google OAuth simulation)
│   ├── registration.js          # Form validation engine, ticket pass generator, modal handlers
│   ├── events.js                # Search, category chips, sorting, quick view, countdowns
│   └── app.js                   # Master orchestrator (Sticky header, mobile drawer, toasts)
│
├── assets/
│   ├── images/                  # Category-specific local fallback SVGs
│   │   ├── tech-fallback.svg
│   │   ├── music-fallback.svg
│   │   ├── business-fallback.svg
│   │   ├── sports-fallback.svg
│   │   ├── education-fallback.svg
│   │   ├── art-fallback.svg
│   │   ├── workshop-fallback.svg
│   │   └── comedy-fallback.svg
│   └── icons/                   # Custom icons & badges
│
├── README.md                    # Comprehensive platform documentation
└── .gitignore                   # Standard Git ignore rules
```

---

## 💻 Instructions to Run Locally

Because EVENTORA is built with standards-compliant HTML5, CSS3, and JavaScript, it requires **no build step, compilers, or server installations**.

### Option 1: Direct Browser Launch
1. Clone or download the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/eventora.git
   cd eventora
   ```
2. Double-click `index.html` (or right-click and choose **Open with Google Chrome / Firefox / Edge / Safari**).

### Option 2: Using VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey if not already installed.
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The site will launch at `http://127.0.0.1:5500/index.html`.

### Option 3: Using Python or Node.js Static Server
- **Python 3:**
  ```bash
  python -m http.server 8000
  ```
  Open `http://localhost:8000` in your browser.
- **Node.js (`npx serve`):**
  ```bash
  npx serve .
  ```
  Open `http://localhost:3000` in your browser.

---

## 📸 Screenshots & UI Showcase

| View | Description |
|---|---|
| **Desktop Homepage** | Clean hero typography, live metrics, floating cards with countdowns, and category chips. |
| **Dark Theme** | Deep navy palette (`#0A0E17`), high contrast text, and glowing purple accent borders. |
| **Event Details** | Detailed agenda timeline, keynote speaker cards, map directions, and sticky registration sidebar. |
| **Digital Ticket Pass** | Perforated pass design with unique `EVT-2026-XXXX` ID, QR code, and barcode lines. |
| **My Registrations** | Real-time email lookup, active vs. cancelled badge statuses, and self-service cancellation. |
| **Mobile Drawer** | Touch-friendly drawer menu with slide-in animation and quick theme toggle. |

---

## 🌐 Deployment Instructions

EVENTORA is completely client-side and optimized for instant zero-configuration deployment to any modern static hosting provider.

### 1. Deploying to Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Drag and drop the `eventora` project folder directly into the **Netlify Drop** dashboard, **OR**:
3. Connect your GitHub repository:
   - Build Command: *(Leave blank)*
   - Publish Directory: `.` (Root)
4. Click **Deploy Site**.

### 2. Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel` (or use [Vercel Dashboard](https://vercel.com/)).
2. Run `vercel` in the project root directory.
3. Accept default settings. Your site will be deployed in seconds.

### 3. Deploying to GitHub Pages
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete production release of Eventora platform"
   git branch -M main
   git remote add origin https://github.com/your-username/eventora.git
   git push -u origin main
   ```
2. Navigate to your GitHub repository **Settings** > **Pages**.
3. Under **Build and deployment**, select **Source:** `Deploy from a branch`.
4. Select `main` branch and `/ (root)` folder, then click **Save**.
5. Your live site will be accessible at: `https://your-username.github.io/eventora/`.

---

## 📋 Comprehensive Assignment Requirements Checklist

| Requirement | Specification | Status | Implementation Details |
|---|---|---|---|
| **Navigation Bar** | Sticky header, brand logo, mobile hamburger drawer, active states | ✅ COMPLETED | Implemented in `style.css` & `app.js` with frosted glass backdrop. |
| **Hero Section** | Engaging headline, CTAs, metrics, floating cards, live countdown | ✅ COMPLETED | Full split hero with interactive preview and live second countdown. |
| **Dynamic Search** | Instant filter by name, category, venue, keywords with clear button | ✅ COMPLETED | Handled in `events.js` across 5 distinct search properties. |
| **Category Filter** | 8 categories with live event counts and 1-click filtering | ✅ COMPLETED | Filter chips in `events.js` with instant grid re-rendering. |
| **Featured Events** | Attractive cards with category badges, price pills, view details | ✅ COMPLETED | 3 flagship events spotlighted on homepage and details page. |
| **Upcoming Events** | Responsive grid, 16 realistic future events, multi-sort, pagination | ✅ COMPLETED | 16 events in `data.js` spanning Nov 2026 - Apr 2027 with "Load More". |
| **Why Choose Eventora** | 6 benefits highlighting pass verification, safety, and zero fees | ✅ COMPLETED | Visually rich grid with dedicated icons in `index.html`. |
| **Event Details** | Comprehensive data: schedule, speakers, venue map, ticket widget | ✅ COMPLETED | Implemented in `event-details.html` with URL parameter parsing. |
| **Registration Form** | Form with full name, email, phone, event, terms checkbox | ✅ COMPLETED | Complete validation in `registration.js` with custom regex checks. |
| **Client Validation** | Indian mobile validation, email RFC format, name constraints | ✅ COMPLETED | Custom regex with live visual feedback and inline error messages. |
| **Duplicate Prevention**| Prevent same email registering twice for active event | ✅ COMPLETED | Tested & enforced via `StorageService.isUserRegisteredForEvent()`. |
| **Capacity Management** | Decrements seats upon booking; restores upon cancellation | ✅ COMPLETED | Tracked in LocalStorage under `eventora_event_capacity`. |
| **Digital Ticket Pass** | Attractive boarding pass with unique ID, QR code, and print button | ✅ COMPLETED | Generates `EVT-2026-XXXX` with SVG QR code and print layout. |
| **My Registrations** | Retrieve records, filter by email, persistent across refreshes | ✅ COMPLETED | Implemented in `registrations.html` with stats and pass viewer. |
| **Cancellation Flow** | Custom modal confirmation (not standard alert), status update | ✅ COMPLETED | Dialog modal in `registrations.html` updating status to "Cancelled". |
| **Dark/Light Mode** | Theme toggle with LocalStorage persistence and system sync | ✅ COMPLETED | Implemented in `theme.js` & `themes.css` with FOUC prevention. |
| **Countdown Timers** | Live days/hours/minutes/seconds updating every second | ✅ COMPLETED | Live intervals in `events.js` and `event-details.html`. |
| **Toast Notifications**| Floating modern alerts for success, errors, and bookmarks | ✅ COMPLETED | Built-in custom toast drawer in `app.js`. |
| **Responsiveness** | Mobile (320px), Tablet (768px), Laptop, Desktop (1440px+) | ✅ COMPLETED | Tested across all breakpoints in `responsive.css`. |
| **Code Quality** | Clean vanilla ES6+, zero console errors, semantic HTML5 | ✅ COMPLETED | Validated with Node syntax checks and automated integrity tests. |

---

## 🔮 Future Roadmap & Enhancements

- [ ] **Offline PWA Support:** Add a service worker (`sw.js`) and manifest file for offline ticket viewing.
- [ ] **Web Share API:** Native mobile sheet sharing for event details.
- [ ] **Google Calendar Sync:** Full `.ics` file generation alongside Google Calendar links.
- [ ] **Email Receipt Dispatch:** Webhook integration with SendGrid or Resend for automated PDF ticket emailing.

---

## 📄 License & Credits

- Developed for the **Web Designing Assignment: Event Management Website**.
- Designed and built by the **EVENTORA Team**.
- Open source under the **MIT License**.
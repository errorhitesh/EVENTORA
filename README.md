# ⚡ EVENTORA – Retro Pixel Event Discovery & Ticketing Platform

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)](#)
[![Theme](https://img.shields.io/badge/Aesthetic-100%25%20Retro%20Pixel%20%7C%20Claude%20Code-orange?style=flat-square)](#)
[![Version](https://img.shields.io/badge/Version-2.5.0-blue?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](#)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Vanilla%20JS%20ES6%2B-orange?style=flat-square)](#)

> **"Discover Experiences. Create Memories."**  
> A high-performance, 100% retro-pixelated, multi-page event discovery and gate pass issuance web application inspired by the signature Claude Code aesthetic (Orange `#F97316`, Deep Black `#09090B`, Crisp White). Built entirely with semantic HTML5, modern modular CSS3, and pure Vanilla JavaScript (ES6+).

---

## 🌟 Executive Summary

**EVENTORA** is an end-to-end event management, ticket registration, and gate pass verification platform. It allows attendees to discover upcoming technology summits, music festivals, startup conclaves, academic conferences, athletic championships, and creative masterclasses.

The platform embraces a distinct **8-bit arcade / retro terminal visual identity** without compromising modern web engineering standards: sub-millisecond client-side routing, offline-first LocalStorage persistence, instant QR turnstile gate pass issuance, Google Identity Services authentication, and complete multi-page navigation.

---

## 🎮 Signature Retro Pixel & Claude Code Aesthetic

- **Color Palette:** Signature Claude Orange (`#F97316`), Electric Orange (`#FB923C`), Deep Onyx (`#09090B`), Elevated Surface (`#18181B`), and Crisp White (`#FFFFFF`).
- **Authentic Google Pixel Typography:** Powered by `Pixelify Sans`, `Silkscreen`, and `VT323` for headers, badges, and terminal readouts.
- **Sharp 0px Block Geometry:** Zero-radius buttons, cards, modals, and input fields with hard-offset isometric drop shadows (`3px 3px 0px #000000`, `4px 4px 0px var(--primary)`).
- **Interactive Retro CRT Cursors & Particle Trail:** Custom 8-bit hand and crosshair cursors paired with a physics-based pixel-dust spark trail (`js/cursor-trail.js`).
- **Bulletproof Inline SVGs:** All core UI controls (Eventora brand lightning bolt, dark/light sun & moon changer, mobile hamburger, close icons, turnstile QR matrix) use self-contained inline vector SVGs to eliminate missing glyph / question mark (`[?]`) tofu boxes under all network conditions.

---

## 📑 Multi-Page Website Architecture

EVENTORA is structured into 8 modular, fully interlinked pages with synchronized headers, mobile slide-out drawers, and 4-column footers:

| Page | File | Purpose & Key Features |
|---|---|---|
| **Home** | [`index.html`](index.html) | Split hero section, live countdown timer, interactive search bar, category chips, featured spotlights, benefit showcase, turnstile pass button. |
| **Explore Events** | [`events.html`](events.html) | Faceted multi-criteria filtering center, Grid vs. List view switcher, active filter tag pills, search keyword parsing, and deep-link URL parameter support (`?q=...&cat=...`). |
| **Categories Directory** | [`categories.html`](categories.html) | 8 curated domains (Technology, Music, Startups, Sports, Academic, Art, Workshops, Entertainment) with live event counts, tags, and quick-filter routing. |
| **About Us** | [`about.html`](about.html) | Origin story, 6 core architectural pillars, live system specifications table, verification pipeline, and platform metrics. |
| **Host an Event** | [`host.html`](host.html) | 5-step organizer onboarding pipeline, organizer inquiry form with instant submission reference generation, and organizer FAQ accordion. |
| **My Registrations** | [`registrations.html`](registrations.html) | Attendee pass management dashboard, live email lookup, status filters (Confirmed vs. Cancelled), printable boarding pass generator, and self-service cancellation. |
| **Contact & Support** | [`contact.html`](contact.html) | 3 direct communication channels, encrypted ticket query dispatch form, live status indicator, and attendee help desk accordion. |
| **Event Details** | [`event-details.html`](event-details.html) | Dynamic query-driven event view (`?id=evt-101`), full schedule timeline, keynote speaker cards, interactive Google Maps directions, and sticky booking sidebar with capacity countdown. |

---

## 🚀 Key Functional Capabilities

### 1. Instant QR Gate Entry Pass System
- Accessible from the floating hero badge or global action trigger.
- Opens an instant turnstile gate pass modal powered by `InstantGatePassManager`.
- Generates a cryptographically unique verification pass with a live green pulse status dot (`LIVE SYSTEM // TURNSTILE GATE READY`), matrix QR code, and ticket ID.

### 2. Google Identity Services & Auth API
- Integrated with Google's Identity Services (`https://accounts.google.com/gsi/client`).
- Provides 1-click Google Sign-In with demo personas (`Aarav Sharma`, `Vikram Rao`) or custom Google emails.
- Standard email/password registration with real-time password strength checking.
- Session persistence via LocalStorage, dynamic avatar navbar dropdown, and automatic pass pre-filling.

### 3. Registration Engine & Client-Side Validation
- **Full Name:** Letters and spaces only, minimum 3 characters.
- **Email:** RFC 5322 compliance regex check.
- **Phone:** Indian mobile format (`+91` / `0` followed by 10 digits starting with 6-9) and international formats.
- **Duplicate Prevention:** Prohibits duplicate bookings for the same email address on active events.
- **Capacity Safe-Guards:** Dynamically decrements remaining seats upon registration and increments them back upon cancellation.
- **Perforated Boarding Pass:** Generates printable digital ticket with barcode line art, QR code, and print stylesheet (`@media print`).

### 4. Dynamic Theme Engine (Light / Dark Pixel)
- Fully automated theme switcher supporting user preference and OS system match (`prefers-color-scheme`).
- Instant SVG icon morphing: Sun SVG in Dark Mode (prompting switch to Light) and Moon SVG in Light Mode (prompting switch to Dark).
- Persistent state saved to `localStorage` with Zero Flash of Unstyled Content (FOUC).

### 5. Responsive Mobile-First Layout
- 100% responsive across mobile (320px–480px), tablet (768px), laptop, and ultra-wide displays (1440px+).
- Zero horizontal scroll clipping or overflow on compact viewports.
- Touch-friendly full-width navigation drawer with backdrop blur.

---

## 🛠️ Technology Stack

| Layer | Technologies | Purpose |
|---|---|---|
| **Structure** | Semantic HTML5 | Clean document outlines, ARIA accessibility, modal dialogs, responsive viewports. |
| **Styling** | Modular CSS3, Flexbox, CSS Grid | Custom CSS properties, retro scanline overlays, pixel borders, print styles. |
| **Typography** | Google Fonts (*Pixelify Sans*, *Silkscreen*, *VT323*) | Authentic 8-bit arcade aesthetics and terminal code hierarchy. |
| **Icons** | Custom Inline Pixel SVGs & Font Awesome 6.5.1 | Zero-failure fallback SVGs for core actions; solid icons with strict weight protection. |
| **Logic** | Vanilla JavaScript (ES6+) | Modular architecture, event delegation, search debounce, modal controllers. |
| **Authentication** | Google Identity Services (GSI) API | One-tap Google authentication and unified user session management. |
| **Storage** | Browser LocalStorage API | Persistent storage for bookings, bookmarks, capacity counters, and theme preferences. |
| **Version Control**| Git & GitHub | Distributed version control and automated GitHub Pages static hosting. |

---

## 📁 Repository Structure

```
eventora/
├── index.html                   # Primary Homepage (Hero, Search, Featured, Turnstile Pass)
├── events.html                  # Explore Events Hub (Grid/List views, URL query filter)
├── categories.html              # Browse Categories Directory (8 verticals, quick tags)
├── about.html                   # About Eventora (Pillars, Specs, Platform Metrics)
├── host.html                    # Organizer Application Hub & Pipeline
├── contact.html                 # Support Inquiries & Ticket Query Dispatch
├── registrations.html           # Attendee Pass Dashboard (Lookup, Print, Cancellation)
├── event-details.html           # Deep Event Details (Agenda, Speakers, Sticky Sidebar)
│
├── css/
│   ├── themes.css               # Signature Claude Code palette, pixel fonts, icon protection
│   ├── style.css                # Base reset, buttons, cards, modals, boarding passes, toasts
│   └── responsive.css           # Mobile breakpoints (320px–992px), drawers, overflow guards
│
├── js/
│   ├── data.js                  # 16 realistic, curated future events (Late 2026 - 2027)
│   ├── storage.js               # LocalStorage database wrapper (Capacity & Duplicate guard)
│   ├── theme.js                 # Dark/Light theme manager with Sun/Moon SVG switcher
│   ├── auth.js                  # Google Auth API, signup/login modals, user sessions
│   ├── registration.js          # Form validation engine, digital boarding pass generator
│   ├── events.js                # Instant search, category filters, sorting, countdowns
│   ├── cursor-trail.js          # Retro 8-bit particle physics cursor spark trail
│   └── app.js                   # Navigation orchestrator, mobile drawer, toast system
│
├── assets/
│   └── images/                  # Category-specific fallback vector artwork
│
├── README.md                    # Comprehensive platform documentation
└── .gitignore                   # Git ignore configurations
```

---

## 💻 Running Locally

Because EVENTORA is built entirely with vanilla technologies, it requires **no compiler, bundler, or Node package installations**:

### Option 1: Direct File Launch
Double-click [`index.html`](index.html) or open it directly in any modern web browser (Chrome, Firefox, Edge, Safari, Brave).

### Option 2: Using VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click `index.html` and select **"Open with Live Server"**.
3. The site opens automatically at `http://127.0.0.1:5500/index.html`.

### Option 3: Using Python or Node
- **Python 3:**
  ```bash
  python -m http.server 8000
  ```
  Open `http://localhost:8000`.
- **Node.js (`npx serve`):**
  ```bash
  npx serve .
  ```
  Open `http://localhost:3000`.

---

## 🌐 Deployment to GitHub Pages

1. Push latest changes to your GitHub repository:
   ```bash
   git add -A
   git commit -m "docs: update comprehensive README with pixel architecture and multi-page features"
   git push origin master
   ```
2. In your repository on GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Select `master` branch and `/ (root)` folder, then click **Save**.
5. Your live application will be available at:  
   `https://errorhitesh.github.io/EVENTORA/`

---

## 📄 License & Credits

- Designed and engineered with ❤️ for the **Event Management Platform Showcase**.
- Open source under the [MIT License](LICENSE).

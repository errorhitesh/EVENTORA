/**
 * EVENTORA - Storage Management Service
 * Provides robust LocalStorage persistence with serialization, validation,
 * error boundaries, and capacity management.
 */

const STORAGE_KEYS = {
  REGISTRATIONS: 'eventora_registrations',
  CAPACITY: 'eventora_event_capacity',
  THEME: 'eventora_theme',
  FAVORITES: 'eventora_favorites',
  USER_SESSION: 'eventora_user_session',
  USERS: 'eventora_users',
  CURRENT_USER: 'eventora_current_user'
};

const StorageService = {
  /**
   * Safely retrieve item from LocalStorage
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === undefined) return defaultValue;
      return JSON.parse(item);
    } catch (err) {
      console.warn(`[StorageService] Failed to read ${key} from localStorage:`, err);
      return defaultValue;
    }
  },

  /**
   * Safely save item to LocalStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[StorageService] Failed to write ${key} to localStorage:`, err);
      return false;
    }
  },

  /**
   * Remove item from LocalStorage
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error(`[StorageService] Failed to remove ${key}:`, err);
      return false;
    }
  },

  /* ============================================================
     REGISTRATION MANAGEMENT
     ============================================================ */

  /**
   * Get all registrations (initializes with sample seeds if empty for demonstration)
   */
  getRegistrations() {
    let regs = this.get(STORAGE_KEYS.REGISTRATIONS);
    if (!Array.isArray(regs)) {
      // Seed two initial realistic registrations so the "My Registrations" page looks alive immediately
      const initialSeeds = [
        {
          registrationId: 'EVT-2026-7841',
          eventId: 'evt-101',
          eventTitle: 'Global AI & Web3 Innovators Summit 2026',
          eventDate: '2026-11-20',
          displayDate: 'Nov 20 - 21, 2026',
          eventTime: '09:00 AM - 06:30 PM',
          eventVenue: 'Bengaluru International Exhibition Centre (BIEC)',
          eventCity: 'Bengaluru',
          eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
          ticketPrice: 1999,
          ticketCount: 1,
          totalAmount: 1999,
          isFree: false,
          fullName: 'Vikramaditya Rao',
          email: 'vikram.rao@example.com',
          phone: '+919876543210',
          organization: 'Apex Neural Labs',
          notes: 'Looking forward to the Sovereign AI keynote.',
          status: 'Confirmed',
          createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
        },
        {
          registrationId: 'EVT-2026-8902',
          eventId: 'evt-103',
          eventTitle: 'National Startup Conclave & Angel Pitch 2026',
          eventDate: '2026-12-05',
          displayDate: 'Dec 05, 2026',
          eventTime: '09:30 AM - 05:30 PM',
          eventVenue: 'Bharat Mandapam Convention Center',
          eventCity: 'New Delhi',
          eventImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
          ticketPrice: 0,
          ticketCount: 1,
          totalAmount: 0,
          isFree: true,
          fullName: 'Vikramaditya Rao',
          email: 'vikram.rao@example.com',
          phone: '+919876543210',
          organization: 'SaaSFoundry',
          notes: 'Applying for the seed pitch elevator track.',
          status: 'Confirmed',
          createdAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString()
        }
      ];
      this.set(STORAGE_KEYS.REGISTRATIONS, initialSeeds);
      return initialSeeds;
    }
    return regs;
  },

  /**
   * Save a new registration record
   */
  saveRegistration(record) {
    const list = this.getRegistrations();
    list.unshift(record);
    this.set(STORAGE_KEYS.REGISTRATIONS, list);

    // Decrement event seats
    this.decrementCapacity(record.eventId, record.ticketCount || 1);

    // Save user's email into recent session for quick auto-fill
    if (record.email) {
      this.set(STORAGE_KEYS.USER_SESSION, {
        email: record.email,
        fullName: record.fullName,
        phone: record.phone
      });
    }

    return record;
  },

  /**
   * Find a registration by ID
   */
  getRegistrationById(registrationId) {
    const list = this.getRegistrations();
    return list.find(r => r.registrationId === registrationId) || null;
  },

  /**
   * Filter registrations by participant email (case-insensitive)
   */
  getRegistrationsByEmail(email) {
    if (!email) return this.getRegistrations();
    const cleanEmail = email.trim().toLowerCase();
    const list = this.getRegistrations();
    return list.filter(r => r.email && r.email.toLowerCase() === cleanEmail);
  },

  /**
   * Check if participant email is already registered for an active (non-cancelled) event
   */
  isUserRegisteredForEvent(email, eventId) {
    if (!email || !eventId) return false;
    const cleanEmail = email.trim().toLowerCase();
    const list = this.getRegistrations();
    return list.some(r =>
      r.eventId === eventId &&
      r.email && r.email.toLowerCase() === cleanEmail &&
      r.status !== 'Cancelled'
    );
  },

  /**
   * Cancel an existing registration
   */
  cancelRegistration(registrationId) {
    const list = this.getRegistrations();
    const index = list.findIndex(r => r.registrationId === registrationId);
    if (index === -1) return false;

    const record = list[index];
    if (record.status !== 'Cancelled') {
      record.status = 'Cancelled';
      record.cancelledAt = new Date().toISOString();
      this.set(STORAGE_KEYS.REGISTRATIONS, list);

      // Restore seats
      this.incrementCapacity(record.eventId, record.ticketCount || 1);
    }
    return true;
  },

  /**
   * Delete registration entirely
   */
  deleteRegistration(registrationId) {
    const list = this.getRegistrations();
    const index = list.findIndex(r => r.registrationId === registrationId);
    if (index === -1) return false;

    const record = list[index];
    if (record.status !== 'Cancelled') {
      this.incrementCapacity(record.eventId, record.ticketCount || 1);
    }

    list.splice(index, 1);
    this.set(STORAGE_KEYS.REGISTRATIONS, list);
    return true;
  },

  /* ============================================================
     SEAT CAPACITY TRACKING
     ============================================================ */

  /**
   * Get dynamic available seats for an event
   */
  getCapacity(eventId, defaultSeats) {
    const capacityMap = this.get(STORAGE_KEYS.CAPACITY, {});
    if (typeof capacityMap[eventId] === 'number') {
      return capacityMap[eventId];
    }
    return defaultSeats;
  },

  /**
   * Decrement available seats upon registration
   */
  decrementCapacity(eventId, count = 1) {
    const capacityMap = this.get(STORAGE_KEYS.CAPACITY, {});
    const current = typeof capacityMap[eventId] === 'number'
      ? capacityMap[eventId]
      : (INITIAL_EVENTS.find(e => e.id === eventId)?.seatsRemaining ?? 50);
    const updated = Math.max(0, current - count);
    capacityMap[eventId] = updated;
    this.set(STORAGE_KEYS.CAPACITY, capacityMap);
    return updated;
  },

  /**
   * Increment available seats upon registration cancellation
   */
  incrementCapacity(eventId, count = 1) {
    const capacityMap = this.get(STORAGE_KEYS.CAPACITY, {});
    const maxCapacity = INITIAL_EVENTS.find(e => e.id === eventId)?.capacity ?? 500;
    const current = typeof capacityMap[eventId] === 'number'
      ? capacityMap[eventId]
      : (INITIAL_EVENTS.find(e => e.id === eventId)?.seatsRemaining ?? 50);
    const updated = Math.min(maxCapacity, current + count);
    capacityMap[eventId] = updated;
    this.set(STORAGE_KEYS.CAPACITY, capacityMap);
    return updated;
  },

  /* ============================================================
     FAVORITES / BOOKMARKS
     ============================================================ */

  getFavorites() {
    return this.get(STORAGE_KEYS.FAVORITES, []);
  },

  isFavorite(eventId) {
    const favs = this.getFavorites();
    return favs.includes(eventId);
  },

  toggleFavorite(eventId) {
    let favs = this.getFavorites();
    if (favs.includes(eventId)) {
      favs = favs.filter(id => id !== eventId);
    } else {
      favs.push(eventId);
    }
    this.set(STORAGE_KEYS.FAVORITES, favs);
    return favs.includes(eventId);
  },

  /* ============================================================
     THEME PREFERENCE
     ============================================================ */

  getTheme() {
    return this.get(STORAGE_KEYS.THEME, null);
  },

  setTheme(theme) {
    return this.set(STORAGE_KEYS.THEME, theme);
  },

  /* ============================================================
     USER ACCOUNTS & AUTHENTICATION
     ============================================================ */

  getUsers() {
    let users = this.get(STORAGE_KEYS.USERS);
    if (!Array.isArray(users)) {
      const defaultUsers = [
        {
          id: 'usr-101',
          fullName: 'Vikramaditya Rao',
          email: 'vikram.rao@example.com',
          password: 'Password123!',
          phone: '+91 98765 43210',
          organization: 'Apex Neural Labs',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          provider: 'email',
          createdAt: new Date(Date.now() - 3600000 * 24 * 30).toISOString()
        },
        {
          id: 'usr-102',
          fullName: 'Aarav Sharma',
          email: 'aarav.sharma@gmail.com',
          password: 'Password123!',
          phone: '+91 98123 45678',
          organization: 'IIT Bombay',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          provider: 'google',
          createdAt: new Date(Date.now() - 3600000 * 24 * 14).toISOString()
        }
      ];
      this.set(STORAGE_KEYS.USERS, defaultUsers);
      return defaultUsers;
    }
    return users;
  },

  findUserByEmail(email) {
    if (!email) return null;
    const clean = email.trim().toLowerCase();
    const users = this.getUsers();
    return users.find(u => u.email && u.email.toLowerCase() === clean) || null;
  },

  createUser(userData) {
    const users = this.getUsers();
    const id = 'usr-' + (100 + users.length + 1) + '-' + Math.floor(100 + Math.random() * 900);
    const newUser = {
      id,
      fullName: userData.fullName.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password || '',
      phone: userData.phone ? userData.phone.trim() : '',
      organization: userData.organization ? userData.organization.trim() : '',
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName)}&background=5B4BDB&color=fff`,
      provider: userData.provider || 'email',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.set(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  getCurrentUser() {
    return this.get(STORAGE_KEYS.CURRENT_USER, null);
  },

  setCurrentUser(user) {
    if (!user) {
      this.remove(STORAGE_KEYS.CURRENT_USER);
      return null;
    }
    const sessionUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || '',
      organization: user.organization || '',
      avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=5B4BDB&color=fff`,
      provider: user.provider || 'email',
      loggedInAt: new Date().toISOString()
    };
    this.set(STORAGE_KEYS.CURRENT_USER, sessionUser);

    // Also update USER_SESSION for form auto-fills
    this.set(STORAGE_KEYS.USER_SESSION, {
      fullName: sessionUser.fullName,
      email: sessionUser.email,
      phone: sessionUser.phone
    });

    window.dispatchEvent(new CustomEvent('eventora:authChange', { detail: { user: sessionUser } }));
    return sessionUser;
  },

  logoutUser() {
    this.remove(STORAGE_KEYS.CURRENT_USER);
    window.dispatchEvent(new CustomEvent('eventora:authChange', { detail: { user: null } }));
    return true;
  },

  /* ============================================================
     USER RECENT PROFILE HELPER
     ============================================================ */

  getUserSession() {
    const current = this.getCurrentUser();
    if (current) {
      return {
        fullName: current.fullName,
        email: current.email,
        phone: current.phone
      };
    }
    return this.get(STORAGE_KEYS.USER_SESSION, null);
  }
};


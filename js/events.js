/**
 * EVENTORA - Events Controller
 * Dynamic rendering, live search, faceted category/price filtering,
 * multi-criteria sorting, quick-view modal, and pagination.
 */

const EventsController = {
  events: INITIAL_EVENTS,
  filteredEvents: [],
  selectedCategory: 'all',
  searchQuery: '',
  priceFilter: 'all',
  sortBy: 'date-asc',
  visibleCount: 6,
  itemsPerPage: 6,

  init() {
    this.filteredEvents = [...this.events];
    this.bindControls();
    this.renderCategoryChips();
    this.renderFeaturedEvents();
    this.renderEvents();
    this.initSpotlightBanner();
  },

  bindControls() {
    // Search input
    const searchInputs = document.querySelectorAll('.event-search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.updateClearBtnVisibility(input);
        this.applyFilters();
      });
    });

    // Clear search buttons
    const clearBtns = document.querySelectorAll('.search-clear-btn');
    clearBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        searchInputs.forEach(input => {
          input.value = '';
          this.updateClearBtnVisibility(input);
        });
        this.searchQuery = '';
        this.applyFilters();
      });
    });

    // Category select dropdown (in search bar)
    const categorySelect = document.getElementById('searchCategorySelect');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.setCategory(e.target.value);
      });
    }

    // Sort select
    const sortSelect = document.getElementById('eventSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.applyFilters();
      });
    }

    // Price filter select / radio
    const priceSelect = document.getElementById('eventPriceFilter');
    if (priceSelect) {
      priceSelect.addEventListener('change', (e) => {
        this.priceFilter = e.target.value;
        this.applyFilters();
      });
    }

    // Load More Button
    const loadMoreBtn = document.getElementById('loadMoreEventsBtn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.visibleCount += this.itemsPerPage;
        this.renderUpcomingGrid();
      });
    }

    // Quick View Modal Close
    const quickModalClose = document.querySelectorAll('.quick-modal-close');
    quickModalClose.forEach(btn => {
      btn.addEventListener('click', () => this.closeQuickModal());
    });

    const quickOverlay = document.getElementById('quickViewModal');
    if (quickOverlay) {
      quickOverlay.addEventListener('click', (e) => {
        if (e.target === quickOverlay) this.closeQuickModal();
      });
    }
  },

  updateClearBtnVisibility(input) {
    const wrapper = input.closest('.search-input-wrapper');
    if (!wrapper) return;
    const clearBtn = wrapper.querySelector('.search-clear-btn');
    if (clearBtn) {
      clearBtn.style.display = input.value.trim().length > 0 ? 'block' : 'none';
    }
  },

  /**
   * Render Category Chips
   */
  renderCategoryChips() {
    const container = document.getElementById('categoryChipsContainer');
    if (!container) return;

    container.innerHTML = EVENT_CATEGORIES.map(cat => {
      const isActive = this.selectedCategory === cat.id;
      return `
        <button class="category-chip ${isActive ? 'active' : ''}" data-category="${cat.id}">
          <i class="fa-solid ${cat.icon}"></i>
          <span>${cat.name}</span>
          <span class="category-count-badge">${cat.id === 'all' ? this.events.length : this.events.filter(e => e.category === cat.id).length}</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const catId = chip.getAttribute('data-category');
        this.setCategory(catId);
      });
    });
  },

  setCategory(catId) {
    this.selectedCategory = catId;
    this.visibleCount = this.itemsPerPage; // Reset pagination on filter change

    // Sync active class on chips
    const chips = document.querySelectorAll('.category-chip');
    chips.forEach(chip => {
      if (chip.getAttribute('data-category') === catId) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    // Sync select dropdown if present
    const categorySelect = document.getElementById('searchCategorySelect');
    if (categorySelect && categorySelect.value !== catId) {
      categorySelect.value = catId;
    }

    this.applyFilters();
  },

  /**
   * Filter & Sort Pipeline
   */
  applyFilters() {
    let result = [...this.events];

    // 1. Category Filter
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      result = result.filter(e => e.category === this.selectedCategory);
    }

    // 2. Search Query (Title, Description, Venue, City, Category, Tags)
    if (this.searchQuery) {
      const q = this.searchQuery;
      result = result.filter(e => {
        return (
          e.title.toLowerCase().includes(q) ||
          e.categoryLabel.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          (e.tags && e.tags.some(t => t.toLowerCase().includes(q)))
        );
      });
    }

    // 3. Price Filter
    if (this.priceFilter === 'free') {
      result = result.filter(e => e.isFree || e.price === 0);
    } else if (this.priceFilter === 'paid') {
      result = result.filter(e => !e.isFree && e.price > 0);
    } else if (this.priceFilter === 'under1000') {
      result = result.filter(e => e.price <= 1000);
    }

    // 4. Sorting
    result.sort((a, b) => {
      if (this.sortBy === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (this.sortBy === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (this.sortBy === 'price-asc') {
        return a.price - b.price;
      } else if (this.sortBy === 'price-desc') {
        return b.price - a.price;
      } else if (this.sortBy === 'name-asc') {
        return a.title.localeCompare(b.title);
      } else if (this.sortBy === 'popular') {
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }
      return 0;
    });

    this.filteredEvents = result;
    this.renderUpcomingGrid();
    this.updateResultsCounter();
  },

  updateResultsCounter() {
    const counter = document.getElementById('eventsResultsCounter');
    if (counter) {
      counter.textContent = `Showing ${Math.min(this.visibleCount, this.filteredEvents.length)} of ${this.filteredEvents.length} events`;
    }
  },

  /**
   * Render Featured Events Section
   */
  renderFeaturedEvents() {
    const container = document.getElementById('featuredEventsContainer');
    if (!container) return;

    const featuredList = this.events.filter(e => e.featured).slice(0, 3);
    container.innerHTML = featuredList.map(e => this.createEventCardHTML(e, true)).join('');
    this.bindCardActions(container);
  },

  /**
   * Render Upcoming Events Section
   */
  renderEvents() {
    this.applyFilters();
  },

  renderUpcomingGrid() {
    const grid = document.getElementById('upcomingEventsGrid');
    const emptyState = document.getElementById('eventsEmptyState');
    const loadMoreContainer = document.getElementById('loadMoreContainer');

    if (!grid) return;

    if (this.filteredEvents.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (loadMoreContainer) loadMoreContainer.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const visibleItems = this.filteredEvents.slice(0, this.visibleCount);
    grid.innerHTML = visibleItems.map(e => this.createEventCardHTML(e, false)).join('');

    // Toggle Load More button
    if (loadMoreContainer) {
      loadMoreContainer.style.display = this.visibleCount < this.filteredEvents.length ? 'flex' : 'none';
    }

    this.bindCardActions(grid);
  },

  /**
   * Generate Event Card HTML
   */
  createEventCardHTML(event, isFeatured = false) {
    const isBookmarked = StorageService.isFavorite(event.id);
    const remainingSeats = StorageService.getCapacity(event.id, event.seatsRemaining);
    const capacityPercent = Math.min(100, Math.round(((event.capacity - remainingSeats) / event.capacity) * 100));
    const isSoldOut = remainingSeats <= 0;

    // Countdown Badge
    const daysUntil = Math.max(0, Math.ceil((new Date(event.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

    return `
      <div class="event-card ${isFeatured ? 'featured-card' : ''}" data-id="${event.id}">
        <div class="event-card-media">
          <img src="${event.image}" alt="${event.title}" class="event-card-image" loading="lazy" onerror="this.onerror=null; this.src='${FALLBACK_CATEGORY_IMAGES[event.category]}';">
          <span class="event-badge-category">${event.categoryLabel}</span>
          <span class="event-badge-price ${event.isFree ? 'badge-price-free' : 'badge-price-paid'}">
            ${event.isFree ? '<i class=\"fa-solid fa-gift\"></i> FREE' : '₹' + event.price.toLocaleString('en-IN')}
          </span>
          <button class="event-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-bookmark-id="${event.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Save Event'}" aria-label="Bookmark event">
            <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>

        <div class="event-card-body">
          <div class="event-date-row">
            <span class="event-date-chip">
              <i class="fa-regular fa-calendar-check"></i> ${event.displayDate}
            </span>
            <span class="event-countdown-chip">
              <i class="fa-regular fa-clock"></i> In ${daysUntil} days
            </span>
          </div>

          <h3 class="event-card-title">${event.title}</h3>
          <p class="event-card-snippet">${event.shortDescription}</p>

          <div class="event-card-details">
            <div class="event-detail-item">
              <i class="fa-solid fa-location-dot"></i>
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${event.venue}</span>
            </div>
            <div class="event-detail-item">
              <i class="fa-regular fa-clock"></i>
              <span>${event.startTime} - ${event.endTime}</span>
            </div>
            <div class="event-detail-item">
              <i class="fa-solid fa-shield-halved"></i>
              <span>By ${event.organizer}</span>
            </div>
          </div>

          <div class="capacity-container">
            <div class="capacity-header">
              <span>Capacity (${capacityPercent}% booked)</span>
              <span class="capacity-remaining">${isSoldOut ? 'Sold Out' : `${remainingSeats} seats left`}</span>
            </div>
            <div class="capacity-bar-track">
              <div class="capacity-bar-fill ${remainingSeats < 25 ? 'warning' : ''}" style="width: ${capacityPercent}%;"></div>
            </div>
          </div>

          <div class="event-card-footer">
            <button class="btn btn-secondary btn-sm quick-view-btn" data-id="${event.id}">
              <i class="fa-regular fa-eye"></i> View Details
            </button>
            <button class="btn btn-primary btn-sm register-card-btn" data-id="${event.id}" ${isSoldOut ? 'disabled' : ''}>
              ${isSoldOut ? 'Sold Out' : '<i class="fa-solid fa-ticket"></i> Register'}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Bind Actions on rendered cards
   */
  bindCardActions(container) {
    // Quick View Buttons
    container.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        this.openQuickModal(id);
      });
    });

    // Register Direct Buttons
    container.querySelectorAll('.register-card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        if (typeof RegistrationManager !== 'undefined') {
          RegistrationManager.openModal(id);
        }
      });
    });

    // Bookmark Toggle Buttons
    container.querySelectorAll('.event-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-bookmark-id');
        const isNowBookmarked = StorageService.toggleFavorite(id);
        
        btn.classList.toggle('bookmarked', isNowBookmarked);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = `fa-${isNowBookmarked ? 'solid' : 'regular'} fa-heart`;
        }

        if (typeof showToast === 'function') {
          showToast(isNowBookmarked ? 'Event saved to bookmarks!' : 'Event removed from bookmarks.', 'info');
        }
      });
    });
  },

  /**
   * Open Quick View Event Modal
   */
  openQuickModal(eventId) {
    const modal = document.getElementById('quickViewModal');
    const modalContent = document.getElementById('quickViewModalContent');
    if (!modal || !modalContent) return;

    const event = this.events.find(e => e.id === eventId);
    if (!event) return;

    const remainingSeats = StorageService.getCapacity(event.id, event.seatsRemaining);
    const isSoldOut = remainingSeats <= 0;

    modalContent.innerHTML = `
      <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 1.5rem;">
        <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 260px; object-fit: cover;" onerror="this.src='${FALLBACK_CATEGORY_IMAGES[event.category]}'">
        <span class="event-badge-category" style="top: 1rem; left: 1rem;">${event.categoryLabel}</span>
        <span class="event-badge-price ${event.isFree ? 'badge-price-free' : 'badge-price-paid'}" style="top: 1rem; right: 1rem;">
          ${event.isFree ? 'FREE ENTRY' : '₹' + event.price.toLocaleString('en-IN')}
        </span>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-size: 0.8125rem; font-weight: 700; color: var(--primary);">
          <i class="fa-regular fa-calendar"></i> ${event.displayDate} &nbsp;|&nbsp; <i class="fa-regular fa-clock"></i> ${event.startTime} - ${event.endTime}
        </span>
        <span style="font-size: 0.8125rem; font-weight: 700; color: ${remainingSeats < 30 ? '#EF4444' : '#10B981'};">
          <i class="fa-solid fa-chair"></i> ${remainingSeats} Seats Available
        </span>
      </div>

      <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; line-height: 1.3;">${event.title}</h2>

      <p style="font-size: 0.95rem; color: var(--text-body); line-height: 1.7; margin-bottom: 1.5rem;">${event.description}</p>

      <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Venue & City</span>
          <div style="font-size: 0.9375rem; font-weight: 600; color: var(--text-main); margin-top: 0.2rem;"><i class="fa-solid fa-location-dot" style="color: var(--primary);"></i> ${event.venue}</div>
        </div>
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Organizer</span>
          <div style="font-size: 0.9375rem; font-weight: 600; color: var(--text-main); margin-top: 0.2rem;"><i class="fa-solid fa-user-tie" style="color: var(--primary);"></i> ${event.organizer}</div>
        </div>
      </div>

      <!-- Key Perks -->
      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.75rem;">What's Included:</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${(event.perks || []).slice(0, 3).map(p => `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.875rem; color: var(--text-body);">
              <i class="fa-solid fa-circle-check" style="color: #10B981; font-size: 0.9rem;"></i>
              <span>${p}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Action Footer -->
      <div style="display: flex; gap: 1rem; align-items: center; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
        <a href="event-details.html?id=${event.id}" class="btn btn-secondary">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Full Details Page
        </a>
        <button class="btn btn-primary" id="quickModalRegisterBtn" ${isSoldOut ? 'disabled' : ''}>
          ${isSoldOut ? 'Sold Out' : '<i class="fa-solid fa-ticket"></i> Register Now'}
        </button>
      </div>
    `;

    const registerBtn = document.getElementById('quickModalRegisterBtn');
    if (registerBtn && !isSoldOut) {
      registerBtn.addEventListener('click', () => {
        this.closeQuickModal();
        if (typeof RegistrationManager !== 'undefined') {
          RegistrationManager.openModal(event.id);
        }
      });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeQuickModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  /**
   * Spotlight Banner Live Countdown
   */
  initSpotlightBanner() {
    const targetDate = new Date('2026-11-20T09:00:00').getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const dEl = document.getElementById('spotlightDays');
      const hEl = document.getElementById('spotlightHours');
      const mEl = document.getElementById('spotlightMins');
      const sEl = document.getElementById('spotlightSecs');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  EventsController.init();
});


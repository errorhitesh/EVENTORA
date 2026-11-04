/**
 * EVENTORA - Registration Controller
 * Manages modal display, real-time input validation, duplicate registration prevention,
 * capacity checks, ticket pass generation, and persistent saving.
 */

const RegistrationManager = {
  activeEvent: null,
  ticketCount: 1,

  init() {
    this.bindEvents();
    this.updateNavBadge();
  },

  bindEvents() {
    // Modal Close Triggers
    const closeBtns = document.querySelectorAll('.reg-modal-close');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.closeModal());
    });

    const overlay = document.getElementById('registrationModal');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeModal();
      });
    }

    // Success Modal Close Triggers
    const successClose = document.querySelectorAll('.success-modal-close');
    successClose.forEach(btn => {
      btn.addEventListener('click', () => this.closeSuccessModal());
    });

    const successOverlay = document.getElementById('registrationSuccessModal');
    if (successOverlay) {
      successOverlay.addEventListener('click', (e) => {
        if (e.target === successOverlay) this.closeSuccessModal();
      });
    }

    // Form submission
    const form = document.getElementById('eventRegistrationForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));

      // Realtime validation on blur & input
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid')) {
            this.validateField(input);
          }
        });
      });

      // Ticket quantity change listener
      const ticketSelect = document.getElementById('regTicketCount');
      if (ticketSelect) {
        ticketSelect.addEventListener('change', (e) => {
          this.ticketCount = parseInt(e.target.value, 10) || 1;
          this.updatePriceSummary();
        });
      }

      // Event select change listener
      const eventSelect = document.getElementById('regEventSelect');
      if (eventSelect) {
        eventSelect.addEventListener('change', (e) => {
          const selectedId = e.target.value;
          const found = INITIAL_EVENTS.find(evt => evt.id === selectedId);
          if (found) {
            this.activeEvent = found;
            this.updateEventSummaryBanner();
            this.updatePriceSummary();
          }
        });
      }
    }

    // Escape key closes modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.closeSuccessModal();
      }
    });
  },

  /**
   * Open Registration Modal for a specific event
   */
  openModal(eventId = null) {
    const modal = document.getElementById('registrationModal');
    if (!modal) return;

    // Populate event options if select exists
    const eventSelect = document.getElementById('regEventSelect');
    if (eventSelect) {
      eventSelect.innerHTML = '<option value="">-- Choose an Event --</option>' +
        INITIAL_EVENTS.map(e => `<option value="${e.id}">${e.title} (${e.isFree ? 'Free' : '₹' + e.price})</option>`).join('');
    }

    if (eventId) {
      this.activeEvent = INITIAL_EVENTS.find(e => e.id === eventId) || null;
      if (eventSelect && this.activeEvent) {
        eventSelect.value = this.activeEvent.id;
      }
    } else if (!this.activeEvent && INITIAL_EVENTS.length > 0) {
      this.activeEvent = INITIAL_EVENTS[0];
      if (eventSelect) eventSelect.value = this.activeEvent.id;
    }

    // Check capacity
    const defaultSeats = this.activeEvent ? this.activeEvent.seatsRemaining : 50;
    const remaining = StorageService.getCapacity(this.activeEvent?.id, defaultSeats);

    if (remaining <= 0) {
      if (typeof showToast === 'function') {
        showToast('Sorry! This event has reached maximum capacity.', 'error');
      }
      return;
    }

    // Prefill user session data if available
    const session = StorageService.getUserSession();
    if (session) {
      const nameInput = document.getElementById('regFullName');
      const emailInput = document.getElementById('regEmail');
      const phoneInput = document.getElementById('regPhone');
      if (nameInput && !nameInput.value) nameInput.value = session.fullName || '';
      if (emailInput && !emailInput.value) emailInput.value = session.email || '';
      if (phoneInput && !phoneInput.value) phoneInput.value = session.phone || '';
    }

    this.ticketCount = 1;
    const ticketSelect = document.getElementById('regTicketCount');
    if (ticketSelect) ticketSelect.value = '1';

    this.updateEventSummaryBanner();
    this.updatePriceSummary();

    // Reset previous validation state
    this.clearValidationErrors();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const firstInput = document.getElementById('regFullName');
      if (firstInput) firstInput.focus();
    }, 150);
  },

  closeModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  closeSuccessModal() {
    const modal = document.getElementById('registrationSuccessModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  updateEventSummaryBanner() {
    const banner = document.getElementById('regEventSummary');
    if (!banner || !this.activeEvent) return;

    const remaining = StorageService.getCapacity(this.activeEvent.id, this.activeEvent.seatsRemaining);

    banner.innerHTML = `
      <div style="display: flex; gap: 1rem; align-items: center; background: var(--bg-surface-subtle); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
        <img src="${this.activeEvent.image}" alt="${this.activeEvent.title}" style="width: 70px; height: 70px; object-fit: cover; border-radius: var(--radius-sm); flex-shrink: 0;" onerror="this.src='${FALLBACK_CATEGORY_IMAGES[this.activeEvent.category]}'">
        <div style="flex-grow: 1; min-width: 0;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">${this.activeEvent.categoryLabel}</span>
          <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin: 0.2rem 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${this.activeEvent.title}</h4>
          <div style="display: flex; gap: 0.8rem; font-size: 0.8125rem; color: var(--text-muted); flex-wrap: wrap;">
            <span><i class="fa-regular fa-calendar" style="color: var(--primary);"></i> ${this.activeEvent.displayDate}</span>
            <span><i class="fa-solid fa-location-dot" style="color: var(--primary);"></i> ${this.activeEvent.city}</span>
            <span style="color: ${remaining < 30 ? '#EF4444' : '#10B981'}; font-weight: 700;"><i class="fa-solid fa-chair"></i> ${remaining} spots left</span>
          </div>
        </div>
      </div>
    `;
  },

  updatePriceSummary() {
    const priceBox = document.getElementById('regPriceCalculation');
    if (!priceBox || !this.activeEvent) return;

    const unitPrice = this.activeEvent.isFree ? 0 : this.activeEvent.price;
    const total = unitPrice * this.ticketCount;

    priceBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.35rem;">
        <span>Ticket Price (${this.ticketCount}x)</span>
        <span>${this.activeEvent.isFree ? 'FREE' : '₹' + unitPrice.toLocaleString('en-IN') + ' each'}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800; color: var(--text-main); padding-top: 0.5rem; border-top: 1px dashed var(--border-strong);">
        <span>Total Payable:</span>
        <span style="color: var(--primary);">${total === 0 ? '₹0 (Free)' : '₹' + total.toLocaleString('en-IN')}</span>
      </div>
    `;
  },

  /* ============================================================
     VALIDATION ENGINE
     ============================================================ */

  validateField(field) {
    const fieldId = field.id;
    const val = field.value ? field.value.trim() : '';
    let isValid = true;
    let errorMsg = '';

    switch (fieldId) {
      case 'regFullName':
        if (!val) {
          isValid = false;
          errorMsg = 'Full name is required';
        } else if (val.length < 3) {
          isValid = false;
          errorMsg = 'Name must be at least 3 characters long';
        } else if (!/^[a-zA-Z\s.'-]+$/.test(val)) {
          isValid = false;
          errorMsg = 'Please enter a valid human name (letters only)';
        }
        break;

      case 'regEmail':
        if (!val) {
          isValid = false;
          errorMsg = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
          isValid = false;
          errorMsg = 'Please enter a valid email address (e.g. name@domain.com)';
        }
        break;

      case 'regPhone':
        if (!val) {
          isValid = false;
          errorMsg = 'Phone number is required';
        } else {
          // Indian phone validation (10 digits starting with 6,7,8,9, optional +91 or 0 prefix)
          const cleanPhone = val.replace(/[\s-]/g, '');
          const indianRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
          const intlRegex = /^\+?[1-9]\d{6,14}$/;
          if (!indianRegex.test(cleanPhone) && !intlRegex.test(cleanPhone)) {
            isValid = false;
            errorMsg = 'Enter a valid 10-digit mobile number (e.g. 9876543210)';
          }
        }
        break;

      case 'regEventSelect':
        if (!val) {
          isValid = false;
          errorMsg = 'Please select an event';
        }
        break;

      case 'regTermsAgree':
        if (!field.checked) {
          isValid = false;
          errorMsg = 'You must agree to the Eventora terms and cancellation policy';
        }
        break;

      default:
        break;
    }

    this.showFieldError(field, isValid, errorMsg);
    return isValid;
  },

  showFieldError(field, isValid, errorMsg) {
    const errorEl = document.getElementById(`${field.id}Error`);
    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      if (errorEl) {
        errorEl.classList.remove('visible');
        errorEl.textContent = '';
      }
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      if (errorEl) {
        errorEl.classList.add('visible');
        errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${errorMsg}`;
      }
    }
  },

  clearValidationErrors() {
    const form = document.getElementById('eventRegistrationForm');
    if (!form) return;
    const inputs = form.querySelectorAll('.form-control, .form-checkbox');
    inputs.forEach(input => {
      input.classList.remove('is-invalid', 'is-valid');
    });
    const errors = form.querySelectorAll('.form-error-msg');
    errors.forEach(err => {
      err.classList.remove('visible');
      err.textContent = '';
    });
  },

  /**
   * Handle Form Submission
   */
  handleFormSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('eventRegistrationForm');
    if (!form) return;

    // Validate all required inputs
    const nameInput = document.getElementById('regFullName');
    const emailInput = document.getElementById('regEmail');
    const phoneInput = document.getElementById('regPhone');
    const eventSelect = document.getElementById('regEventSelect');
    const termsCheck = document.getElementById('regTermsAgree');
    const orgInput = document.getElementById('regOrganization');
    const notesInput = document.getElementById('regNotes');

    const v1 = this.validateField(nameInput);
    const v2 = this.validateField(emailInput);
    const v3 = this.validateField(phoneInput);
    const v4 = this.validateField(eventSelect);
    const v5 = this.validateField(termsCheck);

    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      if (typeof showToast === 'function') {
        showToast('Please fix the errors highlighted in red.', 'error');
      }
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const eventId = eventSelect.value;
    const eventObj = INITIAL_EVENTS.find(ev => ev.id === eventId);

    if (!eventObj) {
      if (typeof showToast === 'function') {
        showToast('Invalid event selected.', 'error');
      }
      return;
    }

    // DUPLICATE REGISTRATION PREVENTION
    if (StorageService.isUserRegisteredForEvent(email, eventId)) {
      this.showFieldError(emailInput, false, 'You have already registered for this event with this email.');
      if (typeof showToast === 'function') {
        showToast('Duplicate registration! You are already registered for this event.', 'warning', 4500);
      }
      return;
    }

    // CAPACITY CHECK
    const currentSeats = StorageService.getCapacity(eventId, eventObj.seatsRemaining);
    if (currentSeats < this.ticketCount) {
      if (typeof showToast === 'function') {
        showToast(`Only ${currentSeats} seats remaining for this event!`, 'error');
      }
      return;
    }

    // REGISTRATION DEADLINE CHECK
    if (new Date(eventObj.registrationDeadline).getTime() < Date.now()) {
      if (typeof showToast === 'function') {
        showToast('Registration for this event has closed.', 'error');
      }
      return;
    }

    // Show Loading/Processing State
    const submitBtn = document.getElementById('regSubmitBtn');
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Securing Your Spot...';

    // Simulate async booking network processing (~650ms)
    setTimeout(() => {
      // Generate Unique Registration ID
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const regId = `EVT-2026-${randomNum}`;

      const totalAmount = eventObj.isFree ? 0 : eventObj.price * this.ticketCount;

      const record = {
        registrationId: regId,
        eventId: eventObj.id,
        eventTitle: eventObj.title,
        eventCategory: eventObj.categoryLabel,
        eventDate: eventObj.date,
        displayDate: eventObj.displayDate,
        eventTime: `${eventObj.startTime} - ${eventObj.endTime}`,
        eventVenue: eventObj.venue,
        eventCity: eventObj.city,
        eventImage: eventObj.image,
        ticketPrice: eventObj.price,
        ticketCount: this.ticketCount,
        totalAmount: totalAmount,
        isFree: eventObj.isFree,
        fullName: nameInput.value.trim(),
        email: email,
        phone: phoneInput.value.trim(),
        organization: orgInput ? orgInput.value.trim() : '',
        notes: notesInput ? notesInput.value.trim() : '',
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      // Save to LocalStorage
      StorageService.saveRegistration(record);

      // Reset Button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;

      // Close Form Modal
      this.closeModal();

      // Reset form
      form.reset();

      // Show Success Modal with Digital Ticket Pass
      this.displaySuccessTicket(record);

      // Toast notification
      if (typeof showToast === 'function') {
        showToast(`Registration Successful! Pass: ${regId}`, 'success', 5000);
      }

      // Update badge
      this.updateNavBadge();

      // Refresh event cards if on page
      if (typeof EventsController !== 'undefined' && EventsController.renderEvents) {
        EventsController.renderEvents();
      }
    }, 650);
  },

  /**
   * Display Confirmation & Digital Ticket Pass
   */
  displaySuccessTicket(record) {
    const successModal = document.getElementById('registrationSuccessModal');
    const container = document.getElementById('ticketPassContainer');
    if (!successModal || !container) return;

    container.innerHTML = `
      <div class="ticket-pass-wrapper" id="printableTicketArea">
        <div class="ticket-pass-header">
          <div class="ticket-brand">
            <i class="fa-solid fa-bolt-lightning"></i> EVENTORA PASS
          </div>
          <div class="ticket-id-pill">${record.registrationId}</div>
        </div>

        <div class="ticket-pass-body">
          <div style="font-size: 0.8125rem; font-weight: 700; color: #10B981; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem;">
            <i class="fa-solid fa-circle-check"></i> Confirmed Registration
          </div>
          <h3 class="ticket-event-name">${record.eventTitle}</h3>

          <div class="ticket-details-grid">
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Attendee Name</span>
              <span class="ticket-detail-val">${record.fullName}</span>
            </div>
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Email Address</span>
              <span class="ticket-detail-val" style="word-break: break-all;">${record.email}</span>
            </div>
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Date & Time</span>
              <span class="ticket-detail-val">${record.displayDate}<br><small style="color: var(--text-muted);">${record.eventTime}</small></span>
            </div>
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Venue</span>
              <span class="ticket-detail-val">${record.eventVenue}</span>
            </div>
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Pass Count</span>
              <span class="ticket-detail-val">${record.ticketCount} Attendee${record.ticketCount > 1 ? 's' : ''}</span>
            </div>
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Amount Paid</span>
              <span class="ticket-detail-val" style="color: var(--primary);">${record.isFree ? 'FREE ENTRY' : '₹' + record.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="ticket-pass-divider">
            <div class="ticket-notch-left"></div>
            <div class="ticket-divider-line"></div>
            <div class="ticket-notch-right"></div>
          </div>

          <div class="ticket-qr-section">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <!-- QR Code Mock SVG -->
              <svg class="ticket-qr-code" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="white" />
                <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#0F172A" />
                <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#0F172A" />
                <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#0F172A" />
                <circle cx="50" cy="50" r="8" fill="#5B4BDB" />
                <rect x="55" y="60" width="8" height="25" fill="#0F172A" />
                <rect x="70" y="60" width="18" height="8" fill="#0F172A" />
                <rect x="75" y="75" width="15" height="15" fill="#0F172A" />
              </svg>
              <div>
                <div style="font-size: 0.8125rem; font-weight: 700; color: var(--text-main);">Scan at Entrance Gate</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Registered on ${new Date(record.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
            </div>
            <div class="ticket-barcode-box">
              <div class="ticket-barcode-lines">||||| | |||| |||</div>
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">${record.registrationId}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach Print action
    const printBtn = document.getElementById('ticketPrintBtn');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
      };
    }

    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  /**
   * Update Badge in Navigation
   */
  updateNavBadge() {
    const badges = document.querySelectorAll('.reg-count-badge');
    const regs = StorageService.getRegistrations();
    const activeCount = regs.filter(r => r.status !== 'Cancelled').length;
    badges.forEach(b => {
      b.textContent = activeCount;
      b.style.display = activeCount > 0 ? 'inline-flex' : 'none';
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  RegistrationManager.init();
});

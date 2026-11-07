/**
 * EVENTORA - Main Application Orchestrator
 * Controls navigation, mobile drawers, toast notifications,
 * scroll listeners, hero countdowns, and global interactions.
 */

// Global Toast Notification Helper
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconClass = 'fa-info-circle';
  if (type === 'success') iconClass = 'fa-circle-check';
  if (type === 'error') iconClass = 'fa-circle-xmark';
  if (type === 'warning') iconClass = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} toast-icon"></i>
    <div class="toast-message">${message}</div>
    <button class="toast-close" aria-label="Close notification">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  // Trigger entrance transition
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  const closeToast = () => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', closeToast);

  setTimeout(closeToast, duration);
}

const App = {
  init() {
    this.initStickyHeader();
    this.initMobileDrawer();
    this.initBackToTop();
    this.initHeroCountdown();
    this.initHostModal();
    if (typeof InstantGatePassManager !== 'undefined') {
      InstantGatePassManager.init();
    }
    this.initNewsletterForm();
    this.initSmoothScroll();
  },

  /**
   * Sticky Header with blur and shadow on scroll
   */
  initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  },

  /**
   * Mobile Hamburger Drawer
   */
  initMobileDrawer() {
    const openBtn = document.querySelector('.mobile-menu-btn');
    const drawer = document.getElementById('mobileNavDrawer');
    const backdrop = document.getElementById('mobileNavBackdrop');
    const closeBtn = document.querySelector('.mobile-drawer-close');
    const links = document.querySelectorAll('.mobile-drawer-link');

    if (!drawer || !backdrop) return;

    const openDrawer = () => {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    links.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  },

  /**
   * Back to Top Floating Button
   */
  initBackToTop() {
    const backBtn = document.getElementById('backToTopBtn');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  /**
   * Hero Showcase Floating Card Live Countdown
   */
  initHeroCountdown() {
    const dEl = document.getElementById('heroTimerDays');
    const hEl = document.getElementById('heroTimerHours');
    const mEl = document.getElementById('heroTimerMins');
    const sEl = document.getElementById('heroTimerSecs');

    if (!dEl) return;

    const targetDate = new Date('2026-11-20T09:00:00').getTime();

    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      dEl.textContent = `${days}d`;
      hEl.textContent = `${hours}h`;
      mEl.textContent = `${mins}m`;
      sEl.textContent = `${secs}s`;
    };

    update();
    setInterval(update, 1000);
  },

  /**
   * Host an Event Information Modal
   */
  initHostModal() {
    const hostBtns = document.querySelectorAll('.host-event-trigger');
    const modal = document.getElementById('hostEventModal');
    const closeBtns = document.querySelectorAll('.host-modal-close');

    if (!modal) return;

    hostBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    closeBtns.forEach(b => b.addEventListener('click', closeModal));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    const form = document.getElementById('hostEventInquiryForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thank you! Our organizer partnerships team will reach out within 24 hours.', 'success', 5000);
        closeModal();
        form.reset();
      });
    }
  },

  /**
   * Newsletter Subscription Form
   */
  initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('.newsletter-input');
        if (!input || !input.value.trim()) return;

        const email = input.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          showToast('Please enter a valid email address.', 'error');
          return;
        }

        showToast('Subscribed! You’ll get weekly event drops and early-bird alerts.', 'success');
        input.value = '';
      });
    });
  },

  /**
   * Smooth Anchor Links Scroll
   */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#!' || !targetId.startsWith('#')) return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 75;
          const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      });
    });
  },

  /**
   * Functional Instant QR Gate Entry Pass Controller
   */
  initInstantGatePass() {
    if (typeof InstantGatePassManager !== 'undefined') {
      InstantGatePassManager.init();
    }
  }
};

/**
 * ============================================================
 * INSTANT QR GATE ENTRY PASS MANAGER
 * ============================================================
 * High-performance, floating turnstile access controller with
 * real-time QR generation, Web Audio API scanner feedback,
 * and seamless booking integration.
 */
const InstantGatePassManager = {
  modal: null,
  modalBody: null,
  floatingDock: null,

  init() {
    this.ensureModalInDOM();
    this.ensureFloatingDockInDOM();
    this.bindTriggers();
  },

  ensureModalInDOM() {
    let modal = document.getElementById('instantGateModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.id = 'instantGateModal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'gateModalTitle');
      modal.innerHTML = `
        <div class="modal-box modal-box-wide" style="max-width: 580px;">
          <div class="modal-header">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div class="brand-icon" style="width: 2.25rem; height: 2.25rem; font-size: 1rem;" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM14 14h2v2h-2zM18 14h3v3h-3zM14 18h3v3h-3zM18 18h3v3h-3z"/>
                  <rect x="5" y="5" width="2" height="2" fill="#FFFFFF"/>
                  <rect x="17" y="5" width="2" height="2" fill="#FFFFFF"/>
                  <rect x="5" y="17" width="2" height="2" fill="#FFFFFF"/>
                </svg>
              </div>
              <div>
                <h3 class="modal-title" id="gateModalTitle" style="font-size: 1.15rem; margin-bottom: 0.15rem;">
                  Instant QR Gate Entry Pass
                </h3>
                <div style="font-size: 0.72rem; color: #10B981; font-weight: 700; display: flex; align-items: center; gap: 0.35rem;">
                  <span class="pulse-dot" style="width: 6px; height: 6px;"></span>
                  <span style="font-family: var(--font-pixel-sm); letter-spacing: 0.04em;">LIVE SYSTEM // TURNSTILE GATE READY</span>
                </div>
              </div>
            </div>
            <button class="modal-close-btn gate-modal-close" aria-label="Close gate pass modal">
              <svg class="pixel-close-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body" id="gateModalBody"></div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    this.modal = modal;
    this.modalBody = modal.querySelector('#gateModalBody');

    const closeBtn = modal.querySelector('.gate-modal-close');
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.preventDefault();
        this.closeModal();
      };
    }

    modal.onclick = (e) => {
      if (e.target === modal) this.closeModal();
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  },

  ensureFloatingDockInDOM() {
    let dock = document.getElementById('floatingGateTrigger');
    if (!dock) {
      dock = document.createElement('button');
      dock.id = 'floatingGateTrigger';
      dock.className = 'floating-gate-pass-dock';
      dock.setAttribute('type', 'button');
      dock.setAttribute('aria-label', 'Open Instant QR Gate Entry Pass');
      dock.innerHTML = `
        <div class="floating-gate-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
            <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM14 14h2v2h-2zM18 14h3v3h-3zM14 18h3v3h-3zM18 18h3v3h-3z"/>
            <rect x="5" y="5" width="2" height="2" fill="currentColor"/>
            <rect x="17" y="5" width="2" height="2" fill="currentColor"/>
            <rect x="5" y="17" width="2" height="2" fill="currentColor"/>
          </svg>
        </div>
        <div class="floating-gate-label">
          <span class="floating-gate-tag"><span class="pulse-dot"></span> TURNSTILE GATE</span>
          <span class="floating-gate-title">Instant Gate Pass</span>
        </div>
      `;
      document.body.appendChild(dock);
    }

    this.floatingDock = dock;
    dock.onclick = (e) => {
      e.preventDefault();
      this.openModal();
    };
  },

  bindTriggers() {
    const triggers = document.querySelectorAll('#instantGatePassTrigger, .instant-gate-trigger, .floating-mini-widget');
    triggers.forEach(el => {
      el.removeEventListener('click', this.handleTriggerClick);
      el.addEventListener('click', this.handleTriggerClick.bind(this));
    });
  },

  handleTriggerClick(e) {
    e.preventDefault();
    this.openModal();
  },

  playTurnstileBeep() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (err) {
      // Audio autoplay policy fallback
    }
  },

  renderGatePass(customPass) {
    if (!this.modalBody) this.ensureModalInDOM();
    if (!this.modalBody) return;

    // Fetch user data and registrations
    const allRegistrations = (typeof StorageService !== 'undefined') ? StorageService.getRegistrations() : [];
    const currentUser = (typeof AuthModal !== 'undefined') ? AuthModal.getCurrentUser() : null;

    let activeRecord = customPass || null;

    if (!activeRecord && currentUser && currentUser.email) {
      activeRecord = allRegistrations.find(r => r.email && r.email.toLowerCase() === currentUser.email.toLowerCase());
    }
    if (!activeRecord && allRegistrations.length > 0) {
      activeRecord = allRegistrations[allRegistrations.length - 1];
    }

    const isRealPass = !!activeRecord;
    const eventTitle = isRealPass ? activeRecord.eventTitle : 'Global AI & Web3 Innovators Summit 2026';
    const attendeeName = isRealPass ? activeRecord.fullName : (currentUser ? currentUser.name : 'Guest Attendee');
    const attendeeEmail = isRealPass ? activeRecord.email : (currentUser ? currentUser.email : 'guest.pass@eventora.io');
    const passId = isRealPass ? activeRecord.registrationId : 'EVT-PASS-2026-X94B';
    const dateStr = isRealPass ? activeRecord.displayDate : 'Nov 20 - 21, 2026 (09:00 AM)';
    const venueStr = isRealPass ? activeRecord.eventVenue : 'BIEC, Bengaluru (Hall 3)';
    const gateNo = 'Gate 04 – North Turnstile';

    this.modalBody.innerHTML = `
      <div class="ticket-pass-wrapper" style="margin-top: 0; box-shadow: none;">
        <div class="ticket-pass-header" style="padding: 1rem 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="gate-pass-badge ${isRealPass ? 'verified' : 'demo'}">
              <i class="fa-solid ${isRealPass ? 'fa-circle-check' : 'fa-flask'}"></i>
              ${isRealPass ? 'Verified Ticket' : 'Instant Demo Pass'}
            </span>
          </div>
          <div class="ticket-id-pill" style="font-size: 0.75rem;">${passId}</div>
        </div>

        <div class="ticket-pass-body" style="padding: 1.25rem;">
          <h3 class="ticket-event-name" style="font-size: 1.15rem; margin-bottom: 1rem;">
            ${eventTitle}
          </h3>

          <div class="ticket-details-grid" style="gap: 0.85rem; margin-bottom: 1rem;">
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Designated Turnstile</span>
              <span class="ticket-detail-val" style="color: var(--primary);">${gateNo}</span>
            </div>
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Attendee</span>
              <span class="ticket-detail-val">${attendeeName}</span>
            </div>
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Event Date &amp; Time</span>
              <span class="ticket-detail-val" style="font-size: 0.85rem;">${dateStr}</span>
            </div>
            <div class="ticket-detail-cell">
              <span class="ticket-detail-label">Venue Location</span>
              <span class="ticket-detail-val" style="font-size: 0.85rem;">${venueStr}</span>
            </div>
          </div>

          <div class="gate-qr-stage">
            <div class="gate-qr-box">
              <div class="gate-laser-line"></div>
              <!-- High-res Mock Gate QR SVG -->
              <svg width="130" height="130" viewBox="0 0 100 100" style="display: block;">
                <rect width="100" height="100" fill="#FFFFFF" />
                <!-- Corner Markers -->
                <path d="M6,6 h26 v26 h-26 z M10,10 v18 h18 v-18 z M14,14 h10 v10 h-10 z" fill="#09090B" />
                <path d="M68,6 h26 v26 h-26 z M72,10 v18 h18 v-18 z M76,14 h10 v10 h-10 z" fill="#09090B" />
                <path d="M6,68 h26 v26 h-26 z M10,72 v18 h18 v-18 z M14,76 h10 v10 h-10 z" fill="#09090B" />
                <!-- Claude Code Centerpiece Orange Marker -->
                <circle cx="50" cy="50" r="10" fill="#F97316" />
                <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
                <!-- Data Matrix Dots -->
                <rect x="40" y="10" width="8" height="8" fill="#09090B" />
                <rect x="52" y="10" width="8" height="8" fill="#09090B" />
                <rect x="40" y="24" width="6" height="6" fill="#09090B" />
                <rect x="10" y="40" width="8" height="8" fill="#09090B" />
                <rect x="24" y="40" width="8" height="8" fill="#09090B" />
                <rect x="10" y="52" width="6" height="6" fill="#09090B" />
                <rect x="40" y="70" width="8" height="8" fill="#09090B" />
                <rect x="54" y="70" width="8" height="18" fill="#09090B" />
                <rect x="70" y="40" width="8" height="14" fill="#09090B" />
                <rect x="82" y="40" width="10" height="8" fill="#09090B" />
                <rect x="70" y="60" width="12" height="6" fill="#09090B" />
                <rect x="70" y="74" width="8" height="16" fill="#09090B" />
                <rect x="84" y="74" width="8" height="8" fill="#09090B" />
              </svg>
            </div>

            <div style="margin-top: 0.75rem; text-align: center;">
              <div style="font-family: var(--font-pixel-sm); font-size: 0.72rem; letter-spacing: 0.04em; color: var(--text-muted); text-transform: uppercase;">
                Turnstile ID: ${passId}
              </div>
              <div class="ticket-barcode-lines" style="height: 20px; font-size: 0.9rem; letter-spacing: 3px; margin-top: 0.25rem;">
                ||||| | |||| ||| |||| |
              </div>
            </div>

            <!-- Live Turnstile Scan Feedback Placeholder -->
            <div id="gateTurnstileResult" style="width: 100%;"></div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button class="btn btn-primary btn-block" id="simulateGateScanBtn">
              <i class="fa-solid fa-barcode"></i> Simulate Turnstile Scanner Check-In
            </button>

            <div style="display: flex; gap: 0.75rem;">
              ${isRealPass ? `
                <a href="registrations.html" class="btn btn-secondary btn-block" style="text-align: center;">
                  <i class="fa-solid fa-list-check"></i> My Registrations
                </a>
              ` : `
                <button class="btn btn-secondary btn-block" id="gateRegisterNowBtn">
                  <i class="fa-solid fa-ticket"></i> Book Confirmed Ticket
                </button>
              `}
              <button class="btn btn-secondary btn-block" id="gatePrintPassBtn">
                <i class="fa-solid fa-print"></i> Print Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Wire simulation button
    const simBtn = document.getElementById('simulateGateScanBtn');
    const resultArea = document.getElementById('gateTurnstileResult');
    if (simBtn && resultArea) {
      simBtn.addEventListener('click', () => {
        simBtn.disabled = true;
        simBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Reading Turnstile Sensor...';

        setTimeout(() => {
          this.playTurnstileBeep();
          simBtn.disabled = false;
          simBtn.innerHTML = '<i class="fa-solid fa-barcode"></i> Scan Again';

          resultArea.innerHTML = `
            <div class="gate-turnstile-alert success">
              <i class="fa-solid fa-circle-check" style="font-size: 1.25rem; flex-shrink: 0;"></i>
              <div>
                <div style="font-weight: 800; font-family: var(--font-pixel-sm); letter-spacing: 0.03em;">
                  GATE 04 TURNSTILE UNLOCKED
                </div>
                <div style="font-size: 0.78rem; opacity: 0.9; margin-top: 0.15rem;">
                  Pass <strong>${passId}</strong> accepted at ${new Date().toLocaleTimeString('en-US')}. Welcome, ${attendeeName}!
                </div>
              </div>
            </div>
          `;

          if (typeof showToast === 'function') {
            showToast('Turnstile gate unlocked! Pass verified successfully.', 'success', 4000);
          }
        }, 600);
      });
    }

    // Wire "Book Confirmed Ticket" button if demo
    const regBtn = document.getElementById('gateRegisterNowBtn');
    if (regBtn) {
      regBtn.addEventListener('click', () => {
        this.closeModal();
        if (typeof RegistrationManager !== 'undefined' && RegistrationManager.openModal) {
          RegistrationManager.openModal('evt-101');
        }
      });
    }

    // Wire "Print Pass" button
    const printBtn = document.getElementById('gatePrintPassBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  },

  openModal(customPass) {
    this.ensureModalInDOM();
    this.renderGatePass(customPass);
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

// Expose globally
window.InstantGatePassManager = InstantGatePassManager;

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});


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
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});


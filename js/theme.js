/**
 * EVENTORA - Theme Controller
 * Handles Light and Dark theme switching, persistence in LocalStorage,
 * and system preference synchronization.
 */

const ThemeManager = {
  currentTheme: 'light',

  init() {
    // 1. Check saved preference in LocalStorage
    const savedTheme = StorageService.getTheme();

    if (savedTheme === 'dark' || savedTheme === 'light') {
      this.setTheme(savedTheme, false);
    } else {
      // 2. Default to signature Claude Code Dark theme
      this.setTheme('dark', false);
    }

    // 3. Attach listeners to all theme toggle buttons
    this.bindButtons();

    // 4. Listen for OS theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!StorageService.getTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }
  },

  setTheme(theme, save = true) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);

    if (save) {
      StorageService.setTheme(theme);
    }

    this.updateToggleIcons();

    // Broadcast theme change event
    window.dispatchEvent(new CustomEvent('eventora:themeChange', { detail: { theme } }));
  },

  toggleTheme() {
    const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme, true);
    
    // Provide user feedback via toast if available
    if (typeof showToast === 'function') {
      showToast(`${nextTheme === 'dark' ? 'Dark' : 'Light'} mode activated`, 'info', 2000);
    }
  },

  updateToggleIcons() {
    const isDark = this.currentTheme === 'dark';
    const togglers = document.querySelectorAll('.theme-toggle-btn');

    // High-contrast, pixel-crisp SVGs that never fail or show question mark glyphs
    const sunSvg = `<svg class="theme-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="#F97316" stroke="#000000" stroke-width="1.2"/>
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93" stroke="#F97316" stroke-width="2.5" stroke-linecap="square"/>
    </svg>`;

    const moonSvg = `<svg class="theme-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="#F97316" stroke="#000000" stroke-width="1.2"/>
    </svg>`;

    const targetSvg = isDark ? sunSvg : moonSvg;
    const label = isDark ? 'Light Mode' : 'Dark Mode';
    const actionLabel = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    togglers.forEach(btn => {
      // Remove any legacy <i> tags
      const legacyIcon = btn.querySelector('i');
      if (legacyIcon) {
        legacyIcon.remove();
      }

      let svgEl = btn.querySelector('.theme-icon-svg');
      if (svgEl) {
        svgEl.outerHTML = targetSvg;
      } else {
        btn.insertAdjacentHTML('afterbegin', targetSvg);
      }

      const text = btn.querySelector('.theme-text');
      if (text) {
        text.textContent = label;
      }

      btn.setAttribute('aria-label', actionLabel);
      btn.setAttribute('title', actionLabel);
    });
  },

  bindButtons() {
    const togglers = document.querySelectorAll('.theme-toggle-btn');
    togglers.forEach(btn => {
      btn.removeEventListener('click', this.handleToggleClick);
      btn.addEventListener('click', this.handleToggleClick.bind(this));
    });
  },

  handleToggleClick(e) {
    e.preventDefault();
    this.toggleTheme();
  }
};

// Immediate invocation to prevent theme flash (FOUC)
(function() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed === 'dark' || parsed === 'light') {
        document.documentElement.setAttribute('data-theme', parsed);
      }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {
    // Graceful fallback
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
});


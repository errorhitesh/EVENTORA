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
      // 2. Check system OS preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light', false);
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
    const togglers = document.querySelectorAll('.theme-toggle-btn');
    togglers.forEach(btn => {
      const icon = btn.querySelector('i');
      const text = btn.querySelector('.theme-text');

      if (this.currentTheme === 'dark') {
        if (icon) {
          icon.className = 'fa-solid fa-sun';
          icon.setAttribute('style', 'color: #FBBF24;');
        }
        if (text) text.textContent = 'Light Mode';
        btn.setAttribute('aria-label', 'Switch to Light Mode');
        btn.setAttribute('title', 'Switch to Light Mode');
      } else {
        if (icon) {
          icon.className = 'fa-solid fa-moon';
          icon.setAttribute('style', 'color: #6366F1;');
        }
        if (text) text.textContent = 'Dark Mode';
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
        btn.setAttribute('title', 'Switch to Dark Mode');
      }
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


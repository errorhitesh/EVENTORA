/**
 * EVENTORA - Authentication Service & UI Controller
 * Supports standard Email/Password Login & Sign Up,
 * realistic Google/Gmail One-Click OAuth simulation, session management,
 * and profile dropdown states.
 */

const AuthManager = {
  activeTab: 'login', // 'login' | 'signup'
  googleClientId: '874621893412-gsi1eventora99authdemoapp.apps.googleusercontent.com',

  init() {
    this.ensureAuthModal();
    this.ensureGoogleModal();
    this.initGoogleAuthApi();
    this.updateNavbarAuth();
    this.bindGlobalEvents();

    // Listen for cross-page auth changes
    window.addEventListener('eventora:authChange', () => {
      this.updateNavbarAuth();
    });
  },

  /**
   * Initialize Google Identity Services (GSI) Client API
   */
  initGoogleAuthApi() {
    const attemptInit = () => {
      if (typeof window.google !== 'undefined' && window.google.accounts && window.google.accounts.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: this.googleClientId,
            callback: this.handleGoogleCredentialResponse.bind(this),
            auto_select: false,
            cancel_on_tap_outside: true
          });

          this.renderGoogleButton();

          window.addEventListener('eventora:themeChange', () => {
            this.renderGoogleButton();
          });
        } catch (err) {
          console.warn('[Google Auth API] Client initialization notice:', err);
        }
      } else {
        setTimeout(attemptInit, 350);
      }
    };

    attemptInit();
  },

  /**
   * Render official Google Sign-In button into modal slot
   */
  renderGoogleButton() {
    const slot = document.getElementById('g_id_signin_slot');
    if (!slot || typeof window.google === 'undefined' || !window.google.accounts?.id) return;

    try {
      slot.innerHTML = '';
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const parentWidth = slot.parentElement?.offsetWidth;
      const viewportMax = Math.max(220, (window.innerWidth || 360) - 64);
      const targetWidth = parentWidth && parentWidth > 50 ? Math.min(parentWidth, 340) : Math.min(viewportMax, 300);
      const containerWidth = Math.max(220, Math.min(targetWidth, 340));

      window.google.accounts.id.renderButton(slot, {
        theme: isDark ? 'filled_black' : 'outline',
        size: 'large',
        type: 'standard',
        shape: 'rectangular',
        text: 'continue_with',
        logo_alignment: 'left',
        width: containerWidth
      });
    } catch (e) {
      console.warn('Google GSI renderButton:', e);
    }
  },

  /**
   * Process credential response from Google Identity Services API (JWT token)
   */
  handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) {
      if (typeof showToast === 'function') {
        showToast('Google Sign-In failed or was cancelled.', 'error');
      }
      return;
    }

    const payload = this.parseJwt(response.credential);
    if (!payload || !payload.email) {
      if (typeof showToast === 'function') {
        showToast('Unable to parse Google authentication token.', 'error');
      }
      return;
    }

    const fullName = payload.name || payload.given_name || payload.email.split('@')[0];
    const email = payload.email;
    const avatar = payload.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=F97316&color=000`;

    this.completeGoogleLogin(fullName, email, avatar);
    this.closeModal();
  },

  /**
   * Decode standard JWT payload from Google Identity Services
   */
  parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  },

  /**
   * Inject Auth Modal into DOM if not present
   */
  ensureAuthModal() {
    if (document.getElementById('authModal')) return;

    const modalHTML = `
      <div class="modal-overlay" id="authModal" role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
        <div class="modal-box" style="max-width: 480px;">
          <div class="modal-header">
            <h3 class="modal-title" id="authModalTitle">
              <i class="fa-solid fa-shield-halved" style="color: var(--primary); margin-right: 0.4rem;"></i>
              <span id="authHeaderLabel">Welcome to Eventora</span>
            </h3>
            <button class="modal-close-btn" id="authModalCloseBtn" aria-label="Close modal">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="modal-body" style="padding: 1.5rem 1.75rem;">
            <!-- Official Google Identity Services API Container -->
            <div class="google-auth-api-wrapper" style="margin-bottom: 1.25rem;">
              <div id="g_id_signin_slot" class="g-id-signin-btn-slot" style="display: flex; justify-content: center; width: 100%; min-height: 44px; margin-bottom: 0.5rem;"></div>

              <!-- Fallback Direct Google Account Sign-In Button -->
              <button type="button" class="btn btn-secondary btn-block google-signin-btn" id="googleAuthTriggerBtn">
                <svg width="20" height="20" viewBox="0 0 48 48" style="flex-shrink: 0;">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span style="font-weight: 700; color: var(--text-main);">One-Click Google Sign-In</span>
              </button>
            </div>

            <!-- Divider -->
            <div class="auth-divider">
              <span>OR WITH EMAIL</span>
            </div>

            <!-- Tab Switcher (Log In vs Sign Up) -->
            <div class="auth-tabs-nav" role="tablist">
              <button class="auth-tab-btn active" id="authTabLogin" role="tab" aria-selected="true">
                Log In
              </button>
              <button class="auth-tab-btn" id="authTabSignup" role="tab" aria-selected="false">
                Create Account
              </button>
            </div>

            <!-- =========================
                 1. LOGIN FORM
                 ========================= -->
            <form id="authLoginForm" novalidate>
              <div class="form-group">
                <label for="loginEmail" class="form-label">Email Address <span class="required-star">*</span></label>
                <div class="form-control-wrapper">
                  <i class="fa-regular fa-envelope form-control-icon"></i>
                  <input type="email" id="loginEmail" class="form-control" placeholder="name@example.com" required autocomplete="email">
                </div>
                <div class="form-error-msg" id="loginEmailError"></div>
              </div>

              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
                  <label for="loginPassword" class="form-label" style="margin-bottom: 0;">Password <span class="required-star">*</span></label>
                  <a href="#" class="auth-forgot-link" id="authForgotBtn">Forgot?</a>
                </div>
                <div class="form-control-wrapper">
                  <i class="fa-solid fa-lock form-control-icon"></i>
                  <input type="password" id="loginPassword" class="form-control" placeholder="Enter your password" required autocomplete="current-password">
                  <button type="button" class="auth-pw-toggle" data-target="loginPassword" aria-label="Toggle password visibility">
                    <i class="fa-regular fa-eye"></i>
                  </button>
                </div>
                <div class="form-error-msg" id="loginPasswordError"></div>
              </div>

              <!-- Quick Demo Account Fill Button -->
              <div style="background: var(--bg-surface-subtle); border: 1px dashed var(--border-strong); border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-wand-magic-sparkles"></i> Need a test account?</span>
                <button type="button" class="btn btn-ghost btn-sm" id="fillDemoAccountBtn" style="font-size: 0.75rem; padding: 0.2rem 0.5rem; color: var(--primary); font-weight: 700;">
                  Fill Demo User
                </button>
              </div>

              <button type="submit" class="btn btn-primary btn-block btn-lg" id="loginSubmitBtn">
                <i class="fa-solid fa-arrow-right-to-bracket"></i> Log In to Eventora
              </button>

              <div style="text-align: center; margin-top: 1.25rem; font-size: 0.875rem; color: var(--text-muted);">
                Don't have an account? <a href="#" id="switchToSignupLink" style="color: var(--primary); font-weight: 700;">Sign up now</a>
              </div>
            </form>

            <!-- =========================
                 2. SIGN UP FORM
                 ========================= -->
            <form id="authSignupForm" style="display: none;" novalidate>
              <div class="form-group">
                <label for="signupFullName" class="form-label">Full Name <span class="required-star">*</span></label>
                <div class="form-control-wrapper">
                  <i class="fa-regular fa-user form-control-icon"></i>
                  <input type="text" id="signupFullName" class="form-control" placeholder="e.g. Aditi Roy" required autocomplete="name">
                </div>
                <div class="form-error-msg" id="signupFullNameError"></div>
              </div>

              <div class="form-group">
                <label for="signupEmail" class="form-label">Email Address <span class="required-star">*</span></label>
                <div class="form-control-wrapper">
                  <i class="fa-regular fa-envelope form-control-icon"></i>
                  <input type="email" id="signupEmail" class="form-control" placeholder="e.g. aditi.roy@gmail.com" required autocomplete="email">
                </div>
                <div class="form-error-msg" id="signupEmailError"></div>
              </div>

              <div class="form-group">
                <label for="signupPhone" class="form-label">Mobile Number <span class="required-star">*</span></label>
                <div class="form-control-wrapper">
                  <i class="fa-solid fa-phone form-control-icon"></i>
                  <input type="tel" id="signupPhone" class="form-control" placeholder="e.g. 9876543210" required autocomplete="tel">
                </div>
                <div class="form-error-msg" id="signupPhoneError"></div>
              </div>

              <div class="form-group">
                <label for="signupPassword" class="form-label">Create Password <span class="required-star">*</span></label>
                <div class="form-control-wrapper">
                  <i class="fa-solid fa-lock form-control-icon"></i>
                  <input type="password" id="signupPassword" class="form-control" placeholder="Minimum 6 characters" required autocomplete="new-password">
                  <button type="button" class="auth-pw-toggle" data-target="signupPassword" aria-label="Toggle password visibility">
                    <i class="fa-regular fa-eye"></i>
                  </button>
                </div>
                <div class="form-error-msg" id="signupPasswordError"></div>
              </div>

              <div class="form-group">
                <label for="signupConfirmPassword" class="form-label">Confirm Password <span class="required-star">*</span></label>
                <div class="form-control-wrapper">
                  <i class="fa-solid fa-lock form-control-icon"></i>
                  <input type="password" id="signupConfirmPassword" class="form-control" placeholder="Re-enter password" required autocomplete="new-password">
                  <button type="button" class="auth-pw-toggle" data-target="signupConfirmPassword" aria-label="Toggle password visibility">
                    <i class="fa-regular fa-eye"></i>
                  </button>
                </div>
                <div class="form-error-msg" id="signupConfirmPasswordError"></div>
              </div>

              <div class="form-group" style="margin-bottom: 1.5rem;">
                <label class="form-checkbox-label">
                  <input type="checkbox" id="signupTermsAgree" class="form-checkbox" required>
                  <span>I agree to the Eventora <a href="#" style="color: var(--primary);">Terms of Service</a> &amp; <a href="#" style="color: var(--primary);">Privacy Policy</a>. <span class="required-star">*</span></span>
                </label>
                <div class="form-error-msg" id="signupTermsAgreeError"></div>
              </div>

              <button type="submit" class="btn btn-primary btn-block btn-lg" id="signupSubmitBtn">
                <i class="fa-solid fa-user-plus"></i> Create Free Account
              </button>

              <div style="text-align: center; margin-top: 1.25rem; font-size: 0.875rem; color: var(--text-muted);">
                Already have an account? <a href="#" id="switchToLoginLink" style="color: var(--primary); font-weight: 700;">Log in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  },

  /**
   * Google Account Chooser Modal Simulation
   */
  ensureGoogleModal() {
    if (document.getElementById('googleChooserModal')) return;

    const googleHTML = `
      <div class="modal-overlay" id="googleChooserModal" role="dialog" aria-modal="true" aria-labelledby="googleChooserTitle">
        <div class="modal-box" style="max-width: 440px; border-radius: var(--radius-lg);">
          <div style="padding: 1.75rem 2rem 1.25rem 2rem; text-align: center; border-bottom: 1px solid var(--border-subtle);">
            <svg width="36" height="36" viewBox="0 0 48 48" style="margin: 0 auto 0.75rem auto;">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <h3 id="googleChooserTitle" style="font-size: 1.25rem; font-weight: 700; color: var(--text-main);">Choose a Google Account</h3>
            <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.25rem;">to continue to <strong>Eventora</strong></p>
          </div>

          <div style="padding: 1.25rem 1.5rem;" id="googleAccountsList">
            <!-- Mock Google Accounts -->
            <button class="google-acc-item" data-email="aarav.sharma@gmail.com" data-name="Aarav Sharma" data-avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="Aarav Sharma" class="google-acc-avatar">
              <div class="google-acc-info">
                <div class="google-acc-name">Aarav Sharma</div>
                <div class="google-acc-email">aarav.sharma@gmail.com</div>
              </div>
            </button>

            <button class="google-acc-item" data-email="vikram.rao@gmail.com" data-name="Vikramaditya Rao" data-avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Vikramaditya Rao" class="google-acc-avatar">
              <div class="google-acc-info">
                <div class="google-acc-name">Vikramaditya Rao</div>
                <div class="google-acc-email">vikram.rao@gmail.com</div>
              </div>
            </button>

            <!-- Custom Account Input Trigger -->
            <button class="google-acc-item" id="googleCustomAccountBtn">
              <div class="google-acc-avatar" style="background: var(--bg-surface-subtle); display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 1.1rem;">
                <i class="fa-solid fa-user-plus"></i>
              </div>
              <div class="google-acc-info">
                <div class="google-acc-name">Use another Google account</div>
                <div class="google-acc-email">Enter custom @gmail.com</div>
              </div>
            </button>

            <!-- Custom Input Form (Hidden initially) -->
            <div id="googleCustomInputArea" style="display: none; padding: 1rem; background: var(--bg-surface-subtle); border-radius: var(--radius-sm); margin-top: 0.75rem;">
              <input type="text" id="customGoogleName" class="form-control no-icon" placeholder="Your Full Name (e.g. Priya Patel)" style="margin-bottom: 0.5rem; font-size: 0.875rem;">
              <input type="email" id="customGoogleEmail" class="form-control no-icon" placeholder="name@gmail.com" style="margin-bottom: 0.75rem; font-size: 0.875rem;">
              <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                <button type="button" class="btn btn-ghost btn-sm" id="cancelCustomGoogleBtn">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="submitCustomGoogleBtn">Continue with Google</button>
              </div>
            </div>
          </div>

          <div style="padding: 1rem 1.5rem; background: var(--bg-surface-subtle); border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary btn-sm" id="googleChooserCloseBtn">Cancel</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', googleHTML);
  },

  /**
   * Bind DOM event listeners
   */
  bindGlobalEvents() {
    // Open Modal Triggers (any element with .auth-open-trigger)
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.auth-open-trigger');
      if (openBtn) {
        e.preventDefault();
        const tab = openBtn.getAttribute('data-tab') || 'login';
        this.openModal(tab);
      }
    });

    // Close Modal Button
    const closeBtn = document.getElementById('authModalCloseBtn');
    const authOverlay = document.getElementById('authModal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    if (authOverlay) {
      authOverlay.addEventListener('click', (e) => {
        if (e.target === authOverlay) this.closeModal();
      });
    }

    // Google Chooser Close
    const gCloseBtn = document.getElementById('googleChooserCloseBtn');
    const gOverlay = document.getElementById('googleChooserModal');
    if (gCloseBtn) gCloseBtn.addEventListener('click', () => this.closeGoogleModal());
    if (gOverlay) {
      gOverlay.addEventListener('click', (e) => {
        if (e.target === gOverlay) this.closeGoogleModal();
      });
    }

    // Tab Switchers
    const tabLogin = document.getElementById('authTabLogin');
    const tabSignup = document.getElementById('authTabSignup');
    const linkToSignup = document.getElementById('switchToSignupLink');
    const linkToLogin = document.getElementById('switchToLoginLink');

    if (tabLogin) tabLogin.addEventListener('click', () => this.switchTab('login'));
    if (tabSignup) tabSignup.addEventListener('click', () => this.switchTab('signup'));
    if (linkToSignup) linkToSignup.addEventListener('click', (e) => { e.preventDefault(); this.switchTab('signup'); });
    if (linkToLogin) linkToLogin.addEventListener('click', (e) => { e.preventDefault(); this.switchTab('login'); });

    // Password Visibility Toggles
    document.querySelectorAll('.auth-pw-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = btn.querySelector('i');
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fa-regular fa-eye-slash';
          } else {
            input.type = 'password';
            icon.className = 'fa-regular fa-eye';
          }
        }
      });
    });

    // Demo Account Filler
    const demoBtn = document.getElementById('fillDemoAccountBtn');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        const emailEl = document.getElementById('loginEmail');
        const pwEl = document.getElementById('loginPassword');
        if (emailEl) emailEl.value = 'vikram.rao@example.com';
        if (pwEl) pwEl.value = 'Password123!';
        if (typeof showToast === 'function') {
          showToast('Demo credentials filled: vikram.rao@example.com', 'info');
        }
      });
    }

    // Forgot Password Trigger
    const forgotBtn = document.getElementById('authForgotBtn');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof showToast === 'function') {
          showToast('Password reset link simulated. Check your email inbox.', 'info');
        }
      });
    }

    // Form Submissions
    const loginForm = document.getElementById('authLoginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    const signupForm = document.getElementById('authSignupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => this.handleSignup(e));
    }

    // Google Sign-In Trigger
    const googleTrigger = document.getElementById('googleAuthTriggerBtn');
    if (googleTrigger) {
      googleTrigger.addEventListener('click', () => {
        this.closeModal();
        this.openGoogleModal();
      });
    }

    // Google Account Picker Selection
    document.querySelectorAll('#googleAccountsList .google-acc-item[data-email]').forEach(item => {
      item.addEventListener('click', () => {
        const email = item.getAttribute('data-email');
        const name = item.getAttribute('data-name');
        const avatar = item.getAttribute('data-avatar');
        this.completeGoogleLogin(name, email, avatar);
      });
    });

    // Custom Google Account Input Toggle
    const customGBtn = document.getElementById('googleCustomAccountBtn');
    const customGArea = document.getElementById('googleCustomInputArea');
    const cancelCustomBtn = document.getElementById('cancelCustomGoogleBtn');
    const submitCustomBtn = document.getElementById('submitCustomGoogleBtn');

    if (customGBtn && customGArea) {
      customGBtn.addEventListener('click', () => {
        customGArea.style.display = customGArea.style.display === 'none' ? 'block' : 'none';
      });
    }
    if (cancelCustomBtn && customGArea) {
      cancelCustomBtn.addEventListener('click', () => {
        customGArea.style.display = 'none';
      });
    }
    if (submitCustomBtn) {
      submitCustomBtn.addEventListener('click', () => {
        const name = (document.getElementById('customGoogleName')?.value || '').trim();
        const email = (document.getElementById('customGoogleEmail')?.value || '').trim();

        if (!name || name.length < 2) {
          if (typeof showToast === 'function') showToast('Please enter your full name.', 'error');
          return;
        }
        if (!email || !email.includes('@')) {
          if (typeof showToast === 'function') showToast('Please enter a valid Gmail address.', 'error');
          return;
        }
        this.completeGoogleLogin(name, email);
      });
    }

    // Global document listener for profile dropdown close when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-profile-menu')) {
        document.querySelectorAll('.user-dropdown-menu').forEach(menu => {
          menu.classList.remove('open');
        });
      }
    });
  },

  /**
   * Modal Open / Close / Tab switching
   */
  openModal(tab = 'login') {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    this.switchTab(tab);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Refresh Google GSI button for active theme/width
    this.renderGoogleButton();
  },

  closeModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      this.clearErrors();
    }
  },

  openGoogleModal() {
    const modal = document.getElementById('googleChooserModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeGoogleModal() {
    const modal = document.getElementById('googleChooserModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  switchTab(tab) {
    this.activeTab = tab;
    const tabLogin = document.getElementById('authTabLogin');
    const tabSignup = document.getElementById('authTabSignup');
    const loginForm = document.getElementById('authLoginForm');
    const signupForm = document.getElementById('authSignupForm');
    const headerLabel = document.getElementById('authHeaderLabel');

    if (tab === 'login') {
      if (tabLogin) { tabLogin.classList.add('active'); tabLogin.setAttribute('aria-selected', 'true'); }
      if (tabSignup) { tabSignup.classList.remove('active'); tabSignup.setAttribute('aria-selected', 'false'); }
      if (loginForm) loginForm.style.display = 'block';
      if (signupForm) signupForm.style.display = 'none';
      if (headerLabel) headerLabel.textContent = 'Welcome Back to Eventora';
    } else {
      if (tabSignup) { tabSignup.classList.add('active'); tabSignup.setAttribute('aria-selected', 'true'); }
      if (tabLogin) { tabLogin.classList.remove('active'); tabLogin.setAttribute('aria-selected', 'false'); }
      if (signupForm) signupForm.style.display = 'block';
      if (loginForm) loginForm.style.display = 'none';
      if (headerLabel) headerLabel.textContent = 'Create Your Free Account';
    }
    this.clearErrors();
  },

  clearErrors() {
    document.querySelectorAll('.form-error-msg').forEach(msg => {
      msg.classList.remove('visible');
      msg.textContent = '';
    });
    document.querySelectorAll('.form-control').forEach(ctrl => {
      ctrl.classList.remove('is-invalid', 'is-valid');
    });
  },

  /**
   * Handle Email / Password Login
   */
  handleLogin(e) {
    e.preventDefault();
    const emailInput = document.getElementById('loginEmail');
    const pwInput = document.getElementById('loginPassword');
    const emailErr = document.getElementById('loginEmailError');
    const pwErr = document.getElementById('loginPasswordError');

    this.clearErrors();

    const email = (emailInput?.value || '').trim();
    const password = pwInput?.value || '';

    let hasError = false;

    if (!email) {
      this.showError(emailInput, emailErr, 'Email is required');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      this.showError(emailInput, emailErr, 'Enter a valid email address');
      hasError = true;
    }

    if (!password) {
      this.showError(pwInput, pwErr, 'Password is required');
      hasError = true;
    }

    if (hasError) return;

    // Check credentials against StorageService
    const user = StorageService.findUserByEmail(email);
    if (!user) {
      this.showError(emailInput, emailErr, 'No account found with this email. Please sign up.');
      if (typeof showToast === 'function') showToast('Account not found. Click "Create Account" to join.', 'error');
      return;
    }

    if (user.password && user.password !== password) {
      this.showError(pwInput, pwErr, 'Incorrect password. Try Password123! or click Forgot');
      if (typeof showToast === 'function') showToast('Invalid password for this account.', 'error');
      return;
    }

    // Login successful
    const submitBtn = document.getElementById('loginSubmitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
    }

    setTimeout(() => {
      StorageService.setCurrentUser(user);
      this.closeModal();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Log In to Eventora';
      }

      if (typeof showToast === 'function') {
        showToast(`Welcome back, ${user.fullName.split(' ')[0]}!`, 'success');
      }

      // Auto pre-populate on registrations page if open
      if (window.location.pathname.includes('registrations.html')) {
        const filterInput = document.getElementById('emailFilterInput');
        if (filterInput) {
          filterInput.value = user.email;
          if (typeof RegistrationsController !== 'undefined') {
            RegistrationsController.render();
          }
        }
      }
    }, 450);
  },

  /**
   * Handle Email / Password Sign Up
   */
  handleSignup(e) {
    e.preventDefault();
    const nameInput = document.getElementById('signupFullName');
    const emailInput = document.getElementById('signupEmail');
    const phoneInput = document.getElementById('signupPhone');
    const pwInput = document.getElementById('signupPassword');
    const confirmInput = document.getElementById('signupConfirmPassword');
    const termsCheck = document.getElementById('signupTermsAgree');

    const nameErr = document.getElementById('signupFullNameError');
    const emailErr = document.getElementById('signupEmailError');
    const phoneErr = document.getElementById('signupPhoneError');
    const pwErr = document.getElementById('signupPasswordError');
    const confirmErr = document.getElementById('signupConfirmPasswordError');
    const termsErr = document.getElementById('signupTermsAgreeError');

    this.clearErrors();

    const fullName = (nameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim().toLowerCase();
    const phone = (phoneInput?.value || '').trim();
    const password = pwInput?.value || '';
    const confirmPassword = confirmInput?.value || '';

    let hasError = false;

    if (!fullName || fullName.length < 3) {
      this.showError(nameInput, nameErr, 'Full name must be at least 3 characters');
      hasError = true;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      this.showError(emailInput, emailErr, 'Enter a valid email address');
      hasError = true;
    } else if (StorageService.findUserByEmail(email)) {
      this.showError(emailInput, emailErr, 'An account with this email already exists. Please log in.');
      hasError = true;
    }

    if (!phone) {
      this.showError(phoneInput, phoneErr, 'Mobile number is required');
      hasError = true;
    }

    if (!password || password.length < 6) {
      this.showError(pwInput, pwErr, 'Password must be at least 6 characters long');
      hasError = true;
    }

    if (password !== confirmPassword) {
      this.showError(confirmInput, confirmErr, 'Passwords do not match');
      hasError = true;
    }

    if (termsCheck && !termsCheck.checked) {
      this.showError(termsCheck, termsErr, 'You must agree to the Terms of Service to continue');
      hasError = true;
    }

    if (hasError) return;

    // Create user
    const submitBtn = document.getElementById('signupSubmitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
    }

    setTimeout(() => {
      const newUser = StorageService.createUser({
        fullName,
        email,
        phone,
        password,
        provider: 'email'
      });

      StorageService.setCurrentUser(newUser);
      this.closeModal();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Free Account';
      }

      if (typeof showToast === 'function') {
        showToast(`Welcome to Eventora, ${fullName.split(' ')[0]}! Account created.`, 'success', 5000);
      }
    }, 550);
  },

  /**
   * Complete Google Sign-In Simulation
   */
  completeGoogleLogin(fullName, email, avatar = null) {
    this.closeGoogleModal();

    let user = StorageService.findUserByEmail(email);
    if (!user) {
      // Auto-register new Google user
      user = StorageService.createUser({
        fullName,
        email,
        avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=4285F4&color=fff`,
        provider: 'google'
      });
    }

    StorageService.setCurrentUser(user);

    if (typeof showToast === 'function') {
      showToast(`Signed in with Google as ${fullName}!`, 'success', 4000);
    }
  },

  showError(inputEl, errorEl, message) {
    if (inputEl) inputEl.classList.add('is-invalid');
    if (errorEl) {
      errorEl.classList.add('visible');
      errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
    }
  },

  /**
   * Update Navbar & Mobile Drawer with logged-in user profile
   */
  updateNavbarAuth() {
    const currentUser = StorageService.getCurrentUser();

    // 1. Update Desktop Nav Action Area
    const authContainers = document.querySelectorAll('.nav-auth-slot');
    authContainers.forEach(container => {
      if (!currentUser) {
        container.innerHTML = `
          <button class="btn btn-secondary btn-sm auth-open-trigger" data-tab="login" aria-label="Sign In or Register">
            <i class="fa-regular fa-user"></i> <span>Sign In</span>
          </button>
        `;
      } else {
        const firstName = currentUser.fullName.split(' ')[0];
        const isGoogle = currentUser.provider === 'google';
        container.innerHTML = `
          <div class="user-profile-menu">
            <button class="user-profile-btn" aria-label="User Menu" aria-haspopup="true">
              <img src="${currentUser.avatar}" alt="${currentUser.fullName}" class="user-nav-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}&background=F97316&color=000'">
              <span class="user-nav-name">${firstName}</span>
              <i class="fa-solid fa-chevron-down user-nav-chevron"></i>
            </button>
            <div class="user-dropdown-menu">
              <div class="user-dropdown-header">
                <div class="user-dropdown-name">${currentUser.fullName}</div>
                <div class="user-dropdown-email">${currentUser.email}</div>
                <div class="user-provider-tag ${isGoogle ? 'google' : 'email'}">
                  ${isGoogle ? '<i class="fa-brands fa-google"></i> Verified Google' : '<i class="fa-solid fa-envelope"></i> Email Account'}
                </div>
              </div>
              <div class="user-dropdown-divider"></div>
              <a href="registrations.html" class="user-dropdown-item">
                <i class="fa-solid fa-ticket"></i> My Registrations
              </a>
              <a href="events.html" class="user-dropdown-item">
                <i class="fa-solid fa-compass"></i> Explore Events
              </a>
              <div class="user-dropdown-divider"></div>
              <button class="user-dropdown-item user-logout-btn" style="color: #EF4444; width: 100%; text-align: left; background: none; border: none; cursor: pointer;">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
              </button>
            </div>
          </div>
        `;

        // Bind dropdown toggle
        const profileBtn = container.querySelector('.user-profile-btn');
        const dropdown = container.querySelector('.user-dropdown-menu');
        const logoutBtn = container.querySelector('.user-logout-btn');

        if (profileBtn && dropdown) {
          profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
          });
        }

        if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
            StorageService.logoutUser();
            if (typeof showToast === 'function') {
              showToast('You have been signed out.', 'info');
            }
          });
        }
      }
    });

    // 2. Update Mobile Drawer
    const mobileAuthSlots = document.querySelectorAll('.mobile-auth-slot');
    mobileAuthSlots.forEach(slot => {
      if (!currentUser) {
        slot.innerHTML = `
          <button class="btn btn-primary btn-block auth-open-trigger" data-tab="login">
            <i class="fa-regular fa-user"></i> Sign In / Register
          </button>
        `;
      } else {
        slot.innerHTML = `
          <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.85rem;">
            <img src="${currentUser.avatar}" alt="${currentUser.fullName}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}&background=F97316&color=000'">
            <div style="min-width: 0; flex-grow: 1;">
              <div style="font-size: 0.9375rem; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${currentUser.fullName}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${currentUser.email}</div>
            </div>
          </div>
          <button class="btn btn-secondary btn-block mobile-logout-btn" style="color: #EF4444;">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
          </button>
        `;

        const mobileLogout = slot.querySelector('.mobile-logout-btn');
        if (mobileLogout) {
          mobileLogout.addEventListener('click', () => {
            StorageService.logoutUser();
            if (typeof showToast === 'function') {
              showToast('Signed out successfully.', 'info');
            }
          });
        }
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AuthManager.init();
});


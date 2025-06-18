<template>
  <div class="login-page" :class="{ 'dark-mode': isDarkMode }">
    <!-- Particles Background -->
    <div id="particles-js" class="particles"></div>

    <!-- Dark Mode Toggle -->
    <button class="dark-mode-toggle" @click="toggleDarkMode" aria-label="Toggle dark mode">
      <i>{{ isDarkMode ? '☀️' : '🌙' }}</i>
    </button>

    <div class="login-container">
      <!-- Logo Header -->
      <div class="logo-header">
        <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" stroke="var(--primary-color)" stroke-width="4"/>
          <path d="M20 10L30 30H10L20 10Z" fill="var(--primary-color)"/>
        </svg>
        <h1>EduShare</h1>
        <p class="tagline">Connecting donors with educational needs</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="floating-label">Email Address</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder=""
            required
            :class="{ 'input-error': errors.email }"
            @input="clearError('email')"
            aria-describedby="email-error"
          />
          <span class="error-message" id="email-error" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password" class="floating-label">Password</label>
          <div class="password-input">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              required
              :class="{ 'input-error': errors.password }"
              @input="clearError('password')"
              aria-describedby="password-error"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
              aria-label="Toggle password visibility"
            >
              <i class="fas" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
            </button>
          </div>
          <span class="error-message" id="password-error" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="role" class="floating-label">Role</label>
          <select
            v-model="form.role"
            id="role"
            required
            :class="{ 'input-error': errors.role }"
            @change="clearError('role')"
            aria-describedby="role-error"
          >
            <option value="" disabled></option>
            <option value="NGO">NGO</option>
            <option value="Recipient">Recipient</option>
            <option value="Donor">Donor</option>
            <option value="Admin">Admin</option>
          </select>
          <span class="error-message" id="role-error" v-if="errors.role">{{ errors.role }}</span>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="form.rememberMe" aria-label="Remember me" />
            <span>Remember me</span>
          </label>
          <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
        </div>

        <button
          type="submit"
          class="login-button"
          :disabled="loading"
          aria-label="Log in to EduShare"
        >
          <span v-if="!loading">Log In</span>
          <span v-else class="loading-spinner"></span>
        </button>

        <div class="social-login">
          <p class="divider">or continue with</p>
          <div class="social-buttons">
            <button
              type="button"
              class="social-button google"
              @click="loginWithGoogle"
              aria-label="Log in with Google"
            >
              <img
                src="https://th.bing.com/th/id/OIP.Din44az7iZZDfbsrD1kfGQHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
                alt="Google logo"
              />
            </button>
            <button
              type="button"
              class="social-button facebook"
              @click="loginWithFacebook"
              aria-label="Log in with Facebook"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook logo"
              />
            </button>
          </div>
        </div>

        <p class="signup-link">
          Don't have an account? <router-link to="/signup">Sign up</router-link>
        </p>

        <p class="error-message form-error" v-if="errors.form">{{ errors.form }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
        role: '',
        rememberMe: false,
      },
      errors: {
        email: '',
        password: '',
        role: '',
        form: '',
      },
      showPassword: false,
      loading: false,
      isDarkMode: false,
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    clearError(field) {
      this.errors[field] = ''
      this.errors.form = ''
    },
    validateForm() {
      let isValid = true
      this.errors = { email: '', password: '', role: '', form: '' }

      // Email validation
      if (!this.form.email) {
        this.errors.email = 'Email is required'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
        isValid = false
      }

      // Password validation
      if (!this.form.password) {
        this.errors.password = 'Password is required'
        isValid = false
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
        isValid = false
      }

      // Role validation
      if (!this.form.role) {
        this.errors.role = 'Please select a role'
        isValid = false
      }

      return isValid
    },
    async handleLogin() {
      if (!this.validateForm()) return

      this.loading = true
      this.errors.form = ''

      try {
        const response = await fetch('http://localhost:5038/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.form.email,
            password: this.form.password,
            role: this.form.role, // Include role in the request
          }),
          credentials: 'include',
        })

        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text()
          throw new Error(text || 'Invalid server response')
        }

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Login failed')
        }

        // Store user data
        localStorage.setItem('userId', data.user.userId)
        localStorage.setItem('userEmail', data.user.email)
        localStorage.setItem('userRole', this.form.role) // Store selected role

        // Update global user state if available
        if (this.$currentUser) {
          this.$currentUser.id = data.user.userId
          this.$currentUser.email = data.user.email
          this.$currentUser.role = this.form.role
        }

        console.log('Logged in user:', { id: data.user.userId, role: this.form.role })

        // Role-based redirection
        const redirectPath = this.$route.query.redirect || this.getRedirectPath(this.form.role)
        this.$router.push(redirectPath)
      } catch (error) {
        console.error('Login error:', error)
        this.errors.form = error.message || 'Login failed. Please try again.'

        // Clear partial authentication
        localStorage.removeItem('userId')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userRole')
        if (this.$currentUser) {
          this.$currentUser.id = null
          this.$currentUser.email = null
          this.$currentUser.role = null
        }
      } finally {
        this.loading = false
      }
    },
    getRedirectPath(role) {
      switch (role) {
        case 'NGO':
          return '/'
        case 'Recipient':
          return '/recipienthome'
        case 'Donor':
          return '/profile'
        case 'Admin':
          return '/AdminDashboard'
        default:
          return '/profile'
      }
    },
    loginWithGoogle() {
      if (!this.form.role) {
        this.errors.role = 'Please select a role before continuing'
        return
      }
      localStorage.setItem('tempRole', this.form.role) // Store role temporarily
      window.location.href = `http://localhost:5038/api/auth/google?role=${encodeURIComponent(this.form.role)}`
    },
    loginWithFacebook() {
      if (!this.form.role) {
        this.errors.role = 'Please select a role before continuing'
        return
      }
      localStorage.setItem('tempRole', this.form.role)
      window.location.href = `http://localhost:5038/api/auth/facebook?role=${encodeURIComponent(this.form.role)}`
    },
  },
  mounted() {
    // Initialize particles.js
    if (window.particlesJS) {
      particlesJS('particles-js', {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: ['#3b82f6', '#10b981'] },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: false },
          move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' },
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
          modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } },
        },
        retina_detect: true,
      })
    }
  },
}
</script>

<style scoped>
/* CSS Variables */
.login-page {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;

  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f0fa 0%, var(--bg-color) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

/* Dark Mode */
.login-page.dark-mode {
  --primary-color: #60a5fa;
  --secondary-color: #34d399;
  --text-color: #e5e7eb;
  --bg-color: #1f2937;
  --card-bg: #374151;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #2d3748 0%, var(--bg-color) 100%);
}

/* Particles Background */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Dark Mode Toggle */
.dark-mode-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--card-bg);
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: var(--shadow);
  font-size: 16px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.dark-mode-toggle:hover {
  background: var(--primary-color);
  color: #fff;
}

/* Login Container */
.login-container {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  z-index: 1;
  animation: fadeIn 1s ease-in;
}

/* Logo Header */
.logo-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  animation: bounce 0.5s ease;
}

.logo-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
}

.tagline {
  font-size: 16px;
  color: #6b7280;
  margin-top: 8px;
}

/* Login Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.floating-label {
  position: absolute;
  top: 12px;
  left: 16px;
  font-size: 14px;
  color: #6b7280;
  pointer-events: none;
  transition: all 0.2s ease;
}

input:focus + .floating-label,
input:not(:placeholder-shown) + .floating-label,
select:focus + .floating-label,
select:not([value=""]) + .floating-label {
  top: -8px;
  left: 12px;
  font-size: 12px;
  color: var(--primary-color);
  background: var(--card-bg);
  padding: 0 4px;
}

input,
select {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 14px;
  background: var(--card-bg);
  color: var(--text-color);
  transition: all 0.2s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: #dc3545;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

select {
  appearance: none;
  background: var(--card-bg) url("data:image/svg+xml;utf8,<svg fill='%236b7280' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") no-repeat right 12px center;
  padding-right: 40px;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

.form-error {
  text-align: center;
  margin-top: 16px;
}

/* Password Input */
.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  color: #6b7280;
  transition: color 0.2s ease;
}

.toggle-password:hover {
  color: var(--primary-color);
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  cursor: pointer;
}

.remember-me input {
  margin: 0;
  accent-color: var(--primary-color);
}

.forgot-password {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* Login Button */
.login-button {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
}

.login-button:hover {
  background: #2563eb;
}

.login-button:disabled {
  background: #6b7280;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Social Login */
.social-login {
  margin-top: 24px;
}

.divider {
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 14px;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #d1d5db;
}

.divider::before {
  margin-right: 16px;
}

.divider::after {
  margin-left: 16px;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #d1d5db;
  background: var(--card-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.social-button img {
  width: 20px;
  height: 20px;
}

.google:hover {
  background: #f8f9fa;
}

.facebook {
  background: #1877f2;
  border-color: #1877f2;
}

.facebook img {
  filter: brightness(0) invert(1);
}

.facebook:hover {
  background: #166fe5;
}

/* Sign Up Link */
.signup-link {
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin-top: 24px;
}

.signup-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.signup-link a:hover {
  text-decoration: underline;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-container {
    padding: 24px 16px;
    max-width: 100%;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }

  .logo-header h1 {
    font-size: 28px;
  }

  .tagline {
    font-size: 14px;
  }

  .login-form {
    gap: 20px;
  }

  .form-group {
    gap: 6px;
  }

  input,
  select {
    padding: 10px 14px;
    font-size: 13px;
  }

  .floating-label {
    font-size: 13px;
  }

  input:focus + .floating-label,
  input:not(:placeholder-shown) + .floating-label,
  select:focus + .floating-label,
  select:not([value=""]) + .floating-label {
    top: -7px;
    font-size: 11px;
  }

  .login-button {
    padding: 12px;
    font-size: 15px;
  }

  .social-button {
    width: 40px;
    height: 40px;
  }

  .social-button img {
    width: 18px;
    height: 18px;
  }

  .particles {
    display: none;
  }

  .dark-mode-toggle {
    top: 16px;
    right: 16px;
    padding: 8px;
  }
}
</style>
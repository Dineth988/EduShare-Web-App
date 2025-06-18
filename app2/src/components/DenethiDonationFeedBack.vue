<template>
  <div class="donation-feedback-page" :class="{ 'dark-mode': isDarkMode }">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="container navbar-container">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/">
            <svg
              class="logo-icon"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="18" stroke="var(--primary-color)" stroke-width="4" />
              <path d="M20 10L30 30H10L20 10Z" fill="var(--primary-color)" />
            </svg>
            <span>EduShare</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="nav-links" :class="{ active: isMenuOpen }">
          <router-link to="/recipienthome" class="nav-link" @click="closeMenus">Home</router-link>
          <router-link to="/matching-donations" class="nav-link" @click="closeMenus"
            >Donations</router-link
          >
          <router-link to="/support-feedback" class="nav-link" @click="closeMenus"
            >Contact</router-link
          >
        </div>

        <!-- User Profile -->
        <div class="user-profile">
          <button class="profile-button" @click="toggleProfileMenu">
            <img src="https://via.placeholder.com/40" alt="Profile Picture" class="profile-img" />
            <span class="profile-name">John Doe</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="profile-menu" v-if="isProfileMenuOpen">
            <router-link to="/profile" class="profile-menu-item" @click="closeMenus"
              >Profile</router-link
            >
            <router-link to="/settings" class="profile-menu-item" @click="closeMenus"
              >Settings</router-link
            >
            <button class="profile-menu-item" @click="logout">Logout</button>
          </div>
        </div>

        <!-- Hamburger Menu -->
        <button class="hamburger" @click="toggleMenu">
          <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </nav>

    <!-- Dark Mode Toggle -->
    <button class="dark-mode-toggle" @click="toggleDarkMode">
      <i>{{ isDarkMode ? '☀️' : '🌙' }}</i>
    </button>

    <!-- Main Content -->
    <section class="container main-section">
      <h1 class="page-title">Donation Feedback</h1>
      <p v-if="donationId" class="page-subtitle">
        Providing feedback for donation #{{ donationId }}
      </p>
      <p class="page-subtitle">Your feedback helps us improve our donation process and impact</p>

      <div class="feedback-card">
        <!-- Error Message -->
        <div v-if="errorMessage" class="error-message">
          <strong>Error:</strong> {{ errorMessage }}
        </div>

        <!-- Rate Experience -->
        <div class="form-group">
          <h2 class="form-label">Rate your donation experience</h2>
          <div class="star-rating">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ active: star <= rating }"
              @click="rating = star"
              >★</span
            >
          </div>
        </div>

        <!-- Feedback Input -->
        <div class="form-group">
          <h2 class="form-label">Share your feedback</h2>
          <textarea
            v-model="feedbackText"
            rows="5"
            placeholder="Tell us about your experience with the donation..."
            class="form-input form-textarea"
            :class="{ error: errorFields.includes('feedbackText') }"
          ></textarea>
        </div>

        <!-- Reference Number -->
        <div class="form-group">
          <h2 class="form-label">Donation Reference Number</h2>
          <input
            v-model="referenceNumber"
            type="text"
            placeholder="Enter your donation reference number"
            class="form-input"
            :class="{ error: errorFields.includes('referenceNumber') }"
          />
        </div>

        <!-- Submit Button -->
        <div class="form-actions">
          <button
            @click="submitFeedback"
            class="btn btn-primary"
            :disabled="isSubmitting"
            :class="{ loading: isSubmitting }"
          >
            <span v-if="!isSubmitting">Submit Feedback</span>
            <span v-else><i class="fas fa-spinner fa-spin"></i> Submitting...</span>
          </button>
        </div>

        <p class="form-note">
          Your feedback will be kept confidential and used to improve our donation process
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Company</h3>
          <p class="footer-text">Empowering education through shared resources</p>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/privacy" class="footer-link">Privacy Policy</router-link></li>
            <li><router-link to="/terms" class="footer-link">Terms of Service</router-link></li>
            <li>
              <router-link to="/support-feedback" class="footer-link">Contact Support</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Contact</h3>
          <p class="footer-text">Need help? Reach out to our support team.</p>
        </div>
      </div>
      <p class="footer-copyright">© 2025 EduShare. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DonationFeedback',
  props: {
    donationId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      rating: 0,
      feedbackText: '',
      referenceNumber: this.donationId || '',
      isDarkMode: false,
      isMenuOpen: false,
      isProfileMenuOpen: false,
      errorMessage: '',
      errorFields: [],
      isSubmitting: false,
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      if (this.isMenuOpen) this.isProfileMenuOpen = false
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen
      if (this.isProfileMenuOpen) this.isMenuOpen = false
    },
    closeMenus() {
      this.isMenuOpen = false
      this.isProfileMenuOpen = false
    },
    logout() {
      console.log('Logging out...')
      this.closeMenus()
      this.$router.push({ name: 'Login' })
    },
    async submitFeedback() {
      this.errorMessage = ''
      this.errorFields = []

      // Basic validation
      if (this.rating === 0) {
        this.errorMessage = 'Please provide a rating.'
        return
      }
      if (!this.feedbackText.trim()) {
        this.errorMessage = 'Please provide feedback.'
        this.errorFields.push('feedbackText')
        return
      }
      if (!this.referenceNumber.trim()) {
        this.errorMessage = 'Please provide a donation reference number.'
        this.errorFields.push('referenceNumber')
        return
      }

      this.isSubmitting = true

      try {
        // Simulate backend call (replace with actual API)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log('Feedback submitted:', {
          donationId: this.donationId,
          rating: this.rating,
          feedback: this.feedbackText,
          reference: this.referenceNumber,
        })

        // Navigate to confirmation page
        this.$router.push({
          name: 'FeedbackSubmitted',
          query: { type: 'donation' },
        })
      } catch (err) {
        this.errorMessage = 'Failed to submit feedback. Please try again.'
        console.error('Submission error:', err)
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style scoped>
/* CSS Variables */
.donation-feedback-page {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;

  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  background-color: var(--bg-color);
  transition: background-color 0.3s ease;
}

/* Dark Mode */
.donation-feedback-page.dark-mode {
  --primary-color: #60a5fa;
  --secondary-color: #34d399;
  --text-color: #e5e7eb;
  --bg-color: #1f2937;
  --card-bg: #374151;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Navigation Bar */
.navbar {
  background: var(--card-bg);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
  font-size: 20px;
  font-weight: 600;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: var(--primary-color);
  color: #fff;
}

/* User Profile */
.user-profile {
  position: relative;
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.profile-button:hover {
  background: #f0f7ff;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.profile-name {
  display: none;
}

.profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--card-bg);
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  padding: 8px 0;
  min-width: 160px;
  z-index: 1000;
}

.profile-menu-item {
  display: block;
  padding: 8px 16px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}

.profile-menu-item:hover {
  background: var(--primary-color);
  color: #fff;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  background: transparent;
  border: none;
  font-size: 24px;
  color: var(--text-color);
  cursor: pointer;
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

/* Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Main Section */
.main-section {
  padding: 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
  animation: fadeIn 1s ease-in;
}

.page-subtitle {
  font-size: 18px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 16px;
  max-width: 600px;
}

/* Feedback Card */
.feedback-card {
  background: var(--card-bg);
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  padding: 32px;
  max-width: 700px;
  width: 100%;
  animation: fadeIn 1s ease-in;
}

/* Error Message */
.error-message {
  background: #fee2e2;
  color: #b91c1c;
  padding: 12px;
  border-radius: var(--border-radius);
  margin-bottom: 16px;
  font-size: 14px;
}

.error-message strong {
  font-weight: 600;
}

/* Form Group */
.form-group {
  margin-bottom: 24px;
}

.form-label {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

/* Star Rating */
.star-rating {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.star {
  font-size: 32px;
  color: #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
}

.star.active {
  color: #facc15;
  animation: bounce 0.3s ease;
}

.star:hover {
  transform: scale(1.2);
}

/* Form Inputs */
.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 16px;
  background: var(--card-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-input.error {
  border-color: #f87171;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
}

.btn-primary {
  background: var(--primary-color);
  color: #fff;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.btn-primary.loading {
  opacity: 0.8;
}

.btn-primary .fa-spinner {
  margin-right: 8px;
}

/* Form Note */
.form-note {
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin-top: 16px;
}

/* Footer */
.footer {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 48px 24px;
  color: #fff;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  max-width: 1280px;
  margin: 0 auto;
}

.footer-section {
  text-align: left;
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.footer-text {
  font-size: 14px;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  display: block;
  margin-bottom: 8px;
  transition: opacity 0.3s ease;
}

.footer-link:hover {
  opacity: 0.8;
}

.footer-copyright {
  text-align: center;
  font-size: 14px;
  margin-top: 32px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--card-bg);
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    box-shadow: var(--shadow);
  }

  .nav-links.active {
    display: flex;
  }

  .nav-link {
    padding: 12px;
    text-align: center;
  }

  .hamburger {
    display: block;
  }

  .user-profile {
    display: none;
  }

  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .feedback-card {
    padding: 24px;
  }

  .form-label {
    font-size: 16px;
  }

  .star {
    font-size: 28px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .feedback-card {
    padding: 16px;
  }

  .form-input,
  .form-textarea {
    font-size: 14px;
    padding: 10px;
  }

  .star {
    font-size: 24px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-section {
    text-align: center;
  }
}

@media (min-width: 1024px) {
  .profile-name {
    display: inline;
  }
}
</style>

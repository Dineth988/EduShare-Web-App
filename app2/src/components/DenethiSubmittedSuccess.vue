<template>
  <div class="submitted-page" :class="{ 'dark-mode': isDarkMode }">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="container navbar-container">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/">
            <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="var(--primary-color)" stroke-width="4"/>
              <path d="M20 10L30 30H10L20 10Z" fill="var(--primary-color)"/>
            </svg>
            <span>EduShare</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="nav-links" :class="{ 'active': isMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
          <router-link to="/contact" class="nav-link" @click="closeMenu">Contact</router-link>
          <router-link to="/help" class="nav-link" @click="closeMenu">Help</router-link>
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
      <div class="success-card">
        <div class="checkmark">✔️</div>
        <h1 class="page-title">Request Submitted Successfully!</h1>
        <p class="page-subtitle">We have received your request and it’s being processed.</p>
        <p class="reference-code">Reference: WREF2023112</p>

        <!-- Timeline -->
        <div class="timeline">
          <div class="timeline-step">
            <div class="timeline-icon">
              <i class="fas fa-check"></i>
            </div>
            <span class="timeline-text">Submitted</span>
          </div>
          <div class="timeline-connector"></div>
          <div class="timeline-step">
            <div class="timeline-icon pending">
              <i class="fas fa-hourglass-half"></i>
            </div>
            <span class="timeline-text">Processing</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button @click="backToHome" class="btn btn-secondary">Back to Home</button>
          <button @click="trackRequest" class="btn btn-primary">Track Request</button>
        </div>
      </div>
    </section>

    <!-- Steps Section -->
    <section class="container steps-section">
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-envelope"></i></div>
          <h3 class="step-title">Email Confirmation</h3>
          <p class="step-text">You’ll receive a detailed confirmation email shortly.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-clock"></i></div>
          <h3 class="step-title">Processing Time</h3>
          <p class="step-text">Your request will be processed within 24–48 hours.</p>
        </div>
        <div class="step-card">
          <div class="step-icon"><i class="fas fa-arrow-right"></i></div>
          <h3 class="step-title">Next Steps</h3>
          <p class="step-text">We’ll notify you once your request has been processed.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Company</h3>
          <p class="footer-text">Making your requests simple and efficient</p>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/about" class="footer-link">About Us</router-link></li>
            <li><router-link to="/contact" class="footer-link">Contact</router-link></li>
            <li><router-link to="/faq" class="footer-link">FAQ</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Contact</h3>
          <p class="footer-text">Need help? Contact our support team.</p>
        </div>
      </div>
      <p class="footer-copyright">© 2025 EduShare. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'SubmittedSuccessfully',
  data() {
    return {
      isDarkMode: false,
      isMenuOpen: false,
    };
  },
  methods: {
    trackRequest() {
      this.$router
        .push({ name: 'RequestStatus' })
        .catch((err) => console.error('Navigation error:', err));
    },
    backToHome() {
      this.$router.push({ name: 'DenethiHome' });
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
/* CSS Variables */
.submitted-page {
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
.submitted-page.dark-mode {
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
  padding: 80px 0;
  text-align: center;
}

.success-card {
  background: var(--card-bg);
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  padding: 40px;
  max-width: 700px;
  margin: 0 auto;
  animation: fadeIn 1s ease-in;
}

.checkmark {
  font-size: 64px;
  color: var(--secondary-color);
  margin-bottom: 24px;
  animation: bounceIn 0.8s ease;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
}

.page-subtitle {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 24px;
}

.reference-code {
  background: #f0f7ff;
  color: var(--text-color);
  font-family: 'Courier New', monospace;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  display: inline-block;
  margin-bottom: 32px;
}

/* Timeline */
.timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}

.timeline-step {
  display: flex;
  align-items: center;
}

.timeline-icon {
  width: 32px;
  height: 32px;
  background: var(--secondary-color);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.timeline-icon.pending {
  background: #d1d5db;
  color: var(--text-color);
}

.timeline-text {
  margin-left: 8px;
  font-size: 16px;
  color: var(--text-color);
}

.timeline-connector {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--secondary-color), #d1d5db);
  margin: 0 16px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: var(--primary-color);
  color: #fff;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #e5e7eb;
  color: var(--text-color);
}

.btn-secondary:hover {
  background: #d1d5db;
}

/* Steps Section */
.steps-section {
  padding: 48px 0;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.step-card {
  background: var(--card-bg);
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  padding: 24px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.step-icon {
  font-size: 40px;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.step-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.step-text {
  font-size: 14px;
  color: #6b7280;
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
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceIn {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
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

  .main-section {
    padding: 48px 0;
  }

  .success-card {
    padding: 24px;
  }

  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .timeline-connector {
    width: 40px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .checkmark {
    font-size: 48px;
  }

  .page-title {
    font-size: 24px;
  }

  .step-card {
    padding: 16px;
  }

  .step-icon {
    font-size: 32px;
  }

  .step-title {
    font-size: 18px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-section {
    text-align: center;
  }
}
</style>
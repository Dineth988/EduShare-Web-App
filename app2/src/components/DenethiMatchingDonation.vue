<template>
  <div class="matching-donations-page" :class="{ 'dark-mode': isDarkMode }">
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
          <router-link to="/recipienthome" class="nav-link" @click="closeMenus">Home</router-link>
          <router-link to="/matching-donations" class="nav-link" @click="closeMenus">Projects</router-link>
          <router-link to="/reports" class="nav-link" @click="closeMenus">Reports</router-link>
          <router-link to="/settings" class="nav-link" @click="closeMenus">Settings</router-link>
        </div>

        <!-- Search Bar -->
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search donations..."
            class="search-input"
            v-model="searchQuery"
          />
          <i class="fas fa-search search-icon"></i>
        </div>

        <!-- User Profile -->
        <div class="user-profile">
          <button class="profile-button" @click="toggleProfileMenu">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile Picture"
              class="profile-img"
            />
            <span class="profile-name">John Doe</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="profile-menu" v-if="isProfileMenuOpen">
            <router-link to="/profile" class="profile-menu-item" @click="closeMenus">Profile</router-link>
            <router-link to="/settings" class="profile-menu-item" @click="closeMenus">Settings</router-link>
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
      <h1 class="page-title">Matching Donations</h1>
      <p class="page-subtitle">Track and manage your donation matches</p>
      <div class="donations-grid">
        <!-- Pending Donations -->
        <div class="pending-donations">
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Pending Donations</h2>
              <select class="filter-select" v-model="pendingFilter">
                <option value="">Filter</option>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            <div class="donations-list">
              <!-- Donation 1 -->
              <div class="donation-item">
                <p class="donation-id">DON-2025-001</p>
                <p class="donation-amount">$1,500</p>
                <p class="donation-recipient">Education Fund</p>
                <p class="donation-date">Feb 15, 2025</p>
                <span class="status-pending">Pending</span>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 75%"></div>
                </div>
                <p class="progress-text">75% matched</p>
              </div>
              <!-- Donation 2 -->
              <div class="donation-item">
                <p class="donation-id">DON-2025-002</p>
                <p class="donation-amount">$2,000</p>
                <p class="donation-recipient">Healthcare Initiative</p>
                <p class="donation-date">Feb 14, 2025</p>
                <span class="status-pending">Pending</span>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 45%"></div>
                </div>
                <p class="progress-text">45% matched</p>
              </div>
              <!-- Donation 3 -->
              <div class="donation-item">
                <p class="donation-id">DON-2025-003</p>
                <p class="donation-amount">$1,000</p>
                <p class="donation-recipient">Community Support</p>
                <p class="donation-date">Feb 13, 2025</p>
                <span class="status-pending">Pending</span>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 90%"></div>
                </div>
                <p class="progress-text">90% matched</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Completed Donations -->
        <div class="completed-donations">
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Completed Donations</h2>
              <select class="filter-select" v-model="completedFilter">
                <option value="">Filter</option>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            <div class="table-container">
              <table class="donations-table">
                <thead>
                  <tr>
                    <th>Donation ID</th>
                    <th>Amount</th>
                    <th>Recipient</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DON-2023-089</td>
                    <td>$1,200</td>
                    <td>Youth Development Project</td>
                    <td>Mar 10, 2025</td>
                    <td>
                      <button
                        @click="navigateToResourceUpdate('DON-2023-089')"
                        class="btn btn-primary"
                      >
                        Submit Update
                      </button>
                      <button
                        @click="navigateToDonationFeedback('DON-2023-089')"
                        class="btn btn-secondary"
                      >
                        Feedback
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>DON-2023-088</td>
                    <td>$3,000</td>
                    <td>Environmental Project</td>
                    <td>Apr 08, 2025</td>
                    <td>
                      <button
                        @click="navigateToResourceUpdate('DON-2023-088')"
                        class="btn btn-primary"
                      >
                        Submit Update
                      </button>
                      <button
                        @click="navigateToDonationFeedback('DON-2023-088')"
                        class="btn btn-secondary"
                      >
                        Feedback
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>DON-2023-087</td>
                    <td>$1,800</td>
                    <td>Local Food Bank</td>
                    <td>May 05, 2025</td>
                    <td>
                      <button
                        @click="navigateToResourceUpdate('DON-2023-087')"
                        class="btn btn-primary"
                      >
                        Submit Update
                      </button>
                      <button
                        @click="navigateToDonationFeedback('DON-2023-087')"
                        class="btn btn-secondary"
                      >
                        Feedback
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Company</h3>
          <p class="footer-text">Making your donations impactful and efficient</p>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/privacy" class="footer-link">Privacy Policy</router-link></li>
            <li><router-link to="/terms" class="footer-link">Terms of Service</router-link></li>
            <li><router-link to="/contact" class="footer-link">Contact Support</router-link></li>
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
  name: 'MatchingDonation',
  data() {
    return {
      isDarkMode: false,
      isMenuOpen: false,
      isProfileMenuOpen: false,
      searchQuery: '',
      pendingFilter: '',
      completedFilter: '',
    }
  },
  methods: {
    navigateToResourceUpdate(donationId) {
      this.$router
        .push({
          name: 'ResourceUpdate',
          query: { donationId },
        })
        .catch((err) => {
          console.error('Navigation error:', err)
        })
    },
    navigateToDonationFeedback(donationId) {
      this.$router
        .push({
          name: 'DonationFeedback',
          query: { donationId },
        })
        .catch((err) => {
          console.error('Navigation error:', err)
        })
    },
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
  },
}
</script>

<style scoped>
/* CSS Variables */
.matching-donations-page {
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
.matching-donations-page.dark-mode {
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

/* Search Bar */
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 200px;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 14px;
  background: var(--card-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #6b7280;
  font-size: 16px;
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
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
  animation: fadeIn 1s ease-in;
}

.page-subtitle {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 32px;
}

/* Donations Grid */
.donations-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
}

/* Card */
.card {
  background: var(--card-bg);
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  padding: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
}

.filter-select {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  background: var(--card-bg);
  color: var(--text-color);
  font-size: 14px;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* Pending Donations */
.pending-donations .donations-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.donation-item {
  animation: fadeIn 1s ease-in;
}

.donation-id {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.donation-amount,
.donation-recipient,
.donation-date {
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
}

.status-pending {
  display: inline-block;
  background: #fef3c7;
  color: #d97706;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
}

.progress-bar {
  width: 100%;
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
}

.progress-fill {
  background: var(--primary-color);
  height: 100%;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

/* Completed Donations */
.table-container {
  overflow-x: auto;
}

.donations-table {
  width: 100%;
  border-collapse: collapse;
}

.donations-table th,
.donations-table td {
  padding: 16px;
  font-size: 14px;
  color: var(--text-color);
}

.donations-table th {
  background: #f0f7ff;
  font-weight: 600;
  text-align: left;
}

.donations-table tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.3s ease;
}

.donations-table tr:hover {
  background: #f0f7ff;
}

.donations-table td {
  vertical-align: middle;
}

/* Buttons */
.btn {
  padding: 8px 16px;
  border-radius: var(--border-radius);
  font-size: 14px;
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

.btn-secondary {
  background: #e5e7eb;
  color: var(--text-color);
}

.btn-secondary:hover {
  background: #d1d5db;
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

/* Responsive Design */
@media (max-width: 1024px) {
  .donations-grid {
    grid-template-columns: 1fr;
  }

  .profile-name {
    display: inline;
  }
}

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

  .search-bar,
  .user-profile {
    display: none;
  }

  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .donations-table th,
  .donations-table td {
    padding: 12px;
    font-size: 13px;
  }

  .btn {
    padding: 6px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .card {
    padding: 16px;
  }

  .card-title {
    font-size: 18px;
  }

  .filter-select {
    padding: 6px;
    font-size: 13px;
  }

  .donation-id {
    font-size: 14px;
  }

  .donation-amount,
  .donation-recipient,
  .donation-date {
    font-size: 13px;
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
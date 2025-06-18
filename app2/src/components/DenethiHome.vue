<template>
  <div class="vertical-home-page" :class="{ 'dark-mode': isDarkMode }">
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
          <router-link to="/" class="nav-link" @click="closeMenus">Home</router-link>
          <router-link to="/matching-donations" class="nav-link" @click="closeMenus">Donations</router-link>
          <router-link to="/request-status" class="nav-link" @click="closeMenus">My Requests</router-link>
          <router-link to="/support-feedback" class="nav-link" @click="closeMenus">Support</router-link>
        </div>

        <!-- Search Bar -->
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search resources..."
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

    <!-- Vertical Sections -->
    <div class="vertical-sections">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container hero-content">
          <h1 class="hero-title">Request Educational Resources</h1>
          <p class="hero-subtitle">Access and request the learning materials you need to succeed</p>
          <router-link to="/submit-request" class="btn btn-primary">Get Started</router-link>
        </div>
      </section>

      <!-- Action Cards -->
      <section class="cards-section">
        <div class="container cards-container">
          <div class="card">
            <i class="fas fa-file-alt card-icon"></i>
            <h3 class="card-title">Request Assistance</h3>
            <p class="card-text">Submit requests for educational resources.</p>
            <button @click="submitRequest" class="btn btn-primary">Submit Request</button>
          </div>
          <div class="card">
            <i class="fas fa-tasks card-icon"></i>
            <h3 class="card-title">Track Status</h3>
            <p class="card-text">Check if your request is approved and when resources will arrive.</p>
            <button @click="viewStatus" class="btn btn-primary">View Status</button>
          </div>
          <div class="card">
            <i class="fas fa-comment-alt card-icon"></i>
            <h3 class="card-title">Feedback & Reviews</h3>
            <p class="card-text">Share how the donations helped your community.</p>
            <button @click="giveFeedback" class="btn btn-primary">Give Feedback</button>
          </div>
          <div class="card">
            <i class="fas fa-question-circle card-icon"></i>
            <h3 class="card-title">Support & Help</h3>
            <p class="card-text">Contact NGOs for further assistance.</p>
            <button @click="getSupport" class="btn btn-primary">Get Support</button>
          </div>
        </div>
      </section>

      <!-- Statistics -->
      <section class="stats-section">
        <div class="container stats-container">
          <div class="stat">
            <h2 class="stat-number" v-text="animatedStats.resources"></h2>
            <p class="stat-text">Resources Shared</p>
          </div>
          <div class="stat">
            <h2 class="stat-number" v-text="animatedStats.requests"></h2>
            <p class="stat-text">Active Requests</p>
          </div>
          <div class="stat">
            <h2 class="stat-number" v-text="animatedStats.communities"></h2>
            <p class="stat-text">Communities Supported</p>
          </div>
        </div>
      </section>

      <!-- Recent Activities -->
      <section class="activities-section">
        <div class="container activities-container">
          <h2 class="section-title">Recent Activities</h2>
          <div class="activity-list">
            <div v-for="activity in recentActivities" :key="activity._id" class="activity-item">
              <div class="activity-info">
                <i class="fas fa-book activity-icon"></i>
                <div class="activity-details">
                  <div class="activity-title">{{ activity.title }}</div>
                  <div class="activity-requester">
                    Requested by {{ activity.requester }} at {{ activity.institution }}
                  </div>
                  <div class="activity-feedback" v-if="activity.feedback !== 'No feedback yet'">
                    {{ activity.feedback }}
                  </div>
                </div>
              </div>
              <div class="activity-status-time">
                <div
                  :class="['status', `status-${activity.status.toLowerCase().replace(' ', '-')}`]"
                >
                  {{ activity.status }}
                </div>
                <div class="activity-time">{{ formatTime(activity.createdAt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer-section">
        <div class="container footer-content">
          <div class="footer-section">
            <h3 class="footer-title">EduShare</h3>
            <p class="footer-text">Empowering communities through educational resource sharing</p>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li><router-link to="/about" class="footer-link">About Us</router-link></li>
              <li><router-link to="/how-it-works" class="footer-link">How It Works</router-link></li>
              <li><router-link to="/partners" class="footer-link">Partners</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Support</h3>
            <ul class="footer-links">
              <li><router-link to="/support-feedback" class="footer-link">Contact Us</router-link></li>
              <li><router-link to="/faqs" class="footer-link">FAQs</router-link></li>
              <li><router-link to="/terms" class="footer-link">Terms of Service</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Contact</h3>
            <p class="footer-text"><i class="fas fa-envelope mr-2"></i> contact@edushare.org</p>
            <div class="social-icons">
              <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <p class="footer-copyright">© 2025 EduShare. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerticalHome',
  data() {
    return {
      isDarkMode: false,
      isMenuOpen: false,
      isProfileMenuOpen: false,
      searchQuery: '',
      animatedStats: {
        resources: 0,
        requests: 0,
        communities: 0,
      },
      recentActivities: [
        {
          _id: '1',
          title: 'Books',
          institution: 'Delhi Public School',
          requester: 'School Admin',
          status: 'Approved',
          feedback: 'No feedback yet',
          createdAt: new Date('2025-05-15'),
        },
        {
          _id: '2',
          title: 'Study Materials',
          institution: 'Community Center',
          requester: 'Center Coordinator',
          status: 'In Progress',
          feedback: 'No feedback yet',
          createdAt: new Date('2025-05-10'),
        },
        {
          _id: '3',
          title: 'Educational Supplies',
          institution: 'Rural School District',
          requester: 'District Manager',
          status: 'Delivered',
          feedback: 'Resources received and distributed to schools',
          createdAt: new Date('2025-05-01'),
        },
      ],
    }
  },
  mounted() {
    this.animateStats()
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
    formatTime(timestamp) {
      if (!timestamp) return 'Recently'
      const now = new Date()
      const activityDate = new Date(timestamp)
      const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60))
      if (diffInHours < 1) return 'Less than an hour ago'
      else if (diffInHours < 24) return `${diffInHours} hours ago`
      else {
        const diffInDays = Math.floor(diffInHours / 24)
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
      }
    },
    submitRequest() {
      this.$router.push({ name: 'SubmitRequest' }).catch((err) => console.error('Navigation error:', err))
    },
    viewStatus() {
      this.$router.push({ name: 'RequestStatus' }).catch((err) => console.error('Navigation error:', err))
    },
    giveFeedback() {
      this.$router.push({ name: 'SupportFeedback' }).catch((err) => console.error('Navigation error:', err))
    },
    getSupport() {
      this.$router.push({ name: 'SupportFeedback' }).catch((err) => console.error('Navigation error:', err))
    },
    animateStats() {
      const targets = {
        resources: 10000,
        requests: 5000,
        communities: 1000,
      }
      const duration = 2000
      const steps = 60
      const increment = {
        resources: targets.resources / steps,
        requests: targets.requests / steps,
        communities: targets.communities / steps,
      }
      let current = { resources: 0, requests: 0, communities: 0 }
      const interval = setInterval(() => {
        current.resources += increment.resources
        current.requests += increment.requests
        current.communities += increment.communities
        this.animatedStats = {
          resources: Math.min(Math.floor(current.resources), targets.resources).toLocaleString(),
          requests: Math.min(Math.floor(current.requests), targets.requests).toLocaleString(),
          communities: Math.min(Math.floor(current.communities), targets.communities).toLocaleString(),
        }
        if (current.resources >= targets.resources) clearInterval(interval)
      }, duration / steps)
    },
  },
}
</script>

<style scoped>
/* CSS Variables */
.vertical-home-page {
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
.vertical-home-page.dark-mode {
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

/* Vertical Sections */
.vertical-sections {
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(to bottom, #e6f0fa, var(--bg-color));
  padding: 100px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
  animation: fadeIn 1s ease-in;
}

.hero-subtitle {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 24px;
}

/* Cards Section */
.cards-section {
  padding: 64px 0;
  background: var(--bg-color);
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.card {
  background: var(--card-bg);
  padding: 24px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 1s ease-in;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 40px;
  color: var(--primary-color);
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.card:hover .card-icon {
  transform: scale(1.2);
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.card-text {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

/* Stats Section */
.stats-section {
  padding: 64px 0;
  background: var(--card-bg);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  text-align: center;
}

.stat {
  background: var(--bg-color);
  padding: 24px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  animation: fadeIn 1s ease-in;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.stat-text {
  font-size: 16px;
  color: #6b7280;
}

/* Activities Section */
.activities-section {
  padding: 64px 0;
  background: var(--bg-color);
}

.activities-container {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 32px;
  animation: fadeIn 1s ease-in;
}

.activity-list {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--shadow);
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: var(--border-radius);
  background: var(--bg-color);
  border-left: 4px solid var(--primary-color);
  transition: transform 0.3s ease;
  animation: fadeIn 1s ease-in;
}

.activity-item:hover {
  transform: translateX(5px);
}

.activity-info {
  display: flex;
  align-items: flex-start;
}

.activity-icon {
  font-size: 24px;
  color: var(--primary-color);
  margin-right: 16px;
}

.activity-details {
  flex: 1;
}

.activity-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.activity-requester {
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0;
}

.activity-feedback {
  font-size: 14px;
  color: #475569;
  font-style: italic;
  margin-top: 8px;
}

.activity-status-time {
  text-align: right;
}

.status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
}

.status-approved {
  background: #d1fae5;
  color: #059669;
}

.status-in-progress {
  background: #fed7aa;
  color: #ea580c;
}

.status-delivered {
  background: #dbeafe;
  color: #2563eb;
}

.status-rejected {
  background: #fee2e2;
  color: #dc2626;
}

.activity-time {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

/* Footer */
.footer-section {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 48px 24px;
  color: #fff;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
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

.social-icons {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.social-icon {
  color: #fff;
  font-size: 20px;
  transition: opacity 0.3s ease;
}

.social-icon:hover {
  opacity: 0.8;
}

.footer-copyright {
  text-align: center;
  font-size: 14px;
  margin-top: 32px;
}

/* Buttons */
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

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .cards-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .stats-container {
    grid-template-columns: 1fr 1fr;
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

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-section {
    padding: 80px 0;
  }

  .cards-section,
  .stats-section,
  .activities-section {
    padding: 48px 0;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 24px;
  }

  .card,
  .stat {
    padding: 16px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 14px;
  }

  .activity-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .activity-status-time {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-section {
    padding: 60px 0;
  }

  .card-icon {
    font-size: 32px;
  }

  .card-title {
    font-size: 18px;
  }

  .stat-number {
    font-size: 28px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-section {
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>
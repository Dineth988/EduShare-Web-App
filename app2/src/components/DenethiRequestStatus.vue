<template>
  <div class="request-status-page" :class="{ 'dark-mode': isDarkMode }">
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
          <router-link to="/requests" class="nav-link" @click="closeMenu">Requests</router-link>
          <router-link to="/reports" class="nav-link" @click="closeMenu">Reports</router-link>
          <router-link to="/settings" class="nav-link" @click="closeMenu">Settings</router-link>
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

    <!-- Breadcrumb -->
    <div class="container breadcrumb">
      <nav class="breadcrumb-nav">
        <router-link to="/recipienthome" class="breadcrumb-link">Home</router-link> >
        <router-link to="/requests" class="breadcrumb-link">Requests</router-link> >
        <span class="breadcrumb-current">Status</span>
      </nav>
    </div>

    <!-- Main Content -->
    <section class="container main-section">
      <div class="header">
        <h1 class="page-title">Request Status</h1>
        <button @click="goBackToHome" class="btn btn-secondary">
          <i class="fas fa-arrow-left mr-2"></i> Back to Home
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p class="loading-text">Loading logistics data...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="error-state">
        <strong class="error-title">Error!</strong>
        <span>{{ error }}</span>
      </div>

      <!-- Logistics Cards -->
      <div v-if="!loading && !error">
        <div v-if="logisticsList.length === 0" class="empty-state">
          <p class="empty-text">No logistics data available.</p>
        </div>

        <div v-else class="logistics-grid">
          <div
            v-for="logistics in logisticsList"
            :key="logistics._id"
            class="logistics-card"
          >
            <div class="card-header">
              <h2 class="card-title">Logistics ID: {{ logistics.logistics_id }}</h2>
              <span :class="['status-badge', statusColorClass(logistics.delivery_status)]">
                {{ logistics.delivery_status }}
              </span>
            </div>

            <div class="card-content">
              <p class="card-item">
                <span class="item-label">Tracking #:</span>
                <span class="item-value font-mono">{{ logistics.tracking_number || 'N/A' }}</span>
              </p>
              <p class="card-item">
                <span class="item-label">Match ID:</span>
                <span class="item-value">{{ logistics.match_id || 'N/A' }}</span>
              </p>
              <p class="card-item">
                <span class="item-label">Estimated Delivery:</span>
                <span class="item-value">{{ formatDate(logistics.estimated_delivery) }}</span>
              </p>
            </div>

            <div class="card-footer">
              <button @click="viewDetails(logistics._id)" class="btn btn-link">
                View Details <i class="fas fa-arrow-right ml-1"></i>
              </button>
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
          <p class="footer-text">Making your requests simple and efficient</p>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'RequestStatus',
  setup() {
    const router = useRouter()
    const logisticsList = ref([])
    const loading = ref(true)
    const error = ref(null)
    const isDarkMode = ref(false)
    const isMenuOpen = ref(false)
    const isProfileMenuOpen = ref(false)

    const goBackToHome = () => {
      router.push({ name: 'Home' })
    }

    const viewDetails = (id) => {
      console.log('View details for logistics ID:', id)
      // router.push({ name: 'LogisticsDetail', params: { id } })
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return 'Not specified'
      try {
        return new Date(dateStr).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      } catch {
        return 'Invalid date'
      }
    }

    const statusColorClass = (status) => {
      if (!status) return 'bg-gray-100 text-gray-800'
      status = status.toLowerCase()
      if (status.includes('delivered')) return 'bg-green-100 text-green-800'
      if (status.includes('transit')) return 'bg-blue-100 text-blue-800'
      if (status.includes('pending')) return 'bg-yellow-100 text-yellow-800'
      if (status.includes('failed') || status.includes('cancelled')) return 'bg-red-100 text-red-800'
      return 'bg-gray-100 text-gray-800'
    }

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
    }

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
      if (isMenuOpen.value) isProfileMenuOpen.value = false
    }

    const toggleProfileMenu = () => {
      isProfileMenuOpen.value = !isProfileMenuOpen.value
      if (isProfileMenuOpen.value) isMenuOpen.value = false
    }

    const closeMenus = () => {
      isMenuOpen.value = false
      isProfileMenuOpen.value = false
    }

    const logout = () => {
      console.log('Logging out...')
      closeMenus()
      // Implement logout logic (e.g., clear auth token, redirect to login)
      router.push({ name: 'Login' })
    }

    onMounted(async () => {
      try {
        const res = await fetch('http://localhost:5038/api/logistics')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        logisticsList.value = data
      } catch (err) {
        console.error('Error fetching logistics:', err)
        error.value = 'Failed to load logistics data. Please try again later.'
      } finally {
        loading.value = false
      }
    })

    return {
      goBackToHome,
      logisticsList,
      loading,
      error,
      formatDate,
      statusColorClass,
      viewDetails,
      isDarkMode,
      toggleDarkMode,
      isMenuOpen,
      toggleMenu,
      closeMenus,
      isProfileMenuOpen,
      toggleProfileMenu,
      logout,
    }
  },
}
</script>

<style scoped>
/* CSS Variables */
.request-status-page {
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
.request-status-page.dark-mode {
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

/* Breadcrumb */
.breadcrumb {
  padding: 16px 0;
}

.breadcrumb-nav {
  font-size: 14px;
  color: #6b7280;
}

.breadcrumb-link {
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.3s ease;
}

.breadcrumb-link:hover {
  color: var(--primary-color);
}

.breadcrumb-current {
  color: #6b7280;
}

/* Main Section */
.main-section {
  padding: 48px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-color);
  animation: fadeIn 1s ease-in;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 48px 0;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #d1d5db;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 16px;
  font-size: 16px;
  color: var(--text-color);
}

/* Error State */
.error-state {
  background: #fee2e2;
  border: 1px solid #f87171;
  color: #b91c1c;
  padding: 16px;
  border-radius: var(--border-radius);
  margin-bottom: 24px;
}

.error-title {
  font-weight: 600;
  margin-right: 8px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 48px 0;
}

.empty-text {
  font-size: 16px;
  color: var(--text-color);
}

/* Logistics Grid */
.logistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.logistics-card {
  background: var(--card-bg);
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  padding: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 1s ease-in;
}

.logistics-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
}

.status-badge {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-item {
  font-size: 14px;
  color: var(--text-color);
}

.item-label {
  font-weight: 500;
  color: #6b7280;
  margin-right: 8px;
}

.item-value {
  color: var(--text-color);
}

.card-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
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

.btn-secondary {
  background: #e5e7eb;
  color: var(--text-color);
}

.btn-secondary:hover {
  background: #d1d5db;
}

.btn-link {
  background: none;
  color: var(--primary-color);
  padding: 0;
  font-size: 14px;
}

.btn-link:hover {
  color: #2563eb;
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

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 1024px) {
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

  .user-profile {
    display: none;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .page-title {
    font-size: 28px;
  }

  .logistics-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .logistics-card {
    padding: 16px;
  }

  .card-title {
    font-size: 16px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 14px;
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
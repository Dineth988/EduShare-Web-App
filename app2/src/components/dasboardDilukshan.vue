<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo-icon">📚</div>
          <h1>Edu<span class="highlight">Share</span></h1>
        </div>

        <nav class="nav-links">
          <router-link to="/" class="nav-link active">
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
          </router-link>
          <router-link to="/resources" class="nav-link">
            <i class="fas fa-book"></i>
            <span>Resources</span>
          </router-link>
          <router-link to="/matches" class="nav-link">
            <i class="fas fa-handshake"></i>
            <span>Matches</span>
          </router-link>
          <router-link to="/profile" class="nav-link">
            <i class="fas fa-user"></i>
            <span>Profile</span>
          </router-link>
          <router-link to="/notifications" class="nav-link notification-link">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">3</span>
          </router-link>
        </nav>
        <div class="user-profile">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User profile"
            class="profile-pic"
          />
          <span class="user-name">{{ ngo?.name }}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="welcome-banner">
        <div class="welcome-text">
          <h2>Welcome back,{{ ngo?.name }}! 👋</h2>
          <p>Discover, share, and request educational resources with our community.</p>
        </div>
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search for resources..." />
          <button class="search-button">Search</button>
        </div>
      </div>

      <section class="stats">
        <div class="stat-card blue">
          <div class="stat-icon">
            <i class="fas fa-box-open"></i>
          </div>
          <div class="stat-content">
            <div class="value">{{ availableItemsCount }}</div>
            <div class="label">Available Items</div>
          </div>
        </div>
        <div class="stat-card orange">
          <div class="stat-icon">
            <i class="fas fa-hand-holding-heart"></i>
          </div>
          <div class="stat-content">
            <div class="value">{{ availableRequestCount }}</div>
            <div class="label">Active Requests</div>
          </div>
        </div>
        <div class="stat-card green">
          <div class="stat-icon">
            <i class="fas fa-gift"></i>
          </div>
          <div class="stat-content">
            <div class="value">324</div>
            <div class="label">Items Received</div>
          </div>
        </div>
        <div class="stat-card purple">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <div class="value">{{ availableUsersCount }}</div>
            <div class="label">Connected Users</div>
          </div>
        </div>
      </section>

      <section class="resources-section">
        <div class="section-header">
          <h2><i class="fas fa-book-open"></i> Available Educational Resources</h2>
          <router-link to="/resources" class="view-all"
            >View All <i class="fas fa-arrow-right"></i
          ></router-link>
        </div>
        <div class="resource-list">
          <div class="resource-card" v-for="resource in resourceList" :key="resource.id">
            <div class="resource-image">
              <img :src="resource.image" alt="Resource Image" />
              <div class="resource-badge" :class="resource.is_digital ? 'digital' : 'physical'">
                {{ resource.is_digital ? 'Digital' : 'Physical' }}
              </div>
            </div>
            <div class="resource-details">
              <h3>{{ resource.title }}</h3>
              <p class="resource-description">{{ resource.description }}</p>
              <div class="resource-meta">
                <span class="type-tag">{{ resource.type }}</span>
                <span class="condition">
                  <i class="fas fa-star"></i> {{ resource.condition }} condition
                </span>
              </div>
              <button @click="requestResource(resource.id)" class="resource-button">
                {{ resource.is_digital ? '📥 Download Now' : '📦 Request Item' }}
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="bottom-section">
        <div class="activities">
          <div class="section-header">
            <h3><i class="fas fa-list-alt"></i> Recent Activities</h3>
            <router-link to="/activities" class="view-all"
              >View All <i class="fas fa-arrow-right"></i
            ></router-link>
          </div>
          <div class="activities">
            <h3>Recent Activities</h3>
            <div class="activity-card" v-for="(activity, index) in recentActivities" :key="index">
              <div class="activity-header">
                <strong>{{ activity.title }}</strong>
                <span class="activity-date">{{ formatDate(activity.date) }}</span>
              </div>
              <p>{{ activity.description }}</p>
            </div>
          </div>
        </div>

        <div class="quick-actions">
          <div class="section-header">
            <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
          </div>
          <div class="action-buttons">
            <button @click="newRequest()" class="action-button primary">
              <i class="fas fa-plus-circle"></i>
              <span>New Request</span>
            </button>
            <button @click="viewHistory()" class="action-button">
              <i class="fas fa-history"></i>
              <span>View History</span>
            </button>
            <button class="action-button">
              <i class="fas fa-question-circle"></i>
              <span>Get Support</span>
            </button>
            <button class="action-button">
              <i class="fas fa-share-alt"></i>
              <span>Invite Friends</span>
            </button>
          </div>
          <div class="community-card">
            <h4>Join Our Community</h4>
            <p>Connect with other educators and donors to maximize impact.</p>
            <button class="community-button">
              Explore Groups <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo-container">
            <div class="logo-icon">📚</div>
            <h1>Edu<span class="highlight">Share</span></h1>
          </div>
          <p class="footer-mission">
            Empowering education through shared resources from donors to NGOs.
          </p>
          <div class="social-icons">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-linkedin-in"></i>
          </div>
        </div>
        <div class="footer-links">
          <div class="link-column">
            <h4>Quick Links</h4>
            <a href="#">How it Works</a>
            <a href="#">Success Stories</a>
            <a href="#">Become a Donor</a>
            <a href="#">For Educators</a>
          </div>
          <div class="link-column">
            <h4>Resources</h4>
            <a href="#">Help Center</a>
            <a href="#">Blog</a>
            <a href="#">Webinars</a>
            <a href="#">FAQ</a>
          </div>
          <div class="link-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Partners</a>
            <a href="#">Contact</a>
          </div>
          <div class="link-column">
            <h4>Contact Us</h4>
            <p><i class="fas fa-envelope"></i> support@edushare.org</p>
            <p><i class="fas fa-phone"></i> +1 555 123-4567</p>
            <p><i class="fas fa-map-marker-alt"></i> 123 Education St, Boston, MA</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2023 EduShare. All rights reserved.</p>
        <div class="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashBoard',
  data() {
    return {
      availableItemsCount: 0,
      availableUsersCount: 0,
      availableRequestCount: 0,
      resourceList: [],
      recentActivities: [],
      loading: true,
      error: null,
      ngo: null,
      user: {
        name: 'Loading...',
        email: '',
      },
    }
  },
  async mounted() {
    await this.fetchNGOData()
    await this.fetchResources()
    await this.fetchResourcesCount()
    await this.fetchRequestsCount()
    await this.fetchUsersCount()
    await this.fetchRecentActivities()
  },
  methods: {
    async fetchNGOData() {
      try {
        const response = await axios.get(`http://localhost:3000/api/ngos/6823a77c92797b22232be309`)
        this.ngo = response.data
      } catch (err) {
        console.error('Error fetching NGO data:', err)
      }
    },

    getActivityClass(type) {
      const types = {
        donation: 'donation',
        request: 'request',
        match: 'match',
        message: 'message',
      }
      return types[type.toLowerCase()] || 'default'
    },
    getActivityIcon(type) {
      const icons = {
        donation: 'fas fa-gift',
        request: 'fas fa-hand-holding-heart',
        match: 'fas fa-handshake',
        message: 'fas fa-comment-alt',
      }
      return icons[type.toLowerCase()] || 'fas fa-info-circle'
    },
    async fetchRecentActivities() {
      try {
        const response = await axios.get('http://localhost:3000/api/activities')
        this.recentActivities = response.data
      } catch (err) {
        console.error('Error fetching activities:', err)
      }
    },
    async fetchResourcesCount() {
      try {
        const response = await axios.get('http://localhost:3000/api/resources/count')
        this.availableItemsCount = response.data.count
      } catch (err) {
        console.error('Error fetching resource count:', err)
      }
    },
    async fetchRequestsCount() {
      try {
        const response = await axios.get('http://localhost:3000/api/requests/count')
        this.availableRequestCount = response.data.count
      } catch (err) {
        console.error('Error fetching requests count:', err)
      }
    },
    async fetchUsersCount() {
      try {
        const response = await axios.get('http://localhost:3000/api/users/count')
        this.availableUsersCount = response.data.count
      } catch (err) {
        console.error('Error fetching users count:', err)
      }
    },
    async fetchResources() {
      try {
        this.loading = true
        const response = await axios.get('http://localhost:3000/api/resources')
        this.resourceList = response.data.map((resource) => ({
          id: resource.resource_id,
          title: resource.title,
          description: resource.description,
          image: resource.image_link || '/src/assets/default-resource.png',
          type: resource.type,
          condition: resource.condition,
          is_digital: resource.is_digital,
        }))
      } catch (err) {
        console.error('Error fetching resources:', err)
        this.error = 'Failed to load resources.'
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    requestResource(id) {
      this.$router.push({ name: 'ResourceReq', params: { resource_id: id } })
    },
    newRequest() {
      this.$router.push({ name: 'NewRequest' })
    },
    viewHistory() {
      this.$router.push({ name: 'ViewHistory' })
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --accent-color: #4895ef;
  --success-color: #4cc9f0;
  --warning-color: #f8961e;
  --danger-color: #f94144;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-color: #6c757d;
  --light-gray: #e9ecef;
  --white: #ffffff;
  --box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  --border-radius: 12px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard {
  font-family: 'Poppins', sans-serif;
  background-color: #f5f7fb;
  min-height: 100vh;
  color: var(--dark-color);
}

.dashboard-header {
  background-color: var(--white);
  box-shadow: var(--box-shadow);
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 0;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 1.75rem;
  background-color: var(--primary-color);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-color);
}

.highlight {
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--gray-color);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: var(--transition);
}

.nav-link i {
  font-size: 1.1rem;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link.active {
  color: var(--primary-color);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 3px 3px 0 0;
}

.notification-link {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--danger-color);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.user-profile:hover {
  background-color: var(--light-gray);
}

.profile-pic {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-weight: 500;
  font-size: 0.9rem;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-banner {
  background: linear-gradient(135deg, #2a007f, #6a1ab2);
  color: rgb(255, 255, 255);
  border-radius: var(--border-radius);
  padding: 2.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.welcome-text h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.welcome-text p {
  opacity: 0.9;
  font-weight: 300;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  width: 400px;
}

.search-bar i {
  color: var(--gray-color);
  margin-right: 0.5rem;
}

.search-bar input {
  border: none;
  outline: none;
  flex: 1;
  padding: 0.5rem 0;
  font-family: 'Poppins', sans-serif;
}

.search-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.search-button:hover {
  background-color: var(--secondary-color);
}

h2 {
  font-size: 1.75rem;
  font-weight: 600;
}

.resource-details h3 {
  font-size: 1.3rem;
  font-weight: 500;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
}

.stat-card.blue .stat-icon {
  background-color: var(--primary-color);
}

.stat-card.orange .stat-icon {
  background-color: var(--warning-color);
}

.stat-card.green .stat-icon {
  background-color: var(--success-color);
}

.stat-card.purple .stat-icon {
  background-color: #8a2be2;
}

.stat-content .value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.stat-content .label {
  color: var(--gray-color);
  font-size: 0.9rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2,
.section-header h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.section-header h3 {
  font-size: 1.25rem;
}

.view-all {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: var(--transition);
}

.view-all:hover {
  color: var(--secondary-color);
}

.resources-section {
  margin-bottom: 2rem;
}

.resource-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.resource-card {
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: auto;
  min-height: 300px;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.resource-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.resource-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.resource-card:hover .resource-image img {
  transform: scale(1.05);
}

.resource-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(0, 0, 0);
}

.resource-badge.digital {
  background-color: var(--success-color);
}

.resource-badge.physical {
  background-color: var(--warning-color);
}

.resource-details {
  padding: 1.5rem;
}

.resource-details h3 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: var(--dark-color);
}

.resource-description {
  color: var(--gray-color);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.resource-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.type-tag {
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}

.condition {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--gray-color);
  font-size: 0.8rem;
}

.condition i {
  color: #ffc107;
  font-size: 0.7rem;
}

.resource-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  background-color: #4a00e0;
  color: rgb(255, 255, 255);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition);
}

.resource-button:hover {
  background-color: var(--secondary-color);
}

.resource-button i {
  font-size: 0.8rem;
}

.bottom-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  padding: 1rem;
}
.activities {
  background-color: #f9fafc;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e6f0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.25rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.activity-card:hover {
  background-color: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.activity-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.activity-icon.request {
  background-color: #f8961e;
}

.activity-icon.match {
  background-color: #4361ee;
}

.activity-icon.message {
  background-color: #9c27b0;
}

.activity-icon.default {
  background-color: #6c757d;
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.activity-header strong {
  font-weight: 600;
  color: #1e293b;
  font-size: 1.1rem;
}

.activity-date {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.activity-card p {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;
}

.section-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-header h3::before {
  content: '📋';
  font-size: 1.2rem;
}

.view-all {
  color: #4361ee;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.view-all:hover {
  color: #3f37c9;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .activity-card {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .activity-icon {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .activity-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .section-header h3 {
    font-size: 1.25rem;
  }

  .view-all {
    font-size: 0.9rem;
  }
}
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e6f0;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border: 2px solid #e0e6f0;
  border-radius: 10px;
  background-color: #f8f9fa;
  color: #1e293b;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.action-button i {
  font-size: 1.25rem;
  color: #4361ee;
  transition: all 0.3s ease;
  width: 1.25rem;
  text-align: center;
}

.action-button:hover {
  background-color: #e0e7ff;
  border-color: #4361ee;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);
}

.action-button:hover i {
  color: #3f37c9;
  transform: scale(1.1);
}

.action-button.primary {
  background-color: #4361ee;
  color: #ffffff;
  border-color: #4361ee;
}

.action-button.primary i {
  color: #ffffff;
}

.action-button.primary:hover {
  background-color: #3f37c9;
  border-color: #3f37c9;
  box-shadow: 0 4px 12px rgba(63, 55, 201, 0.3);
}

.section-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-header h3 i {
  font-size: 1.2rem;
  color: #4361ee;
}

@media (max-width: 768px) {
  .action-buttons {
    padding: 1.5rem;
    gap: 0.75rem;
  }

  .action-button {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }

  .action-button i {
    font-size: 1.1rem;
    width: 1.1rem;
  }

  .section-header h3 {
    font-size: 1.25rem;
  }

  .section-header h3 i {
    font-size: 1.1rem;
  }
}
.section-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-header h3::before {
  content: '⚡';
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .action-buttons {
    padding: 1.5rem;
    gap: 0.75rem;
  }

  .action-button {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }

  .action-button i {
    font-size: 1.1rem;
  }

  .section-header h3 {
    font-size: 1.25rem;
  }
}

.community-card {
  background: linear-gradient(135deg, #4a00e0, #8e2de2);
  color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.community-card h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.community-card p {
  opacity: 0.9;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.community-button {
  background-color: white;
  color: #4a00e0;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition);
}

.community-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.footer {
  background: linear-gradient(135deg, #2a007f, #6a1ab2);
  color: #ffffff;
  padding: 3.5rem 2rem 2rem;
  margin-top: 3rem;
  position: relative;
  overflow: hidden;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-brand .logo-container {
  gap: 0.75rem;
  display: flex;
  align-items: center;
}

.footer-brand .logo-container h1 {
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.footer-brand .logo-icon {
  font-size: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-mission {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.8;
  font-weight: 400;
}

.social-icons {
  display: flex;
  gap: 1.5rem;
}

.social-icons i {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  color: #ffffff;
}

.social-icons i:hover {
  background-color: #4361ee;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.4);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
}

.link-column h4 {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.5rem;
}

.link-column a,
.link-column p {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  line-height: 1.6;
}

.link-column a:hover {
  color: #e0e7ff;
  padding-left: 0.5rem;
}

.link-column p {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.link-column p i {
  font-size: 1rem;
  color: #e0e7ff;
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  flex-wrap: wrap;
  gap: 1rem;
}

.legal-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.legal-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
}

.legal-links a:hover {
  color: #e0e7ff;
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .footer-content {
    gap: 2rem;
  }

  .footer-brand .logo-container h1 {
    font-size: 1.5rem;
  }

  .footer-brand .logo-icon {
    width: 45px;
    height: 45px;
    font-size: 1.75rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .legal-links {
    justify-content: center;
    gap: 1.5rem;
  }
}
</style>

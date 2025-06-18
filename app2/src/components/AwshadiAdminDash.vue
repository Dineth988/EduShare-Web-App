<template>
  <div class="admin-dashboard">
    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Top Header Bar with Navigation -->
      <header class="top-bar">
        <div class="logo">EduShare Admin</div>
        <nav class="nav-menu">
          <router-link to="/" class="nav-item active">
            <span class="icon">📊</span>
            <span class="nav-text">Dashboard</span>
          </router-link>
          <router-link to="/resource-review" class="nav-item">
            <span class="icon">📚</span>
            <span class="nav-text">Resource Review</span>
          </router-link>
          <router-link to="/user-management" class="nav-item">
            <span class="icon">📈</span>
            <span class="nav-text">User Management</span>
          </router-link>
          <router-link to="/messages" class="nav-item">
            <span class="icon">✉️</span>
            <span class="nav-text">Messages</span>
          </router-link>
        </nav>
        <div class="user-controls">
          <button class="notification-btn">
            <span class="icon">🔔</span>
            <span class="badge">3</span>
          </button>
          <div class="user-profile">
            <img src="https://i.pravatar.cc/40" alt="Admin" class="avatar" />
            <span class="username">Admin User</span>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="dashboard-content">
        <!-- Summary Statistics Cards -->
        <section class="stats-section">
          <div class="stat-card">
            <div class="stat-value">{{ stats.totalUsers }}</div>
            <div class="stat-label">Total Users</div>
            <div class="stat-change positive">
              +{{ Math.floor(stats.totalUsers / 100) }}% overall
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.activeDonations }}</div>
            <div class="stat-label">Active Donations</div>
            <div class="stat-change positive">
              +{{ Math.floor(stats.activeDonations / 50) }}% active
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.pendingApprovals }}</div>
            <div class="stat-label">Pending Approvals</div>
            <div class="stat-change negative" v-if="stats.pendingApprovals > 0">
              Needs attention
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.monthlyTransactions }}</div>
            <div class="stat-label">Monthly Transactions</div>
            <div class="stat-change positive">
              +{{ Math.floor(stats.monthlyTransactions / 20) }}% this month
            </div>
          </div>
        </section>

        <!-- Keep the rest of your existing template -->
        <!-- ... (user table and other sections) ... -->

        <!-- Main Dashboard Content -->
        <section class="main-dashboard">
          <!-- Left Column (Charts) -->

          <!-- Right Column (Activities) -->
          <div class="dashboard-column activities-column">
            <div class="activities-card">
              <h2 class="card-title">Recent Activities</h2>
              <ul class="activities-list">
                <li class="activity-item">
                  <div class="activity-icon">📩</div>
                  <div class="activity-content">
                    <p class="activity-text">New donation request from Education First NGO</p>
                    <span class="activity-time">1 hour ago</span>
                  </div>
                </li>
                <li class="activity-item">
                  <div class="activity-icon">✅</div>
                  <div class="activity-content">
                    <p class="activity-text">Sarah Johnson verified as donor</p>
                    <span class="activity-time">4 hours ago</span>
                  </div>
                </li>
                <li class="activity-item">
                  <div class="activity-icon">📈</div>
                  <div class="activity-content">
                    <p class="activity-text">Monthly impact report generated</p>
                    <span class="activity-time">1 day ago</span>
                  </div>
                </li>
              </ul>
              <button class="view-all-btn">View All Activities →</button>
            </div>
          </div>
        </section>

        <!-- Bottom Section (Recent Verifications) -->
        <section class="verifications-section">
          <div class="section-header">
            <h2 class="section-title">Recent User Verifications</h2>
            <button class="section-action">View All</button>
          </div>
          <div class="table-container">
            <table class="verifications-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users" :key="index">
                  <td class="user-cell">
                    <img class="user-avatar" :src="user.avatar" :alt="user.name" />
                    <span>{{ user.name }}</span>
                  </td>
                  <td>{{ user.type }}</td>
                  <td>
                    <span class="status-badge" :class="user.status">{{ user.status }}</span>
                  </td>
                  <td>{{ formatDate(user.date) }}</td>
                  <td>
                    <button class="action-btn">📝</button>
                    <button class="action-btn">👁️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      // Stats Data
      stats: {
        totalUsers: 0,
        activeDonations: 0,
        pendingApprovals: 0,
        monthlyTransactions: 0,
      },
      // Existing User Data
      users: [],
      loading: true,
      error: null,
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },

    // Fetch Statistics
    async fetchStats() {
      try {
        const [usersRes, donationsRes, approvalsRes, transactionsRes] = await Promise.all([
          axios.get('http://localhost:5030/api/stats/total-users'),
          axios.get('http://localhost:5030/api/stats/active-donations'),
          axios.get('http://localhost:5030/api/stats/pending-approvals'),
          axios.get('http://localhost:5030/api/stats/monthly-transactions'),
        ])

        this.stats = {
          totalUsers: usersRes.data.count,
          activeDonations: donationsRes.data.count,
          pendingApprovals: approvalsRes.data.count,
          monthlyTransactions: transactionsRes.data.count,
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        this.error = 'Failed to load statistics'
      }
    },

    // Existing User Fetch Method
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5030/api/users')
        this.users = response.data.map((user) => ({
          name: user.full_name,
          avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
          type: user.role,
          status: user.status || 'pending', // Default status
          date: user.created_at,
        }))
      } catch (error) {
        this.error = 'Failed to load users'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
  async mounted() {
    await this.fetchStats()
    await this.fetchUsers()
  },
}
</script>

<style scoped>
/* Base Variables */
:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --success-color: #4cc9f0;
  --warning-color: #f8961e;
  --danger-color: #f94144;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --border-color: #e9ecef;
  --text-color: #495057;
  --text-light: #6c757d;
  --card-radius: 12px;
  --transition: all 0.3s ease;
}

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  margin: 0; /* Remove default body margin */
}

.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
  color: var(--text-color);
  width: 100vw; /* Ensure the dashboard spans the full viewport width */
  margin: 0; /* Ensure no margin on the container */

}

/* Main Content Styles */
.main-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%; /* Take the full width */
  flex: 1;
  margin: 0; /* Ensure no margin */
}

/* Top Bar Styles */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: rgb(197, 236, 241);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 10;
  width: 100%;

}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  padding: 0.5rem;
}

/* Navigation Menu in Top Bar */
.nav-menu {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color);
  transition: var(--transition);
}

.nav-item:hover {
  background-color: rgba(67, 97, 238, 0.1);
}

.nav-item.active {
  background-color: rgba(67, 97, 238, 0.1);
  color: var(--primary-color);

  font-weight: 500;
}

.nav-item .icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.nav-text {
  font-size: 0.9rem;
}

.user-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--text-light);
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--danger-color);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: 500;
  font-size: 0.9rem;
}

/* Dashboard Content */
.dashboard-content {
  flex: 1;
  padding: 1.5rem 2rem 1.5rem 0; /* Remove left padding to eliminate space */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%; /* Ensure content takes full width */
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* Dynamic grid for better space usage */
  gap: 1.5rem;
  width: 100%;
}

.stat-card {
  background-color: white;
  border-radius: var(--card-radius);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
  width: 100%; /* Ensure cards stretch to fill grid cells */
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--dark-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 0.25rem;
}

.stat-change {
  font-size: 0.8rem;
  font-weight: 500;
}

.stat-change.positive {
  color: var(--success-color);
}

.stat-change.negative {
  color: var(--danger-color);
}

/* Main Dashboard Grid */
.main-dashboard {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  flex: 1;
  min-height: 300px; /* Ensure enough height for the chart to be visible */
}

.chart-column {
  flex: 2; /* Take up more space for the chart */
  display: flex;
  flex-direction: column;
}

.activities-column {
  flex: 1; /* Take up less space for activities */
  display: flex;
  flex-direction: column;
}

/* Chart Card */
.chart-card {
  background-color: white;
  border-radius: var(--card-radius);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex: 1;
  width: 100%; /* Ensure chart takes full width of its column */
  min-height: 300px; /* Ensure enough space for the chart */
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.chart-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Take full height of the card */
  width: 100%;
}

.chart-legend {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-color.donated {
  background-color: var(--primary-color);
}

.legend-color.received {
  background-color: var(--success-color);
}

.legend-color.pending {
  background-color: var(--warning-color);
}

.bar-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px; /* Fixed height to ensure bars are visible */
  padding-top: 1rem;
  flex: 1;
  width: 100%;
  position: relative;
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 40px;
  height: 100%;
  position: relative;
}

.bar {
  width: 24px;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
  position: absolute;
  bottom: 20px; /* Align bars to the bottom, leaving space for labels */
}

.bar.donated {
  background-color: var(--primary-color);
}

.bar.received {
  background-color: var(--success-color);
}

.bar.pending {
  background-color: var(--warning-color);
}

.day-label {
  position: absolute;
  bottom: 0;
  font-size: 0.75rem;
  color: var(--text-light);
}

/* Activities Card */
.activities-card {
  background-color: white;
  border-radius: var(--card-radius);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%; /* Ensure activities take full width of its column */
}

.activities-list {
  list-style: none;
  flex: 1;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-top: 2px;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.75rem;
  color: var(--text-light);
}

.view-all-btn {
  align-self: flex-end;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  padding: 0.25rem 0;
}

/* Verifications Section */
.verifications-section {
  background-color: white;
  border-radius: var(--card-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.section-action {
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
}

.table-container {
  overflow-x: auto;
  width: 100%;
}

.verifications-table {
  width: 100%;
  border-collapse: collapse;
}

.verifications-table th,
.verifications-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.verifications-table th {
  font-weight: 500;
  color: var(--text-light);
  text-transform: uppercase;
  font-size: 0.75rem;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.pending {
  background-color: rgba(248, 150, 30, 0.1);
  color: var(--warning-color);
}

.status-badge.verified {
  background-color: rgba(76, 201, 240, 0.1);
  color: var(--success-color);
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--text-light);
  transition: var(--transition);
  margin-right: 0.5rem;
}

.action-btn:hover {
  color: var(--primary-color);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .stats-section {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .main-dashboard {
    flex-direction: column;
  }

  .chart-column,
  .activities-column {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .nav-menu {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: 0;
  }

  .nav-text {
    display: none;
  }

  .nav-item {
    padding: 0.5rem;
    flex-direction: column;
    text-align: center;
  }

  .nav-item .icon {
    margin-right: 0;
  }

  .user-controls {
    align-self: flex-end;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .username {
    display: none;
  }

  .dashboard-content {
    padding: 1rem 1rem 1rem 0; /* Adjust padding for smaller screens */
  }
}
</style>

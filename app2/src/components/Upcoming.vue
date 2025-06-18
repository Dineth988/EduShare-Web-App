<template>
  <div class="upcoming-donations">
    <!-- Navigation Bar -->
    <nav class="nav-bar">
      <div class="logo">EduShare</div>
      <div class="nav-links">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/donations">Donations</router-link>
        <router-link to="/upcoming" class="active">Upcoming</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/schedule-donation" class="primary-btn">
          <i>➕</i> Schedule New Donation
        </router-link>
      </div>
      <div class="user-profile">
        <img :src="userProfileImage" alt="User" />
        <span>{{ userName }}</span>
      </div>
    </nav>

    <div class="container">
      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="icon">📅</div>
          <div class="value">{{ upcomingDonations.length }}</div>
          <div class="label">Scheduled Donations</div>
        </div>
        <div class="stat-card">
          <div class="icon">💰</div>
          <div class="value">${{ totalUpcomingValue }}</div>
          <div class="label">Total Value</div>
        </div>
        <div class="stat-card">
          <div class="icon">🏫</div>
          <div class="value">{{ uniqueSchoolsCount }}</div>
          <div class="label">Schools Benefiting</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <router-link to="/schedule-donation" class="primary-btn">
          <i>➕</i> Schedule Upcoming Donation
        </router-link>
      </div>

      <!-- Upcoming Donations Table -->
      <div class="section">
        <h2>Upcoming Donations</h2>
        <div v-if="loading" class="loading-spinner">Loading upcoming donations...</div>
        <div v-else-if="upcomingDonations.length === 0" class="no-data">
          No upcoming donations found. Schedule your first donation!
        </div>
        <div v-else class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Recipient</th>
                <th>Date</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(donation, index) in upcomingDonations" :key="donation._id">
                <td>
                  <div class="item-info">
                    <img
                      :src="getItemImage(donation.resource_type)"
                      :alt="donation.resource_type"
                    />
                    <span>{{ donation.resource_type }}</span>
                  </div>
                </td>
                <td>
                  <div class="recipient-info">
                    <img
                      :src="
                        donation.school_image ||
                        'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=200'
                      "
                      :alt="donation.school_name"
                    />
                    <div>
                      <strong>{{ donation.school_name }}</strong>
                      <span>{{ donation.location }}</span>
                    </div>
                  </div>
                </td>
                <td>{{ formatDate(donation.scheduled_date) }}</td>
                <td>${{ donation.estimated_value.toLocaleString() }}</td>
                <td>
                  <span :class="['status', donation.status]">
                    {{ donation.status }}
                  </span>
                </td>
                <td>
                  <router-link
                    :to="{
                      path: '/edit-donation',
                      query: {
                        id: donation._id,
                        type: donation.resource_type,
                        school: donation.school_name,
                        location: donation.location,
                        date: formatDateForEdit(donation.scheduled_date),
                        value: donation.estimated_value,
                        schoolImage: donation.school_image,
                      },
                    }"
                  >
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Impact Preview -->
      <div class="section">
        <h2>Potential Impact</h2>
        <div class="impact-preview">
          <div class="impact-card" v-for="(impact, index) in impactMetrics" :key="index">
            <img :src="impact.image" :alt="impact.metric" />
            <h3>{{ impact.value }}</h3>
            <p>{{ impact.metric }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'UpcomingDonations',
  data() {
    return {
      userName: 'John Doe',
      userProfileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      upcomingDonations: [] as any[],
      loading: true,
      impactMetrics: [
        {
          metric: 'Students Impacted',
          value: '1,200+',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200',
        },
        {
          metric: 'Classrooms Equipped',
          value: '25',
          image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=200',
        },
        {
          metric: 'Teachers Supported',
          value: '45',
          image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=200',
        },
      ],
    }
  },
  computed: {
    totalUpcomingValue() {
      return this.upcomingDonations
        .reduce((sum, donation) => sum + donation.estimated_value, 0)
        .toLocaleString()
    },
    uniqueSchoolsCount() {
      const schools = new Set(this.upcomingDonations.map((d) => d.school_name))
      return schools.size
    },
  },
  async created() {
    await this.fetchUpcomingDonations()
  },
  methods: {
    async fetchUpcomingDonations() {
      try {
        this.loading = true
        // Replace 'b1ffc399-8d1c-5fga-cc7d-7cc8ce490b22' with the actual donor_id from your auth system
        const response = await axios.get('http://localhost:5038/api/upcoming_donations', {
          params: {
            donor_id: 'b1ffc399-8d1c-5fga-cc7d-7cc8ce490b22',
          },
        })
        this.upcomingDonations = response.data
      } catch (error) {
        console.error('Error fetching upcoming donations:', error)
        alert('Failed to load upcoming donations. Please try again later.')
      } finally {
        this.loading = false
      }
    },
    getItemImage(type: string) {
      const images: Record<string, string> = {
        'Science Lab Equipment':
          'https://images.unsplash.com/photo-1581093450021-4a7360e9a7e2?w=200',
        'Digital Tablets': 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=200',
        'Library Resources': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=200',
        'Sports Equipment': 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=200',
      }
      return images[type] || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200'
    },
    formatDate(dateString: string | Date) {
      const date = new Date(dateString)
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
      return date.toLocaleDateString('en-US', options)
    },
    formatDateForEdit(dateString: string | Date) {
      const date = new Date(dateString)
      return date.toISOString().split('T')[0]
    },
    async exportSchedule() {
      try {
        alert('Exporting donation schedule...')
        // Implement actual export logic here
      } catch (error) {
        console.error('Export error:', error)
        alert('Failed to export schedule')
      }
    },
    async confirmCancel(id: string, index: number) {
      if (confirm('Are you sure you want to cancel this donation?')) {
        try {
          await axios.delete(`http://localhost:5038/api/upcoming_donations/${id}`)
          this.upcomingDonations.splice(index, 1)
        } catch (error) {
          console.error('Cancel error:', error)
          alert('Failed to cancel donation')
        }
      }
    },
  },
})
</script>

<style scoped>
.upcoming-donations {
  --primary-color: #4361ee;
  --secondary-color: #3a0ca3;
  --text-color: #333;
  --light-text: #666;
  --bg-color: #f5f7fa;
  --card-bg: #ffffff;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --danger-color: #dc3545;

  background-color: var(--bg-color);
  min-height: 100vh;
  color: var(--text-color);
  font-family: 'Roboto', sans-serif;
}

/* Navigation Bar */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card-bg);
  padding: 15px 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: var(--light-text);
  font-weight: 500;
  transition: color 0.3s;
  padding: 5px 0;
  border-bottom: 2px solid transparent;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-links a.active {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-profile img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.user-profile span {
  font-weight: 500;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: var(--card-bg);
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card .icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.stat-card .value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: var(--primary-color);
}

.stat-card .label {
  font-size: 1rem;
  color: var(--light-text);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.action-buttons a,
.action-buttons button {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.action-buttons .primary-btn {
  background-color: var(--primary-color);
  color: white;
}

.action-buttons .primary-btn:hover {
  background-color: var(--secondary-color);
}

.action-buttons .secondary-btn {
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.action-buttons .secondary-btn:hover {
  background-color: #f0f4ff;
}

/* Section Styling */
.section {
  background-color: var(--card-bg);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

/* Loading and No Data Styles */
.loading-spinner,
.no-data {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: var(--light-text);
}

/* Table Styling */
.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  color: var(--light-text);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

tr:hover {
  background-color: #f8f9fa;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-info img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.recipient-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.recipient-info img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.recipient-info div {
  display: flex;
  flex-direction: column;
}

.recipient-info span {
  font-size: 0.8rem;
  color: var(--light-text);
}

.status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status.scheduled {
  background-color: #e6f7eb;
  color: var(--success-color);
}

.status.pending {
  background-color: #fff8e6;
  color: var(--warning-color);
}

.status.cancelled {
  background-color: #ffebee;
  color: var(--danger-color);
}

.action-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 5px;
  text-decoration: none;
}

.action-btn.edit {
  background-color: #e6f7eb;
  color: var(--success-color);
}

.action-btn.edit:hover {
  background-color: #d4f1dd;
}

.action-btn.cancel {
  background-color: #ffebee;
  color: var(--danger-color);
}

.action-btn.cancel:hover {
  background-color: #ffddde;
}

/* Impact Preview */
.impact-preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.impact-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;
}

.impact-card:hover {
  transform: translateY(-5px);
}

.impact-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.impact-card h3 {
  font-size: 1.8rem;
  margin: 15px 0 5px;
  color: var(--primary-color);
}

.impact-card p {
  font-size: 1rem;
  color: var(--light-text);
  padding-bottom: 15px;
}

/* Responsive Design */
@media (max-width: 992px) {
  .stats-section,
  .impact-preview {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-bar {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  .stats-section,
  .impact-preview {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  table {
    display: block;
    overflow-x: auto;
  }

  .item-info,
  .recipient-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>

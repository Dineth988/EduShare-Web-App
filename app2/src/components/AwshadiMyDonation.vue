<template>
  <div class="my-donations" :class="{ 'dark-mode': isDarkMode }">
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
            <span>DonationHub</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="nav-links" :class="{ 'active': isMenuOpen }">
          <router-link to="/home" class="nav-link" @click="closeMenu">Home</router-link>
          <router-link to="/donation" class="nav-link" @click="closeMenu">Donate</router-link>
          <router-link to="/about" class="nav-link" @click="closeMenu">About</router-link>
          <router-link to="/profile" class="nav-link" @click="closeMenu">Profile</router-link>
        </div>

        <!-- Hamburger Menu -->
        <button class="hamburger" @click="toggleMenu">
          <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </nav>

    <div class="container">
      <!-- Dark Mode Toggle -->
      <button class="dark-mode-toggle" @click="toggleDarkMode">
        <i>{{ isDarkMode ? '☀️' : '🌙' }}</i>
      </button>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Donations Section -->
        <div class="donations-section">
          <div class="progress-bar">
            <p>Your Impact: <strong>250 Students Reached</strong> - 21% of yearly goal</p>
            <div class="bar">
              <div class="fill" :style="{ width: '21%' }"></div>
            </div>
          </div>

          <h2>My Donations</h2>
          <div class="filters">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by type or status..."
              @input="filterDonations"
            />
            <button @click="filterDonations"><i class="fas fa-search"></i></button>
          </div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Resource Type</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(donation, index) in filteredDonations" :key="index" class="donation-row">
                  <td>{{ donation.type }}</td>
                  <td>{{ donation.quantity }}</td>
                  <td>{{ formatDate(donation.date) }}</td>
                  <td>
                    <span :class="['status', donation.status]" :title="getStatusTooltip(donation.status)">
                      {{ getStatusText(donation.status) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Matches Section -->
        <div class="matches-section">
          <h2>Potential Matches</h2>
          <div v-if="potentialMatches.length === 0" class="no-matches">
            <p>No potential matches available.</p>
          </div>
          <div v-for="(match, index) in potentialMatches" :key="index" class="match-card">
            <h4>{{ match.school }}</h4>
            <p>
              <i class="fas fa-map-marker-alt"></i> {{ match.location }}<br />
              <i class="fas fa-box"></i> {{ match.request }}
            </p>
            <div class="buttons">
              <button class="accept" @click="acceptMatch(index)">
                <i class="fas fa-check"></i> Accept
              </button>
              <button class="decline" @click="declineMatch(index)">
                <i class="fas fa-times"></i> Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'MyDonations',
  setup() {
    // Data
    const searchQuery = ref('')
    const isDarkMode = ref(false)
    const isMenuOpen = ref(false)
    const donations = ref([
      { type: 'Laptop', quantity: 5, date: '2024-01-15', status: 'delivered' },
      { type: 'Textbooks', quantity: 20, date: '2024-01-10', status: 'in-transit' },
      { type: 'School Supplies', quantity: 100, date: '2023-12-31', status: 'pending' },
      { type: 'Laptop', quantity: 3, date: '2023-12-20', status: 'delivered' },
    ])

    const potentialMatches = ref([
      {
        school: 'Lincoln Elementary School',
        location: 'Chicago, IL',
        request: '5 laptops for 4th-grade class',
      },
      {
        school: 'Washington High School',
        location: 'Phoenix, AZ',
        request: '20 textbooks for science class',
      },
    ])

    // Computed
    const filteredDonations = computed(() => {
      if (!searchQuery.value) return donations.value
      const query = searchQuery.value.toLowerCase()
      return donations.value.filter(
        (donation) =>
          donation.type.toLowerCase().includes(query) ||
          donation.status.toLowerCase().includes(query),
      )
    })

    // Methods
    const filterDonations = () => {
      // Handled by computed property
    }

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
      return new Date(dateString).toLocaleDateString('en-US', options)
    }

    const getStatusText = (status: string) => {
      const statusMap: Record<string, string> = {
        delivered: 'Delivered',
        'in-transit': 'In Transit',
        pending: 'Pending',
      }
      return statusMap[status] || status
    }

    const getStatusTooltip = (status: string) => {
      const tooltipMap: Record<string, string> = {
        delivered: 'Donation successfully delivered to the recipient.',
        'in-transit': 'Donation is on its way to the recipient.',
        pending: 'Donation is awaiting processing or shipment.',
      }
      return tooltipMap[status] || status
    }

    const acceptMatch = (index: number) => {
      alert(`Accepted match with ${potentialMatches.value[index].school}`)
      potentialMatches.value.splice(index, 1)
    }

    const declineMatch = (index: number) => {
      potentialMatches.value.splice(index, 1)
    }

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
    }

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    return {
      searchQuery,
      isDarkMode,
      isMenuOpen,
      donations,
      potentialMatches,
      filteredDonations,
      filterDonations,
      formatDate,
      getStatusText,
      getStatusTooltip,
      acceptMatch,
      declineMatch,
      toggleDarkMode,
      toggleMenu,
      closeMenu,
    }
  },
})
</script>

<style scoped>
/* CSS Variables */
.my-donations {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;

  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

/* Dark Mode */
.my-donations.dark-mode {
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

/* Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px;
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

/* Main Content */
.main-content {
  display: flex;
  gap: 24px;
}

/* Sections */
.donations-section,
.matches-section {
  background: var(--card-bg);
  padding: 24px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.donations-section {
  flex: 2;
}

.matches-section {
  flex: 1;
}

/* Progress Bar */
.progress-bar {
  margin-bottom: 24px;
}

.progress-bar p {
  font-size: 16px;
  color: var(--text-color);
  margin-bottom: 12px;
}

.progress-bar p strong {
  color: var(--primary-color);
  font-weight: 600;
}

.progress-bar .bar {
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

.progress-bar .fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 6px;
  transition: width 0.5s ease-in-out;
}

/* Headings */
.donations-section h2,
.matches-section h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 20px;
}

/* Filters */
.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.filters input {
  flex: 1;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 14px;
  background: var(--card-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.filters input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filters button {
  padding: 12px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filters button:hover {
  background: #2563eb;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background: var(--card-bg);
  color: var(--text-color);
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
}

td {
  color: var(--text-color);
  font-size: 14px;
}

.donation-row {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.donation-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Status */
.status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}

.status.delivered {
  background: #d1fae5;
  color: #065f46;
}

.status.in-transit {
  background: #fef3c7;
  color: #92400e;
}

.status.pending {
  background: #f3f4f6;
  color: #4b5563;
}

/* Matches Section */
.no-matches {
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  padding: 20px;
}

.match-card {
  background: var(--card-bg);
  padding: 20px;
  border-radius: var(--border-radius);
  margin-bottom: 16px;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.match-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.match-card h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.match-card p {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 12px;
}

.match-card p i {
  margin-right: 8px;
  color: var(--primary-color);
}

.match-card .buttons {
  display: flex;
  gap: 12px;
}

.match-card button {
  flex: 1;
  padding: 10px;
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.match-card .accept {
  background: var(--secondary-color);
  color: #fff;
  border: none;
}

.match-card .accept:hover {
  background: #059669;
}

.match-card .decline {
  background: transparent;
  color: var(--text-color);
  border: 1px solid #d1d5db;
}

.match-card .decline:hover {
  background: #f3f4f6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .donations-section,
  .matches-section {
    width: 100%;
  }

  .filters {
    flex-direction: column;
  }

  .filters input,
  .filters button {
    width: 100%;
  }

  .table-wrapper {
    margin-bottom: 20px;
  }

  th,
  td {
    font-size: 12px;
    padding: 12px;
  }

  /* Navbar Responsive */
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
}

@media (max-width: 480px) {
  .container {
    padding: 16px;
  }

  .donations-section h2,
  .matches-section h2 {
    font-size: 20px;
  }

  .match-card button {
    font-size: 12px;
    padding: 8px;
  }
}
</style>
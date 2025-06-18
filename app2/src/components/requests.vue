```vue
<template>
  <div class="page-container">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-logo">
        <span>🎓</span> EduShare
      </div>
      <div class="navbar-links">
        <router-link to="/home">Home</router-link>
        <router-link to="/donation">Donate</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/how-it-works">How It Works</router-link>
      </div>
      <div class="navbar-actions">
        <router-link to="/login" class="login-button">Login</router-link>
      </div>
      <button class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div v-if="showMenu" class="mobile-menu">
        <router-link to="/home" @click="toggleMenu">Home</router-link>
        <router-link to="/donation" @click="toggleMenu">Donate</router-link>
        <router-link to="/about" @click="toggleMenu">About</router-link>
        <router-link to="/how-it-works" @click="toggleMenu">How It Works</router-link>
        <router-link to="/login" @click="toggleMenu">Login</router-link>
      </div>
    </nav>

    <!-- Filters -->
    <div class="filters">
      <div class="filter-input">
        <input v-model="searchQuery" type="text" placeholder="Search for requests..." />
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <select v-model="selectedResourceType">
        <option value="">All Resource Types</option>
        <option value="book">Books</option>
        <option value="laptop">Laptops</option>
        <option value="software">Software</option>
        <option value="other">Other</option>
      </select>
      <select v-model="selectedUrgency">
        <option value="">All Urgency Levels</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>

    <!-- Requests Container -->
    <div class="requests-container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading requests...</p>
      </div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchRequests" class="retry-button">Try Again</button>
      </div>
      <div v-else-if="filteredRequests.length === 0" class="no-requests">
        <p>No requests found.</p>
        <router-link to="/donation" class="explore-button">Explore Donation Options</router-link>
      </div>

      <div v-else class="requests-grid">
        <div v-for="request in paginatedRequests" :key="request.request_id" class="request-card">
          <div class="request-image">
            <img :src="getImageForResource(request.resource_type)" :alt="request.title" />
          </div>
          <div class="request-content">
            <div :class="['priority', request.urgency]">
              {{ urgencyText(request.urgency) }}
            </div>
            <h3 class="request-title">{{ request.title }}</h3>
            <p class="request-location">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ request.organization_name || 'Education Center' }}
            </p>
            <p class="request-description">
              {{ request.quantity_needed }} {{ request.resource_type }}s needed
              ({{ request.condition_preference }} condition preferred)
            </p>
            <p class="request-quote">
              "Will help {{ Math.floor(request.quantity_needed * 1.5) }} students with their education"
            </p>
            <div class="request-meta">
              <p class="request-time">
                {{ formatDate(request.date).text }}
                <span v-if="formatDate(request.date).showBadge" class="days-badge">
                  {{ formatDate(request.date).days }} {{ formatDate(request.date).days === 1 ? 'day' : 'days' }}
                </span>
              </p>
              <button class="donate-button" @click="handleDonateClick(request.request_id)">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const requests = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedResourceType = ref('')
const selectedUrgency = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(5)
const showMenu = ref(false)

// Computed properties
const filteredRequests = computed(() => {
  return requests.value.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesResource = !selectedResourceType.value || request.resource_type === selectedResourceType.value
    const matchesUrgency = !selectedUrgency.value || request.urgency === selectedUrgency.value
    return matchesSearch && matchesResource && matchesUrgency
  })
})

const totalPages = computed(() => Math.ceil(filteredRequests.value.length / itemsPerPage.value))

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredRequests.value.slice(start, end)
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return { text: 'Recently', showBadge: false }
  const diffDays = getDaysSince(dateString)
  if (diffDays === 0) return { text: 'Posted today', showBadge: false }
  if (diffDays === 1) return { text: 'Posted yesterday', showBadge: false }
  if (diffDays < 7) return { text: `Posted ${diffDays} days ago`, showBadge: false }
  const requestDate = new Date(dateString)
  return {
    text: requestDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    showBadge: true,
    days: diffDays,
  }
}

const getDaysSince = (dateString) => {
  if (!dateString) return 0
  const today = new Date()
  const requestDate = new Date(dateString)
  today.setHours(0, 0, 0, 0)
  requestDate.setHours(0, 0, 0, 0)
  const diffTime = today - requestDate
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

const urgencyText = (urgency) => {
  const texts = { high: 'High Priority', medium: 'Medium Priority', low: 'Low Priority' }
  return texts[urgency] || 'Normal Priority'
}

const handleDonateClick = (requestId) => {
  router.push({ name: 'matchDonations', params: { requestId } })
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const getImageForResource = (resourceType) => {
  const images = {
    book: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    laptop: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    software: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    other: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  }
  return images[resourceType] || images.other
}

const fetchRequests = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('http://localhost:5038/api/requests')
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    requests.value = data
  } catch (err) {
    console.error('Error fetching requests:', err)
    error.value = 'Failed to load requests. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRequests()
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.page-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #ffffff, #f8fafc);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-links {
  display: flex;
  gap: 2rem;
}

.navbar-links a {
  color: #374151;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s, transform 0.2s;
}

.navbar-links a:hover {
  color: #1e40af;
  transform: translateY(-2px);
}

.navbar-actions .login-button {
  background-color: #1e40af;
  color: #ffffff;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.2s;
}

.navbar-actions .login-button:hover {
  background-color: #1e3a8a;
  transform: translateY(-2px);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: #374151;
  transition: all 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  background: #ffffff;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mobile-menu a {
  color: #374151;
  text-decoration: none;
  padding: 0.75rem;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.mobile-menu a:hover {
  background-color: #f1f5f9;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 1rem;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.filter-input {
  position: relative;
  max-width: 300px;
  width: 100%;
}

.filters input,
.filters select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #f9fafb;
}

.filters input:focus,
.filters select:focus {
  outline: none;
  border-color: #1e40af;
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.filters input {
  padding-left: 2.5rem;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
}

.requests-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.requests-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

.request-card {
  display: flex;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.request-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.request-image {
  width: 200px;
  flex-shrink: 0;
}

.request-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.request-content {
  padding: 1.5rem;
  flex: 1;
}

.priority {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.priority.high {
  background-color: #fee2e2;
  color: #dc2626;
}

.priority.medium {
  background-color: #ffedd5;
  color: #f97316;
}

.priority.low {
  background-color: #d1fae5;
  color: #059669;
}

.request-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.request-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.request-location svg {
  width: 1rem;
  height: 1rem;
}

.request-description {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.75rem;
}

.request-quote {
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
  margin-bottom: 1rem;
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
}

.request-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.request-time {
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.days-badge {
  background-color: #e5e7eb;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #4b5563;
}

.donate-button {
  background: linear-gradient(90deg, #1e40af, #2563eb);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.donate-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 0;
}

.pagination button {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.pagination button:hover:not(:disabled) {
  background-color: #1e40af;
  color: #ffffff;
  border-color: #1e40af;
}

.pagination button.active {
  background-color: #1e40af;
  color: #ffffff;
  border-color: #1e40af;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button svg {
  width: 1.25rem;
  height: 1.25rem;
}

.loading,
.error,
.no-requests {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  color: #4b5563;
  font-size: 1.125rem;
}

.loading {
  gap: 1rem;
}

.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #1e40af;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error {
  color: #dc2626;
  gap: 1rem;
}

.retry-button,
.explore-button {
  background: linear-gradient(90deg, #1e40af, #2563eb);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.retry-button:hover,
.explore-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .navbar-links,
  .navbar-actions {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu {
    display: flex;
  }

  .filters {
    flex-direction: column;
    align-items: center;
  }

  .request-card {
    flex-direction: column;
  }

  .request-image {
    width: 100%;
    height: 150px;
  }

  .request-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .donate-button {
    width: 100%;
    text-align: center;
  }
}

@media (min-width: 768px) {
  .requests-grid {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  }
}
</style>

<template>
  <div class="container">
    <header class="header">
      <h1 class="logo">EduShare</h1>
      <nav class="nav-links">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/newrequests">Requests</router-link>
        <router-link to="/ngoprofile">Profile</router-link>
      </nav>
    </header>

    <main>
      <div class="top-bar">
        <h2>Resource Library</h2>
        <button class="request-btn" @click="showRequestForm">Request Resource</button>
      </div>

      <p class="subtitle">Browse all available resources</p>

      <div class="filters">
        <input type="text" placeholder="Search resources..." v-model="searchQuery" />
        <select v-model="selectedType">
          <option value="">All Types</option>
          <option v-for="type in uniqueTypes" :key="type">{{ type }}</option>
        </select>
        <select v-model="sortOrder">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading Resources...</p>
      </div>

      <div v-if="error" class="error-state">
        {{ error }}
      </div>

      <div v-if="!loading && !error">
        <div v-if="filteredResources.length === 0" class="empty-state">
          No resources found matching your criteria
        </div>

        <div class="card-grid">
          <div class="card" v-for="resource in filteredResources" :key="resource._id">
            <div
              class="icon-circle"
              :style="{ backgroundColor: resource.is_digital ? '#10B981' : '#FBBF24' }"
            >
              <img :src="resource.image_link || defaultIcon" class="icon-img" alt="Resource icon" />
            </div>
            <h3>{{ resource.title }}</h3>
            <div class="meta-info">
              <span class="type-tag">{{ resource.type }}</span>
              <span class="condition">{{ resource.condition }} condition</span>
            </div>
            <p class="description">{{ resource.description }}</p>

            <div class="card-actions">
              <button
                class="btn secondary"
                @click="$router.push(`/request-resource/${resource.resource_id}`)"
              >
                {{ resource.is_digital ? 'Download' : 'Request' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'

export default {
  name: 'ResourceLibrary',
  data() {
    return {
      searchQuery: '',
      selectedType: '',
      sortOrder: 'newest',
      resources: [],
      loading: true,
      error: null,
      defaultIcon: 'https://img.icons8.com/ios-filled/50/document--v1.png',
    }
  },
  computed: {
    uniqueTypes() {
      return [...new Set(this.resources.map((res) => res.type))]
    },
    filteredResources() {
      let filtered = this.resources.filter((resource) => {
        const matchesSearch = Object.values(resource).some((value) =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase()),
        )
        const matchesType = !this.selectedType || resource.type === this.selectedType
        return matchesSearch && matchesType
      })

      return filtered.sort((a, b) => {
        return this.sortOrder === 'newest'
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
  },
  async mounted() {
    await this.fetchResources()
  },
  methods: {
    async fetchResources() {
      try {
        this.loading = true
        this.error = null

        // Use full URL in development if proxy isn't working
        const apiUrl = import.meta.env.DEV
          ? 'http://localhost:3000/api/resources'
          : '/api/resources'

        const response = await axios.get(apiUrl, {
          timeout: 5000,
          headers: {
            Accept: 'application/json',
          },
        })

        console.log('API Response:', response.data) // Debug log

        // Handle both direct array and wrapped responses
        let resourcesData = []
        if (Array.isArray(response.data)) {
          resourcesData = response.data
        } else if (response.data?.data) {
          resourcesData = response.data.data
        }

        this.resources = resourcesData.map((res) => ({
          ...res,
          resource_id: res.resource_id || res._id || 'missing-id',
          image_link: res.image_link || this.defaultIcon,
          createdAt: res.createdAt || new Date().toISOString(),
          type: res.type || 'unknown',
          condition: res.condition || 'unknown',
          is_digital: res.is_digital || false,
          description: res.description || 'No description available',
        }))
      } catch (err) {
        console.error('Fetch Error:', err)

        if (err.response) {
          // Handle HTTP error codes
          if (err.response.status === 404) {
            this.error = 'API endpoint not found. Check your backend server.'
          } else if (err.response.status === 500) {
            this.error = 'Server error. Please try again later.'
          } else {
            this.error = `Server error: ${err.response.status}`
          }

          // Check if response is HTML
          if (err.response.headers['content-type']?.includes('text/html')) {
            this.error += ' (Received HTML instead of JSON)'
          }
        } else if (err.code === 'ECONNABORTED') {
          this.error = 'Request timed out. Please try again'
        } else if (err.request) {
          this.error = 'Network error - check your internet connection'
        } else {
          this.error = err.message || 'Failed to load resources'
        }

        // Auto-retry after 5 seconds
        setTimeout(() => this.fetchResources(), 5000)
      } finally {
        this.loading = false
      }
    },

    showRequestForm() {
      // You can route to a new request form page or open a modal
      this.$router.push('/newrequests')
    },
  },
}
</script>
<style scoped>
/* Base Styles */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  min-height: 100vh;
}

/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #e0e7ff;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: -0.5px;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  color: #2563eb;
  background: #f0f4ff;
}

.nav-links a.router-link-exact-active {
  color: #2563eb;
  background: #f0f4ff;
  font-weight: 600;
}

/* Main Content */
main {
  padding: 2rem;
  background: #f8fafc;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.top-bar h2 {
  font-size: 1.8rem;
  color: #1e293b;
  margin: 0;
}

.request-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.request-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.subtitle {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* Filters */
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.filters input {
  flex: 1;
  padding: 0.75rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.filters input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filters select {
  padding: 0.75rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filters select:hover {
  border-color: #cbd5e1;
}

/* Cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  border: 1px solid #f1f5f9;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.icon-img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}

h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
}

.meta-info {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.type-tag {
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
}

.condition {
  color: #64748b;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.description {
  color: #475569;
  line-height: 1.6;
  margin: 1rem 0;
  font-size: 0.95rem;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.btn {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.secondary {
  background: #3b82f6;
  color: white;
}

.secondary:hover {
  background: #2563eb;
}

/* Loading States */
.loading-state {
  text-align: center;
  padding: 4rem 0;
}

.spinner {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border: 4px solid #e2e8f0;
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-state {
  padding: 2rem;
  background: #fff0f0;
  border: 2px solid #fecaca;
  border-radius: 1rem;
  color: #dc2626;
  text-align: center;
  margin: 2rem 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: #94a3b8;
  font-size: 1.1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1.5rem;
  }

  .top-bar {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .filters {
    flex-direction: column;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>

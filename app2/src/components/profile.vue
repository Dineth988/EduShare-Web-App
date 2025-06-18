<template>
  <div class="profile-page" style="min-height: 100vh; background-color: #f7fafc;">
    <!-- Navigation Bar -->
    <nav style="background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); position: sticky; top: 0; z-index: 50;">
      <div style="max-width: 1280px; margin: 0 auto; padding: 0 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; height: 4rem;">
          <div style="display: flex; align-items: center;">
            <span style="font-size: 1.5rem; font-weight: bold; color: #2563eb;">🎓 EduShare</span>
          </div>
          <div class="nav-links" style="display: none; align-items: center; gap: 2rem;">
            <router-link to="/home" style="color: #4b5563; text-decoration: none; transition: color 0.2s;">Home</router-link>
            <router-link to="/requests" style="color: #4b5563; text-decoration: none; transition: color 0.2s;">Browse</router-link>
            <router-link to="/messages" style="color: #4b5563; text-decoration: none; transition: color 0.2s;">Messages</router-link>
            <router-link to="/donation" style="color: #4b5563; text-decoration: none; transition: color 0.2s;">Donate</router-link>
          </div>
          <div style="display: flex; align-items: center;">
            <button v-if="isAuthenticated" @click="handleLogout" style="background-color: #fee2e2; color: #dc2626; padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer; transition: background-color 0.2s;">
              Logout
            </button>
            <router-link v-else to="/login" style="background-color: #2563eb; color: #ffffff; padding: 0.5rem 1rem; border-radius: 0.5rem; text-decoration: none; transition: background-color 0.2s;">
              Login
            </router-link>
            <button class="menu-toggle" style="display: none; margin-left: 1rem; padding: 0.5rem; border-radius: 0.5rem; border: none; cursor: pointer; transition: background-color 0.2s;" @click="toggleMenu">
              <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <!-- Mobile Menu -->
        <div v-if="showMenu" class="mobile-menu" style="display: none; background-color: #ffffff; border-top: 1px solid #e5e7eb;">
          <router-link to="/home" style="display: block; padding: 0.5rem 1rem; color: #4b5563; text-decoration: none;">Home</router-link>
          <router-link to="/requests" style="display: block; padding: 0.5rem 1rem; color: #4b5563; text-decoration: none;">Browse</router-link>
          <router-link to="/messages" style="display: block; padding: 0.5rem 1rem; color: #4b5563; text-decoration: none;">Messages</router-link>
          <router-link to="/donation" style="display: block; padding: 0.5rem 1rem; color: #4b5563; text-decoration: none;">Donate</router-link>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px;">
      <div style="animation: pulse 2s infinite; width: 100%; max-width: 672px;">
        <div style="height: 160px; background-color: #e5e7eb; border-radius: 0.5rem;"></div>
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <div style="height: 96px; width: 96px; background-color: #e5e7eb; border-radius: 50%;"></div>
          <div style="flex: 1;">
            <div style="height: 24px; background-color: #e5e7eb; border-radius: 0.25rem; margin-bottom: 0.5rem;"></div>
            <div style="height: 16px; background-color: #e5e7eb; border-radius: 0.25rem;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; background-color: #fef2f2; border-radius: 0.5rem; padding: 1.5rem; margin: 1rem;">
      <p style="color: #dc2626; font-weight: 500; margin-bottom: 1rem;">⚠️ {{ error }}</p>
      <button @click="fetchData" style="background-color: #2563eb; color: #ffffff; padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer; transition: background-color 0.2s;">
        Try Again
      </button>
    </div>

    <!-- Unauthenticated State -->
    <div v-else-if="!isAuthenticated" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px;">
      <p style="font-size: 1.125rem; color: #4b5563;">
        Please <router-link to="/login" style="color: #2563eb; text-decoration: underline;">login</router-link> to view your profile
      </p>
    </div>

    <!-- Authenticated Content -->
    <template v-else>
      <!-- Profile Header -->
      <div style="position: relative; height: 256px; background: linear-gradient(to right, #3b82f6, #4f46e5);">
        <div style="position: absolute; inset: 0; background: url('https://images.pexels.com/photos/1333742/pexels-photo-1333742.jpeg') center/cover; opacity: 0.3;"></div>
      </div>

      <!-- Profile Info Section -->
      <div style="max-width: 1280px; margin: 0 auto; padding: 0 1rem; margin-top: -4rem;">
        <div style="background-color: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 1.5rem; display: flex; flex-direction: column; align-items: center;">
          <img :src="user.profile_pic || defaultProfilePic" alt="Profile Picture" style="width: 128px; height: 128px; border-radius: 50%; border: 4px solid #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); object-fit: cover;" loading="lazy" />
          <div style="margin-top: 1rem; text-align: center; flex: 1;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <h1 style="font-size: 1.5rem; font-weight: bold; color: #111827;">{{ user.full_name }}</h1>
              <span v-if="user.organization_id" style="background-color: #d1fae5; color: #059669; font-size: 0.75rem; font-weight: 500; padding: 0.25rem 0.5rem; border-radius: 9999px;">Verified NGO</span>
            </div>
            <p style="margin-top: 0.5rem; color: #4b5563;">{{ user.bio || 'No bio available' }}</p>
            <router-link to="/edit-profile" style="display: inline-block; margin-top: 1rem; background-color: #2563eb; color: #ffffff; padding: 0.5rem 1rem; border-radius: 0.5rem; text-decoration: none; transition: background-color 0.2s;">
              Edit Profile
            </router-link>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div style="max-width: 1280px; margin: 0 auto; padding: 2rem 1rem; display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Left Column -->
        <div style="width: 100%;">
          <div style="background-color: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 1.5rem;">
            <h2 style="font-size: 1.125rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Impact Statistics</h2>
            <div style="display: grid; gap: 1rem;">
              <div>
                <h3 style="font-size: 1.5rem; font-weight: bold; color: #2563eb;">{{ userStats.total_donations || '0' }}</h3>
                <p style="font-size: 0.875rem; color: #4b5563;">Total Donations</p>
              </div>
              <div>
                <h3 style="font-size: 1.5rem; font-weight: bold; color: #2563eb;">{{ userStats.beneficiaries_reached || '1' }}+</h3>
                <p style="font-size: 0.875rem; color: #4b5563;">Beneficiaries Reached</p>
              </div>
              <div>
                <h3 style="font-size: 1.5rem; font-weight: bold; color: #2563eb;">{{ userStats.categories_covered || '1' }}</h3>
                <p style="font-size: 0.875rem; color: #4b5563;">Categories Covered</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div style="width: 100%; display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Recent Donations -->
          <div style="background-color: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 1.5rem;">
            <h2 style="font-size: 1.125rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Recent Donations</h2>
            <div v-if="donations.length === 0" style="text-align: center; color: #4b5563; padding: 1rem;">
              No donations yet
            </div>
            <div v-else style="display: flex; flex-direction: column; gap: 1rem;">
              <div v-for="donation in donations" :key="donation.donation_id" style="display: flex; gap: 1rem; padding: 1rem; border-radius: 0.5rem; transition: background-color 0.2s;">
                <img :src="donation.image_link || placeholderImage" :alt="donation.title" style="width: 96px; height: 80px; object-fit: cover; border-radius: 0.375rem;" loading="lazy" />
                <div style="flex: 1;">
                  <h3 style="font-size: 1rem; font-weight: 500; color: #111827;">{{ donation.title }}</h3>
                  <p style="font-size: 0.875rem; color: #4b5563; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ donation.description || 'No description available' }}</p>
                  <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
                    {{ donation.status }} • {{ formatDate(donation.created_at) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Connected Organizations -->
          <div style="background-color: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 1.5rem;">
            <h2 style="font-size: 1.125rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Connected Organizations</h2>
            <div v-if="organizations.length === 0" style="text-align: center; color: #4b5563; padding: 1rem;">
              No connected organizations
            </div>
            <div v-else style="display: grid; gap: 1rem;">
              <div v-for="org in organizations" :key="org.org_id" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; border-radius: 0.5rem; transition: background-color 0.2s;">
                <img :src="org.logo || placeholderOrgImage" :alt="org.name" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;" loading="lazy" />
                <div>
                  <p style="font-size: 0.875rem; font-weight: 500; color: #111827;">{{ org.name }}</p>
                  <p style="font-size: 0.75rem; color: #4b5563;">{{ org.relationship || 'Member' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div style="background-color: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 1.5rem;">
            <h2 style="font-size: 1.125rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Quick Actions</h2>
            <div style="display: grid; gap: 1rem;">
              <router-link to="/create-request" style="background-color: #2563eb; color: #ffffff; text-align: center; padding: 0.5rem 1rem; border-radius: 0.5rem; text-decoration: none; transition: background-color 0.2s;">
                Create Request
              </router-link>
              <button @click="shareProfile" style="background-color: #f3f4f6; color: #374151; text-align: center; padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer; transition: background-color 0.2s;">
                Share Profile
              </button>
              <button @click="generateReport" style="background-color: #f3f4f6; color: #374151; text-align: center; padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer; transition: background-color 0.2s;">
                My Donations
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

const router = useRouter()

export default {
  name: 'DonorProfile',
  data() {
    return {
      user: {},
      userStats: {},
      donations: [],
      organizations: [],
      loading: true,
      error: null,
      showMenu: false,
      defaultProfilePic: 'https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000',
      placeholderImage: 'https://th.bing.com/th/id/OIP.EB_XenvrD5mgCpdq6-wyvQHaFO?cb=iwc2&rs=1&pid=ImgDetMain',
      placeholderOrgImage: 'https://th.bing.com/th/id/OIP.EB_XenvrD5mgCpdq6-wyvQHaFO?cb=iwc2&rs=1&pid=ImgDetMain',
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('userId') || !!this.$currentUser?.id
    },
    userId() {
      return localStorage.getItem('userId') || this.$currentUser?.id || this.user.user_id
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    async handleResponse(response) {
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(text || 'Invalid server response')
      }
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Request failed')
      }
      return data
    },
    async fetchData() {
      this.loading = true
      this.error = null
      try {
        const verifyResponse = await fetch('http://localhost:5038/api/auth/verify', {
          credentials: 'include',
        })
        const verifiedUser = await this.handleResponse(verifyResponse)
        const userId = verifiedUser.userId || this.userId
        if (!userId) throw new Error('No user ID available')
        const [profile, stats, donations, orgs] = await Promise.all([
          fetch(`http://localhost:5038/api/users/${userId}`, {
            credentials: 'include',
          }).then(this.handleResponse),
          fetch(`http://localhost:5038/api/users/${userId}/stats`, {
            credentials: 'include',
          }).then(this.handleResponse),
          fetch(`http://localhost:5038/api/users/donations/${userId}`, {
            credentials: 'include',
          })
            .then(this.handleResponse)
            .then((donations) =>
              donations.map((d) => ({
                ...d,
                description: d.description || 'No description provided',
                image_link: d.image_link || this.placeholderImage,
              })),
            ),
          fetch(`http://localhost:5038/api/users/${userId}/organizations`, {
            credentials: 'include',
          })
            .then(this.handleResponse)
            .then((orgs) =>
              orgs.map((o) => ({
                ...o,
                logo: 'https://th.bing.com/th/id/OIP.EB_XenvrD5mgCpdq6-wyvQHaFO?cb=iwc2&rs=1&pid=ImgDetMain',
              })),
            ),
        ])
        this.user = profile
        this.userStats = stats
        this.donations = donations
        this.organizations = orgs
      } catch (error) {
        console.error('Failed to load profile data:', error)
        this.error = error.message.includes('Not authenticated')
          ? 'Please login to view your profile'
          : 'Failed to load profile data'
        if (error.message.includes('Not authenticated')) {
          localStorage.removeItem('userId')
          this.$router.push('/login')
        }
      } finally {
        this.loading = false
      }
    },
    async handleLogout() {
      try {
        await fetch('http://localhost:5038/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        })
        localStorage.removeItem('userId')
        if (this.$currentUser) {
          this.$currentUser.id = null
          this.$currentUser.email = null
          this.$currentUser.role = null
        }
        this.user = {}
        this.$router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
        this.error = 'Failed to logout. Please try again.'
      }
    },
    shareProfile() {
      if (navigator.share) {
        navigator
          .share({
            title: `${this.user.full_name}'s Profile`,
            text: `Check out ${this.user.full_name}'s profile on EduShare`,
            url: window.location.href,
          })
          .catch((err) => console.log('Error sharing:', err))
      } else {
        navigator.clipboard.write(window.location.href)
          .then(() => alert('Profile URL copied to clipboard!'))
          .catch(() => alert(`Share this URL: ${window.location.href}`))
      }
    },
    generateReport() {
      this.$router.push('/donations')
    },
  },
  created() {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      this.user = { user_id: storedUserId }
    }
    this.fetchData()
  },
}
</script>

<style scoped>
/* Hover effects */
a:hover, button:hover {
  opacity: 0.9;
}

/* Navigation links for desktop */
@media (min-width: 768px) {
  .nav-links {
    display: flex !important;
  }
  .menu-toggle {
    display: none !important;
  }
}

/* Mobile menu */
@media (max-width: 767px) {
  .mobile-menu {
    display: block !important;
  }
}

/* Profile info section for larger screens */
@media (min-width: 640px) {
  .profile-page > div > div > div {
    flex-direction: row !important;
    align-items: flex-start !important;
  }
  .profile-page > div > div > div > div {
    margin-top: 0 !important;
    margin-left: 1.5rem !important;
    text-align: left !important;
  }
  .profile-page > div > div > div > div > div {
    justify-content: flex-start !important;
  }
}

/* Main content layout for larger screens */
@media (min-width: 1024px) {
  .profile-page > div:last-child {
    flex-direction: row !important;
  }
  .profile-page > div:last-child > div:first-child {
    width: 33.333% !important;
  }
  .profile-page > div:last-child > div:last-child {
    width: 66.667% !important;
  }
}

/* Connected organizations grid */
@media (min-width: 640px) {
  .profile-page > div:last-child > div:last-child > div:nth-child(2) > div:last-child {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

/* Quick actions grid */
@media (min-width: 640px) {
  .profile-page > div:last-child > div:last-child > div:last-child > div {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

/* Pulse animation for loading state */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
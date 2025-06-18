<template>
  <div class="notification-page">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <h1>EduShare</h1>
        <div class="user-info">
          <span>{{ organizationName }}</span>
          <div class="user-profile"></div>
          <router-link to="/ngoprofile" class="profile-link">
            <i class="fas fa-cog"></i>
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="main-container">
      <!-- Notifications Header -->
      <div class="notifications-header">
        <div>
          <h2>Notifications</h2>
          <p>Manage and track your recent activities</p>
        </div>
      </div>

      <!-- Controls -->
      <div class="controls">
        <div class="filters">
          <button class="filter-btn" :class="{ active: filter === 'all' }" @click="filter = 'all'">
            All Notifications
          </button>
          <button
            class="filter-btn"
            :class="{ active: filter === 'unread' }"
            @click="filter = 'unread'"
          >
            Unread
          </button>
        </div>
        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Search notifications..." />
          <i class="fas fa-search"></i>
        </div>
        <button class="mark-all-btn" @click="markAllAsRead">Mark all as read</button>
      </div>

      <!-- Notifications List -->
      <div class="notifications-list">
        <div
          v-for="(notification, index) in filteredNotifications"
          :key="index"
          class="notification-item"
          :class="{ unread: !notification.read }"
        >
          <div class="notification-icon">
            <i :class="notificationIcon(notification.type)"></i>
          </div>
          <div class="notification-content">
            <h3>{{ notification.title }}</h3>
            <p>{{ notification.message }}</p>
            <span class="notification-time">{{ notification.time }}</span>
          </div>
          <button class="action-btn" @click="handleNotificationAction(notification)">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <div class="pagination-info">
          Showing {{ paginationStart }} to {{ paginationEnd }} of {{ totalNotifications }} entries
        </div>
        <div class="pagination-controls">
          <button class="page-btn" @click="currentPage--" :disabled="currentPage === 1">
            Previous
          </button>
          <span class="current-page">Page {{ currentPage }}</span>
          <button class="page-btn" @click="currentPage++" :disabled="currentPage === totalPages">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationPage',
  data() {
    return {
      organizationName: 'Hope Foundation',
      searchQuery: '',
      filter: 'all',
      currentPage: 1,
      itemsPerPage: 10,
      notifications: [
        {
          id: 1,
          type: 'donation',
          title: 'New Donation Received',
          message: 'John Doe donated 50 textbooks to your organization',
          time: '2 hours ago',
          read: false,
        },
        {
          id: 2,
          type: 'match',
          title: 'New Potential Match',
          message: '3 new matches found for your resource request',
          time: '5 hours ago',
          read: true,
        },
        {
          id: 3,
          type: 'system',
          title: 'System Update',
          message: 'Scheduled maintenance on Saturday at 10 PM',
          time: '1 day ago',
          read: false,
        },
        {
          id: 4,
          type: 'message',
          title: 'New Message',
          message: 'You have a new message from Tech for Good',
          time: '2 days ago',
          read: true,
        },
      ],
    }
  },
  computed: {
    filteredNotifications() {
      return this.notifications.filter((notification) => {
        const matchesSearch =
          notification.message.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          notification.title.toLowerCase().includes(this.searchQuery.toLowerCase())

        const matchesFilter =
          this.filter === 'all' || (this.filter === 'unread' && !notification.read)

        return matchesSearch && matchesFilter
      })
    },
    totalNotifications() {
      return this.filteredNotifications.length
    },
    totalPages() {
      return Math.ceil(this.totalNotifications / this.itemsPerPage)
    },
    paginationStart() {
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    paginationEnd() {
      const end = this.currentPage * this.itemsPerPage
      return end > this.totalNotifications ? this.totalNotifications : end
    },
  },
  methods: {
    notificationIcon(type) {
      const icons = {
        donation: 'fas fa-hand-holding-heart',
        match: 'fas fa-handshake',
        system: 'fas fa-cog',
        message: 'fas fa-envelope',
      }
      return icons[type] || 'fas fa-bell'
    },
    markAllAsRead() {
      this.notifications = this.notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    },
    handleNotificationAction(notification) {
      // Implement specific actions
      this.$router.push(`/notification/${notification.id}`)
    },
  },
  watch: {
    searchQuery() {
      this.currentPage = 1
    },
  },
}
</script>

<style scoped>
.notification-page {
  background-color: #f8fafc;
  min-height: 100vh;
}

.header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e2e8f0;
}

.profile-link {
  color: #64748b;
  font-size: 1.2rem;
}

.main-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.notifications-header h2 {
  font-size: 24px;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  gap: 1rem;
  flex-wrap: wrap;
}

.filters {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.search-container {
  position: relative;
  flex-grow: 1;
  max-width: 400px;
}

.search-container input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.search-container .fa-search {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.mark-all-btn {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.notifications-list {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.notification-item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  gap: 1.5rem;
}

.notification-item.unread {
  background-color: #f8fafc;
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0ea5e9;
}

.notification-content {
  flex-grow: 1;
}

.notification-content h3 {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.notification-content p {
  color: #64748b;
  margin-bottom: 0.25rem;
}

.notification-time {
  font-size: 0.875rem;
  color: #94a3b8;
}

.action-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem 0;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-page {
  color: #64748b;
  margin: 0 1rem;
}
</style>

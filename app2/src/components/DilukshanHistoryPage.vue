<template>
  <div>
    <!-- Header -->
    <header>
      <div class="header-container">
        <h1>ResourceTrack</h1>
        <nav>
          <router-link to="/">Dashboard</router-link>
          <router-link to="/resources">Resources</router-link>
          <router-link to="/history" class="active">History</router-link>
          <router-link to="/reports">Reports</router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <div class="main-container">
      <!-- Controls -->
      <div class="controls">
        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Search resources..." />
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div class="filter-buttons">
          <button class="filter-btn">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v6.586a1 1 0 01-1.707.707l-2-2a1 1 0 01-.293-.707v-4.586a1 1 0 00-.293-.707L4.293 7.293A1 1 0 014 6.586V4z"
              ></path>
            </svg>
            Filters
          </button>
          <button class="filter-btn">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Date Range
          </button>
          <button class="filter-btn">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Export
          </button>
        </div>
      </div>

      <!-- History Table -->
      <table class="history-table">
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Type</th>
            <th>Request Time</th>
            <th>Status</th>
            <th>Requestor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in paginatedRequests" :key="index">
            <td>{{ request.name }}</td>
            <td>{{ request.type }}</td>
            <td>{{ request.time }}</td>
            <td>
              <span :class="['status', request.status.toLowerCase()]">{{ request.status }}</span>
            </td>
            <td>{{ request.requestor }}</td>
            <td>
              <div class="actions">
                <button class="action-btn">View</button>
                <button class="action-btn">Edit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination">
        <div class="pagination-info">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
          {{ Math.min(currentPage * itemsPerPage, requests.length) }} of
          {{ requests.length }} entries
        </div>
        <div class="pagination-buttons">
          <button class="page-btn" @click="currentPage--" :disabled="currentPage === 1">❮</button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button class="page-btn" @click="currentPage++" :disabled="currentPage === totalPages">
            ❯
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  data() {
    return {
      searchQuery: '',
      requests: [
        {
          name: 'Machine Learning Guide',
          type: 'Document',
          time: '2024-01-20 08:45 AM',
          status: 'Success',
          requestor: 'Sarah Chen',
        },
        // ... rest of your requests data
      ],
      currentPage: 1,
      itemsPerPage: 5,
    }
  },
  computed: {
    filteredRequests() {
      return this.requests.filter(
        (request) =>
          request.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.requestor.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
    totalPages() {
      return Math.ceil(this.filteredRequests.length / this.itemsPerPage)
    },
    paginatedRequests() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredRequests.slice(start, end)
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
body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  margin: 0;
  background-color: #f5f5f5;
}
header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 32px;
  position: sticky;
  top: 0;
  z-index: 10;
}
.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-container h1 {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}
nav {
  display: flex;
  align-items: center;
}
nav a {
  color: #4b5563;
  text-decoration: none;
  margin-left: 24px;
  font-size: 16px;
}
nav a:hover {
  color: #111827;
}
nav a.active {
  color: #2563eb;
  font-weight: 600;
}
.main-container {
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 32px;
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.search-container {
  position: relative;
  width: 300px;
}
.search-container input {
  width: 100%;
  padding: 8px 16px 8px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}
.search-container input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.search-container svg {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
}
.filter-buttons {
  display: flex;
  gap: 12px;
}
.filter-btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  transition: background-color 0.3s;
}
.filter-btn:hover {
  background-color: #f3f4f6;
}
.history-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}
.history-table th,
.history-table td {
  padding: 16px;
  text-align: left;
  font-size: 14px;
  color: #1f2937;
}
.history-table th {
  background-color: #f3f4f6;
  font-weight: 600;
}
.history-table td {
  border-top: 1px solid #e5e7eb;
}
.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}
.status.success {
  background-color: #d1fae5;
  color: #059669;
}
.status.pending {
  background-color: #fef9c3;
  color: #ca8a04;
}
.status.failed {
  background-color: #fee2e2;
  color: #dc2626;
}
.actions {
  display: flex;
  gap: 8px;
}
.action-btn {
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  color: #4b5563;
  transition: background-color 0.3s;
}
.action-btn:hover {
  background-color: #f3f4f6;
}
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
.pagination-info {
  font-size: 14px;
  color: #6b7280;
}
.pagination-buttons {
  display: flex;
  gap: 8px;
}
.page-btn {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  color: #4b5563;
  transition: background-color 0.3s;
}
.page-btn:hover {
  background-color: #f3f4f6;
}
.page-btn.active {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}
.page-btn:disabled {
  color: #d1d5db;
  cursor: not-allowed;
}
</style>

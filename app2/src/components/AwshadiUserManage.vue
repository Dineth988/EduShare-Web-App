<template>
  <div class="user-management-container">
    <div class="header">
      <h1>User Management</h1>
      <button class="add-user-btn" @click="goToAddUser">+ Add New User</button>
    </div>

    <div class="controls">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search users..." 
          @input="filterUsers"
        >
        <span class="search-icon">🔍</span>
      </div>
      <div class="filter-controls">
        <select v-model="roleFilter" @change="filterUsers">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        <select v-model="statusFilter" @change="filterUsers">
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>

    <div class="user-table-card">
      <table class="user-table">
        <thead>
          <tr>
            <th @click="sortUsers('user_id')">ID ▲▼</th>
            <th @click="sortUsers('full_name')">Full Name ▲▼</th>
            <th @click="sortUsers('email')">Email ▲▼</th>
            <th @click="sortUsers('role')">Role ▲▼</th>
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user._id">
            <td>{{ user.user_id }}</td>
            <td>{{ user.full_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            
            <td class="actions">
              <button class="edit-btn" @click="editUser(user)">
                <span>✏️</span> Edit
              </button>
              <button class="delete-btn" @click="confirmDelete(user)">
                <span>🗑️</span> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredUsers.length === 0" class="no-results">
        No users found matching your criteria.
      </div>

      <div class="pagination" v-if="filteredUsers.length > 0">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// User data from API
const users = ref([])

// Filter and sort functionality
const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const sortField = ref('user_id')
const sortDirection = ref('asc')
const currentPage = ref(1)
const itemsPerPage = ref(5)

const filteredUsers = computed(() => {
  let result = users.value
  
  // Apply filters
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(user => 
      user.full_name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    )
  }
  
  if (roleFilter.value) {
    result = result.filter(user => user.role === roleFilter.value)
  }
  
  // Apply sorting
  result = [...result].sort((a, b) => {
    let comparison = 0
    if (a[sortField.value] > b[sortField.value]) comparison = 1
    if (a[sortField.value] < b[sortField.value]) comparison = -1
    return sortDirection.value === 'asc' ? comparison : -comparison
  })
  
  // Apply pagination
  const start = (currentPage.value - 1) * itemsPerPage.value
  return result.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage.value)
})

// Methods
const filterUsers = () => {
  currentPage.value = 1
}

const sortUsers = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const goToAddUser = () => {
  router.push('/add-user')
}

const editUser = (user) => {
  router.push(`/edit-user/${user._id}`)
}

const confirmDelete = (user) => {
  if (confirm(`Are you sure you want to delete ${user.full_name}?`)) {
    deleteUser(user._id)
  }
}

const deleteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:5030/api/users/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      users.value = users.value.filter(user => user._id !== id)
    } else {
      console.error('Failed to delete user')
    }
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Fetch users from API
const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:5030/api/users')
    if (response.ok) {
      users.value = await response.json()
    } else {
      console.error('Failed to fetch users')
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.user-management-container {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0;
}

.add-user-btn {
  background-color: #3498db;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-user-btn:hover {
  background-color: #2980b9;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex-grow: 1;
}

.search-box input {
  width: 100%;
  padding: 0.6rem 2rem 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  font-size: 1rem;
}

.search-icon {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.filter-controls {
  display: flex;
  gap: 0.8rem;
}

.filter-controls select {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  font-size: 1rem;
}

.user-table-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.user-table th, .user-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.user-table th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  user-select: none;
}

.user-table th:hover {
  background-color: #e2e8f0;
}

.user-table tr:hover td {
  background-color: #f8fafc;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s;
}

.edit-btn {
  background-color: #f59e0b;
  color: white;
}

.edit-btn:hover {
  background-color: #d97706;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.delete-btn:hover {
  background-color: #dc2626;
}

.no-results {
  padding: 2rem;
  text-align: center;
  color: #64748b;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #e2e8f0;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination button:hover:not(:disabled) {
  background-color: #cbd5e1;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  color: #64748b;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .filter-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .user-table th, .user-table td {
    padding: 0.5rem;
  }
  
  .actions {
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>
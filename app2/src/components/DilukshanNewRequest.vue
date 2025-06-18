<template>
  <div id="app">
    <!-- Header -->
    <header>
      <div class="header-container">
        <h1>EduShare</h1>
        <nav>
          <router-link to="/">Dashboard</router-link>
          <router-link to="/resources">Resources</router-link>
          <router-link to="/newrequests">Requests</router-link>
          <!-- <router-link to="/reports">Reports</router-link> -->

          <router-link to="/notifications" class="notification-link">
            <i class="fas fa-bell"></i>
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <h2 class="main-title">New Resource Request</h2>

      <!-- Resource Details Section -->
      <div class="section-title">Resource Details</div>
      <div class="form-group">
        <label>Title <span>*</span></label>
        <input type="text" v-model="form.resourceName" placeholder="Enter resource name" />
        <p v-if="errors.resourceName" class="error">
          {{ errors.resourceName }}
        </p>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Resource Type <span>*</span></label>
          <input type="text" v-model="form.resourceType" placeholder="Enter resource type" />
          <p v-if="errors.resourceType" class="error">
            {{ errors.resourceType }}
          </p>
        </div>
        <div class="form-group">
          <label>Urgency <span>*</span></label>
          <select v-model="form.priority">
            <option value="" disabled>Select priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <p v-if="errors.priority" class="error">{{ errors.priority }}</p>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Quantity needed <span>*</span></label>
          <input type="text" v-model="form.quantity" placeholder="Enter qty" />
          <p v-if="errors.quantity" class="error">
            {{ errors.quantity }}
          </p>
        </div>
        <div class="form-group">
          <label>city <span>*</span></label>
          <input type="text" v-model="form.city" placeholder="Enter city" />
          <p v-if="errors.city" class="error">{{ errors.city }}</p>
        </div>
      </div>

      <!-- Request Info -->
      <div class="form-group">
        <label>Condition Preference <span>*</span></label>
        <textarea v-model="form.condition" placeholder="Provide a condition of resource"></textarea>
        <p v-if="errors.condition" class="error">{{ errors.condition }}</p>
      </div>

      <!-- Buttons -->
      <div class="buttons">
        <button class="btn save" @click="close">Close</button>
        <button class="btn confirm" @click="confirmRequest">Confirm</button>
      </div>
    </main>
  </div>
  <div v-if="successMessage" class="success-message">
    {{ successMessage }}
  </div>
</template>
<script>
import axios from 'axios'
// import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'NewRequest',
  data() {
    return {
      form: {
        resourceName: '',
        resourceType: '',
        priority: '',
        quantity: '',
        city: '',
        condition: '',
      },
      errors: {},
      isLoading: false,
      errorMessage: '',
      successMessage: '',
    }
  },
  methods: {
    validateForm() {
      this.errors = {}
      if (!this.form.resourceName) this.errors.resourceName = 'Resource Name is required.'
      if (!this.form.resourceType) this.errors.resourceType = 'Request Type is required.'
      if (!this.form.priority) this.errors.priority = 'Priority is required.'
      if (!this.form.quantity || isNaN(this.form.quantity))
        this.errors.quantity = 'Valid quantity is required.'
      if (!this.form.city) this.errors.city = 'City is required.'
      if (!this.form.condition) this.errors.condition = 'Condition is required.'

      return Object.keys(this.errors).length === 0
    },
    close() {
      this.$router.go(-1) // Navigate back
    },

    async confirmRequest() {
      if (!this.validateForm()) return

      this.isLoading = true
      try {
        const authStore = useAuthStore()
        const response = await axios.post(
          'http://localhost:3000/api/requests',
          {
            title: this.form.resourceName,
            resource_type: this.form.resourceType,
            quantity_needed: parseInt(this.form.quantity),
            urgency: this.form.priority.toLowerCase(),
            condition_preference: this.form.condition,
            city: this.form.city,
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          },
        )

        this.successMessage = 'Request created successfully!'
        this.resetForm()
        setTimeout(() => {
          this.close()
        }, 1500)
      } catch (err) {
        this.errorMessage = err.response?.data?.error || 'Failed to create request.'
      } finally {
        this.isLoading = false
      }
    },
  },
  resetForm() {
    this.form = {
      resourceName: '',
      resourceType: '',
      priority: '',
      quantity: '',
      city: '',
      condition: '',
    }
    this.errors = {}
  },

  mounted() {
    const draft = localStorage.getItem('resourceDraft')
    if (draft) {
      this.form = JSON.parse(draft)
    }
  },
}
</script>

<style scoped>
/* Base Styles */
:root {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --secondary: #6b7280;
  --success: #10b981;
  --danger: #ef4444;
  --light-bg: #f8fafc;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
}

#app {
  min-height: 100vh;
  background: var(--light-bg);
}

/* Header Styles */
header {
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(79, 70, 229, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.success-message {
  color: #10b981;
  background: #d1fae5;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #a7f3d0;
}

.header-container h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

nav a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

nav a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.15);
  font-weight: 600;
}

.notification-link {
  position: relative;
  padding: 0.5rem;
}

.notification-link i {
  font-size: 1.2rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.notification-link::after {
  content: '3';
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--danger);
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Main Content */
main {
  max-width: 800px;
  margin: 2rem auto;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  transform: translateY(0);
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
  position: relative;
  padding-left: 1.5rem;
}

.main-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 70%;
  width: 4px;
  background: var(--primary);
  border-radius: 4px;
}

/* Form Styles */
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
  margin: 2rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title::before {
  content: '📦';
  font-size: 1.2em;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: #374151;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  outline: none;
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

.form-group textarea {
  min-height: 100px;
  line-height: 1.6;
}

/* Buttons */
.buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
}

.btn {
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* .btn.save {
  background: white;
  color: var(--secondary);
  border: 2px solid #e5e7eb;
}

.btn.save:hover {
  background: #f3f4f6;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
} */

.btn.confirm {
  background: linear-gradient(135deg, var(--primary) 0%, #3730a3 100%);
  color: rgb(50, 90, 221);
  border: none;

  position: relative;
  overflow: hidden;
}

.btn.confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
  border: 2px solid rgb(106, 112, 197);
}

.btn.confirm::after {
  content: '✓';
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.3s ease;
}

.btn.confirm:hover::after {
  right: 20px;
  opacity: 1;
}

/* Error States */
.error {
  color: var(--danger);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error::before {
  content: '⚠️';
}

/* Responsive Design */
@media (max-width: 768px) {
  main {
    margin: 1rem;
    padding: 1.5rem;
  }

  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .form-row {
    flex-direction: column;
  }
}
</style>

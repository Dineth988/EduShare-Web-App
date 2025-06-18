<template>
  <div class="schedule-donation">
    <nav class="nav-bar">
      <div class="logo">EduShare</div>
      <div class="nav-links">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/donations">Donations</router-link>
        <router-link to="/upcoming">Upcoming</router-link>
        <router-link to="/profile">Profile</router-link>
      </div>
      <div class="user-profile">
        <img :src="userProfileImage" alt="User" />
        <span>{{ userName }}</span>
      </div>
    </nav>

    <div class="container">
      <div class="form-section">
        <h2>{{ isEditing ? 'Edit Donation' : 'Schedule Upcoming Donation' }}</h2>
        <form @submit.prevent="submitDonation">
          <div class="form-group">
            <label for="type">Resource Type</label>
            <select v-model="form.type" id="type" required>
              <option value="" disabled>Select Resource Type</option>
              <option value="Science Lab Equipment">Science Lab Equipment</option>
              <option value="Digital Tablets">Digital Tablets</option>
              <option value="Library Resources">Library Resources</option>
              <option value="Sports Equipment">Sports Equipment</option>
            </select>
          </div>
          <div class="form-group">
            <label for="school">School/Organization</label>
            <input v-model="form.school" id="school" type="text" required />
          </div>
          <div class="form-group">
            <label for="location">Location</label>
            <input v-model="form.location" id="location" type="text" required />
          </div>
          <div class="form-group">
            <label for="value">Value ($)</label>
            <input v-model.number="form.value" id="value" type="number" min="1" required />
          </div>
          <div class="form-group">
            <label for="Status">status</label>
            <input v-model="form.status" id="status" type="text" required />
          </div>

          <div class="form-group">
            <label for="date">Scheduled Date</label>
            <input v-model="form.date" id="date" type="date" required />
          </div>
          <div class="form-group">
            <label for="schoolImage">School Image URL (Optional)</label>
            <input v-model="form.schoolImage" id="schoolImage" type="url" />
          </div>
          <div class="form-actions">
            <button type="submit" class="primary-btn">
              <i>💾</i> {{ isEditing ? 'Update Donation' : 'Confirm' }}
            </button>
            <button type="button" class="secondary-btn" @click="$router.push('/upcoming')">
              <i>❌</i> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { Router } from 'vue-router'

export default defineComponent({
  name: 'ScheduleDonation',
  props: {
    id: String,
  },
  data() {
    return {
      userName: 'John Doe',
      userProfileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      donorId: 'b1ffc399-8d1c-5fga-cc7d-7cc8ce490b22',
      isEditing: false,
      donationId: '',
      form: {
        type: '',
        school: '',
        location: '',
        value: 0,
        status: 'scheduled',
        date: this.getDefaultDate(),
        schoolImage: '',
      },
    }
  },
  methods: {
    getDefaultDate() {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    },
    async submitDonation(this: { $router: Router } & { 
      donorId: string; 
      form: any; 
      isEditing: boolean; 
      donationId: string 
    }) {
      try {
        const donationData = {
          donor_id: this.donorId,
          type: this.form.type,
          school: this.form.school,
          location: this.form.location,
          value: this.form.value,
          status: this.form.status,
          date: this.form.date,
          schoolImage: this.form.schoolImage,
        }

        if (this.isEditing) {
          await axios.put(
            `http://localhost:5038/api/upcoming_donations/${this.donationId}`,
            donationData,
          )
          alert('Donation updated successfully!')
        } else {
          await axios.post('http://localhost:5038/api/upcoming_donations', donationData)
          alert('Donation scheduled successfully!')
        }
        this.$router.push('/upcoming') // Use $router instead of router
      } catch (error) {
        console.error('Failed to submit donation:', error)
        alert('Error submitting donation. Please try again later.')
      }
    },
    async fetchDonation(id: string) {
      try {
        const response = await axios.get(`http://localhost:5038/api/upcoming_donations/${id}`)
        const donation = response.data
        this.form.type = donation.type
        this.form.school = donation.school
        this.form.location = donation.location
        this.form.value = donation.value
        this.form.status = donation.status
        this.form.date = donation.date.split('T')[0]
        this.form.schoolImage = donation.schoolImage
        this.donationId = id
        this.isEditing = true
      } catch (error) {
        console.error('Failed to fetch donation:', error)
        alert('Error loading donation data.')
      }
    },
  },
  created() {
    if (this.id) {
      this.fetchDonation(this.id)
    }
  },
})
</script>

<style scoped>
.schedule-donation {
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
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* Form Section */
.form-section {
  background-color: var(--card-bg);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  color: var(--text-color);
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.form-actions button {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-actions .primary-btn {
  background-color: var(--primary-color);
  color: white;
}

.form-actions .primary-btn:hover {
  background-color: var(--secondary-color);
}

.form-actions .secondary-btn {
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.form-actions .secondary-btn:hover {
  background-color: #f0f4ff;
}

/* Responsive Design */
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

  .form-section {
    padding: 20px;
  }
}
</style>

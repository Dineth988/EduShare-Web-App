<template>
  <div class="donor-match-container">
    <!-- Header -->
    <header>
      <div class="header-container">
        <h1>EduShare</h1>
        <nav>
          <router-link to="/">Dashboard</router-link>
          <router-link to="/matches">Matches</router-link>
          <router-link to="/ngoprofile">Profile</router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <div class="main-container">
      <!-- Match Header -->
      <div class="match-header">
        <h2>Match Details: #{{ match.id }}</h2>
        <span :class="['status', match.status]">{{ match.status }} Priority</span>
      </div>

      <!-- Match Details -->
      <div class="match-details">
        <!-- Match Info -->
        <div class="match-info">
          <!-- Donor Info -->
          <div class="info-card">
            <div class="avatar"></div>
            <h3>Donor Information</h3>
            <p><strong>Name:</strong> {{ match.donor.name }}</p>
            <p><strong>Email:</strong> {{ match.donor.email }}</p>
            <p><strong>Phone:</strong> {{ match.donor.phone }}</p>
            <p><strong>Location:</strong> {{ match.donor.location }}</p>
          </div>

          <!-- Recipient Info -->
          <div class="info-card">
            <div class="avatar"></div>
            <h3>Recipient Information</h3>
            <p><strong>Organization:</strong> {{ match.recipient.organization }}</p>
            <p><strong>Contact:</strong> {{ match.recipient.contact }}</p>
            <p><strong>Email:</strong> {{ match.recipient.email }}</p>
            <p><strong>Location:</strong> {{ match.recipient.location }}</p>
          </div>
        </div>

        <!-- Resource Details -->
        <div class="post-details">
          <h3>Resource Details</h3>
          <div class="stats">
            <div class="stat">
              <h4>Resource Name</h4>
              <p>{{ match.resource.name }}</p>
            </div>
            <div class="stat">
              <h4>Category</h4>
              <p>{{ match.resource.category }}</p>
            </div>
            <div class="stat">
              <h4>Quantity</h4>
              <p>{{ match.resource.quantity }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions">
          <button class="action-btn decline" @click="declineMatch">Decline Match</button>
          <button class="action-btn accept" @click="acceptMatch">Accept Match</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonorMatch',
  props: ['id'],
  data() {
    return {
      match: {
        id: this.id,
        status: 'High',
        donor: {
          name: 'John Smith',
          email: 'john@edushare.org',
          phone: '+1 555 123-4567',
          location: 'San Francisco, CA',
        },
        recipient: {
          organization: 'Hope Community Center',
          contact: 'Sarah Williams',
          email: 'contact@hopecommunity.org',
          location: '123 Hope Street, CA',
        },
        resource: {
          name: 'Office Desk Chair',
          category: 'Furniture',
          quantity: 5,
        },
      },
    }
  },
  methods: {
    declineMatch() {
      if (confirm('Are you sure you want to decline this match?')) {
        this.$router.go(-1)
      }
    },
    acceptMatch() {
      if (confirm('Confirm acceptance of this match?')) {
        alert('Match accepted successfully!')
        this.$router.push('/matches')
      }
    },
  },
}
</script>

<style scoped>
.donor-match-container {
  background-color: #f5f5f5;
  min-height: 100vh;
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
  font-size: 24px;
  color: #2563eb;
  margin: 0;
}

nav {
  display: flex;
  gap: 24px;
}

nav a {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
}

nav a.router-link-exact-active {
  color: #2563eb;
}

.main-container {
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 32px;
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.match-header h2 {
  font-size: 28px;
  color: #1f2937;
  margin: 0;
}

.status {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.status.high {
  background-color: #fee2e2;
  color: #dc2626;
}

.match-details {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 32px;
}

.match-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.info-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
}

.info-card h3 {
  font-size: 20px;
  color: #1f2937;
  margin: 0 0 16px;
}

.info-card p {
  margin: 8px 0;
  color: #4b5563;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e5e7eb;
  margin-bottom: 16px;
}

.post-details {
  margin-bottom: 32px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat {
  text-align: center;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.stat h4 {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 8px;
}

.stat p {
  font-size: 18px;
  color: #1f2937;
  margin: 0;
  font-weight: 600;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}

.action-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.decline {
  background: white;
  color: #dc2626;
  border: 1px solid #dc2626;
}

.action-btn.decline:hover {
  background: #fee2e2;
}

.action-btn.accept {
  background: #2563eb;
  color: white;
  border: none;
}

.action-btn.accept:hover {
  background: #1d4ed8;
}
</style>

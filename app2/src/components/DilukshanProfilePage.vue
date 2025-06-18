<template>
  <div>
    <!-- Header -->
    <header>
      <div class="header-container">
        <h1>EduShare</h1>
        <nav>
          <router-link to="/">Dashboard</router-link>
          <router-link to="/resources">Resources</router-link>
          <router-link to="/matches">Matches</router-link>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div>
        <h2>{{ ngo?.name }}</h2>
        <p>{{ ngo?.about }}</p>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <!-- Contact Info -->
      <div class="contact-info">
        <div>
          <p>
            <strong>Website:</strong> <a :href="ngo?.website">{{ ngo?.website }}</a>
          </p>
          <p><strong>Contact:</strong> {{ ngo?.contact }}</p>
          <p><strong>Address:</strong> {{ ngo?.address }}</p>
        </div>
        <div>
          <p><strong>Founded:</strong> {{ ngo?.founded }}</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats">
        <div class="stat">
          <h3>$2.5M</h3>
          <p>Total Amount Raised</p>
        </div>
        <div class="stat">
          <h3>50,000+</h3>
          <p>People Helped</p>
        </div>
        <div class="stat">
          <h3>1,200</h3>
          <p>Resources Provided</p>
        </div>
      </div>

      <!-- Mission & Vision -->
      <div class="mission-vision">
        <div>
          <h3>Our Mission</h3>
          <p>{{ ngo?.mission }}</p>
        </div>
        <div>
          <h3>Our Vision</h3>
          <p>{{ ngo?.vision }}</p>
        </div>
      </div>

      <!-- Resources Table -->
      <table class="resources-table">
        <thead>
          <tr>
            <th>Resource Type</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Distribution Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(resource, index) in resources" :key="index">
            <td>{{ resource.type }}</td>
            <td>{{ resource.quantity }}</td>
            <td>{{ resource.value }}</td>
            <td>{{ resource.date }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Recent Requests -->
      <div class="recent-requests">
        <h3>Recent Requests</h3>
        <div class="requests-grid">
          <div class="request-card">
            <h4>Emergency Medical Kits</h4>
            <p>Request ID: REQ-2024-001</p>
            <p>Date: Jan 15, 2024</p>
            <span class="status urgent">Urgent</span>
          </div>
          <div class="request-card">
            <h4>School Supplies</h4>
            <p>Request ID: REQ-2024-002</p>
            <p>Date: Jan 18, 2024</p>
            <span class="status pending">Pending</span>
          </div>
          <div class="request-card">
            <h4>Winter Clothing</h4>
            <p>Request ID: REQ-2024-003</p>
            <p>Date: Jan 20, 2024</p>
            <span class="status pending">Pending</span>
          </div>
          <div class="request-card">
            <h4>Food Packages</h4>
            <p>Request ID: REQ-2024-004</p>
            <p>Date: Jan 22, 2024</p>
            <span class="status completed">Completed</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="footer-container">
        <div class="footer-section">
          <h4>About Us</h4>
          <p>
            Helping Hands Foundation is dedicated to empowering communities through sustainable
            development and humanitarian aid.
          </p>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <p>123 Charity Lane, Hunter City, HC 1345</p>
          <p><a href="#">contact@helpinghands.org</a></p>
          <p>+1 885 125-4567</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <p><a href="#">Programs</a></p>
          <p><a href="#">Donate</a></p>
          <p><a href="#">News</a></p>
        </div>
        <div class="footer-section">
          <h4>Newsletter</h4>
          <p>Stay updated with our latest initiatives</p>
          <form class="newsletter-form" @submit.prevent="subscribe">
            <input type="email" v-model="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Helping Hands Foundation. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProfilePage',
  data() {
    return {
      resources: [],
      email: '',
      ngo: null,
    }
  },
  async mounted() {
    await this.fetchNGOData()
    await this.fetchResources()
  },

  methods: {
    async fetchNGOData() {
      try {
        const response = await axios.get(`http://localhost:3000/api/ngos/6823a77c92797b22232be309`)
        this.ngo = response.data
      } catch (err) {
        console.error('Error fetching NGO data:', err)
      }
    },

    subscribe() {
      if (this.email) {
        alert('Subscribed successfully!')
        this.email = ''
      }
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
  background-color: #ffffff;
}

header {
  background-color: #00194e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 32px;
  position: sticky;
  top: 0;
  border-radius: 10px;
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
  color: #ffffff;
  margin: 0;
}

nav a {
  color: #cdd5e0;
  text-decoration: none;
  margin-left: 24px;
  font-size: 16px;
}

nav a:hover {
  color: #111827;
}

.hero {
  position: relative;
  background:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://th.bing.com/th/id/R.4f6402f4e5540bf1cd53b8c157152ec4?rik=y2%2fskk4Ha%2b%2btag&pid=ImgRaw&r=0')
      center/cover no-repeat;
  height: 400px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
}

.hero h2 {
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 16px;
}

.hero p {
  font-size: 18px;
  margin: 0;
}

.info-section {
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 32px;
}

.contact-info {
  background-color: #dbeafe;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-bottom: 32px;
}

.contact-info p {
  margin: 8px 0;
  color: #1f2937;
  font-size: 16px;
}

.contact-info a {
  color: #2563eb;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  text-align: center;
}

.stat {
  flex: 1;
  padding: 24px;
  background-color: #c7f7d7;
  border-radius: 12px;
  margin: 0 12px;
}

.stat:hover {
  transform: scale(1.05);
}

.stat h3 {
  font-size: 32px;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 8px;
}

.stat p {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.mission-vision {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.mission-vision div {
  flex: 1;
  padding: 24px;
  background-color: #f9fafb;
  border-radius: 12px;
  margin: 0 12px;
}

.mission-vision h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px;
}

.mission-vision p {
  font-size: 16px;
  color: #4b5563;
  margin: 0;
}

.resources-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 32px;
}

.resources-table th,
.resources-table td {
  padding: 16px;
  text-align: left;
  font-size: 14px;
  color: #1f2937;
}

.resources-table th {
  background-color: #f3f4f6;
  font-weight: 600;
}

.resources-table td {
  border-top: 1px solid #e5e7eb;
}

.recent-requests {
  margin-bottom: 32px;
}

.recent-requests h3 {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.requests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.request-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.request-card h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px;
}

.request-card p {
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0;
}

.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
}

.status.urgent {
  background-color: #fee2e2;
  color: #dc2626;
}

.status.pending {
  background-color: #fef9c3;
  color: #ca8a04;
}

.status.completed {
  background-color: #d1fae5;
  color: #059669;
}

footer {
  background-color: #1f2937;
  color: #ffffff;
  padding: 40px 32px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.footer-section h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.footer-section p,
.footer-section a {
  font-size: 14px;
  color: #d1d5db;
  margin: 8px 0;
  text-decoration: none;
}

.footer-section a:hover {
  color: #ffffff;
}

.newsletter-form {
  display: flex;
  margin-top: 16px;
}

.newsletter-form input {
  padding: 8px 12px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  outline: none;
  flex: 1;
}

.newsletter-form button {
  padding: 8px 16px;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.newsletter-form button:hover {
  background-color: #1d4ed8;
}

.footer-bottom {
  text-align: center;
  margin-top: 32px;
  font-size: 14px;
  color: #9ca3af;
}
</style>

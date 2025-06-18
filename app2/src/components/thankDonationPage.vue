<template>
  <div class="thank-you-page">
    <!-- Navigation Bar (consistent with other pages) -->
    <nav>
      <div class="container nav-container">
        <div class="logo">
          <span class="logo-text">🎓 EduShare</span>
        </div>
        <div class="nav-links">
          <router-link to="/home">Home</router-link>
          <router-link to="/donate">Donate</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
      </div>
    </nav>

    <!-- Main Thank You Content -->
    <main class="thank-you-container">
      <div class="thank-you-card">
        <!-- Animated Checkmark -->
        <div class="success-animation">
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h1>Thank You for Your Generous Donation!</h1>
        <p class="subtitle">
          Your contribution will make a real difference in someone's education journey.
        </p>

        <!-- Donation Summary -->
        <div class="donation-summary" v-if="donation">
          <h2>Your Donation Summary</h2>
          <div class="summary-item">
            <span class="label">Item:</span>
            <span class="value">{{ donation.title }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Category:</span>
            <span class="value">{{ donation.resource_type }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Quantity:</span>
            <span class="value">{{ donation.quantity }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Status:</span>
            <span class="value status-badge">{{ donation.status }}</span>
          </div>
        </div>

        <!-- Impact Message -->
        <div class="impact-message">
          <div class="impact-icon">💡</div>
          <p>
            Your donation could help provide educational resources to students in need, giving them
            the tools they need to succeed in their studies.
          </p>
        </div>

        <!-- Next Steps -->
        <div class="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>Our team will review your donation</li>
            <li>You'll receive an email confirmation</li>
            <li>We'll notify you when your donation is matched with a recipient</li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <router-link to="/donation" class="btn btn-primary"> Make Another Donation </router-link>
          <router-link to="/track" class="btn btn-secondary"> Track Your Donations </router-link>
        </div>

        <!-- Social Sharing -->
        <div class="social-sharing">
          <p>Spread the word about EduShare!</p>
          <div class="social-icons">
            <a href="#" class="social-icon facebook">f</a>
            <a href="#" class="social-icon twitter">t</a>
            <a href="#" class="social-icon linkedin">in</a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="thank-you-footer">
      <p>Have questions about your donation? <router-link to="/contact">Contact us</router-link></p>
      <p>© 2023 EduShare. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const donation = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:5038/api/donations/${route.params.donationId}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    // Handle both possible response structures
    donation.value = result.donation || result

    if (!donation.value) {
      throw new Error('No donation data received')
    }
  } catch (error) {
    console.error('Fetch error:', error)
    router.push('/donation')
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.thank-you-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Navigation - consistent with other pages */
nav {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.nav-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2462eb;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #2462eb;
}

/* Main thank you content */
.thank-you-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.thank-you-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  max-width: 800px;
  width: 100%;
  text-align: center;
}

/* Success animation */
.success-animation {
  margin: 0 auto 2rem;
  width: 100px;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #4bb71b;
  stroke-miterlimit: 10;
  box-shadow: 0 0 0 rgba(75, 183, 27, 0.4);
  animation:
    fill 0.5s ease-in-out 0.5s forwards,
    scale 0.4s ease-in-out 0.8s both;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: none;
  animation: stroke 0.7s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.9s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0 0 0 100px rgba(75, 183, 27, 0);
  }
}

/* Typography */
h1 {
  font-size: 2.5rem;
  color: #2462eb;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

/* Donation summary */
.donation-summary {
  background-color: #f0f7ff;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: left;
}

.donation-summary h2 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e0e6ed;
}

.summary-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.label {
  font-weight: 600;
  color: #555;
}

.value {
  color: #333;
}

.status-badge {
  background-color: #ffeeba;
  color: #856404;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

/* Impact message */
.impact-message {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-left: 4px solid #2462eb;
  padding: 1rem;
  margin: 2rem 0;
  text-align: left;
}

.impact-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

/* Next steps */
.next-steps {
  text-align: left;
  margin: 2rem 0;
}

.next-steps h3 {
  color: #2462eb;
  margin-bottom: 1rem;
}

.next-steps ul {
  list-style-type: none;
  padding-left: 1.5rem;
}

.next-steps li {
  margin-bottom: 0.5rem;
  position: relative;
}

.next-steps li::before {
  content: '•';
  color: #2462eb;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: #2462eb;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #1a4fc8;
}

.btn-secondary {
  background-color: #f0f4f8;
  color: #4b5462;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e0e6ed;
}

/* Social sharing */
.social-sharing {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.facebook {
  background-color: #3b5998;
}
.twitter {
  background-color: #1da1f2;
}
.linkedin {
  background-color: #0077b5;
}

/* Footer */
.thank-you-footer {
  text-align: center;
  padding: 1.5rem;
  background-color: white;
  border-top: 1px solid #eee;
  margin-top: auto;
}

.thank-you-footer a {
  color: #2462eb;
  text-decoration: none;
}

.thank-you-footer a:hover {
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 768px) {
  .thank-you-card {
    padding: 2rem 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .nav-links {
    gap: 1rem;
  }
}
</style>

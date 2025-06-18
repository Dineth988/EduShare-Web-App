```vue
<template>
  <div class="page-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title animate-slide-in">Empower Learners Everywhere</h1>
        <p class="hero-subtitle animate-slide-in">
          Connecting donors with communities to make education accessible for all
        </p>
        <a href="/requests" class="hero-cta animate-slide-in">Start Donating</a>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="stats-container">
        <div class="stat-item">
          <img src="https://img.icons8.com/?size=100&id=bwUgs69v7bOd&format=png&color=000000" alt="Books Icon" class="stat-icon" />
          <h3 class="stat-number" data-target="10000">0</h3>
          <p class="stat-label">Books Donated</p>
        </div>
        <div class="stat-item">
          <img src="https://img.icons8.com/?size=100&id=7rmNtCYhDvvG&format=png&color=000000" alt="Schools Icon" class="stat-icon" />
          <h3 class="stat-number" data-target="500">0</h3>
          <p class="stat-label">Schools Supported</p>
        </div>
        <div class="stat-item">
          <img src="https://img.icons8.com/?size=100&id=7Iw01uG13raK&format=png&color=000000" alt="Donors Icon" class="stat-icon" />
          <h3 class="stat-number" data-target="5000">0</h3>
          <p class="stat-label">Active Donors</p>
        </div>
        <div class="stat-item">
          <img src="https://img.icons8.com/?size=100&id=mTs9S7DfoHiE&format=png&color=000000" alt="Countries Icon" class="stat-icon" />
          <h3 class="stat-number" data-target="25">0</h3>
          <p class="stat-label">Countries Reached</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="how-it-works-container">
        <h2 class="section-title animate-slide-in">How It Works</h2>
        <div class="steps-container">
          <div class="step">
            <div class="step-icon-wrapper">
              <img src="https://img.icons8.com/?size=100&id=37917&format=png&color=000000" alt="List Icon" class="step-icon" />
            </div>
            <h3 class="step-title">List Resources</h3>
            <p class="step-description">Share what educational materials you can donate</p>
          </div>
          <div class="step">
            <div class="step-icon-wrapper">
              <img src="https://img.icons8.com/?size=100&id=2727&format=png&color=000000" alt="Match Icon" class="step-icon" />
            </div>
            <h3 class="step-title">Get Matched</h3>
            <p class="step-description">Connect with schools and communities in need</p>
          </div>
          <div class="step">
            <div class="step-icon-wrapper">
              <img src="https://img.icons8.com/?size=100&id=Atb5mR0Y5hAu&format=png&color=000000" alt="Deliver Icon" class="step-icon" />
            </div>
            <h3 class="step-title">Deliver or Collect</h3>
            <p class="step-description">Coordinate the transfer of resources</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Donations Section -->
    <section class="featured-donations">
      <div class="featured-donations-container">
        <h2 class="section-title animate-slide-in">Featured Donations</h2>
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Loading donations...</p>
        </div>
        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
          <button @click="fetchFeaturedDonations" class="retry-button">Try Again</button>
        </div>
        <div v-else class="donation-cards-container">
          <div v-for="donation in donations" :key="donation.id" class="donation-card">
            <img :src="donation.image_link" :alt="donation.title" />
            <h3>{{ donation.title }}</h3>
            <p>Type: {{ donation.type }}</p>
            <p>Condition: {{ donation.condition }}</p>
            <button class="donate-now-button">Donate Now</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Stories Section -->
    <section class="success-stories">
      <div class="success-stories-container">
        <h2 class="section-title animate-slide-in">Our Success Stories</h2>
        <div class="story-cards-container">
          <div class="story-card">
            <div class="story-image-wrapper">
              <img src="https://th.bing.com/th/id/R.06b723685da98151db172b57ab743b5e?rik=ydGOlEGECxhLMw&pid=ImgRaw&r=0" alt="Students reading donated books" class="story-image" />
            </div>
            <div class="story-content">
              <p class="story-description">
                Over 5,000 books donated to rural schools, sparking a love for reading among children.
              </p>
              <p class="story-recipient">Recipient: <span>Greenwood Elementary</span></p>
              <a href="#" class="read-more-btn">Read More</a>
            </div>
          </div>
          <div class="story-card">
            <div class="story-image-wrapper">
              <img src="https://pc24telin.com/wp-content/uploads/2019/12/Computer-Lab-schools.jpg" alt="School computer lab" class="story-image" />
            </div>
            <div class="story-content">
              <p class="story-description">
                Equipped 3 schools with modern computer labs, empowering 1,200 students.
              </p>
              <p class="story-recipient">Recipient: <span>Sunrise Community School</span></p>
              <a href="#" class="read-more-btn">Read More</a>
            </div>
          </div>
          <div class="story-card">
            <div class="story-image-wrapper">
              <img src="https://www.school-news.com.au/wp-content/uploads/2023/01/Handfuls-780x470.jpg" alt="Teacher with supplies" class="story-image" />
            </div>
            <div class="story-content">
              <p class="story-description">
                Supplied 45 teachers with classroom materials for effective teaching.
              </p>
              <p class="story-recipient">Recipient: <span>Maplewood Teachers Association</span></p>
              <a href="#" class="read-more-btn">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-column">
            <h3 class="footer-heading">About EduShare</h3>
            <p class="footer-about">
              Connecting donors with communities to make education accessible worldwide.
            </p>
            <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
            <div class="social-links">
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div class="footer-column">
            <h3 class="footer-heading">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Donate Now</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Volunteer</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3 class="footer-heading">Resources</h3>
            <ul class="footer-links">
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">School Resources</a></li>
              <li><a href="#">Donor Toolkit</a></li>
              <li><a href="#">Annual Report</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3 class="footer-heading">Contact Us</h3>
            <ul class="footer-contact">
              <li><i class="fas fa-map-marker-alt"></i> 123 Education Ave, Learn City 10001</li>
              <li><i class="fas fa-phone"></i> (123) 456-7890</li>
              <li><i class="fas fa-envelope"></i> info@edushare.org</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="copyright">© 2025 EduShare. All rights reserved.</p>
          <div class="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const donations = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch and display featured donations
async function fetchFeaturedDonations() {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('http://localhost:5038/api/featured-donations')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    donations.value = data.map((item, index) => ({ ...item, id: index }))
  } catch (err) {
    console.error('Error fetching featured donations:', err)
    error.value = 'Unable to load featured donations at this time.'
  } finally {
    loading.value = false
  }
}

// Animate stat counters
function animateStats() {
  const counters = document.querySelectorAll('.stat-number')
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'))
    let count = 0
    const increment = target / 100
    const updateCounter = () => {
      count += increment
      if (count < target) {
        counter.textContent = Math.ceil(count).toLocaleString()
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target.toLocaleString()
      }
    }
    updateCounter()
  })
}

// Newsletter subscription (placeholder)
function subscribeNewsletter(event) {
  event.preventDefault()
  const email = event.target.querySelector('input').value
  alert(`Subscribed with email: ${email}`)
  event.target.reset()
}

onMounted(() => {
  fetchFeaturedDonations()
  // Trigger stats animation when section is in view
  const statsSection = document.querySelector('.stats')
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateStats()
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )
  observer.observe(statsSection)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f8fafc;
  color: #1f2937;
}

/* Hero Section */
.hero {
  min-height: 600px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://img.freepik.com/premium-photo/girl-writing-blackboard-classroom_1048944-25950159.jpg') center/cover fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
}

.hero-content {
  max-width: 1200px;
  text-align: center;
  color: #ffffff;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0;
  transform: translateY(20px);
}

.hero-cta {
  display: inline-block;
  background: linear-gradient(90deg, #1e40af, #2563eb);
  color: #ffffff;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: transform 0.3s, box-shadow 0.3s;
  opacity: 0;
  transform: translateY(20px);
}

.hero-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.animate-slide-in {
  animation: slideIn 0.8s ease-out forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stats Section */
.stats {
  background-color: #ffffff;
  padding: 5rem 2rem;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item {
  padding: 1.5rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  transition: transform 0.3s;
}

.stat-item:hover .stat-icon {
  transform: scale(1.2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #4b5563;
}

/* How It Works Section */
.how-it-works {
  padding: 5rem 2rem;
  background-color: #f8fafc;
}

.how-it-works-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.step {
  padding: 1.5rem;
  transition: transform 0.3s;
}

.step:hover {
  transform: translateY(-5px);
}

.step-icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(90deg, #1e40af, #2563eb);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.step-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  object-position: center;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.step-description {
  font-size: 0.875rem;
  color: #4b5563;
  max-width: 300px;
  margin: 0 auto;
}

/* Featured Donations Section */
.featured-donations {
  padding: 5rem 2rem;
  background-color: #ffffff;
}

.featured-donations-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.donation-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.donation-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.donation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.donation-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.donation-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.donation-card p {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.donate-now-button {
  background: linear-gradient(90deg, #1e40af, #2563eb);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.donate-now-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.loading,
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  text-align: center;
  color: #4b5563;
  font-size: 1rem;
}

.loading {
  gap: 1rem;
}

.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #1e40af;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error {
  color: #dc2626;
  gap: 1rem;
}

.retry-button {
  background: linear-gradient(90deg, #1e40af, #2563eb);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.retry-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Success Stories Section */
.success-stories {
  padding: 5rem 2rem;
  background-color: #f8fafc;
}

.success-stories-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.story-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.story-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.story-image-wrapper {
  height: 200px;
  overflow: hidden;
}

.story-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.story-card:hover .story-image {
  transform: scale(1.1);
}

.story-content {
  padding: 1.5rem;
}

.story-description {
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.story-recipient {
  font-size: 0.875rem;
  color: #1e40af;
  margin-bottom: 1rem;
}

.story-recipient span {
  font-weight: 600;
}

.read-more-btn {
  display: inline-block;
  color: #1e40af;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.read-more-btn:hover {
  color: #2563eb;
}

/* Footer Section */
.site-footer {
  background: linear-gradient(180deg, #1f2937, #111827);
  color: #ffffff;
  padding: 4rem 2rem 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-column {
  padding: 1rem;
}

.footer-heading {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
}

.footer-heading::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  width: 50px;
  height: 2px;
  background-color: #2563eb;
}

.footer-about {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #d1d5db;
  margin-bottom: 1.5rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
}

.newsletter-form button {
  background: linear-gradient(90deg, #1e40af, #2563eb);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.newsletter-form button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-contact {
  list-style: none;
  font-size: 0.875rem;
  color: #d1d5db;
}

.footer-contact li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.footer-contact i {
  margin-right: 0.75rem;
  color: #2563eb;
  width: 20px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 36px;
  height: 36px;
  background: #374151;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.3s;
}

.social-links a:hover {
  background: #2563eb;
  transform: translateY(-3px);
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 2rem;
  text-align: center;
}

.copyright {
  font-size: 0.75rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.legal-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.legal-links a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.75rem;
  transition: color 0.3s;
}

.legal-links a:hover {
  color: #ffffff;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero {
    padding: 3rem 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .stats-container,
  .how-it-works-container,
  .featured-donations-container,
  .success-stories-container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 500px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .steps-container {
    grid-template-columns: 1fr;
  }

  .donation-cards-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.875rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form input,
  .newsletter-form button {
    width: 100%;
  }
}
</style>
```
<template>
  <div class="donation-feedback">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="logo-container">
        <img src="https://via.placeholder.com/30" alt="EduShare Logo" />
        <span class="logo-text">EduShare</span>
      </div>
      <div class="nav-links">
        <a href="#" class="nav-link">Home</a>
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Donations</a>
        <a href="#" class="nav-link">Contact</a>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="content">
      <h1 class="title">Donation Feedback</h1>
      <p class="subtitle">Your feedback helps us improve our donation process and impact</p>

      <div class="feedback-card">
        <!-- Rate Your Donation Experience -->
        <div class="rating-section">
          <h2>Rate your donation experience</h2>
          <div class="star-rating">
            <span
              v-for="star in 5"
              :key="star"
              @click="setRating(star)"
              :class="{ active: star <= currentRating }"
              >★</span
            >
          </div>
        </div>

        <!-- Share Your Feedback -->
        <div class="feedback-section">
          <h2>Share your feedback</h2>
          <textarea
            v-model="feedbackText"
            placeholder="Tell us about your experience with the donation..."
            rows="4"
          ></textarea>
        </div>

        <!-- Donation Reference Number -->
        <div class="reference-section">
          <h2>Donation Reference Number</h2>
          <input
            v-model="referenceNumber"
            type="text"
            placeholder="Enter your donation reference number"
          />
        </div>

        <!-- Submit Button -->
        <div class="submit-section">
          <button @click="submitFeedback">Submit Feedback</button>
          <p class="disclaimer">
            Your feedback will be kept confidential and used to improve our donation process
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2024 Motif. All rights reserved.</p>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DonationFeedback',
  data() {
    return {
      currentRating: 0,
      feedbackText: '',
      referenceNumber: '',
    }
  },
  methods: {
    setRating(rating) {
      this.currentRating = rating
    },
    submitFeedback() {
      // Here you would typically send the data to your backend
      console.log({
        rating: this.currentRating,
        feedback: this.feedbackText,
        reference: this.referenceNumber,
      })

      // Reset form after submission
      this.currentRating = 0
      this.feedbackText = ''
      this.referenceNumber = ''

      alert('Thank you for your feedback!')
    },
  },
}
</script>

<style scoped>
/* Base Styles */
.donation-feedback {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navigation Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  font-weight: 700;
  font-size: 1.25rem;
  color: #2563eb;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  color: #2563eb;
  background-color: #e5e7eb;
}

/* Main Content Styles */
.content {
  flex: 1;
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  text-align: center;
}

.subtitle {
  color: #4b5563;
  margin-bottom: 3rem;
  text-align: center;
}

.feedback-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 42rem;
  margin: 0 auto;
}

.rating-section,
.feedback-section,
.reference-section {
  margin-bottom: 2rem;
}

.rating-section h2,
.feedback-section h2,
.reference-section h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

/* Star Rating Styles */
.star-rating {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.star-rating span {
  font-size: 1.875rem;
  color: #d1d5db;
  cursor: pointer;
  transition: color 0.2s;
}

.star-rating span.active {
  color: #fbbf24;
}

.star-rating span:hover,
.star-rating span:hover ~ span {
  color: #fbbf24;
}

/* Form Element Styles */
textarea,
input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-family: inherit;
  transition: all 0.3s;
}

textarea:focus,
input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

/* Button Styles */
button {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: auto;
  display: block;
}

button:hover {
  background-color: #1d4ed8;
}

.disclaimer {
  color: #6b7280;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
}

/* Footer Styles */
.footer {
  background-color: white;
  padding: 1.5rem;
  text-align: center;
}

.footer p {
  color: #4b5563;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.footer-links a {
  color: #6b7280;
  text-decoration: none;
}

.footer-links a:hover {
  color: #2563eb;
}
</style>

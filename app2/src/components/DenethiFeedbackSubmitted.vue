<template>
  <div class="support-feedback-page" :class="{ 'dark-mode': isDarkMode }">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="container navbar-container">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/">
            <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="var(--primary-color)" stroke-width="4"/>
              <path d="M20 10L30 30H10L20 10Z" fill="var(--primary-color)"/>
            </svg>
            <span>EduShare</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="nav-links" :class="{ 'active': isMenuOpen }">
          <router-link to="/recipienthome" class="nav-link" @click="closeMenus">Home</router-link>
          <router-link to="/matching-donations" class="nav-link" @click="closeMenus">Products</router-link>
          <router-link to="/support-feedback" class="nav-link" @click="closeMenus">Support</router-link>
        </div>

        <!-- Search Bar -->
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search support..."
            class="search-input"
            v-model="searchQuery"
          />
          <i class="fas fa-search search-icon"></i>
        </div>

        <!-- User Profile -->
        <div class="user-profile">
          <button class="profile-button" @click="toggleProfileMenu">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile Picture"
              class="profile-img"
            />
            <span class="profile-name">John Doe</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="profile-menu" v-if="isProfileMenuOpen">
            <router-link to="/profile" class="profile-menu-item" @click="closeMenus">Profile</router-link>
            <router-link to="/settings" class="profile-menu-item" @click="closeMenus">Settings</router-link>
            <button class="profile-menu-item" @click="logout">Logout</button>
          </div>
        </div>

        <!-- Hamburger Menu -->
        <button class="hamburger" @click="toggleMenu">
          <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </nav>

    <!-- Dark Mode Toggle -->
    <button class="dark-mode-toggle" @click="toggleDarkMode">
      <i>{{ isDarkMode ? '☀️' : '🌙' }}</i>
    </button>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">How Can We Help You Today?</h1>
        <p class="hero-subtitle">Get support or share your feedback with us</p>
      </div>
    </section>

    <!-- Options Section -->
    <section class="container options-section">
      <div class="options-grid">
        <div class="option-card">
          <i class="fas fa-question-circle card-icon"></i>
          <h3 class="card-title">Get Support</h3>
          <p class="card-text">Need help? Our support team is here to assist with any questions or issues.</p>
          <router-link to="/contact-support" class="btn btn-primary">Contact Support</router-link>
        </div>
        <div class="option-card">
          <i class="fas fa-comment-alt card-icon"></i>
          <h3 class="card-title">Give Feedback</h3>
          <p class="card-text">Your feedback helps us improve. Share your thoughts and suggestions with us.</p>
          <a href="#feedback-form" class="btn btn-primary">Share Feedback</a>
        </div>
      </div>
    </section>

    <!-- Contact and Feedback Section -->
    <section class="container contact-feedback-section">
      <div class="contact-feedback-grid">
        <!-- Contact Information -->
        <div class="card">
          <h2 class="card-title">Contact Information</h2>
          <ul class="contact-list">
            <li class="contact-item">
              <i class="fas fa-phone-alt mr-2"></i> +1 741 852 2790
            </li>
            <li class="contact-item">
              <i class="fas fa-envelope mr-2"></i> support@edushare.com
            </li>
            <li class="contact-item">
              <i class="fas fa-clock mr-2"></i> Mon-Fri, 9AM-6PM EST
            </li>
          </ul>
        </div>

        <!-- FAQ Categories -->
        <div class="card">
          <h2 class="card-title">FAQ Categories</h2>
          <ul class="faq-list">
            <li><a href="#" class="faq-link">Getting Started</a></li>
            <li><a href="#" class="faq-link">Account & Billing</a></li>
            <li><a href="#" class="faq-link">Technical Issues</a></li>
            <li><a href="#" class="faq-link">Features</a></li>
            <li><a href="#" class="faq-link">Security</a></li>
          </ul>
        </div>

        <!-- Feedback Form -->
        <div class="card" id="feedback-form">
          <h2 class="card-title">Share Your Feedback</h2>
          <div v-if="errorMessage" class="error-message">
            <strong>Error:</strong> {{ errorMessage }}
          </div>
          <div class="form-group">
            <label for="subject" class="form-label">Subject</label>
            <input
              type="text"
              id="subject"
              v-model="form.subject"
              placeholder="Enter subject"
              class="form-input"
              :class="{ 'error': errorFields.includes('subject') }"
            />
          </div>
          <div class="form-group">
            <label for="category" class="form-label">Category</label>
            <select
              id="category"
              v-model="form.category"
              class="form-input"
              :class="{ 'error': errorFields.includes('category') }"
            >
              <option value="">Select category</option>
              <option>General</option>
              <option>Feature Request</option>
              <option>Bug Report</option>
            </select>
          </div>
          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              placeholder="Describe your feedback in detail..."
              rows="5"
              class="form-input form-textarea"
              :class="{ 'error': errorFields.includes('description') }"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Attachments</label>
            <div class="file-upload" :class="{ 'dragging': isDragging }">
              <label for="file-upload" class="file-label">
                <i class="fas fa-paperclip mr-2"></i>
                Drag and drop files here or click to browse
              </label>
              <input
                type="file"
                id="file-upload"
                class="file-input"
                multiple
                @change="handleFileUpload"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleFileDrop"
              />
            </div>
            <div v-if="uploadedFiles.length" class="file-list">
              <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
                <span>{{ file.name }}</span>
                <button @click="removeFile(index)" class="file-remove">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
          <button
            @click="submitFeedback"
            class="btn btn-primary btn-full"
            :disabled="isSubmitting"
            :class="{ 'loading': isSubmitting }"
          >
            <span v-if="!isSubmitting">Submit Feedback</span>
            <span v-else><i class="fas fa-spinner fa-spin"></i> Submitting...</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Support Options Section -->
    <section class="container support-options-section">
      <h2 class="section-title">Multiple Ways to Get Support</h2>
      <div class="support-options-grid">
        <div class="option-card">
          <i class="fas fa-comment-dots card-icon"></i>
          <h3 class="card-title">Live Chat</h3>
          <p class="card-text">24/7 instant support, one click away.</p>
        </div>
        <div class="option-card">
          <i class="fas fa-envelope card-icon"></i>
          <h3 class="card-title">Email Support</h3>
          <p class="card-text">Response within 24 hours.</p>
        </div>
        <div class="option-card">
          <i class="fas fa-phone-alt card-icon"></i>
          <h3 class="card-title">Phone Support</h3>
          <p class="card-text">Talk to our experts.</p>
        </div>
        <div class="option-card">
          <i class="fas fa-users card-icon"></i>
          <h3 class="card-title">Community</h3>
          <p class="card-text">Join our community forums.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Company</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">About</a></li>
            <li><a href="#" class="footer-link">Careers</a></li>
            <li><a href="#" class="footer-link">News</a></li>
            <li><a href="#" class="footer-link">Press</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Support</h3>
          <ul class="footer-links">
            <li><router-link to="/support-feedback" class="footer-link">Help Center</router-link></li>
            <li><a href="#" class="footer-link">Status</a></li>
            <li><a href="#" class="footer-link">Report a Bug</a></li>
            <li><router-link to="/support-feedback" class="footer-link">Contact Us</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Legal</h3>
          <ul class="footer-links">
            <li><router-link to="/privacy" class="footer-link">Privacy Policy</router-link></li>
            <li><router-link to="/terms" class="footer-link">Terms</router-link></li>
            <li><a href="#" class="footer-link">Cookies</a></li>
            <li><a href="#" class="footer-link">Security</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Connect</h3>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <p class="footer-copyright">© 2025 EduShare. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SupportFeedback',
  setup() {
    const router = useRouter()
    const form = ref({
      subject: '',
      category: '',
      description: '',
    })
    const isSubmitting = ref(false)
    const isDarkMode = ref(false)
    const isMenuOpen = ref(false)
    const isProfileMenuOpen = ref(false)
    const searchQuery = ref('')
    const errorMessage = ref('')
    const errorFields = ref([])
    const uploadedFiles = ref([])
    const isDragging = ref(false)

    const validateForm = () => {
      errorMessage.value = ''
      errorFields.value = []

      if (!form.value.subject.trim()) {
        errorMessage.value = 'Please enter a subject.'
        errorFields.value.push('subject')
        return false
      }
      if (!form.value.category) {
        errorMessage.value = 'Please select a category.'
        errorFields.value.push('category')
        return false
      }
      if (!form.value.description.trim()) {
        errorMessage.value = 'Please enter a description.'
        errorFields.value.push('description')
        return false
      }
      return true
    }

    const handleFileUpload = (event) => {
      const files = event.target.files
      uploadedFiles.value = [...uploadedFiles.value, ...files]
      isDragging.value = false
    }

    const handleFileDrop = (event) => {
      const files = event.dataTransfer.files
      uploadedFiles.value = [...uploadedFiles.value, ...files]
      isDragging.value = false
    }

    const removeFile = (index) => {
      uploadedFiles.value.splice(index, 1)
    }

    const submitFeedback = async () => {
      if (!validateForm()) return

      isSubmitting.value = true

      try {
        // Simulate API call (replace with actual API)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Navigate to success page with form data
        router.push({
          name: 'SubmittedSuccessfully',
          query: {
            subject: form.value.subject,
            category: form.value.category,
            refId: 'FB-' + Math.floor(10000 + Math.random() * 90000),
          },
        })
      } catch (error) {
        errorMessage.value = 'Failed to submit feedback. Please try again.'
        console.error('Submission failed:', error)
      } finally {
        isSubmitting.value = false
      }
    }

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
    }

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
      if (isMenuOpen.value) isProfileMenuOpen.value = false
    }

    const toggleProfileMenu = () => {
      isProfileMenuOpen.value = !isProfileMenuOpen.value
      if (isProfileMenuOpen.value) isMenuOpen.value = false
    }

    const closeMenus = () => {
      isMenuOpen.value = false
      isProfileMenuOpen.value = false
    }

    const logout = () => {
      console.log('Logging out...')
      closeMenus()
      router.push({ name: 'Login' })
    }

    return {
      form,
      isSubmitting,
      submitFeedback,
      isDarkMode,
      toggleDarkMode,
      isMenuOpen,
      toggleMenu,
      isProfileMenuOpen,
      toggleProfileMenu,
      closeMenus,
      logout,
      searchQuery,
      errorMessage,
      errorFields,
      uploadedFiles,
      isDragging,
      handleFileUpload,
      handleFileDrop,
      removeFile,
    }
  },
}
</script>

<style scoped>
/* CSS Variables */
.support-feedback-page {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;

  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  background-color: var(--bg-color);
  transition: background-color 0.3s ease;
}

/* Dark Mode */
.support-feedback-page.dark-mode {
  --primary-color: #60a5fa;
  --secondary-color: #34d399;
  --text-color: #e5e7eb;
  --bg-color: #1f2937;
  --card-bg: #374151;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Navigation Bar */
.navbar {
  background: var(--card-bg);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
  font-size: 20px;
  font-weight: 600;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: var(--primary-color);
  color: #fff;
}

/* Search Bar */
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 200px;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 14px;
  background: var(--card-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #6b7280;
  font-size: 16px;
}

/* User Profile */
.user-profile {
  position: relative;
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.profile-button:hover {
  background: #f0f7ff;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.profile-name {
  display: none;
}

.profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--card-bg);
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  padding: 8px 0;
  min-width: 160px;
  z-index: 1000;
}

.profile-menu-item {
  display: block;
  padding: 8px 16px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}

.profile-menu-item:hover {
  background: var(--primary-color);
  color: #fff;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  background: transparent;
  border: none;
  font-size: 24px;
  color: var(--text-color);
  cursor: pointer;
}

/* Dark Mode Toggle */
.dark-mode-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--card-bg);
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: var(--shadow);
  font-size: 16px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.dark-mode-toggle:hover {
  background: var(--primary-color);
  color: #fff;
}

/* Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.hero {
  background: linear-gradient(to bottom, #e6f0fa, var(--bg-color));
  padding: 64px 0;
  text-align: center;
}

.hero-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
  animation: fadeIn 1s ease-in;
}

.hero-subtitle {
  font-size: 18px;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

/* Options Section */
.options-section {
  padding: 48px 0;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}

/* Contact and Feedback Section */
.contact-feedback-section {
  padding: 48px 0;
}

.contact-feedback-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Support Options Section */
.support-options-section {
  padding: 48px 0;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 32px;
  animation: fadeIn 1s ease-in;
}

.support-options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

/* Card */
.card {
  background: var(--card-bg);
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  padding: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 1s ease-in;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 40px;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
}

.card-text {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

/* Option Card */
.option-card {
  text-align: center;
}

/* Contact List */
.contact-list {
  list-style: none;
  padding: 0;
}

.contact-item {
  font-size: 14px;
  color: var(--text-color);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

/* FAQ List */
.faq-list {
  list-style: none;
  padding: 0;
}

.faq-link {
  font-size: 14px;
  color: var(--text-color);
  text-decoration: none;
  display: block;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.faq-link:hover {
  color: var(--primary-color);
}

/* Form */
.error-message {
  background: #fee2e2;
  color: #b91c1c;
  padding: 12px;
  border-radius: var(--border-radius);
  margin-bottom: 16px;
  font-size: 14px;
}

.error-message strong {
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 14px;
  background: var(--card-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-input.error {
  border-color: #f87171;
}

/* File Upload */
.file-upload {
  border: 2px dashed #d1d5db;
  border-radius: var(--border-radius);
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.file-upload.dragging {
  background: #f0f7ff;
  border-color: var(--primary-color);
}

.file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
}

.file-input {
  display: none;
}

.file-list {
  margin-top: 12px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: var(--text-color);
  padding: 8px;
  background: #f0f7ff;
  border-radius: var(--border-radius);
  margin-bottom: 8px;
}

.file-remove {
  background: none;
  border: none;
  color: #f87171;
  cursor: pointer;
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
}

.btn-primary {
  background: var(--primary-color);
  color: #fff;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.btn-primary.loading {
  opacity: 0.8;
}

.btn-primary .fa-spinner {
  margin-right: 8px;
}

.btn-full {
  width: 100%;
}

/* Footer */
.footer {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 48px 24px;
  color: #fff;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.footer-section {
  text-align: left;
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  display: block;
  margin-bottom: 8px;
  transition: opacity 0.3s ease;
}

.footer-link:hover {
  opacity: 0.8;
}

.social-icons {
  display: flex;
  gap: 16px;
}

.social-icon {
  color: #fff;
  font-size: 20px;
  transition: opacity 0.3s ease;
}

.social-icon:hover {
  opacity: 0.8;
}

.footer-copyright {
  text-align: center;
  font-size: 14px;
  margin-top: 32px;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .contact-feedback-grid {
    grid-template-columns: 1fr 1fr;
  }

  .contact-feedback-grid > :last-child {
    grid-column: span 2;
  }

  .profile-name {
    display: inline;
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--card-bg);
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    box-shadow: var(--shadow);
  }

  .nav-links.active {
    display: flex;
  }

  .nav-link {
    padding: 12px;
    text-align: center;
  }

  .hamburger {
    display: block;
  }

  .search-bar,
  .user-profile {
    display: none;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .options-grid {
    grid-template-columns: 1fr;
  }

  .contact-feedback-grid {
    grid-template-columns: 1fr;
  }

  .contact-feedback-grid > :last-child {
    grid-column: auto;
  }

  .section-title {
    font-size: 24px;
  }

  .card {
    padding: 16px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .hero {
    padding: 48px 0;
  }

  .hero-title {
    font-size: 24px;
  }

  .card-title {
    font-size: 18px;
  }

  .form-input,
  .form-textarea {
    font-size: 13px;
    padding: 10px;
  }

  .file-label {
    font-size: 13px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-section {
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>
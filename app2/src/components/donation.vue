<template>
  <div class="donation-page" :class="{ 'dark-mode': isDarkMode }">
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
          <router-link to="/home" class="nav-link" @click="closeMenu">Home</router-link>
          <router-link to="/donate" class="nav-link" @click="closeMenu">Donate</router-link>
          <router-link to="/profile" class="nav-link" @click="closeMenu">Profile</router-link>
          <router-link to="/contact" class="nav-link" @click="closeMenu">Contact</router-link>
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
        <h1>Make a Difference Today</h1>
        <p>Your donations can change lives by empowering education.</p>
        <button class="hero-cta" @click="scrollToCategories">Start Donating</button>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories" id="categories">
      <div class="container">
        <h2>Choose a Donation Category</h2>
        <div class="categories-grid">
          <div
            v-for="category in categories"
            :key="category.name"
            class="category-card"
            @click="handleCategoryClick(category.name)"
            :class="{ selected: selectedCategory === category.name }"
          >
            <div class="category-icon">
              <img :src="category.icon" :alt="category.name" />
            </div>
            <h3 class="category-name">{{ category.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Donation Form -->
    <div class="container" v-if="showDonationForm">
      <form class="donation-form" @submit.prevent="handleSubmit">
        <!-- Item Details Section -->
        <div class="form-section">
          <h2>Item Details</h2>
          <input type="hidden" v-model="formData.resource_type" />
          <div class="form-row">
            <div class="form-group">
              <label for="item-name">Item Name</label>
              <input type="text" id="item-name" v-model="formData.title" required />
            </div>
            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input type="number" id="quantity" v-model="formData.quantity" min="1" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="condition">Condition</label>
              <select id="condition" v-model="formData.condition" required>
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="formData.description" required></textarea>
          </div>
          <div class="form-group">
            <label>Image</label>
            <div class="image-input-options">
              <button
                type="button"
                @click="showImageUpload = true"
                :class="{ active: showImageUpload }"
              >
                Upload Image
              </button>
              <button
                type="button"
                @click="showImageUpload = false"
                :class="{ active: !showImageUpload }"
              >
                Enter Image URL
              </button>
            </div>

            <div v-if="showImageUpload">
              <input
                type="file"
                @change="handleImageUpload"
                style="display: none"
                id="image-upload"
                accept="image/*"
              />
              <div class="image-upload" @click="document.getElementById('image-upload').click()">
                <template v-if="!formData.image_link">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <p>Click to upload or drag and drop</p>
                  <p>PNG, JPG, GIF up to 5MB</p>
                </template>
                <template v-else>
                  <img :src="formData.image_link" alt="Preview" />
                </template>
              </div>
            </div>

            <div v-else class="form-group">
              <label for="image-url">Image URL</label>
              <input
                type="url"
                id="image-url"
                v-model="formData.image_link"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        <!-- Delivery Method Section -->
        <div class="form-section">
          <h2>Delivery Method</h2>
          <div class="delivery-options">
            <div
              class="delivery-option"
              :class="{ selected: formData.deliveryMethod === 'self-ship' }"
              @click="formData.deliveryMethod = 'self-ship'"
            >
              <div class="radio-container">
                <input
                  type="radio"
                  id="self-ship"
                  v-model="formData.deliveryMethod"
                  value="self-ship"
                />
                <label for="self-ship">Self Ship</label>
              </div>
              <p class="option-description">I will arrange shipping myself</p>
            </div>
            <div
              class="delivery-option"
              :class="{ selected: formData.deliveryMethod === 'partner-pickup' }"
              @click="formData.deliveryMethod = 'partner-pickup'"
            >
              <div class="radio-container">
                <input
                  type="radio"
                  id="partner-pickup"
                  v-model="formData.deliveryMethod"
                  value="partner-pickup"
                />
                <label for="partner-pickup">Partner Pickup</label>
              </div>
              <p class="option-description">Our partners will pick up the items</p>
            </div>
          </div>
        </div>

        <!-- Additional Options Section -->
        <div class="form-section">
          <h2>Additional Options</h2>
          <div class="toggle-group">
            <label class="toggle-switch">
              <input type="checkbox" v-model="formData.isRecurring" />
              <span class="slider"></span>
            </label>
            <span>Make this recurring</span>
          </div>
          <div class="form-group">
            <label for="special-instructions">Special Instructions</label>
            <textarea id="special-instructions" v-model="formData.specialInstructions"></textarea>
          </div>
        </div>

        <!-- Form Buttons -->
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="resetForm">Cancel</button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Complete Donation' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dark Mode
const isDarkMode = ref(false)
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

// Mobile Menu
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenu = () => {
  isMenuOpen.value = false
}

// Categories data
const categories = [
  {
    name: 'Printed Materials',
    icon: 'https://img.icons8.com/?size=100&id=38854&format=png&color=228BE6',
  },
  {
    name: 'Technology',
    icon: 'https://img.icons8.com/?size=100&id=Sv2jkfTJCzLQ&format=png&color=228BE6',
  },
  { name: 'Math Tools', icon: 'https://img.icons8.com/?size=100&id=9470&format=png&color=228BE6' },
  {
    name: 'Science Equipment',
    icon: 'https://img.icons8.com/?size=100&id=2l4z0Vf4ihEA&format=png&color=228BE6',
  },
  {
    name: 'Digital Media',
    icon: 'https://img.icons8.com/?size=100&id=qlvJFYr0yTGO&format=png&color=228BE6',
  },
  {
    name: 'Writing & Stationary Supplies',
    icon: 'https://img.icons8.com/?size=100&id=ZTEqGMz6ATHM&format=png&color=228BE6',
  },
  {
    name: 'Monetary Donations',
    icon: 'https://img.icons8.com/?size=100&id=7977&format=png&color=228BE6',
  },
  { name: 'Services', icon: 'https://img.icons8.com/?size=100&id=42235&format=png&color=228BE6' },
  {
    name: 'Others',
    icon: 'https://img.icons8.com/?size=100&id=ZsYJzYlThVLD&format=png&color=228BE6',
  },
]

const selectedCategory = ref('')
const isSubmitting = ref(false)
const showImageUpload = ref(true)

// Form data model
const formData = ref({
  resource_type: '',
  title: '',
  quantity: 1,
  condition: '',
  description: '',
  deliveryMethod: '',
  isRecurring: false,
  specialInstructions: '',
  image_link: '',
  image_file: null,
})

// Computed property to show/hide donation form
const showDonationForm = computed(() => {
  return (
    selectedCategory.value &&
    selectedCategory.value !== 'Monetary Donations' &&
    selectedCategory.value !== 'Services'
  )
})

// Handle category selection
const handleCategoryClick = (categoryName) => {
  selectedCategory.value = categoryName
  formData.value.resource_type = categoryName

  if (categoryName === 'Monetary Donations') {
    router.push('/moneyDonations')
  } else if (categoryName === 'Services') {
    router.push('/serviceDonation')
  }
}

// Handle image upload
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  formData.value.image_file = file
  formData.value.image_link = URL.createObjectURL(file)
}

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    console.log('Submitting donation:', formData.value)

    const response = await fetch('http://localhost:5038/api/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData.value),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Server responded with error:', data)
      throw new Error(data.error || `Server returned ${response.status}`)
    }

    console.log('Donation submitted successfully:', data)
    router.push({
      name: 'thankDonation',
      params: { donationId: data.donation.donation_id },
    })
  } catch (error) {
    console.error('Submission error:', error)

    let errorMessage = 'There was an error submitting your donation.'
    if (error.message.includes('401')) {
      errorMessage = 'Please log in to submit a donation.'
    } else if (error.message.includes('Failed to create')) {
      errorMessage = 'Server error. Please try again later.'
    }

    alert(errorMessage)
  } finally {
    isSubmitting.value = false
  }
}

// Reset form
const resetForm = () => {
  selectedCategory.value = ''
  formData.value = {
    resource_type: '',
    title: '',
    quantity: 1,
    condition: '',
    description: '',
    deliveryMethod: '',
    isRecurring: false,
    specialInstructions: '',
    image_link: '',
    image_file: null,
  }
  showImageUpload.value = true
}

// Scroll to categories
const scrollToCategories = () => {
  const categoriesSection = document.getElementById('categories')
  if (categoriesSection) {
    categoriesSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* CSS Variables */
.donation-page {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;

  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

/* Dark Mode */
.donation-page.dark-mode {
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
  padding: 24px;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 80px 0;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: #fff;
  position: relative;
  overflow: hidden;
}

.hero h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  animation: fadeIn 1s ease-in;
}

.hero p {
  font-size: 20px;
  margin-bottom: 24px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeIn 1.2s ease-in;
}

.hero-cta {
  background: #fff;
  color: var(--primary-color);
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: fadeIn 1.4s ease-in;
}

.hero-cta:hover {
  background: var(--secondary-color);
  color: #fff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Categories Section */
.categories ———
.categories {
  padding: 48px 0;
}

.categories h2 {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 32px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.category-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.category-card.selected {
  border: 2px solid var(--primary-color);
  background: var(--card-bg);
}

.category-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e6f0ff;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.category-icon img {
  width: 32px;
  height: 32px;
}

.category-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
}

/* Donation Form */
.donation-form {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 32px;
  margin: 32px 0;
  box-shadow: var(--shadow);
}

.form-section {
  margin-bottom: 32px;
}

.form-section h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 8px;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);
}

input,
textarea,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 14px;
  background: var(--card-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.image-input-options {
  display: flex;
  margin-bottom: 16px;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.image-input-options button {
  flex: 1;
  padding: 12px;
  border: 1px solid #d1d5db;
  background: var(--card-bg);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.image-input-options button.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.image-input-options button:first-child {
  border-right: none;
}

.image-input-options button:last-child {
  border-left: none;
}

.image-upload {
  border: 2px dashed #d1d5db;
  border-radius: var(--border-radius);
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.image-upload:hover {
  border-color: var(--primary-color);
}

.image-upload i {
  font-size: 32px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.image-upload p {
  font-size: 14px;
  color: #6b7280;
}

.image-upload img {
  max-width: 200px;
  max-height: 200px;
  border-radius: var(--border-radius);
}

/* Delivery Options */
.delivery-options {
  display: flex;
  gap: 16px;
}

.delivery-option {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delivery-option:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow);
}

.delivery-option.selected {
  border-color: var(--primary-color);
  background: #f0f7ff;
}

.radio-container {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.radio-container input {
  width: auto;
  margin-right: 8px;
}

.option-description {
  font-size: 14px;
  color: #6b7280;
}

/* Additional Options */
.toggle-group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin-right: 12px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #d1d5db;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background: #fff;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* Form Buttons */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
}

.btn {
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
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

.btn-secondary {
  background: #e5e7eb;
  color: var(--text-color);
}

.btn-secondary:hover {
  background: #d1d5db;
}

/* Responsive Design */
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

  .hero {
    padding: 48px 0;
  }

  .hero h1 {
    font-size: 36px;
  }

  .hero p {
    font-size: 16px;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  .form-row {
    flex-direction: column;
  }

  .delivery-options {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 16px;
  }

  .hero h1 {
    font-size: 28px;
  }

  .categories h2 {
    font-size: 24px;
  }

  .category-card {
    padding: 16px;
  }

  .category-icon {
    width: 48px;
    height: 48px;
  }

  .category-icon img {
    width: 24px;
    height: 24px;
  }

  .donation-form {
    padding: 24px;
  }

  .form-section h2 {
    font-size: 20px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
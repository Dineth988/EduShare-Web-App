<template>
  <div class="resource-update-page" :class="{ 'dark-mode': isDarkMode }">
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
          <router-link to="/recipienthome" class="nav-link" @click="closeMenu">Home</router-link>
          <router-link to="/resources" class="nav-link" @click="closeMenu">Resources</router-link>
          <router-link to="/updates" class="nav-link" @click="closeMenu">Updates</router-link>
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

    <!-- Main Content -->
    <main class="main-content">
      <header class="page-header">
        <h1 class="page-title">Resource Utilization Updates</h1>
        <p class="page-subtitle">
          Share the impact of donated resources in your community
        </p>
      </header>

      <div class="form-container">
        <!-- Project Details -->
        <section class="form-section">
          <h2 class="section-title">Project Details</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="project-name" class="form-label">Project Name</label>
              <input
                type="text"
                id="project-name"
                placeholder="Enter project name"
                class="form-input"
                v-model="form.projectName"
              />
            </div>
            
            <div class="form-group">
              <label for="date" class="form-label">Date</label>
              <input
                type="date"
                id="date"
                class="form-input"
                v-model="form.date"
              />
            </div>
            
            <div class="form-group">
              <label for="beneficiaries" class="form-label">Beneficiaries</label>
              <input
                type="number"
                id="beneficiaries"
                placeholder="0"
                class="form-input"
                v-model="form.beneficiaries"
              />
            </div>
          </div>
        </section>

        <!-- Impact Description -->
        <section class="form-section">
          <h2 class="section-title">Impact Description</h2>
          <textarea
            id="impact-description"
            placeholder="Describe how the resources are being utilized and their impact..."
            rows="6"
            class="form-textarea"
            v-model="form.impactDescription"
          ></textarea>
        </section>

        <!-- Visual Documentation -->
        <section class="form-section">
          <h2 class="section-title">Visual Documentation</h2>
          <div class="upload-area" @click="triggerFileUpload" @dragover.prevent @drop="handleDrop">
            <div class="upload-content">
              <i class="fas fa-cloud-upload-alt"></i>
              <p class="upload-text">Drag and drop files here or click to upload</p>
              <p class="upload-hint">Supported files: JPG, PNG, GIF, Max 5MB</p>
              <input
                type="file"
                id="file-upload"
                ref="fileInput"
                class="hidden"
                multiple
                accept="image/jpeg,image/png,image/gif"
                @change="handleFileUpload"
              />
            </div>
          </div>
          
          <!-- Image Previews -->
          <div class="image-previews" v-if="uploadedImages.length > 0">
            <div class="image-preview" v-for="(image, index) in uploadedImages" :key="index">
              <img :src="image.preview" :alt="`Upload ${index + 1}`" class="preview-image" />
              <button class="remove-image" @click="removeImage(index)">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </section>

        <!-- Additional Notes -->
        <section class="form-section">
          <h2 class="section-title">Additional Notes</h2>
          <textarea
            id="additional-notes"
            placeholder="Any relevant information..."
            rows="4"
            class="form-textarea"
            v-model="form.additionalNotes"
          ></textarea>
        </section>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button @click="cancel" class="secondary-button">
            Cancel
          </button>
          <button @click="submitUpdate" class="primary-button">
            Submit Update
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="page-footer">
      <p class="copyright">© 2025 EduShare. All rights reserved.</p>
      <div class="footer-links">
        <router-link to="/privacy" class="footer-link">Privacy Policy</router-link>
        <router-link to="/terms" class="footer-link">Terms of Service</router-link>
        <router-link to="/help" class="footer-link">Help Center</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ResourceUpdate',
  props: {
    donationId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      form: {
        projectName: '',
        date: '',
        beneficiaries: 0,
        impactDescription: '',
        additionalNotes: '',
      },
      uploadedImages: [],
      isDarkMode: false,
      isMenuOpen: false,
    };
  },
  methods: {
    submitUpdate() {
      const formData = {
        ...this.form,
        donationId: this.donationId,
        images: this.uploadedImages.map(img => img.file),
      };

      console.log('Submitting update:', formData);
      
      this.$router.push({
        name: 'SubmittedSuccessfully',
        query: {
          type: 'update',
          ref: 'UPD-' + Date.now(),
        },
      }).catch(err => console.error('Navigation error:', err));
    },
    cancel() {
      this.$router.go(-1);
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.processFiles(files);
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.processFiles(files);
    },
    processFiles(files) {
      Array.from(files).forEach(file => {
        if (file.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.uploadedImages.push({
              file,
              preview: e.target.result,
            });
          };
          reader.readAsDataURL(file);
        }
      });
    },
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  mounted() {
    if (this.donationId) {
      console.log('Loaded resource update for donation:', this.donationId);
    }
  },
};
</script>

<style scoped>
/* CSS Variables */
.resource-update-page {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;

  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  transition: background-color 0.3s ease;
}

/* Dark Mode */
.resource-update-page.dark-mode {
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

/* Main Content */
.main-content {
  flex: 1;
  padding: 48px 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
  animation: fadeIn 1s ease-in;
}

.page-subtitle {
  font-size: 18px;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  animation: fadeIn 1.2s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Form Container */
.form-container {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
}

.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 8px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 14px;
  background: var(--card-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Upload Area */
.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: var(--border-radius);
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.upload-area:hover {
  border-color: var(--primary-color);
  background: #f0f7ff;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-content i {
  font-size: 40px;
  color: var(--primary-color);
}

.upload-text {
  font-weight: 500;
  font-size: 16px;
  color: var(--text-color);
}

.upload-hint {
  font-size: 14px;
  color: #6b7280;
}

/* Image Previews */
.image-previews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.image-preview {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  height: 140px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.image-preview:hover {
  transform: scale(1.05);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.remove-image:hover {
  background: var(--primary-color);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}

.primary-button {
  background: var(--primary-color);
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button:hover {
  background: #2563eb;
}

.secondary-button {
  background: #e5e7eb;
  color: var(--text-color);
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background: #d1d5db;
}

/* Footer */
.page-footer {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 24px;
  text-align: center;
  color: #fff;
}

.copyright {
  font-size: 14px;
  margin-bottom: 12px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.3s ease;
}

.footer-link:hover {
  opacity: 0.8;
}

/* Responsive Adjustments */
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

  .main-content {
    padding: 32px 16px;
  }

  .form-container {
    padding: 24px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .image-previews {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .section-title {
    font-size: 20px;
  }

  .form-container {
    padding: 16px;
  }

  .upload-area {
    padding: 24px;
  }

  .primary-button,
  .secondary-button {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
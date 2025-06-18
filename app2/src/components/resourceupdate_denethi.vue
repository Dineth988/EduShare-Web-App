<template>
    <div class="resource-update">
      <!-- Navigation Bar -->
      <nav class="navbar">
        <div class="logo-container">
          <img src="https://via.placeholder.com/30" alt="EduShare Logo">
          <span class="logo-text">EduShare</span>
        </div>
        <div class="nav-links">
          <router-link to="/home" class="nav-link">Home</router-link>
          <router-link to="/resources" class="nav-link">Resources</router-link>
          <router-link to="/updates" class="nav-link">Updates</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </div>
      </nav>
  
      <!-- Main Content -->
      <main class="main-content">
        <h1 class="page-title">Resource Utilization Updates</h1>
        <p class="page-subtitle">Share the impact of donated resources in your community</p>
        
        <div class="form-container">
          <!-- Project Details -->
          <section class="form-section">
            <h2 class="section-title">Project Details</h2>
            <div class="form-grid">
              <div class="form-group">
                <label for="project-name">Project Name</label>
                <input 
                  v-model="form.projectName"
                  type="text" 
                  id="project-name" 
                  placeholder="Enter project name"
                >
              </div>
              <div class="form-group">
                <label for="date">Date</label>
                <input 
                  v-model="form.date"
                  type="date" 
                  id="date"
                >
              </div>
              <div class="form-group">
                <label for="beneficiaries">Number of Beneficiaries</label>
                <input 
                  v-model.number="form.beneficiaries"
                  type="number" 
                  id="beneficiaries" 
                  placeholder="0"
                  min="0"
                >
              </div>
            </div>
          </section>
  
          <!-- Impact Description -->
          <section class="form-section">
            <h2 class="section-title">Impact Description</h2>
            <textarea 
              v-model="form.impactDescription"
              id="impact-description" 
              placeholder="Describe how the resources are being utilized and their impact..."
              rows="4"
            ></textarea>
          </section>
  
          <!-- Visual Documentation -->
          <section class="form-section">
            <h2 class="section-title">Visual Documentation</h2>
            <div 
              class="upload-area"
              @dragover.prevent="dragOver = true"
              @dragleave="dragOver = false"
              @drop.prevent="handleFileDrop"
              :class="{ 'drag-over': dragOver }"
            >
              <label for="file-upload" class="upload-label">
                <span class="upload-icon">📎</span>
                <span>Drag and drop files here or click to upload</span>
                <p class="upload-hint">Supported files: JPG, PNG, GIF, Max 5MB</p>
                <input 
                  type="file" 
                  id="file-upload" 
                  class="file-input"
                  multiple 
                  accept="image/jpeg,image/png,image/gif"
                  @change="handleFileUpload"
                >
              </label>
            </div>
            
            <!-- Preview of Uploaded Images -->
            <div class="image-previews" v-if="uploadedFiles.length > 0">
              <div 
                class="image-preview"
                v-for="(file, index) in uploadedFiles"
                :key="index"
              >
                <img 
                  :src="getImagePreview(file)" 
                  alt="Uploaded Image"
                  class="preview-image"
                >
                <button 
                  class="remove-button"
                  @click="removeImage(index)"
                >✖</button>
              </div>
            </div>
          </section>
  
          <!-- Additional Notes -->
          <section class="form-section">
            <h2 class="section-title">Additional Notes</h2>
            <textarea 
              v-model="form.additionalNotes"
              id="additional-notes" 
              placeholder="Any relevant information..."
              rows="4"
            ></textarea>
          </section>
  
          <!-- Action Buttons -->
          <div class="action-buttons">
            <button 
              class="cancel-button"
              @click="resetForm"
            >Cancel</button>
            <button 
              class="submit-button"
              @click="submitForm"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit Update</span>
            </button>
          </div>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="page-footer">
        <p class="copyright">© 2024 Mouri. All rights reserved.</p>
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
    data() {
      return {
        dragOver: false,
        isSubmitting: false,
        uploadedFiles: [],
        form: {
          projectName: '',
          date: '',
          beneficiaries: 0,
          impactDescription: '',
          additionalNotes: ''
        }
      }
    },
    methods: {
      handleFileUpload(e) {
        const files = Array.from(e.target.files)
        this.processFiles(files)
      },
      handleFileDrop(e) {
        this.dragOver = false
        const files = Array.from(e.dataTransfer.files)
        this.processFiles(files)
      },
      processFiles(files) {
        // Filter by file type and size
        const validFiles = files.filter(file => 
          ['image/jpeg', 'image/png', 'image/gif'].includes(file.type) &&
          file.size <= 5 * 1024 * 1024 // 5MB
        )
        
        if (validFiles.length !== files.length) {
          alert('Some files were invalid. Only JPG, PNG, GIF under 5MB are allowed.')
        }
        
        this.uploadedFiles = [...this.uploadedFiles, ...validFiles]
      },
      getImagePreview(file) {
        return file instanceof File ? URL.createObjectURL(file) : file
      },
      removeImage(index) {
        this.uploadedFiles.splice(index, 1)
      },
      resetForm() {
        this.form = {
          projectName: '',
          date: '',
          beneficiaries: 0,
          impactDescription: '',
          additionalNotes: ''
        }
        this.uploadedFiles = []
      },
      async submitForm() {
        this.isSubmitting = true
        
        try {
          // Here you would typically send the data to your backend
          const formData = new FormData()
          
          // Append form fields
          Object.entries(this.form).forEach(([key, value]) => {
            formData.append(key, value)
          })
          
          // Append files
          this.uploadedFiles.forEach(file => {
            formData.append('images', file)
          })
          
          // Example API call (replace with your actual endpoint)
          // await axios.post('/api/resource-updates', formData)
          
          alert('Update submitted successfully!')
          this.resetForm()
        } catch (error) {
          console.error('Submission error:', error)
          alert('There was an error submitting your update. Please try again.')
        } finally {
          this.isSubmitting = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .resource-update {
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
    transition: all 0.3s ease;
  }
  
  .nav-link:hover {
    color: #2563eb;
    background-color: #e5e7eb;
  }
  
  .nav-link.router-link-exact-active {
    background-color: #dbeafe;
    color: #1d4ed8;
  }
  
  /* Main Content Styles */
  .main-content {
    flex: 1;
    padding: 3rem 1rem;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
  
  .page-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .page-subtitle {
    color: #4b5563;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .form-container {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 42rem;
    margin: 0 auto;
  }
  
  .form-section {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    color: #374151;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-family: inherit;
    transition: all 0.3s;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
  
  /* Upload Area Styles */
  .upload-area {
    border: 2px dashed #d1d5db;
    border-radius: 0.5rem;
    padding: 1.5rem;
    text-align: center;
    margin-bottom: 1rem;
    transition: all 0.3s;
  }
  
  .upload-area.drag-over {
    border-color: #3b82f6;
    background-color: #f0f7ff;
  }
  
  .upload-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  
  .upload-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .upload-hint {
    color: #6b7280;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  
  .file-input {
    display: none;
  }
  
  /* Image Previews */
  .image-previews {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
  }
  
  .image-preview {
    position: relative;
    height: 100px;
  }
  
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.25rem;
  }
  
  .remove-button {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    background-color: white;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .remove-button:hover {
    color: #dc2626;
  }
  
  /* Action Buttons */
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .cancel-button {
    background-color: #e5e7eb;
    color: #374151;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .cancel-button:hover {
    background-color: #d1d5db;
  }
  
  .submit-button {
    background-color: #2563eb;
    color: white;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover:not(:disabled) {
    background-color: #1d4ed8;
  }
  
  .submit-button:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
  
  /* Footer Styles */
  .page-footer {
    background-color: white;
    padding: 1.5rem;
    text-align: center;
    margin-top: auto;
  }
  
  .copyright {
    color: #4b5563;
  }
  
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }
  
  .footer-link {
    color: #6b7280;
    text-decoration: none;
  }
  
  .footer-link:hover {
    color: #2563eb;
  }
  </style>
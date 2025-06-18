<template>
  <div class="add-user-container">
    <div class="header">
      <h1>Add New User</h1>
      <button class="back-btn" @click="goBack">← Back to Users</button>
    </div>

    <div class="form-card">
      <form @submit.prevent="submitForm">
        <!-- Photo Upload Section -->
        <div class="photo-upload">
          <div class="photo-preview" @click="triggerFileInput">
            <img v-if="imagePreview" :src="imagePreview" alt="User Preview" class="preview-image" />
            <div v-else class="photo-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                <line x1="16" y1="5" x2="22" y2="5"></line>
                <line x1="19" y1="2" x2="19" y2="8"></line>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
            </div>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileUpload"
              accept="image/*"
              class="file-input"
            />
          </div>
          <div class="upload-instructions">
            <p>Click to upload photo</p>
            <p class="file-requirements">JPG, PNG (Max 2MB)</p>
          </div>
          <p v-if="fileError" class="error-message">{{ fileError }}</p>
        </div>

        <div class="form-group">
          <label class="required">Full Name</label>
          <input v-model="formData.full_name" type="text" placeholder="Full Name" required />
        </div>

        <div class="form-group">
          <label class="required">Email</label>
          <input v-model="formData.email" type="email" placeholder="Email" required />
        </div>

        <div class="form-group">
          <label class="required">Password</label>
          <input v-model="formData.password" type="password" placeholder="Password" required />
        </div>

        <div class="form-group">
          <label class="required">Role</label>
          <select v-model="formData.role" required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="recipient">Recipient</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div class="form-group">
          <label>Organization ID</label>
          <input v-model="formData.organization_id" type="text" placeholder="Organization ID" />
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="goBack">Cancel</button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creating...' : 'Create User' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)
const isSubmitting = ref(false)

const formData = ref({
  full_name: '',
  email: '',
  password: '',
  role: '',
  organization_id: null,
  photo: null,
})

const imagePreview = ref(null)
const fileError = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  fileError.value = null

  if (!file) return

  const validTypes = ['image/jpeg', 'image/png', 'image/gif']
  const maxSize = 2 * 1024 * 1024 // 2MB

  if (!validTypes.includes(file.type)) {
    fileError.value = 'Only JPG, PNG images are allowed'
    return
  }

  if (file.size > maxSize) {
    fileError.value = 'Image must be less than 2MB'
    return
  }

  formData.value.photo = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const submitForm = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true

  try {
    // Set created_at timestamp
    formData.value.created_at = new Date().toISOString()

    // Prepare the data to send
    const userData = {
      full_name: formData.value.full_name,
      email: formData.value.email,
      password: formData.value.password,
      role: formData.value.role,
      organization_id: formData.value.organization_id,
    }

    // Send to backend
    const response = await fetch('http://localhost:5030/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create user')
    }

    const result = await response.json()
    console.log('User created:', result.user)
    alert('User created successfully!')
    router.push('/user-management')
  } catch (error) {
    console.error('Error creating user:', error)
    alert(error.message || 'Failed to create user. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.push('/user-management')
}
</script>

<style scoped>
.add-user-container {
  padding: 40px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 32px;
  color: #333;
}

.back-btn {
  background: none;
  border: none;
  color: #3498db;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
}

.back-btn:hover {
  background-color: #e1f0fa;
}

.form-card {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.photo-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.photo-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 2px dashed #ccc;
  transition: all 0.3s ease;
}

.photo-preview:hover {
  border-color: #3498db;
  background-color: #e8f4fd;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.file-input {
  display: none;
}

.upload-instructions {
  text-align: center;
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.file-requirements {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.error-message {
  color: #e74c3c;
  font-size: 13px;
  margin-top: 5px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group label.required:after {
  content: '*';
  color: #e74c3c;
  margin-left: 4px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.readonly-field {
  background-color: #f5f5f5;
  cursor: not-allowed;
  color: #666;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #3498db;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
}

.cancel-btn {
  padding: 10px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #2980b9;
}

.submit-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .add-user-container {
    padding: 20px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .form-card {
    padding: 20px;
  }
}
</style>

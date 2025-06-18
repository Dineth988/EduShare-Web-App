<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h2>Confirm Resource Request</h2>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>

      <div class="modal-content">
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- Resource Details -->
        <div class="resource-info">
          <h3>{{ resource.title }}</h3>
          <div class="image-section" v-if="resource?.image_link">
            <img :src="resource.image_link" class="resource-image" alt="Resource preview" />
          </div>

          <div class="detail">
            <span>Type:</span>
            <span>{{ resource.type }}</span>
          </div>

          <div class="detail">
            <span>Condition:</span>
            <span>{{ resource.condition }}</span>
          </div>
        </div>

        <!-- Request Form -->
        <div class="request-form">
          <div class="form-group">
            <label for="quantity">Quantity Needed:</label>
            <input
              type="number"
              id="quantity"
              v-model="formData.quantity_needed"
              min="1"
              required
            />
          </div>

          <div class="form-group">
            <label for="city">City :</label>
            <input type="text" id="city" v-model="formData.city" required />
          </div>

          <div class="form-group">
            <label>Urgency:</label>
            <select v-model="formData.urgency" required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="modal-actions">
          <button @click="closeModal" class="btn cancel" :disabled="isLoading">Cancel</button>
          <button @click="handleConfirm" class="btn confirm" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            {{ isLoading ? 'Submitting...' : 'Confirm Request' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore' // Assuming you have auth store

const props = defineProps({
  resource: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'success', 'error'])
const authStore = useAuthStore()

const formData = ref({
  quantity_needed: 1,
  urgency: 'medium',
  city: '',
})

const isLoading = ref(false)
const errorMessage = ref('')

const closeModal = () => {
  emit('close')
}

const handleConfirm = async () => {
  if (!formData.value.quantity_needed || !formData.value.urgency || !formData.value.city) {
    errorMessage.value = 'Please fill all required fields'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await axios.post(
      '/api/requests',
      {
        // Only send required fields
        resource_id: props.resource.resource_id,
        quantity_needed: formData.value.quantity_needed,
        urgency: formData.value.urgency,
        city: formData.value.city,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    // Add success handling
    emit('success', response.data)
    closeModal()
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Failed to submit request'
    emit('error', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-card {
  background: white;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(0);
  animation: slideUp 0.3s ease;
  max-height: 90vh; /* Limit height to viewport */
  overflow: hidden; /* Hide overflow from card itself */
  display: flex;
  flex-direction: column;
}

.modal-content {
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: calc(90vh - 120px); /* Account for header/footer */
  padding-right: 8px; /* Prevent content shift from scrollbar */
}
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f2f5;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.close-btn {
  background: #f8f9fa;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6c757d;
}

.close-btn:hover {
  background: #e9ecef;
  transform: rotate(90deg);
}

.resource-info {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 0.75rem;
}

.resource-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 1rem;
}

.resource-image {
  width: 100%; /* Make image responsive */
  max-width: 200px; /* Limit the maximum width */
  height: auto; /* Maintain aspect ratio */
  border-radius: 0.5rem; /* Optional: rounded corners */
  display: block;
  margin: 0 auto; /* Center the image */
}

.detail {
  display: flex;
  justify-content: space-between;
  margin: 0.75rem 0;
  padding: 0.5rem 0;
  color: #4a4a4a;
  font-size: 0.95rem;
}

.detail span:first-child {
  color: #6c757d;
  font-weight: 500;
}

.form-group {
  margin: 1.5rem 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  color: #495057;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4dabf7;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.1);
}

.form-group input:hover,
.form-group select:hover {
  border-color: #ced4da;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn.cancel {
  background: #f8f9fa;
  color: #6c757d;
}

.btn.cancel:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.btn.confirm {
  background: linear-gradient(135deg, #4dabf7 0%, #228be6 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(34, 139, 230, 0.15);
}

.btn.confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 8px rgba(34, 139, 230, 0.2);
}

/* Urgency Level Indicators */
.urgency-indicator {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
}

.urgency-option {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.urgency-option.active {
  border-color: #4dabf7;
  background: #f8faff;
}

.urgency-option:hover {
  border-color: #ced4da;
}

.error-message {
  color: #dc3545;
  background: #f8d7da;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #f5c6cb;
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 480px) {
  .modal-card {
    padding: 1.5rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .urgency-indicator {
    flex-direction: column;
  }
}
</style>

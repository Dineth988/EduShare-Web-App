<template>
  <div class="page">
    <div class="card">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/">Home</router-link> > <router-link to="/">Resources</router-link>
      </div>

      <!-- Title -->
      <div class="header">
        <h1 class="title">{{ resource?.title }}</h1>
      </div>

      <!-- Loading & Error States -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading Resource Details...</p>
      </div>

      <div v-if="error" class="error-state">
        {{ error }}
      </div>

      <!-- Resource details -->
      <div class="image-section" v-if="resource?.image_link">
        <h2 class="section-title">Preview</h2>
        <img :src="resource.image_link" class="resource-image" alt="Resource preview" />
      </div>

      <div v-if="resource" class="details">
        <!-- <div class="detail">
          <strong>Resource ID:</strong><span>{{ resource.resource_id }}</span>
        </div> -->
        <div class="detail">
          <strong>Type:</strong><span>{{ resource.type }}</span>
        </div>
        <div class="detail">
          <strong>Condition:</strong><span>{{ resource.condition }}</span>
        </div>
        <!-- <div class="detail">
          <strong>Format:</strong><span>{{ resource.is_digital ? 'Digital' : 'Physical' }}</span>
        </div> -->
        <div class="detail">
          <strong>Created At:</strong><span>{{ formattedDate(resource.createdAt) }}</span>
        </div>
      </div>

      <!-- Description -->
      <div class="section">
        <h2 class="section-title">Description</h2>
        <p class="section-content">
          {{ resource?.description || 'No description available' }}
        </p>
      </div>

      <!-- Buttons -->
      <div class="button-row">
        <button @click="$router.go(-1)" class="btn cancel">Back</button>
        <button @click="handleConfirm" class="btn confirm" :disabled="!resource">
          {{ resource?.is_digital ? 'Download' : 'Request Resource' }}
        </button>
      </div>

      <RequestResourceModal
        v-if="showRequestModal"
        :resource="resource"
        @close="showRequestModal = false"
        @confirm="handleRequestSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import RequestResourceModal from '@/components/RequestResourceModal.vue'

const route = useRoute()
const resource = ref(null)
const loading = ref(true)
const error = ref(null)
const showRequestModal = ref(false)

const formattedDate = (dateString) => {
  if (!dateString) return 'N/A'
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Add prop validation
const props = defineProps({
  resource: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['resource_id', 'title', 'type', 'condition'].every((prop) => prop in value)
    },
  },
})

// Update fetchResource function in ResourceRequest.vue
const fetchResource = async () => {
  try {
    loading.value = true
    const response = await axios.get(`/api/resources/${route.params.resource_id}`)

    // Handle direct object response
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Resource not found')
    }

    resource.value = {
      ...response.data,
      description: response.data.description || 'No description available',
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Failed to load resource details'
    console.error('Fetch error:', err)
    setTimeout(() => fetchResource(), 5000)
  } finally {
    loading.value = false
  }
}

const handleConfirm = () => {
  if (!resource.value) return

  if (resource.value.is_digital) {
    alert('Digital download feature coming soon!')
  } else {
    showRequestModal.value = true // Show modal instead of alert
  }
}

const handleRequestSubmit = async (requestData) => {
  try {
    const response = await axios.post('/api/requests', {
      resource_id: resource.value.resource_id,
      ...requestData,
    })

    alert('Request submitted successfully!')
    showRequestModal.value = false
  } catch (err) {
    alert(`Error submitting request: ${err.response?.data?.message || err.message}`)
  }
}

onMounted(() => {
  fetchResource()
})
</script>
<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem 3rem;
  max-width: 800px;
  width: 100%;
}

.breadcrumb {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.breadcrumb a {
  text-decoration: none;
  color: #3b82f6;
}

.breadcrumb-id {
  color: #111827;
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e40af;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.details {
  margin-top: 1.5rem;
}

.detail {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 1rem;
  color: #374151;
}

.section-content {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #4b5563;
  font-size: 1rem;
}

.button-row {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.btn.cancel {
  background-color: #e5e7eb;
  color: #374151;
}

.btn.cancel:hover {
  background-color: #d1d5db;
}

.btn.confirm {
  background-color: #2563eb;
  color: #ffffff;
}

.btn.confirm:hover {
  background-color: #1d4ed8;
}

.loading-state {
  text-align: center;
  padding: 2rem;
  color: #64748b;
}

.spinner {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 0.25rem solid #e2e8f0;
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  padding: 1.5rem;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 0.5rem;
  text-align: center;
  margin: 2rem 0;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.resource-image {
  max-width: 50%;
  border-radius: 0.75rem;
  margin-top: 1rem;
  border: 1px solid #e5e7eb;
}

@media (max-width: 600px) {
  .card {
    padding: 1.5rem;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .button-row {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

/* Add responsive styles */
@media (max-width: 480px) {
  .modal-card {
    padding: 1rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-actions button {
    width: 100%;
  }
}
</style>

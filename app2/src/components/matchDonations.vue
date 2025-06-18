<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1e293b;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 16px 32px;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.navbar-logo {
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: 700;
  color: #3b82f6;
  transition: color 0.2s ease;
}

.navbar-logo:hover {
  color: #2563eb;
}

.navbar-logo::before {
  content: '🎓';
  margin-right: 8px;
  font-size: 24px;
}

.navbar-links {
  display: flex;
  gap: 24px;
}

.navbar-links a {
  text-decoration: none;
  color: #475569;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.navbar-links a:hover {
  color: #3b82f6;
}

.navbar-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.navbar-actions a {
  text-decoration: none;
  color: #475569;
  font-size: 20px;
  transition: color 0.2s ease;
}

.navbar-actions a:hover {
  color: #3b82f6;
}

.container {
  max-width: 1080px;
  margin: 40px auto;
  padding: 0 24px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.header p {
  font-size: 16px;
  color: #64748b;
  font-weight: 400;
}

.donation-table {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.donation-table:hover {
  transform: translateY(-4px);
}

.donation-table table {
  width: 100%;
  border-collapse: collapse;
}

.donation-table th,
.donation-table td {
  padding: 16px 24px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.donation-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  text-transform: uppercase;
}

.donation-table td {
  color: #475569;
  font-size: 14px;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section h2::before {
  content: '✨';
  font-size: 20px;
}

.recipient-info {
  display: flex;
  gap: 24px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.recipient-info:hover {
  transform: translateY(-4px);
}

.recipient-details {
  flex: 1;
}

.recipient-details p {
  font-size: 14px;
  color: #64748b;
  margin: 8px 0;
  line-height: 1.5;
}

.recipient-details .location {
  font-weight: 600;
  color: #1e293b;
  font-size: 16px;
}

.recipient-image img {
  width: 240px;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.delivery-options {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.delivery-option {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delivery-option.active {
  border: 2px solid #3b82f6;
  background: #eff6ff;
  transform: scale(1.02);
}

.delivery-option:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.delivery-option h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.delivery-option h3::before {
  content: '🚚';
  font-size: 16px;
}

.delivery-option p {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.delivery-option input {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.delivery-option input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.support {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.support a {
  text-decoration: none;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.support a:hover {
  color: #2563eb;
}

.support a::before {
  content: 'ℹ️';
  margin-right: 6px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.buttons a,
.buttons button {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.buttons a {
  color: #475569;
  background: #e2e8f0;
}

.buttons a:hover {
  background: #cbd5e1;
}

.buttons button {
  background: #3b82f6;
  color: #ffffff;
  border: none;
}

.buttons button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.loading {
  text-align: center;
  padding: 80px;
  font-size: 20px;
  color: #64748b;
  animation: pulse 1.5s infinite;
}

.error {
  color: #ef4444;
  text-align: center;
  padding: 80px;
  font-size: 20px;
  background: #fef2f2;
  border-radius: 12px;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
    margin: 24px auto;
  }

  .navbar {
    padding: 12px 16px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .navbar-links {
    gap: 16px;
  }

  .recipient-info {
    flex-direction: column;
  }

  .recipient-image img {
    width: 100%;
    height: 200px;
  }

  .delivery-options {
    flex-direction: column;
    gap: 16px;
  }

  .header h1 {
    font-size: 24px;
  }

  .section h2 {
    font-size: 20px;
  }
}
</style>
<template>
  <div>
    <div class="navbar">
      <div class="navbar-logo">EduShare</div>
      <div class="navbar-links">
        <router-link to="/">Home</router-link>
        <router-link to="/donate">Donate</router-link>
        <router-link to="/browse">Browse</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <div class="navbar-actions">
        <router-link to="/notifications">🔔</router-link>
        <router-link to="/profile">👤</router-link>
      </div>
    </div>

    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="loading">Loading recipient data...</div>

      <!-- Error State -->
      <div v-if="error" class="error">{{ error }}</div>

      <!-- Content -->
      <div v-if="recipientData">
        <div class="header">
          <h1>Donation Details for {{ recipientData.organization_name }}</h1>
          <p>Empowering education through your generosity</p>
        </div>

        <div class="donation-table">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in recipientData.requested_items" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }} units</td>
                <td>{{ item.condition }}</td>
                <td>{{ item.notes }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Recipient Information</h2>
          <div class="recipient-info">
            <div class="recipient-details">
              <p class="location">{{ recipientData.organization_name }}</p>
              <p>{{ recipientData.address }}</p>
              <p>{{ recipientData.distance }} miles away</p>
              <p>{{ recipientData.description }}</p>
            </div>
            <div class="recipient-image">
              <img :src="recipientData.image_url" :alt="recipientData.organization_name" />
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Choose Delivery Method</h2>
          <div class="delivery-options">
            <div
              class="delivery-option"
              :class="{ active: selectedDelivery === 'courier' }"
              @click="selectDeliveryOption('courier')"
            >
              <h3>Arrange Delivery via Courier Service</h3>
              <p>Professional handling with tracking and insurance</p>
              <template v-if="selectedDelivery === 'courier'">
                <label>Pickup Location</label>
                <input v-model="pickupLocation" type="text" placeholder="Enter pickup location" />
                <label>Contact Person Name</label>
                <input v-model="contactName" type="text" placeholder="Enter contact person name" />
                <label>Contact Phone Number</label>
                <input
                  v-model="contactPhone"
                  type="text"
                  placeholder="Enter contact phone number"
                />
              </template>
            </div>
            <div
              class="delivery-option"
              :class="{ active: selectedDelivery === 'self' }"
              @click="selectDeliveryOption('self')"
            >
              <h3>I will deliver the donation myself</h3>
              <p>Deliver the items directly at your preferred time</p>
            </div>
            <div
              class="delivery-option"
              :class="{ active: selectedDelivery === 'recipient' }"
              @click="selectDeliveryOption('recipient')"
            >
              <h3>Recipient will collect the donation</h3>
              <p>Recipient arranges pickup from your location</p>
            </div>
          </div>
        </div>

        <div class="support">
          <router-link to="/support">Need assistance? Contact support</router-link>
          <router-link :to="`/chat`">Contact Recipient</router-link>
        </div>

        <div class="buttons">
          <router-link to="/requests">Back to Details</router-link>
          <button @click="confirmDelivery">Confirm Delivery</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipientData = ref({
  organization_name: '',
  address: '',
  distance: '',
  description: '',
  image_url: '',
  requested_items: [],
  user_id: '',
  request_details: {},
})
const loading = ref(true)
const error = ref(null)
const selectedDelivery = ref('courier')
const pickupLocation = ref('')
const contactName = ref('')
const contactPhone = ref('')

// Function to handle delivery option selection
const selectDeliveryOption = (option) => {
  selectedDelivery.value = option
  if (option !== 'courier') {
    pickupLocation.value = ''
    contactName.value = ''
    contactPhone.value = ''
  }
}

// Confirm delivery details and prepare data for storage
const confirmDelivery = async () => {
  if (!selectedDelivery.value) {
    alert('Please select a delivery method.')
    return
  }
  if (
    selectedDelivery.value === 'courier' &&
    (!pickupLocation.value || !contactName.value || !contactPhone.value)
  ) {
    alert('Please fill in all courier details.')
    return
  }

  // Placeholder for donorId (fetch from auth context, e.g., Vuex/Pinia or API)
  const donorId = 'CURRENT_USER_ID' // Replace with actual user ID from auth

  const deliveryData = {
    requestId: route.params.requestId,
    recipientId: recipientData.value.user_id,
    donorId,
    organizationName: recipientData.value.organization_name,
    requestedItems: recipientData.value.requested_items,
    deliveryMethod: selectedDelivery.value,
    deliveryDetails: {
      pickupLocation: selectedDelivery.value === 'courier' ? pickupLocation.value : null,
      contactName: selectedDelivery.value === 'courier' ? contactName.value : null,
      contactPhone: selectedDelivery.value === 'courier' ? contactPhone.value : null,
    },
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  console.log('Delivery Data for donationDeliveries:', JSON.stringify(deliveryData, null, 2))

  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5038'
    const response = await fetch(`${apiBaseUrl}/api/donation-deliveries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if needed, e.g., 'Bearer ' + token
      },
      body: JSON.stringify(deliveryData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    alert('Delivery details confirmed and saved!')
    // Optionally, redirect to a confirmation page
    // router.push('/confirmation')
  } catch (err) {
    console.error('Error saving delivery data:', err)
    alert(`Error: ${err.message}`)
  }
}

const fetchRequestAndRecipient = async () => {
  try {
    loading.value = true
    error.value = null

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5038'

    const requestResponse = await fetch(`${apiBaseUrl}/api/requests/${route.params.requestId}`)

    if (requestResponse.status === 404) {
      throw new Error('Request not found')
    }

    if (!requestResponse.ok) {
      const errorData = await requestResponse.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const { success, data: requestData, message } = await requestResponse.json()

    if (!success) {
      throw new Error(message || 'Invalid response from server')
    }

    console.log('Request Data:', JSON.stringify(requestData, null, 2))

    const recipientId =
      requestData.recipient_id ||
      requestData.user_id ||
      requestData.user?._id ||
      requestData.created_by

    if (!recipientId) {
      console.error('Available fields in request data:', Object.keys(requestData))
      throw new Error(`
        Could not find recipient identifier in request data. 
        Tried: recipient_id, user_id, user._id, created_by
        Request ID: ${route.params.requestId}
      `)
    }

    const userResponse = await fetch(`${apiBaseUrl}/api/user/${recipientId}`)

    if (userResponse.status === 404) {
      throw new Error(`Recipient with ID ${recipientId} not found`)
    }

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch recipient: ${userResponse.status}`)
    }

    const userData = await userResponse.json()

    recipientData.value = createRecipientData(requestData, userData, recipientId)
  } catch (err) {
    error.value = `Error: ${err.message}`
    console.error('Fetch error:', err)

    if (import.meta.env.DEV) {
      console.warn('Using development fallback data')
      recipientData.value = getFallbackData(route.params.requestId)
      error.value = null
    }
  } finally {
    loading.value = false
  }
}

const createRecipientData = (requestData, userData, recipientId) => ({
  organization_name: userData.organization_name || userData.full_name || 'Unknown Organization',
  address: requestData.location || userData.address || 'NIBM Colombo 07',
  distance: requestData.distance || '1',
  description: requestData.description || requestData.title || 'No description available',
  image_url:
    requestData.image_url ||
    userData.profile_picture ||
    'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp',
  requested_items: requestData.items || [
    {
      name: requestData.resource_type || 'Unspecified item',
      quantity: requestData.quantity_needed || 1,
      condition: requestData.condition_preference || 'Any',
      notes: requestData.title || '',
    },
  ],
  user_id: recipientId,
  request_details: {
    ...requestData,
    title: requestData.title,
    resource_type: requestData.resource_type,
    quantity_needed: requestData.quantity_needed,
    urgency: requestData.urgency,
  },
})

const getFallbackData = (requestId) => ({
  organization_name: 'Springfield Elementary',
  address: '123 School St, Springfield',
  distance: '5.2 miles',
  description: 'Laptops for Computer Lab',
  image_url: '/default-org.jpg',
  requested_items: [
    {
      name: 'laptop',
      quantity: 10,
      condition: 'refurbished',
      notes: 'Laptops for Computer Lab',
    },
  ],
  user_id: 'dev-user-' + requestId,
  request_details: {
    request_id: requestId,
    title: 'Laptops for Computer Lab',
    resource_type: 'laptop',
    quantity_needed: 10,
    condition_preference: 'refurbished',
    urgency: 'high',
    status: 'open',
    recipient_id: 'dev-user-' + requestId,
  },
})

onMounted(() => {
  fetchRequestAndRecipient()
})
</script>

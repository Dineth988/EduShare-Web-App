<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Review Resources</h1>
      <div class="user-profile">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop"
          alt="Admin Avatar"
        />
        <span>Admin User</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Pending Review -->
      <div class="pending-review">
        <h2>Pending Review</h2>
        <div
          v-for="resource in pendingResources"
          :key="resource._id"
          class="resource-item"
          @click="selectResource(resource)"
          :class="{ selected: currentResource._id === resource._id }"
        >
          <i>{{ getResourceIcon(resource.resource_type) }}</i>
          <div>
            <p>{{ resource.title }}</p>
            <span>Donated by: {{ resource.donor_id || 'Anonymous' }}</span>
          </div>
          <span class="status" :class="getStatusClass(resource.condition)">
            {{ formatCondition(resource.condition) }}
          </span>
        </div>
      </div>

      <!-- Resource Details -->
      <div class="resource-details" v-if="currentResource._id">
        <div class="resource-images">
          <img
            :src="currentResource.image_link || 'https://via.placeholder.com/300x200?text=No+Image'"
            :alt="currentResource.title"
          />
        </div>
        <div class="resource-info">
          <h2>{{ currentResource.title }}</h2>
          <p class="description">{{ currentResource.description }}</p>
          <div class="meta">
            <p><strong>Type:</strong> {{ currentResource.resource_type }}</p>
            <p><strong>Condition:</strong> {{ formatCondition(currentResource.condition) }}</p>
            <p><strong>Donated by:</strong> {{ currentResource.donor_id || 'Anonymous' }}</p>
            <p><strong>Quantity:</strong> {{ currentResource.quantity }}</p>
            <p><strong>City:</strong> {{ currentResource.city }}</p>
            <p v-if="currentResource.is_digital"><strong>Digital Resource</strong></p>
          </div>
        </div>
        <div class="checklist">
          <h3>Quality Standards</h3>
          <label v-for="(item, index) in checklistItems" :key="index" class="checkbox-item">
            <input type="checkbox" v-model="item.checked" />
            <span>{{ item.label }}</span>
          </label>
        </div>
        <div class="action-buttons">
          <button class="approve" @click="approveResource" :disabled="!allCheckboxesChecked">
            Approve
          </button>
          <button class="remove" @click="removeResource">Remove</button>
        </div>
      </div>
      <div class="resource-details empty-state" v-else>
        <p>No resources pending review</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceReview',
  data() {
    return {
      pendingResources: [],
      currentResource: {},
      checklistItems: [
        { label: 'Meets Quality Guidelines', checked: false },
        { label: 'Age-Appropriate', checked: false },
        { label: 'Functional', checked: false },
        { label: 'Complete Set', checked: false },
        { label: 'No Missing Pages', checked: false },
      ],
    }
  },
  computed: {
    allCheckboxesChecked() {
      return this.checklistItems.every((item) => item.checked)
    },
  },
  mounted() {
    this.fetchPendingResources()
  },
  methods: {
    async fetchPendingResources() {
      try {
        console.log('Fetching pending donations...')
        const response = await fetch('http://localhost:5030/api/resources/pending')

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Server error: ${errorText}`)
        }

        this.pendingResources = await response.json()
        console.log('Received donations:', this.pendingResources)

        if (this.pendingResources.length > 0) {
          this.currentResource = this.pendingResources[0]
        } else {
          this.currentResource = {}
        }
      } catch (error) {
        console.error('Error fetching donations:', error)
        alert('Failed to load donations. Please check console for details.')
      }
    },
    selectResource(resource) {
      this.currentResource = resource
      // Reset checkboxes when selecting a new resource
      this.checklistItems.forEach((item) => (item.checked = false))
    },
    getResourceIcon(type) {
      const icons = {
        'Printed Materials': '📚',
        Equipment: '🔬',
        Supplies: '🎨',
        Digital: '💾',
        Other: '📦',
      }
      return icons[type] || '📦'
    },
    formatCondition(condition) {
      const conditions = {
        'like-new': 'Like New',
        new: 'New',
        good: 'Good',
        fair: 'Fair',
        poor: 'Poor',
      }
      return conditions[condition] || condition
    },
    getStatusClass(condition) {
      return (
        {
          'like-new': 'new',
          new: 'new',
          good: 'used-good',
          fair: 'used-fair',
          poor: 'used-poor',
        }[condition] || ''
      )
    },
    async approveResource() {
      if (!this.allCheckboxesChecked) {
        alert('Please check all quality standards before approving')
        return
      }

      try {
        const response = await fetch(
          `http://localhost:5030/api/resources/${this.currentResource._id}/approve`,
          { method: 'PUT' },
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to approve resource')
        }

        alert('Resource approved successfully!')
        // Remove the approved resource from the local list
        this.pendingResources = this.pendingResources.filter(
          (r) => r._id !== this.currentResource._id,
        )

        // Select the next resource if available
        if (this.pendingResources.length > 0) {
          this.currentResource = this.pendingResources[0]
        } else {
          this.currentResource = {}
        }
      } catch (error) {
        console.error('Error approving resource:', error)
        alert(error.message || 'Failed to approve resource. Please try again.')
      }
    },
    async removeResource() {
      if (!confirm('Are you sure you want to remove this resource?')) {
        return
      }

      try {
        const response = await fetch(
          `http://localhost:5030/api/resources/${this.currentResource._id}`,
          { method: 'DELETE' },
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to remove resource')
        }

        alert('Resource removed successfully!')
        // Remove the resource from the local list
        this.pendingResources = this.pendingResources.filter(
          (r) => r._id !== this.currentResource._id,
        )

        // Select the next resource if available
        if (this.pendingResources.length > 0) {
          this.currentResource = this.pendingResources[0]
        } else {
          this.currentResource = {}
        }
      } catch (error) {
        console.error('Error removing resource:', error)
        alert(error.message || 'Failed to remove resource. Please try again.')
      }
    },
  },
}
</script>

<style scoped>
/* Keep your existing styles the same */

/* Your existing styles remain the same */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-profile span {
  font-weight: 500;
  color: #555;
}

.main-content {
  display: flex;
  gap: 20px;
}

.pending-review {
  flex: 1;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
}

.pending-review h2 {
  font-size: 18px;
  color: #444;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.resource-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f9f9f9;
}

.resource-item:hover {
  background-color: #f0f0f0;
}

.resource-item.selected {
  background-color: #e6f2ff;
  border-left: 4px solid #1a73e8;
}

.resource-item i {
  font-size: 24px;
  margin-right: 15px;
  color: #1a73e8;
}

.resource-item div {
  flex: 1;
}

.resource-item p {
  font-weight: 500;
  margin: 0 0 5px 0;
  color: #333;
}

.resource-item span {
  font-size: 13px;
  color: #666;
}

.status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status.new {
  background-color: #e0f7fa;
  color: #00838f;
}

.status.used-good {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.used-fair {
  background-color: #fff8e1;
  color: #ff8f00;
}

.status.used-poor {
  background-color: #ffebee;
  color: #c62828;
}

.resource-details {
  flex: 2;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.resource-details.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 16px;
}

.resource-images {
  margin-bottom: 20px;
  text-align: center;
}

.resource-images img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 6px;
  object-fit: contain;
}

.resource-info h2 {
  font-size: 22px;
  color: #333;
  margin: 0 0 10px 0;
}

.description {
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
}

.meta {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.meta p {
  margin: 5px 0;
  color: #444;
}

.checklist {
  margin-bottom: 20px;
}

.checklist h3 {
  font-size: 16px;
  color: #444;
  margin-bottom: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.checkbox-item:hover {
  background-color: #f0f0f0;
}

.checkbox-item input {
  margin-right: 10px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.action-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.approve {
  background-color: #4caf50;
  color: white;
}

.approve:hover:not(:disabled) {
  background-color: #3d8b40;
}

.approve:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.remove {
  background-color: #f44336;
  color: white;
}

.remove:hover {
  background-color: #d32f2f;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .pending-review {
    max-height: none;
    margin-bottom: 20px;
  }
}
</style>

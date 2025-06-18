<template>
  <div class="container">
    <h2>Potential Matches</h2>
    <p>Review and manage potential matches</p>
    <button class="back-btn">Back</button>

    <div class="search-filter">
      <input v-model="searchQuery" type="text" placeholder="Search matches..." />
      <select v-model="priorityFilter">
        <option value="">Priority</option>
        <option value="High Priority">High Priority</option>
        <option value="Medium Priority">Medium Priority</option>
        <option value="Low Priority">Low Priority</option>
      </select>
      <select v-model="locationFilter">
        <option value="">Location</option>
        <option value="San Francisco, CA">San Francisco, CA</option>
        <option value="Oakland, CA">Oakland, CA</option>
        <option value="San Jose, CA">San Jose, CA</option>
        <option value="Mountain View, CA">Mountain View, CA</option>
        <option value="Palo Alto, CA">Palo Alto, CA</option>
      </select>
      <button class="sort-btn">↕</button>
    </div>

    <div class="items">
      <div v-for="item in filteredItems" :key="item.id" class="item">
        <div class="item-details">
          <p>
            <strong>{{ item.name }}</strong>
            <span :class="`priority priority-${item.priority.toLowerCase().replace(' ', '-')}`">
              {{ item.priority }}
            </span>
          </p>
          <p>{{ item.location }} • {{ item.distance }} miles</p>
        </div>
        <div class="item-actions">
          <button class="review-btn">Review</button>
          <button class="decline-btn">Decline</button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <select v-model="itemsPerPage">
        <option>10</option>
      </select>
      <div class="pagination-nav">
        <button :class="{ active: currentPage === 1 }" disabled>Previous</button>
        <button :class="{ active: currentPage === 1 }">1</button>
        <button :class="{ active: currentPage === 2 }">2</button>
        <button :class="{ active: currentPage === 3 }">3</button>
        <button :class="{ active: currentPage === 2 }" disabled>Next</button>
      </div>
      <span>Showing 1 to {{ itemsPerPage }} of {{ filteredItems.length }} entries</span>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const items = ref([
      { id: 1, name: 'Office Desk Chair', priority: 'High Priority', location: 'San Francisco, CA', distance: '2.5' },
      { id: 2, name: 'MacBook Pro 16"', priority: 'Medium Priority', location: 'Oakland, CA', distance: '5.1' },
      { id: 3, name: 'Standing Desk', priority: 'Low Priority', location: 'San Jose, CA', distance: '15.3' },
      { id: 4, name: 'Wireless Keyboard', priority: 'High Priority', location: 'Mountain View, CA', distance: '8.7' },
      { id: 5, name: '27" Monitor', priority: 'Medium Priority', location: 'Palo Alto, CA', distance: '10.2' },
    ]);

    const searchQuery = ref('');
    const priorityFilter = ref('');
    const locationFilter = ref('');
    const itemsPerPage = ref(10);
    const currentPage = ref(1);

    const filteredItems = computed(() => {
      return items.value.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesPriority = !priorityFilter.value || item.priority === priorityFilter.value;
        const matchesLocation = !locationFilter.value || item.location === locationFilter.value;
        return matchesSearch && matchesPriority && matchesLocation;
      });
    });

    return {
      searchQuery,
      priorityFilter,
      locationFilter,
      itemsPerPage,
      currentPage,
      filteredItems,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0 0 5px;
  font-size: 24px;
}

p {
  margin: 0 0 20px;
  color: #666;
}

.back-btn {
  background-color: #e6f0fa;
  color: #1a73e8;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.search-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-filter input,
.search-filter select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}

.search-filter select {
  flex: 0 0 150px;
}

.sort-btn {
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.items {
  margin-bottom: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item:last-child {
  border-bottom: none;
}

.item-details p {
  margin: 0;
}

.priority {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 10px;
}

.priority-high-priority {
  background-color: #ffe6e6;
  color: #d93025;
}

.priority-medium-priority {
  background-color: #fff3e0;
  color: #fbbc04;
}

.priority-low-priority {
  background-color: #e6f4ea;
  color: #34a853;
}

.item-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.review-btn {
  background-color: #6200ea;
  color: #fff;
}

.decline-btn {
  background-color: #fff;
  color: #6200ea;
  border: 1px solid #6200ea;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.pagination-nav {
  display: flex;
  gap: 5px;
}

.pagination-nav button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
}

.pagination-nav button.active {
  background-color: #6200ea;
  color: #fff;
  border-color: #6200ea;
}

.pagination-nav button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
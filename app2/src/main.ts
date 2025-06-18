import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Initialize Pinia first
app.use(createPinia())

// Then initialize Router
app.use(router)

// Declare global user properties
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $currentUser: {
      id: string | null
      email: string | null
      role: string | null
    }
  }
}

// Initialize global user object
app.config.globalProperties.$currentUser = {
  id: null,
  email: null,
  role: null,
}

// Mount the app last
app.mount('#app')

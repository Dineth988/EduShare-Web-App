<template>
  <div class="chat-page">
    <!-- Chat Area -->
    <div class="chat-area">
      <div class="chat-header">
        <span>Chat with {{ currentChatUser.full_name }}</span>
        <span class="status"></span>
        <span>{{ currentChatUser.status }}</span>
        <span class="last-active">Last active: {{ lastActive }}</span>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <div class="message received">
          Hi, I'd like to donate some textbooks for the education program.
          <div class="time">10:30 AM</div>
        </div>

        <div class="message received">
          I have several college-level mathematics and science books in excellent condition.
          <div class="time">10:35 AM</div>
        </div>

        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.sender_id === currentUser.user_id ? 'sent' : 'received']"
        >
          {{ message.content }}
          <div class="time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>

      <div class="message-input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type your message..."
        />
        <button @click="sendMessage">
          <span class="icon">➤</span>
        </button>
      </div>
    </div>

    <!-- Profile Area remains the same -->
    <div class="profile-area">
      <div class="profile-header">
        
        <h3>Sarah Johnson</h3>
        <span>Active Donor <span class="status"></span></span>
      </div>

      <div class="profile-info">
        <div class="profile-header">
          <img src="https://i.pravatar.cc/80?img=3" alt="Sarah Johnson" />
          <h3>Sarah Johnson</h3>
          <span>Active Donor <span class="status"></span></span>
        </div>
        <div>
          <span class="icon">✉️</span>
          <span>sarahj@gmail.com</span>
        </div>
        <div>
          <span class="icon">📞</span>
          <span>+1 (555) 123-4567</span>
        </div>
        <div>
          <span class="icon">📍</span>
          <span>San Francisco, CA</span>
        </div>
        <div>
          <span class="icon">🎁</span>
          <span>Total Donations: 150 items</span>
        </div>
        <div>
          <span class="icon">📅</span>
          <span>Member Since: January 2023</span>
        </div>
        <div>
          <span class="donor">Active Donor</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChatMessage',
  data() {
    return {
      newMessage: '',
      messages: [],
      currentUser: {
        user_id: '65f8d7e8a1d9c8a9b3e5f1a2', // Replace with actual logged-in user ID
        full_name: 'Employee',
      },
      currentChatUser: {
        user_id: '65f8d7e8a1d9c8a9b3e5f1a3', // Replace with actual receiver ID
        full_name: 'Sarah Johnson',
        status: 'Online',
      },
      lastActive: 'Just now',
      refreshInterval: null,
    }
  },
  mounted() {
    this.loadMessages()
    this.setupAutoRefresh()
  },
  beforeUnmount() {
    clearInterval(this.refreshInterval)
  },
  methods: {
    async loadMessages() {
      try {
        const response = await axios.get('http://localhost:5030/api/messages', {
          params: {
            senderId: this.currentUser.user_id,
            receiverId: this.currentChatUser.user_id,
          },
        })
        this.messages = response.data

        this.scrollToBottom()
      } catch (error) {
        console.error('Error loading messages:', error)
        alert('Failed to load messages. Please check console for details.')
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim()) return

      try {
        const response = await axios.post('http://localhost:5030/api/messages', {
          sender_id: this.currentUser.user_id,
          receiver_id: this.currentChatUser.user_id,
          content: this.newMessage.trim(),
        })

        this.messages.push({
          ...response.data,
          timestamp: new Date().toISOString(), // Add client-side timestamp
        })

        this.newMessage = ''
        this.scrollToBottom()
      } catch (error) {
        console.error('Error sending message:', error)
        alert('Failed to send message. Please check console for details.')
      }
    },

    formatTime(timestamp) {
      const options = { hour: 'numeric', minute: '2-digit', hour12: true }
      return new Date(timestamp).toLocaleTimeString('en-US', options)
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer
        container.scrollTop = container.scrollHeight
      })
    },

    setupAutoRefresh() {
      this.refreshInterval = setInterval(() => {
        this.loadMessages()
      }, 5000)
    },
  },
}
</script>

<!-- Keep existing styles, they work fine -->
<style scoped>
.chat-page {
  display: flex;
  height: calc(100vh - 60px);
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.chat-area {
  flex: 2;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f8fafc;
}

.status {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #22c55e;
}

.last-active {
  color: #64748b;
  font-size: 0.8rem;
  margin-left: auto;
}

.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.message {
  margin-bottom: 1rem;
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
}

.message.received {
  background-color: #f1f5f9;
  align-self: flex-start;
  border-radius: 0 0.75rem 0.75rem 0.75rem;
}

.message.sent {
  background-color: #4361ee;
  color: white;
  align-self: flex-end;
  border-radius: 0.75rem 0 0.75rem 0.75rem;
}

.time {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
  text-align: right;
}

.message-input {
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 0.5rem;
}

.message-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 1.5rem;
}

.message-input button {
  background-color: #4361ee;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
}

.profile-area {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.profile-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.profile-header img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-info div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.donor {
  background-color: #e6f0fa;
  color: #4361ee;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  display: inline-block;
}

@media (max-width: 1024px) {
  .profile-area {
    display: none;
  }
}
</style>

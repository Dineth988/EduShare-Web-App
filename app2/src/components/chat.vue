<template>
  <div class="chat-container">
    <div class="chat-sidebar">
      <div class="chat-header">
        <h2>EduShare</h2>
        <h3>Messages</h3>
        <div class="search-bar">
          <i class="fas fa-search search-icon"></i>
          <input type="text" placeholder="Search conversations..." />
        </div>
      </div>

      <div class="conversation-list">
        <div class="new-messages-section">
          <h4>New Messages</h4>
          <div 
            v-for="org in newMessages" 
            :key="org.id" 
            class="conversation-item"
            :class="{ active: activeConversation === org.id }"
            @click="setActiveConversation(org.id)"
          >
            <div class="org-name">{{ org.name }}</div>
            <div class="message-preview">{{ org.lastMessage }}</div>
            <div class="message-time">{{ org.time }}</div>
          </div>
        </div>

        <div class="organization-section">
          <h4>Organization</h4>
          <div 
            v-for="org in organizations" 
            :key="org.id" 
            class="conversation-item"
            :class="{ active: activeConversation === org.id }"
            @click="setActiveConversation(org.id)"
          >
            <div class="org-name">{{ org.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-main">
      <div v-if="activeConversation" class="message-container">
        <div class="message-header">
          <h3>{{ getActiveOrg().name }}</h3>
        </div>

        <div class="message-history">
          <div 
            v-for="(message, index) in getActiveMessages()" 
            :key="index"
            class="message"
            :class="{ 'org-message': message.sender === 'org', 'user-message': message.sender === 'user' }"
          >
            <div class="message-content">{{ message.content }}</div>
            <div class="message-time">{{ message.time }}</div>
            <div v-if="message.images" class="message-images">
              <img 
                v-for="(img, imgIndex) in message.images" 
                :key="imgIndex"
                :src="img"
                alt="Message image"
              />
            </div>
          </div>
        </div>

        <div class="message-input">
          <input 
            v-model="newMessage" 
            type="text" 
            placeholder="Type your message..." 
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">
            <i class="fas fa-paper-plane"></i> Send
          </button>
        </div>
      </div>

      <div v-else class="no-conversation">
        <p>Select a conversation to start chatting</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Organization {
  id: string
  name: string
  lastMessage?: string
  time?: string
}

interface Message {
  sender: 'user' | 'org'
  content: string
  time: string
  images?: string[]
}

export default defineComponent({
  name: 'ChatPage',
  setup() {
    const activeConversation = ref<string>('clean-water') // Initialize with Sara Fernando's ID
    const newMessage = ref('')

    const newMessages = ref<Organization[]>([
      { 
        id: 'edu-first', 
        name: 'Education First NGO', 
        lastMessage: 'Thank you for your support!', 
        time: '0:30 AM' 
      }
    ])

    const organizations = ref<Organization[]>([
      { 
        id: 'edu-first', 
        name: 'Education First NGO', 
      },
      { 
        id: 'global-health', 
        name: 'Global Health Initiative', 
      },
      { 
        id: 'clean-water', 
        name: 'Sara Fernando', 
      }
    ])

    const messages = ref<Record<string, Message[]>>({
      'edu-first': [
        { 
          sender: 'org', 
          content: 'Thank you for your generous donation of textbooks. We wanted to share how they\'re being used in our schools.', 
          time: '0:30 AM' 
        },
        { 
          sender: 'user', 
          content: 'I\'m glad to hear that! Could you share some photos of the books being used in classrooms?', 
          time: '10:52 AM' 
        },
        { 
          sender: 'org', 
          content: 'Of course! Here are some photos from yesterday\'s classes. The students are really enjoying the new materials.', 
          time: '0:35 AM',
          images: [
            'https://example.com/class1.jpg',
            'https://example.com/class2.jpg'
          ]
        }
      ],
      'global-health': [
        { 
          sender: 'org', 
          content: 'We\'ve just received the medical supplies!', 
          time: 'Yesterday' 
        }
      ],
      'clean-water': [
        { 
          sender: 'org', 
          content: 'Hi! Thanks for reaching out about the laptop shortage.', 
          time: 'Yesterday' 
        }
      ]
    })

    const setActiveConversation = (orgId: string) => {
      activeConversation.value = orgId
    }

    const getActiveOrg = () => {
      return [...newMessages.value, ...organizations.value].find(org => org.id === activeConversation.value)!
    }

    const getActiveMessages = () => {
      return activeConversation.value ? messages.value[activeConversation.value] : []
    }

    const sendMessage = () => {
      if (!newMessage.value.trim() || !activeConversation.value) return
      
      const newMsg: Message = {
        sender: 'user',
        content: newMessage.value,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      messages.value[activeConversation.value].push(newMsg)
      newMessage.value = ''
    }

    return {
      activeConversation,
      newMessage,
      newMessages,
      organizations,
      setActiveConversation,
      getActiveOrg,
      getActiveMessages,
      sendMessage
    }
  }
})
</script>
<style scoped>
/* Import a modern font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.chat-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.chat-sidebar {
  width: 320px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  padding: 24px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.chat-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.chat-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 16px;
}

.search-bar {
  position: relative;
  margin-bottom: 24px;
}

.search-bar input {
  width: 100%;
  padding: 10px 10px 10px 36px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.conversation-item {
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.conversation-item:hover {
  background-color: #f1f5f9;
  transform: translateX(4px);
}

.conversation-item.active {
  background-color: #e0f2fe;
  border-left: 3px solid #3b82f6;
}

.org-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.message-preview {
  color: #64748b;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.message-time {
  color: #94a3b8;
  font-size: 0.75rem;
  text-align: right;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.message-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
}

.message-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
}

.message-history {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.message {
  margin-bottom: 16px;
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.org-message {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  align-self: flex-start;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.user-message {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  align-self: flex-end;
  margin-left: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.message-content {
  font-size: 0.9rem;
  line-height: 1.4;
}

.message-time {
  font-size: 0.75rem;
  margin-top: 6px;
  text-align: right;
  color: #94a3b8;
}

.message-images {
  display: flex;
  margin-top: 12px;
  gap: 8px;
}

.message-images img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.message-input {
  display: flex;
  padding: 16px 0;
  border-top: 1px solid #e2e8f0;
  background: #ffffff;
}

.message-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.message-input input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.message-input button {
  margin-left: 12px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s ease, transform 0.1s ease;
}

.message-input button:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-1px);
}

.no-conversation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #64748b;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .chat-container {
    flex-direction: column;
  }

  .chat-sidebar {
    width: 100%;
    height: auto;
    max-height: 40vh;
  }

  .chat-main {
    height: auto;
    flex: none;
  }

  .message {
    max-width: 85%;
  }
}
</style>
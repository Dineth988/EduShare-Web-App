<style scoped>
body {
    font-family: 'Inter', sans-serif;
}
.navbar {
    border-bottom: 1px solid #e5e7eb;
}
.hero {
    background: linear-gradient(to bottom, #e6f0fa, #ffffff);
}
.card {
    transition: transform 0.3s ease;
}
.card:hover {
    transform: translateY(-5px);
}
.stats {
    background-color: #f9fafb;
}
.recent-activities {
    max-height: 300px;
    overflow-y: auto;
}
.footer {
    background-color: #1f2937;
    color: #d1d5db;
}
.nav-link {
    color: #4b5563;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: background-color 0.3s ease;
}
.nav-link:hover {
    background-color: #e5e7eb;
}
.nav-link.active {
    background-color: #dbeafe;
    color: #1d4ed8;
}
.timeline {
    display: flex;
    align-items: center;
    justify-content: center;
}
.timeline-step {
    display: flex;
    align-items: center;
}
.timeline-connector {
    width: 4rem;
    height: 2px;
    background-color: #d1d5db;
    margin: 0 1rem;
}
.status-pending {
    display: inline-block;
    background-color: #fef3c7;
    color: #d97706;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
}
.status-in-progress {
    display: inline-block;
    background-color: #fed7aa;
    color: #ea580c;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
}
.status-completed {
    display: inline-block;
    background-color: #d1fae5;
    color: #059669;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
}
.priority-high {
    display: inline-block;
    background-color: #fee2e2;
    color: #dc2626;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
}
.priority-medium {
    display: inline-block;
    background-color: #ffedd5;
    color: #f97316;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
}
.priority-low {
    display: inline-block;
    background-color: #d1fae5;
    color: #059669;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
}
.chat-messages {
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
</style>
<script>
export default {
    name: 'Message',

};
</script>
<template>
    <!-- Navigation Bar -->
    <nav class="navbar bg-white shadow p-4 flex justify-between items-center">
        <div class="flex items-center">
            <img src="https://via.placeholder.com/30" alt="EduShare Logo" class="mr-2">
            <span class="font-bold text-xl text-blue-600">EduShare</span>
        </div>
        <div class="flex space-x-6 items-center">
            <a href="#" class="text-gray-600 hover:text-blue-600 flex items-center">
                <span class="mr-2">💬</span> Messages
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600 flex items-center">
                <span class="mr-2">🔔</span> Notifications
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600 flex items-center">
                <span class="mr-2">👤</span> Profile
            </a>
            <div class="flex items-center">
                <img src="https://via.placeholder.com/40" alt="Profile Picture" class="w-8 h-8 rounded-full mr-2">
                <span class="text-gray-600">John Donor</span>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <section class="container mx-auto py-8 flex">
        <!-- Conversation List (Left Sidebar) -->
        <div class="w-1/3 bg-white shadow-lg rounded-lg p-6 mr-6">
            <input type="text" placeholder="Search conversations..." class="w-full border rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6">
            <button class="bg-black text-white px-4 py-2 rounded-lg w-full mb-6 flex items-center justify-center">
                <span class="mr-2">➕</span> New Message
            </button>
            <!-- Conversation Items -->
            <div class="space-y-4">
                <div class="flex items-center p-3 bg-gray-100 rounded-lg">
                    <img src="https://via.placeholder.com/40" alt="NGO Logo" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <p class="text-gray-800 font-medium">Education First NGO</p>
                        <p class="text-gray-600 text-sm">Thank you for the support!</p>
                    </div>
                    <span class="ml-auto text-green-600">✔️</span>
                </div>
                <div class="flex items-center p-3 rounded-lg">
                    <img src="https://via.placeholder.com/40" alt="NGO Logo" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <p class="text-gray-800 font-medium">Global Health Initiative</p>
                        <p class="text-gray-600 text-sm">We just received the medical equ...</p>
                    </div>
                </div>
                <div class="flex items-center p-3 rounded-lg">
                    <img src="https://via.placeholder.com/40" alt="NGO Logo" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <p class="text-gray-800 font-medium">Clean Water Project</p>
                        <p class="text-gray-600 text-sm">The new water filtration system is nx...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Chat Area (Right Side) -->
        <div class="w-2/3 bg-white shadow-lg rounded-lg p-6 flex flex-col">
            <!-- Chat Header -->
            <div class="flex justify-between items-center mb-6">
                <div class="flex items-center">
                    <img src="https://via.placeholder.com/40" alt="NGO Logo" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <p class="text-gray-800 font-medium">Education First NGO</p>
                        <p class="text-green-600 text-sm flex items-center">
                            <span class="mr-1">✔️</span> Active now
                        </p>
                    </div>
                </div>
                <a href="#" class="text-blue-600 hover:underline">View Organization</a>
            </div>
            <!-- Chat Messages -->
            <div class="flex-1 overflow-y-auto mb-6 chat-messages">
                <div class="mb-4">
                    <p class="text-gray-600 text-sm">10:30 AM</p>
                    <div class="bg-gray-100 p-3 rounded-lg inline-block">
                        <p class="text-gray-800">Hello! Thank you for your generous donation of textbooks. We wanted to share how they’re being used in our schools.</p>
                    </div>
                </div>
                <div class="mb-4 flex justify-end">
                    <p class="text-gray-600 text-sm">10:32 AM</p>
                    <div class="bg-black text-white p-3 rounded-lg inline-block ml-2">
                        <p>I’m glad to hear that! Could you share some photos of the books being used in classrooms?</p>
                    </div>
                </div>
                <div class="mb-4">
                    <p class="text-gray-600 text-sm">10:36 AM</p>
                    <div class="bg-gray-100 p-3 rounded-lg inline-block">
                        <p class="text-gray-800">Of course! Here are some photos from yesterday’s classes. The students are really enjoying the new materials.</p>
                        <div class="grid grid-cols-3 gap-2 mt-2">
                            <img src="https://via.placeholder.com/150" alt="Classroom Photo" class="w-full h-24 object-cover rounded-lg">
                            <img src="https://via.placeholder.com/150" alt="Classroom Photo" class="w-full h-24 object-cover rounded-lg">
                            <img src="https://via.placeholder.com/150" alt="Classroom Photo" class="w-full h-24 object-cover rounded-lg">
                        </div>
                    </div>
                </div>
            </div>
            <!-- Message Input -->
            <div class="flex items-center border rounded-lg p-3">
                <input type="text" placeholder="Type your message..." class="w-full text-gray-600 focus:outline-none">
                <button class="text-gray-600 hover:text-blue-600 mx-2">📎</button>
                <button class="text-gray-600 hover:text-blue-600 mx-2">😊</button>
                <button class="text-gray-600 hover:text-blue-600">➡️</button>
            </div>
        </div>
    </section>
</template>

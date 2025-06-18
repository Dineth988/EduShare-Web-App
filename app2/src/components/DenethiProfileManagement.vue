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
</style>
<script>
export default {
    name: 'ProfileManagement',
 
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
            <a href="/recipienthome" class="text-gray-600 hover:text-blue-600">Home</a>
            <a href="#" class="text-gray-600 hover:text-blue-600">Support</a>
        </div>
    </nav>

    <!-- Main Content -->
    <section class="container mx-auto py-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Profile Management</h1>
        <p class="text-gray-600 mb-8">View and manage recipient profile information</p>
        <div class="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-8 inline-flex items-center">
            <span class="mr-2">✔️</span> Verified by NGO
        </div>
        <div class="bg-white shadow-lg rounded-lg p-8 max-w-2xl">
            <!-- School/Program Information -->
            <div class="mb-8">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span class="mr-2">🏫</span> School/Program Information
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-gray-600 font-medium">School Name</p>
                        <p class="text-gray-800">Stanford University</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Program Type</p>
                        <p class="text-gray-800">Computer Science</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Enrollment Year</p>
                        <p class="text-gray-800">2023</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Expected Graduation</p>
                        <p class="text-gray-800">2027</p>
                    </div>
                </div>
            </div>
            <!-- Location Information -->
            <div class="mb-8">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span class="mr-2">📍</span> Location Information
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-gray-600 font-medium">Address</p>
                        <p class="text-gray-800">450 Serra Mall</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">City</p>
                        <p class="text-gray-800">Stanford</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">State/Province</p>
                        <p class="text-gray-800">California</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Country</p>
                        <p class="text-gray-800">United States</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Postal Code</p>
                        <p class="text-gray-800">94305</p>
                    </div>
                </div>
            </div>
            <!-- Contact Information -->
            <div class="mb-8">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span class="mr-2">📧</span> Contact Information
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-gray-600 font-medium">Email Address</p>
                        <p class="text-gray-800">student@stanford.edu</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Phone Number</p>
                        <p class="text-gray-800">+1 (650) 123-4567</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Alternative Contact</p>
                        <p class="text-gray-800">parent@edu.com</p>
                    </div>
                </div>
            </div>
            <!-- Demographics -->
            <div class="mb-8">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span class="mr-2">👤</span> Demographics
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-gray-600 font-medium">Age</p>
                        <p class="text-gray-800">19</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Gender</p>
                        <p class="text-gray-800">Female</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Native Language</p>
                        <p class="text-gray-800">English</p>
                    </div>
                    <div>
                        <p class="text-gray-600 font-medium">Ethnicity</p>
                        <p class="text-gray-800">Asian</p>
                    </div>
                </div>
            </div>
            <p class="text-gray-600 text-sm">Last Updated: January 15, 2024</p>
        </div>
    </section>
</template>
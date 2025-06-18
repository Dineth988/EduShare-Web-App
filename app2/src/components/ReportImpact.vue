<template>
  <div class="report-impact">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="logo">EduShare</div>
        <button class="donate-button" @click="handleDonate">Donate Now</button>
      </div>

      <!-- Total Donations -->
      <div class="total-donations">
        <div class="donation-card">
          <h3>158,800 USD</h3>
          <p>Total Donations</p>
        </div>
        <div class="donation-card">
          <h3>2,547</h3>
          <p>Lives Impacted</p>
        </div>
        <div class="donation-card">
          <h3 class="highlight">98.6%</h3>
          <p>Success Rate</p>
        </div>
      </div>

      <!-- Impact Reports -->
      <div class="impact-reports">
        <h2>Impact Reports</h2>
        <div class="reports-grid">
          <div
            v-for="(report, index) in reports"
            :key="index"
            class="report-card"
            @click="downloadReport(report)"
          >
            <i>📄</i>
            <p>{{ report.title }}</p>
            <span>{{ report.size }} • Download Report</span>
          </div>
        </div>
      </div>

      <!-- Success Stories (Feedback) -->
      <div class="success-stories-feedback">
        <div class="feedback-section">
          <h2>Success Stories</h2>
          <div v-for="(story, index) in successStories" :key="index" class="feedback-card">
            <img :src="story.avatar" :alt="story.name" />
            <div>
              <p>{{ story.testimonial }}</p>
              <span>{{ story.name }}, {{ story.role }}</span>
            </div>
          </div>
        </div>

        <div class="impact-section">
          <h2>NGO Feedback</h2>
          <div class="ngo-feedback">
            <div>
              <div class="rating">{{ averageRating }}</div>
              <div class="stars">★★★★★</div>
              <p>Based on {{ totalReviews }} reviews</p>
            </div>
            <div>
              <p v-for="(rating, index) in ratingDistribution" :key="index">
                {{ rating.stars }} stars: {{ rating.percentage }}%
              </p>
            </div>
          </div>
        </div>

        <div class="impact-section">
          <h2>Your Impact</h2>
          <p>You're in the top {{ userRank.percentile }}% of donors</p>
          <div class="progress-bar">
            <div class="fill" :style="{ width: userRank.progress + '%' }"></div>
          </div>
          <p class="rank">
            Your Donations Rank: {{ userRank.position }} / {{ userRank.total }} in your city
          </p>
        </div>
      </div>

      <!-- Success Stories (Images) -->
      <div class="success-stories">
        <div
          v-for="(story, index) in imageStories"
          :key="index"
          class="story-card"
          @click="viewStory(story)"
        >
          <img :src="story.image" :alt="story.title" />
          <div>
            <h3>{{ story.title }}</h3>
            <p>{{ story.excerpt }}...</p>
            <span>{{ story.author }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ReportImpact',
  data() {
    return {
      reports: [
        { title: 'Q2 2023 Education Impact Report', size: '1.4MB' },
        { title: 'Student Achievement Report', size: '1.0MB' },
        { title: 'Donor Impact Analytics', size: '1.4MB' },
      ],
      successStories: [
        {
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
          name: 'Sarah Johnson',
          role: 'NGO Director',
          testimonial: 'The donated laptops have transformed our classroom experience completely.',
        },
        {
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
          name: 'Daniel Chen',
          role: 'NGO',
          testimonial: 'Thank you, donors, our students now have access to modern learning tools.',
        },
      ],
      ratingDistribution: [
        { stars: 5, percentage: 80 },
        { stars: 4, percentage: 15 },
        { stars: 3, percentage: 3 },
        { stars: 2, percentage: 2 },
      ],
      userRank: {
        percentile: 15,
        progress: 85,
        position: 127,
        total: 1400,
      },
      imageStories: [
        {
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
          title: 'Technology Transformation in Rural Schools',
          excerpt: 'The donated laptops have revolutionized our online learning programs',
          author: 'Karen Smith, Principal',
        },
        {
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
          title: 'Digital Literacy Initiative Success',
          excerpt: 'With the new computers, we saw a 70% increase in digital literacy',
          author: 'Michael Brown, NGO',
        },
      ],
    }
  },
  computed: {
    averageRating() {
      return 4.9
    },
    totalReviews() {
      return 320
    },
  },
  methods: {
    handleDonate() {
      alert('Redirecting to donation page...')
      // this.$router.push('/donate')
    },
    downloadReport(report: any) {
      console.log('Downloading:', report.title)
      // Implement actual download logic here
    },
    viewStory(story: any) {
      console.log('Viewing story:', story.title)
      // this.$router.push(`/stories/${story.id}`)
    },
  },
})
</script>

<style scoped>
.report-impact {
  --primary-color: #1a73e8;
  --success-color: #22c55e;
  --text-color: #333;
  --bg-color: #f5f7fa;
  --card-bg: #ffffff;

  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Segoe UI', Arial, sans-serif;
  background-color: var(--bg-color);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card-bg);
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

.header .logo {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
}

.donate-button {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.donate-button:hover {
  background-color: #0d5bba;
}

/* Total Donations */
.total-donations {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.donation-card {
  flex: 1;
  background-color: var(--card-bg);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.donation-card:hover {
  transform: translateY(-5px);
}

.donation-card h3 {
  font-size: 28px;
  margin-bottom: 8px;
  color: var(--text-color);
}

.donation-card p {
  color: #666;
  font-size: 16px;
}

.donation-card .highlight {
  color: var(--success-color);
}

/* Impact Reports */
.impact-reports {
  background-color: var(--card-bg);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

.impact-reports h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.reports-grid {
  display: flex;
  gap: 20px;
}

.report-card {
  flex: 1;
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.report-card:hover {
  background-color: #f1f5f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.report-card i {
  font-size: 28px;
  color: var(--primary-color);
  margin-bottom: 15px;
}

.report-card p {
  font-size: 16px;
  color: var(--text-color);
  margin-bottom: 8px;
}

.report-card span {
  font-size: 14px;
  color: #888;
}

/* Success Stories (Feedback) */
.success-stories-feedback {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.feedback-section,
.impact-section {
  background-color: var(--card-bg);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.feedback-section {
  flex: 2;
}

.impact-section {
  flex: 1;
}

.feedback-section h2,
.impact-section h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.feedback-card {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
}

.feedback-card img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.feedback-card p {
  font-size: 15px;
  color: var(--text-color);
  margin-bottom: 5px;
  line-height: 1.4;
}

.feedback-card span {
  font-size: 13px;
  color: #888;
}

/* NGO Feedback */
.ngo-feedback {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.ngo-feedback div {
  flex: 1;
}

.ngo-feedback .rating {
  font-size: 28px;
  color: var(--text-color);
  margin-bottom: 5px;
}

.ngo-feedback .stars {
  color: #f59e0b;
  font-size: 16px;
  margin-bottom: 10px;
}

.ngo-feedback p {
  font-size: 14px;
  color: #666;
}

/* Impact Section */
.impact-section p {
  font-size: 15px;
  color: var(--text-color);
  margin-bottom: 10px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e5e7eb;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar .fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 5px;
  transition: width 0.5s ease;
}

.rank {
  font-size: 13px;
  color: #888;
}

/* Success Stories (Images) */
.success-stories {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.story-card {
  flex: 1;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.story-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.story-card div {
  padding: 20px;
}

.story-card h3 {
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--text-color);
}

.story-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.4;
}

.story-card span {
  font-size: 13px;
  color: var(--text-color);
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 992px) {
  .success-stories-feedback {
    flex-direction: column;
  }

  .feedback-section,
  .impact-section {
    width: 100%;
  }

  .impact-section {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .total-donations,
  .reports-grid,
  .success-stories {
    flex-direction: column;
  }

  .donation-card,
  .report-card,
  .story-card {
    margin-bottom: 15px;
  }

  .header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>

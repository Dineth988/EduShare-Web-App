<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Profile - EduShare</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      background-image: url('bookshelf-bg.jpg');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      padding: 15px 30px;
      border-bottom: 1px solid #ddd;
      width: 100%;
      box-sizing: border-box;
    }
    .navbar-logo {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      color: #007BFF;
    }
    .navbar-logo::before {
      content: "🎓";
      margin-right: 5px;
    }
    .navbar-links {
      display: flex;
      gap: 20px;
    }
    .navbar-links a {
      text-decoration: none;
      color: #333;
      font-size: 16px;
    }
    .navbar-actions {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .navbar-actions a {
      text-decoration: none;
      color: #333;
      font-size: 16px;
    }
    .navbar-actions a::before {
      content: "🔔";
      margin-right: 5px;
    }
    .navbar-actions .profile::before {
      content: "👤";
    }
    .header {
      background: none;
      height: 150px;
      position: relative;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      width: 100%;
    }
    .profile-header-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 200px; /* Adjusted to cover half of profile info section */
      background-image: url('https://th.bing.com/th/id/OIP.kqeuDyzseyzUqsF0BzaJwwHaE7?rs=1&pid=ImgDetMain');
      background-size: cover;
      background-position: center;
      z-index: -1;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    .profile-info {
      width: 100%;
      max-width: none;
      margin: 20px auto;
      padding: 0 30px;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
    }
    .profile-info-box {
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 10px;
      padding: 30px; /* Increased padding for more space */
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .profile-image img {
      width: 120px; /* Slightly larger image */
      height: 120px;
      border-radius: 50%;
      border: 4px solid white;
      background-color: #ddd;
    }
    .profile-details {
      margin-left: 30px; /* Increased margin for more space */
      flex: 1;
    }
    .profile-details h1 {
      font-size: 28px; /* Slightly larger font */
      color: #333;
      margin: 0 0 15px; /* Added bottom margin */
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .verified {
      background-color: #e6ffe6;
      color: #4CAF50;
      padding: 4px 10px;
      border-radius: 10px;
      font-size: 14px;
    }
    .profile-details p {
      font-size: 16px; /* Slightly larger font */
      color: #666;
      margin: 0 0 20px; /* Increased bottom margin */
      line-height: 1.5; /* Added line height for better readability */
    }
    .edit-profile {
      background-color: #007BFF;
      color: white;
      padding: 10px 20px; /* Slightly larger button */
      border-radius: 5px;
      text-decoration: none;
      font-size: 16px; /* Slightly larger font */
    }
    .edit-profile::before {
      content: "✎";
      margin-right: 5px;
    }
    .container {
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 20px 30px;
      display: flex;
      gap: 20px;
      box-sizing: border-box;
    }
    .left-column {
      flex: 1;
      min-width: 300px;
    }
    .right-column {
      flex: 2;
      min-width: 400px;
    }
    .card {
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      width: 100%;
      box-sizing: border-box;
    }
    .card h2 {
      font-size: 18px;
      color: #333;
      margin: 0 0 15px;
    }
    .stats .stat {
      margin-bottom: 15px;
    }
    .stats .stat h3 {
      font-size: 24px;
      color: #333;
      margin: 0;
    }
    .stats .stat p {
      font-size: 14px;
      color: #666;
      margin: 5px 0 0;
    }
    .donation {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .donation img {
      width: 100px;
      height: 80px;
      object-fit: cover;
      border-radius: 5px;
    }
    .donation-details {
      flex: 1;
    }
    .donation-details h3 {
      font-size: 16px;
      color: #333;
      margin: 0;
    }
    .donation-details p {
      font-size: 14px;
      color: #666;
      margin: 5px 0;
    }
    .donation-details .status {
      font-size: 12px;
      color: #666;
    }
    .organizations .org {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .organizations .org img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .organizations .org p {
      font-size: 14px;
      color: #333;
      margin: 0;
    }
    .organizations .org p span {
      display: block;
      font-size: 12px;
      color: #666;
    }
    .quick-actions a {
      display: block;
      padding: 10px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 14px;
      margin-bottom: 10px;
      text-align: center;
    }
    .quick-actions .create {
      background-color: #007BFF;
      color: white;
    }
    .quick-actions .create::before {
      content: "+";
      margin-right: 5px;
    }
    .quick-actions .share {
      background-color: #f5f5f5;
      color: #333;
    }
    .quick-actions .share::before {
      content: "↪";
      margin-right: 5px;
    }
    .quick-actions .report {
      background-color: #f5f5f5;
      color: #333;
    }
    .quick-actions .report::before {
      content: "📄";
      margin-right: 5px;
    }
  </style>
</head>
<body>
  <div class="navbar">
    <div class="navbar-logo">EduShare</div>
    <div class="navbar-links">
      <a href="#">Home</a>
      <a href="#">Browse</a>
      <a href="#">Messages</a>
      <a href="#">Notifications</a>
    </div>
    <div class="navbar-actions">
      <a href="#" class="profile"></a>
    </div>
  </div>

  <div class="header">
    <div class="profile-header-bg"></div>
  </div>

  <div class="profile-info">
    <div class="profile-info-box">
      <div class="profile-image">
        <img src="profile-pic.jpg" alt="Profile Picture">
      </div>
      <div class="profile-details">
        <h1>John Smith Foundation <span class="verified">Verified NGO</span></h1>
        <p>Empowering education through technology. Committed to donating 1,000 laptops annually to underprivileged schools.</p>
        <a href="#" class="edit-profile">Edit Profile</a>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="left-column">
      <div class="card stats">
        <h2>Impact Statistics</h2>
        <div class="stat">
          <h3>1,247</h3>
          <p>Total Donations</p>
        </div>
        <div class="stat">
          <h3>5,000+</h3>
          <p>Beneficiaries Reached</p>
        </div>
        <div class="stat">
          <h3>8</h3>
          <p>Categories Covered</p>
        </div>
      </div>
    </div>
    <div class="right-column">
      <div class="card">
        <h2>Recent Donations</h2>
        <div class="donation">
          <img src="laptops-donation.jpg" alt="Laptops Donation">
          <div class="donation-details">
            <h3>200 Laptops for Rural Schools</h3>
            <p>Donated to 5 schools in rural areas to support digital education initiatives.</p>
            <p class="status">Completed • 2 weeks ago</p>
          </div>
        </div>
        <div class="donation">
          <img src="stem-books-donation.jpg" alt="STEM Books Donation">
          <div class="donation-details">
            <h3>STEM Book Collection</h3>
            <p>500 science and mathematics textbooks for high school students.</p>
            <p class="status">In Progress • 1 month ago</p>
          </div>
        </div>
      </div>
      <div class="card">
        <h2>Connected Organizations</h2>
        <div class="organizations">
          <div class="org">
            <img src="global-education-trust.png" alt="Global Education Trust">
            <p>Global Education Trust<br><span>Partner</span></p>
          </div>
          <div class="org">
            <img src="tech4schools.png" alt="Tech4Schools">
            <p>Tech4Schools<br><span>Partner</span></p>
          </div>
        </div>
      </div>
      <div class="card quick-actions">
        <h2>Quick Actions</h2>
        <a href="#" class="create">Create New Request</a>
        <a href="#" class="share">Share Profile</a>
        <a href="#" class="report">Generate Report</a>
      </div>
    </div>
  </div>
</body>
</html>
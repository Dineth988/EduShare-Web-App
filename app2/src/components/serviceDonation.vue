<style scoped>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      width: 100%;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      max-width: none;
      margin: 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .header {
      background-color: #007BFF;
      color: white;
      text-align: center;
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
      position: relative;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .header h1::after {
      content: "🔍";
    }
    .header p {
      font-size: 14px;
      margin: 5px 0 0;
    }
    .form-section {
      max-width: 600px;
      margin: 20px auto;
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .form-section h2 {
      font-size: 18px;
      color: #333;
      margin: 0 0 15px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      font-size: 14px;
      color: #333;
      margin-bottom: 5px;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
      box-sizing: border-box;
    }
    .form-group.checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .form-group.checkbox input {
      width: auto;
    }
    .form-group.checkbox label {
      margin: 0;
    }
    .form-group.select-group {
      display: flex;
      gap: 10px;
    }
    .form-group.select-group select {
      flex: 1;
    }
    .availability-options {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .availability-options label {
      flex: 1 1 100px;
      text-align: center;
    }
    .availability-options input[type="checkbox"] {
      display: none;
    }
    .availability-options input[type="checkbox"] + span {
      display: block;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
      cursor: pointer;
    }
    .availability-options input[type="checkbox"]:checked + span {
      border-color: #007BFF;
      background-color: #e6f0ff;
      color: #007BFF;
    }
    .time-options {
      display: flex;
      gap: 10px;
    }
    .time-options label {
      flex: 1;
      text-align: center;
    }
    .time-options input[type="radio"] {
      display: none;
    }
    .time-options input[type="radio"] + span {
      display: block;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
      cursor: pointer;
    }
    .time-options input[type="radio"]:checked + span {
      border-color: #007BFF;
      background-color: #e6f0ff;
      color: #007BFF;
    }
    .form-group.upload {
      border: 2px dashed #ddd;
      padding: 20px;
      text-align: center;
      border-radius: 5px;
    }
    .form-group.upload input {
      display: none;
    }
    .form-group.upload label {
      cursor: pointer;
      color: #007BFF;
    }
    .preferences .form-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .preferences .form-group label {
      margin: 0;
    }
    .submit-button {
      background-color: #007BFF;
      color: white;
      padding: 15px;
      border: none;
      border-radius: 5px;
      width: 100%;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
    }
  </style>

  <template>
     <div class="container">
    <div class="header">
      <h1>Donate Your Skills: Tutoring Time</h1>
      <p>Share your expertise to support students in need</p>
    </div>

    <div class="form-section">
      <h2>Donor Information</h2>
      <div class="form-group">
        <label>Full Name *</label>
        <input type="text" placeholder="Enter your name" required>
      </div>
      <div class="form-group">
        <label>Email Address *</label>
        <input type="email" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label>Phone Number *</label>
        <input type="tel" placeholder="Enter your phone number" required>
      </div>
      <div class="form-group select-group">
        <div>
          <label>Preferred Contact Method *</label>
          <select required>
            <option value="">Select an option</option>
            <option>Email</option>
            <option>Phone</option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h2>Service Details</h2>
      <div class="form-group">
        <label>Service Type *</label>
        <select required>
          <option value="">Select a service</option>
          <option>Tutoring</option>
          <option>Mentoring</option>
        </select>
      </div>
      <div class="form-group">
        <label>Subjects Offered *</label>
        <input type="text" placeholder="E.g., Math, Science, English" required>
      </div>
      <div class="form-group">
        <label>Service Description (Optional)</label>
        <textarea placeholder="Briefly describe your tutoring experience"></textarea>
      </div>
    </div>

    <div class="form-section">
      <h2>Availability</h2>
      <div class="form-group">
        <label>Total Offered Hours *</label>
        <input type="number" placeholder="Enter total hours" required>
      </div>
      <div class="form-group select-group">
        <div>
          <label>Time Commitment *</label>
          <select required>
            <option value="">Select an option</option>
            <option>One Time</option>
            <option>Recurring</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Preferred Days *</label>
        <div class="availability-options">
          <label>
            <input type="checkbox" name="days" value="monday">
            <span>Monday</span>
          </label>
          <label>
            <input type="checkbox" name="days" value="tuesday">
            <span>Tuesday</span>
          </label>
          <label>
            <input type="checkbox" name="days" value="wednesday">
            <span>Wednesday</span>
          </label>
          <label>
            <input type="checkbox" name="days" value="thursday">
            <span>Thursday</span>
          </label>
          <label>
            <input type="checkbox" name="days" value="friday">
            <span>Friday</span>
          </label>
          <label>
            <input type="checkbox" name="days" value="saturday">
            <span>Saturday</span>
          </label>
          <label>
            <input type="checkbox" name="days" value="sunday">
            <span>Sunday</span>
          </label>
        </div>
      </div>
      <div class="form-group">
        <label>Preferred Time Window *</label>
        <div class="time-options">
          <label>
            <input type="radio" name="time" value="morning">
            <span>Morning</span>
          </label>
          <label>
            <input type="radio" name="time" value="afternoon">
            <span>Afternoon</span>
          </label>
          <label>
            <input type="radio" name="time" value="evening">
            <span>Evening</span>
          </label>
        </div>
      </div>
      <div class="form-group select-group">
        <div>
          <label>Delivery Mode *</label>
          <select required>
            <option value="">Select an option</option>
            <option>Online</option>
            <option>In-Person</option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h2>Additional Information</h2>
      <div class="form-group">
        <label>Target Audience *</label>
        <select required>
          <option value="">Select an option</option>
          <option>Elementary School</option>
          <option>Middle School</option>
          <option>High School</option>
          <option>Adult Learners</option>
        </select>
      </div>
      <div class="form-group">
        <label>Special Requirements (Optional)</label>
        <input type="text" placeholder="E.g., specific software needed">
      </div>
    </div>

    <div class="form-section">
      <h2>File Upload and Submission</h2>
      <div class="form-group upload">
        <label>Upload your resume or relevant certifications (optional)</label>
        <input type="file" id="file-upload">
      </div>
    </div>

    <div class="form-section preferences">
 
      <button class="submit-button">Donate My Time</button>
    </div>
  </div>
  </template>
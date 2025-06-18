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
      content: "🎓";
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
    .form-group select {
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
    .amount-options {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
    .amount-options label {
      flex: 1;
      text-align: center;
    }
    .amount-options input[type="radio"] {
      display: none;
    }
    .amount-options input[type="radio"] + span {
      display: block;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
      cursor: pointer;
    }
    .amount-options input[type="radio"]:checked + span {
      border-color: #007BFF;
      background-color: #e6f0ff;
      color: #007BFF;
    }
    .frequency-options {
      display: flex;
      gap: 10px;
    }
    .frequency-options label {
      flex: 1;
      text-align: center;
    }
    .frequency-options input[type="radio"] {
      display: none;
    }
    .frequency-options input[type="radio"] + span {
      display: block;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
      cursor: pointer;
    }
    .frequency-options input[type="radio"]:checked + span {
      border-color: #007BFF;
      background-color: #e6f0ff;
      color: #007BFF;
    }
    .payment-methods {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .payment-methods label {
      flex: 1;
      text-align: center;
    }
    .payment-methods input[type="radio"] {
      display: none;
    }
    .payment-methods input[type="radio"] + span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
      cursor: pointer;
    }
    .payment-methods input[type="radio"]:checked + span {
      border-color: #007BFF;
      background-color: #e6f0ff;
      color: #007BFF;
    }
    .form-group.card-details {
      display: flex;
      gap: 10px;
    }
    .form-group.card-details input {
      flex: 1;
    }
    .form-group.card-details input:nth-child(2) {
      flex: 0 0 100px;
    }
    .form-group.card-details input:nth-child(3) {
      flex: 0 0 80px;
    }
    .form-group.address {
      display: flex;
      gap: 10px;
    }
    .form-group.address input {
      flex: 1;
    }
    .form-group.address input:nth-child(3),
    .form-group.address input:nth-child(4) {
      flex: 0 0 100px;
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
      <h1>Support Education: Make a Monetary Donation</h1>
      <p>Your contribution will provide resources for students in need</p>
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
        <label>Phone Number (Optional)</label>
        <input type="tel" placeholder="Enter your phone number">
      </div>
      <div class="form-group checkbox">
        <input type="checkbox" id="anonymous">
        <label for="anonymous">Make this donation anonymous</label>
      </div>
    </div>

    <div class="form-section">
      <h2>Donation Amount</h2>
      <div class="amount-options">
        <label>
          <input type="radio" name="amount" value="25">
          <span>$25</span>
        </label>
        <label>
          <input type="radio" name="amount" value="50">
          <span>$50</span>
        </label>
        <label>
          <input type="radio" name="amount" value="100">
          <span>$100</span>
        </label>
        <label>
          <input type="radio" name="amount" value="custom">
          <span>Custom Amount</span>
        </label>
      </div>
      <div class="form-group">
        <input type="number" placeholder="$0.00">
      </div>
      <div class="form-group">
        <label>Donation Frequency</label>
        <div class="frequency-options">
          <label>
            <input type="radio" name="frequency" value="one-time" checked>
            <span>One Time</span>
          </label>
          <label>
            <input type="radio" name="frequency" value="recurring">
            <span>Recurring</span>
          </label>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h2>Purpose</h2>
      <div class="form-group">
        <label>Where should this donation go?</label>
        <select>
          <option>General Education Fund</option>
          <option>School Infrastructure</option>
          <option>Student Scholarships</option>
        </select>
      </div>
      <div class="form-group">
        <label>Message (Optional)</label>
        <input type="text" placeholder="Enter a message">
      </div>
    </div>

    <div class="form-section">
      <h2>Payment Details</h2>
      <div class="payment-methods">
        <label>
          <input type="radio" name="payment" value="card" checked>
          <span>💳 Credit Card</span>
        </label>
        <label>
          <input type="radio" name="payment" value="paypal">
          <span>PayPal</span>
        </label>
      </div>
      <div class="form-group">
        <label>Card Number *</label>
        <input type="text" placeholder="1234 5678 9012 3456" required>
      </div>
      <div class="form-group card-details">
        <div>
          <label>Expiry Date *</label>
          <input type="text" placeholder="MM / YY" required>
        </div>
        <div>
          <label>CVV *</label>
          <input type="text" placeholder="123" required>
        </div>
      </div>
      <div class="form-group">
        <label>Cardholder Name *</label>
        <input type="text" placeholder="Enter name on card" required>
      </div>
      <div class="form-group address">
        <div>
          <label>Street Address *</label>
          <input type="text" placeholder="Enter street address" required>
        </div>
        <div>
          <label>City *</label>
          <input type="text" placeholder="Enter city" required>
        </div>
        <div>
          <label>State *</label>
          <input type="text" placeholder="Enter state" required>
        </div>
        <div>
          <label>Zip Code *</label>
          <input type="text" placeholder="Enter zip code" required>
        </div>
      </div>
    </div>

    <div class="form-section preferences">
      <button class="submit-button">Donate Now</button>
    </div>
  </div>
  </template>
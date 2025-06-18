<template>
    <div class="register-page">
      <div class="register-container">
        <h1>Create an Account</h1>
        
        <form @submit.prevent="handleRegister" class="register-form">
          <!-- Email -->
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
  
          <!-- Password -->
          <div class="form-group">
            <label for="password">Password</label>
            <div class="password-input">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <p class="hint">Minimum 8 characters</p>
          </div>
  
          <!-- Full Name -->
          <div class="form-group">
            <label for="full_name">Full Name</label>
            <input
              v-model="form.full_name"
              type="text"
              id="full_name"
              placeholder="Enter your full name"
              required
            />
          </div>
  
          <!-- Organization (Optional) -->
          <div class="form-group">
            <label for="organization_id">Organization ID (Optional)</label>
            <input
              v-model="form.organization_id"
              type="text"
              id="organization_id"
              placeholder="Enter your organization ID"
            />
          </div>
  
          <button type="submit" class="register-button" :disabled="loading">
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>
  
          <p class="login-link">
            Already have an account? <router-link to="/login">Log in</router-link>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    data() {
      return {
        form: {
          email: '',
          password: '',
          full_name: '',
          organization_id: ''
        },
        showPassword: false,
        loading: false
      }
    },
    methods: {
      async handleRegister() {
        this.loading = true;
        
        try {
          const response = await fetch('http://localhost:5038/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form)
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Registration failed');
          }
  
          const data = await response.json();
          console.log('Registration successful:', data);
          this.$router.push('/login');
        } catch (error) {
          console.error('Registration error:', error);
          alert(error.message);
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .register-page {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }
  
  .register-container {
    width: 100%;
    max-width: 500px;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
  
  .form-group {
    margin-bottom: 1.2rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .password-input {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .hint {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.3rem;
  }
  
  .register-button {
    width: 100%;
    padding: 1rem;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .register-button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .login-link {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }
  
  .login-link a {
    color: #42b983;
    text-decoration: none;
  }
  </style>
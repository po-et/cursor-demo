<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-left">
        <h1>Create Account<br>Join Our World</h1>
        
        <p class="login-text">
          Already have an account?<br>
          <router-link to="/" class="login-link">Sign in here</router-link>.
        </p>
      </div>

      <div class="register-right">
        <form @submit.prevent="handleRegister" class="register-form">
          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div class="form-group">
            <input type="text" v-model="name" placeholder="Your full name" required>
          </div>

          <div class="form-group">
            <input type="email" v-model="email" placeholder="Your email address" required>
          </div>
          
          <div class="form-group">
            <input type="password" v-model="password" placeholder="Create password" required>
          </div>

          <div class="form-group">
            <input type="password" v-model="confirmPassword" placeholder="Confirm password" required>
          </div>

          <button type="submit" class="register-btn" :disabled="loading">
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>

          <div class="divider">
            <span>or register with</span>
          </div>

          <div class="social-login">
            <button class="social-btn google">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
                <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/>
                <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"/>
                <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
            </button>
            <button class="social-btn apple">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M17.05 12.536c-.031-3.008 2.455-4.462 2.568-4.532-1.399-2.043-3.57-2.324-4.344-2.355-1.847-.189-3.607 1.089-4.545 1.089-.937 0-2.385-1.062-3.922-1.034-2.018.031-3.877 1.174-4.915 2.979-2.095 3.637-.537 9.023 1.505 11.977.998 1.442 2.185 3.064 3.744 3.008 1.503-.062 2.072-.972 3.89-.972 1.816 0 2.333.972 3.925.942 1.622-.031 2.648-1.474 3.638-2.922 1.147-1.677 1.619-3.299 1.647-3.384-.036-.016-3.159-1.213-3.191-4.816zm-2.993-8.853c.828-1.004 1.386-2.401 1.233-3.791-1.191.049-2.633.794-3.486 1.797-.766.89-1.436 2.312-1.256 3.676 1.329.103 2.684-.679 3.509-1.682z"/>
              </svg>
            </button>
            <button class="social-btn facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/api'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''
  
  // 验证密码
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match!'
    return
  }
  
  // 验证其他字段
  if (!name.value || !email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }
  
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }
  
  // 验证密码强度
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return
  }
  
  try {
    loading.value = true
    
    const response = await register({
      name: name.value,
      email: email.value,
      password: password.value
    })
    
    // 注册成功
    console.log('Registration successful:', response.data)
    router.push('/home')
    
  } catch (err) {
    console.error('Registration failed:', err)
    if (err.response) {
      // 服务器响应了错误状态码
      const serverError = err.response.data
      console.log('Server error details:', serverError)
      
      if (serverError.message) {
        error.value = serverError.message
      } else if (serverError.error) {
        error.value = serverError.error
      } else {
        error.value = `Registration failed (${err.response.status})`
      }
    } else if (err.request) {
      // 请求发出但没有收到响应
      error.value = 'No response from server. Please try again later.'
    } else {
      // 请求设置时出错
      error.value = 'Request failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7ff 0%, #fff1f9 100%);
}

.register-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  padding: 40px;
}

.register-left {
  flex: 1;
  padding-right: 60px;
}

.register-right {
  width: 400px;
}

h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 24px;
  line-height: 1.2;
  text-align: left;
}

.login-text {
  color: #666;
  margin-bottom: 32px;
  line-height: 1.5;
}

.login-link {
  color: #4F6EF7;
  text-decoration: none;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group input {
  width: 100%;
  padding: 16px;
  border: 1px solid #E1E1E1;
  border-radius: 12px;
  font-size: 16px;
  background: white;
}

.register-btn {
  background: #4F6EF7;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.3s;
}

.register-btn:disabled {
  background-color: #a5b4f9;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  margin: 24px 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: #E1E1E1;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: #f5f7ff;
  padding: 0 10px;
  color: #666;
  font-size: 14px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-btn {
  width: 48px;
  height: 48px;
  border: 1px solid #E1E1E1;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.social-btn svg {
  width: 24px;
  height: 24px;
}

.error-message {
  color: #dc3545;
  background-color: #ffe6e6;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
}
</style> 
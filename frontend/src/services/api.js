import axios from 'axios'

const api = axios.create({
  baseURL: 'https://zwurdnqgiluh.sealoshzh.site/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const register = (data) => {
  const registerData = {
    username: data.name,
    email: data.email,
    password: data.password
  }
  
  return api.post('/register', registerData)
}

export default api 
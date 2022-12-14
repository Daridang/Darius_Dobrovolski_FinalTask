import axios from "axios";

export const API_URL = 'http://localhost:5000/'

const $axios = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$axios.interceptors.response.use((config) => {
  return config
}, async (err) => {
  const originalRequest = err.config
  if (err.response.status === 401 && err.config && !err.config._isRetry) {
    originalRequest._isRetry = true
    try {

      const response = await axios.get(`${API_URL}refresh`, { withCredentials: true })

      localStorage.setItem('token', response.data.accessToken)

      return $axios.request(originalRequest)
    } catch (error) {
      console.log('Not Authorized: ', error)
    }
  }
  throw err
})

export default $axios
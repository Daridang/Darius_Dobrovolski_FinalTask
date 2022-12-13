import $axios from "../api/http"

export default class AuthService {
  static async login(email, pass) {
    return $axios.post('/login', { email, pass })
  }

  static async register(email, name, password, repeatPassword) {
    return $axios.post('/register', { email, name, password, repeatPassword })
  }

  static async logout() {
    return $axios.post('/logout')
  }
}
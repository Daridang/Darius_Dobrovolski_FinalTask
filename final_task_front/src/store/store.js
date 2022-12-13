import axios from "axios"
import { makeAutoObservable } from "mobx"
import { API_URL } from "../api/http"
import AuthService from "../services/AuthService"

export default class Store {

  user = {}
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(auth) {
    this.isAuth = auth
  }

  setUser(user) {
    this.user = user
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  async register(email, name, password, repeatPassword) {

    try {
      const response = await AuthService.register(email, name, password, repeatPassword)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({})
    } catch (error) {
      console.log(error)
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}refresh`, { withCredentials: true })

      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }
}
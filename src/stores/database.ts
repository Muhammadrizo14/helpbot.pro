import { defineStore } from 'pinia'
import {ref} from "vue";
import axios from "axios";
import {apiUrl} from "../main";

export const useAuthStore = defineStore('auth', ()=> {
  const user = ref(JSON.parse(localStorage.getItem('user') || null))
  const token = ref(localStorage.getItem('token') || null)

  const login = async (question: string, similar:string, answer: string)=> {
    return await axios
      .post(`${apiUrl}/user/login`, {
        username,
        password
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
  }

  const register = async (email: string, password:string, first_name:string, last_name:string)=> {
    return await axios
      .post(`${apiUrl}/user/register`, {
        email,
        password,
        first_name,
        last_name,
      })
  }

  const addToken = ({access_token}: string) => {
    localStorage.setItem('token', access_token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    user.value = null
  }

  return {
    user,
    addToken,
    logout,
    login,
    register,
  }
})
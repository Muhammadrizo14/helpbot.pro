import { defineStore } from 'pinia'
import {ref} from "vue";

export const useBotStore = defineStore('bot', ()=> {
  const bot = ref(localStorage.getItem('bot') || 'МойБот')

  const editName = (name: string)=> {
    localStorage.setItem('bot', name);
    bot.value = name
  }

  return {
    editName,
    bot
  }
})
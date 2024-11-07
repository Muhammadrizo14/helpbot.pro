import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./AuthStore";
import { useRouter } from 'vue-router'
import router from "../router/index";
import {useBotStore} from "@/stores/BotStore.ts";

export interface IChat {

}

export const useChatStore = defineStore("chat", () => {
  const bot = useBotStore()

  const getMessages = async ()=> {
    return axios.get(`${apiUrl}/bot/sandbox/chat/history?bot_id=${bot.selectedBot.id}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  const sendMessage = async (message: string)=> {
    return axios.post(`${apiUrl}/bot/sandbox/chat?bot_id=${bot.selectedBot.id}&message=${message}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  return {
    getMessages,
    sendMessage
  };
});

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
    return axios.get(`${apiUrl}/bot/${bot.selectedBot.id}/sandbox/chat/history`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }

  const sendMessage = async (message: string)=> {
    return axios.post(`${apiUrl}/bot/${bot.selectedBot.id}/sandbox/chat?message=${message}`, {}, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }

  return {
    getMessages,
    sendMessage
  };
});

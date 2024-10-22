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

  const textToBot = (message: string)=> {
    const bot = useBotStore()
    const auth = useAuthStore()

    console.log(message)

    axios.post(`${apiUrl}/bot/chat-simulation?bot_id=${bot.selectedBot.id}&chat_user_id=${auth.user.id}&message=${message}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return {
    textToBot
  };
});

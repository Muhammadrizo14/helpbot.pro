import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./AuthStore";

export const useBotStore = defineStore("bot", () => {
  const bot = ref(localStorage.getItem("bot") || "МойБот");

  const editName = (name: string) => {
    localStorage.setItem("bot", name);
    bot.value = name;
  };

  const createBot = async (title: string) => {
    const userdata = useAuthStore();
    return await axios.post(
      `${apiUrl}/bot/create?user_id=${userdata.user.id}&bot_name=${title}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  };

  return {
    editName,
    bot,
    createBot,
  };
});

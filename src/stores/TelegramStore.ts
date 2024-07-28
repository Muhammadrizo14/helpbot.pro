import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./AuthStore";

export const useTelegram = defineStore("telegram", () => {
  const integration = ref(JSON.parse(localStorage.getItem("telegramIntegration")) || false);

  const disable = async () => {
    const userdata = useAuthStore();

    return await axios.post(
      `${apiUrl}/integration/tg/enable-wh?token=${userdata}&bot_id=${0}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then(()=> {
        localStorage.setItem("telegramIntegration", 'false');
        bot.value = false;
      })
  };

  const enable = async () => {
    const userdata = useAuthStore();

    return await axios.post(
      `${apiUrl}/integration/tg/enable-wh?token=${userdata.token}&bot_id=${0}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then(()=> {
        localStorage.setItem("telegramIntegration", 'true');
        bot.value = true
      })
  };

  const addTelegram = async (bot_token: string) => {
    return await axios.post(
      `${apiUrl}/integration/tg/wh/${bot_token}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  };

  return {
    addTelegram,
    disable,
    integration,
    enable,
  };
});

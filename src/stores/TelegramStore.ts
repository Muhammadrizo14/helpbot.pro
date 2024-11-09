import {apiUrl} from "@/main";
import axios from "axios";
import {defineStore} from "pinia";
import {ref} from "vue";
import {useAuthStore} from "./AuthStore";
import {useBotStore} from "./BotStore";

export const useTelegram = defineStore("telegram", () => {
  const integration = ref(JSON.parse(localStorage.getItem("telegramIntegration")) || false);

  const disable = async () => {
    const userdata = useAuthStore();

    return await axios.post(
      `${apiUrl}/integration/tg/disable-wh?token=${userdata.token}&bot_id=${0}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then(() => {
        localStorage.setItem("telegramIntegration", 'false');
        bot.value = false;
      })
  };

  const enable = async (token) => {
    const userdata = useAuthStore();
    const bot = useBotStore();

    return await axios.post(
      `${apiUrl}/integration/tg/enable-wh?token=${token}&bot_id=${bot.selectedBot.id}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then(() => {
        localStorage.setItem("telegramIntegration", 'true');
      })
  };

  const addTelegram = async (bot_token: string) => {
    const bot = useBotStore();

    return await axios.post(
      `${apiUrl}/integration/tg/enable-wh?token=${bot_token}&bot_id=${bot.selectedBot.id}`, {},
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

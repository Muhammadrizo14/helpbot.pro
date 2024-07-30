import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./AuthStore";

export interface IBot {
  id: number,
  name: string,
  is_active: boolean,
  welcome_message: string,
  operator_switch_message: string,
  feedback_message: string,
}

export const useBotStore = defineStore("bots", () => {
  const bots = ref<IBot[]>([]);
  const selectedBot = ref<IBot>(JSON.parse(localStorage.getItem("selectedBot")) || null);

  const changeSelectedBot = (bot: IBot) => {
    selectedBot.value = bot;
    localStorage.setItem("selectedBot", JSON.stringify(bot));
  };

  const getAllBots = async () => {
    const authStore = useAuthStore();

    try {
      const userData = await authStore.getUser();

      if (!userData || !userData.id) {
        console.error("User is not authenticated");
        return;
      }

      const res = await axios.get(`${apiUrl}/bot/bots?user_id=${userData.id}`);

      bots.value = res.data;
      if (!selectedBot.value && bots.value.length > 0) {
        changeSelectedBot(bots.value[0]);
      }
    } catch (error) {
      console.error("Failed to fetch bots", error);
    }
  };

  const deleteBot = async (id: number) => {
    try {
      await axios.patch(
        `${apiUrl}/bot/remove?bot_id=${id}`,
        {},
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }
      );
      await getAllBots();
      if (bots.value.length > 0) {
        changeSelectedBot(bots.value[0]);
      } else {
        selectedBot.value = null;
        localStorage.removeItem("selectedBot");
      }
    } catch (error) {
      console.error("Failed to delete bot", error);
    }
  };

  const createBot = async (title: string) => {
    const authStore = useAuthStore();
    try {
      const res = await axios.post(
        `${apiUrl}/bot/create?user_id=${authStore.user?.id}&bot_name=${title}`,
        {},
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }
      );
      await getAllBots();
      changeSelectedBot(res.data);
    } catch (error) {
      console.error("Failed to create bot", error);
    }
  };

  return {
    bots,
    getAllBots,
    createBot,
    changeSelectedBot,
    selectedBot,
    deleteBot
  };
});

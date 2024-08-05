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
  const selectedBot = ref<IBot>(JSON.parse(localStorage.getItem("selectedBot")))


  const changeSelectedBot = (bot : IBot) => {
    selectedBot.value = bot
    localStorage.setItem("selectedBot", JSON.stringify(bot))
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
      return res.data
    } catch (error) {
      console.error("Failed to fetch bots", error);
    }
  };

  const deleteBot = async (id: number) => {
    return await axios.patch(
      `${apiUrl}/bot/remove?bot_id=${id}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res)=>{
        selectedBot.value = bots.value[0]
        localStorage.setItem("selectedBot", JSON.stringify(bots.value[0]))
        getAllBots()
      })
  }


  const createBot = async (title: string) => {
    const userdata = useAuthStore();
    return await axios.post(
      `${apiUrl}/bot/create?user_id=${userdata?.user?.id}&bot_name=${title}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res)=>{
        selectedBot.value = res.data
        getAllBots()
      })
  };

  const editBot = async (newData: IBot) => {
    axios.patch(`${apiUrl}/bot/update/${selectedBot.value.id}`, {
      ...newData
    })
      .then(res => {
        getAllBots()
          .then(res => {
            // Assuming `res` is the updated list of bots
            const updatedBot = res.find(data => data.id === selectedBot.value.id);
            if (updatedBot) {
              selectedBot.value = updatedBot; // Update selectedBot in store
              localStorage.setItem("selectedBot", JSON.stringify(updatedBot));
            }
          });
      })
      .catch(error => {
        console.error("Failed to edit bot:", error);
      });
  }

  const getAllUsersOfBot = async () => {
    return axios.get(`${apiUrl}/bot/users?bot_id=${selectedBot.value.id}`)
  }


  return {
    bots,
    getAllBots,
    createBot,
    changeSelectedBot,
    selectedBot,
    deleteBot,
    editBot,
    getAllUsersOfBot
  };
});

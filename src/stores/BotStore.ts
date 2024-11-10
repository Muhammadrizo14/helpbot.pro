import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./AuthStore";
import { useRouter } from 'vue-router'
import router from "../router/index";

export interface IBot {
  id: number,
  name: string,
  is_active: boolean,
  welcome_message: string,
  operator_switch_message: string,
  feedback_message: string,
  llm_type: string,
  system_prompt: string,
  chat_access_restricted: boolean,
  chat_access_invite_message: string,
  chat_access_delete_message: string,
  chat_access_refuse_message: string
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


      if (res.data.length === 0) {
        selectedBot.value = null;
        router.push('/create');
        return;
      }



      const selectedBotNew = res.data.find((bot)=> bot.name === selectedBot.value.name)

      changeSelectedBot(selectedBotNew)

      bots.value = res.data;
      return res.data
    } catch (error) {
      console.error("Failed to fetch bots", error);
    }
  };

  const deleteBot = async (id: number) => {
    return await axios.delete(
      `${apiUrl}/bot/${id}/remove`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then(async (res)=>{
        await getAllBots()

        if (bots.value.length === 0) {
          selectedBot.value = null;
          router.push('/create');
          return;
        }

        selectedBot.value = bots.value[0]

        localStorage.setItem("selectedBot", JSON.stringify(bots.value[0]))

      })
  }


  const createBot = async (title: string) => {
    const userdata = useAuthStore();
    return await axios.post(
      `${apiUrl}/bot/create?user_id=${userdata?.user?.id}&bot_name=${title}`,
      {},
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res)=>{
        selectedBot.value = res.data
        localStorage.setItem("selectedBot", JSON.stringify(res.data));
        getAllBots()
      })
  };

  const editBot = async (newData: IBot) => {
    axios.patch(`${apiUrl}/bot/${selectedBot.value.id}/update`, {
      ...newData
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        selectedBot.value = res.data;
        localStorage.setItem("selectedBot", JSON.stringify(res.data));
      })
      .catch(error => {
        console.error("Failed to edit bot:", error);
      });
  }

  const getAllUsersOfBot = async () => {
    return axios.get(`${apiUrl}/bot/${selectedBot.value.id}/users`)
  }

  const inviteUser = (email: string)=> {
    return axios.post(`${apiUrl}/bot/${selectedBot.value.id}/user/invite?email=${email}`)
  }

  const addUser = (id: string)=> {
    return axios.post(`${apiUrl}/bot/${selectedBot.value.id}/user/add?user_id=${id}&role=employee`)
  }

  return {
    bots,
    getAllBots,
    createBot,
    changeSelectedBot,
    selectedBot,
    deleteBot,
    editBot,
    getAllUsersOfBot,
    inviteUser,
    addUser
  };
});

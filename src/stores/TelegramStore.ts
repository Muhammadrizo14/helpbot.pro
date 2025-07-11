import {apiUrl} from "@/main";
import axios from "axios";
import {defineStore} from "pinia";
import {ref} from "vue";
import {useAuthStore} from "./AuthStore";
import {useBotStore} from "./BotStore";

export const useTelegram = defineStore("telegram", () => {
  const getTelegramIntegration = async (bot_id: number) => {
    return await axios.get(
      `${apiUrl}/integration/tg?bot_id=${bot_id}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
  }

  const disableIntegration = async (bot_id: number) => {
    return await axios.post(
      `${apiUrl}/integration/tg/disable-wh?bot_id=${bot_id}`, {},
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
  };

  const addTelegram = async (bot_token: string) => {
    const bot = useBotStore();

    return await axios.post(
      `${apiUrl}/integration/tg/enable-wh?token=${bot_token}&bot_id=${bot.selectedBot.id}`, {},
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const getAccessedUsers = async (bot_id: number) => {
    return await axios.get(
      `${apiUrl}/integration/tg/chat-access/${bot_id}/chat-users`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
  const addAccessedUser = async (bot_id: number, tg_user_id: number) => {
    return await axios.post(
      `${apiUrl}/integration/tg/chat-access/${bot_id}/chat-user?tg_user_id=${tg_user_id}`, {},
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
  const exportAccessedUsersExcel = async (bot_id: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return axios.post(
      `${apiUrl}/integration/tg/chat-access/${bot_id}/export/excel`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
  }
  const deleteSelectedAccessedUsers = async (bot_id: number, selectedAccessedUsers: number[]) => {
    return axios.delete(
      `${apiUrl}/integration/tg/chat-access/${bot_id}/chat-users`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: selectedAccessedUsers,
      }
    )
  }

  return {
    getTelegramIntegration,
    addTelegram,
    disableIntegration,
    getAccessedUsers,
    addAccessedUser,
    exportAccessedUsersExcel,
    deleteSelectedAccessedUsers
  };
});

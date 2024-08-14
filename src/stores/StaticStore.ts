import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBotStore } from "./BotStore";

export const useStaticStore = defineStore("static", () => {
  const tokens = ref();
  const requests = ref();

  const getRequests = async (type: string) => {
    const store = useBotStore();

    return axios.get(`${apiUrl}/statistics/requests?bot_id=1&interval=${type}`);
  };

  const downloadAnalytic = async () => {
    return axios.post(`${apiUrl}/statistics/download_statistics/?bot_id=1`, {
      headers: {
        accept: "application/json",
      },
      responseType: "blob",
    });
  };

  const getTime = async () => {
    return axios.get(`${apiUrl}/statistics/time?bot_id=1&interval=month`,);
  };

  return {
    tokens,
    requests,
    getRequests,
    downloadAnalytic,
    getTime
  };
});

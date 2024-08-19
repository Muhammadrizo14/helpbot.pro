import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBotStore } from "./BotStore";

export const useStaticStore = defineStore("static", () => {
  const tokens = ref();
  const requests = ref();


  const getRequests = async (type: string) => {
    const store = useBotStore()

    return axios.get('https://helpbot.site/statistics/requests', {
      params: {
        bot_id: store.selectedBot.id,
        interval: type
      },
      headers: {
        'Accept': 'application/json'
      }
    })
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
    const store = useBotStore()

    return axios.get(`${apiUrl}/statistics/time?bot_id=${store.selectedBot.id}&interval=month`,);
  };


  const getGrades = (type: string)=> {
    const store = useBotStore()

    return axios.get(`${apiUrl}/statistics/grades?bot_id=${store.selectedBot.id}&interval=${type}`)
  }


  const getData = ()=> {
    const store = useBotStore()
    return axios.get(`${apiUrl}/statistics/count?bot_id=${store.selectedBot.id}`)
  }

  const getAverageToken = (type)=> {
    const store = useBotStore()

    return axios.get(`${apiUrl}/statistics/tokens?bot_id=${store.selectedBot.id}&interval=${type}`)

  }

  return {
    tokens,
    requests,
    getRequests,
    downloadAnalytic,
    getTime,
    getGrades,
    getData,
    getAverageToken
  };
});

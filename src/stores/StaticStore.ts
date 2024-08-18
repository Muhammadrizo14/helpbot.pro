import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBotStore } from "./BotStore";

export const useStaticStore = defineStore("static", () => {
  const tokens = ref();
  const requests = ref();


  const getRequests = async (type: string) => {
    return axios.get('https://helpbot.site/statistics/requests', {
      params: {
        bot_id: 1,
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
    return axios.get(`${apiUrl}/statistics/time?bot_id=1&interval=month`,);
  };


  const getGrades = (type: string)=> {
    return axios.get(`${apiUrl}/statistics/grades?bot_id=1&interval=${type}`)
  }


  const getData = ()=> {
    const store = useBotStore()
    return axios.get(`${apiUrl}/statistics/count?bot_id=${store.selectedBot.id}`)
  }

  const getAverageToken = (type)=> {
    return axios.get(`${apiUrl}/statistics/tokens?bot_id=1&interval=${type}`)

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

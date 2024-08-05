import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "../main";
import {useBotStore} from "./BotStore";

type IQuestion = {

};

export const useKnowledgeStore = defineStore("knowledge", () => {


  const createArticle = async ({title, content})=> {

    const store = useBotStore()

    return axios.post(`https://helpbot.site/trainingset/article?title=${title}&bot_id=${store.selectedBot.id}`, content, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
  const createWebsite = async ({url, title, parse_method})=> {
    const store = useBotStore()


    return axios.post(`${apiUrl}/trainingset/website?url=${url}&title=${title}&bot_id=${store.selectedBot.id}&parse_method=${parse_method}`)
  }

  return {
    createArticle,
    createWebsite
  };
});

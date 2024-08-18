import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "../main";
import {useBotStore} from "./BotStore";

type DataType = {
  path: string | null;
  url: string | null;
  file: string | null;
  title: string;
  formatted_text_chunks: string[] | null;
  bot_id: number;
  id: number;
  type: "website" | "article";
  parse_method: string | null;
  raw_text: string;
};




export const useKnowledgeStore = defineStore("knowledge", () => {
  const dataset = ref<DataType[]>([])

  const getDataset = ()=> {
    const store = useBotStore()

    return axios.get(`${apiUrl}/trainingset/trainingsets?bot_id=${store.selectedBot.id}`)
  }


  const createArticle = async ({title, content})=> {
    const store = useBotStore()

    return axios.post(`${apiUrl}/trainingset/article?title=${title}&bot_id=${store.selectedBot.id}`, content, {
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


  const removeDataset = async (id:number)=> {

    const store = useBotStore()


    return axios.delete(`${apiUrl}/trainingset/delete?dataset_id=${id}&bot_id=${store.selectedBot.id}`)
  }

  const removeMultipleDatasets = async (id: number[])=> {

    const store = useBotStore()

    return axios.delete(`${apiUrl}/trainingset/delete_multiple?bot_id=${store.selectedBot.id}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: id
    })

  }




  const uploadFile = async (title: string, file: File) => {
    const store = useBotStore();

    // Create a FormData object
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Send the POST request
    return axios.post(
      'https://helpbot.site/trainingset/file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
        },
        params: {
          title,
          bot_id: store.selectedBot.id, // Ensure botId is available in your store
        },
      }
    )
  };

  return {
    createArticle,
    createWebsite,
    getDataset,
    dataset,
    removeDataset,
    removeMultipleDatasets,
    uploadFile
  };
});

import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBotStore } from "./BotStore";

type IRequest = {
  request_id: number;
  message_id: number;
  message_text: string;
  received_at: string;
  is_redirected_to_operator: boolean;
  is_resolved: boolean;
  ended_at: string;
};

export const useRequestStore = defineStore("requests", () => {
  const allRequests = ref<IRequest[]>([]);
  const openedRequests = ref<IRequest[]>([]);
  const closedRequests = ref<IRequest[]>([]);

  const getRequests = async () => {
    const store = useBotStore();
    return axios
      .get<IRequest[]>(`${apiUrl}/requests/messages/user?bot_id=${store.selectedBot.id}`)
      .then((res) => {


        allRequests.value = res.data;

        openedRequests.value = res.data.filter((a)=> a.is_resolved)
        closedRequests.value = res.data.filter((a)=> !a.is_resolved)

        return res
      })
      .catch((err) => {
        return [];
      });
  };




  const deleteRequest = (id: number)=> {
    const store = useBotStore();

    return axios.delete(`${apiUrl}requests/delete?message_id=${id}&bot_id=${store.selectedBot.id}`)
  }

  const removeMultipleRequests = async (id: number[])=> {

    console.log(id)

    const store = useBotStore()

    return axios.delete(`${apiUrl}/trainingset/delete_multiple?bot_id=${store.selectedBot.id}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: id
    })

  }

  return {
    getRequests,
    allRequests,
    openedRequests,
    closedRequests,
    deleteRequest,
    removeMultipleRequests
  };
});
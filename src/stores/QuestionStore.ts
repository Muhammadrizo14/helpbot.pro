import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "../main";
import {useBotStore} from "./BotStore";

type IQuestion = {
  question: string;
  answer: string;
  action: string;
  bot_id: number;
  similar_questions: string[]
};

export const useQuestionStore = defineStore("question", () => {
  const questions = ref<IQuestion[]>([])


  const getAllProfiles = async ()=> {
    axios.get(`${apiUrl}/bot/profile`)
      .then(res=> {
        console.log(res)
      })
  }

  const getAllQuestions = async ()=> {
    const store = useBotStore()
    return axios.get(`${apiUrl}/trainingset/questions_list?bot_id=${store.selectedBot.id}`)
  }

  const createQuestion = async ({question, answer}: string)=> {
    const store = useBotStore()

    return axios.post(`${apiUrl}/trainingset/question?question=${question}&answer=${answer}&action=${answer === 'call_operator' ? 'call_operator': 'answer'}&bot_id=${store.selectedBot.id}`)
      .then(res=> {
        return res.data
      })
  }


  const removeQuestion = ()=> {
    const store = useBotStore()

    return axios.get(`${apiUrl}/trainingset/questions_list?bot_id=${store.selectedBot.id}`)

  }

  return {
    getAllQuestions,
    questions,
    getAllProfiles,
    createQuestion,
    removeQuestion
  };
});

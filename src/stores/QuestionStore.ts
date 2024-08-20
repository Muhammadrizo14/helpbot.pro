import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "../main";
import {useBotStore} from "./BotStore";

type IQuestion = {
  id: number;
  question: string;
  answer: string;
  action: 'call_operator' | 'answer';
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
    return axios.get(`${apiUrl}/faq/questions?bot_id=${store.selectedBot.id}`)
  }

  const createQuestion = async ({question, answer, similar}: string)=> {
    const store = useBotStore()

    const similar_questions = similar.map(y=> `similar_questions=${y}`).join('&')



    return axios.post(`${apiUrl}/trainingset/question?question=${question}&answer=${answer}&action=${answer === 'call_operator' ? 'call_operator': 'answer'}&bot_id=${store.selectedBot.id}&${similar_questions}`)
  }


  const editQuestion = (question: IQuestion)=> {
    return axios.patch(`${apiUrl}/faq/update?question_id=${question.id}`, {
      ...question
    })
  }

  const removeQuestion = (id: number)=> {
    const store = useBotStore()
    return axios.delete(`${apiUrl}/faq/delete`, {
      params: {
        question_id: id,
        bot_id: store.selectedBot.id
      },
      headers: {
        'accept': 'application/json'
      }
    })

  }

  return {
    getAllQuestions,
    questions,
    getAllProfiles,
    createQuestion,
    removeQuestion,
    editQuestion
  };
});

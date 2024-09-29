import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "../main";
import { useBotStore } from "./BotStore";

type IQuestion = {
  id: number;
  main_question: string;
  answer: string;
  action: "call_operator" | "answer";
  similar_questions: string[];
};

export const useQuestionStore = defineStore("question", () => {
  const questions = ref<IQuestion[]>([]);

  const getAllProfiles = async () => {
    axios.get(`${apiUrl}/bot/detail`).then((res) => {
      console.log(res);
    });
  };

  const getAllQuestions = async () => {
    const store = useBotStore();
    return axios.get(
      `${apiUrl}/data-source/questions?bot_id=${store.selectedBot.id}`
    );
  };

  const createQuestion = async ({ main_question, answer, similar }: string) => {
    const store = useBotStore();

    const data = {
      main_question,
      similar_questions: similar,
      answer,
      action: `${answer === "call_operator" ? "call_operator" : "answer"}`,
    };

    return axios.post(
      `${apiUrl}/data-source/create/question?bot_id=${store.selectedBot.id}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  const editQuestion = (question: IQuestion) => {
    return axios.patch(
      `${apiUrl}/data-source/question/update?question_id=${question.id}`,
      {
        ...question,
      }
    );
  };

  const removeQuestion = (id: number) => {
    return axios.delete(`${apiUrl}/data-source/delete/question`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: [id],
    });
  };

  return {
    getAllQuestions,
    questions,
    getAllProfiles,
    createQuestion,
    removeQuestion,
    editQuestion,
  };
});

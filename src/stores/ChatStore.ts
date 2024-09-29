import { apiUrl } from "@/main";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./AuthStore";
import { useRouter } from 'vue-router'
import router from "../router/index";

export interface IChat {

}

export const useBotStore = defineStore("chat", () => {

  return {

  };
});

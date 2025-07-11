import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "../main";
import router from "../router/index";
import {useBotStore} from "./BotStore";

type IUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<IUser>();
  const token = ref(localStorage.getItem("token") || null);

  const login = async (username: string, password: string) => {
    return await axios.post(
      `${apiUrl}/user/login`,
      {
        username,
        password,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
      )
  };

  const register = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    ) => {
    return await axios.post(`${apiUrl}/user/register`, {
      email,
      password,
      first_name,
      last_name,
    });
  };

  const addToken = ({ access_token }: string) => {
    localStorage.setItem("token", access_token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push({ path: "/auth" });
    user.value = null;
  };

  const getUser = async () => {
    try {
      const res = await axios.get<IUser>(`${apiUrl}/user/me`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      user.value = res.data;
    } catch (error) {
      logout();
    }
    return user.value;
  };

  const changePassword = async (old_password, new_password) => {
    try {
      const res = await axios.post(
        `${apiUrl}/user/password/change`,
        { old_password, new_password },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        );
      return res;
    } catch (error) {
      throw error;
    }
  };

  const changeEmail = async (old_email, new_email) => {
    try {
      const res = await axios.post(
        `${apiUrl}/user/email/change`,
        { old_email, new_email },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = (email: string) => {
    return axios.post(`${apiUrl}/user/password/request-reset?email=${email}`);
  };

  return {
    user,
    addToken,
    logout,
    login,
    register,
    getUser,
    token,
    changePassword,
    resetPassword,
    changeEmail,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "../main";

type IUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<IUser>(null);
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
      }
    );
  };

  const register = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string
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
    user.value = null;
  };

  const getUser = async () => {
    axios
      .get<IUser>(`${apiUrl}/user/protected`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        user.value = res.data;
      })
      .catch(()=> {
        logout()
      })
    return user;
  };

  return {
    user,
    addToken,
    logout,
    login,
    register,
    getUser,
    token
  };
});

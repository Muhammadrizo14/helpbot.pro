import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "../main";
import router from "../router/index";
import {useBotStore} from "./BotStore";

type ISubscriptionModule = {
  id: number;
  name: string;
}

type ISubscription = {
  id: number;
  order: number;
  title: string;
  description: string;
  tokens_included: number;
  price: number;
  recommended: boolean;
  default_modules: ISubscriptionModule[];
};

type IPayment = {
  id: number;
  amount: number;
  created_at: Date;
}

type IPurchase = {
  id: number;
  price: number;
  created_at: Date;
  purchase_object_name: string;
}

export const usePaymentsStore = defineStore("payments", () => {
  const subscriptions = ref<ISubscription[]>([]);
  const payments =  ref<IPayment[]>([])
  const purchases =  ref<IPurchase[]>([])
  
  const getSubscriptions = async ()=> {
    await axios.get(`${apiUrl}/subscriptions`, {
      headers: {
        accept: "application/json",
      },
    }).then((res) => {
      subscriptions.value = res.data
    }).catch((res) => {
      console.log(res)
    })
  }

  const topUpBalance = async (amount: number) => {
    await axios.post(`${apiUrl}/user/balance/top-up?amount=${amount}`, {}, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      window.location.href = res.data;
    }).catch((res) => {
      console.log(res)
    })
  }

  const getPayments = async () => {
    await axios.get(`${apiUrl}/user/payments`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      payments.value = res.data
    }).catch((res) => {
      console.log(res)
    })
  }

  const getPurchases = async () => {
    await axios.get(`${apiUrl}/user/purchases`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      purchases.value = res.data
    }).catch((res) => {
      console.log(res)
    })
  }

  const purchaseSubscription = async (subscription_id: number) => {
    return await axios.post(`${apiUrl}/user/purchase/subscription?subscription_id=${subscription_id}`, {}, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  }

  return {
    subscriptions,
    payments,
    purchases,
    getSubscriptions,
    topUpBalance,
    getPayments,
    getPurchases,
    purchaseSubscription,
  };
});
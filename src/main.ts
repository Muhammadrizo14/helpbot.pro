import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import "./assets/css/main.scss";
import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.min.css";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import Chart from "primevue/chart";

const pinia = createPinia();

export const apiUrl = import.meta.env.VITE_APP_URL;

const app = createApp(App);
app.use(ToastService);
app.use(pinia);
app.directive("tooltip", Tooltip);
app.use(PrimeVue);
app.use(router);
app.mount("#app");

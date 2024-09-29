import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Auth/LoginView.vue";
import RegisterView from "../views/Auth/RegisterView.vue";
import AuthView from "../views/Auth/Auth.vue";
import CreateView from "../views/create.vue";
import HomeView from "../views/home.vue";

//Dashboard
import MainView from "../views/Dashboard/main.vue";
import IntegrationView from "../views/Dashboard/integration.vue";
import UsersView from "../views/Dashboard/users.vue";
import SettingsView from "../views/Dashboard/settings.vue";
import UserSettingsView from "../views/Dashboard/User/settings.vue";
import changePasswordView from "../views/Dashboard/User/change-password.vue";
import PaymentView from "../views/Dashboard/payment.vue";
import BotsView from "../views/Dashboard/bots.vue";
import chat from "../views/Dashboard/chat.vue";
import error404 from "../views/Dashboard/Errors/404.vue";

// Dashboard => Content
import QuestionsView from "../views/Dashboard/Content/questions.vue";
import TemplatesView from "../views/Dashboard/Content/templates.vue";
import DataBaseView from "../views/Dashboard/Content/Data-Base/data-base.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: HomeView,
    children: [
      {
        path: "",
        component: MainView,
      },
      {
        path: "/chat",
        component: chat,
      },
      {
        path: "/integration",
        component: IntegrationView,
      },
      {
        path: "/users",
        component: UsersView,
      },
      {
        path: "/user-settings",
        component: UserSettingsView,
      },
      {
        path: "/bots",
        component: BotsView,
      },
      {
        path: "/payment",
        component: PaymentView,
      },
      {
        path: "/settings",
        component: SettingsView,
      },
      {
        path: "/content/questions",
        component: QuestionsView,
      },
      {
        path: "/content/templates",
        component: TemplatesView,
      },
      {
        path: "/content/database",
        component: DataBaseView,
      },
    ],
  },
  {
    path: "/auth",
    component: AuthView,
    children: [
      {
        path: "",
        component: LoginView,
      },
      {
        path: "register",
        component: RegisterView,
      },
    ],
  },
  {
    path: "/create",
    component: CreateView,
  },
  {
    path: "/user-password",
    component: changePasswordView,
  },
  {
    path: "/:notFound",
    component: error404,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const user = localStorage.getItem("token");
//   if (!user && !to.path.includes("/auth")) {
//     next("/auth");
//   } else {
//     next();
//   }
// });

export default router;

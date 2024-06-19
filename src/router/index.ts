import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import AuthView from '../views/Auth/Auth.vue'
import CreateView from '../views/create.vue'
import HomeView from '../views/home.vue'

const routes = [

  {
    path: '/',
    component: HomeView
  },

  {
    path: '/auth',
    component: AuthView,
    children: [
      {

        path: '',
        component: LoginView,
      },
      {
        path: 'register',
        component: RegisterView,
      },
    ],
  },
  {
    path: '/create',
    component: CreateView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})




export default router;

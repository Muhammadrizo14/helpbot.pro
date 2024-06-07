import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/css/main.scss'
import { createPinia } from 'pinia'

const pinia = createPinia()

export const apiUrl = import.meta.env.VITE_APP_URL

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

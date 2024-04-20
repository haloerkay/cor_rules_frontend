import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import router from "./router"


const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import router from '../router.js'
import store from '~/store/index.js'
import '~/assets/css/main.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')

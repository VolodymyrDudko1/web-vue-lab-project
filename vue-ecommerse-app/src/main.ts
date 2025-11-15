import { createApp } from 'vue'
import './style.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


import BootstrapVue3 from 'bootstrap-vue-3'

import router from './router/routes'
import { createPinia } from "pinia"
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)

app.mount('#app')



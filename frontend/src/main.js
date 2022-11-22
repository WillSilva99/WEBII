import { createApp } from 'vue'
import { Quasar, Loading, Notify } from 'quasar'
import Maska from 'maska'
import router from './router'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'

import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";


createApp(App).use(router).use(Maska).use(Quasar, {plugins: {Loading, Notify},}).mount('#app')
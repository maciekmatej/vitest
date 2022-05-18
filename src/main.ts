import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPhone, faSearch, faArrowUpLong, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import App from './App.vue'
import router from './router'

library.add(faPhone,faSearch, faArrowUpLong, faArrowUp);
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')

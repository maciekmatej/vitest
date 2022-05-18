import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faSearch, faArrowUpLong} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from './App.vue'
import router from './router'

library.add(faPhone,faSearch, faArrowUpLong);
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
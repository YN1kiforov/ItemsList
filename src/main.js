import { createApp } from 'vue'
import App from './App.vue'
import Paginate from "vuejs-paginate-next";
//import "vue-awesome-paginate/dist/style.css";
//createApp(App).mount("#app");
const app = createApp(App);
app.component('paginate',Paginate)
app.mount('#app')

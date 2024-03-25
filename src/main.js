import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-vue/styles.css";
import { createPinia } from "pinia";
import "./index.css";
import router from './router'

Amplify.configure(awsconfig);

const pinia = createPinia();
const app = createApp(App).use(router);

app.use(pinia);
app.mount("#app");

import { createApp, provide, inject } from "vue";
import { createPinia } from 'pinia'
import socket from "./socket"
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

app.provide('socket', socket);
app.config.globalProperties.$socket = socket;

app.use(pinia);
app.use(router);

app.mount("#app");

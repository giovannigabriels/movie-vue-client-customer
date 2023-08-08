import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import App from "./App.vue";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.use(vue3GoogleLogin, {
  clientId:
    "966411328426-k8i9nmle5hs3me6mbff26g9kvlgst6pg.apps.googleusercontent.com",
});

app.use(router);
app.use(pinia);

app.mount("#app");

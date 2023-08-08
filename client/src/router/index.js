import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Favorite from "../views/Favorite.vue";
import NotFound from "../views/NotFound.vue";
import Detail from "../views/MovieDetail.vue";
import Register from "../views/Register.vue";
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: "/login", name: "login", component: Login },
  { path: "/", name: "home", component: Home },
  { path: "/favorite", name: "favorite", component: Favorite },
  { path: "/detail/:movieId", name: "detail", component: Detail },
  { path: "/register", name: "register", component: Register },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to, from) => {
  if (to.name == "favorite" && !localStorage.access_token) {
    return "/login";
  }

  if (to.name == "login" && localStorage.access_token) {
    return "/";
  }

  if (to.name == "register" && localStorage.access_token) {
    return "/";
  }
});

export default router;

// // 5. Create and mount the root instance.
// const app = Vue.createApp({});
// // Make sure to _use_ the router instance to make the
// // whole app router-aware.
// app.use(router);

// app.mount("#app");

// Now the app has started!

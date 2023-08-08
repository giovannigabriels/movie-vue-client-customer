<script>
import { mapState, mapWritableState } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useUserStore } from "./stores/user";
// import Vue from "vue";

// // Import Bootstrap and BootstrapVue CSS files (order is important)

// Vue.use(BootstrapVue);

// import HelloWorld from "./components/HelloWorld.vue";
export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState(useUserStore, ["isLogin"]),
    ...mapWritableState(useUserStore, ["isLogin"]),
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true;
    }
  },
};
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>

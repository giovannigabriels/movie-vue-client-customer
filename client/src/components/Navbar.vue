<script>
import { mapWritableState, mapActions } from "pinia";
import { useMovieStore } from "../stores/movie";
import { useUserStore } from "../stores/user";

export default {
  data() {
    return {
      title: "",
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(useMovieStore, ["fetchTitleMovie", "paginationMovie"]),
    logoutHandler() {
      Swal.fire({
        title: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          this.isLogin = false;
          this.$router.push("/login");
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Logout Success!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
    submitSearch() {
      this.fetchTitleMovie(this.title);
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"
        ><img src="../assets/icons8-netflix.svg" alt=""
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="isLogin" class="nav-link active" to="/favorite"
              >Favorite</router-link
            >
          </li>
        </ul>
        <form class="d-flex mx-5" role="search" @submit.prevent="submitSearch">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search by title..."
            aria-label="Search"
            name="title"
            v-model="title"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

        <a
          v-if="isLogin"
          @click.prevent="logoutHandler"
          href=""
          class="btn btn-danger"
          >Logout</a
        >
        <router-link v-if="!isLogin" to="/login" class="btn btn-info"
          >Sign In</router-link
        >
      </div>
    </div>
  </nav>
</template>

<style>
img {
  /* width: 50px; */
  height: 50px;
}
</style>

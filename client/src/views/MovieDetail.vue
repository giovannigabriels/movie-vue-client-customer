<script>
import { mapActions, mapState } from "pinia";

import { useMovieStore } from "../stores/movie";

export default {
  created() {
    let link = window.location.href;
    this.getQrCode(link);
    this.fetchOneMovie(this.$route.params.movieId);
  },
  computed: {
    ...mapState(useMovieStore, ["oneMovie", "qr"]),
  },
  methods: {
    ...mapActions(useMovieStore, ["fetchOneMovie", "getQrCode"]),
  },
};
</script>

<template>
  <div class="col-12 justify-content-center d-flex row">
    <div class="col-12 d-flex justify-content-around">
      <div class="">
        <img
          :src="oneMovie.imgUrl"
          alt=""
          class="img-fluid img-thumbnail"
          width="400"
          height="1000"
        />
      </div>
      <div class="d-flex flex-column">
        <img :src="qr" alt="" class="img-thumbnail" width="200" height="200" />
        <h1>{{ oneMovie.title }}</h1>
        <h5>Rating: {{ oneMovie.rating }}</h5>
        <h5>Genre: {{ oneMovie.Genre.name }}</h5>
        <span>{{ oneMovie.synopsis }}</span>
      </div>
    </div>
    <div class="col-12 row my-5 ratio-16x9">
      <iframe
        :src="oneMovie.trailerUrl"
        width="400"
        height="450"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

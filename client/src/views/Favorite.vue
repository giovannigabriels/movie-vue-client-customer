<script>
import { mapActions, mapState } from "pinia";
import { useMovieStore } from "../stores/movie";
import MovieCard from "../components/MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  created() {
    this.fetchFavorite();
  },
  computed: {
    ...mapState(useMovieStore, ["favorite"]),
  },
  methods: {
    ...mapActions(useMovieStore, ["fetchFavorite", "deleteFavorite"]),
    deleteFavoriteHandler(id, name) {
      Swal.fire({
        title: `Are you sure want to delete genre ${name}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteFavorite(id);
          this.fetchFavorite();
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Remove ${name} Success!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      //   console.log("sukses delete", id);
    },
  },
};
</script>

<template>
  <div class="container mt-3">
    <h1 class="text-center">Favorite Page</h1>
    <div class="row mt-3">
      <div
        v-for="(movie, idx) in favorite"
        :key="idx"
        class="card mx-5 my-2"
        style="width: 18rem"
      >
        <img
          :src="movie.Movie.imgUrl"
          class="card-img-top image-card my-2"
          alt="..."
        />

        <div class="card-body">
          <h5 class="card-title">{{ movie.Movie.title }}</h5>
          <p class="card-text">Rating: {{ movie.Movie.rating }}</p>
        </div>
        <button
          @click.prevent="deleteFavoriteHandler(movie.id, movie.Movie.title)"
          class="btn btn-danger mx-2 my-2"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

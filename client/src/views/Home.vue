<script>
import { mapActions, mapState } from "pinia";
import { useMovieStore } from "../stores/movie";
import MovieCard from "../components/MovieCard.vue";
import Navbar from "../components/Navbar.vue";

export default {
  data() {
    return {
      perPage: 9,
      pageNumber: 1,
    };
  },
  components: {
    MovieCard,
    Navbar,
  },
  created() {
    this.paginationMovie(this.perPage, this.pageNumber);
  },
  computed: {
    ...mapState(useMovieStore, ["movies", "rows"]),
  },
  methods: {
    ...mapActions(useMovieStore, ["fetchMovie", "paginationMovie"]),
    handlePageChange(val) {
      this.pageNumber = val;
      this.paginationMovie(this.perPage, this.pageNumber);
    },
    nextButton() {
      if (this.pageNumber !== Math.ceil(this.rows / this.perPage)) {
        this.pageNumber++;
        this.paginationMovie(this.perPage, this.pageNumber);
      }
    },
    previousButton() {
      if (this.pageNumber !== 1) {
        this.pageNumber--;
        this.paginationMovie(this.perPage, this.pageNumber);
      }
    },
  },
};
</script>

<template>
  <div class="container mt-3">
    <h1 class="text-center">Home Page</h1>
    <div class="row mt-3">
      <div>
        <div class="pagination mx-5">
          <button @click="previousButton" class="btn page-link">
            Previous
          </button>
          <span
            v-for="(item, idx) in new Array(
              Math.ceil(this.rows / this.perPage)
            )"
            :key="idx"
          >
            <button @click="handlePageChange(idx + 1)" class="btn page-link">
              {{ idx + 1 }}
            </button>
          </span>
          <button @click="nextButton" class="btn page-link">Next</button>
        </div>
      </div>
      <MovieCard v-for="(movie, idx) in movies" :key="idx" :movie="movie" />
    </div>
  </div>
</template>

<style>
.image-card {
  height: 200px;
}
</style>

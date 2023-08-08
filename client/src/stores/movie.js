import { defineStore } from "pinia";
import axios from "axios";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    urlBase: "https://movie-vue-server-production.up.railway.app",
    movies: [],
    favorite: [],
    oneMovie: { Genre: {} },
    qr: "",
    rows: "",
    totalPage: "",
  }),
  getters: {},
  actions: {
    async addFavorite(id) {
      try {
        const data = await axios({
          method: "post",
          url: `${this.urlBase}/pub/favorite/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.router.push("/favorite");
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Success add ${data.data.title} to favorite!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async fetchFavorite() {
      try {
        const data = await axios({
          method: "get",
          url: `${this.urlBase}/pub/favorite`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.favorite = data.data;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async deleteFavorite(id) {
      try {
        const data = await axios({
          method: "delete",
          url: `${this.urlBase}/pub/favorite/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchFavorite();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async fetchOneMovie(id) {
      try {
        const data = await axios({
          method: "get",
          url: `${this.urlBase}/pub/movies/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.oneMovie = data.data;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async fetchTitleMovie(title) {
      try {
        const data = await axios({
          method: "get",
          url: `${this.urlBase}/pub/movies/?title=${title}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.movies = data.data.rows;
        this.rows = data.data.count;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async getQrCode(link) {
      try {
        const data = await axios({
          method: "get",
          url: `${this.urlBase}/pub/qrcode?link=${link}`,
        });
        this.qr = data.data;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async paginationMovie(size, page) {
      try {
        const data = await axios({
          method: "get",
          url: `${this.urlBase}/pub/movies?size=${size}&page=${page}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.movies = data.data.rows;
        this.rows = data.data.count;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  },
});

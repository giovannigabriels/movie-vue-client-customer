import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    urlBase: "https://movie-vue-server-production.up.railway.app",
    id: "",
    email: "",
    username: "",
    isLogin: false,
  }),
  getters: {},
  actions: {
    async login(payload) {
      try {
        const data = await axios({
          method: "post",
          url: `${this.urlBase}/pub/login`,
          data: payload,
        });
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("id", data.data.user.id);
        localStorage.setItem("username", data.data.user.username);
        this.id = data.data.user.id;
        this.storeEmail = data.data.user.email;
        this.username = data.data.user.username;
        this.isLogin = true;
        this.router.push("/");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Success!",
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
    async register(payload) {
      try {
        await axios({
          method: "post",
          url: `${this.urlBase}/pub/register`,
          data: payload,
        });
        this.router.push("/login");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Register Success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          title: "Oops...",
          text: `${error.response.data.message[0]}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async handleCredentialResponse(response) {
      const { credential } = response;
      axios({
        method: "POST",
        url: `${this.urlBase}/pub/google-sign-in`, // Please fill with your backend url!
        headers: {
          google_token: credential,
        },
      })
        .then((data) => {
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("id", data.data.user.id);
          localStorage.setItem("username", data.data.user.username);
          this.id = data.data.user.id;
          this.storeEmail = data.data.user.email;
          this.username = data.data.user.username;
          this.isLogin = true;
          this.router.push("/");
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Login With Google Success!",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: `${error.response.data.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
  },
});

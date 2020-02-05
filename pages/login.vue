<template>
  <div class="container">
    <h1>Sign in to access the secret page</h1>
    <div>
      <label for="email">
        <input id="username" type="username" v-model="username" />
      </label>
      <label for="password">
        <input id="password" type="password" v-model="password" />
      </label>
      <button @click="postLogin">login</button>
      <p>The credentials are not verified for the example purpose.</p>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import axios from "axios";

export default {
  data: () => ({
    username: null,
    password: null
  }),
  middleware: "notAuthenticated",
  methods: {
    postLogin() {
      axios
        .post("http://localhost:3090/signin", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          const auth = {
            token: res.data.token
          };
          this.$store.commit("setAuth", auth); // mutating to store for client rendering
          Cookie.set("auth", auth); // saving token in cookie for server rendering
          this.$router.push("/");
        })
        .catch(err => console.log(err.response));
    }
  }
};
</script>

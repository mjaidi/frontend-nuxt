const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
import axios from "axios";

export default {
  login: async ({ commit }, payload) => {
    await axios
      .post(`http://localhost:3090/${payload.urlEndpoint}`, payload.formData)
      .then(res => {
        console.log(res);
        const auth = {
          token: res.data.token,
          user: res.data.user
        };
        commit("setAuth", auth); // mutating to store for client rendering
        Cookie.set("auth", auth); // saving token in cookie for server rendering
        $nuxt.$message.success("Login successfull");
        $nuxt.$router.push("/");
      })
      .catch(err => {
        console.log(err.response);
        $nuxt.$message.error("Username or password is invalid");
      });
  },
  logout: ({ commit }) => {
    Cookie.remove("auth");
    commit("setAuth", null);
    $nuxt.$router.push("/");
  },
  nuxtServerInit: ({ commit }, { req }) => {
    let auth = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        auth = JSON.parse(parsed.auth);
      } catch (err) {
        // No valid cookie found
      }
    }
    commit("setAuth", auth);
  }
};

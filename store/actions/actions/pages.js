const Cookie = require("js-cookie");
import axios from "axios";

const auth = Cookie.get("auth");
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: auth ? JSON.parse(auth).token : null
  }
};

export default {
  secret: ({ commit }) => {
    axios
      .get(`http://localhost:3090/secret`, config)
      .then(res => {
        commit("setMessage", res.data.message); // mutating to store for client rendering
      })
      .catch(err => {
        console.log(err.response);
        $nuxt.$message.error(err.response.data.message);
      });
  },
  admin: ({ commit }) => {
    axios
      .get(`http://localhost:3090/secretAdmin`, config)
      .then(res => {
        commit("setMessage", res.data.message); // mutating to store for client rendering
      })
      .catch(err => {
        console.log(err.response);
        $nuxt.$message.error(err.response.data.message);
      });
  }
};

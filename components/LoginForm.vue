<template>
  <div :class="$style.login">
    <el-card>
      <h2>Login</h2>
      <el-form
        :class="$style.login_form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input
            v-model="model.username"
            placeholder="Username"
            prefix-icon="fas fa-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="fas fa-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            :class="$style.login - button"
            type="primary"
            native-type="submit"
            block
            >Login</el-button
          >
        </el-form-item>
        <a class="forgot-password">Forgot password ?</a>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      model: {
        username: "",
        password: ""
      },

      success: false,

      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async simulateLogin() {
      await axios
        .post("http://localhost:3090/signin", {
          username: this.model.username,
          password: this.model.password
        })
        .then(res => {
          const auth = {
            token: res.data.token
          };
          this.$store.commit("setAuth", auth); // mutating to store for client rendering
          Cookie.set("auth", auth); // saving token in cookie for server rendering
          this.success = true;
          console.log(this.success);
        })
        .catch(err => console.log(err.response));
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      console.log(this.success);
      if (this.success) {
        this.$message.success("Login successfull");
        this.$router.push("/");
      } else {
        this.$message.error("Username or password is invalid");
      }
    }
  }
};
</script>

<style module lang="postcss">
.login {
  width: 500px;
  text-align: center;
}
h2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

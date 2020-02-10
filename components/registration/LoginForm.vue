<template>
  <div :class="$style.login">
    <div>
      <h3>{{ signupType === "signup" ? "Sign Up" : "Sign In" }}</h3>
      <el-form
        :class="$style.login_form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Username">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="email" v-if="signupType === 'signup'">
          <el-input v-model="model.email" placeholder="Email">
            <i slot="prefix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            :class="$style.login_btn"
            native-type="submit"
            block
            >{{ signupType === "signup" ? "Sign Up" : "Sign In" }}</el-button
          >
        </el-form-item>
        <NuxtLink to="/login" v-if="signupType === 'signup'"
          >Already a member? Sign In Now</NuxtLink
        >
        <NuxtLink to="/signup" v-if="signupType === 'signin'"
          >Not yet a member? Sign Up Now</NuxtLink
        >
        <br /><br />
        <a class="forgot-password">Forgot password ?</a>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  props: ["signupType"],
  data() {
    return {
      model: {
        username: "",
        email: "",
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
        email: [
          {
            required: true,
            message: "Email is required",
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
    async login() {
      const urlEndpoint = this.signupType === "signup" ? "signup" : "signin";
      const formData = {
        username: this.model.username,
        email: this.model.email,
        password: this.model.password
      };
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.$store.dispatch("login", { urlEndpoint, formData });
      this.loading = false;
    }
  }
};
</script>

<style module lang="postcss">
.login {
  width: 85%;
}
h3 {
  margin-bottom: 2rem;
  font-weight: 400;
  text-align: center;
}
.login_btn {
  width: 100%;
  background-color: var(--primary);
  color: white;
  &:hover {
    background-color: var(--primary);
    filter: brightness(1.3);
    color: white;
  }
}
</style>

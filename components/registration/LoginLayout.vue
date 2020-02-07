<template>
  <div :id="$style.login">
    <el-row align="middle">
      <el-col :md="15" :xs="0" v-if="signupType === 'signin'"
        ><div :class="$style.image"></div
      ></el-col>
      <el-col :md="9" :xs="24">
        <div :class="$style.head">
          <h2><NuxtLink to="/">BACK TO HOME</NuxtLink></h2>
        </div>
        <div :class="$style.login_wrapper">
          <LoginForm :signupType="signupType" />
        </div>
      </el-col>
      <el-col :md="15" :xs="0" v-if="signupType === 'signup'"
        ><div :class="$style.image"></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "./LoginForm";

export default {
  name: "LoginLayout",
  props: ["signupType"],
  components: {
    LoginForm
  }
};
</script>

<style module lang="postcss">
#login {
  background-color: var(--light);
  min-height: 100vh;
}
.head {
  margin-bottom: 2rem;
  margin-top: 5rem;
  text-align: center;
  color: var(--primary);
}
.login_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.image {
  background-image: url("https://source.unsplash.com/random");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  width: 100%;
}
</style>

<template>
  <div :id="$style.login">
    <div :class="$style.head">
      <h2 class="logo"><NuxtLink to="/">BACK TO HOME</NuxtLink></h2>
    </div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  layout: "signup",
  name: "login",
  components: {
    LoginForm
  }
};
</script>

<style module lang="postcss">
#login {
  background-color: var(--primary-light);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}
.head {
  margin-bottom: 3rem;
  margin-top: 1rem;
}
</style>

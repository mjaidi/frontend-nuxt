<template>
  <LoginLayout signupType="signin" />
</template>

<script>
import LoginLayout from "@/components/registration/LoginLayout";

export default {
  layout: "signup",
  middleware: "notAuthenticated",
  name: "login",
  components: {
    LoginLayout
  }
};
</script>

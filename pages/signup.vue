<template>
  <LoginLayout signupType="signup" />
</template>

<script>
import LoginLayout from "@/components/registration/LoginLayout";

export default {
  layout: "signup",
  middleware: "notAuthenticated",
  name: "signup",
  components: {
    LoginLayout
  }
};
</script>

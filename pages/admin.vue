<template>
  <div>
    <h1>{{ message }}</h1>
    <NuxtLink to="/">Back home</NuxtLink>
  </div>
</template>

<script>
export default {
  middleware: ["authenticated", "authorization"],
  meta: {
    roles: ["admin"]
  },
  computed: {
    message() {
      return this.$store.state.message;
    }
  },
  mounted() {
    this.$store.dispatch("admin");
  }
};
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    background-color="#185190"
    active-text-color="var(--light)"
    text-color="var(--light-inactive)"
    mode="horizontal"
    :router="true"
  >
    <div :class="$style.menu_wrapper">
      <div :class="$style.menu_content">
        <NuxtLink to="/">
          <el-menu-item index="/">Home</el-menu-item>
        </NuxtLink>
        <NuxtLink to="/secret" v-if="$store.state.auth">
          <el-menu-item index="/secret">Secret</el-menu-item>
        </NuxtLink>
        <NuxtLink
          to="/admin"
          v-if="$store.state.auth && $store.state.auth.user.role === 'admin'"
        >
          <el-menu-item index="/admin">Admin</el-menu-item>
        </NuxtLink>
      </div>
      <div :class="$style.menu_content">
        <NuxtLink to="/login" v-if="!$store.state.auth">
          <el-menu-item index="/login">Sign In</el-menu-item>
        </NuxtLink>
        <el-menu-item index="" @click="logout" v-if="$store.state.auth"
          >SignOut</el-menu-item
        >
      </div>
    </div>
  </el-menu>
</template>

<script>
export default {
  data: () => ({
    activeIndex: "/"
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  watch: {
    $route(to, from) {
      this.activeIndex = to.path;
    }
  },
  mounted() {
    this.activeIndex = this.$route.path;
  }
};
</script>

<style module lang="postcss">
.menu_wrapper {
  display: flex;
  justify-content: space-between;
}
.menu_content {
  display: inline-flex;
  font-weight: bold;
}
</style>

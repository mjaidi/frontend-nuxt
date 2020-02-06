<template>
  <el-menu
    :default-active="activeIndex"
    background-color="var(--primary)"
    active-text-color="var(--light)"
    mode="horizontal"
    :router="true"
  >
    <div :class="$style.menu_wrapper">
      <div :class="$style.menu_content">
        <NuxtLink to="/">
          <el-menu-item index="/">Home</el-menu-item>
        </NuxtLink>
        <div v-if="$store.state.auth">
          <NuxtLink to="/secret">
            <el-menu-item index="/secret">Secret</el-menu-item>
          </NuxtLink>
        </div>
      </div>
      <div :class="$style.menu_content">
        <NuxtLink to="/login">
          <el-menu-item index="/login">Sign In</el-menu-item>
        </NuxtLink>
        <el-menu-item index="" @click="logout">SignOut</el-menu-item>
      </div>
    </div>
  </el-menu>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data: () => ({
    activeIndex: "/"
  }),
  methods: {
    logout() {
      Cookie.remove("auth");
      this.$store.commit("setAuth", null);
      this.$router.push("/");
    }
  },
  watch: {
    $route(to, from) {
      this.activeIndex = to.path;
    }
  },
  mounted() {
    this.activeIndex = this.$route.path;
    console.log(this.$style);
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
}
</style>

<template>
  <div>
    <NavMenu />
    <nuxt />
  </div>
</template>

<script>
import "@/assets/globalStyle.css";
import NavMenu from "@/components/NavMenu";
export default {
  components: {
    NavMenu
  }
};
</script>

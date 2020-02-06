<template>
  <div>
    <div v-if="$store.state.auth">
      <p>
        You are authenticated. You can see the
        <NuxtLink to="/secret">secret page</NuxtLink>!
      </p>
    </div>
    <p v-else>
      Please login to continue
    </p>
  </div>
</template>

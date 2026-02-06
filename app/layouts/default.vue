<script setup lang="ts">

import Header from "~/components/base/Header.vue";
import Footer from "~/components/base/Footer.vue";
</script>

<template>
  <Header />
  <main class=" w-full " >
    <slot />
  </main>
  <Footer />
</template>

<style scoped>

</style>
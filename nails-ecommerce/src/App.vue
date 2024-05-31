<template>
  <SideNav />;
  <Header />
  <main id="main">
    <RouterView />
  </main>
</template>
<script setup>
import Header from "@/components/Header.vue";
import SideNav from "./components/SideNav.vue";
</script>

<style scoped></style>

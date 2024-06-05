<template>
  <SideNav />;
  <Header />
  <main id="main">
    <RouterView />
  </main>
  <LikedButtonMoving />
</template>
<script setup>
import Header from "@/components/Header.vue";
import SideNav from "./components/SideNav.vue";
import LikedButtonMoving from "./components/LikedButtonMoving.vue";
</script>

<style scoped></style>

<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="flex-grow-1">
      <SideNav />;
      <Header />
      <main id="main">
        <RouterView />
      </main>
      <LikedButtonMoving />
    </div>

    <Footer />
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import SideNav from "./components/SideNav.vue";
import LikedButtonMoving from "./components/LikedButtonMoving.vue";
import Footer from "./components/Footer.vue";
</script>

<style scoped></style>

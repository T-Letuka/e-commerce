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
import { provide } from "vue";
import { useAuthStore } from "./store";

// Create store instance
const authStore = useAuthStore();

// Provide likedDesigns so other components can inject it
provide("liked", authStore.likedDesigns);

// Ensure liked designs are fetched initially
if (authStore.isAuthenticated) {
  authStore.fetchLikedDesigns();
}
</script>

<style scoped></style>

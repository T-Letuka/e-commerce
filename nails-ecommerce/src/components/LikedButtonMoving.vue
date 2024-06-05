<template>
  <div class="liked-btn-loader" :class="{ active: scroll > 100 }">
    <Liked />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Liked from "@/components/Liked.vue";

const scroll = ref(0);

onMounted(() => {
  window.addEventListener("scroll", () => {
    scroll.value = window.scrollY;
  });
});
</script>
<style scoped>
.liked-btn-loader {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: #bebfc5;
  z-index: 1000;
  display: flex;
  opacity: 0;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  cursor: pointer;
  transition: 0.5s;
}
.liked-btn-loader.active {
  visibility: visible;
  opacity: 1;
}
.liked-btn-loader:hover {
  background: #ffe4e1;
}
</style>

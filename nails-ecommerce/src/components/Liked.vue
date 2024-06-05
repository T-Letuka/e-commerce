<template>
  <div class="cart">
    <RouterLink to="/liked" class="liked"
      ><i class="bi bi-balloon-heart"></i
    ></RouterLink>
    <span class="count">{{ liked.length }}</span>
  </div>
</template>
<script setup>
import { inject, ref } from "vue";

const liked = ref(inject("liked"));
</script>
<style scoped>
.count {
  font-size: 1.2rem;
  color: white;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart {
  display: flex;
  align-items: center;
  transition: 0.6s;
}
.liked {
  font-size: 40px;
  color: #ff0800;
}
</style>

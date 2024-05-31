<template>
  <div class="banner">
    <Slide v-for="item in items" :key="item.id" :item="item" />
    <BannerSwiper :items="items" :bannerChange="handleChange" />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import BannerSwiper from "./BannerSwiper.vue";
import Slide from "./Slide.vue";

const items = ref([]);

onMounted(() => {
  fetch("http://localhost:5000/items")
    .then((res) => res.json())
    .then((data) => (items.value = data))
    .catch((e) => console.log(e.message));
});

const handleChange = (id) => {
  items.value.map((item) => {
    item.active = false;
    if (item.id === id) item.active = true;
    return item;
  });
};
</script>
<style scoped>
.banner {
  position: relative;
  width: 100%;
  min-height: 90vh;
  background: var(--bgColor);
  transition: 1s;
}
@media (max-width: 768px) {
  .banner {
    min-height: 100vh;
  }
}
</style>

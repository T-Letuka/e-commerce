<template>
  <div class="popular-designs">
    <h1>Popular Designs</h1>
    <div v-if="popularDesigns.length === 0">No popular designs found.</div>
    <div class="designs-list" v-else>
      <div
        v-for="design in popularDesigns"
        :key="design.design_id"
        class="design-item"
      >
        <img :src="design.image" :alt="design.alt" />
        <h2>{{ design.name }}</h2>
        <p>Likes: {{ design.like_count }}</p>
        <RouterLink :to="`/designs/${design.design_id}`"
          >View Design</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const popularDesigns = ref([]);

const fetchPopularDesigns = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/popular");
    popularDesigns.value = response.data;
  } catch (error) {
    console.error("Error fetching popular designs:", error);
  }
};

onMounted(() => {
  fetchPopularDesigns();
});
</script>

<style scoped>
.popular-designs {
  text-align: center;
}

.designs-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.design-item {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  text-align: center;
}

.design-item img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>

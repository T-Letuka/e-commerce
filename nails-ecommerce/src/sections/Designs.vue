<template>
  <section id="designs" class="designs">
    <div class="container">
      <div class="row">
        <h4 class="section-title">Designs</h4>
      </div>
      <div class="row mt-4">
        <div
          class="col-xl-3 col-lg-4 col-md-6 mt-4"
          v-for="item in items"
          :key="item.id"
        >
          <Cards :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Cards from "@/components/Cards.vue";
import { onMounted, ref } from "vue";

const items = ref([]);

onMounted(() => {
  fetch("http://localhost:5000/items")
    .then((res) => res.json())
    .then((data) => (items.value = data))
    .catch((e) => console.log(e.message));
});
</script>
<style scoped>
.designs {
  background: #fefefa !important;
}
</style>

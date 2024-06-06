<template>
  <div class="container-sm d-flex justify-content-center align-items-center">
    <div class="main-div text-center">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search by name"
        class="form-control mb-3"
      />
      <p class="eg">EXAMPLE: DUCK</p>
      <ul v-if="filteredItems.length > 0" class="list-group">
        <li
          v-for="item in filteredItems.slice(0, 5)"
          :key="item.id"
          class="list-group-item list-group-item-action"
        >
          <RouterLink :to="`/designs/${item.id}`">{{ item.name }}</RouterLink>
        </li>
      </ul>
      <div v-else>
        <p id="no-results">No results found</p>
        <img src="/sad.jpg" alt="sad-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { items } from "/api/data.json";

const searchTerm = ref("");
const filteredItems = computed(() =>
  items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);
</script>

<style scoped>
.main-div {
  width: 100%;
  max-width: 90%;
  margin: 50px auto 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
}
.eg {
  color: blueviolet;
  font-style: italic;
  font-weight: bolder;
}
#no-results {
  color: red;
  font-size: 20px;
}
img {
  width: 20%;
  border-radius: 40%;
}
input {
  color: black;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 10px;
}

a {
  color: black;
  font-size: 18px;
  display: block;
  margin-bottom: 10px;
}

ul.list-group {
  padding: 0;
  margin: 0;
}

li.list-group-item {
  list-style: none;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .main-div {
    width: 100%;
    padding-left: 55px;
  }

  li.list-group-item {
    padding: 10px;
  }

  a {
    font-size: 16px;
  }
  img {
    width: 50%;
  }
}
</style>

<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="main-div text-center">
      <div v-if="!selectedItem">
        <input
          type="text"
          v-model="searchTerm"
          class="form-control mb-3"
          placeholder="Search by name"
        />
        <ul v-if="filteredItems.length" class="list-group">
          <li
            v-for="item in filteredItems"
            :key="item.id"
            @click="selectItem(item)"
            class="list-group-item list-group-item-action"
          >
            {{ item.name }}
          </li>
        </ul>
        <p v-else-if="searchTerm">No results found</p>
      </div>
      <div v-else>
        <button @click="selectedItem = null" class="btn btn-secondary mb-3">
          Back to Search
        </button>
        <h2>{{ selectedItem.name }}</h2>
        <p>{{ selectedItem.brief }}</p>
        <div class="row">
          <div
            v-for="design in selectedItem.designs"
            :key="design.id"
            class="col-md-4 mb-4"
          >
            <div class="card">
              <img :src="design.image" :alt="design.alt" class="card-img-top" />
              <div class="card-body">
                <p class="card-text">{{ design.alt }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import data from "/api/data.json"; // Ensure you have the correct path

const items = ref(data.items);
const searchTerm = ref("");
const selectedItem = ref(null);

const filteredItems = computed(() =>
  items.value.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

const selectItem = (item) => {
  selectedItem.value = item;
};
</script>

<style scoped>
/* Add your styles here */
.container {
  height: 80vh;
}

.main-div {
  width: 100%;
  max-width: 600px;
  margin-top: 150px;
}

.card {
  cursor: pointer;
}
</style>

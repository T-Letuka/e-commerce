<template>
  <div class="likedpaged" v-if="liked.length > 0">
    <div class="container">
      <div class="row">
        <div class="table-responsive">
          <table class="likedtable table table-borderless align-middle">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Preview</th>
                <th scope="col">Product Name</th>
                <th scope="col">Removed</th>
              </tr>
            </thead>
            <tbody>
              <LikedItem
                v-for="(item, index) in liked"
                :key="item.id"
                :item="item"
                :index="index"
                @remove="handleRemove"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="likedpage" v-else>
    <div class="container">
      <div class="row mt-5">
        <h1 class="special-title">Your Liked Designs Page is EMPTY</h1>
        <img src="/sad.jpg" alt="sad-img" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import LikedItem from "@/components/LikedItem.vue";
import { useAuthStore } from "../store";

const authStore = useAuthStore();
const liked = ref([]);

const fetchLikedDesigns = async () => {
  await authStore.fetchLikedDesigns();
  liked.value = authStore.likedDesigns;
};

const handleRemove = async (id) => {
  await authStore.likeDesign(id); // This will toggle the like status
  await fetchLikedDesigns(); // Refresh liked designs after removal
};

onMounted(async () => {
  await fetchLikedDesigns();
});
</script>
<style scoped>
.likedpaged {
  position: relative;
  margin-bottom: 40px;
  min-height: 30vh;
}
.likedtable {
  margin-top: 50px;
  color: black;
  box-shadow: 0px 0 13px rgba(223, 223, 223, 0.3);
}

.likedpage img {
  width: 30%;
  height: auto;
  margin: 0 auto;
  border-radius: 50px;
}

.likedtable thead tr {
  font-size: 1.3rem;
}
.likedtable thead tr th {
  background: transparent;
  color: black;
}
@media (max-width: 1440px) {
  .likedpaged {
    padding-left: 5%;
  }
}
</style>

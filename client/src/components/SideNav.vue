<template>
  <div class="sideBar">
    <a
      class="menu"
      :class="{ active: active }"
      @click.stop.prevent="handletoggle"
      ><i class="bi bi-arrow-through-heart"></i
    ></a>
    <ul class="soci">
      <li v-for="soci in socials" :key="soci.id">
        <a href="#"><i :class="soci.icon"></i></a>
      </li>
    </ul>
  </div>
  <MobileMenu :active="active" />
</template>
<script setup>
import MobileMenu from "@/components/MobileMenu.vue";
import { ref } from "vue";
const socials = [
  { id: 1, icon: "bi bi-pinterest" },
  { id: 2, icon: "bi bi-instagram" },
  { id: 2, icon: "bi bi-twitter-x" },
];

const active = ref(false);
const handletoggle = () => {
  active.value = !active.value;
};
</script>
<style scoped>
.sideBar {
  position: fixed;
  width: 5%;
  min-height: 100vh;
  padding: 30px;
  background: var(--third);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  transition: 1s;
  z-index: 2000;
}

.menu {
  font-size: 1.9rem;
  color: white;
  z-index: 2000;
  transition: ease 1s;
}
.menu.active {
  transform: rotateZ(180deg);
}
.soci {
  padding: 0;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}
.soci li {
  list-style: none;
}
.soci li a {
  font-size: 1.6rem;
  color: white;
}
</style>

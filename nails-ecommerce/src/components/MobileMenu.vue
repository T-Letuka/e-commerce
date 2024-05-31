<template>
  <div class="side-menu" :class="{ active: active }">
    <ul class="nav">
      <li v-for="nav in navs" :key="nav.id" class="poppins-medium">
        <RouterLink
          to="/"
          v-if="nav.name === 'Home'"
          :class="{ active: nav.active }"
          @click="handleactive(nav.id)"
          id="house"
          ><i class="bi bi-house-heart"></i
        ></RouterLink>
        <RouterLink v-else to="/" @click="handleactive(nav.id)">{{
          nav.name
        }}</RouterLink>
      </li>
      <div class="features">
        <Liked />
      </div>
    </ul>
  </div>
</template>
<script setup>
import { navigationData } from "@/data/data";
import Liked from "@/components/Liked.vue";
import { ref } from "vue";
const props = defineProps({
  active: {
    type: Boolean,
    required: true,
  },
});
const navs = ref(navigationData);

const handleactive = (id) => {
  navs.value.map((nav) => {
    nav.active = false;
    if (nav.id === id) nav.active = true;
    return nav;
  });
};
</script>
<style scoped>
.side-menu {
  position: fixed;
  width: 300px;
  left: -300px;
  height: 100%;
  padding: 30px;
  background: var(--third);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  transition: 1s;
  z-index: 1000;
}

.side-menu.active {
  left: 0;
}
.side-menu .nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
}
.side-menu .nav li {
  list-style: none;
  margin: 0 10px;
}
#house {
  font-size: 22px;
}
.poppins-medium {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
}
.side-menu .nav li a {
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.3s;
  color: white;
}
.side-menu .nav li:hover a,
.nav li a.active {
  color: var(--primary);
}
</style>

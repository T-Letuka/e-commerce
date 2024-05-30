<template>
  <header id="home">
    <RouterLink to="/" class="logo">Nails</RouterLink>
    <ul class="nav">
      <li v-for="nav in navs" :key="nav.id" class="poppins-medium">
        <RouterLink
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
    </ul>
    <div class="features">
      <Liked />
    </div>
  </header>
</template>
<script setup>
import { navigationData } from "@/data/data";
import Liked from "@/components/Liked.vue";
import { ref } from "vue";
const handleactive = (id) => {
  navs.value.map((nav) => {
    nav.active = false;
    if (nav.id === id) nav.active = true;
    return nav;
  });
};

const navs = ref(navigationData);
</script>
<style scoped>
header {
  position: relative;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 100px 30px 200px;
  z-index: 1120;
}
.logo {
  font-size: 45px;
  color: #9966cc;
  letter-spacing: 2px;
  font-weight: 800;
}
#house {
  font-size: 22px;
}

.nav {
  display: flex;
  gap: 10px;
}
.nav li {
  list-style: none;
  margin: 0 10px;
  font-size: 20px;
}
.poppins-medium {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
}
.nav li a {
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.3s;
  color: black;
}
.nav li:hover a,
.nav li a.active {
  color: var(--primary);
}
.features {
  display: flex;
  align-items: center;
  gap: 10px;
}
@media (max-width: 768px) {
  header {
    padding: 10px 50px;
  }
  .nav {
    display: none;
  }
}
</style>

<template>
  <header id="home">
    <RouterLink to="/" class="logo">Nails</RouterLink>
    <ul class="nav">
      <li v-for="nav in navs" :key="nav.id" class="poppins-medium">
        <RouterLink
          :to="nav.link"
          v-if="nav.name === 'Home'"
          :class="{ active: nav.active }"
          @click="handleactive(nav.id)"
          id="house"
          ><i class="bi bi-house-heart"></i
        ></RouterLink>
        <RouterLink v-else :to="nav.link" @click="handleactive(nav.id)">{{
          nav.name
        }}</RouterLink>
      </li>
    </ul>
    <div class="features">
      <button v-if="isAuthenticated" @click="logout" class="sign-out">
        <i class="bi bi-box-arrow-in-left" id="log-out"></i>
      </button>
      <RouterLink v-else to="/signup" class="sign-up">Sign Up</RouterLink>
      <Liked />
    </div>
  </header>
</template>
<script setup>
import { navigationData } from "@/data/data";
import Liked from "@/components/Liked.vue";
import { ref, computed } from "vue";
import { useAuthStore } from "../store";

const navs = ref(navigationData);
const handleactive = (id) => {
  navs.value.forEach((nav) => {
    nav.active = nav.id === id;
  });
};
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const logout = () => {
  authStore.logout();
};
</script>
<style scoped>
#log-out {
  font-size: 20px;
}
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
.sign-up,
.sign-out {
  background-color: var(--third);
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Poppins", sans-serif;
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
  gap: 15px;
}
.sign-up:hover,
.sign-out:hover {
  background-color: var(--primary);
}
@media (max-width: 768px) {
  header {
    padding: 10px 70px;
  }
  .nav {
    display: none;
  }
  .sign-up,
  .sign-out {
    width: 80%;
    text-align: center;
    font-size: 15px;
    white-space: nowrap;
    margin-left: 5px;
  }
}
</style>

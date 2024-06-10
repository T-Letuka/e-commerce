// store.js
// store.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    isAuthenticated.value = true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
});

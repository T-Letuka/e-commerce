import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "");
  const isAuthenticated = ref(!!token.value);
  const likedDesigns = ref([]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      token.value = response.data.token;
      localStorage.setItem("token", token.value);
      isAuthenticated.value = true;
      await fetchLikedDesigns();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    token.value = "";
    isAuthenticated.value = false;
    likedDesigns.value = [];
    localStorage.removeItem("token");
  };

  const fetchLikedDesigns = async () => {
    try {
      const response = await axios.get("http://localhost:8000/liked", {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      likedDesigns.value = response.data;
    } catch (error) {
      console.error("Failed to fetch liked designs:", error);
    }
  };

  const likeDesign = async (designId) => {
    try {
      await axios.post(
        `http://localhost:8000/designs/${designId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token.value}` },
        }
      );
      await fetchLikedDesigns();
    } catch (error) {
      console.error("Error liking design:", error);
    }
  };

  return {
    token,
    isAuthenticated,
    likedDesigns,
    login,
    logout,
    fetchLikedDesigns,
    likeDesign,
  };
});

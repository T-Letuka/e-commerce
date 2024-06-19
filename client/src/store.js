import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "");
  const isAuthenticated = ref(!!token.value);
  const likedDesigns = ref([]);

  const serverUrl = "https://e-commerce-server-tzfk.onrender.com";

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${serverUrl}/login`, {
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
      const response = await axios.get(`${serverUrl}/liked`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      likedDesigns.value = response.data;
    } catch (error) {
      console.error("Failed to fetch liked designs:", error);
    }
  };

  const likeDesign = async (designVariantId) => {
    try {
      await axios.post(
        `${serverUrl}/designs/${designVariantId}/like`,
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

  const isDesignLiked = (designVariantId) => {
    return likedDesigns.value.some((design) => design.id === designVariantId);
  };

  return {
    token,
    isAuthenticated,
    likedDesigns,
    login,
    logout,
    fetchLikedDesigns,
    likeDesign,
    isDesignLiked,
  };
});

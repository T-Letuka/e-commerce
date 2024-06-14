<template>
  <div class="profile-container">
    <header>
      <RouterLink to="/" class="logo">Nails</RouterLink>
      <button @click="logout" class="sign-out">Sign Out</button>
    </header>
    <div class="profile-details" v-if="user">
      <h2>{{ user.username }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Joined: {{ new Date(user.createdAt).toLocaleDateString() }}</p>
    </div>
    <div class="liked-designs" v-if="likedDesigns.length">
      <h3>Liked Designs</h3>
      <div class="designs-grid">
        <div
          v-for="design in likedDesigns"
          :key="design.id"
          class="design-card"
        >
          <img :src="design.imageUrl" alt="Nail Design" />
          <p>{{ design.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const user = ref(null);
const likedDesigns = ref([]);
const router = useRouter();

const fetchProfileData = async () => {
  try {
    const userResponse = await axios.get("http://localhost:8000/api/profile");
    user.value = userResponse.data;

    const designsResponse = await axios.get(
      "http://localhost:8000/api/liked-designs"
    );
    likedDesigns.value = designsResponse.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

const logout = async () => {
  try {
    await axios.post("http://localhost:8000/api/logout");
    router.push("/login");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

onMounted(() => {
  fetchProfileData();
});
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.sign-out {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Poppins", sans-serif;
}

.sign-out:hover {
  background-color: #0056b3;
}

.profile-details {
  margin-bottom: 20px;
}

.profile-details h2 {
  font-family: "Poppins", sans-serif;
  font-size: 28px;
  font-weight: bold;
}

.profile-details p {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
}

.liked-designs h3 {
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.designs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.design-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.design-card img {
  width: 100%;
  height: auto;
}

.design-card p {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  padding: 10px;
}

.design-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

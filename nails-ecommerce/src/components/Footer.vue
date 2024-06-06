<template>
  <footer class="py-4 mt-5">
    <div class="container text-center">
      <div class="mb-3">
        <ul class="soci">
          <li v-for="soci in socials" :key="soci.id">
            <a :href="soci.link" target="_blank"><i :class="soci.icon"></i></a>
          </li>
        </ul>
      </div>
      <p>© 2024 T.L<i class="bi bi-heart-fill"></i></p>
      <p class="disclaimer">All pictures are from pintrest</p>
    </div>
  </footer>
</template>
<script setup>
const socials = [
  { id: 1, icon: "bi bi-pinterest", link: "https://za.pinterest.com/" },
  { id: 2, icon: "bi bi-instagram", link: "https://www.instagram.com/" },
  { id: 2, icon: "bi bi-twitter-x", link: "/" },
];
</script>
<style scoped>
.soci {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 25px;
}
footer {
  background: #e5e5e5;
  color: black;
}
p {
  text-align: center;
}
p i {
  color: var(--primary);
}
a {
  color: black;
  cursor: pointer;
}
.disclaimer {
  font-size: 14px;
}
</style>

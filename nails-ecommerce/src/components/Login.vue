<template>
  <div class="container mt-5">
    <h2 class="special-title">Login</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label class="poppins-regular" for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label class="poppins-regular" for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary login">Login</button>
      <button type="button" class="btn btn-link link" @click="$emit('toggle')">
        OR <i class="bi bi-arrow-right"></i> Sign Up
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const submitForm = () => {
  alert("Login form submitted");
};
</script>
<script></script>
<style scoped>
label {
  font-size: 18px;
  color: black;
}
.poppins-regular {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.btns {
  display: flex;
  gap: 10px;
}
.btn {
  margin-top: 15px;
  padding: 8px 12px;
}
.login {
  background: var(--secondary);
  border: none;
  text-transform: uppercase;
}
.login:hover {
  background: var(--third);
  text-decoration: underline;
  transform: translateY(10%);
}
.link {
  color: black;
  font-size: 19px;
}
.link:hover {
  color: var(--third);
  transform: translateY(-10%);
}
i {
  font-size: 15px;
}
</style>

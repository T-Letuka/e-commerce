<template>
  <div class="container mt-5">
    <h2 class="special-title">Sign Up</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label class="poppins-regular" for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          required
        />
      </div>
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
      <div class="btns">
        <button type="submit" class="btn btn-primary sign-up">Sign Up</button>
        <button
          type="button"
          class="btn btn-link link"
          @click="$emit('toggle')"
        >
          OR <i class="bi bi-arrow-right"></i> Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import confetti from "canvas-confetti";

const username = ref("");
const email = ref("");
const password = ref("");

const submitForm = () => {
  triggerConfetti();
};

const triggerConfetti = () => {
  var heart = confetti.shapeFromPath({
    path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
    matrix: [
      0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666,
      -5.533333333333333,
    ],
  });
  confetti({
    particleCount: 100,
    shapes: [heart],
    colors: ["#f93963", "#a10864", "#ee0b93"],
  });
};
</script>
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
.sign-up {
  background: var(--secondary);
  border: none;
  text-transform: uppercase;
}
.sign-up:hover {
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

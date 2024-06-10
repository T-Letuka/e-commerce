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
        <button
          type="submit"
          class="btn btn-primary sign-up"
          :disabled="loading"
        >
          Sign Up
        </button>
        <RouterLink to="/login" class="link"
          >Already have an account? Login</RouterLink
        >
      </div>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import confetti from "canvas-confetti";
import axios from "axios";
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const router = useRouter();

const register = async () => {
  loading.value = true;
  try {
    await axios.post("http://localhost:8000/register", {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    triggerConfetti();
    router.push("/login");
    error.value = "";
  } catch (err) {
    error.value =
      "Registration failed. " + (err.response?.data?.error || err.message);
  } finally {
    loading.value = false;
  }
};

const submitForm = () => {
  register();
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
  justify-content: space-between;
  align-items: center;
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
.sign-up:disabled {
  background: grey;
  cursor: not-allowed;
}
.sign-up:hover {
  background: var(--third);
  text-decoration: underline;
  transform: translateY(10%);
}
.link {
  color: black;
  font-size: 20px;
  margin-top: 5px;
}
.link:hover {
  color: var(--third);
  transform: translateY(-10%);
}
i {
  font-size: 15px;
}
@media (max-width: 576px) {
  .form-group {
    margin-bottom: 15px;
  }
  .btns {
    flex-direction: column;
    align-items: flex-start;
  }
  .btn {
    width: 100%;
  }
  .link {
    margin-top: 10px;
    font-size: 16px;
  }
}

@media (min-width: 768px) {
  .form-group {
    margin-bottom: 20px;
  }
  .btns {
    flex-direction: row;
    align-items: center;
  }
  .btn {
    margin-top: 15px;
  }
  .link {
    margin-top: 0;
    font-size: 20px;
  }
}
</style>

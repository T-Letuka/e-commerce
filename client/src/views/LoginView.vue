<template>
  <div class="container mt-5 forms">
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
      <div class="btns">
        <button type="submit" class="btn btn-primary login" :disabled="loading">
          Login
        </button>
        <RouterLink to="/signup" class="link"
          >Don't have an account? Sign up</RouterLink
        >
      </div>
      <p v-if="error" class="poppins-extrabold">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const router = useRouter();

const login = async () => {
  loading.value = true;
  try {
    const response = await axios.post("http://localhost:8000/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token);
    router.push("/designs");
    error.value = "";
  } catch (err) {
    error.value = "Login failed. " + (err.response?.data?.error || err.message);
  } finally {
    loading.value = false;
  }
};

const submitForm = () => {
  login();
};
</script>

<style scoped>
.forms {
  width: 50%;
  margin: 0 auto;
}
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
.poppins-extrabold {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-style: normal;
}
p {
  margin-top: 10px;
  color: red;
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

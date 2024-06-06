<template>
  <div class="forms">
    <sign-up v-if="showSignUp" @toggle="toggleForms"></sign-up>
    <login v-else @toggle="toggleForms"></login>
  </div>
</template>
<script setup>
import { ref } from "vue";
import SignUp from "@/components/Signup.vue";
import Login from "@/components/Login.vue";

const showSignUp = ref(true);

const toggleForms = () => {
  showSignUp.value = !showSignUp.value;
};
</script>
<style scoped>
.forms {
  width: 50%;
  margin: 0 auto;
}
</style>

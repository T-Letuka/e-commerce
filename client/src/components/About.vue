<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <p class="lead animated fadeIn delay-1s poppins-semibold">
          Welcome to Nail Designs, the ultimate destination for nail art
          enthusiasts! Our website is dedicated to showcasing a wide variety of
          stunning nail designs categorized for your convenience. Whether you're
          looking for inspiration for your next manicure or simply enjoy
          browsing through beautiful nail art, you've come to the right place.
          Dive into our extensive collection and discover the perfect design to
          match your style.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.fadeIn {
  animation-name: fadeIn;
}
p {
  font-size: 18px;
  text-align: center;
}
.poppins-semibold {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
}

.delay-1s {
  animation-delay: 1s;
}
@media (max-width: 576px) {
  p {
    font-size: 14px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  p {
    font-size: 16px;
  }
}

@media (min-width: 769px) {
  p {
    font-size: 18px;
  }
}
</style>

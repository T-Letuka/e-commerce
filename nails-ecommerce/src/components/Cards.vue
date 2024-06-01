<template>
  <div class="card">
    <div class="card-bg" :style="{ background: item.bgColor }"></div>
    <div class="imgBox">
      <img :src="item.imgUrl" alt="designs" />
    </div>
    <div class="contentBox">
      <h2>{{ item.name }}</h2>
      <RouterLink :to="`/designs/${item.id}`">
        See More <i class="bi bi-box-arrow-right"></i>
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.card .contentBox {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 100px;
  text-align: center;
  transition: 1s;
  z-index: 10;
}
.card:hover .contentBox {
  height: 210px;
}
.card .imgBox img {
  position: absolute;
  width: 270px;
  top: 10%;
  left: 10%;
  transform: rotateY(180deg);
  border-radius: 15px;
}
.card .contentBox h2 {
  position: relative;
  font-weight: 600;
  font-size: 2remrem;
  color: black;
  letter-spacing: 1px;
}
.card:hover .contentBox h2 {
  color: white;
}
.card .contentBox a {
  display: inline-block;
  text-decoration: none;
  padding: 10px 20px;
  background: white;
  border-radius: 4px;
  margin-top: 10px;
  font-weight: 600;
  opacity: 0;
  transform: translateY(50px);
  transition: 0.5s;
  margin-right: 10px;
  color: black;
}
.card:hover .contentBox a {
  opacity: 1;
  transform: translateY(0px);
  transition-delay: 0.2s;
}
.card {
  box-shadow: 10px 0 15px rgba(250, 1, 208, 0.2);
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  min-height: 420px;
  background: #353434ee;
  border: none;
}
.card-bg {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--third);

  transition: ease-in-out 0.5s;
}
.card:hover .card-bg {
  clip-path: circle(300px at 80% -20%);
}
.card:hover .imgBox {
  top: -15%;
}
.card .imgBox {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 220px;
  transition: 0.5s;
}
.card::after {
  content: "Nails";
  position: absolute;
  top: 40%;
  left: -20%;
  font-size: 12em;
  font-weight: 800;
  font-style: italic;
  color: rgba(225, 225, 225, 0.04);
}
</style>

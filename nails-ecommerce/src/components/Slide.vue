<template>
  <div class="banner-slide" :class="{ active: item.active }">
    <div class="content">
      <h1>{{ item.name }}</h1>
      <p>{{ item.brief.slice(0, 140) }}</p>
      <div class="designs">
        <RouterLink to="`/designs/${item.id}`" class="liked">
          See Design
        </RouterLink>
      </div>
    </div>
    <div class="item-img">
      <div
        class="img-container"
        :class="{ active: item.active }"
        :style="{ background: item.bgColor }"
      >
        <img :src="item.imgUrl" alt="hero-img" />
      </div>
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
img {
  width: 550px;
  border-radius: 5%;
}
.banner-slide {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 90%;
  display: flex;
  transition: 1s;
  opacity: 0;
  visibility: hidden;
  transform: scale(0);
}
.banner-slide.active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}
.content {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px 0 200px;
}
.content h1 {
  color: var(--secondary);
  font-size: 5rem;
}
.content p {
  color: black;
  font-size: 1.4rem;
  margin-bottom: 50px;
  font-weight: 400;
}
.item-img {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content .designs .liked {
  color: white;
  background: black;
  padding: 20px 40px;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer !important;
}
.item-img .img-container {
  position: relative;
  width: 600px;
  height: 600px;
  border-radius: 10%;
  background-color: var(--primary);
  transform: rotateZ(180deg);
  transition: ease-in-out 1s;
}
.item-img .img-container.active {
  transform: rotateZ(0);
}

@media (max-width: 1440px) {
  .content {
    padding-bottom: 100px;
  }

  .content h1 {
    font-size: 3.5rem;
  }
  .content p {
    font-size: 0.8rem;
    margin-bottom: 20px;
  }
  .item-img .img-container {
    width: 400px;
    height: 400px;
  }
  .content .design .liked {
    font-size: 1rem;
    padding: 10px 20px;
  }
}

@media (max-width: 768px) {
  .banner-slide {
    flex-direction: column-reverse;
  }
  .content {
    width: 100%;
    height: 50%;
    padding: 20px 20px 0 100px;
    justify-content: start;
  }
  .content h1 {
    font-size: 2rem;
  }
  .content p {
    margin-bottom: 20px;
    font-size: 1rem;
  }

  .item-img {
    width: 100%;
    height: 50%;
    padding: 20px 20px 0 100px;
  }
  .item-img .img-container {
    width: 200px;
    height: 200px;
  }
  .item-img .img-container::before {
    width: 300px;
    height: 300px;
  }
  .item-img .img-container img {
    width: 200px;
    height: 300px;
  }
}
</style>

<template>
  <div class="container">
    <div class="row">
      <!-- Column 1: Big Picture -->
      <div class="col-12 col-md-8">
        <div class="main-image">
          <img :src="mainImage.src" :alt="mainImage.alt" />
        </div>
      </div>
      <!-- Column 2: Slider -->
      <div class="col-12 col-md-4">
        <swiper
          ref="swiperRef"
          :slides-per-view="3"
          loop
          autoplay="true"
          space-between="10"
          @slideChange="onSlideChange"
        >
          <swiper-slide
            v-for="(design, index) in designs"
            :key="index"
            @click="updateMainImage(design)"
          >
            <img :src="design.src" :alt="design.alt" class="thumb-image" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const designs = ref([]);
const mainImage = ref({ src: "", alt: "" });

const updateMainImage = (design) => {
  mainImage.value = { src: design.src, alt: design.alt };
};

const onSlideChange = () => {
  // You can add additional logic for slide change if needed
};

onMounted(async () => {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    designs.value = data;
    if (data.length > 0) {
      mainImage.value = { src: data[0].src, alt: data[0].alt };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
.container {
  padding: 20px;
}
.main-image img {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 20px;
}
.thumb-image {
  width: 100%;
  height: auto;
  cursor: pointer;
}
</style>

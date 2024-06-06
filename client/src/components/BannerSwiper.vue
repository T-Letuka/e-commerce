<template>
  <div class="banner-swiper">
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="item in items.slice(0, 5)" :key="item.id">
        <img :src="item.imgUrl" alt="imgaes" @click="bannerChange(item.id)" />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "swiper/css";

const components = {
  Swiper,
  SwiperSlide,
};
const modules = [Navigation];
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  bannerChange: {
    type: Function,
    required: true,
  },
});
</script>
<style>
.banner-swiper .mySwiper {
  position: absolute;
  width: 30%;
  bottom: 50px;
  left: 10%;
  padding-bottom: 50px;
  padding-top: 10px;
}
.banner-swiper .swiper-slide {
  background-position: center;
  background-size: cover;
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.banner-swiper .swiper .swiper-button-prev {
  position: absolute;
  left: 0;
  top: 50%;
  width: 54px;
  height: 54px;
}
.banner-swiper .swiper .swiper-button-next {
  position: absolute;
  right: 0;
  top: 50%;
  width: 54px;
  height: 54px;
}
.banner-swiper .swiper .swiper-button-next::after,
.banner-swiper .swiper .swiper-button-prev::after {
  font-size: 30px;
  line-height: 0;
  width: 54px;
  height: 54px;
  background: transparent;
  border-radius: 50%;
  transition: 0.3s;
  color: rgb(247, 9, 9);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}
.banner-swiper .swiper .swiper-button-next::hover,
.banner-swiper .swiper .swiper-button-prev::hover {
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2) !important;
  color: rgba(252, 10, 10, 0.8) !important;
}
.swiper-slide img {
  display: block;
  width: 100%;
}
@media (max-width: 1440px) {
  .swiper {
    width: 25%;
    left: 15%;
  }
  .swiper-slide {
    width: 120px;
    height: 120px;
  }
  .swiper .swiper-button-prev,
  .swiper .swiper-button-next {
    width: 60px;
    height: 60px;
  }
}
@media (max-width: 768px) {
  .swiper {
    width: 90%;
    left: 5%;
    bottom: 20px;
    padding-bottom: 20px;
    padding-top: 5px;
  }
  .swiper-slide {
    width: 80px;
    height: 80px;
  }
  .swiper .swiper-button-prev,
  .swiper .swiper-button-next {
    width: 40px;
    height: 40px;
  }
}
</style>

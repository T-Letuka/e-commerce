<template>
  <div class="container">
    <div class="row">
      <!-- Column 1: Big Picture -->
      <div class="col-md-6 column">
        <h2>Column 1 -- {{ id }}</h2>
        <p>This is the first column.</p>
        <img :src="mainImage.src" :alt="mainImage.alt" />
        <div class="nail-techs">
          <button>VIEW NAIL-TECHS</button>
          <button>Back</button>
        </div>
      </div>
      <!-- Column 2: Slider -->
      <div class="col-md-6 column">
        <h2>Column 2</h2>
        <p>This is the second column.</p>
        <p>{{ items.brief }}</p>
        <div>
          <swiper
            ref="swiperRef"
            :slides-per-view="3"
            loop
            space-between="10"
            :navigation="true"
            :modules="modules"
            @slideChange="onSlideChange"
            @click="handleSelectedDesign(designs.designs, designs.id)"
          >
            <swiper-slide
              v-for="(design, index) in items.designs"
              :key="design.id"
              @click="updateMainImage(design)"
            >
              <img
                :src="design.image"
                :alt="'Design ' + design.id"
                class="thumb-image"
              />
            </swiper-slide>
          </swiper>
        </div>
        <div class="b">
          <a href="#" class="addButton me-3"> Add to Liked </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

const modules = [Navigation];
const route = useRoute();
const id = route.params.id;

const items = ref({});
const mainImage = ref({ src: "", alt: "" });

const updateMainImage = (design) => {
  mainImage.value = { src: design.image, alt: "Design " + design.id };
};

const onSlideChange = () => {
  // You can add additional logic for slide change if needed
};

onMounted(() => {
  fetch(`http://localhost:5000/items/${id}`)
    .then((res) => res.json())
    .then((data) => {
      items.value = data;
      if (data.designs && data.designs.length > 0) {
        mainImage.value = {
          src: data.designs[0].image,
          alt: "Design " + data.designs[0].id,
        };
      }
    })
    .catch((e) => console.log(e.message));
});
const selectedDesign = ref("/placeholder.png");
const handleSelectedDesign = (design, id) => {
  selectedDesign.value = design;
  items.value.designs,
    map((designs) => {
      designs.active = false;
      if (designs.id === id) designs.active;
      return designs;
    });
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.column img {
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

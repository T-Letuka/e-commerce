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
        <p>{{ selectedItem.brief }}</p>
        <div>
          <swiper
            ref="swiperRef"
            :slides-per-view="3"
            loop
            space-between="10"
            :navigation="true"
            :modules="modules"
            @slideChange="onSlideChange"
          >
            <swiper-slide
              v-for="(design, index) in selectedItem.designs"
              :key="design.id"
              @click="updateMainImage(design)"
            >
              <img
                :src="design.image"
                :alt="'Design ' + design.id"
                class="thumb-image"
              />
              <button class="like-button" @click="handleLikedItems(design)">
                Like
              </button>
            </swiper-slide>
          </swiper>
        </div>
        <div class="b">
          <a
            href="#"
            class="addButton me-3"
            @click.stop.prevent="handleLikedItems(selectedItem)"
          >
            Add to Liked
          </a>
          <RouterLink to="/liked">Go to liked</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { inject, onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import data from "/api/data.json"; // Ensure the correct path to your data.json file

const items = ref(data.items);

const modules = [Navigation];
const route = useRoute();
const id = parseInt(route.params.id);

const mainImage = ref({ src: "", alt: "" });
const selectedItem = ref(items.value.find((item) => item.id === id) || {});

const updateMainImage = (design) => {
  mainImage.value = { src: design.image, alt: "Design " + design.id };
};

const onSlideChange = () => {
  // You can add additional logic for slide change if needed
};

onMounted(() => {
  if (selectedItem.value.designs && selectedItem.value.designs.length > 0) {
    mainImage.value = {
      src: selectedItem.value.designs[0].image,
      alt: "Design " + selectedItem.value.designs[0].id,
    };
  }
});

const selectedDesign = ref("/placeholder.png");
const handleSelectedDesign = (design, id) => {
  selectedDesign.value = design;
  selectedItem.value.designs = selectedItem.value.designs.map((d) => {
    d.active = d.id === id;
    return d;
  });
};

const liked = ref(inject("liked"));

const handleLikedItems = (design) => {
  if (liked.value.some((likedDesign) => likedDesign.id === design.id)) {
    return;
  }
  liked.value.push({ ...design, name: selectedItem.value.name });
  console.log(liked.value);
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
.like-button {
  display: block;
  margin-top: 10px;
  cursor: pointer;
}
</style>

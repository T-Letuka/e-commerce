<template>
  <div class="container">
    <div class="row">
      <!-- Column 1: Big Picture -->
      <div class="col-md-6 column">
        <h1 class="special-title">{{ item.name }}</h1>
        <p>{{ item.brief }}</p>
        <img :src="mainImage.src" :alt="mainImage.alt" />
        <div class="buttons">
          <button class="btn-back">
            Back <i class="bi bi-skip-backward"></i>
          </button>
          <button class="nail-techs">Nail Techs</button>
          <button class="likeds">
            <RouterLink to="/liked">Go to liked</RouterLink>
          </button>
        </div>
      </div>
      <!-- Column 2: Slider -->
      <div class="col-md-6 column second">
        <h2 class="special-title">Preview Slides</h2>

        <div class="DESIGNS">
          <swiper
            ref="swiperRef"
            :slides-per-view="3"
            space-between="10"
            :navigation="true"
            :modules="modules"
            @slideChange="onSlideChange"
            class="designswiper"
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
              <button
                class="like-button"
                @click="handleLikedItems(design)"
                :class="{ 'like-button': true, liked: isLiked(design) }"
              >
                <i class="bi bi-emoji-heart-eyes"></i>
              </button>
            </swiper-slide>
          </swiper>
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
import data from "/api/data.json";

const items = ref(data.items);

const modules = [Navigation];
const route = useRoute();
const id = parseInt(route.params.id);

const mainImage = ref({ src: "", alt: "" });
const selectedItem = ref(items.value.find((item) => item.id === id) || {});

const updateMainImage = (design) => {
  mainImage.value = { src: design.image, alt: "Design " + design.id };
};

const onSlideChange = () => {};

const item = ref({});

onMounted(() => {
  const fetchedItem = data.items.find((item) => item.id === parseInt(id));
  if (fetchedItem) {
    item.value = fetchedItem;
    if (fetchedItem.designs && fetchedItem.designs.length > 0) {
      mainImage.value = {
        src: fetchedItem.designs[0].image,
        alt: "Design " + fetchedItem.designs[0].id,
      };
    }
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
const isLiked = (design) => {
  return liked.value.some((likedDesign) => likedDesign.id === design.id);
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.btn-back {
  padding: 5px;
  background: black;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  font-size: 17px;
}
.nail-techs {
  padding: 5px;
  background: black;
  color: white;

  gap: 5px;

  font-size: 17px;
}
.likeds {
  padding: 5px;
  background: black;
  color: white;

  font-size: 17px;
}
a {
  color: white;
}
.column img {
  width: 75%;
  height: auto;
  display: block;
  margin-bottom: 10px;
  border-radius: 20px;
  align-items: center;
}
.second {
  margin-top: 100px;
}

.like-button.liked {
  color: #ff0800;
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
  margin: 0 auto;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 30px;
}
.buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.designswiper {
  position: absolute;
  width: 50%;
  bottom: 50px;
  right: 5%;
  padding-bottom: 50px;
  padding-top: 10px;
}
</style>

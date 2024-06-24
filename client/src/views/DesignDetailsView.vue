<template>
  <div v-if="selectedItem" class="container">
    <div class="row">
      <!-- Column 1: Big Picture -->
      <div class="col-md-6 column">
        <h1 class="special-title">{{ selectedItem.name }}</h1>
        <p>{{ selectedItem.brief }}</p>
        <img :src="mainImage.src" :alt="mainImage.alt" />
        <div class="buttons">
          <RouterLink to="/designs">
            <button class="btn-back">
              Back <i class="bi bi-skip-backward"></i>
            </button>
          </RouterLink>

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
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import data from "/api/data.json";
import { useAuthStore } from "../store";

const authStore = useAuthStore();
const items = ref(data.items);
const modules = [Navigation];
const route = useRoute();
const id = parseInt(route.params.id);

const mainImage = ref({ src: "", alt: "" });
const selectedItem = ref(null);

const updateMainImage = (design) => {
  mainImage.value = { src: design.image, alt: "Design " + design.id };
};

const onSlideChange = () => {};

onMounted(() => {
  const fetchedItem = items.value.find((item) => item.id === id) || null;
  if (fetchedItem) {
    selectedItem.value = fetchedItem;

    if (fetchedItem.designs && fetchedItem.designs.length > 0) {
      mainImage.value = {
        src: fetchedItem.designs[0].image,
        alt: "Design " + fetchedItem.designs[0].id,
      };
    }
  }

  if (authStore.isAuthenticated) {
    authStore.fetchLikedDesigns();
  }
});

const handleLikedItems = async (design) => {
  try {
    await authStore.likeDesign(design.id);
  } catch (error) {
    console.error("Error liking design:", error);
  }
};

const isLiked = (design) => {
  return authStore.isDesignLiked(design.id);
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
  width: 80%;
  margin-top: 50px;
  right: -35%;
  padding-bottom: 50px;
  padding-top: 10px;
}

@media (max-width: 767px) {
  h2 {
    margin-top: 30px;
  }
  .column {
    text-align: center;
    padding-left: 50px;
  }
  .column img {
    width: 100%;
  }
  .buttons {
    gap: 10px;
  }
  .second {
    margin-top: 50px;
  }
  p {
    padding-left: 50px;
  }
  .designswiper {
    position: relative;
    width: 100%;
    margin: 15px auto;
    height: 50vh;
    right: -10%;
  }
}
</style>

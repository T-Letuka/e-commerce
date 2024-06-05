import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DesignDetailsView from "../views/DesignDetailsView.vue";
import likedView from "../views/LikedView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/designs/:id",
      name: "designs",
      component: DesignDetailsView,
    },
    {
      path: "/liked",
      name: "liked",
      component: likedView,
    },
  ],
});

export default router;

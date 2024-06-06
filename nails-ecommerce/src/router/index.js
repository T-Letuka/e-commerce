import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DesignPreview from "../views/DesignDetailsView.vue";
import likedView from "../views/LikedView.vue";
import designsView from "../views/DesignsView.vue";
import nailtechsView from "../views/NailTechView.vue";
import popularView from "../views/PopularView.vue";

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
      name: "DesignPreview",
      component: DesignPreview,
      props: true,
    },
    {
      path: "/liked",
      name: "liked",
      component: likedView,
    },
    {
      path: "/designs",
      name: "designs",
      component: designsView,
    },
    {
      path: "/popular",
      name: "popular",
      component: popularView,
    },
    {
      path: "/nail-techs",
      name: "nail-techs",
      component: nailtechsView,
    },
  ],
});

export default router;

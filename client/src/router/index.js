import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store";
import HomeView from "../views/HomeView.vue";
import DesignPreview from "../views/DesignDetailsView.vue";
import likedView from "../views/LikedView.vue";
import designsView from "../views/DesignsView.vue";
import nailtechsView from "../views/NailTechView.vue";
import popularView from "../views/PopularView.vue";
import SignupView from "../views/SignupView.vue";
import loginView from "../views/LoginView.vue";

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
      meta: { requiresAuth: true },
    },
    {
      path: "/liked",
      name: "liked",
      component: likedView,
      meta: { requiresAuth: true },
    },
    {
      path: "/designs",
      name: "designs",
      component: designsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/popular",
      name: "popular",
      component: popularView,
      meta: { requiresAuth: true },
    },
    {
      path: "/nail-techs",
      name: "nail-techs",
      component: nailtechsView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/login",
      name: "login",
      component: loginView,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import login from "../views/loginUser.vue";
import { authAmplify } from "@/stores/auth";

const routes = [
  {
    path: "/loginUser",
    name: "login",
    component: login,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = authAmplify();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.isAuthenticated) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

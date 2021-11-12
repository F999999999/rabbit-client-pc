import { createRouter, createWebHashHistory } from "vue-router";

const HomePage = () => import("@/views/Home.vue");
import Login from "@/views/Login.vue";
import TopCategoryPage from "@/views/category/TopCategoryPage";
import SubCategoryPage from "@/views/category/SubCategoryPage";

const routes = [
  // 首页
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  // 登录
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // 分类
  {
    path: "/category/:id",
    component: TopCategoryPage,
  },
  // 二级分类
  {
    path: "/category/sub/:id",
    name: "",
    component: SubCategoryPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

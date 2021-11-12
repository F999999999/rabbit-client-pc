import { createRouter, createWebHashHistory } from "vue-router";

const HomePage = () => import("@/views/Home");
import Login from "@/views/Login";
import TopCategoryPage from "@/views/Category/TopCategoryPage";
import SubCategoryPage from "@/views/Category/SubCategoryPage";

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

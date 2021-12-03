import { createRouter, createWebHashHistory } from "vue-router";

const HomePage = () => import("@/views/Home");
const LoginPage = () => import("@/views/Login/LoginPage");
const TopCategoryPage = () => import("@/views/Category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/Category/SubCategoryPage");
const GoodsDetailPage = () => import("@/views/Goods/GoodsDetailPage");

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
    component: LoginPage,
  },
  // 分类
  {
    path: "/category/:id",
    name: "Category",
    component: TopCategoryPage,
  },
  // 二级分类
  {
    path: "/category/sub/:id",
    name: "SubCategory",
    component: SubCategoryPage,
  },
  // 商品详情
  {
    path: "/goods/:id",
    name: "Goods",
    component: GoodsDetailPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

export default router;

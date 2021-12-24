import { createRouter, createWebHashHistory } from "vue-router";
import authGuard from "@/router/authGuard";

const HomePage = () => import("@/views/Home");
const LoginPage = () => import("@/views/Login/LoginPage");
const TopCategoryPage = () => import("@/views/Category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/Category/SubCategoryPage");
const GoodsDetailPage = () => import("@/views/Goods/GoodsDetailPage");
const LoginCallbackPage = () => import("@/views/Login/LoginCallbackPage");
const CartPage = () => import("@/views/Cart/CartPage");
const CheckoutPage = () => import("@/views/Pay/CheckoutPage");
const PayPage = () => import("@/views/Pay/PayPage");
const PayResultPage = () => import("@/views/Pay/PayResultPage");
const MemberHomePage = () => import("@/views/Member/MemberHomePage");
const OrderView = () => import("@/views/Member/OrderView");
const OrderListPage = () => import("@/views/Member/OrderListPage");
const OrderDetailPage = () => import("@/views/Member/OrderDetailPage");

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
  // 登录回调
  {
    path: "/login/callback",
    name: "LoginCallback",
    component: LoginCallbackPage,
  },
  // 购物车
  {
    path: "/cart",
    name: "CartPage",
    component: CartPage,
  },
  // 结算
  {
    path: "/checkout/order",
    component: CheckoutPage,
  },
  // 支付
  {
    path: "/checkout/pay",
    component: PayPage,
  },
  // 支付成功回调页面
  {
    path: "/pay/callback",
    component: PayResultPage,
  },
  // 个人中心
  {
    path: "/member/home",
    component: MemberHomePage,
  },
  // 订单列表
  {
    path: "/member/order",
    component: OrderView,
    children: [
      // 订单列表
      {
        path: "",
        component: OrderListPage,
      },
      // 订单详情
      {
        path: ":id",
        component: OrderDetailPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

// 路由前置拦截器
router.beforeEach(authGuard);

export default router;

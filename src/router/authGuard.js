import store from "@/store";

const authGuard = (to, from, next) => {
  // 需要登录的路由地址
  const requiredLogin = ["checkout", "member"];
  // 匹配用户访问的路由地址并判断是否需要登录
  if (requiredLogin.includes(to.path.split("/")[1])) {
    // 需要登录
    // 判断用户是否登录
    if (!store.state.user.profile.token) {
      // 未登录 跳转到登录页面
      next({ path: "/login", query: { redirectURL: to.fullPath } });
    } else {
      // 已登录 直接放行
      next();
    }
  } else {
    // 不需要登录 直接放行
    next();
  }
};

export default authGuard;

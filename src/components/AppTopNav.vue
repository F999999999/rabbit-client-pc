<template>
  <nav class="app-top-nav">
    <div class="container">
      <ul>
        <template v-if="user.profile.token">
          <li>
            <RouterLink to="/member/home">
              <i class="iconfont icon-user"></i>{{ user.profile.account }}
            </RouterLink>
          </li>
          <li><a href="javascript:" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <RouterLink to="/login">请先登录</RouterLink>
          </li>
          <li><a href="javascript:">免费注册</a></li>
        </template>
        <li>
          <RouterLink to="/member/order">我的订单</RouterLink>
        </li>
        <li><a href="javascript:">会员中心</a></li>
        <li><a href="javascript:">帮助中心</a></li>
        <li><a href="javascript:">关于我们</a></li>
        <li>
          <a href="javascript:"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "AppTopNav",
  setup() {
    // 获取 store 数据
    const store = useStore();
    // 获取 router 信息
    const router = useRouter();
    // 用户数据
    const user = store.state.user;

    // 退出登录
    const logout = () => {
      // 清除 store 中的 用户信息 数据
      store.commit("user/setProfile", {});
      // 清除 store 中的 购物车商品列表 数据
      store.commit("cart/setCart", []);
      // 跳转到登录页面
      router.push("/login");
    };

    return { user, logout };
  },
};
</script>

<style scoped lang="less">
.app-top-nav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>

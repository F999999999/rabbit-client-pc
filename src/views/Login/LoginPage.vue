<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a
          href="javascript:"
          :class="{ active: activeLogin === 'account' }"
          @click="activeLogin = 'account'"
          >账户登录</a
        >
        <a
          href="javascript:"
          :class="{ active: activeLogin === 'qrcode' }"
          @click="activeLogin = 'qrcode'"
          >扫码登录</a
        >
      </nav>
      <!-- 账号登录表单组件 -->
      <div class="account-box" v-if="activeLogin === 'account'">
        此处即将放置账号登录表单组件
      </div>
      <!-- 二维码登录 -->
      <div class="qrcode-box" v-if="activeLogin === 'qrcode'">
        <img src="@/assets/images/qrcode.jpg" alt="" />
        <p>打开 <a href="javascript:">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>
<script>
import LoginHeader from "@/views/Login/components/LoginHeader";
import LoginFooter from "@/views/Login/components/LoginFooter";
import { ref } from "vue";

export default {
  name: "LoginPage",
  components: { LoginFooter, LoginHeader },
  setup() {
    const activeLogin = ref("account");

    return { activeLogin };
  },
};
</script>
<style scoped lang="less">
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    .qrcode-box {
      text-align: center;
      padding-top: 40px;

      p {
        margin-top: 20px;

        a {
          color: @xtxColor;
          font-size: 16px;
        }
      }
    }

    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;

        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }

        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

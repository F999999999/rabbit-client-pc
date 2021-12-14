<template>
  <LoginHeader>联合登录</LoginHeader>
  <!-- 加载提示 -->
  <section class="container" v-if="loading">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-if="!loading && !isBind">
    <nav class="tab">
      <a @click="hasAccount = true" :class="{ active: hasAccount }">
        <i class="iconfont icon-bind"></i>
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount = false" :class="{ active: !hasAccount }">
        <i class="iconfont icon-edit"></i>
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <LoginCallbackBindPhone :unionId="unionId" />
    </div>
    <div class="tab-content" v-if="!hasAccount">
      <LoginCallbackBindPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from "@/views/Login/components/LoginHeader";
import LoginFooter from "@/views/Login/components/LoginFooter";
import LoginCallbackBindPhone from "@/views/Login/components/LoginCallbackBindPhone";
import LoginCallbackBindPatch from "@/views/Login/components/LoginCallbackBindPatch";
import { ref } from "vue";
import { findAccountByQQOpenid } from "@/api/user";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackPage",
  components: {
    LoginCallbackBindPatch,
    LoginCallbackBindPhone,
    LoginFooter,
    LoginHeader,
  },
  setup() {
    // 是否在绑定手机号码状态
    const hasAccount = ref(true);
    // 该用户是否已经使用 QQ 绑定账号
    const isBind = ref(false);
    // 是否显示 Loading 状态
    const loading = ref(true);
    // QQ用户唯一标识（openid）
    const unionId = ref(null);
    // 登录成功后执行的回调函数
    const { loginSuccessful } = useLoginAfter();

    // 检测地址栏中是否存在 access_token
    if (window.QC.Login.check()) {
      // 显示 Loading 状态
      loading.value = true;
      // 获取地址栏中的 access_token 值并向QQ互联服务器发送请求使用 access_token 获取用户的唯一标识 openid
      // https://graph.qq.com/oauth2.0/me?access_token=B204C56879FC0C2818AF844746BD6959
      window.QC.Login.getMe((openid) => {
        // 存储 QQ 用户唯一标识
        unionId.value = openid;
        // 查找QQ绑定的账号
        findAccountByQQOpenid({ unionId: openid })
          // 查找到账号
          .then((res) => {
            // 执行登录回调函数
            loginSuccessful(res);
            // 该用户已使用 QQ 绑定账号
            isBind.value = true;
            // 隐藏 Loading 状态
            loading.value = false;
          })
          // 没有查找到账号
          .catch(() => {
            // 该用户没有使用 QQ 绑定账号
            isBind.value = false;
            // 隐藏 Loading 状态
            loading.value = false;
          });
      });
    }

    return { hasAccount, unionId, isBind, loading };
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;

  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;

    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>

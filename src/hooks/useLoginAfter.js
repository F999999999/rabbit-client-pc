import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Message from "@/components/library/Message";

const useLoginAfter = () => {
  // 获取 store 数据
  const store = useStore();
  // 获取 router 信息
  const router = useRouter();
  // 登录成功
  const loginSuccessful = async ({ result }) => {
    // 存储用户信息
    store.commit("user/setProfile", {
      // 用户id
      id: result.id,
      // 用户头像
      avatar: result.avatar,
      // 用户昵称
      nickname: result.nickname,
      // 用户账号
      account: result.account,
      // 用户手机号
      mobile: result.mobile,
      // 用户登录凭证
      token: result.token,
    });

    // 跳转到首页
    router.push("/").then(() => {
      // 消息提示
      Message({ type: "success", text: "登录成功" });
    });

    // 合并购物车
    await store.dispatch("cart/mergeCart");
    // 将服务器端购物车数据同步到本地
    await store.dispatch("cart/updateCartList");
  };

  // 登录失败
  const loginFailed = (err) => {
    // 信息提示
    Message({ type: "error", text: err.message });
  };

  return { loginSuccessful, loginFailed };
};

export default useLoginAfter;

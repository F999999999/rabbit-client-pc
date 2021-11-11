<template>
  <div class="home">
    {{ $store.state.user.profile }}
    <button
      @click="
        $store.commit('user/setProfile', {
          name: '张三',
          token: new Date().getTime(),
        })
      "
    >
      button
    </button>
    <br />
    <button @click="onCilckHandle">发送请求</button>
    <button @click="onCilckHandleOut">发送OutToken请求</button>
  </div>
</template>

<script>
import { requestWithToken, requestWithOutToken } from "@/utils/request";

export default {
  name: "Home",
  setup() {
    console.log("Home");

    const onCilckHandle = () => {
      requestWithOutToken("/member/order", "get", {
        page: 1,
        pageSize: 10,
      }).then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log("error", error);
        }
      );
    };

    const onCilckHandleOut = () => {
      requestWithToken("/home/banner", "get", {
        distributionSite: 1,
      }).then(
        (res) => {
          console.log("res", res);
        },
        (error) => {
          console.log("error", error);
        }
      );
    };

    return { onCilckHandle, onCilckHandleOut };
  },
};
</script>

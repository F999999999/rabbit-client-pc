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
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>

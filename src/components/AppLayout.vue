<template>
  <AppTopNav />
  <AppHeader />
  <AppHeaderSticky />
  <AppFooter />
</template>

<script>
import AppTopNav from "@/components/AppTopNav.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppHeaderSticky from "@/components/AppHeaderSticky";
import { useStore } from "vuex";

export default {
  name: "AppLayout",
  components: { AppTopNav, AppHeader, AppFooter, AppHeaderSticky },
  setup() {
    // 获取 store 对象
    const store = useStore();
    // 发送请求获取分类数据
    store.dispatch("category/getCategories");
    return {};
  },
};
</script>

<style scoped></style>

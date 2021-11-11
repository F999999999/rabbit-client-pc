<template>
  <AppTopNav />
  <AppHeader />
  <AppFooter />
</template>

<script>
import AppTopNav from "@/components/AppTopNav.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "AppLayout",
  components: { AppTopNav, AppHeader, AppFooter },
};
</script>

<style scoped></style>

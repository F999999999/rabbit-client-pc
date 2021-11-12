<template>
  <div class="home">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/components/AppLayout";

export default {
  name: "Home",
  components: { AppLayout },
  setup() {
    return {};
  },
};
</script>

<style lang="less"></style>

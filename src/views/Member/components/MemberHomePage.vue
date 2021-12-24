<template>
  <div class="member-home">
    <MemberHomeOverview />
    <MemberHomePanel title="我的收藏"></MemberHomePanel>
    <MemberHomePanel title="我的足迹"></MemberHomePanel>
    <GoodsRelevant />
  </div>
</template>

<script>
import MemberHomeOverview from "@/views/member/home/components/MemberHomeOverview";
import MemberHomePanel from "@/views/member/home/components/MemberHomePanel";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";

export default {
  name: "MemberHomePage",
  components: { GoodsRelevant, MemberHomePanel, MemberHomeOverview },
};
</script>

<style scoped lang="less">
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }

  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
}
</style>

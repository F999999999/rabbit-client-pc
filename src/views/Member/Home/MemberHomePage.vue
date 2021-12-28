<template>
  <AppMemberLayout>
    <div class="member-home">
      <MemberHomeOverview />
      <MemberHomePanel title="我的收藏">
        <GoodsItem
          v-for="goods in collection?.items"
          :key="goods.id"
          :goods="goods"
        />
      </MemberHomePanel>
      <MemberHomePanel title="我的足迹">
        <GoodsItem
          v-for="goods in browseHistory?.items"
          :key="goods.id"
          :goods="goods"
        />
      </MemberHomePanel>
      <GoodsRelevant />
    </div>
  </AppMemberLayout>
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import MemberHomeOverview from "@/views/Member/Home/components/MemberHomeOverview";
import MemberHomePanel from "@/views/Member/Home/components/MemberHomePanel";
import GoodsRelevant from "@/views/Goods/components/GoodsRelevant";
import { ref } from "vue";
import { getCollectionApi } from "@/api/member";
import GoodsItem from "@/views/Category/components/GoodsItem";
import { getBrowseHistoryApi } from "@/api/member";

export default {
  name: "MemberHomePage",
  components: {
    GoodsItem,
    GoodsRelevant,
    MemberHomePanel,
    MemberHomeOverview,
    AppMemberLayout,
  },
  setup() {
    // 获取收藏数据
    const { collection } = useCollection();
    // 获取足迹数据
    const { browseHistory } = useBrowseHistory();

    return { collection, browseHistory };
  },
};

// 获取收藏数据
const useCollection = () => {
  // 收藏数据
  const collection = ref(null);
  // 发送请求获取数据
  getCollectionApi({ pageSize: 4 }).then((res) => {
    collection.value = res.result;
    console.log(res, "collection");
  });

  return { collection };
};

// 获取足迹数据
const useBrowseHistory = () => {
  // 足迹数据
  const browseHistory = ref(null);
  // 发送请求获取数据
  getBrowseHistoryApi({ pageSize: 4 }).then((res) => {
    browseHistory.value = res.result;
    console.log(res, "browseHistory");
  });

  return { browseHistory };
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

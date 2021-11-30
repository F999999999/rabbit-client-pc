<template>
  <AppLayout>
    <div class="xtx-goods-page" v-if="goodsDetailData">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :path="`/category/${goodsDetailData.categories[1].id}`">
            {{ goodsDetailData.categories[1].name }}
          </XtxBreadItem>
          <XtxBreadItem
            :path="`/category/sub/${goodsDetailData.categories[0].id}`"
          >
            {{ goodsDetailData.categories[0].name }}
          </XtxBreadItem>
          <XtxBreadItem>{{ goodsDetailData.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media">
            <!-- 图片预览组件 -->
            <GoodsImages :images="goodsDetailData.mainPictures" />
            <!-- 商品销售信息 -->
            <GoodsSales />
          </div>
          <!-- 右侧 -->
          <div class="spec">
            <!-- 商品基本信息 -->
            <GoodsInfo :goods="goodsDetailData" />
            <!-- 商品规格 -->
            <GoodsSku
              :specs="goodsDetailData.specs"
              :skus="goodsDetailData.skus"
              @onSpecChanged="onSpecChanged"
            />
            <!-- 数量选择组件 -->
            <XtxNumberBox
              v-model="goodsCount"
              :max="goodsDetailData.inventory"
              label="数量"
            />
            <!-- 加入购物车按钮 -->
            <XtxButton type="primary" :style="{ 'margin-top': '20px' }">
              加入购物车
            </XtxButton>
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs"></div>
            <!-- 注意事项 -->
            <div class="goods-warn"></div>
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside"></div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsRelevant from "@/views/Goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getGoodsDetailByIdApi } from "@/api/goods";
import GoodsImages from "@/views/Goods/components/GoodsImages";
import GoodsSales from "@/views/Goods/components/GoodsSales";
import GoodsInfo from "@/views/Goods/components/GoodsInfo";
import GoodsSku from "@/views/Goods/components/GoodsSku";

export default {
  name: "GoodsDetailPage",
  components: {
    GoodsSku,
    GoodsInfo,
    GoodsSales,
    GoodsImages,
    GoodsRelevant,
    AppLayout,
  },
  setup() {
    const { goodsDetailData } = goods();

    // 监听规格组件传递过来的数据
    const onSpecChanged = (sku) => {
      // 更新商品现价
      goodsDetailData.value.price = sku.price;
      // 更新商品原价
      goodsDetailData.value.oldPrice = sku.oldPrice;
    };

    // 购买数量
    const goodsCount = ref(1);

    return { goodsDetailData, onSpecChanged, goodsCount };
  },
};

const goods = () => {
  // 获取路由信息
  const route = useRoute();
  // 商品详情信息
  const goodsDetailData = ref(null);
  // 获取商品详情信息
  const getGoodsDetail = (id) => {
    // 发送请求获取商品详情数据
    getGoodsDetailByIdApi(id).then((res) => {
      goodsDetailData.value = res.result;
    });
  };
  // 初始获取数据
  getGoodsDetail(route.params.id);
  // 当前路由更新时执行
  onBeforeRouteUpdate((to) => {
    // 更新商品详情数据
    getGoodsDetail(to.params.id);
  });

  return { goodsDetailData, getGoodsDetail };
};
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>

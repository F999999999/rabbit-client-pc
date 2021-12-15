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
            <XtxButton
              type="primary"
              :style="{ 'margin-top': '20px' }"
              @click="addCart"
            >
              加入购物车
            </XtxButton>
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant :goodsId="goodsDetailData.id" />
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品详情&评价 -->
            <GoodsTab />
            <!-- 注意事项 -->
            <GoodsWarn />
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot :type="1" />
            <GoodsHot :type="2" />
            <GoodsHot :type="3" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsRelevant from "@/views/Goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { provide, ref } from "vue";
import { getGoodsDetailByIdApi } from "@/api/goods";
import GoodsImages from "@/views/Goods/components/GoodsImages";
import GoodsSales from "@/views/Goods/components/GoodsSales";
import GoodsInfo from "@/views/Goods/components/GoodsInfo";
import GoodsSku from "@/views/Goods/components/GoodsSku";
import GoodsTab from "@/views/Goods/components/GoodsTab";
import GoodsHot from "@/views/Goods/components/GoodsHot";
import GoodsWarn from "@/views/Goods/components/GoodsWarn";
import Message from "@/components/library/Message";
import { useStore } from "vuex";

export default {
  name: "GoodsDetailPage",
  components: {
    GoodsWarn,
    GoodsHot,
    GoodsTab,
    GoodsSku,
    GoodsInfo,
    GoodsSales,
    GoodsImages,
    GoodsRelevant,
    AppLayout,
  },
  setup() {
    // 获取 store
    const store = useStore();

    const { goodsDetailData } = goods();

    // 监听规格组件传递过来的数据
    const onSpecChanged = (sku) => {
      // 更新商品现价
      goodsDetailData.value.price = sku.price;
      // 更新商品原价
      goodsDetailData.value.oldPrice = sku.oldPrice;
      // 更新商品库存
      goodsDetailData.value.inventory = sku.inventory;
      // 更新商品 skuId
      goodsDetailData.value.currentSelectedSkuId = sku.skuId;
      // 更新商品规格属性文字
      goodsDetailData.value.currentSelectedSkuText = sku.specsText;
    };

    // 购买数量
    const goodsCount = ref(1);

    // 使用 provide 共享数据给子组件
    provide("goodsDetailData", goodsDetailData);

    // 加入购物车
    const addCart = () => {
      // 判断用户是否选择了规格
      if (!goodsDetailData.value.currentSelectedSkuId) {
        return Message({ type: "error", text: "请选择商品规格" });
      }
      // 收集购物车所需的商品信息
      const goods = {
        // 商品id
        id: goodsDetailData.value.id,
        // 商品 skuId
        skuId: goodsDetailData.value.currentSelectedSkuId,
        // 商品名称
        name: goodsDetailData.value.name,
        // 商品规格属性文字
        attrsText: goodsDetailData.value.currentSelectedSkuText,
        // 商品图片
        picture: goodsDetailData.value.mainPictures[0],
        // 商品原价
        price: goodsDetailData.value.oldPrice,
        // 商品现价
        nowPrice: goodsDetailData.value.price,
        // 是否选中
        selected: true,
        // 商品库存
        stock: goodsDetailData.value.inventory,
        // 用户选择的商品数量
        count: goodsCount.value,
        // 用户选择的商品是否有效（用户选择的规格有库存并且没有被下架）
        isEffective: true,
      };
      // 将商品添加到购物车中
      store
        .dispatch("cart/addGoodsToCart", goods)
        // 添加成功
        .then(() => {
          Message({ type: "success", text: "商品已经成功添加到购物车" });
        })
        // 添加失败
        .catch((err) => {
          Message({ type: "error", text: err.response.message });
        });
    };

    return { goodsDetailData, onSpecChanged, goodsCount, addCart };
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

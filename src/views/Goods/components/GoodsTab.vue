<template>
  <div class="goods-tabs">
    <nav>
      <a
        class="active"
        href="javascript:"
        @click="activeComponentName = 'GoodsDetail'"
      >
        商品详情
      </a>
      <a href="javascript:" @click="activeComponentName = 'GoodsComment'">
        商品评价<span>({{ goodsDetailData.commentCount }}+)</span>
      </a>
    </nav>
    <!-- 根据组件名称动态渲染组件 -->
    <component :is="activeComponentName" />
  </div>
</template>
<script>
import { inject, ref } from "vue";
import GoodsDetail from "@/views/Goods/components/GoodsDetail";
import GoodsComment from "@/views/Goods/components/GoodsComment";

export default {
  name: "GoodsTab",
  components: { GoodsComment, GoodsDetail },
  setup() {
    // 获取 provide 传递过来的值
    const goodsDetailData = inject("goodsDetailData");

    // 当前 Tab 页显示的页面名称
    const activeComponentName = ref("GoodsDetail");

    return { activeComponentName, goodsDetailData };
  },
};
</script>
<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }

      &:first-child {
        border-right: 1px solid #f5f5f5;
      }

      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>

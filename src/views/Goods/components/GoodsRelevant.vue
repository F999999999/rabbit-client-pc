<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <!-- 轮播图组件 -->
    <XtxCarousel :carousels="carousels" />
  </div>
</template>

<script>
import { ref } from "vue";
import { getRelevantGoodsApi } from "@/api/goods";
import XtxCarousel from "@/components/library/XtxCarousel";

export default {
  name: "GoodsRelevant",
  components: { XtxCarousel },
  props: {
    goodsId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const carousels = useRelativeGoods(props.goodsId);

    return { carousels };
  },
};

// 获取轮播图数据
const useRelativeGoods = (goodsId) => {
  // 轮播图数据
  const carousels = ref([]);
  // 获取轮播图数据
  getRelevantGoodsApi(goodsId, 16).then((res) => {
    // 每页显示数据量
    const size = 4;
    // 总页数
    const total = Math.ceil(res.result.length / size);
    // 重置轮播图数据
    carousels.value = [];
    // 创建轮播图所需数据结构 [[{},{},{},{}],[{},{},{},{}]]
    for (let i = 0; i < total; i++) {
      // 每页从轮播图数据中截取 size 条数据放到二维数组中作为一页展示的数据
      carousels.value.push(res.result.slice(i * size, (i + 1) * size));
    }
  });

  return carousels;
};
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;

  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;

    .title {
      font-size: 20px;
      padding-left: 10px;
    }

    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }

  // 使用样式穿透对轮播图的样式进行修改
  ::v-deep .xtx-carousel {
    height: 380px;

    .carousel {
      &-indicator {
        bottom: 30px;

        span {
          &.active {
            background: @xtxColor;
          }
        }
      }

      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;

        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>

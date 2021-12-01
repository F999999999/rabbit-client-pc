>

<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in goodsDetailData.details.properties" :key="item.name">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img
      :src="img"
      alt=""
      v-for="img in goodsDetailData.details.pictures"
      :key="img"
    />
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "GoodsDetail",
  setup() {
    // 获取 provide 传递过来的值
    const goodsDetailData = inject("goodsDetailData");

    return {
      goodsDetailData,
    };
  },
};
</script>

<style scoped lang="less">
.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}
</style>

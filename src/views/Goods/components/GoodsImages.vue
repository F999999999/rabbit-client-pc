<template>
  <div class="goods-image">
    <!-- 当前图片 -->
    <div class="middle" ref="currentElement">
      <img :src="images[current]" alt="" />
      <!-- 镜片容器 -->
      <div
        class="layer"
        :style="{ top: layerPosition.y + 'px', left: layerPosition.x + 'px' }"
        v-if="show"
      ></div>
    </div>
    <!-- 大图 -->
    <div
      class="large"
      :style="{
        backgroundImage: `url(${images[current]})`,
        backgroundPositionX: bgPosition.x + 'px',
        backgroundPositionY: bgPosition.y + 'px',
      }"
      v-show="show"
    ></div>
    <!-- 小图列表 -->
    <ul class="small">
      <li
        v-for="(item, i) in images"
        :key="i"
        :class="{ active: i === current }"
        @mouseenter="current = i"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";

export default {
  name: "GoodsImages",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    // 当前图片索引
    const current = ref(0);
    // 大图是否显示
    const show = ref(false);
    // 当前图片元素
    const currentElement = ref(null);
    // 获取鼠标和镜片元素的关系
    const { isOutside, elementX, elementY } = useMouseInElement(currentElement);
    // 镜片位置
    const layerPosition = ref({ x: 0, y: 0 });
    // 大图背景图位置
    const bgPosition = ref({ x: 0, y: 0 });
    // 监听鼠标和镜片元素的关系
    watch([isOutside, elementX, elementY], () => {
      // 如果鼠标在当前图片组件上则显示大图
      show.value = !isOutside.value;
      // 判断鼠标是否在当前图片上
      if (!isOutside.value) {
        // 更新镜片元素位置
        layerPosition.value = {
          x: elementX.value - 100,
          y: elementY.value - 100,
        };
        // 防止镜片元素水平方向溢出
        if (layerPosition.value.x < 0) {
          layerPosition.value.x = 0;
        } else if (layerPosition.value.x > 200) {
          layerPosition.value.x = 200;
        }
        // 防止镜片元素垂直方向溢出
        if (layerPosition.value.y < 0) {
          layerPosition.value.y = 0;
        } else if (layerPosition.value.y > 200) {
          layerPosition.value.y = 200;
        }
        // 更新大图位置
        bgPosition.value = {
          x: -layerPosition.value.x * 2,
          y: -layerPosition.value.y * 2,
        };
      }
    });

    return { current, show, currentElement, layerPosition, bgPosition };
  },
};
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
}
</style>

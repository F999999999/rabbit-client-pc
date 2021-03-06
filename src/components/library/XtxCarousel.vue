<template>
  <div
    class="xtx-carousel"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <!-- 轮播图主体 -->
    <ul class="carousel-body">
      <li
        class="carousel-item"
        :class="{ fade: index === currentIndex }"
        v-for="(item, index) in carousels"
        :key="item.id"
      >
        <!-- 如果 item 是数组则表示一张轮播图中有多个数据，需要对其进行遍历渲染多个数据 -->
        <div class="slider" v-if="Array.isArray(item)">
          <router-link
            v-for="goods in item"
            :key="goods.id"
            :to="`/goods/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </router-link>
        </div>
        <!-- 如果 item 是对象则直接渲染 -->
        <RouterLink :to="item.hrefUrl" v-else>
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 轮播图左按钮 -->
    <a @click="toggle(-1)" class="carousel-btn prev">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <!-- 轮播图右按钮 -->
    <a @click="toggle(1)" class="carousel-btn next">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <!-- 圆点导航 -->
    <div class="carousel-indicator">
      <span
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in carousels"
        :key="item.id"
        @click="currentIndex = index"
      ></span>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

export default {
  name: "XtxCarousel",
  props: {
    carousels: {
      type: Array,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    const currentIndex = ref(0);
    // 定时器
    let timer = null;
    // 开启轮播
    const startAutoPlay = () => {
      if (props.autoplay && props.carousels.length > 1) {
        timer = setInterval(() => {
          currentIndex.value++;
          if (currentIndex.value >= props.carousels.length) {
            currentIndex.value = 0;
          }
        }, props.duration);
      }
    };
    // 停止轮播
    const stopAutoPlay = () => {
      clearInterval(timer);
    };
    // 组件挂载完成后试图开启自动轮播
    onMounted(startAutoPlay);
    // 组件卸载之后停止自动轮播
    onUnmounted(stopAutoPlay);

    // 轮播图切换
    const toggle = (step) => {
      const nextIndex = currentIndex.value + step;
      if (nextIndex < 0) {
        // 显示最后一张
        currentIndex.value = props.carousels.length - 1;
      } else if (nextIndex > props.carousels.length - 1) {
        // 如果没有下一张
        currentIndex.value = 0;
      } else {
        // 正常情况
        currentIndex.value = nextIndex;
      }
      return nextIndex;
    };

    return { currentIndex, toggle, startAutoPlay, stopAutoPlay };
  },
};
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~ span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}

.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;

  > a {
    width: 240px;
    text-align: center;

    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }

    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }

    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>

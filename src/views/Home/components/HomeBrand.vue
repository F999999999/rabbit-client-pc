<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        class="iconfont icon-angle-left prev"
        :class="{ disabled: currentIndex === 0 }"
      ></a>
      <a
        @click="toggle(1)"
        class="iconfont icon-angle-right next"
        :class="{ disabled: (currentIndex + 1) * 5 >= brandData?.length }"
      ></a>
    </template>
    <template v-slot:default>
      <div class="box">
        <ul
          class="list"
          :style="{ transform: `translateX(${-currentIndex * 1240}px)` }"
        >
          <li v-for="item in brandData" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" :alt="item.name" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/Home/components/HomePanel";
import useLazyData from "@/hooks/useLazyData";
import { getHotBrandApi } from "@/api/home";
import { ref } from "vue";

export default {
  name: "HomeBrand",
  components: { HomePanel },
  setup() {
    // 懒加载数据
    const { target, result: brandData } = useLazyData(() => getHotBrandApi(10));

    return { target, brandData, ...useToggle(brandData.length) };
  },
};

// 图片切换
const useToggle = (length = 10) => {
  // 当前索引
  const currentIndex = ref(0);
  // 控制索引
  const toggle = (step) => {
    // 下一个索引
    const nextIndex = currentIndex.value + step;
    console.log(nextIndex, length / 5);
    // 如果索引超出范围则不进行操作
    if (nextIndex < 0 || nextIndex >= length / 5) return;
    // 修改下一个索引为当前索引
    currentIndex.value = nextIndex;
  };

  return { currentIndex, toggle };
};
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>

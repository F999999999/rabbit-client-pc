<template>
  <div class="home-product" ref="target">
    <HomePanel :title="item.name" v-for="item in goodsData" :key="item.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink
            :to="`/category/sub/${sub.id}`"
            v-for="sub in item.children"
            :key="sub.id"
          >
            {{ sub.name }}
          </RouterLink>
        </div>
        <XtxMore :path="`/category/${item.id}`" />
      </template>
      <template v-slot:default>
        <div class="box">
          <RouterLink class="cover" :to="`/category/${item.id}`">
            <img src="" v-lazy="item.picture" :alt="item.name" />
            <strong class="label">
              <span>{{ item.name }}馆</span>
              <span>{{ item.saleInfo }}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list" v-if="item.goods">
            <li v-for="goods in item.goods" :key="goods.id">
              <HomeGoods :goods="goods" :categoryId="item.id" />
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script>
import HomeGoods from "@/views/Home/components/HomeGoods";
import HomePanel from "@/views/Home/components/HomePanel";
import XtxMore from "@/components/library/XtxMore";
import useLazyData from "@/hooks/useLazyData";
import { getProductsApi } from "@/api/home";

export default {
  name: "HomeProduct",
  components: { XtxMore, HomePanel, HomeGoods },
  setup() {
    // 懒加载数据
    const { target, result: goodsData } = useLazyData(getProductsApi);

    return { target, goodsData };
  },
};
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: @xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>

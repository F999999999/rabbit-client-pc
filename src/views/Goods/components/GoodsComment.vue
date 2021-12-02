<template>
  <div class="goods-comment">
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:"
            v-for="tag in commentInfo.tags"
            :key="tag.title"
            :class="{ active: tag.title === currentTag }"
            @click="currentTag = tag.title"
          >
            {{ tag.title }}（{{ tag.tagCount }}）
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:" class="active">默认</a>
      <a href="javascript:">最新</a>
      <a href="javascript:">最热</a>
    </div>
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList.items" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" :alt="item.member.nickname" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              class="iconfont icon-wjx01"
              v-for="i in item.score"
              :key="'s' + i"
            />
            <i
              class="iconfont icon-wjx02"
              v-for="i in 5 - item.score"
              :key="'k' + i"
            />
            <span class="attr">{{ formatAttrs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <!-- 图片预览组件 -->
          <GoodsCommentImage :pictures="item.pictures" />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { getCommentInfoApi, getCommentListApi } from "@/api/goods";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import GoodsCommentImage from "@/views/Goods/components/GoodsCommentImage";

export default {
  name: "GoodsComment",
  components: { GoodsCommentImage },
  setup() {
    const { commentInfo, currentTag } = useCommentInfo();
    const { commentList, formatNickname, formatAttrs } = useCommentList();

    return {
      commentInfo,
      currentTag,
      commentList,
      formatNickname,
      formatAttrs,
    };
  },
};

// 获取评价统计信息
const useCommentInfo = () => {
  // 获取路由信息
  const route = useRoute();
  // 商品评价统计信息
  const commentInfo = ref(null);
  // 当前选中的标记
  const currentTag = ref("全部评价");
  // 获取商品评价统计信息
  const getCommentInfo = (id) => {
    getCommentInfoApi(id).then((res) => {
      // 添加 全部评价 和 有图 标记
      res.result.tags.unshift(
        {
          title: "全部评价",
          tagCount: res.result.evaluateCount,
        },
        {
          title: "有图",
          tagCount: res.result.hasPictureCount,
        }
      );
      // 存储商品评价统计信息
      commentInfo.value = res.result;
    });
  };
  // 首次进入时获取商品评价统计信息
  getCommentInfo(route.params.id);
  // 当路由更新时执行
  onBeforeRouteUpdate((to) => {
    // 更新商品评价统计信息
    getCommentInfo(to.params.id);
  });

  return { commentInfo, currentTag };
};

// 获取评价列表数据
const useCommentList = () => {
  // 获取路由信息
  const route = useRoute();
  // 商品评论列表
  const commentList = ref(null);
  // 获取商品评论列表
  const getCommentList = (id) => {
    getCommentListApi(id).then((res) => {
      // 存储商品评论列表
      commentList.value = res.result;
    });
  };
  // 首次进入时获取商品评价列表
  getCommentList(route.params.id);
  // 当路由更新时执行
  onBeforeRouteUpdate((to) => {
    // 更新商品评论列表
    getCommentList(to.params.id);
  });

  // 格式化用户昵称
  const formatNickname = (nickname) => {
    return nickname.substr(0, 1) + "****" + nickname.substr(-1);
  };
  // 格式化商品属性信息
  const formatAttrs = (specs) => {
    return specs.map((spec) => `${spec.name}：${spec.nameValue}`).join(" ");
  };

  return { commentList, formatNickname, formatAttrs };
};
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;

    .data {
      width: 340px;
      display: flex;
      padding: 20px;

      p {
        flex: 1;
        text-align: center;

        span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;

      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }

      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;

          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }

          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }

  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;

    > span {
      margin-left: 20px;
    }

    > a {
      margin-left: 30px;

      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
}

.list {
  padding: 0 20px;

  .item {
    display: flex;
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;

    .user {
      width: 160px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }

      span {
        padding-left: 10px;
        color: #666;
      }
    }

    .body {
      flex: 1;

      .score {
        line-height: 40px;

        .iconfont {
          color: #ff9240;
          padding-right: 3px;
        }

        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }

    .text {
      color: #666;
      line-height: 24px;
    }

    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>

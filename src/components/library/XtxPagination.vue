<template>
  <div class="xtx-pagination">
    <a
      href="javascript:"
      :class="{ disabled: currentPage <= 1 }"
      @click="currentPage = --currentPage < 1 ? 1 : --currentPage"
    >
      上一页
    </a>
    <span v-if="pageInfo.start > 1">...</span>
    <a
      href="javascript:"
      :class="{ active: page === currentPage }"
      v-for="page in pageInfo.pageButtons"
      :key="page"
      @click="currentPage = page"
    >
      {{ page }}
    </a>
    <span v-if="pageInfo.end < pageInfo.totalPage">...</span>
    <a
      href="javascript:"
      :class="{ disabled: currentPage >= pageInfo.totalPage }"
      @click="
        currentPage =
          ++currentPage > pageInfo.totalPage
            ? pageInfo.totalPage
            : ++currentPage
      "
    >
      下一页
    </a>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxPagination",
  props: {
    // 当前页码
    page: {
      type: Number,
      default: 1,
    },
    // 总数据量
    count: {
      type: Number,
      default: 1,
    },
    // 每页显示数据量
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    // 当前页码
    const currentPage = useVModel(props, "page", emit);
    // 总数据量
    const totalCount = computed(() => props.count);
    // 每页显示数据量
    const pageSize = computed(() => props.pageSize);
    // 页面需要显示的页码数量
    const pageButtonNumber = ref(5);
    // 页码计算偏移量
    const pageOffset = Math.floor(pageButtonNumber.value / 2);
    // 计算页码
    const pageInfo = computed(() => {
      // 总页数
      const totalPage = Math.ceil(totalCount.value / pageSize.value);
      // 开始页码
      let start = currentPage.value - pageOffset;
      // 如果页码小于 1 则赋值为 1 防止页码溢出
      if (start < 1) start = 1;
      // 结束页码
      let end = start + pageButtonNumber.value - 1;
      // 如果页码大于总页数则赋值为总页数防止页码溢出
      if (end > totalPage) {
        end = totalPage;
        // 重新计算开始页码
        start = end - pageButtonNumber.value + 1;
        // 防止溢出
        start = start < 1 ? 1 : start;
      }
      // 生成页面按钮
      const pageButtons = [];
      for (let i = start; i <= end; i++) {
        pageButtons.push(i);
      }

      return { pageButtons, start, end, totalPage };
    });

    return { currentPage, pageInfo };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;

  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;

    &:hover {
      color: @xtxColor;
    }

    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;

      &:hover {
        color: #333;
      }
    }
  }

  > span {
    margin-right: 10px;
  }
}
</style>

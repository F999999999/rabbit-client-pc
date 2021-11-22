<template>
  <div>
    <!-- 筛选区 -->
    <div class="sub-filter" v-if="filters && !filtersLoading">
      <div class="item">
        <div class="head">品牌：</div>
        <div class="body">
          <a
            v-for="brand in filters.brands"
            :key="brand.id"
            @click="
              filters.selectedBrandId = brand.id;
              updateSelectedFilters();
            "
            :class="{ active: filters.selectedBrandId === brand.id }"
          >
            {{ brand.name }}
          </a>
        </div>
      </div>
      <div class="item" v-for="item in filters.saleProperties" :key="item.id">
        <div class="head">{{ item.name }}：</div>
        <div class="body">
          <a
            v-for="property in item.properties"
            :key="property.id"
            @click="
              item.selectedFilterName = property.name;
              updateSelectedFilters();
            "
            :class="{ active: item.selectedFilterName === property.name }"
          >
            {{ property.name }}
          </a>
        </div>
      </div>
    </div>
    <!-- 骨架屏 -->
    <div class="sub-filter" v-else>
      <XtxSkeleton class="item" width="800px" height="40px" />
      <XtxSkeleton class="item" width="800px" height="40px" />
      <XtxSkeleton class="item" width="600px" height="40px" />
      <XtxSkeleton class="item" width="600px" height="40px" />
      <XtxSkeleton class="item" width="600px" height="40px" />
    </div>
  </div>
</template>
<script>
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getSubCategoryFilterByIdApi } from "@/api/category";

export default {
  name: "SubFilter",
  setup(props, { emit }) {
    const { filters, updateSelectedFilters, filtersLoading } =
      useSubCategoryFilter(emit);

    return { filters, updateSelectedFilters, filtersLoading };
  },
};

// 获取筛选条件
const useSubCategoryFilter = (emit) => {
  // 获取路由信息
  const route = useRoute();
  // 所有筛选条件数据
  const filters = ref(null);
  // 筛选条件数据是否正在加载
  const filtersLoading = ref(false);
  // 获取筛选条件
  const getSubCategoryFilterById = (id) => {
    // 更新筛选数据的加载状态为正在加载
    filtersLoading.value = true;

    // 获取筛选条件数据
    getSubCategoryFilterByIdApi(id).then((res) => {
      // 更新筛选数据的加载状态为数据加载完成
      filtersLoading.value = false;

      // 在品牌筛选条件的前面加上 全部 筛选选项
      res.result.brands.unshift({ id: null, name: "全部" });
      // 当前被选择的筛选品牌id
      res.result.selectedBrandId = null;

      res.result.saleProperties.forEach((item) => {
        // 在其他筛选条件的前面加上 全部 筛选选项
        item.properties.unshift({ id: null, name: "全部" });
        // 当前被选择的筛选条件
        item.selectedFilterName = "全部";
      });

      // 存储筛选条件
      filters.value = res.result;
    });
  };
  // 初始化筛选条件数据
  getSubCategoryFilterById(route.params.id);
  // 当前路由更新时执行
  onBeforeRouteUpdate((to) => getSubCategoryFilterById(to.params.id));

  // 用户选择的筛选条件
  const selectedFilters = {
    brandId: null,
    attrs: [],
  };

  // 更新用户选择的筛选条件
  const updateSelectedFilters = () => {
    // 更新用户选择的品牌id
    selectedFilters.brandId = filters.value.selectedBrandId;
    // 重置筛选条件
    selectedFilters.attrs = [];
    // 更新用户选择的筛选条件
    filters.value.saleProperties.forEach((item) => {
      // 如果用户选择了当前筛选类别的筛选条件
      if (item.selectedFilterName && item.selectedFilterName != "全部") {
        // 收集用户选择的筛选条件类别名称和筛选条件名称
        selectedFilters.attrs.push({
          // 类别名称
          groupName: item.name,
          // 条件名称
          propertyName: item.selectedFilterName,
        });
      }
    });
    // 把用户选择的筛选条件传递给父组件
    emit("onFilterParamsChanged", selectedFilters);
  };

  return { filters, updateSelectedFilters, filtersLoading };
};
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>

<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle">
      <span class="placeholder" v-if="!location">请选择配送地址</span>
      <span class="value" v-else>{{ location }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <template v-if="cityList">
        <span
          class="ellipsis"
          v-for="item in cityList"
          :key="item.code"
          @click="selectCityData(item)"
        >
          {{ item.name }}
        </span>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";

export default {
  name: "XtxCity",
  setup(props, { emit }) {
    // 下拉菜单是否显示
    const visible = ref(false);
    // 下拉菜单 ref
    const target = ref(null);
    // 城市数据
    const cityData = ref(null);
    // 显示下拉菜单
    const show = () => {
      // 显示下拉菜单
      visible.value = true;
      // 获取城市数据
      getCityData().then((data) => {
        // 保存城市数据
        cityData.value = data;
      });
    };
    // 隐藏下拉菜单
    const hide = () => {
      visible.value = false;
      // 重置用户选择的城市数据
      for (const attr in selectedCityData.value) {
        selectedCityData.value[attr] = "";
      }
    };
    // 切换下拉菜单的显示和隐藏
    const toggle = () => {
      visible.value ? hide() : show();
    };
    // 点击下拉菜单以外的区域时
    onClickOutside(target, () => {
      // 隐藏下拉菜单
      hide();
    });

    // 用户选择的城市信息
    const selectedCityData = ref({
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      provinceName: "",
      cityName: "",
      countyName: "",
    });
    // 位置信息集合
    const location = ref("");
    // 选择城市数据
    const selectCityData = (data) => {
      if (data.level === 0) {
        selectedCityData.value.provinceCode = data.code;
        selectedCityData.value.provinceName = data.name;
      } else if (data.level === 1) {
        selectedCityData.value.cityCode = data.code;
        selectedCityData.value.cityName = data.name;
      } else {
        selectedCityData.value.countyCode = data.code;
        selectedCityData.value.countyName = data.name;
        location.value = `${selectedCityData.value.provinceName} ${selectedCityData.value.cityName} ${selectedCityData.value.countyName}`;
      }
    };
    // 需要返回的城市数据列表
    const cityList = computed(() => {
      // 默认返回省级数据
      let cityList = cityData.value;

      // 如果选择了省级数据
      if (selectedCityData.value.provinceCode) {
        // 将数据更新为市级数据
        cityList = cityList.find(
          (province) => province.code === selectedCityData.value.provinceCode
        ).areaList;
      }
      // 如果选择了市级数据
      if (selectedCityData.value.cityCode) {
        // 将数据替换为县区级数据
        cityList = cityList.find(
          (city) => city.code === selectedCityData.value.cityCode
        ).areaList;
      }
      // 如果选择了县区级数据
      if (selectedCityData.value.countyCode) {
        // 将用户选择的数据传递到父组件
        emit("onCityChanged", { ...selectedCityData.value });
        // 重置城市数据
        cityList = cityData.value;
        // 隐藏下拉菜单
        hide();
      }

      return cityList;
    });

    return {
      visible,
      target,
      toggle,
      selectCityData,
      cityList,
      location,
    };
  },
};

// 在 window 对象中缓存城市数据
window.cityData = null;

// 获取城市数据
const getCityData = async () => {
  // 如果 window 对象中有城市数据的缓存直接从 window 对象中获取城市数据
  if (window.cityData) return window.cityData;

  // 发送请求获取城市数据
  const res = await axios.get(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  );
  // 将城市数据缓存到 window 对象中并返回数据
  return (window.cityData = res.data);
};
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }

    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>

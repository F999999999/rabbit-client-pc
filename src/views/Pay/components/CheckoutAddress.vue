<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="!finalAddress">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-if="finalAddress">
        <li>
          <span>收<i />货<i />人：</span>
          {{ finalAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span>
          {{ finalAddress.contact.replace(/(\d{3})\d{4}(\d{4})/g, `$1****$2`) }}
        </li>
        <li>
          <span>收货地址：</span>
          {{ finalAddress.fullLocation }}
          {{ finalAddress.address }}
        </li>
      </ul>
      <a href="javascript:" @click="modifyAddress">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn">切换地址</XtxButton>
      <XtxButton class="btn" @click="addAddress">添加地址</XtxButton>
    </div>
    <AddressEdit
      ref="addressEditInstance"
      @onAddressChanged="updateUserSelectedAddress($event)"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import AddressEdit from "@/views/Pay/components/AddressEdit";
import { getAddressListApi } from "@/api/order";

export default {
  name: "CheckoutAddress",
  components: { AddressEdit },
  setup() {
    // 当前渲染的收货地址
    const { finalAddress, updateUserSelectedAddress } = getAddresses();
    // 编辑收货地址组件实例对象
    const addressEditInstance = ref();
    // 添加收货地址
    const addAddress = () => {
      // 初始化收货地址参数
      addressEditInstance.value.address = {
        // 省编码
        provinceCode: "",
        // 市编码
        cityCode: "",
        // 区编码
        countyCode: "",
        // 收货人
        receiver: "",
        // 手机号码
        contact: "",
        // 详细地址
        address: "",
        // 邮政编码
        postalCode: "",
        // 地址标签
        addressTags: "",
        // 是否设置为默认地址
        isDefault: false,
      };
      // 显示弹层
      addressEditInstance.value.visible = true;
    };
    // 修改收货地址
    const modifyAddress = () => {
      // 获取当前要修改的收货地址信息
      const { fullLocation, isDefault, ...rest } = finalAddress.value;
      // 将要修改的收货地址信息显示在弹层中
      addressEditInstance.value.address = {
        ...rest,
        // 0 为默认地址 1 为非默认地址
        isDefault: isDefault === 0,
      };
      // 设置城市选择组件数据
      setTimeout(() => {
        addressEditInstance.value.xtxCityInstance.location = fullLocation;
      }, 0);
      // 显示弹层
      addressEditInstance.value.visible = true;
    };

    return {
      finalAddress,
      addressEditInstance,
      addAddress,
      updateUserSelectedAddress,
      modifyAddress,
    };
  },
};

// 获取收货地址列表
const getAddresses = () => {
  // 收货地址列表
  const addresses = ref(null);
  // 获取收货地址列表
  const getData = (callback) => {
    // 发送请求获取收货地址列表
    getAddressListApi().then((res) => {
      // 存储收货地址列表
      addresses.value = res.result;
      // 执行回调
      callback && callback(res.result);
    });
  };
  // 初始化收货地址列表
  getData();

  // 用户新增的收货地址或者切换的收货地址
  const userSelectedAddress = ref();
  // 计算最终需要渲染到页面中的收货地址
  const finalAddress = computed(() => {
    let result = null;
    // 如果用户添加了新的收货地址或者切换了收货地址
    if (userSelectedAddress.value) {
      // 优先渲染
      result = userSelectedAddress.value;
    } else {
      // 判断收货地址列表中是否存在收货地址
      if (addresses.value && addresses.value.length > 0) {
        // 渲染默认收货地址
        result = addresses.value.find((item) => item.isDefault === 0);
        // 如果默认收货地址不存在
        if (!result) {
          // 渲染收货地址列表中的第一条收货地址
          result = addresses.value[0];
        }
      }
    }
    return result;
  });

  // 更新用户添加的收货地址或者切换的收货地址
  const updateUserSelectedAddress = (id) => {
    getData((list) => {
      userSelectedAddress.value = list.find((item) => item.id === id);
    });
  };

  return { finalAddress, updateUserSelectedAddress };
};
</script>

<style scoped lang="less">
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>

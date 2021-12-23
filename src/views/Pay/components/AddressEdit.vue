<template>
  <XtxDialog v-model:visible="visible" title="添加收货地址">
    <template v-slot:default>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入收货人"
                v-model="address.receiver"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入手机号"
                v-model="address.contact"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity
                placeholder="请选择所在地区"
                @onCityChanged="onCityChanged"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入详细地址"
                v-model="address.address"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入邮政编码"
                v-model="address.postalCode"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入地址标签，逗号分隔"
                v-model="address.addressTags"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">是否设置为默认地址：</div>
            <div class="field">
              <input
                type="checkbox"
                class="checkbox"
                v-model="address.isDefault"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <XtxButton
        type="gray"
        style="margin-right: 20px"
        @click="visible = false"
      >
        取消
      </XtxButton>
      <XtxButton type="primary" @click="onSureClickHandler">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from "vue";
import { addAddressApi } from "@/api/order";
import Message from "@/components/library/Message";

export default {
  name: "AddressEdit",
  setup() {
    // 弹框是否显示
    const visible = ref(false);
    // 用户填写的收货地址
    const address = ref({
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
    });
    // 城市信息发生改变时
    const onCityChanged = (city) => {
      // 存储城市代码
      address.value.provinceCode = city.provinceCode;
      address.value.cityCode = city.cityCode;
      address.value.countyCode = city.countyCode;
    };

    // 用户点击确定按钮之后执行
    const onSureClickHandler = () => {
      // 生成请求产参数
      const target = {
        ...address.value,
        isDefault: address.value.isDefault ? 1 : 0,
      };
      // 发送请求添加收货地址
      addAddressApi(target)
        .then(() => {
          // 关闭对话框
          visible.value = false;
          // 用户提示
          Message({ type: "success", text: "收货地址添加成功" });
        })
        .catch((err) =>
          Message({
            type: "error",
            text: `收货地址添加失败 ${err.response.data.message}`,
          })
        );
    };

    return {
      visible,
      address,
      onSureClickHandler,
      onCityChanged,
    };
  },
};
</script>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;

    .body {
      font-size: 14px;
    }
  }

  .xtx-city {
    width: 320px;

    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;

      .placeholder {
        color: #ccc;
      }

      i {
        color: #ccc;
        font-size: 18px;
      }

      .value {
        font-size: 14px;
      }
    }

    :deep(.option) {
      top: 49px;
    }
  }
}

.xtx-form {
  padding: 0;

  .xtx-form-item {
    width: auto;

    &:last-child {
      padding-bottom: 0;
    }
  }

  input {
    outline: none;

    &::placeholder {
      color: #ccc;
    }
  }
}
</style>

<template>
  <form class="xtx-form" @submit="onSubmitHandler">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input
          class="input"
          type="text"
          placeholder="请输入用户名"
          v-model="accountField"
        />
      </div>
      <div class="error" v-if="accountError">{{ accountError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          placeholder="请输入手机号"
          v-model="mobileField"
        />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          class="input"
          type="text"
          placeholder="请输入验证码"
          v-model="codeField"
        />
        <span
          class="code"
          :class="{ disabled: count > 0 }"
          @click="getMsgCodeRegister(mobileField)"
        >
          {{ count ? `剩余${count}秒` : "发送验证码" }}
        </span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          type="password"
          placeholder="请输入密码"
          v-model="passwordField"
        />
      </div>
      <div class="error" v-if="passwordError">{{ passwordError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          type="password"
          placeholder="请确认密码"
          v-model="rePasswordField"
        />
      </div>
      <div class="error" v-if="rePasswordError">{{ rePasswordError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import { useField, useForm } from "vee-validate";
import {
  checkUserAccount,
  code,
  mobile,
  password,
  rePassword,
} from "@/utils/vee-validate-schema";
import useCountDown from "@/hooks/useCountDown";
import {
  createNewAccountBindQQ,
  getBindMobileMsgCode,
  getRegisterMsgCode,
} from "@/api/user";
import Message from "@/components/library/Message";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackBindPatch",
  props: {
    unionId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // 表单校验
    const { handleSubmit, getMsgCode, ...rest } = useBindNewAccountFormValid();

    // 登录成功或失败后执行的回调函数
    const { loginSuccessful, loginFailed } = useLoginAfter();
    // 提交时表单校验
    const onSubmitHandler = handleSubmit((value) => {
      createNewAccountBindQQ({
        unionId: props.unionId,
        account: value.checkUserAccount,
        mobile: value.mobile,
        code: value.code,
        password: value.password,
      })
        // 绑定成功执行登录成功操作
        .then(loginSuccessful)
        // 绑定失败执行登录失败操作
        .catch(loginFailed);
    });

    // 短信验证码获取间隔计时器
    const { count, start, isActive } = useCountDown();
    // 获取短信验证码
    const getMsgCodeRegister = (mobile) => {
      // 如果正在倒计时 则不发送请求
      if (isActive.value) return;
      getRegisterMsgCode(mobile)
        .then(({ isValid, mobile }) => {
          // 判断手机号码是否校验成功
          if (isValid) return getBindMobileMsgCode(mobile);
        })
        .then(() => {
          Message({ type: "success", text: "验证码发送成功" });
          // 开始倒计时
          start(60);
        })
        .catch(() => {
          Message({ type: "error", text: "验证码发送失败" });
        });
    };

    return { ...rest, onSubmitHandler, count, getMsgCode, getMsgCodeRegister };
  },
};

// 表单校验
const useBindNewAccountFormValid = () => {
  // 创建表单验证对象
  const { handleSubmit } = useForm({
    validationSchema: { checkUserAccount, mobile, code, password, rePassword },
  });

  // 校验 用户名
  const { value: accountField, errorMessage: accountError } =
    useField("checkUserAccount");
  // 校验 手机号码
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValidate,
  } = useField("mobile");
  // 校验 短信验证码
  const { value: codeField, errorMessage: codeError } = useField("code");
  // 校验 密码
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  // 校验 密码是否输入一致
  const { value: rePasswordField, errorMessage: rePasswordError } =
    useField("rePassword");

  // 单独校验手机号码是否通过
  const getMobileIsValidate = async () => {
    // 验证手机号, 获取验证结果
    const { valid } = await mobileValidate();
    // 返回验证结果
    return { isValid: valid, mobile: mobileField.value };
  };

  return {
    handleSubmit,
    accountField,
    accountError,
    mobileField,
    mobileError,
    codeField,
    codeError,
    passwordField,
    passwordError,
    rePasswordField,
    rePasswordError,
    getMobileIsValidate,
  };
};
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>

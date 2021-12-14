<template>
  <div class="account-box">
    <div class="toggle">
      <button v-if="isMsgLogin" @click="isMsgLogin = false">
        <i class="iconfont icon-user"></i> 使用账号登录
      </button>
      <button v-if="!isMsgLogin" @click="isMsgLogin = true">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </button>
    </div>
    <div class="form">
      <!-- 账户登录 -->
      <template v-if="!isMsgLogin">
        <form @submit="onAccountFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                type="text"
                placeholder="请输入用户名"
                v-model="accountField"
              />
            </div>
            <div class="error" v-if="accountError">
              <i class="iconfont icon-warning"></i>{{ accountError }}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <input
                type="password"
                placeholder="请输入密码"
                v-model="passwordField"
              />
            </div>
            <div class="error" v-if="passwordError">
              <i class="iconfont icon-warning"></i>{{ passwordError }}
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="accountAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error" v-if="accountAgreeError">
              <i class="iconfont icon-warning"></i>{{ accountAgreeError }}
            </div>
          </div>
          <button type="submit" class="btn" @click="onAccountFormSubmit">
            登录
          </button>
        </form>
      </template>
      <!-- 短信登录 -->
      <template v-if="isMsgLogin">
        <form @submit="onMobileFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                type="text"
                placeholder="请输入手机号"
                v-model="mobileField"
              />
            </div>
            <div class="error" v-if="mobileError">
              <i class="iconfont icon-warning"></i>{{ mobileError }}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <input
                type="password"
                placeholder="请输入验证码"
                v-model="codeField"
              />
              <span
                class="code"
                :class="{ disabled: count > 0 }"
                @click="getMsgCode"
              >
                {{ count ? `剩余${count}秒` : "发送验证码" }}
              </span>
            </div>
            <div class="error" v-if="codeError">
              <i class="iconfont icon-warning"></i>{{ codeError }}
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="mobileAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error" v-if="mobileAgreeError">
              <i class="iconfont icon-warning"></i>{{ mobileAgreeError }}
            </div>
          </div>
          <button type="submit" class="btn" @click="onMobileFormSubmit">
            登录
          </button>
        </form>
      </template>
    </div>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>

      <div class="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import {
  account,
  code,
  isAgree,
  mobile,
  password,
} from "@/utils/vee-validate-schema";
import {
  getLoginMsgCode,
  loginByAccountAndPassword,
  loginByMobileMsgCode,
} from "@/api/user";
import useLoginAfter from "@/hooks/useLoginAfter";
import Message from "@/components/library/Message";
import useCountDown from "@/hooks/useCountDown";

export default {
  name: "LoginForm",
  setup() {
    // 是否为短信登录
    const isMsgLogin = ref(false);

    // 登录成功或失败后执行的回调函数
    const { loginSuccessful, loginFailed } = useLoginAfter();

    // 账号密码登录表单校验
    // accountFormHandleSubmit：处理账号登录表单提交 accountFormValid：包含其他验证字段
    const { accountFormHandleSubmit, ...accountFormValid } =
      useAccountFormValidate();
    // 账号登录表单提交时整体表单校验
    const onAccountFormSubmit = accountFormHandleSubmit(
      ({ account, password }) => {
        // 发送请求进行账号密码登录
        loginByAccountAndPassword({ account, password })
          //  登录成功
          .then(loginSuccessful)
          // 登录失败
          .catch(loginFailed);
      }
    );

    // 手机号登录表单校验
    const { mobileFormHandleSubmit, getMobileIsValidate, ...mobileFormValid } =
      useMobileFormValidate();
    // 手机号登录表单提交时整体表单校验
    const onMobileFormSubmit = mobileFormHandleSubmit(({ mobile, code }) => {
      // 发送请求进行手机号码登录
      loginByMobileMsgCode({ mobile, code })
        // 登录成功
        .then(loginSuccessful)
        // 登录失败
        .catch(loginFailed);
    });

    // 短信验证码获取间隔计时器
    const { count, start, isActive } = useCountDown();
    // 获取短信验证码
    const getMsgCode = async () => {
      // 进行手机号码表单校验
      let { isValid, mobile } = await getMobileIsValidate();
      // 判断校验结果是否为 true 并且没有在倒计时
      if (isValid && !isActive.value) {
        try {
          // 发送请求获取短信验证码
          await getLoginMsgCode(mobile);
          // 验证码发送成功消息提示
          Message({ type: "success", text: "验证码发送成功" });
          // 开启定时器
          start(60);
        } catch (err) {
          // 验证码发送失败消息提示
          Message({ type: "error", text: err.response.data.message });
        }
      }
    };

    return {
      isMsgLogin,
      ...accountFormValid,
      onAccountFormSubmit,
      ...mobileFormValid,
      onMobileFormSubmit,
      getMsgCode,
      count,
    };
  },
};

// 账号登录表单验证
const useAccountFormValidate = () => {
  // 创建表单验证对象
  const { handleSubmit: accountFormHandleSubmit } = useForm({
    // 指定表单中包含的验证规则 只有以下规则都验证通过了表单才可以提交
    validationSchema: {
      account,
      password,
      isAgree,
    },
  });

  // 校验 用户名
  const { value: accountField, errorMessage: accountError } =
    useField("account");
  // 校验 密码
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  // 校验 是否同意协议
  const { value: accountAgreeField, errorMessage: accountAgreeError } =
    useField("isAgree");

  return {
    accountFormHandleSubmit,
    accountField,
    accountError,
    passwordField,
    passwordError,
    accountAgreeField,
    accountAgreeError,
  };
};

// 手机号登录表单校验
const useMobileFormValidate = () => {
  // 创建表单验证对象
  const { handleSubmit: mobileFormHandleSubmit } = useForm({
    // 指定表单中包含的验证规则 只有以下规则都验证通过了表单才可以提交
    validationSchema: {
      mobile,
      code,
      isAgree,
    },
  });

  // 校验 手机号
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValidate,
  } = useField("mobile");
  // 校验 短信验证码
  const { value: codeField, errorMessage: codeError } = useField("code");
  // 校验 是否同意协议
  const { value: mobileAgreeField, errorMessage: mobileAgreeError } =
    useField("isAgree");

  // 单独校验手机号码是否通过
  const getMobileIsValidate = async () => {
    // 验证手机号, 获取验证结果
    const { valid } = await mobileValidate();
    // 返回验证结果
    return { isValid: valid, mobile: mobileField.value };
  };

  return {
    mobileFormHandleSubmit,
    mobileField,
    mobileError,
    codeField,
    codeError,
    mobileAgreeField,
    mobileAgreeError,
    getMobileIsValidate,
  };
};
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    button {
      color: @xtxColor;
      background: none;
      border: none;
      cursor: pointer;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }

        .code.disabled {
          cursor: wait;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      border: none;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>

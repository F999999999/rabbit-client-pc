<template>
  <form class="xtx-form" @submit="onSubmitHandler">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          placeholder="绑定的手机号"
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
          placeholder="短信验证码"
          v-model="codeField"
        />
        <span class="code" :class="{ disabled: count > 0 }" @click="getMsgCode">
          {{ count ? `剩余${count}秒` : "发送验证码" }}
        </span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { code, mobile } from "@/utils/vee-validate-schema";
import useCountDown from "@/hooks/useCountDown";
import { bindMobileAndQQ, getBindMobileMsgCode } from "@/api/user";
import Message from "@/components/library/Message";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackBindPhone",
  props: {
    unionId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // 获取 QQ 用户昵称和头像
    const { nickname, avatar } = useQQUserInfo();
    // 表单校验
    const { handleSubmit, getMobileIsValidate, ...bindPhoneValid } =
      useBindPhoneFormValid();
    // 登录成功或失败后执行的回调函数
    const { loginSuccessful, loginFailed } = useLoginAfter();
    // 表单提交时进行表单校验
    const onSubmitHandler = handleSubmit(({ mobile, code }) => {
      // 将 QQ 与手机号码进行绑定
      bindMobileAndQQ({ unionId: props.unionId, mobile, code })
        // 绑定成功执行登录成功操作
        .then(loginSuccessful)
        // 绑定失败执行登录失败操作
        .catch(loginFailed);
    });

    // 短信验证码获取间隔计时器
    const { count, start, isActive } = useCountDown();
    // 获取短信验证码
    const getMsgCode = () => {
      // 如果正在倒计时 则不发送请求
      if (isActive.value) return;
      getMobileIsValidate()
        .then(({ isValid, mobile }) => {
          console.log(isValid, mobile);
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

    return {
      nickname,
      avatar,
      ...bindPhoneValid,
      onSubmitHandler,
      getMsgCode,
      count,
    };
  },
};

// 获取 QQ 用户昵称和头像
const useQQUserInfo = () => {
  // QQ 用户昵称
  const nickname = ref("");
  // QQ 用户头像
  const avatar = ref("");

  // 判断地址栏中是否有 access_token
  if (window.QC.Login.check()) {
    // 向 QQ互联 服务器中发送请求获取 QQ 用户信息
    // https://graph.qq.com/user/get_user_info?oauth_consumer_key=100556005&access_token=B204C56879FC0C2818AF844746BD6959&openid=8C37393606D6958F240A6B96DFF453E1&format=json
    window.QC.api("get_user_info").success((response) => {
      // 存储 QQ 用户昵称
      nickname.value = response.data.nickname;
      // 存储 QQ 用户头像
      avatar.value = response.data.figureurl_1;
    });
  }

  return { nickname, avatar };
};

// 表单验证
const useBindPhoneFormValid = () => {
  // 创建表单验证对象
  const { handleSubmit } = useForm({ validationSchema: { mobile, code } });
  // 校验 手机号码
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValidate,
  } = useField("mobile");
  // 校验 短信验证码
  const { value: codeField, errorMessage: codeError } = useField("code");

  // 单独校验手机号码是否通过
  const getMobileIsValidate = async () => {
    // 验证手机号, 获取验证结果
    const { valid } = await mobileValidate();
    // 返回验证结果
    return { isValid: valid, mobile: mobileField.value };
  };

  return {
    handleSubmit,
    mobileField,
    mobileError,
    codeField,
    codeError,
    getMobileIsValidate,
  };
};
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto 20px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

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

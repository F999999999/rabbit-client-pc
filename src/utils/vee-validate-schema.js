import { checkUsernameIsUnique } from "@/api/user";

/**
 * 用户名校验规则
 * @param value
 * @returns {string|boolean}
 */
export const account = (value) => {
  if (!value) return "请输入用户名";
  if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-20个字符";
  return true;
};

/**
 * 密码校验规则
 * @param value
 * @returns {string|boolean}
 */
export const password = (value) => {
  if (!value) return "请输入密码";
  if (!/^\w{6,24}$/.test(value)) return "密码是6-24个字符";
  return true;
};

/**
 * 校验两次密码输入是否一致
 * @param value
 * @param form
 * @returns {string|boolean}
 */
export const rePassword = (value, { form }) => {
  if (!value) return "请输入密码";
  if (!/^\w{6,24}$/.test(value)) return "密码是6-24个字符";
  // 校验密码是否一致 form 表单数据对象
  if (value !== form.password) return "两次输入的密码不一致";
  return true;
};

/**
 * 手机号校验规则
 * @param value
 * @returns {string|boolean}
 */
export const mobile = (value) => {
  if (!value) return "请输入手机号";
  if (!/^1[3-9]\d{9}$/.test(value)) return "手机号格式错误";
  return true;
};

/**
 * 短信验证码校验规则
 * @param value
 * @returns {string|boolean}
 */
export const code = (value) => {
  if (!value) return "请输入验证码";
  if (!/^\d{6}$/.test(value)) return "验证码是6个数字";
  return true;
};

/**
 * 用户协议校验规则
 * @param value
 * @returns {string|boolean}
 */
export const isAgree = (value) => {
  if (!value) return "请勾选同意用户协议";
  return true;
};

export const checkUserAccount = async (value) => {
  if (!value) return "请输入用户名";
  if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-20个字符";
  // 服务端校验
  const { result } = await checkUsernameIsUnique(value);
  if (result.valid) return "用户名已存在";
  return true;
};

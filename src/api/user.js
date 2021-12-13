import { requestWithOutToken } from "@/utils/request";

/**
 * 账号密码登录
 * @param account 用户名
 * @param password 密码
 * @returns {Promise}
 */
export const loginByAccountAndPassword = ({ account, password }) => {
  return requestWithOutToken("/login", "post", { account, password });
};

/**
 * 获取手机短信验证码
 * @param mobile 手机号码
 * @returns {Promise}
 */
export const getLoginMsgCode = (mobile) => {
  return requestWithOutToken("/login/code", "get", { mobile });
};

/**
 * 手机号码登录
 * @param mobile 手机号码
 * @param code 验证码
 * @returns {Promise}
 */
export const loginByMobileMsgCode = ({ mobile, code }) => {
  return requestWithOutToken("/login/code", "post", { mobile, code });
};

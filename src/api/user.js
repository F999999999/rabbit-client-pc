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

/**
 * 查找绑定该QQ的账号
 * @param unionId QQ用户唯一标识
 * @param source 注册来源
 * @returns {Promise}
 */
export const findAccountByQQOpenid = ({ unionId, source = 1 }) => {
  return requestWithOutToken("/login/social", "post", { unionId, source });
};

/**
 * 获取短信验证码（绑定账号）
 * @param mobile 手机号码
 * @returns {Promise}
 */
export const getBindMobileMsgCode = (mobile) => {
  return requestWithOutToken("/login/social/code", "get", { mobile });
};

/**
 * QQ与手机号码绑定
 * @param unionId 用户唯一标识（openid）
 * @param mobile 手机号码
 * @param code 短信验证码
 * @returns {Promise}
 */
export const bindMobileAndQQ = ({ unionId, mobile, code }) => {
  console.log(unionId, mobile, code);
  return requestWithOutToken("/login/social/bind", "post", {
    unionId,
    mobile,
    code,
  });
};

import { requestWithToken } from "@/utils/request";

/**
 * 生成订单
 * @returns {Promise}
 */
export const createOrderApi = () => {
  return requestWithToken("/member/order/pre", "get");
};

/**
 * 添加收货地址
 * @param addAddress 收货地址信息
 * @returns {Promise}
 */
export const addAddressApi = (addAddress) => {
  return requestWithToken("/member/address", "post", addAddress);
};

/**
 * 获取收货地址列表
 * @returns {Promise}
 */
export const getAddressListApi = () => {
  return requestWithToken("/member/address", "get");
};

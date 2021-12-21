import { requestWithToken } from "@/utils/request";

/**
 * 生成订单
 * @returns {Promise}
 */
export const createOrderApi = () => {
  return requestWithToken("/member/order/pre", "get");
};

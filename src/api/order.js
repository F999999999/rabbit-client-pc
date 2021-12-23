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

/**
 * 修改收货地址
 * @param id 收货地址ID
 * @param address 新的收货地址信息
 * @returns {Promise}
 */
export const updateAddressByIdApi = (id, address) => {
  return requestWithToken(`/member/address/${id}`, "put", address);
};

/**
 * 提交订单
 * @param order 订单对象
 * @returns {Promise}
 */
export const submitOrderApi = (order) => {
  return requestWithToken("/member/order", "post", order);
};

/**
 * 根据订单ID获取订单详情
 * @param id 订单ID
 * @returns {Promise}
 */
export const getOrderInfoByIdApi = (id) => {
  return requestWithToken(`/member/order/${id}`, "get");
};

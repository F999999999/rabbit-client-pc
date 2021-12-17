import { requestWithOutToken } from "@/utils/request";

/**
 * 更新购物车中的商品信息
 * @param skuId 规格ID
 * @param id 商品ID
 * @returns {Promise}
 */
export const updateLocalCart = ({ skuId, id }) => {
  return requestWithOutToken(`/goods/stock/${skuId}`, "get", { id });
};

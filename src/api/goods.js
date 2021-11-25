import { requestWithOutToken } from "@/utils/request";

/**
 * 根据商品ID获取商品详情信息
 * @param id 商品ID
 * @returns {Promise}
 */
export const getGoodsDetailByIdApi = (id) => {
  return requestWithOutToken("/goods", "get", { id });
};
